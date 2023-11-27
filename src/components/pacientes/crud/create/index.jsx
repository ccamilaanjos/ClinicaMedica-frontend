import React from 'react';
import './style.css';
import Endereco from '../../../enderecos/index';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import DadosPessoais from './DadosPessoais';

function CadastroPaciente() {
  return (
    <div>
      <Formulario />
    </div>
  )
}

function Formulario() {
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  });

  const handleDadosPessoaisChange = (event) => {
    const { name, value } = event.target;
    setDadosPessoais({
      ...dadosPessoais,
      [name]: value,
    });
  };

  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    estado: '',
    cidade: '',
    cep: ''
  });

  const handleEnderecoChange = (event) => {
    const { name, value } = event.target;
    setEndereco({
      ...endereco,
      [name]: value,
    });
  };

  const checkFields = () => {
    const camposVaziosEmDados = Object.values(dadosPessoais).some((value) => value.trim() === '');
    const camposVaziosEmEndereco = Object.values(endereco).some((value) => value.trim() === '');

    // acrescentar validação de requisição
    console.log('Valores em dadosPessoais:', Object.values(dadosPessoais));
    console.log('Valores em endereco:', Object.values(endereco));

    if (!camposVaziosEmDados && !camposVaziosEmEndereco)
      return toastSucesso();
  }

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
      <form onSubmit={handleSubmit}>
        <DadosPessoais handleDadosPessoaisChange={handleDadosPessoaisChange} />
        <Endereco handleEnderecoChange={handleEnderecoChange} />
        <div className="pc-button">
          <button type='submit' onClick={checkFields}>Cadastrar</button>
        </div>
      </form>
      <ToastContainer />
    </div >
  )
}
/*
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
          {Endereco}

          <div className="pc-button">
            <button type='submit' onClick={handleCadastrarClick}>Cadastrar</button>
          </div>
          <ToastContainer />
        </form>
      </div >
    </div >
  )
*/
export default CadastroPaciente;