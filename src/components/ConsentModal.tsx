import { Button, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PrivacyContent } from "./PrivacyContent";
import { PRIVACY_TITLE } from "../data/privacyText";
import { useAuth } from "../hooks/useAuth";
import { useConsent } from "../hooks/useConsent";

// Modal de consentimento LGPD: bloqueia a página até o usuário decidir; depois de aceito, serve para gerenciar o consentimento.
export function ConsentModal() {
  const { consent, isModalOpen, accept, decline, revoke, closeModal } =
    useConsent();
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const alreadyAccepted = consent?.status === "accepted";
  // A página da política precisa ficar legível enquanto a decisão está pendente.
  const show = isModalOpen && pathname !== "/privacidade";

  function handleRevoke() {
    navigate("/");
    logout();
    revoke();
  }

  return (
    <Modal
      show={show}
      onHide={closeModal}
      backdrop={alreadyAccepted ? true : "static"}
      keyboard={alreadyAccepted}
      scrollable
      centered
    >
      <Modal.Header closeButton={alreadyAccepted}>
        <Modal.Title as="h2" className="h5">
          {PRIVACY_TITLE}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PrivacyContent />
      </Modal.Body>
      <Modal.Footer className="flex-column flex-sm-row align-items-stretch align-items-sm-center">
        <Link to="/privacidade" className="me-sm-auto">
          Ler a Política de Privacidade completa
        </Link>
        {alreadyAccepted ? (
          <>
            <Button variant="outline-secondary" onClick={closeModal}>
              Fechar
            </Button>
            <Button variant="outline-danger" onClick={handleRevoke}>
              Revogar consentimento
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline-secondary" onClick={decline}>
              Recusar
            </Button>
            <Button variant="primary" onClick={accept}>
              Aceitar e continuar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
