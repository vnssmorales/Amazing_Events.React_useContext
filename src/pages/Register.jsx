import React, { useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../contextAuth/AuthContext";
export const Register = () => { //setIsLoggedIn viene de App.jsx
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

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

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Bienvenido, te has registrado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                })

                //registro exitoso, establecer isLoggedIn a true y navegar a la página de inicio
                setIsLoggedIn(true);
                const token = response.data.token; //obtener el token del response
                document.cookie = `token=${token}; path=/`; //almacenar el token en una cookie
                navigate("/home");
               });
               
            }catch(error){
                console.log('Error al registrar usuario:',error);

                Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al registrarse',
                text: 'El email ingresado ya existe o la contraseña no cumple con los requisitos, al menos 8 caracteres, una mayúscula, una minúscula y un número',   
                })
            }
        }

    return (
        <>
         <div className="modal" style={{ display: "block" }} tabIndex={"-1"}>
         <div className="contenedor-login" style={{width: '100%', backgroundColor: 'rgb(234, 225, 225)', padding: '3% 0'}}>
         <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header">
        <h5 className="modal-title">Registro usuario</h5>
        </div>
        <form onSubmit={handleSubmit} action="" method="POST">
        <div className="modal-body">
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
             <div className="modal-footer" style={{width: '100%', justifyContent: 'center'}} >
            <button type="submit" className="btn btn-primary" style={{width: '300px'}}>Registrarse</button>
            </div>
            </div>
        </form>
            </div>
            </div>
            </div>
            </div>
        </>

    );
};