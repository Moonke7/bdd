import React, { createContext, useState } from "react";

// Crea el contexto
export const GlobalContext = createContext();

// Crea el proveedor del contexto
export const GlobalProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [idUser, setIdUser] = useState(null);
  const [idInventario, setIdInventario] = useState(null);
  const [idWishlist, setIdWishlist] = useState(null);
  const [idMazo, setIdMazo] = useState(null);
  const [idCarpeta, setIdCarpeta] = useState(null);
  const [carpetaNombre, setCarpetaNombre] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        username,
        setUsername,
        idUser,
        setIdUser,
        idInventario,
        setIdInventario,
        idWishlist,
        setIdWishlist,
        idMazo,
        setIdMazo,
        idCarpeta,
        setIdCarpeta,
        carpetaNombre,
        setCarpetaNombre,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
