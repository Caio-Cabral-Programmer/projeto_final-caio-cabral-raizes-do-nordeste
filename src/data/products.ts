import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "p01",
    name: "Cuscuz Recheado com Queijo Coalho",
    description:
      "Cuscuz de milho quentinho recheado com queijo coalho derretido.",
    category: "salgado",
    priceCents: 1290,
  },
  {
    id: "p02",
    name: "Cuscuz com Carne de Sol",
    description:
      "Cuscuz fofinho servido com carne de sol desfiada na manteiga de garrafa.",
    category: "salgado",
    priceCents: 1690,
  },
  {
    id: "p03",
    name: "Tapioca de Carne de Sol",
    description: "Tapioca crocante recheada com carne de sol e queijo.",
    category: "salgado",
    priceCents: 1590,
  },
  {
    id: "p04",
    name: "Tapioca de Queijo Coalho com Goiabada",
    description: "A combinação doce e salgada que todo nordestino ama.",
    category: "salgado",
    priceCents: 1190,
  },
  {
    id: "p05",
    name: "Bolo de Macaxeira",
    description: "Bolo macio de macaxeira com coco, assado na hora.",
    category: "doce",
    priceCents: 990,
  },
  {
    id: "p06",
    name: "Bolo de Rolo",
    description:
      "Massa fina enrolada com recheio de goiabada, tradição de Pernambuco.",
    category: "doce",
    priceCents: 1090,
  },
  {
    id: "p07",
    name: "Café Regional",
    description: "Café coado na hora, forte e aromático.",
    category: "bebida",
    priceCents: 590,
  },
  {
    id: "p08",
    name: "Suco de Caju",
    description: "Suco natural de caju, gelado e sem conservantes.",
    category: "bebida",
    priceCents: 890,
  },
  {
    id: "p09",
    name: "Suco de Cajá",
    description: "Suco natural de cajá com sabor levemente ácido.",
    category: "bebida",
    priceCents: 890,
  },
  {
    id: "p10",
    name: "Café da Manhã Nordestino Completo",
    description:
      "Cuscuz, ovo, queijo coalho, bolo e café para começar bem o dia.",
    category: "combo",
    priceCents: 2490,
  },
  {
    id: "p11",
    name: "Macaxeira Frita com Carne de Sol",
    description: "Macaxeira dourada e sequinha acompanhada de carne de sol.",
    category: "salgado",
    priceCents: 1990,
  },
  {
    id: "p12",
    name: "Pamonha",
    description: "Pamonha doce de milho verde, clássico das festas juninas.",
    category: "doce",
    priceCents: 790,
  },
  {
    id: "p13",
    name: "Canjica",
    description: "Canjica cremosa com leite de coco e canela.",
    category: "doce",
    priceCents: 890,
  },
  {
    id: "p14",
    name: "Cartola",
    description: "Banana frita com queijo, açúcar e canela.",
    category: "doce",
    priceCents: 1390,
  },
];

export const categoryIcons: Record<Product["category"], string> = {
  salgado: "bi-basket2-fill",
  doce: "bi-cake2-fill",
  bebida: "bi-cup-straw",
  combo: "bi-cup-hot-fill",
};

// Busca um produto pelo id; retorna undefined para ids desconhecidos
export function getProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
