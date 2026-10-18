import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";

export function AppNavbar() {
  const { currentUser, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
    logout();
  }

  return (
    <header>
      <Navbar expand="md" bg="dark" data-bs-theme="dark" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-accent fw-bold">
            <i className="bi bi-basket2-fill me-2" aria-hidden="true" />
            Raízes do Nordeste
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="main-navigation"
            aria-label="Abrir menu"
          />
          <Navbar.Collapse id="main-navigation">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end eventKey="home">
                Cardápio
              </Nav.Link>
              {currentUser && (
                <>
                  <Nav.Link as={NavLink} to="/pedidos" eventKey="orders">
                    Meus pedidos
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/perfil" eventKey="profile">
                    Perfil
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Nav className="align-items-md-center gap-md-2">
              <Nav.Link as={NavLink} to="/carrinho" eventKey="cart">
                <i className="bi bi-cart3 me-1" aria-hidden="true" />
                Carrinho{" "}
                <Badge bg="primary" text="dark">
                  {itemCount}
                  <span className="visually-hidden"> itens no carrinho</span>
                </Badge>
              </Nav.Link>
              {currentUser ? (
                <>
                  <Navbar.Text className="me-md-1">
                    Olá, {currentUser.name.split(" ")[0]}
                  </Navbar.Text>
                  <Button variant="outline-light" onClick={handleLogout}>
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" eventKey="login">
                    Entrar
                  </Nav.Link>
                  <Link to="/cadastro" className="btn btn-primary">
                    Cadastrar
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
