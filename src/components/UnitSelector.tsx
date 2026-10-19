import { Badge, Form } from "react-bootstrap";
import { units } from "../data/units";

interface UnitSelectorProps {
  value: string;
  onChange: (unitId: string) => void;
}

export function UnitSelector({ value, onChange }: UnitSelectorProps) {
  const selected = units.find((unit) => unit.id === value);

  return (
    <Form.Group controlId="unit-select" className="mb-3">
      <Form.Label className="fw-semibold">Unidade</Form.Label>
      <div className="d-flex flex-column flex-sm-row gap-2 align-items-sm-center">
        <Form.Select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-auto"
          size="lg"
        >
          {units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name}
            </option>
          ))}
        </Form.Select>
        {selected && (
          <Badge
            bg="secondary"
            className="align-self-start align-self-sm-center"
          >
            {selected.note}
          </Badge>
        )}
      </div>
    </Form.Group>
  );
}
