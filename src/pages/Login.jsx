import React, { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    try{
        axios.defaults.withCredentials = true;
        const response = await axios.post("http://localhost:3000/auth/login", {
            email:emailRef.current.value,
            contraseña: passwordRef.current.value,
        }, {headers: {'Access-Control-Allow-Origin':'*', 'Content-Type': 'application/json'}}).then((response) => {
         // console.log(response.data);
         navigate("/home");
        });
        
    }catch(error){
        console.log('Error al iniciar sesión:',error);
    }
    };

  return (
    <>
      <div className="modal" style={{ display: "block" }} tabIndex={"-1"}>
      <div className="contenedor-login" style={{width: '100%', backgroundColor: 'rgb(234, 225, 225)', padding: '3% 0'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login Page</h5>
            </div>
            <form onSubmit={handleSubmit} action="" method="POST">
              <div className="modal-body">
              <input
                style={{marginBottom: '20px', width: '100%'}}
                type="text"
                name="name"
                id="name"
                placeholder="Nombre"
                required
              />
            
              <input
              style={{marginBottom: '20px', width: '100%'}}
              ref={emailRef}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
              />
             
             <input
             style={{marginBottom: '20px', width: '100%'}}
             ref={passwordRef}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required
                />
                </div>
                <div className="modal-footer" style={{width: '100%', justifyContent: 'space-between'}} >

                <button type="submit" className="btn btn-primary" style={{width: '200px'}}> Login </button>
               <Link to="/register">
               <button type="submit"className="btn btn-primary" style={{width: '200px'}}> Registro </button>
                </Link>
                </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
