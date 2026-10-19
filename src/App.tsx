import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import { ConsentProvider } from "./context/ConsentProvider";
import { OrdersProvider } from "./context/OrdersProvider";
import { CartPage } from "./pages/CartPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { OrdersPage } from "./pages/OrdersPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";

// Os providers envolvem as rotas nesta ordem: consentimento > autenticação > carrinho > pedidos.
function App() {
  return (
    <ConsentProvider>
      <AuthProvider>
        <CartProvider>
          <OrdersProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="carrinho" element={<CartPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="cadastro" element={<RegisterPage />} />
                <Route path="privacidade" element={<PrivacyPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="pedidos" element={<OrdersPage />} />
                  <Route path="perfil" element={<ProfilePage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </OrdersProvider>
        </CartProvider>
      </AuthProvider>
    </ConsentProvider>
  );
}

export default App;
