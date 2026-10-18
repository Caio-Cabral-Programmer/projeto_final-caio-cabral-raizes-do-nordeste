import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PrivacyContent } from "../components/PrivacyContent";
import {
  PRIVACY_LAST_UPDATE,
  PRIVACY_POLICY_VERSION,
  PRIVACY_TITLE,
} from "../data/privacyText";
import { useConsent } from "../hooks/useConsent";

export function PrivacyPage() {
  const { isModalOpen } = useConsent();
  const navigate = useNavigate();

  return (
    <article className="mx-auto" style={{ maxWidth: 800 }}>
      <h1 className="h3">{PRIVACY_TITLE}</h1>
      <p className="text-secondary">
        Política de Privacidade, versão {PRIVACY_POLICY_VERSION}. Última
        atualização: {PRIVACY_LAST_UPDATE}.
      </p>
      {isModalOpen && (
        <Alert
          variant="info"
          className="d-flex flex-column flex-sm-row align-items-sm-center gap-2"
        >
          <span className="me-sm-auto">
            Leia a política e depois volte para registrar sua decisão.
          </span>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => navigate("/")}
          >
            Voltar ao aviso de consentimento
          </Button>
        </Alert>
      )}
      <PrivacyContent />
    </article>
  );
}
