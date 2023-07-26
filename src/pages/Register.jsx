import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Register = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            axios.defaults.withCredentials = true;
            const response = await axios.post("http://localhost:3000/customer/create", {
                usuario:nameRef.current.value,
                email:emailRef.current.value,
                contraseña: passwordRef.current.value,
            },{headers: {'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json'}}).then((response) => {
                // console.log(response.data);
                navigate("/home");
               });
               
            }catch(error){
                console.log('Error al registrar usuario:',error);
            }
        }

    return (
        <>
        <h2>Registro usuario</h2>
        <form onSubmit={handleSubmit} action="" method="POST">
            <input
                style={{marginBottom: '20px', width: '100%'}}
                ref={nameRef}
                type="text"
                placeholder="Nombre"
                required
            />
            <input
                style={{marginBottom: '20px', width: '100%'}}
                ref={emailRef}
                type="email"
                placeholder="Email"
                required
            />
            <input
                style={{marginBottom: '20px', width: '100%'}}
                ref={passwordRef}
                type="password"
                placeholder="Password"
                required
            />
            <button type="submit">Registrarse</button>
        </form>
            
        </>
    );
};