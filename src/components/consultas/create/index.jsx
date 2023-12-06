import React, { useState, useEffect } from 'react';
import DadosConsulta from '/src/components/Formularios/consultas/consulta';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from '/src/api';
import './style.css';

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
    .catch((error) => {
      const errorMessage = ": " + error.response.data.message || "";
      toast.update(toastId, {
        render: "Não foi possível marcar" + errorMessage,
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
        return toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    fetchData();

  }, []);

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
    const crmTrim = name === 'crm' ? value.trim() : ddFormat;
    
    const camposAjsutados = crmTrim;

    setDados({
      ...dados,
      [name]: camposAjsutados,
    });
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
    const body = {
      "cpf": dados.cpf,
      "crm": dados.crm,
      "especialidade": dados.especialidade,
      "horario": dados.horario,
      "data": dados.data
    }
    postData(body);
  }

  return (
    <div>
      <h1 className='m-title'>Marcação</h1>
      <form onSubmit={handleSubmit}>
        <DadosConsulta handleConsultaChange={handleDadosChange} especialidades={especialidades} />
        <div className="mc-button">
          <button type='submit'>Marcar consulta</button>
        </div>
      </form>
      <ToastContainer />
    </div >
  )
}

export default MarcacaoConsulta;