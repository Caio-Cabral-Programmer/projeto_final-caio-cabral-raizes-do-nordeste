import type { Unit } from "../types";
import { getProduct } from "./products";

// Toda unidade vende exatamente 10 produtos; as listas são diferentes para refletir cardápios regionais e sazonais.
export const units: Unit[] = [
  {
    id: "recife-boa-viagem",
    name: "Recife - Boa Viagem",
    note: "Cozinha completa",
    productIds: [
      "p01",
      "p02",
      "p03",
      "p04",
      "p05",
      "p06",
      "p07",
      "p08",
      "p09",
      "p10",
    ],
  },
  {
    id: "caruaru-centro",
    name: "Caruaru - Centro",
    note: "Cardápio junino",
    productIds: [
      "p01",
      "p02",
      "p03",
      "p05",
      "p07",
      "p08",
      "p10",
      "p12",
      "p13",
      "p14",
    ],
  },
  {
    id: "fortaleza-aldeota",
    name: "Fortaleza - Aldeota",
    note: "Formato reduzido",
    productIds: [
      "p01",
      "p03",
      "p04",
      "p05",
      "p06",
      "p07",
      "p08",
      "p09",
      "p11",
      "p14",
    ],
  },
];

export const DEFAULT_UNIT_ID = units[0].id;

export function getUnit(id: string): Unit | undefined {
  return units.find((unit) => unit.id === id);
}

// Produtos oferecidos por uma unidade, na ordem da própria unidade.
export function getUnitProducts(unitId: string) {
  const unit = getUnit(unitId);
  if (!unit) return [];
  return unit.productIds.flatMap((id) => {
    const product = getProduct(id);
    return product ? [product] : [];
  });
}
