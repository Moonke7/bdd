import React, { useContext, useState } from "react";
import "../styles/Inventory.css";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../GlobalContext";

const Cancel01Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Create({ message, visible, type, setvisible }) {
  const [inputValue, setInputValue] = useState("");
  const { idInventario } = useContext(GlobalContext);

  const onchange = (e) => {
    setInputValue(e.target.value);
  };

  const navigate = useNavigate();

  /* si es q el tipo es 'carpeta' se añadira una carpeta, caso contrario, se añadira un mazo. Asi veremos q endpoint usar*/
  const createFolder = async () => {
    if (inputValue.length === 0) {
      alert("pon un nombre valido");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3002/api/crear/folders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: inputValue, // Envía el nombre como JSON
          id_inventario: idInventario,
        }),
      });

      if (response.status !== 201) {
        if (response.status === 403) {
          navigate("/");
        }
        throw new Error(`Error al crear carpeta: ${response.status}`);
      }
      setvisible();
      const data = await response.json();
      console.log("Carpeta creada con éxito:", data);
    } catch (error) {
      console.error("Error al crear carpeta:", error);
    }
  };

  const createDeck = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/crear/mazo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: inputValue, // Envía el nombre como JSON
          id_inventario: idInventario,
        }),
      });

      if (response.status !== 201) {
        if (response.status === 403) {
          navigate("/");
        }
        throw new Error(`Error al crear carpeta: ${response.status}`);
      }
      setvisible();
      const data = await response.json();
      console.log("Carpeta creada con éxito:", data);
    } catch (error) {
      console.error("Error al crear carpeta:", error);
    }
  };

  return (
    <div
      style={
        visible
          ? { display: "flex", opacity: 1, top: "30%" }
          : {
              display: "flex",
              top: "-500px",
            }
      }
    >
      <div
        className="createContainer"
        style={
          visible
            ? { display: "flex", opacity: 1, top: "30%" }
            : {
                display: "flex",
                top: "-500px",
              }
        }
      >
        <input
          value={inputValue}
          onChange={(e) => onchange(e)}
          placeholder={message}
        />
        <button
          onClick={() => (type === "carpeta" ? createFolder() : createDeck())}
        >
          Crear!
        </button>
        <Cancel01Icon onClick={setvisible} id="close" />
      </div>
    </div>
  );
}
