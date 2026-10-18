import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useConsent } from "../hooks/useConsent";

export function Footer() {
  const { openModal } = useConsent();

  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container className="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-md-center">
        <small>Projeto acadêmico UNINTER. Todos os dados são simulados.</small>
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <Link to="/privacidade" className="link-light">
            Política de Privacidade
          </Link>
          <Button
            variant="link"
            className="link-light p-0 align-baseline"
            onClick={openModal}
          >
            Gerenciar consentimento
          </Button>
        </div>
      </Container>
    </footer>
  );
}
