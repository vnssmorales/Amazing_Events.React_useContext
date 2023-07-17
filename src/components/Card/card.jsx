import React, { useState, useContext } from "react";
import EventContext from "../../context/EventContext";
import "./card.css";
import { Button } from "../Button/button";
import { Filtros } from "../Filtros/filtros";

 const Card = ({currenRoute}) => { // recibe la ruta actual desde el componente padre(Home, Upcoming, Past)
  //inicializo los estados
  const {eventos} = useContext(EventContext); 
  const [selectedCategories, setSelectedCategories] = useState([]);//almacena las categorias seleccionadas por el usuario
  const [searchValue, setSearchValue] = useState(""); //almacena el valor del input de busqueda ingresado por el usuario

  //controlador de eventos para actualizar los estados de las categorias
  const handleCategoryChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  //controlador de eventos para actualizar los estado del input de busqueda
  const handleSearchInputChange = (searchValue) => {
    setSearchValue(searchValue);
  };

  const filteredEvents = eventos.filter((item) =>{
    const lowerCaseSearchValue = searchValue.toLowerCase();
    const categoryMatch = 
      selectedCategories.length === 0 || 
      selectedCategories.includes(item.category);
    const searchMatch = 
       item.name.toLowerCase().includes(lowerCaseSearchValue) ||
       item.description.toLowerCase().includes(lowerCaseSearchValue);

       if (currenRoute === "upcoming") {
        return categoryMatch && searchMatch && item.estimate;
       }else if (currenRoute === "pastEvents") {
        return categoryMatch && searchMatch && item.assistance;
        } else {
        return categoryMatch && searchMatch;
        }
  });

  //mientras espera que los datos se carguen desde la API.
  if (eventos.length === 0) { //si no hay datos, muestra un mensaje de cargando
    return <div>Cargando...</div>;
  }

  return (
   
    <>
     <div className="contenedor-filtros">
     <Filtros 
     categories={eventos.map((item) => item.category)}
     onCategoryChange={handleCategoryChange}  
     onSearchInputChange={handleSearchInputChange}
      />
    </div>

      <div className="contenedor-card">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
            {filteredEvents.map((item) => (
                <div className="col mb-4" key={item._id}>
                  <div className="card">
                  <img src={item.image} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h3 className="card-title">{item.name}</h3>
                      <h4 className="card-text">{item.category}</h4>
                      <p className="card-text">{item.description}</p>
                      <h3 className="card-text">Capacity: {item.capacity}</h3>
                      {item.assistance ? (
                        <h3 className="card-text">Assistance: {item.assistance}</h3>
                       ) : null}
                      {item.estimate ? ( 
                     <h3 className="card-text">Estimate: {item.estimate}</h3>
                      ) : null}
                    </div>
                    <div className="card-footer">
                      <h4 className="text-muted">Precio: ${item.price}</h4>
                      </div>
                      <Button _id={item._id} />
                  </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Card;