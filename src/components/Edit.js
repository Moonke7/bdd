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

export default function Edit({
  message,
  visible,
  type,
  setvisible,
  id,
  update,
}) {
  const [inputValue, setInputValue] = useState("");

  const onchange = (e) => {
    setInputValue(e.target.value);
  };

  const navigate = useNavigate();

  const EditFolderName = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/carpeta/nombre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carpetaId: id, // idCarpeta desde el contexto
          nombre: inputValue, // nuevo nombre desde el estado inputValue
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Nombre de carpeta actualizado con éxito");
        setvisible(false); // Oculta el modal después de la actualización
        update();
      } else {
        alert("Error al actualizar el nombre de la carpeta");
      }
    } catch (error) {
      console.error("Error al actualizar el nombre de la carpeta:", error);
      alert("Ocurrió un error al intentar actualizar la carpeta");
    }
  };

  const EditDeckName = async () => {
    try {
      const response = await fetch("http://localhost:3002/api/mazo/nombre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mazoId: id, // idMazo desde el contexto
          nombre: inputValue, // nuevo nombre desde el estado inputValue
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Nombre del mazo actualizado con éxito");
        setvisible(false); // Oculta el modal después de la actualización
      } else {
        alert("Error al actualizar el nombre del mazo");
      }
    } catch (error) {
      console.error("Error al actualizar el nombre del mazo:", error);
      alert("Ocurrió un error al intentar actualizar el mazo");
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
          onClick={() =>
            type === "carpeta" ? EditFolderName() : EditDeckName()
          }
        >
          Crear!
        </button>
        <Cancel01Icon onClick={setvisible} id="close" />
      </div>
    </div>
  );
}
