import { Button, Card } from "react-bootstrap";
import { StatusBadge } from "./StatusBadge";
import { formatCurrency, formatDateTime, orderCode } from "../utils/format";
import type { Order } from "../types";

interface OrderCardProps {
  order: Order;
  onPay: (order: Order) => void;
}

export function OrderCard({ order, onPay }: OrderCardProps) {
  const isPending = order.status === "Pendente";
  const discountLabel =
    order.discountType === "free"
      ? "Pedido grátis (recompensa)"
      : order.discountType === "loyalty"
        ? `Desconto fidelidade (10%): -${formatCurrency(order.discountCents)}`
        : null;

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div>
            <Card.Title as="h2" className="h6 mb-0">
              Pedido {orderCode(order.id)}
            </Card.Title>
            <small className="text-secondary">
              {order.unitName} - {formatDateTime(order.createdAt)}
            </small>
          </div>
          <StatusBadge status={order.status} />
        </div>
        <ul className="mb-2 ps-3">
          {order.items.map((item) => (
            <li key={item.productId}>
              {item.quantity}x {item.name}
            </li>
          ))}
        </ul>
        {isPending ? (
          <>
            <p className="mb-2">
              Total a pagar:{" "}
              <strong>{formatCurrency(order.subtotalCents)}</strong>
              <br />
              <small className="text-secondary">
                Benefícios de fidelidade são aplicados no pagamento.
              </small>
            </p>
            <Button
              variant="primary"
              className="btn-lg w-100"
              onClick={() => onPay(order)}
            >
              Realizar pagamento
            </Button>
          </>
        ) : (
          <p className="mb-0">
            Total pago: <strong>{formatCurrency(order.totalCents)}</strong>
            {discountLabel && (
              <>
                <br />
                <small>{discountLabel}</small>
              </>
            )}
            {order.transactionId && (
              <>
                <br />
                <small className="text-secondary">
                  Transação {order.transactionId}
                </small>
              </>
            )}
          </p>
        )}
      </Card.Body>
    </Card>
  );
}
