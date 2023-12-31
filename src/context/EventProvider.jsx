import { useEffect, useState } from "react";
import EventContext from "./EventContext";
import axios from "axios";

const baseUrl = "http://localhost:3000/events";
//const baseUrl = "https://mindhub-xj03.onrender.com/api/amazing";

 const EventProvider = ({ children }) => {
    const [eventos, setEventos] = useState([]);

    const addEvents = (newEvents) => { //agrega nuevos eventos al estado eventos
        setEventos([...eventos, ...newEvents]);//con spread operator se crea un nuevo array con los eventos existentes y los nuevos
    }; //setEventos actualiza el estado con el nuevo array 
    //esto garantiza que el estado eventos existentes no se sobreescriban y que los nuevos eventos se agreguen al estado de forma acumulativa

    useEffect(() => {
        const getEventData = async () => {
            try{
                if( window.location.href != "http://localhost:5173/login"){
                axios.defaults.withCredentials = true;
                const response = await axios.get(baseUrl).catch(() =>{
                    window.location.href = "/login";
                });
                console.log('response',response);
                const allData = response.data.events;
                const events = Array.isArray(allData) ? allData : [allData];
                addEvents(events);}
            }catch (error) {
                console.log('Error al obtener los eventos',error);
            }
        };
        getEventData();
    }, []);

    const initialState = {
        eventos,
        addEvents,
    }

    return (
        <EventContext.Provider value={initialState}>
            {children}
        </EventContext.Provider>
    );
};

export default EventProvider;