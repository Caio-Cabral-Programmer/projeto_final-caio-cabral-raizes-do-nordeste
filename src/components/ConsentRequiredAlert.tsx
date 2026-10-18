import { Alert, Button } from "react-bootstrap";
import { useConsent } from "../hooks/useConsent";

// Avisa que conta e pedidos exigem o consentimento LGPD; não renderiza nada depois de aceito.
export function ConsentRequiredAlert() {
  const { hasConsent, openModal } = useConsent();
  if (hasConsent) return null;

  return (
    <Alert
      variant="warning"
      className="d-flex flex-column flex-sm-row align-items-sm-center gap-2"
    >
      <span className="me-sm-auto">
        Para criar conta ou fazer pedidos, é necessário aceitar a Política de
        Privacidade.
      </span>
      <Button variant="outline-dark" size="sm" onClick={openModal}>
        Revisar termos
      </Button>
    </Alert>
  );
}
