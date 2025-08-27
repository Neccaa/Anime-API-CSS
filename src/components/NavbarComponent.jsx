import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { navLinks } from "../data/index.js";
import { NavLink, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const changeBackgroundColor = () => {
    setChangeColor(window.scrollY >= 100);
  };

  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener("scroll", changeBackgroundColor);
    return () => window.removeEventListener("scroll", changeBackgroundColor);
  }, []);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(loggedIn);
    if (loggedIn && email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      className={`navbar custom-navbar ${changeColor ? "color-active" : ""}`}
      fixed="top"
    >
      <Container fluid="lg">
        <Navbar.Brand href="/">
          <img
            src="/src/assets/img/logo-kereta.png"
            alt="Logo Kereta Api Indonesia"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="mx-auto d-flex flex-column flex-lg-row align-items-center gap-2 gap-lg-3 mt-3 mt-lg-0">
            {navLinks.map((link) => (
              <div className="nav-link" key={link.id}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-item-link ${isActive ? "active" : ""} ${changeColor ? "scrolled" : ""}`
                  }
                  end
                >
                  {link.text}
                </NavLink>
              </div>
            ))}
          </Nav>

          <div className="text-center mt-3 mt-lg-0 d-flex align-items-center justify-content-center gap-2">
            {isLoggedIn ? (
              <NavDropdown
                title={
                  userEmail
                    ? userEmail.charAt(0).toUpperCase() + "***"
                    : "USER"
                }
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item
                  onClick={handleLogout}
                  className="d-flex align-items-center gap-2 py-2 px-3 text-danger fw-semibold logout-item"
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  Keluar
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline-dark rounded-1 px-4"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-dark rounded-1 px-4"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
