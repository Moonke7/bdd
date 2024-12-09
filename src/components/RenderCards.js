import { useInView } from "react-intersection-observer";
import "../styles/AllCards.css";

export default function RenderCards({ data, select }) {
  return (
    <section>
      <div className="cardsContainer">
        {data.map((card, index) => (
          <LazyLoadCard key={index} card={card} select={select}/>
        ))}
      </div>
    </section>
  );
}
// funcion para renderizar las cartas respecto a cuales se ven
function LazyLoadCard({ card, select }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <div className="Card" ref={ref}>
      {inView ? (
        <img src={card.imgURL} alt={card.name} onClick={() => select(card.id)}/>
      ) : (
        <div className="Placeholder">Loading...</div>
      )}
      <p>{card.name}</p>
    </div>
  );
}
