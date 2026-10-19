import { ProgressBar } from "react-bootstrap";
import {
  DISCOUNT_POINTS_THRESHOLD,
  ordersMissingForFreeOrder,
  pointsMissingForDiscount,
} from "../utils/loyalty";
import type { User } from "../types";

interface LoyaltyCardProps {
  user: User;
}

// Pontos, elegibilidade ao desconto e recompensas; reutilizado no perfil e no modal de pagamento.
export function LoyaltyCard({ user }: LoyaltyCardProps) {
  const missingPoints = pointsMissingForDiscount(user.points);
  const missingOrders = ordersMissingForFreeOrder(user.confirmedOrdersCount);

  return (
    <section
      aria-label="Programa de fidelidade"
      className="border rounded p-3 bg-light"
    >
      <h3 className="h6 fw-bold mb-2">
        <i className="bi bi-stars me-1" aria-hidden="true" />
        Fidelidade
      </h3>
      <p className="mb-1">
        Seus pontos: <strong>{user.points}</strong>
      </p>
      <ProgressBar
        now={Math.min(user.points, DISCOUNT_POINTS_THRESHOLD)}
        max={DISCOUNT_POINTS_THRESHOLD}
        label={`${Math.min(user.points, DISCOUNT_POINTS_THRESHOLD)} / ${DISCOUNT_POINTS_THRESHOLD}`}
        aria-label="Progresso de pontos até o desconto"
        className="mb-2"
      />
      <p className="mb-1">
        {missingPoints === 0
          ? "Você tem 10% de desconto disponível."
          : `Faltam ${missingPoints} pontos para ganhar 10% de desconto.`}
      </p>
      <p className="mb-1">
        Pedidos confirmados: <strong>{user.confirmedOrdersCount}</strong>
        {user.freeOrderVouchers === 0 && missingOrders > 0 && (
          <> (faltam {missingOrders} para ganhar um pedido grátis)</>
        )}
      </p>
      {user.freeOrderVouchers > 0 && (
        <p className="mb-0 fw-semibold">
          Você tem {user.freeOrderVouchers} pedido(s) grátis disponível(is).
        </p>
      )}
    </section>
  );
}
