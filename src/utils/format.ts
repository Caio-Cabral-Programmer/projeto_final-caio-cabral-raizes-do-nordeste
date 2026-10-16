const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

// Os preços ficam em centavos; este é o único lugar que os converte para exibição.
export function formatCurrency(cents: number): string {
  return currencyFormatter.format(cents / 100);
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "" : dateTimeFormatter.format(date);
}

// Código curto do pedido mostrado ao cliente.
export function orderCode(id: string): string {
  return `#${id.slice(-6).toUpperCase()}`;
}

// Mantém só dígitos e agrupa em blocos de 4 (máximo de 16 dígitos).
export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

// Mantém só dígitos e insere a barra: "1230" -> "12/30".
export function formatCardExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2
    ? `${digits.slice(0, 2)}/${digits.slice(2)}`
    : digits;
}
