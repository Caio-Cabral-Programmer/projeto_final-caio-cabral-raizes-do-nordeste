// Cada validador retorna uma mensagem de erro, ou null quando o valor é válido.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateName(value: string): string | null {
  const name = value.trim();
  if (name.length === 0) return "Informe seu nome.";
  if (name.length < 3) return "O nome deve ter pelo menos 3 caracteres.";
  return null;
}

export function validateEmail(value: string): string | null {
  return EMAIL_PATTERN.test(value.trim()) ? null : "Informe um e-mail válido.";
}

export function validatePassword(value: string): string | null {
  return value.length >= 6 ? null : "A senha deve ter pelo menos 6 caracteres.";
}

export function validatePasswordConfirmation(
  password: string,
  confirmation: string,
): string | null {
  return password === confirmation ? null : "As senhas não conferem.";
}

export function validateCardNumber(value: string): string | null {
  return value.replace(/\D/g, "").length === 16
    ? null
    : "Informe um número de cartão com 16 dígitos.";
}

export function validateCardHolder(value: string): string | null {
  return value.trim().length > 0 ? null : "Informe o nome impresso no cartão.";
}

// Aceita MM/AA com mês real; o mês atual ainda é válido.
export function validateCardExpiry(
  value: string,
  now: Date = new Date(),
): string | null {
  const match = /^(\d{2})\/(\d{2})$/.exec(value.trim());
  if (!match) return "Informe a validade no formato MM/AA.";

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return "Informe a validade no formato MM/AA.";

  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  if (year < currentYear || (year === currentYear && month < currentMonth))
    return "Cartão vencido.";
  return null;
}

export function validateCardCvv(value: string): string | null {
  return /^\d{3}$/.test(value) ? null : "Informe o CVV com 3 dígitos.";
}
