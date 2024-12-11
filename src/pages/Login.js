import { useContext, useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Para manejar errores
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const { setUsername, setIdUser, setIdWishlist, setIdInventario } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Inicia el estado de carga
    setError(null); // Limpia errores anteriores
    try {
      const response = await fetch("http://localhost:3002/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica que estás enviando JSON
        },
        body: JSON.stringify({
          email: name,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json(); // Procesa la respuesta como JSON
      navigate("Home");
      setUsername(data.user[0].username);
      setIdUser(data.user[0].id_usuario);
      setIdInventario(data.user[0].id_inventario);
      setIdWishlist(data.user[0].id_wishlist);
    } catch (err) {
      console.error("Error durante el inicio de sesión:", err);
      setError(err.message); // Muestra el error en el estado
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  return (
    <div className="LoginContainer">
      <img
        src="https://cdn.icon-icons.com/icons2/1029/PNG/256/Luffys_flag_icon-icons.com_76118.png"
        alt="icon"
      />
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={"Email.."}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={"Contraseña.."}
        type="password" // Esto oculta el texto ingresado
      />
      <div className="sendContainer">
        <button className="send" onClick={handleLogin} disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
        <h4>
          ¿No tienes cuenta? <Link to={"Register"}>Regístrate</Link>
        </h4>
        {error && <p className="error">{error}</p>} {/* Muestra errores */}
      </div>
    </div>
  );
}
