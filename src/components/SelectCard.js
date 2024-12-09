import React, { useEffect, useState } from "react";
import { combinedData } from "../combinedData";
import "../styles/AllCards.css";

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
        <img src={card[0].imgURL} alt={card[0].name} />
        <div className="info">
          <h2>{card[0].name}</h2>
          <h4>Color: {card[0].color}</h4>
          <h4>Categoria: {card[0].category}</h4>
          <h4>Coste: {card[0].cost}</h4>
          <h4>Poder: {card[0].power}</h4>
          <h4>Tipo: {card[0].type}</h4>
          <h4>Efecto: {card[0].effect}</h4>
          <div className="buttons">
            <label className="button">Añadir a wishlist</label>
          </div>
        </div>
      </div>
      <label className="fondo"></label>
    </div>
  );
}
