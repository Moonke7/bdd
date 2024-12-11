import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import "../styles/Inventory.css";
import { Link, useNavigate } from "react-router-dom";
import Create from "../components/Create";
import { GlobalContext } from "../GlobalContext";
import folderPic from "../pics/folder.png";

export default function Folders() {
  const { idInventario, setIdCarpeta, setCarpetaNombre } = useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [results, setResults] = useState(null);

  const navigate = useNavigate();

  const togleVisible = () => {
    setVisible(!visible);
  };

  const onchange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
    Filter(e.target.value);
  };

  const Filter = (value) => {
    // si lo que esta en el input es mayor a una letra, se filtrarar
    if (value.length > 1) {
      setResults(
        data.filter((card) =>
          card.nombre.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setResults(data);
    }
  };

  useEffect(() => {
    const loadFolders = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/carpetas/${idInventario}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(`Error al obtener datos ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setData(data);
        setResults(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    loadFolders();
  }, [visible, idInventario]);

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

      <div className="createButtonContainer">
        <div onClick={() => setVisible(!visible)} className="createButton">
          Crear carpeta
        </div>
      </div>
      <div className="foldersContainer">
        {results ? (
          results.map((folder) => (
            <div className="userFolder" key={folder.id_carpeta}>
              <img
                src={folderPic}
                alt={folder.nombre}
                onClick={() => {
                  navigate("/Selected");
                  setIdCarpeta(folder.id_carpeta);
                  setCarpetaNombre(folder.nombre)
                }}
              />
              <h3>{folder.nombre}</h3>
            </div>
          ))
        ) : (
          <h2>cargando...</h2>
        )}
      </div>
      <Create
        visible={visible}
        message={"Ingresa el nombre de la carpeta..."}
        setvisible={togleVisible}
        type={"carpeta"}
      />
    </div>
  );
}
