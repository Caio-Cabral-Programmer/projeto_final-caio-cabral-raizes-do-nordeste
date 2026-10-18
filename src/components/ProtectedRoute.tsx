import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Envia visitantes anônimos para /login; após um logout explícito, vai para o início.
export function ProtectedRoute() {
  const { currentUser, signedOut } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    if (signedOut) return <Navigate to="/" replace />;
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}
