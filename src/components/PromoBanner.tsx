import { Container } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

// Promoção de fidelidade exibida logo abaixo da navbar em todas as páginas (sem botão de fechar de propósito).
export function PromoBanner() {
  const { currentUser } = useAuth();

  return (
    <aside className="bg-primary text-dark py-2" aria-label="Promoção">
      <Container className="d-flex align-items-center justify-content-center gap-2">
        <i className="bi bi-gift-fill" aria-hidden="true" />
        <p className="mb-0 small fw-semibold text-center">
          Programa Fidelidade: cada pedido vale 10 pontos. Com 30 pontos você
          ganha 10% de desconto no próximo pedido. Realizou 5 pedidos? O próximo
          é grátis!
          {currentUser && ` Você tem ${currentUser.points} pontos.`}
        </p>
      </Container>
    </aside>
  );
}
