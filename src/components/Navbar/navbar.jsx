import React, { useContext } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCalendarAlt, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthContext from '../../contextAuth/AuthContext';

library.add(faCalendarAlt, faSignInAlt, faSignOutAlt);
export const Navbar = () => {
   const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
   const navigate = useNavigate();

   const handleLogout = () => {
         Cookies.remove("token");
         setIsLoggedIn(false);
         navigate("/login");//redireccionar a la página de login
   };

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