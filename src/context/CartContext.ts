import { createContext } from "react";
import type { Product } from "../types";

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface CartContextValue {
  unitId: string;
  lines: CartLine[];
  itemCount: number;
  subtotalCents: number;
  addItem: (productId: string) => void;
  changeQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  changeUnit: (unitId: string) => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
