import React from 'react';
import Header from '../header/index.jsx'
import './style.css';

function Médicos() {
  return(
    <div>
        <Header/>
        <Body/>
    </div>
  )
}

function Body() {
    return(
        <h1>Médicos</h1>
    )
}

export default Médicos;