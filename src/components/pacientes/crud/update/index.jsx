import React, { useState, useEffect } from 'react';
import Endereco from '/src/components/Formularios/enderecos/endereco.jsx';
import DadosPessoais from '/src/components/Formularios/dados/dados-paciente';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';
import API from '/src/api';

function AtualizacaoPaciente() {
  const { cpf } = useParams();

  return (
    <div>
      {Formulario(cpf)}
    </div>
  )
}

function putData(pacienteBody, cpf ) {
  let toastId = null;
  let url = `paciente-ms/pacientes/${cpf}`;
  
  if (!toastId) {
    toastId = toast.loading("Atualizando...", { autoClose: false });
  }

  API.put(url, pacienteBody)
    .then(res => {
      if (res.status == 200) {
        toast.update(toastId, {
          render: "Paciente atualizado!",
          isLoading: false,
          type: "success",
          autoClose: true
        });
      }
    })
    .catch(error => {
      const errorMessage = ": " + error.response.data.detail || "";
      toast.update(toastId, {
        render: "Não foi possível atualizar" + errorMessage,
        isLoading: false,
        type: "error",
        autoClose: true
      });
    });
}

function Formulario(cpf) {
  let url = `paciente-ms/pacientes/data/${cpf}`;
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      API.get(url)
        .then(res => {
          if (res.status == 200) {
            setDados(res.data);
          }
        })
        .catch(error => {
          console.error('Erro na requisição: ', error);
          return toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.', {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
    fetchData();
  }, []);

  const { currentDadosPessoais, currentEndereco } = detach(dados);

  function detach(dados) {
    const { endereco, ...dadosPessoais } = dados;

    return {
      currentDadosPessoais: dadosPessoais,
      currentEndereco: endereco
    };
  }

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
    cep: '',
    complemento: '',
    numero: ''
  });

  const handleEnderecoChange = (event) => {
    const { name, value } = event.target;
    setEndereco({
      ...endereco,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    processForm();
  };

  function processForm() {
    const body = {
      "nome": dadosPessoais.nome || currentDadosPessoais.nome,
      "email": currentDadosPessoais.email,
      "cpf": currentDadosPessoais.cpf,
      "telefone": dadosPessoais.telefone || currentDadosPessoais.telefone,
      "endereco": {
        "logradouro": endereco.logradouro || currentEndereco.logradouro,
        "numero": endereco.numero || currentEndereco.numero,
        "complemento": endereco.complemento || currentEndereco.complemento,
        "bairro": endereco.bairro || currentEndereco.bairro,
        "cidade": endereco.cidade || currentEndereco.cidade,
        "uf": endereco.uf || currentEndereco.uf,
        "cep": endereco.cep || currentEndereco.cep
      }
    }
    putData(body, cpf);
  }

  return (
    <div>
      <h1 className='cp-title'>Atualização</h1>
      <form onSubmit={handleSubmit}>
        <DadosPessoais handleDadosPessoaisChange={handleDadosPessoaisChange} dataFill={currentDadosPessoais} />
        <Endereco handleEnderecoChange={handleEnderecoChange} dataFill={currentEndereco} />
        <div className="pc-button">
          <button type='submit'>Atualizar</button>
        </div>
      </form>
      <ToastContainer />
    </div >
  )
}

export default AtualizacaoPaciente;