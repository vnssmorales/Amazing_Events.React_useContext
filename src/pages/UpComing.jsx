import React, { useContext } from "react";
import EventContext from "../context/EventContext";
import { Header } from "../components/Header/header";
import  Card  from "../components/Card/card";

export const Upcoming = () => {
    const {eventos} = useContext(EventContext);
    
    return (
        <>
        <Header title={"Upcoming"} />
        <Card eventos={eventos} currenRoute="upcoming" />
        </>
    )
};