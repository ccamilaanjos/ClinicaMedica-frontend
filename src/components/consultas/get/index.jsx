import React, { useState, useEffect } from 'react';
import API from '/src/api';
import { toast } from "react-toastify";

// Tabela com todas as consultas
function getData(putData) {
  const [consultas, setConsulta] = useState([])
  const [totalPages, setTotalPages] = useState(1);
  const [paginaAtual, setPaginaAtual] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `consulta-ms/consultas/todas?page=${paginaAtual}`;
        const response = await API.get(url);
        if (response.status == 200) {
          setConsulta(response.data["content"]);
          setTotalPages(response.data["totalPages"])
        }
      } catch (error) {
        toast.dismiss();
        return toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.', {
          position: toast.POSITION.TOP_RIGHT,
        });;
      }
    };

    fetchData();
  }, [paginaAtual]);

  const formatDate = (data) => {
    const d = data.split('-');
    return `${d[2]}/${d[1]}/${d[0]}`;
  }

  const formatTime = (hora) => {
    const t = hora.split(":");
    return `${t[0]}h${t[1]}min`;
  }

  const formatReason = (motivo) => {
    motivo = motivo.toLowerCase();
    motivo = motivo.charAt(0).toUpperCase() + motivo.slice(1);

    const m = motivo.split("_");
    motivo = "";

    for (let i = 0; i < m.length; i++) {
      motivo += m[i];
      motivo += " ";
    }

    return motivo;
  }

  const handleSubmit = (event, toastId, id, value) => {
    event.preventDefault();
    toast.dismiss(toastId);
    processForm(id, value);
  }

  function processForm(id, value) {
    const body = {
      "motivo_cancelamento": value
    }
    putData(id, body);
  }

  const showToast = (id) => {
    const toastId = toast(
      <div>
        Motivo do cancelamento:
        <form
          className='toastContent'
          onSubmit={(event) => handleSubmit(event, toastId, id, document.getElementById('smotivo').value)}>
          <br></br>
          <select
            id='smotivo'
            className="select-motivo"
            name='motivo_cancelamento'
            defaultValue=""
            required>
            <option value="" disabled hidden>Selecione uma opção</option>
            <option value="paciente_desistiu">Paciente desistiu</option>
            <option value="medico_cancelou">Médico cancelou</option>
            <option value="outros">Outros</option>
          </select>
          <button
            className='btOK'
            type='submit'
          >OK</button>
        </form>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        position: toast.POSITION.TOP_CENTER,
        theme: "dark"
      });
  };

  function consultaRow() {
    return (
      <>
        <tbody>
          {consultas.map(consulta => (
            <tr key={consulta.id}>
              <td>
                {consulta.id}
              </td>
              <td>
                {consulta.paciente.nome}<br></br><br></br>
                CPF: {consulta.paciente.cpf}<br></br>
                Email: {consulta.paciente.email}
              </td>
              <td>
                {consulta.medico.nome}<br></br><br></br>
                CRM: {consulta.medico.crm}<br></br>
                Especialidade: {consulta.medico.especialidade}
              </td>
              <td>{formatDate(consulta.data)}</td>
              <td>{formatTime(consulta.horario)}</td>
              <td className='columnSituacao'>
                <div>
                  {consulta.motivo_cancelamento === null ?
                    <>
                      <strong>Ativa</strong><br></br>
                      <button
                        className='cancelOne'
                        type="button"
                        onClick={() => { showToast(consulta.id) }}>
                        Cancelar
                      </button>
                    </>
                    :
                    <>
                      <strong>Cancelada</strong><br></br>
                      Motivo: {formatReason(consulta.motivo_cancelamento)}
                    </>}
                </div>
              </td>
            </tr>))}
        </tbody>
      </>
    )
  }

  // Se a página atual não for a primeira, ir para a anterior
  const handlePrevious = () => {
    if (paginaAtual + 1 > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  // Se a página atual não for a última, ir para a próxima
  const handleNext = () => {
    if (paginaAtual < totalPages) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  return (
    <>
      {consultas === null || consultas.length === 0 ? (
        <div>
          <br></br><br></br>
          <h2>Nenhum resultado</h2>
        </div>
      ) : (
        <div className='ct-container'>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Situação</th>
              </tr>
            </thead>
            {consultaRow(consultas)}
          </table>
          <br></br>
          <div>
            <button
              className='btPage'
              onClick={handlePrevious}
              disabled={paginaAtual === 0}>
              Anterior
            </button>
            <span className='pageInfo'>Página {paginaAtual + 1} de {totalPages}</span>
            <button
              className='btPage'
              onClick={handleNext}
              disabled={paginaAtual + 1 === totalPages}>
              Próxima
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default getData;