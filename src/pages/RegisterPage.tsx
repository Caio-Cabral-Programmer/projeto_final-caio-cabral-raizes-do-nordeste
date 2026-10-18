import { useState } from "react";
import type { FormEvent } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ConsentRequiredAlert } from "../components/ConsentRequiredAlert";
import { useAuth } from "../hooks/useAuth";
import { useConsent } from "../hooks/useConsent";
import { formatDateTime } from "../utils/format";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirmation,
} from "../utils/validators";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  confirmation: string;
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string | null>>;

function validateField(
  field: keyof RegisterValues,
  values: RegisterValues,
): string | null {
  switch (field) {
    case "name":
      return validateName(values.name);
    case "email":
      return validateEmail(values.email);
    case "password":
      return validatePassword(values.password);
    case "confirmation":
      return validatePasswordConfirmation(values.password, values.confirmation);
  }
}

const fields: {
  key: keyof RegisterValues;
  label: string;
  type: string;
  autoComplete: string;
}[] = [
  { key: "name", label: "Nome", type: "text", autoComplete: "name" },
  { key: "email", label: "E-mail", type: "email", autoComplete: "email" },
  {
    key: "password",
    label: "Senha",
    type: "password",
    autoComplete: "new-password",
  },
  {
    key: "confirmation",
    label: "Confirmar senha",
    type: "password",
    autoComplete: "new-password",
  },
];

export function RegisterPage() {
  const { register } = useAuth();
  const { consent, hasConsent } = useConsent();
  const navigate = useNavigate();

  const [values, setValues] = useState<RegisterValues>({
    name: "",
    email: "",
    password: "",
    confirmation: "",
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleBlur(field: keyof RegisterValues) {
    setErrors((previous) => ({
      ...previous,
      [field]: validateField(field, values),
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);
    const next: RegisterErrors = {};
    for (const { key } of fields) next[key] = validateField(key, values);
    setErrors(next);
    if (Object.values(next).some((error) => error)) return;

    setSubmitting(true);
    const result = await register(values.name, values.email, values.password);
    setSubmitting(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate("/", { replace: true, state: { welcome: true } });
  }

  return (
    <div className="mx-auto" style={{ maxWidth: 460 }}>
      <h1 className="h3 mb-3">Criar conta</h1>
      <ConsentRequiredAlert />
      {formError && <Alert variant="danger">{formError}</Alert>}
      <Form noValidate onSubmit={handleSubmit}>
        {fields.map(({ key, label, type, autoComplete }) => (
          <Form.Group className="mb-3" controlId={`register-${key}`} key={key}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
              type={type}
              value={values[key]}
              onChange={(event) =>
                setValues((previous) => ({
                  ...previous,
                  [key]: event.target.value,
                }))
              }
              onBlur={() => handleBlur(key)}
              isInvalid={!!errors[key]}
              autoComplete={autoComplete}
              aria-describedby={`register-${key}-error`}
            />
            <Form.Control.Feedback type="invalid" id={`register-${key}-error`}>
              {errors[key]}
            </Form.Control.Feedback>
          </Form.Group>
        ))}
        {hasConsent && consent && (
          <p className="small text-secondary">
            Consentimento aceito em {formatDateTime(consent.timestamp)}.{" "}
            <Link to="/privacidade">Política de Privacidade</Link>
          </p>
        )}
        <Button
          type="submit"
          variant="primary"
          className="btn-lg w-100"
          disabled={submitting || !hasConsent}
        >
          {submitting ? "Criando conta..." : "Criar conta"}
        </Button>
      </Form>
      <p className="mt-3 mb-0">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div>
  );
}
