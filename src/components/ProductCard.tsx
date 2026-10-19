import { Button, Card } from "react-bootstrap";
import { categoryIcons } from "../data/products";
import { formatCurrency } from "../utils/format";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <Card className="h-100">
      <Card.Body className="d-flex flex-column">
        <i
          className={`bi ${categoryIcons[product.category]} product-icon mb-2`}
          aria-hidden="true"
        />
        <Card.Title as="h3" className="h6">
          {product.name}
        </Card.Title>
        <Card.Text className="text-secondary small flex-grow-1">
          {product.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center gap-2">
          <strong>{formatCurrency(product.priceCents)}</strong>
          <Button
            variant="primary"
            className="btn-lg"
            onClick={() => onAdd(product)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
          >
            Adicionar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
