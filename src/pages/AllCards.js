import { useContext, useEffect, useState } from "react";
import Input from "../components/Input";
import RenderCards from "../components/RenderCards";
import "../styles/AllCards.css";
import SelectCard from "../components/SelectCard";
import { GlobalContext } from "../GlobalContext";

export default function AllCards() {
  const { idInventario } = useContext(GlobalContext);
  const [cards, setCards] = useState(null);
  const [results, setResults] = useState(cards);
  const [inputValue, setInputValue] = useState("");
  const [selectedCard, setSelectedCard] = useState(cards);
  const [modalView, setModalView] = useState(false);

  // funcion para filtrar
  const Filter = (value) => {
    // si lo que esta en el input es mayor a una letra, se filtrarar
    if (value.length > 1) {
      setResults(
        cards.filter((card) =>
          card.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setResults(cards);
    }
  };

  // cada vez que se escriba se ira filtrando
  const onChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    Filter(value);
  };

  const Select = (Id) => {
    // busca la carta clickeada en todas las cartas y hace que el modal sea visible
    setSelectedCard(cards.filter((card) => card.id_carta === Id));
    setModalView(true);
  };

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/cartas`,
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
        setSelectedCard(data)
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    loadCards();
  }, [idInventario]);

  return (
    <section>
      <h2>Todas las cartas</h2>
      <Input
        value={inputValue}
        onchange={onChange}
        placeholder={"Busca por el nombre de la carta..."}
      />
      <h2>Cartas</h2>
      <div className="cardsContainer">
        {cards ? (
          <RenderCards data={results} select={Select} />
        ) : (
          <h3>cargando...</h3>
        )}
      </div>
      {selectedCard ? (
        <SelectCard
          card={selectedCard}
          view={modalView}
          setview={setModalView}
        />
      ) : (
        <h3>cargando....</h3>
      )}
    </section>
  );
}
