import React from 'react';
import Header from '../header/index.jsx'
import './style.css';

function Pacientes() {
  return(
    <div>
        <Header/>
        <Body/>
    </div>
  )
}

function Body() {
    return(
        <h1>Pacientes</h1>
    )
}

export default Pacientes;