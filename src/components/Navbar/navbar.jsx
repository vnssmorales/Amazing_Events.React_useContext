import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

library.add(faCalendarAlt, faSignInAlt, faSignOutAlt);
export const Navbar = () => {
   const [ isLoggedIn, setIsLoggedIn] = useState(false);

   const getCookie = (name) =>{
    const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
   }

useEffect(() => {
    const token = getCookie('token');
    console.log('token almacenado en la cookie',token);
  if(token){
    setIsLoggedIn(true);
  }
}, []);

   const handleLogout = async () => {
        try{
            axios.defaults.withCredentials = true;
            await axios.post("http://localhost:3000/auth/logout")
             document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`, //eliminar la cookie
            setIsLoggedIn(false);
            window.location.href = "/login";
    

     } catch(error){
            console.log('Error al cerrar sesión:',error);
        }
    }


    return (
        <>
 
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
            <Link to={'/'} className="navbar-brand" aria-current="page"><FontAwesomeIcon icon={faCalendarAlt} /></Link>
           
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <Link to={'/'}  className="nav-link active" aria-current="page">Home </Link>
                  <Link to={'/upcoming'} className="nav-link">Upcoming Events</Link>
                  <Link to={'/pastEvents'} className="nav-link">Past Events</Link>
                  <Link to={'/contact'} className="nav-link">Contact</Link>
                  <Link to={'/stats'} className="nav-link">Stats</Link>
                  {isLoggedIn ? (
                    <Link to={'/'} className="nav-link" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt}/> Logout</Link>
                        ) : (
                            <Link to={'/login'} className="nav-link">
                                <FontAwesomeIcon icon={faSignInAlt}/> Login</Link>
                                )}
                </div>
            </div>
            </div>
        </nav>
        </>
    )
}