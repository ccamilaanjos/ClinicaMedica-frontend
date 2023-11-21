import React from 'react';
import Header from '../header/index.jsx'
import './style.css';

function Consultas() {
  return(
    <div>
        <Header/>
        <Body/>
    </div>
  )
}

function Body() {
    return(
        <h1>Consultas</h1>
    )
}

export default Consultas;