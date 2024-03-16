import { useState, useRef, useEffect } from "react";
import { Navbar, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const role = user?.role;
  const navbarRef = useRef(null);

  const [navbar, setNavbar] = useState(false);
  const [navbarbrand, setColor] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleOutsideClick = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleNavLinkClick = () => {
    setExpanded(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    window.location = "/";
  };

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const changeColor = () => {
    if (window.scrollY >= 80) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  window.addEventListener("scroll", changeColor);

  return (
    <>
      <Navbar
        ref={navbarRef}
        expanded={expanded}
        scrolling="true"
        light="true"
        expand="lg"
        fixed="top"
        variant="dark"
        bg="white"
        className={navbar ? "navbar active" : "navbar"}
      >
        <div className="container-fluid">
          <Navbar.Brand
            as={Link}
            to="/"
            onClick={() => setExpanded(false)}
            className={
              navbarbrand ? "color text-bold py-3" : "color text-bold py-3"
            }
          >
            <img
              src="../../../images/ebnb-logo.png"
              alt="Logo"
              className="logo-img"
              onClick={() => navigate("/")}
            />
          </Navbar.Brand>

          <Navbar.Toggle
            onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
            className={navbarbrand ? "color" : "color text"}
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </Navbar.Toggle>

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="mx-auto nav-link-text" onClick={handleNavLinkClick}>
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => setExpanded(false)}
                className={
                  navbarbrand
                    ? "color text nav-link-text"
                    : "color text nav-link-text"
                }
              >
                Home
              </Nav.Link>

              {role === "partner" && (
                <Nav.Link
                  onClick={() => setExpanded(false)}
                  as={Link}
                  to={"/dashboard"}
                  className={
                    navbarbrand
                      ? "color text nav-link-text"
                      : "color text nav-link-text"
                  }
                >
                  Dashboard
                </Nav.Link>
              )}

              {role === "admin" && (
                <Nav.Link
                  onClick={() => setExpanded(false)}
                  as={Link}
                  to={"/admin-dashboard"}
                  className={
                    navbarbrand
                      ? "color text nav-link-text"
                      : "color text nav-link-text"
                  }
                >
                  Dashboard
                </Nav.Link>
              )}

              {(role === "partner" || role === "admin") && (
                <Nav.Link
                  as={Link}
                  to={"/create-room/" + user?.id}
                  onClick={() => setExpanded(false)}
                  className={navbarbrand ? "color text" : "color text"}
                >
                  Create Room
                </Nav.Link>
              )}

              <Nav.Link
                onClick={() => setExpanded(false)}
                className={navbarbrand ? "color text" : "color text"}
              >
                Estate Agents
              </Nav.Link>

              <Nav.Link
                onClick={() => setExpanded(false)}
                className={navbarbrand ? "color text" : "color text"}
              >
                Ebudget Hotels
              </Nav.Link>

              <Nav.Link
                onClick={() => setExpanded(false)}
                className={navbarbrand ? "color text" : "color text"}
              >
                Event Centres
              </Nav.Link>
              <Nav.Link
                onClick={() => setExpanded(false)}
                className={navbarbrand ? "color text" : "color text"}
              >
                Flight
              </Nav.Link>
            </Nav>

            <Nav className="sm">
              {!user && (
                <Button
                  style={{ background: "#2a2185" }}
                  className="custom-button sm me-2"
                  as={Link}
                  to="/partner-register"
                >
                  List Your Property
                </Button>
              )}

              {role === "partner" || role === "admin" ? (
                <Link to={`/list-property/${user?.id}`}>
                  <Button
                    style={{ background: "#2a2185" }}
                    className="custom-button mx-4"
                  >
                    List Your property
                  </Button>
                </Link>
              ) : null}

              {user && (
                <Button
                  style={{ background: "#2a2185" }}
                  className="custom-button mx-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}

              {!user && (
                <>
                  <Button
                    style={{ background: "#2a2185" }}
                    className="custom-button sm"
                    as={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    style={{ background: "#2a2185" }}
                    className="custom-button mx-4"
                    as={Link}
                    to="/register"
                  >
                    Guest's Register
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
}
