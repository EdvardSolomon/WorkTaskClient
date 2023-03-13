import { Button, Nav, Navbar } from "react-bootstrap";
import { Link, redirect } from "react-router-dom";

const NavDashboard = (props: {
  name: string;
  isLoggedIn: boolean;
  logout: Function;
}) => {
  const Navlogout = () => {
    // props.logout();
    alert("Logout");
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      variant="light"
      className="border-bottom py-3 shadow-sm d-flex"
    >
      <Navbar.Brand
        as={Link}
        to="/"
        style={{ marginLeft: "60px", marginRight: "auto" }}
      >
        VrealSoft test task
      </Navbar.Brand>
      <Nav style={{ marginRight: "60px" }}>
        {props.isLoggedIn ? (
          <>
            <Nav.Link
              className="d-flex align-items-center justify-content-between"
              style={{ pointerEvents: "unset", cursor: "text" }}
            >
              Welcome,
            </Nav.Link>
            <Nav.Link
              as={Link}
              style={{ marginRight: "10px", marginLeft: "-10px" }}
              className="text-dark"
              to="/"
            >
              <strong>{props.name}</strong>
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="success"
              active
              style={{ marginRight: "5px" }}
              size="sm"
              className="text-white"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Button}
              variant="primary"
              active
              style={{ marginRight: "5px" }}
              size="sm"
              className="text-white"
              onClick={Navlogout}
            >
              Logout
            </Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link active style={{ marginRight: "5px" }} size="sm">
              Loading...
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavDashboard;
