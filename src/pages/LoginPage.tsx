import { useState } from "react";
import type { FormEvent } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ConsentRequiredAlert } from "../components/ConsentRequiredAlert";
import { useAuth } from "../hooks/useAuth";
import { useConsent } from "../hooks/useConsent";
import { validateEmail, validatePassword } from "../utils/validators";

interface LoginErrors {
  email?: string | null;
  password?: string | null;
}

export function LoginPage() {
  const { login } = useAuth();
  const { hasConsent } = useConsent();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);
    const next = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(next);
    if (next.email || next.password) return;

    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate(from, { replace: true });
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 460 }}>
      <h1 className="h3 mb-3">Entrar</h1>
      <ConsentRequiredAlert />
      {formError && <Alert variant="danger">{formError}</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="login-email">
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
            aria-describedby="login-email-error"
          />
          <Form.Control.Feedback type="invalid" id="login-email-error">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="login-password">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() =>
              setErrors((previous) => ({
                ...previous,
                password: validatePassword(password),
              }))
            }
            isInvalid={!!errors.password}
            autoComplete="current-password"
            aria-describedby="login-password-error"
          />
          <Form.Control.Feedback type="invalid" id="login-password-error">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="btn-lg w-100"
          disabled={submitting || !hasConsent}
        >
          {submitting ? "Entrando..." : "Entrar"}
        </Button>
      </Form>
      <p className="mt-3 mb-0">
        Não tem conta? <Link to="/cadastro">Cadastre-se</Link>
      </p>
    </div>
  );
}
