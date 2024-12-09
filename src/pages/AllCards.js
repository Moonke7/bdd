import { useEffect, useState } from "react";
import { combinedData } from "../combinedData";
import Input from "../components/Input";
import RenderCards from "../components/RenderCards";
import "../styles/AllCards.css";
import SelectCard from "../components/SelectCard";

export default function AllCards() {
  const cards = combinedData;
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
    setSelectedCard(cards.filter((card) => card.id === Id));
    setModalView(true)
  };

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
        <RenderCards data={results} select={Select} />
      </div>
      <SelectCard card={selectedCard} view={modalView} setview={setModalView} />
    </section>
  );
}
