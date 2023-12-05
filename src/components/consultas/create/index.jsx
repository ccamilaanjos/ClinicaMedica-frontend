// import './style.css';
import DadosConsulta from '/src/components/Formularios/consultas/consulta';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import API from '/src/api';

function MarcacaoConsulta() {
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
  const location = useLocation();
  const especialidades = location.state.especialidades;

  const [dados, setDados] = useState({
    nome: '',
    email: '',
    telefone: '',
    crm: '',
    especialidade: ''
  });

  const handleDadosChange = (event) => {
    const { name, value } = event.target;
    setDados({
      ...dados,
      [name]: value,
    });
  };

  const validFields = () => {
    const camposVaziosEmDados = Object.values(dados).some((value) => value.trim() === '');

    if (!camposVaziosEmDados)
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
        "cpf": dados.cpf,
        "crm": dados.crm || "",
        "especialidade": dados.especialidade,
        "horario": dados.horario,
        "data": dados.data
      }
      postData(body);
    }
  }

  return (
    <div>
      <h1 className='cp-title'>Marcação</h1>
      <form onSubmit={handleSubmit}>
        <DadosConsulta handleDadosChange={handleDadosChange} especialidades={especialidades}/>
        <div className="pc-button">
          <button type='submit'>Cadastrar</button>
        </div>
      </form>
      <ToastContainer />
    </div >
  )
}

export default MarcacaoConsulta;