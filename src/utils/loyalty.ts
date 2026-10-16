import type { DiscountType, Pricing, User } from "../types";

export const POINTS_PER_ORDER = 10;
export const DISCOUNT_POINTS_THRESHOLD = 30;
export const DISCOUNT_POINTS_COST = 30;
export const DISCOUNT_RATE = 0.1;
// A cada 5 pedidos confirmados, ganha-se um voucher de pedido grátis
export const FREE_ORDER_MILESTONE = 5;


// Define o benefício de um pagamento: primeiro pedido grátis, depois 10% de desconto, senão o valor integral. Os benefícios nunca se acumulam.
export function calculatePricing(
  subtotalCents: number,
  user: Pick<User, "points" | "freeOrderVouchers">,
): Pricing {
  if (user.freeOrderVouchers > 0) {
    return {
      discountType: "free",
      discountCents: subtotalCents,
      totalCents: 0,
    };
  }
  if (user.points >= DISCOUNT_POINTS_THRESHOLD) {
    const discountCents = Math.round(subtotalCents * DISCOUNT_RATE);
    return {
      discountType: "loyalty",
      discountCents,
      totalCents: subtotalCents - discountCents,
    };
  }
  return { discountType: "none", discountCents: 0, totalCents: subtotalCents };
}

// Aplica os efeitos de fidelidade de um pagamento confirmado e devolve o usuário atualizado: consome o benefício usado, soma os pontos, conta o pedido e concede o voucher de pedido grátis.
export function applyConfirmation(
  user: User,
  discountType: DiscountType,
): User {
  let points = user.points;
  let vouchers = user.freeOrderVouchers;

  if (discountType === "free") vouchers -= 1;
  if (discountType === "loyalty") points -= DISCOUNT_POINTS_COST;

  points += POINTS_PER_ORDER;
  const confirmedOrdersCount = user.confirmedOrdersCount + 1;
  if (confirmedOrdersCount === FREE_ORDER_MILESTONE) vouchers += 1;

  return { ...user, points, confirmedOrdersCount, freeOrderVouchers: vouchers };
}

export function pointsMissingForDiscount(points: number): number {
  return Math.max(0, DISCOUNT_POINTS_THRESHOLD - points);
}

export function ordersMissingForFreeOrder(
  confirmedOrdersCount: number,
): number {
  return Math.max(0, FREE_ORDER_MILESTONE - confirmedOrdersCount);
}
