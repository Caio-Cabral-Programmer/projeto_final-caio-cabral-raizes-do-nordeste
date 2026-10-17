import { useState } from "react";
import type { ReactNode } from "react";
import { ConsentContext } from "./ConsentContext";
import { PRIVACY_POLICY_VERSION } from "../data/privacyText";
import { STORAGE_KEYS, load, save } from "../services/storage";
import type { ConsentRecord } from "../types";

interface ConsentProviderProps {
  children: ReactNode;
}

// Guarda o registro de consentimento LGPD (aceito, recusado ou revogado) e a visibilidade do modal de consentimento.
export function ConsentProvider({ children }: ConsentProviderProps) {
  const [consent, setConsent] = useState<ConsentRecord | null>(() =>
    load<ConsentRecord | null>(STORAGE_KEYS.consent, null),
  );
  // O modal abre na primeira visita e após uma revogação.
  const [isModalOpen, setIsModalOpen] = useState(
    () => consent === null || consent.status === "revoked",
  );

  function record(status: ConsentRecord["status"]) {
    const next: ConsentRecord = {
      status,
      timestamp: new Date().toISOString(),
      policyVersion: PRIVACY_POLICY_VERSION,
    };
    setConsent(next);
    save(STORAGE_KEYS.consent, next);
  }

  function accept() {
    record("accepted");
    setIsModalOpen(false);
  }

  function decline() {
    record("declined");
    setIsModalOpen(false);
  }

  function revoke() {
    record("revoked");
    setIsModalOpen(true);
  }

  return (
    <ConsentContext.Provider
      value={{
        consent,
        hasConsent: consent?.status === "accepted",
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        accept,
        decline,
        revoke,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
