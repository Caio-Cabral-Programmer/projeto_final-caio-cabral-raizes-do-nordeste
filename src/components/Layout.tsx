import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { AppNavbar } from "./AppNavbar";
import { ConsentModal } from "./ConsentModal";
import { Footer } from "./Footer";
import { PromoBanner } from "./PromoBanner";

// Estrutura da página: navbar, banner promocional logo abaixo, conteúdo, rodapé e modal de consentimento.
export function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <PromoBanner />
      <main className="flex-grow-1 py-4">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ConsentModal />
    </div>
  );
}
