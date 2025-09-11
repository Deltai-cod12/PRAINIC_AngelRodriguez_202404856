import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ForgotPassword from './ForgotPassword.jsx';
import PantallaInicial from './PantallaInicial.jsx'
import CrearPublicacion from './CrearPublicacion.jsx';
import Comentarios from './Comentarios.jsx'
import Perfil from './Perfil.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/inicio" element={<PantallaInicial />} />
          <Route path="/crear-publicacion" element={<CrearPublicacion />} />
          <Route path="/publicacion/:id" element={<Comentarios />} />
          <Route path="/perfil/:registro" element={<Perfil />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
