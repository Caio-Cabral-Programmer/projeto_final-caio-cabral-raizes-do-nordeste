import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import type { CartLine } from "./CartContext";
import { DEFAULT_UNIT_ID, getUnit } from "../data/units";
import { getProduct } from "../data/products";
import { STORAGE_KEYS, load, save } from "../services/storage";
import type { CartItem } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

// Carrinho da unidade selecionada. Trocar de unidade esvazia o carrinho (a interface pede confirmação antes).
export function CartProvider({ children }: CartProviderProps) {
  const [unitId, setUnitId] = useState<string>(() => {
    const stored = load<string>(STORAGE_KEYS.unit, DEFAULT_UNIT_ID);
    return getUnit(stored) ? stored : DEFAULT_UNIT_ID;
  });
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = load<CartItem[]>(STORAGE_KEYS.cart, []);
    return Array.isArray(stored)
      ? stored.filter((item) => getProduct(item.productId) && item.quantity > 0)
      : [];
  });

  useEffect(() => {
    save(STORAGE_KEYS.unit, unitId);
  }, [unitId]);

  useEffect(() => {
    save(STORAGE_KEYS.cart, items);
  }, [items]);

  const lines: CartLine[] = items.flatMap((item) => {
    const product = getProduct(item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
  const subtotalCents = lines.reduce(
    (total, line) => total + line.product.priceCents * line.quantity,
    0,
  );

  function addItem(productId: string) {
    setItems((previous) =>
      previous.some((item) => item.productId === productId)
        ? previous.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...previous, { productId, quantity: 1 }],
    );
  }

  // Soma ou subtrai unidades; o item que chega a zero sai do carrinho.
  function changeQuantity(productId: string, delta: number) {
    setItems((previous) =>
      previous
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeItem(productId: string) {
    setItems((previous) =>
      previous.filter((item) => item.productId !== productId),
    );
  }

  function clear() {
    setItems([]);
  }

  function changeUnit(nextUnitId: string) {
    if (!getUnit(nextUnitId)) return;
    setUnitId(nextUnitId);
    setItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        unitId,
        lines,
        itemCount,
        subtotalCents,
        addItem,
        changeQuantity,
        removeItem,
        clear,
        changeUnit,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
