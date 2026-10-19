import { useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ConfirmModal } from "../components/ConfirmModal";
import { ProductCard } from "../components/ProductCard";
import { UnitSelector } from "../components/UnitSelector";
import { getUnit, getUnitProducts } from "../data/units";
import { useCart } from "../hooks/useCart";
import type { Product } from "../types";

export function HomePage() {
  const { unitId, lines, changeUnit, addItem } = useCart();
  const location = useLocation();
  const [pendingUnitId, setPendingUnitId] = useState<string | null>(null);
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(
    Boolean((location.state as { welcome?: boolean } | null)?.welcome),
  );

  const products = getUnitProducts(unitId);

  // Trocar de unidade esvazia o carrinho; por isso pergunta antes quando há itens.
  function handleUnitChange(nextUnitId: string) {
    if (nextUnitId === unitId) return;
    if (lines.length > 0) setPendingUnitId(nextUnitId);
    else changeUnit(nextUnitId);
  }

  function confirmUnitChange() {
    if (pendingUnitId) changeUnit(pendingUnitId);
    setPendingUnitId(null);
    setLastAdded(null);
  }

  function handleAdd(product: Product) {
    addItem(product.id);
    setLastAdded(product.name);
  }

  return (
    <>
      <h1 className="h3 mb-3">Cardápio</h1>
      {showWelcome && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setShowWelcome(false)}
        >
          Conta criada com sucesso!
        </Alert>
      )}
      <UnitSelector value={unitId} onChange={handleUnitChange} />
      {lastAdded && (
        <Alert variant="success" dismissible onClose={() => setLastAdded(null)}>
          {lastAdded} adicionado ao carrinho.{" "}
          <Link to="/carrinho">Ver carrinho</Link>
        </Alert>
      )}
      <Row className="g-3">
        {products.map((product) => (
          <Col xs={12} sm={6} lg={4} key={product.id}>
            <ProductCard product={product} onAdd={handleAdd} />
          </Col>
        ))}
      </Row>

      <ConfirmModal
        show={pendingUnitId !== null}
        title="Trocar de unidade"
        message={`Trocar para ${pendingUnitId ? getUnit(pendingUnitId)?.name : ""} esvazia o carrinho atual. Deseja continuar?`}
        confirmLabel="Trocar de unidade"
        confirmVariant="primary"
        onConfirm={confirmUnitChange}
        onCancel={() => setPendingUnitId(null)}
      />
    </>
  );
}
