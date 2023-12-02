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
const toastSucesso = () => {
  toast.success("Cadastro realizado!", {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
};

const toastFalha = (message) => {
  toast.error("Não foi possível cadastrar: " + message, {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
}

function postData(medicoBody) {
  let url = 'medico-ms/medicos';

  try {
    API.post(url, medicoBody)
      .then(res => {
        if (res.status == 201) {
          return toastSucesso();
        }
      })
      .catch(error => {
        console.error('Erro na requisição: ', error);
        return toastFalha(error);
      });
  } catch (error) {
    console.error('Erro: ', error);
    return toastErro(error);
  }
}

function Formulario() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'medico-ms/especialidades/todas';
        const response = await API.get(url);
        const titulos = response.data.map(especialidade => especialidade.titulo);
        setEspecialidades(titulos);
      } catch (error) {
        console.error('Erro na requisição: ', error);

        return toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    fetchData();

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
    }
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