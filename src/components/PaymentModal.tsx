import { useState } from "react";
import type { FormEvent } from "react";
import { Alert, Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { LoyaltyCard } from "./LoyaltyCard";
import { useAuth } from "../hooks/useAuth";
import { useOrders } from "../hooks/useOrders";
import { requestPayment } from "../services/paymentGateway";
import type { GatewayOutcome } from "../services/paymentGateway";
import {
  formatCardExpiry,
  formatCardNumber,
  formatCurrency,
  orderCode,
} from "../utils/format";
import { calculatePricing } from "../utils/loyalty";
import {
  validateCardCvv,
  validateCardExpiry,
  validateCardHolder,
  validateCardNumber,
} from "../utils/validators";
import type { Order } from "../types";

interface PaymentModalProps {
  order: Order;
  onHide: () => void;
}

type Step = "review" | "processing" | "result";

interface CardForm {
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
}

type CardErrors = Partial<Record<keyof CardForm, string | null>>;

const cardValidators: Record<keyof CardForm, (value: string) => string | null> =
  {
    number: validateCardNumber,
    holder: validateCardHolder,
    expiry: (value) => validateCardExpiry(value),
    cvv: validateCardCvv,
  };

// Fluxo de pagamento em três etapas (revisão, processamento, resultado). Os dados do cartão ficam só no estado deste componente e são descartados ao fechar; a chamada ao gateway é simulada em services/paymentGateway.
export function PaymentModal({ order, onHide }: PaymentModalProps) {
  const { currentUser } = useAuth();
  const { confirmPayment } = useOrders();
  const [step, setStep] = useState<Step>("review");
  const [form, setForm] = useState<CardForm>({
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<CardErrors>({});
  const [outcome, setOutcome] = useState<GatewayOutcome>("approved");
  const [result, setResult] = useState<{
    status: GatewayOutcome;
    message: string;
  } | null>(null);

  if (!currentUser) return null;

  // Antes do pagamento os valores vêm dos benefícios atuais do usuário; depois, do pedido confirmado.
  const pricing = calculatePricing(order.subtotalCents, currentUser);
  const view = order.status === "Confirmado" ? order : { ...order, ...pricing };
  const isFree = pricing.discountType === "free";
  const discountLabel =
    view.discountType === "free"
      ? "Pedido grátis (recompensa)"
      : "Desconto fidelidade (10%)";

  function handleChange(field: keyof CardForm, value: string) {
    const formatted =
      field === "number"
        ? formatCardNumber(value)
        : field === "expiry"
          ? formatCardExpiry(value)
          : field === "cvv"
            ? value.replace(/\D/g, "").slice(0, 3)
            : value;
    setForm((previous) => ({ ...previous, [field]: formatted }));
    setErrors((previous) => ({ ...previous, [field]: null }));
  }

  function handleBlur(field: keyof CardForm) {
    setErrors((previous) => ({
      ...previous,
      [field]: cardValidators[field](form[field]),
    }));
  }

  function validateAll(): boolean {
    const next: CardErrors = {};
    for (const field of Object.keys(cardValidators) as (keyof CardForm)[]) {
      next[field] = cardValidators[field](form[field]);
    }
    setErrors(next);
    return Object.values(next).every((error) => error === null);
  }

  // Pedido grátis não passa pelo gateway; nos demais, valida, chama o gateway e só confirma se aprovado.
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (isFree) {
      confirmPayment(order.id, null);
      setResult({
        status: "approved",
        message: "Pedido grátis confirmado com sucesso!",
      });
      setStep("result");
      return;
    }

    if (!validateAll()) return;
    setStep("processing");
    const response = await requestPayment({
      orderId: order.id,
      amountCents: pricing.totalCents,
      outcome,
    });
    if (response.status === "approved")
      confirmPayment(order.id, response.transactionId ?? null);
    setResult({ status: response.status, message: response.message });
    setStep("result");
  }

  function handleRetry() {
    setResult(null);
    setStep("review");
  }

  function handleHide() {
    if (step !== "processing") onHide();
  }

  const alertVariant =
    result?.status === "approved"
      ? "success"
      : result?.status === "refused"
        ? "danger"
        : "warning";

  return (
    <Modal
      show
      onHide={handleHide}
      centered
      scrollable
      backdrop={step === "processing" ? "static" : true}
      keyboard={step !== "processing"}
    >
      <Modal.Header closeButton={step !== "processing"}>
        <Modal.Title as="h2" className="h5">
          Pagamento - Pedido {orderCode(order.id)}
        </Modal.Title>
      </Modal.Header>

      {step === "review" && (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="d-flex flex-column flex-grow-1 overflow-hidden"
        >
          <Modal.Body>
            <ul className="ps-3">
              {order.items.map((item) => (
                <li key={item.productId}>
                  {item.quantity}x {item.name}
                </li>
              ))}
            </ul>
            <dl className="row mb-3">
              <dt className="col-8 fw-normal">Subtotal</dt>
              <dd className="col-4 text-end mb-1">
                {formatCurrency(view.subtotalCents)}
              </dd>
              {view.discountType !== "none" && (
                <>
                  <dt className="col-8 fw-normal">{discountLabel}</dt>
                  <dd className="col-4 text-end mb-1">
                    -{formatCurrency(view.discountCents)}
                  </dd>
                </>
              )}
              <dt className="col-8">Total</dt>
              <dd className="col-4 text-end fw-bold mb-0">
                {formatCurrency(view.totalCents)}
              </dd>
            </dl>

            <div className="mb-3">
              <LoyaltyCard user={currentUser} />
            </div>

            {isFree ? (
              <Alert variant="success" className="mb-0">
                Este pedido é grátis pela recompensa de fidelidade. Não é
                necessário informar cartão.
              </Alert>
            ) : (
              <>
                <Alert variant="info">
                  Ambiente de demonstração. Nenhum dado de cartão é armazenado.
                </Alert>
                <Form.Group className="mb-3" controlId="card-number">
                  <Form.Label>Número do cartão</Form.Label>
                  <Form.Control
                    value={form.number}
                    onChange={(event) =>
                      handleChange("number", event.target.value)
                    }
                    onBlur={() => handleBlur("number")}
                    isInvalid={!!errors.number}
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="0000 0000 0000 0000"
                    aria-describedby="card-number-error"
                  />
                  <Form.Control.Feedback type="invalid" id="card-number-error">
                    {errors.number}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="card-holder">
                  <Form.Label>Nome no cartão</Form.Label>
                  <Form.Control
                    value={form.holder}
                    onChange={(event) =>
                      handleChange("holder", event.target.value)
                    }
                    onBlur={() => handleBlur("holder")}
                    isInvalid={!!errors.holder}
                    autoComplete="cc-name"
                    aria-describedby="card-holder-error"
                  />
                  <Form.Control.Feedback type="invalid" id="card-holder-error">
                    {errors.holder}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="card-expiry">
                      <Form.Label>Validade</Form.Label>
                      <Form.Control
                        value={form.expiry}
                        onChange={(event) =>
                          handleChange("expiry", event.target.value)
                        }
                        onBlur={() => handleBlur("expiry")}
                        isInvalid={!!errors.expiry}
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        placeholder="MM/AA"
                        aria-describedby="card-expiry-error"
                      />
                      <Form.Control.Feedback
                        type="invalid"
                        id="card-expiry-error"
                      >
                        {errors.expiry}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3" controlId="card-cvv">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        value={form.cvv}
                        onChange={(event) =>
                          handleChange("cvv", event.target.value)
                        }
                        onBlur={() => handleBlur("cvv")}
                        isInvalid={!!errors.cvv}
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        aria-describedby="card-cvv-error"
                      />
                      <Form.Control.Feedback type="invalid" id="card-cvv-error">
                        {errors.cvv}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="gateway-outcome">
                  <Form.Label>
                    Resultado simulado do gateway (modo demonstração)
                  </Form.Label>
                  <Form.Select
                    value={outcome}
                    onChange={(event) =>
                      setOutcome(event.target.value as GatewayOutcome)
                    }
                  >
                    <option value="approved">Aprovado</option>
                    <option value="refused">Recusado</option>
                    <option value="unavailable">Indisponível</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="btn-lg">
              {isFree
                ? "Confirmar pedido grátis"
                : `Pagar ${formatCurrency(pricing.totalCents)}`}
            </Button>
          </Modal.Footer>
        </Form>
      )}

      {step === "processing" && (
        <Modal.Body className="text-center py-5">
          <Spinner animation="border" aria-hidden="true" className="mb-3" />
          <p role="status" aria-live="polite" className="mb-0">
            Enviando solicitação ao gateway de pagamento...
          </p>
        </Modal.Body>
      )}

      {step === "result" && result && (
        <>
          <Modal.Body>
            <Alert variant={alertVariant} className="mb-3">
              {result.message}
            </Alert>
            {result.status === "approved" && (
              <>
                <p>
                  Total pago: <strong>{formatCurrency(view.totalCents)}</strong>
                  {order.transactionId && (
                    <>
                      <br />
                      Transação: {order.transactionId}
                    </>
                  )}
                </p>
                <LoyaltyCard user={currentUser} />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {result.status !== "approved" && (
              <Button variant="primary" onClick={handleRetry}>
                Tentar novamente
              </Button>
            )}
            <Button variant="outline-secondary" onClick={onHide}>
              Fechar
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}
