import { useState } from "react";
import { Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { OrderCard } from "../components/OrderCard";
import { PaymentModal } from "../components/PaymentModal";
import { useOrders } from "../hooks/useOrders";
import type { Order } from "../types";

export function OrdersPage() {
  const { orders } = useOrders();
  const location = useLocation();
  const [payingId, setPayingId] = useState<string | null>(null);
  const [showCreated, setShowCreated] = useState(
    Boolean((location.state as { created?: boolean } | null)?.created),
  );

  // O modal lê o pedido ao vivo do contexto para refletir a confirmação imediatamente.
  const payingOrder = orders.find((order) => order.id === payingId);

  return (
    <>
      <h1 className="h3 mb-3">Meus pedidos</h1>
      {showCreated && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowCreated(false)}
        >
          Pedido criado com status Pendente. Realize o pagamento para
          confirmá-lo.
        </Alert>
      )}
      {orders.length === 0 ? (
        <p>
          Você ainda não fez nenhum pedido. <Link to="/">Ver cardápio</Link>
        </p>
      ) : (
        orders.map((order: Order) => (
          <OrderCard
            key={order.id}
            order={order}
            onPay={(item) => setPayingId(item.id)}
          />
        ))
      )}
      {payingOrder && (
        <PaymentModal
          key={payingOrder.id}
          order={payingOrder}
          onHide={() => setPayingId(null)}
        />
      )}
    </>
  );
}
