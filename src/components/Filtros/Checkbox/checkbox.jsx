import React, { useContext, useEffect, useRef, useState } from "react";
import EventContext from "../../../context/EventContext";

export const Checkbox = ({ onCheckboxChange }) => { //recibe 2 propiedades: las categorias y el metodo que maneja el estado selectedCategories
  const checkboxRef = useRef({}); //objeto para almacenar las referencias a los checkbox
  const {eventos} = useContext(EventContext); //obtiene los eventos desde el contexto  
  const [categories, setCategories] = useState([]); //almacena las categorias unicas

useEffect(() => {
  let catRepet = eventos.map((event) => event.category)
  let catSinRepeat = Array.from(new Set(catRepet));
  setCategories(catSinRepeat);

  checkboxRef.current = categories.reduce((refs, category) => { //reduce itera sobre el array de categorias y devuelve un objeto con las referencias a los checkbox
    refs[category] = refs[category] || React.createRef(); //crea una referencia para cada categoria, si ya existe la usa
    return refs;
  }, checkboxRef.current);
}, [eventos]);

const handleCheckboxChange = () => {
   let checkboxChecked = document.querySelectorAll('input[type="checkbox"]:checked');
    let newSelectedCategories = Array.from(checkboxChecked).map((checkbox) => checkbox.value);

   onCheckboxChange(newSelectedCategories); 
}; 

  return (
    <div className="checkbox-container">
      {eventos.length > 0 ? 
      (categories.map((category) => (
    
        <div className="form-check form-check-inline" key={category}>
          <input
            type="checkbox"
            name="category"
            value={category}
            id={category}
            ref={checkboxRef.current[category]}
            onChange={handleCheckboxChange}
          />&nbsp;&nbsp;
          <label htmlFor={category}>{category} </label >
        </div>
      ))
      ) : (
      <div>no hay datos</div>
      )}
    </div>
  );
};

