import React, { useContext } from "react";
import EventContext from "../context/EventContext";
import { Header } from "../components/Header/header";
import Card  from "../components/Card/card";

export const PastEvents = () => {
    const {eventos} = useContext(EventContext);

    return (
        <>
        <Header title={"Past Events"} />
        <Card eventos={eventos} currenRoute="pastEvents" />
        </>
    )
};