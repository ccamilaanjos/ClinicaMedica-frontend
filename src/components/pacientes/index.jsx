import React from 'react';
import Header from '../header'
import './style.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import getData from './crud/get/index';

function Pacientes() {
  return (
    <div>
      <Body />
    </div>
  )
}

function Body() {  
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate('/pacientes/cadastrar');
  };

  return (
    <div className='p-container'>
      <h1 className='pacientes-title'>Pacientes</h1>
      <div>
        <div>
        <button className='cadastrar' type='button'
          onClick={cadastrar}>
          Cadastrar novo paciente
        </button>
        </div>
        <div className='pacientes-table'>
          {getData()}
        </div>
      </div>
      <div className='empty'>
      </div>
    </div>
  )
}
export default Pacientes;