import React, { useContext } from "react";
import EventContext from "../../context/EventContext";
import "./table.css";

export const Table = () => {
    const {eventos} = useContext(EventContext);

    if (eventos.length === 0) { //si no hay datos, muestra un mensaje de cargando
      return <div>Cargando...</div>;
    }

      //Obtener evento con mayor porcentaje de asistencia, funcion reductora
      const eventMaxAssistance = eventos.reduce((max, event) => {
          const percentageAssistance = (event.assistance / event.capacity) * 100;
          return percentageAssistance > (max.assistance / max.capacity) * 100 ? event : max;
        });

      //Obtener evento con menor porcentaje de asistencia
      const eventMinAssistance = eventos.reduce((min, event) => {
          const percentageAssistance = (event.assistance / event.capacity) * 100;
          return percentageAssistance < (min.assistance / min.capacity) * 100 ? event : min;
       });

      //Obtener evento con mayor capacidad
      const eventMaxCapacity = eventos.reduce((max, event) => event.capacity > max.capacity ? event : max);

      //Filtrar eventos pasados, es decir,  que tengan la propiedad capacity y assistance
      const pastEvents = eventos.filter((event) => event.capacity && event.assistance);

     //calcular estadisticas por categoria para eventos pasados
      const categories = pastEvents.reduce((stats, event) => { //Recorre el array de eventos pasados y devuelve un objeto con las estadisticas por categoria
           if (!stats[event.category]) { //si no existe la categoria en el objeto stats
              stats[event.category] = { //crea la categoria en el objeto stats
                  revenue: 0,
                  totalAttendance: 0,
                  totalCapacity: 0,
               };
          }
                    
      const revenue = event.capacity * event.price; //calcula el ingreso del evento
          stats[event.category].revenue += revenue; //actualiza las ganancias de la categoria
          stats[event.category].totalAttendance += event.assistance; //actualiza la asistencia de la categoria
          stats[event.category].totalCapacity += event.capacity; //actualiza la capacidad de la categoria
          return stats;
        }, {});

      //filtrar eventos futuros, es decir, que tengan la propiedad estimate y capacity
       const upcomingEvents = eventos.filter((event) => event.capacity && event.estimate);

       //calcular estadisticas por categoria para eventos futuros
      const categoriesUp = upcomingEvents.reduce((stats, event) => {
          if (!stats[event.category]) {
              stats[event.category] = {
                  revenue: 0,
                  totalEstimate: 0,
                  totalCapacity: 0,
              };
          }

       const revenue = event.capacity * event.price;
          stats[event.category].revenue += revenue;
          stats[event.category].totalEstimate += event.estimate;
          stats[event.category].totalCapacity += event.capacity;
          return stats;
        }, {});

  
  return (
    <>
      <div className="container-table">

        <table>
        <thead>
          <tr>
            <td className="title" colSpan="4">
              Events statistics
            </td>
          </tr>
          <tr>
            <th>Evento con mayor porcentaje de asistencia</th>
            <th>Evento con menor porcentaje de asistencia</th>
            <th>Evento con mayor capacidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{eventMaxAssistance?.name} </td>
            <td>{eventMinAssistance?.name}</td>
            <td>{eventMaxCapacity?.name}</td>
          </tr>
        </tbody>

        <thead>
          <tr>
            <td className="title" colSpan="4">
              Upcoming Events statistics by category
            </td>
          </tr>
          <tr>
            <th>Categories</th>
            <th>Revenues</th>
            <th>Estimado</th>
          </tr>
        </thead>
        <tbody>
            {Object.entries(categoriesUp).map(([category, stats]) => (
            <tr key={category}>
                <td>{category}</td>
                <td>${stats.revenue}</td>
                <td>
                    {Math.round((stats.totalEstimate / stats.totalCapacity) * 100)}%
                </td>
                </tr>
        ))}
        </tbody>

        <thead>
          <tr>
            <td className="title" colSpan="4">
              Past Events statistics by category
            </td>
          </tr>
          <tr>
            <th>Categories</th>
            <th>Revenues</th>
            <th>% de asistencia</th>
          </tr>
        </thead>
        <tbody>
          
            {Object.entries(categories).map(([category, stats]) => (
            <tr key={category}>
                <td>{category}</td>
                <td>${stats.revenue}</td>
                <td>
                    {Math.round((stats.totalAttendance / stats.totalCapacity) * 100)}%
                </td>
                </tr>
        ))}
        </tbody>

        </table>
      </div>
    </>
  );
};
