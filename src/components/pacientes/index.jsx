import React from 'react';
import './style.css';
import getData from './crud/get/index';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";

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
    return navigate('/pacientes/cadastrar');
  };

  return (
    <div className='p-container'>
      <ToastContainer />
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