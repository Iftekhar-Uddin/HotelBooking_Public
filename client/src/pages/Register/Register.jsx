import React, { useContext, useState } from 'react'
import './register.css'
import {useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import api_key from '../../api'

const Register = () => {
  const api = api_key();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const {loading, error, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({username: undefined, email: undefined, phone: undefined, city: undefined, country: undefined, password: undefined});

  const handleChange = (e) => {
    setNewUser((prev)=> ({...prev, [e.target.id] : e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "REGISTER_START"});
    try {
      const res = await axios.post(`${api}/auth/register`, newUser);
      dispatch({type: "REGISTER_SUCCESS", payload: res.data.details});
      navigate("/login")
      } catch (error) {
      dispatch({type: "REGISTER_FAILURE", payload: error.response.data})
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">

        {/* <div className="registerLeft">
            <h3 className="registerLogo">Hotel Booking</h3>
            <span className="registerDesc">A Modern Hotel Booking!</span>
        </div> */}

        <div className="registerRight">
          <div className='registerBox'>
            <form className='registerform-Box' onSubmit={handleSubmit}>

              <div className='register-input-box'>
                <label className="registerlabelName">UserName</label>
                <input className='registerInput' type="text"  id="username" required onChange={handleChange}/>
              </div>

              <div className='register-input-box'>
                <label className="registerlabelName">Email</label>
                <input className='registerInput' type="email" id="email" required onChange={handleChange}/>
              </div>

              <div className='register-input-box'>
                <label className="registerlabelName">Phone</label>
                <input className='registerInput' type="text" id="phone" required onChange={handleChange}/>
              </div>

              <div className='register-input-box'>
                <label className="registerlabelName">City Name</label>
                <input className='registerInput' type="text" id="city" required onChange={handleChange}/>
              </div>

              <div className='register-input-box'>
                <label className="registerlabelName">Country Name</label>
                <input className='registerInput' type="text"  id="country" required onChange={handleChange}/>
              </div>

              <div className='register-input-box'>
                <label className="registerlabelName">Password</label>
                <input className='registerInput' type={ showPassword ? "text" : "password"}  id="password"  minLength='6' required onChange={handleChange}/>
                <span className="showPass1" onClick={handleShowPassword}> {showPassword ? "Hide" : "Show"} </span>
              </div>

              <div className='register-input-box'>
                <label className="registerlabelName">Repeat Password</label>
                <input className='registerInput' type={ showPassword ? "text" : "password"} id="password" minLength='6' required onChange={handleChange}/>
                <span className="showPass1" onClick={handleShowPassword}> {showPassword ? "Hide" : "Show"} </span>
              </div>

              <button className="registerButton" type="submit" disabled={loading}>Sign Up</button>
              <div className='havacc'>
                <p>Already have an account?</p>
                <Link className='linkreg' to={'/login'}>&nbsp;Sign In</Link>
              </div>

            </form>
          </div>
          {error && <span>{error.message}</span>}
        </div>

      </div>
    </div>
  )
}

export default Register
