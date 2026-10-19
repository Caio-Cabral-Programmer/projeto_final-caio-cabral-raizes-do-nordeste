import { Badge } from "react-bootstrap";
import type { OrderStatus } from "../types";

interface StatusBadgeProps {
  status: OrderStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return status === "Confirmado" ? (
    <Badge bg="success">
      <i className="bi bi-check-circle-fill me-1" aria-hidden="true" />
      Confirmado
    </Badge>
  ) : (
    <Badge bg="warning" text="dark">
      <i className="bi bi-hourglass-split me-1" aria-hidden="true" />
      Pendente
    </Badge>
  );
}
