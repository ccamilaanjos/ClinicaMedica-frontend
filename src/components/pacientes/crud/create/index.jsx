import React from 'react';
import Header from '../../../header/index';
import './style.css';
import EnderecoFields from '../../../enderecos';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

function CadastroPaciente() {
  return (
    <div>
      <Header />
      <Body />
    </div>
  )
}

function Body() {
  const [formulario, setFormulario] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleCadastrarClick = () => {
    const camposVazios = Object.values(formulario).some((value) => value.trim() === '');

    // acrescentar validação de requisição
    if (!camposVazios) {
      toastSucesso();
    }
  };

  const toastSucesso = () => {
    toast.success("Cadastro realizado!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };
  
  const toastFalha = () => {
    toast.error("Não foi possível cadastrar", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <h1 className='cp-title'>Cadastramento</h1>
      <h3>Dados Pessoais:</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className='input-row'>
              <div className="data-input">
                <span className="details">Nome completo <span className='obgt'>*</span></span>
                <input type="text" name='nome' placeholder="Digite o nome" onChange={handleInputChange} required />
              </div>
              <div className="data-input">
                <span className="details">Email <span className='obgt'>*</span></span>
                <input type="text" name='email' placeholder="Digite o email" onChange={handleInputChange} required />
              </div>
              <div className="data-input">
                <span className="details">Telefone <span className='obgt'>*</span></span>
                <input type="text" name='telefone' placeholder="(99) 99999-9999" onChange={handleInputChange} required />
              </div>
              <div className="data-input">
                <span className="details">CPF <span className='obgt'>*</span></span>
                <input type="text" name='cpf' size="9" maxLength="11" placeholder="xxx.xxx.xxx-xx" onChange={handleInputChange} required />
              </div>
            </div>
          </div>
          {EnderecoFields()}

          <div className="pc-button">
            <button type='submit' onClick={handleCadastrarClick}>Cadastrar</button>
          </div>
          <ToastContainer />
        </form>
      </div >
    </div >
  )
}

export default CadastroPaciente;