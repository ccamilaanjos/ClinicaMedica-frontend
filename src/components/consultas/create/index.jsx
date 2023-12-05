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

function postData(consultaBody) {
  let toastId = null;
  let url = 'consulta-ms/consultas/marcar';

  if (!toastId) {
    toastId = toast.loading("Carregando...", { autoClose: false });
  }

  API.post(url, consultaBody)
    .then(res => {
      if (res.status == 201) {
        toast.update(toastId, {
          render: "Consulta marcada!",
          isLoading: false,
          type: "success",
          autoClose: true
        });
      }
    })
    .catch(error => {
      const errorMessage = ": " + error.response?.data?.message || "";
      toast.update(toastId, {
        render: "Não foi possível marcar" + errorMessage,
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
    "cpf": '',
    "crm": '',
    "especialidade": '',
    "horario": '',
    "data": ''
  });

  const handleDadosChange = (event) => {
    const { name, value } = event.target;
    const hhFormat = name === 'horario' ? value + ':00' : value;
    const ddFormat = name === 'data' ? formatDate(hhFormat) : hhFormat;
    const camposAjsutados = ddFormat;

    setDados({
      ...dados,
      [name]: camposAjsutados,
    });
    
    console.log(name + " : " + value)

  };
  
  function formatDate(data) {
  const d = data.split('/');
  return `${d[2]}-${d[1]}-${d[0]}`;
}

  const handleSubmit = event => {
    event.preventDefault();
    processForm();
  };

  function processForm() {
    // let camposValidos = validFields();

    // if (camposValidos) {
    const body = {
      "cpf": dados.cpf,
      "crm": dados.crm || "",
      "especialidade": dados.especialidade,
      "horario": dados.horario,
      "data": dados.data
    }
    postData(body);
    // }
  }

  return (
    <div>
      <h1 className='c-title'>Marcação</h1>
      <form onSubmit={handleSubmit}>
        <DadosConsulta handleConsultaChange={handleDadosChange} especialidades={especialidades} />
        <div className="pc-button">
          <button type='submit'>Cadastrar</button>
        </div>
      </form>
      <ToastContainer />
    </div >
  )
}

export default MarcacaoConsulta;