import React, {useContext, useState} from 'react'
import { FaRegUserCircle  } from "react-icons/fa";
import { FiLock   } from "react-icons/fi";
import "./login.css"
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import api_key from '../../api'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const api = api_key();
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const [credentials, setCredentials] = useState({username: undefined, password: undefined});
  const {loading, error, dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.id] : e.target.value}));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axios.post(`${api}/auth/login`, credentials);
      dispatch({type: "LOGIN_SUCCESS", payload: res.data.details});
      navigate("/")
      } catch (error) {
      dispatch({type: "LOGIN_FAILURE", payload: error.response.data})
    }
  }


  return (
    <div className='login'>
      <div className='loginWrapper'>

        {/* <div className="logintop">
          <h3 className="loginLogo">Hotel Booking</h3>
          <span className="loginDesc">Get your best hotel</span>
        </div> */}

        <div className='loginbottom'>
          <div className='loginBox'>
            <form className='form-box'>

              <div className='input-box'>
                <label className="labelName">User Name</label>
                <input className='lInput' type="text" id="username" onChange={handleChange}/>
                <span><FaRegUserCircle  /></span>
              </div>

              <div className='input-box'>
                <label className="labelName">Password</label>
                <input className='lInput' type={ showPassword ? "text" : "password"} id="password" onChange={handleChange}/>
                {/* <span className="showPass" onClick={handleShowPassword}> {showPassword ? "Hide" : "Show"} </span> */}
                <span><FiLock /></span>
              </div>

              <div className='remember-forgot'>
                <label className='rem'><input type='checkbox'></input>Remember me</label>
                <span>Forgot password?</span>
              </div>

              <button className='lButton' disabled={loading} onClick={handleClick}>Login</button>

              <div className='dontacc'>
                <p>Don't have an account?</p>
                <Link className='linkkkkkk' to={'/register'}>&nbsp;Register</Link>
              </div>

            </form>
            {error && <span>{error.message}</span>}
          </div>

        </div>

      </div>
    </div>
  )
}

export default Login;
