import { useContext } from "react";
import EventContext from "../context/EventContext";
import { DetailsCard } from "../components/Card/DetailsCard/detailsCard";
import { Header } from "../components/Header/header";
import { useParams } from "react-router-dom";

 export const Details = () => {
    const {id} = useParams();
    const {eventos} = useContext(EventContext); // aqui se desestructura el contexto

    if(!eventos) {
        return <div>Cargando...</div>;
    }
    
    return (
        <>
        <Header title={"Detalles"} />
        <DetailsCard eventos={eventos} eventId={parseInt(id)} /> {/*parseInt asegura que ambos valores (el ID del evento y el ID proporcionado) sean del mismo tipo */}

        </>
    );
 };