export type OrderStatus = "Pendente" | "Confirmado";
export type DiscountType = "none" | "loyalty" | "free";
export type ProductCategory = "salgado" | "doce" | "bebida" | "combo";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  priceCents: number;
}

export interface Unit {
  id: string;
  name: string;
  note: string;
  productIds: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  points: number;
  confirmedOrdersCount: number;
  freeOrderVouchers: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  unitId: string;
  unitName: string;
  items: OrderItem[];
  subtotalCents: number;
  discountType: DiscountType;
  discountCents: number;
  totalCents: number;
  status: OrderStatus;
  createdAt: string;
  paidAt?: string;
  transactionId?: string;
}

export interface ConsentRecord {
  status: "accepted" | "declined" | "revoked";
  timestamp: string;
  policyVersion: string;
}

export interface Pricing {
  discountType: DiscountType;
  discountCents: number;
  totalCents: number;
}

export type ActionResult = { ok: true } | { ok: false; error: string };
