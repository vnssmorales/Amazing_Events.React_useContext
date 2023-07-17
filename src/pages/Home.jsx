import React, { useContext } from "react";
import  EventContext from "../context/EventContext";
import { Header } from "../components/Header/header";
import  Card  from "../components/Card/card";

export const Home = () => {
    const {eventos} = useContext(EventContext);

    return (
       <>
       <Header title={"Home"} />
       <Card data={eventos} currenRoute="home" />
       </>
    );
};