import {BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom';
import Home from './pages/Home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/Login/Login';
import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import Register from './pages/Register/Register';


function App() {
  const {user} = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/register" element={user? <Navigate to="/"/> : <Register/>}/>
        <Route path="/login" element={user? <Navigate to="/"/> : <Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
