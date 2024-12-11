import { Outlet, Link, useLocation } from "react-router-dom";
import "./styles/layout.css";
import { useEffect, useState } from "react";

const Layout = () => {
  const [current, setCurrent] = useState(50);
  const [Login, setLogin] = useState(false);
  const location = useLocation(); // Usamos useLocation para detectar cambios en la URL

  useEffect(() => {
    const url = location.pathname;
    if (url.includes("Inventory") || url.includes("inventory") || url.includes("Selected")) {
      setLogin(false);
      setCurrent(2);
    } else if (url.includes("Wishlist")) {
      setLogin(false);
      setCurrent(3);
    } else if (url.includes("AllCards")) {
      setLogin(false);
      setCurrent(4);
    } else if (url.includes("Home") || url.includes("home")) {
      setLogin(false);
      setCurrent(1);
    } else {
      setLogin(true);
    }
  }, [location]); // Dependemos de location para que el efecto se dispare cuando cambie la URL

  return (
    <div
      className="container"
      style={Login ? { justifyContent: "center" } : {}}
    >
      <nav style={Login ? { display: "none", opacity: 0 } : {}}>
        <ul>
          <li
            style={current === 1 ? { backgroundColor: "#f4efe6" } : {}}
            onClick={() => {
              setCurrent(1);
            }}
          >
            <Link to="/Home">Home</Link>
          </li>
          <li
            style={current === 2 ? { backgroundColor: "#f4efe6" } : {}}
            onClick={() => {
              setCurrent(2);
            }}
          >
            <Link to="Inventory">Inventario</Link>
          </li>
          <li
            style={current === 3 ? { backgroundColor: "#f4efe6" } : {}}
            onClick={() => {
              setCurrent(3);
            }}
          >
            <Link to="Wishlist">Wishlist</Link>
          </li>
          <li
            style={current === 4 ? { backgroundColor: "#f4efe6" } : {}}
            onClick={() => {
              setCurrent(4);
            }}
          >
            <Link to="AllCards">Ver todas las cartas</Link>
          </li>
        </ul>
        <Link to={"/"}>Cerrar sesion</Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
