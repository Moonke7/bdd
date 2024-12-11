import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import "../styles/Inventory.css";
import { Link, useNavigate } from "react-router-dom";
import Create from "../components/Create";
import { GlobalContext } from "../GlobalContext";
import folderPic from "../pics/folder.png";
import Edit from "../components/Edit";

const Cancel01Icon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"red"}
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

const PencilEdit02Icon = (props) => (
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
      d="M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Folders() {
  const { idInventario, setIdCarpeta, setCarpetaNombre } =
    useContext(GlobalContext);
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [results, setResults] = useState(null);

  const [editVisible, setEditVisible] = useState(false);
  const [folderSelected, setFolderSelected] = useState(0);
  const [update, setUpdate] = useState(0);

  const addUpdate = () => {
    setUpdate(update + 1);
  };

  const toggleEditVisible = () => {
    setEditVisible(!editVisible);
  };

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
  }, [visible, idInventario, update]);

  const deleteFolder = async (id) => {
    try {
      if (!id) {
        console.error("El ID de la carpeta no está definido.");
        return;
      }

      const response = await fetch(
        "http://localhost:3002/api/delete/carpetas",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_carpeta: id }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(result.message);
      } else {
        console.error(
          result.error || "Error desconocido al eliminar la carpeta."
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
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
                  setCarpetaNombre(folder.nombre);
                }}
              />
              <h3>{folder.nombre}</h3>
              <Cancel01Icon
                id="delete"
                onClick={() => {
                  deleteFolder(folder.id_carpeta);
                  addUpdate();
                }}
              />
              <PencilEdit02Icon
                id="edit"
                onClick={() => {
                  setEditVisible(true);
                  setFolderSelected(folder.id_carpeta);
                }}
              />
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
      <Edit
        visible={editVisible}
        message={"Ingresa el nuevo nombre de la carpeta"}
        setvisible={toggleEditVisible}
        type={"carpeta"}
        id={folderSelected}
        update={addUpdate}
      />
    </div>
  );
}
