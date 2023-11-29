import React from 'react';
import './style.css';
import getData from './crud/get/index';
import { useNavigate } from 'react-router-dom';

function Medicos() {
  return (
    <div>
      <Body />
    </div>
  )
}

function Body() {  
  const navigate = useNavigate();

  const cadastrar = () => {
    return navigate('cadastrar');
  };

  return (
    <div className='m-container'>
      <h1 className='medicos-title'>Médicos</h1>
      <div>
        <div>
        <button className='cadastrar' type='button'
          onClick={cadastrar}>
          Cadastrar novo médico
        </button>
        </div>
        <div className='medicos-table'>
          {getData()}
        </div>
      </div>
      <div className='empty'>
      </div>
    </div>
  )
}
export default Medicos;