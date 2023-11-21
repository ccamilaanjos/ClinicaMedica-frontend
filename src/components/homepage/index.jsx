import React from 'react';
import Header from '../header/index.jsx'
import './style.css';
import { Link } from 'react-router-dom';

function Homepage() {
  return(
    <div>
        <Header/>
        <Body/>
    </div>
  )
}

function Body() {
  return (
    <div className='homepage-body'>
      <h1 className='homepage-title'>
        Painel de Controle
      </h1>
      <div className="button-wrapper">
        <Link to={'/pacientes'} className='homepage-button'>
          <img src="src\assets\pacientes.png" alt="Pacientes" />
          <span>Pacientes</span>
        </Link>
        <Link to={'/medicos'} className='homepage-button'>
          <img src="src\assets\medicos.png" alt="Médicos" />
          <span>Médicos</span>
        </Link>
        <Link to={'/consultas'} className='homepage-button'>
          <img src="src\assets\consultas.png" alt="Consultas" />
          <span>Consultas</span>
        </Link>
      </div>
    </div>
  )
}

export default Homepage;  