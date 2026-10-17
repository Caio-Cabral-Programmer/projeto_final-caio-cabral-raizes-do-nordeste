import { createContext } from "react";
import type { ConsentRecord } from "../types";

export interface ConsentContextValue {
  consent: ConsentRecord | null;
  hasConsent: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  accept: () => void;
  decline: () => void;
  revoke: () => void;
}

export const ConsentContext = createContext<ConsentContextValue | null>(null);
