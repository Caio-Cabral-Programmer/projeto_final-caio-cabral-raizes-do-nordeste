import { useState } from "react";
import type { FormEvent } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmModal } from "../components/ConfirmModal";
import { LoyaltyCard } from "../components/LoyaltyCard";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useConsent } from "../hooks/useConsent";
import { useOrders } from "../hooks/useOrders";
import { formatDateTime } from "../utils/format";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators";

interface ProfileErrors {
  name?: string | null;
  email?: string | null;
  password?: string | null;
}

export function ProfilePage() {
  const { currentUser, updateProfile, deleteAccount, logout } = useAuth();
  const { consent, revoke } = useConsent();
  const { deleteOrdersByUser } = useOrders();
  const { clear } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [confirming, setConfirming] = useState<"delete" | "revoke" | null>(
    null,
  );

  if (!currentUser) return null;

  // A nova senha é opcional: só é validada quando algo foi digitado.
  function validateAll(): ProfileErrors {
    return {
      name: validateName(name),
      email: validateEmail(email),
      password: password ? validatePassword(password) : null,
    };
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSaved(false);
    setFormError(null);
    const next = validateAll();
    setErrors(next);
    if (next.name || next.email || next.password) return;

    const result = await updateProfile({
      name,
      email,
      password: password || undefined,
    });
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setPassword("");
    setSaved(true);
  }

  // Remove pedidos, carrinho, usuário e sessão, e volta ao cardápio.
  function handleDelete() {
    if (!currentUser) return;
    deleteOrdersByUser(currentUser.id);
    clear();
    navigate("/");
    deleteAccount();
  }

  // Revogar encerra a sessão e reabre o modal de consentimento; os dados da conta ficam até serem excluídos.
  function handleRevoke() {
    navigate("/");
    logout();
    revoke();
  }

  return (
    <>
      <h1 className="h3 mb-3">Meu perfil</h1>
      <Row className="g-3">
        <Col xs={12} lg={5}>
          <LoyaltyCard user={currentUser} />
        </Col>
        <Col xs={12} lg={7}>
          <Card>
            <Card.Body>
              <h2 className="h5">Dados da conta</h2>
              {saved && (
                <Alert variant="success">Perfil atualizado com sucesso!</Alert>
              )}
              {formError && <Alert variant="danger">{formError}</Alert>}
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="profile-name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={() =>
                      setErrors((previous) => ({
                        ...previous,
                        name: validateName(name),
                      }))
                    }
                    isInvalid={!!errors.name}
                    autoComplete="name"
                    aria-describedby="profile-name-error"
                  />
                  <Form.Control.Feedback type="invalid" id="profile-name-error">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="profile-email">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={() =>
                      setErrors((previous) => ({
                        ...previous,
                        email: validateEmail(email),
                      }))
                    }
                    isInvalid={!!errors.email}
                    autoComplete="email"
                    aria-describedby="profile-email-error"
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    id="profile-email-error"
                  >
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="profile-password">
                  <Form.Label>Nova senha (opcional)</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onBlur={() =>
                      setErrors((previous) => ({
                        ...previous,
                        password: password ? validatePassword(password) : null,
                      }))
                    }
                    isInvalid={!!errors.password}
                    autoComplete="new-password"
                    aria-describedby="profile-password-error"
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    id="profile-password-error"
                  >
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="primary" className="btn-lg">
                  Salvar alterações
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <h2 className="h5">Privacidade</h2>
              <p className="mb-2">
                {consent?.status === "accepted"
                  ? `Consentimento aceito em ${formatDateTime(consent.timestamp)} (política versão ${consent.policyVersion}).`
                  : "Consentimento não registrado."}{" "}
                <Link to="/privacidade">Política de Privacidade</Link>
              </p>
              <p className="small text-secondary">
                Revogar o consentimento encerra a sessão. Para eliminar seus
                dados, use Excluir minha conta.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-2">
                <Button
                  variant="outline-secondary"
                  className="btn-lg"
                  onClick={() => setConfirming("revoke")}
                >
                  Revogar consentimento
                </Button>
                <Button
                  variant="outline-danger"
                  className="btn-lg"
                  onClick={() => setConfirming("delete")}
                >
                  Excluir minha conta
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ConfirmModal
        show={confirming === "delete"}
        title="Excluir conta"
        message="Tem certeza que deseja excluir sua conta? Seus dados, pedidos e pontos serão removidos permanentemente."
        confirmLabel="Excluir minha conta"
        onConfirm={handleDelete}
        onCancel={() => setConfirming(null)}
      />
      <ConfirmModal
        show={confirming === "revoke"}
        title="Revogar consentimento"
        message="Ao revogar o consentimento, sua sessão será encerrada e o aviso de privacidade será exibido novamente. Seus dados continuam salvos até você excluir a conta."
        confirmLabel="Revogar consentimento"
        confirmVariant="warning"
        onConfirm={handleRevoke}
        onCancel={() => setConfirming(null)}
      />
    </>
  );
}
