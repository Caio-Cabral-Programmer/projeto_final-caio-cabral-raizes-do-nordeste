import { useContext } from "react";
import { OrdersContext } from "../context/OrdersContext";

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context)
    throw new Error("useOrders deve ser usado dentro de OrdersProvider");
  return context;
}
