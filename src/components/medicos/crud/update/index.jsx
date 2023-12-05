import React, { useState, useEffect } from 'react';
import Endereco from '/src/components/Formularios/enderecos/endereco';
import DadosPessoais from '/src/components/Formularios/dados/dados-medico';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useLocation } from 'react-router-dom';
import API from '/src/api';

function AtualizacaoMedico() {
  const { crm } = useParams();

  return (
    <div>
      {Formulario(crm)}
    </div>
  )
}

function putData(medicoBody, crm) {
  let toastId = null;
  let url = `medico-ms/medicos/${crm}`;

  if (!toastId) {
    toastId = toast.loading("Atualizando...", { autoClose: false });
  }

  API.put(url, medicoBody)
    .then(res => {
      if (res.status == 200) {
        toast.update(toastId, {
          render: "Médico atualizado!",
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

function Formulario(crm) {
  const location = useLocation();
  const especialidades = location.state.especialidades;

  let url = `medico-ms/medicos/data/${crm}`;
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      API.get(url)
        .then(res => {
          setDados(res.data);
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
      "telefone": dadosPessoais.telefone || currentDadosPessoais.telefone,
      "endereco": {
        "logradouro": endereco.logradouro || currentEndereco.logradouro,
        "numero": endereco.numero || currentEndereco.numero,
        "complemento": endereco.complemento || currentEndereco.complemento,
        "bairro": endereco.bairro || currentEndereco.bairro,
        "cidade": endereco.cidade || currentEndereco.cidade,
        "uf": endereco.uf || currentEndereco.uf,
        "cep": endereco.cep || currentEndereco.cep
      },
      "crm": currentDadosPessoais.crm,
      "especialidade": currentDadosPessoais.especialidade
    }
    putData(body, crm);
  }

  return (
    <div>
      <h1 className='cp-title'>Atualização</h1>
      <form onSubmit={handleSubmit}>
        <DadosPessoais handleDadosPessoaisChange={handleDadosPessoaisChange} especialidades={especialidades} dataFill={currentDadosPessoais} />
        <Endereco handleEnderecoChange={handleEnderecoChange} dataFill={currentEndereco} />
        <div className="pc-button">
          <button type='submit'>Atualizar</button>
        </div>
      </form>
      <ToastContainer />
    </div >
  )
}

export default AtualizacaoMedico;