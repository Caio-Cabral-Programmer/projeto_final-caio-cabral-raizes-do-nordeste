import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { ProfileUpdate } from "./AuthContext";
import { STORAGE_KEYS, load, remove, save } from "../services/storage";
import { hashPassword } from "../utils/hash";
import type { ActionResult, User } from "../types";

interface AuthProviderProps {
  children: ReactNode;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// Autenticação simulada: usuários e sessão ficam no localStorage; as senhas são guardadas com hash.
export function AuthProvider({ children }: AuthProviderProps) {
  const [users, setUsers] = useState<User[]>(() =>
    load<User[]>(STORAGE_KEYS.users, []),
  );
  const [sessionId, setSessionId] = useState<string | null>(() =>
    load<string | null>(STORAGE_KEYS.session, null),
  );
  const [signedOut, setSignedOut] = useState(false);

  useEffect(() => {
    save(STORAGE_KEYS.users, users);
  }, [users]);

  useEffect(() => {
    if (sessionId === null) remove(STORAGE_KEYS.session);
    else save(STORAGE_KEYS.session, sessionId);
  }, [sessionId]);

  const currentUser = users.find((user) => user.id === sessionId) ?? null;

  // Cria a conta (e-mail único) e já autentica o usuário.
  async function register(
    name: string,
    email: string,
    password: string,
  ): Promise<ActionResult> {
    const normalized = normalizeEmail(email);
    if (users.some((user) => user.email === normalized)) {
      return { ok: false, error: "Este e-mail já está cadastrado." };
    }
    const id = crypto.randomUUID();
    const user: User = {
      id,
      name: name.trim(),
      email: normalized,
      passwordHash: await hashPassword(id, password),
      createdAt: new Date().toISOString(),
      points: 0,
      confirmedOrdersCount: 0,
      freeOrderVouchers: 0,
    };
    setUsers((previous) => [...previous, user]);
    setSessionId(id);
    setSignedOut(false);
    return { ok: true };
  }

  // Mensagem de falha genérica de propósito: nunca revela se o e-mail ou a senha estava errado.
  async function login(email: string, password: string): Promise<ActionResult> {
    const user = users.find(
      (candidate) => candidate.email === normalizeEmail(email),
    );
    const invalid: ActionResult = {
      ok: false,
      error: "E-mail ou senha inválidos.",
    };
    if (!user) return invalid;
    const hash = await hashPassword(user.id, password);
    if (hash !== user.passwordHash) return invalid;
    setSessionId(user.id);
    setSignedOut(false);
    return { ok: true };
  }

  function logout() {
    setSessionId(null);
    setSignedOut(true);
  }

  // Edita nome, e-mail e, opcionalmente, a senha do usuário autenticado.
  async function updateProfile(update: ProfileUpdate): Promise<ActionResult> {
    if (!currentUser) return { ok: false, error: "Sessão expirada." };
    const email = normalizeEmail(update.email);
    if (
      users.some((user) => user.id !== currentUser.id && user.email === email)
    ) {
      return {
        ok: false,
        error: "Este e-mail já está em uso por outra conta.",
      };
    }
    const passwordHash = update.password
      ? await hashPassword(currentUser.id, update.password)
      : currentUser.passwordHash;
    const updated: User = {
      ...currentUser,
      name: update.name.trim(),
      email,
      passwordHash,
    };
    setUsers((previous) =>
      previous.map((user) => (user.id === updated.id ? updated : user)),
    );
    return { ok: true };
  }

  // Remove a conta e a sessão
  function deleteAccount() {
    if (!currentUser) return;
    setUsers((previous) =>
      previous.filter((user) => user.id !== currentUser.id),
    );
    setSessionId(null);
    setSignedOut(true);
  }

  function updateUserLoyalty(user: User) {
    setUsers((previous) =>
      previous.map((item) => (item.id === user.id ? user : item)),
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signedOut,
        register,
        login,
        logout,
        updateProfile,
        deleteAccount,
        updateUserLoyalty,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
