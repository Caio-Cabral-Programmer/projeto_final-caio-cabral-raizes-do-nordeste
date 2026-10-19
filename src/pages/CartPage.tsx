import { Button, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ConsentRequiredAlert } from "../components/ConsentRequiredAlert";
import { getUnit } from "../data/units";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useConsent } from "../hooks/useConsent";
import { useOrders } from "../hooks/useOrders";
import { formatCurrency } from "../utils/format";

export function CartPage() {
  const { unitId, lines, subtotalCents, changeQuantity, removeItem } =
    useCart();
  const { currentUser } = useAuth();
  const { hasConsent } = useConsent();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  if (lines.length === 0) {
    return (
      <>
        <h1 className="h3 mb-3">Carrinho</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/" className="btn btn-primary btn-lg">
          Ver cardápio
        </Link>
      </>
    );
  }

  // Visitantes vão primeiro ao login; usuários autenticados criam o pedido, que começa como "Pendente".
  function handleConfirm() {
    if (!currentUser) {
      navigate("/login", { state: { from: "/carrinho" } });
      return;
    }
    if (createOrder()) navigate("/pedidos", { state: { created: true } });
  }

  return (
    <>
      <h1 className="h3 mb-1">Carrinho</h1>
      <p className="text-secondary">Unidade: {getUnit(unitId)?.name}</p>
      <ListGroup className="mb-3">
        {lines.map(({ product, quantity }) => (
          <ListGroup.Item key={product.id}>
            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-between align-items-sm-center">
              <div>
                <strong>{product.name}</strong>
                <br />
                <small className="text-secondary">
                  {formatCurrency(product.priceCents)} cada
                </small>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Button
                  variant="outline-secondary"
                  aria-label={`Diminuir quantidade de ${product.name}`}
                  onClick={() => changeQuantity(product.id, -1)}
                >
                  <i className="bi bi-dash-lg" aria-hidden="true" />
                </Button>
                <span aria-live="polite" className="px-2">
                  {quantity}
                </span>
                <Button
                  variant="outline-secondary"
                  aria-label={`Aumentar quantidade de ${product.name}`}
                  onClick={() => changeQuantity(product.id, 1)}
                >
                  <i className="bi bi-plus-lg" aria-hidden="true" />
                </Button>
                <strong
                  className="ms-2"
                  style={{ minWidth: 80, textAlign: "right" }}
                >
                  {formatCurrency(product.priceCents * quantity)}
                </strong>
                <Button
                  variant="outline-danger"
                  aria-label={`Remover ${product.name} do carrinho`}
                  onClick={() => removeItem(product.id)}
                >
                  <i className="bi bi-trash3" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <p className="fs-5">
        Subtotal: <strong>{formatCurrency(subtotalCents)}</strong>
      </p>
      {currentUser && <ConsentRequiredAlert />}
      <Button
        variant="primary"
        className="btn-lg w-100"
        onClick={handleConfirm}
        disabled={!!currentUser && !hasConsent}
      >
        {currentUser ? "Confirmar pedido" : "Entrar para continuar"}
      </Button>
    </>
  );
}
