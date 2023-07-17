import React from "react";
import "./buscador.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const Buscador = ({ onSearchInputChange }) => {
//cuando el usuario escribe en el input se llama a onSearchInputChange pasando el valor del input como argumento
  const handleInputChange = (event) => { //se ejecuta cada vez que el usuario escribe en el input
    const searchValue = event.target.value.toLowerCase();
    onSearchInputChange(searchValue); // se pasa como props a la funcion que se ejecuta en el componente padre
    //y se invoca con el valor del input como argumento
  };

  return (
    <div className="buscador-input">
      <input 
        className="form-control"
        aria-label="Search"
        type="text"
        placeholder="Buscar por palabra"
        onChange={handleInputChange}
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
    </div>
  );
};
