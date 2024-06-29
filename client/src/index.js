import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SeachContextProvider } from './context/SearchContext.js';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SeachContextProvider>
        <App/>
      </SeachContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
