import { createContext } from "react";
import type { Order } from "../types";

export interface OrdersContextValue {
  orders: Order[];
  createOrder: () => Order | null;
  confirmPayment: (orderId: string, transactionId: string | null) => void;
  deleteOrdersByUser: (userId: string) => void;
}

export const OrdersContext = createContext<OrdersContextValue | null>(null);
