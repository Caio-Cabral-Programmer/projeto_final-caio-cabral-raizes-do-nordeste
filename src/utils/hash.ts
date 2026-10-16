// SHA-256 (hex) de userId + senha. Proteção apenas de simulação: autenticação real é papel do back-end.
export async function hashPassword(
  userId: string,
  password: string,
): Promise<string> {
  const data = new TextEncoder().encode(userId + password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
