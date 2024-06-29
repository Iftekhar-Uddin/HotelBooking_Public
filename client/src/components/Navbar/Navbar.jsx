import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import './navbar.css'
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const {user} = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration: "none"}}>
        <span className="logo">Hotel Booking</span>
        </Link>
        {user? user.username : ( <div className="navitems">
            <Link to="/register" style={{color:"inherit", textDecoration: "none"}}>
            <button className="navbutton">
                Register
            </button>
            </Link>
            <Link to="/login" style={{color:"inherit", textDecoration: "none"}}>
            <button className="navbutton">
                Login
            </button>
            </Link>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar
