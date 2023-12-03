import './style.css';
import Endereco from '/src/components/Formularios/enderecos';
import DadosPessoais from '/src/components/Formularios/dados/dados-medico';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from 'react';
import API from '/src/api';

function CadastroMedico() {
  return (
    <div>
      <Formulario />
    </div>
  )
}

function postData(medicoBody) {
  let toastId = null;
  let url = 'medico-ms/medicos';

  if (!toastId) {
    toastId = toast.loading("Cadastrando...", { autoClose: false });
  }
  API.post(url, medicoBody)
    .then(res => {
      if (res.status == 201) {
        toast.update(toastId, {
          render: "Médico cadastrado!",
          isLoading: false,
          type: "success",
          autoClose: true
        });
      }
    })
    .catch(error => {
      const errorMessage = ": " + error.response?.data?.message || "";
      toast.update(toastId, {
        render: "Não foi possível cadastrar" + errorMessage,
        isLoading: false,
        type: "error",
        autoClose: true
      });
    });
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
    cep: '',
    complemento: '',
    numero: ''
  });
  
   const enderecoObrigatorio = {
    logradouro: endereco.logradouro,
    bairro: endereco.bairro,
    uf: endereco.uf,
    cidade: endereco.cidade,
    cep: endereco.cep,
  }

  const handleEnderecoChange = (event) => {
    const { name, value } = event.target;
    setEndereco({
      ...endereco,
      [name]: value,
    });
  };

  const validFields = () => {
    const camposVaziosEmDados = Object.values(dadosPessoais).some((value) => value.trim() === '');
    const camposVaziosEmEndereco = Object.values(enderecoObrigatorio).some((value) => value.trim() === '');

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
          "numero": endereco.numero,
          "complemento": endereco.complemento,
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