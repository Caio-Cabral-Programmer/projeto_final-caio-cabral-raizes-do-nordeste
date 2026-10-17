import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { OrdersContext } from "./OrdersContext";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { getUnit } from "../data/units";
import { STORAGE_KEYS, load, save } from "../services/storage";
import { applyConfirmation, calculatePricing } from "../utils/loyalty";
import type { Order } from "../types";

interface OrdersProviderProps {
  children: ReactNode;
}

// Pedidos de todas as contas (banco simulado); `orders` expõe só os do usuário autenticado, do mais novo ao mais antigo.
export function OrdersProvider({ children }: OrdersProviderProps) {
  const { currentUser, updateUserLoyalty } = useAuth();
  const { unitId, lines, subtotalCents, clear } = useCart();
  const [allOrders, setAllOrders] = useState<Order[]>(() =>
    load<Order[]>(STORAGE_KEYS.orders, []),
  );

  useEffect(() => {
    save(STORAGE_KEYS.orders, allOrders);
  }, [allOrders]);

  const orders = currentUser
    ? allOrders
        .filter((order) => order.userId === currentUser.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    : [];

  // O pedido nasce "Pendente" sem desconto; o cálculo do valor final acontece no pagamento.
  function createOrder(): Order | null {
    const unit = getUnit(unitId);
    if (!currentUser || !unit || lines.length === 0) return null;
    const order: Order = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      unitId: unit.id,
      unitName: unit.name,
      items: lines.map((line) => ({
        productId: line.product.id,
        name: line.product.name,
        unitPriceCents: line.product.priceCents,
        quantity: line.quantity,
      })),
      subtotalCents,
      discountType: "none",
      discountCents: 0,
      totalCents: subtotalCents,
      status: "Pendente",
      createdAt: new Date().toISOString(),
    };
    setAllOrders((previous) => [...previous, order]);
    clear();
    return order;
  }

  // Precifica o pedido com os benefícios atuais do usuário, faz a confirmação do pagamento e atualiza os dados de fidelidade.
  function confirmPayment(orderId: string, transactionId: string | null) {
    const order = allOrders.find((item) => item.id === orderId);
    if (!currentUser || !order || order.status !== "Pendente") return;

    const pricing = calculatePricing(order.subtotalCents, currentUser);
    const confirmed: Order = {
      ...order,
      ...pricing,
      status: "Confirmado",
      paidAt: new Date().toISOString(),
      transactionId: transactionId ?? undefined,
    };
    setAllOrders((previous) =>
      previous.map((item) => (item.id === orderId ? confirmed : item)),
    );
    updateUserLoyalty(applyConfirmation(currentUser, pricing.discountType));
  }

  function deleteOrdersByUser(userId: string) {
    setAllOrders((previous) =>
      previous.filter((order) => order.userId !== userId),
    );
  }

  return (
    <OrdersContext.Provider
      value={{ orders, createOrder, confirmPayment, deleteOrdersByUser }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
