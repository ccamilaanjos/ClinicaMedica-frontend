import './style.css';
import Endereco from '../../../enderecos/index';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from 'react';
import DadosPessoais from './DadosPessoais';
import API from '../../../api/api'

function CadastroMedico() {
  return (
    <div>
      <Formulario />
    </div>
  )
}

function postData(medicoBody) {
  let url = 'medico-ms/medicos';

  API.post(url, medicoBody)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
}

function Formulario() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    let url = 'medico-ms/especialidades/todas';
    API.get(url).then((response) => {
      const titulos = response.data.map(especialidade => especialidade.titulo);
      setEspecialidades(titulos)
    })

  }, []);

  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    email: '',
    telefone: '',
    crm: '',
    especialidade: ''
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
  };

  const validFields = () => {
    const camposVaziosEmDados = Object.values(dadosPessoais).some((value) => value.trim() === '');
    const camposVaziosEmEndereco = Object.values(endereco).some((value) => value.trim() === '');

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
        "telefone": dadosPessoais.telefone,
        "endereco": {
          "logradouro": endereco.logradouro,
          "numero": "s/n",
          "complemento": "",
          "bairro": endereco.bairro,
          "cidade": endereco.cidade,
          "uf": endereco.uf,
          "cep": endereco.cep
        },
        "crm": dadosPessoais.crm,
        "especialidade": dadosPessoais.especialidade
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
        <DadosPessoais handleDadosPessoaisChange={handleDadosPessoaisChange} especialidades={especialidades} />
        <Endereco handleEnderecoChange={handleEnderecoChange} />
        <div className="pc-button">
          <button type='submit'>Cadastrar</button>
        </div>
      </form>
      <ToastContainer />
    </div >
  )
}

export default CadastroMedico;