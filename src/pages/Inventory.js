import { useState } from "react";
import Input from "../components/Input";
import "../styles/Inventory.css";
import { Link } from "react-router-dom";

function Inventory() {
  const [inputValue, setInputValue] = useState("");

  const onchange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  return (
    <div className="inventory__container">
      <h1>Inventario</h1>
      <Input
        value={inputValue}
        onchange={onchange}
        placeholder={"Buscar por nombre de carpeta.."}
      />
      <div className="deck_folder">
        <Link
          to={"/Inventory/folders"}
          className="deck"
          style={{
            padding: ".5em 1em",
            borderBottom: "solid .2em #399083",
            cursor: "pointer",
            color: "#312019",
            textDecoration: "none",
            fontSize: "1.1em",
            fontWeight: "700",
          }}
        >
          Carpetas
        </Link>
        <Link
          to={"/inventory/decks"}
          className="folder"
          style={{
            cursor: "pointer",
            padding: ".5em 1em",
            textDecoration: "none",
            fontSize: "1.1em",
            fontWeight: "700",
          }}
        >
          Mazos
        </Link>
      </div>
    </div>
  );
}

export default Inventory;
