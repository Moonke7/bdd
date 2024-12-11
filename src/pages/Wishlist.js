import React, { useContext, useEffect, useState } from "react";
import RenderCards from "../components/RenderCards";
import { GlobalContext } from "../GlobalContext";

export default function Wishlist() {
  const { idInventario, idWishlist } = useContext(GlobalContext);
  const [cards, setCards] = useState(null);
  const [results, setResults] = useState(cards);
  const [selectedCard, setSelectedCard] = useState(cards);

  const Select = (Id) => {
    // busca la carta clickeada en todas las cartas y hace que el modal sea visible
    setSelectedCard(cards.filter((card) => card.id_carta === Id));
  };

  useEffect(() => {
    const loadCards = async () => {
      console.log(idWishlist);
      try {
        const response = await fetch(
          `http://localhost:3002/api/wishlist/${idWishlist}/cards`,
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
        setCards(data);
        setResults(data);
        setSelectedCard(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    loadCards();
  }, [idInventario, idWishlist]);
  return (
    <div>
      <h1
        style={{
          textDecoration: "underline",
          marginBottom: "15px",
          color: "#312019",
        }}
      >
        Wishlist
      </h1>
      <div className="cardsContainer">
        {cards ? (
          <RenderCards data={results} select={Select} />
        ) : (
          <h3>cargando...</h3>
        )}
      </div>
    </div>
  );
}
