export const STORAGE_KEYS = {
  users: "rn_users",
  session: "rn_session",
  orders: "rn_orders",
  cart: "rn_cart",
  unit: "rn_unit",
  consent: "rn_consent",
} as const;

// Lê um valor JSON; qualquer falha (ausente, JSON inválido, armazenamento bloqueado) retorna o valor padrão.
export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

// Grava um valor JSON; erros (cota, modo privado) são ignorados e o app segue funcionando em memória.
export function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Armazenamento indisponível: não foi possível salvar", e);
  }
}

// Remove um valor do localStorage; erros são ignorados e logados no console.
export function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Armazenamento indisponível: nada a remover", e);
  }
}
