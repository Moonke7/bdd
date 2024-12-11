import React, { useContext, useEffect, useState } from "react";
import "../styles/AllCards.css";
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

export default function SelectCard({ card, view, setview }) {
  const { idInventario, idWishlist } = useContext(GlobalContext);
  const [results, setResults] = useState(null);
  const [resultsDecks, setResultsDecks] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addCard = async () => {
    if (!selectedOption) {
      alert("selecciona alguna carpeta");
    }
    console.log(selectedOption);
    console.log(card[0].id_carta);
    try {
      const response = await fetch(`http://localhost:3002/api/carpeta/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartaId: card[0].id_carta, // Envía el nombre como JSON
          carpetaId: selectedOption,
          quantity: 1,
        }),
      });

      if (response.status !== 200) {
        throw new Error(`Error al añadir la carta: ${response.status}`);
      }

      setview(false);
      const data = await response.json();
      console.log("Carta añadida con exito:", data);
    } catch (error) {
      console.error("Error al añadir la carta:", error);
    }
  };

  const addCardDeck = async () => {
    if (!selectedDeck) {
      alert("selecciona alguna carpeta");
    }
    console.log(selectedDeck);
    console.log(card[0].id_carta);
    try {
      const response = await fetch(`http://localhost:3002/api/mazo/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartaId: card[0].id_carta, // Envía el nombre como JSON
          mazoId: selectedDeck,
          quantity: 1,
        }),
      });

      if (response.status !== 200) {
        throw new Error(`Error al añadir la carta: ${response.status}`);
      }

      setview(false);
      const data = await response.json();
      console.log("Carta añadida con exito:", data);
    } catch (error) {
      console.error("Error al añadir la carta:", error);
    }
  };

  const addCardWL = async () => {
    try {
      const response = await fetch(`http://localhost:3002/api/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartaId: card[0].id_carta, // Envía el nombre como JSON
          id_wishlist: idWishlist,
          quantity: 1,
        }),
      });

      if (response.status !== 200) {
        throw new Error(`Error al añadir la carta: ${response.status}`);
      }

      setview(false);
      const data = await response.json();
      console.log("Carta añadida con exito:", data);
    } catch (error) {
      console.error("Error al añadir la carta:", error);
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
        setResults(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    const loadDecks = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/mazos/${idInventario}`,
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
        setResultsDecks(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    loadFolders();
    loadDecks();
  }, [idInventario]);

  return (
    <div
      style={
        view
          ? { display: "flex", opacity: 1, transition: "1s" }
          : { display: "none", opacity: 0 }
      }
    >
      <div
        className="modalContainer"
        style={
          view
            ? { display: "flex", opacity: 1 }
            : { display: "none", opacity: 0 }
        }
      >
        <Cancel01Icon
          id="close"
          onClick={() => {
            setview(false);
          }}
        />
        <img src={card[0].img} alt={card[0].name} />
        <div className="info">
          <h2>{card[0].carta_nombre}</h2>
          <h4>Color: {card[0].color}</h4>
          <h4>Categoria: {card[0].categoria}</h4>
          <h4>Coste: {card[0].cost}</h4>
          <h4>Poder: {card[0].power}</h4>
          <div className="buttons">
            <label className="button" onClick={addCardWL}>Añadir a wishlist</label>

            <select
              id="options"
              value={selectedOption}
              onChange={handleSelectChange}
              style={{ marginBottom: 0 }}
            >
              <option value="">--Seleccione carpeta--</option>
              {results ? (
                results.map((option, index) => (
                  <option key={index} value={option.id_carpeta}>
                    {option.nombre}
                  </option>
                ))
              ) : (
                <option value={"cargando"}>cargando</option>
              )}
            </select>
            <select
              id="options"
              value={selectedDeck}
              onChange={(e) => setSelectedDeck(e.target.value)}
            >
              <option value="">--Seleccione mazo--</option>
              {resultsDecks ? (
                resultsDecks.map((option, index) => (
                  <option key={index} value={option.id_mazo}>
                    {option.nombre}
                  </option>
                ))
              ) : (
                <option value={"cargando"}>cargando</option>
              )}
            </select>
            <div className="addButtons">
              <button onClick={addCardDeck}>Añadir a mazo</button>
              <button onClick={addCard}>añadir a carpeta</button>
            </div>
          </div>
        </div>
      </div>
      <label className="fondo"></label>
    </div>
  );
}
