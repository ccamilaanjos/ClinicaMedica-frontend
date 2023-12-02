import React from 'react';
import './style.css';
import Endereco from '../../../enderecos/index';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';
import DadosPessoais from './DadosPessoais';
import API from '../../../api/api'

function CadastroPaciente() {
  return (
    <div>
      <Formulario />
    </div>
  )
}

function postData(pacienteBody) {
  let url = 'paciente-ms/pacientes';

  API.post(url, pacienteBody)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
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
    uf: '',
    cidade: '',
    cep: ''
  });

  const handleEnderecoChange = (event) => {
    const { name, value } = event.target;
    setEndereco({
      ...endereco,
      [name]: value,
    });
    console.log(name + " : " + value);
  };

  const validFields = () => {
    const camposVaziosEmDados = Object.values(dadosPessoais).some((value) => value.trim() === '');
    const camposVaziosEmEndereco = Object.values(endereco).some((value) => value.trim() === '');

    console.log('Valores em dadosPessoais:', Object.values(dadosPessoais));
    console.log('Valores em endereco:', Object.values(endereco));

    if (!camposVaziosEmDados && !camposVaziosEmEndereco)
      return true;
    
    return false;
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
    processForm();
  };

  function processForm() {
    let camposValidos = validFields();

    if (camposValidos) {
      const body = {
        "nome": dadosPessoais.nome,
        "email": dadosPessoais.email,
        "cpf": dadosPessoais.cpf,
        "telefone": dadosPessoais.telefone,
        "endereco": {
          "logradouro": endereco.logradouro,
          "numero": "s/n",
          "complemento": "",
          "bairro": endereco.bairro,
          "cidade": endereco.cidade,
          "uf": endereco.uf,
          "cep": endereco.cep
        }
      }

      postData(body);
      return toastSucesso();
    }

    return toastFalha();
  }

  return (
    <div>
      <h1 className='cp-title'>Cadastramento</h1>
      <form onSubmit={handleSubmit}>
        <DadosPessoais handleDadosPessoaisChange={handleDadosPessoaisChange} />
        <Endereco handleEnderecoChange={handleEnderecoChange} />
        <div className="pc-button">
          <button type='submit'>Cadastrar</button>
        </div>
      </form>
      <ToastContainer />
    </div >
  )
}

export default CadastroPaciente;