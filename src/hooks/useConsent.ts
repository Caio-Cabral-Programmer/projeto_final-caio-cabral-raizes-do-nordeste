import { useContext } from "react";
import { ConsentContext } from "../context/ConsentContext";

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context)
    throw new Error("useConsent deve ser usado dentro de ConsentProvider");
  return context;
}
