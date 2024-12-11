import { useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null); // Para manejar errores
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true); // Inicia el estado de carga
    setError(null); // Limpia errores anteriores
    try {
      const response = await fetch("http://localhost:3002/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indica que estás enviando JSON
        },
        body: JSON.stringify({
          username: name,
          password: password,
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json(); // Procesa la respuesta como JSON
      console.log("Respuesta del servidor:", data);
      alert("Registro exitoso");
      navigate("/")
    } catch (err) {
      console.error("Error durante el registro:", err);
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
        placeholder={"Nombre de usuario.."}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Cargando..." : "Registrar"}
        </button>
        <h4>
          ¿Ya tienes cuenta? <Link to={"/"}>Inicia sesion</Link>
        </h4>
        {error && <p className="error">{error}</p>} {/* Muestra errores */}
      </div>
    </div>
  );
}
