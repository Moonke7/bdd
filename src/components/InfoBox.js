import React from "react";

export default function InfoBox({ text, desc }) {
  return (
    <div
      style={{
        border: "solid 1px #d3bd9e", 
        width: "25%",
        height: "100%",
        display: "flex",
        flexDirection: "column", 
        alignItems: "center",
        justifyContent: "center", 
        padding: "16px", 
        backgroundColor: "transparent", 
        borderRadius: "8px" 
      }}
    >
      <h3 style={{ fontWeight: "bold", fontSize: "1.2em", color: "#312019"}}>
        {text}
      </h3>
      <p style={{color: "#d3bd9e", fontWeight: "bold"}}>{desc}</p>
    </div>
  );
}
