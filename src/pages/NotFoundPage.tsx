import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <h1 className="h3">Página não encontrada</h1>
      <p>O endereço que você acessou não existe.</p>
      <Link to="/" className="btn btn-primary btn-lg">
        Voltar ao início
      </Link>
    </div>
  );
}
