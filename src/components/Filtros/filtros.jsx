import { useContext, useState } from "react";
import { Checkbox } from "./Checkbox/checkbox";
import { Buscador } from "./Buscador/buscador";
import EventContext from "../../context/EventContext";

export const Filtros = ({ onCategoryChange,onSearchInputChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);  //selectedCategories nuevo estado y setSelectedCategories es el metodo que lo maneja
  const {eventos} = useContext(EventContext);

  const handleCategoryChange = (selectedCategories) => { 
    setSelectedCategories(selectedCategories); 
    onCategoryChange(selectedCategories); //
  };

  const handleSearchInputChange = (searchValue) => {
    setSearchValue(searchValue);
    onSearchInputChange(searchValue); //llama a onSearchInputChange del componente padre
  };

  return (
    <>
      <Checkbox
        categories={eventos.map((item) => item.category)}
        onCheckboxChange={handleCategoryChange}
      />
      <Buscador onSearchInputChange={handleSearchInputChange} />
    </>
  );
};
