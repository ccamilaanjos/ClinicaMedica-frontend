import React, { useState, useEffect } from 'react';
import API from '/src/api';
import { toast } from "react-toastify";
import removeData from '../delete';
import { useNavigate } from 'react-router-dom';

// Tabela com todos os médicos ativos
function getData(especialidades) {
  const navigate = useNavigate();

  const atualizar = (crm) => {
    return navigate(`atualizar/${crm}`, { state: { especialidades: especialidades } });
  };

  const [medicos, setMedico] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [paginaAtual, setPaginaAtual] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `medico-ms/medicos/ativos?page=${paginaAtual}`;
        const response = await API.get(url);
        if (response.status == 200) {
          setMedico(response.data["content"]);
          setTotalPages(response.data["totalPages"]);
        }
      } catch (error) {
        console.error('Erro na requisição: ', error);
        return toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.', {
          position: toast.POSITION.TOP_RIGHT,
        });;
      }
    };

    fetchData();
  }, [paginaAtual]);

  function medicoRow() {
    return (
      <>
        <tbody>
          {medicos.map(medico => (
            <tr key={medico.crm}>
              <td>{medico.nome}</td>
              <td>{medico.email}</td>
              <td>{medico.crm}</td>
              <td>{medico.especialidade}</td>
              <td>
                <button className='update' type="button"
                  onClick={
                    () => { atualizar(medico.crm) }}>Atualizar</button>
              </td>
              <td>
                <button className='delete' type="button"
                  onClick={() => removeData({ setMedico, medicos, crm: medico.crm })}>Desativar</button>
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
      {medicos === null || medicos.length === 0 ? (
        <div>
          <br></br><br></br>
          <h2>Nenhum médico cadastrado</h2>
        </div>
      ) : (
        <div className='mt-container'>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CRM</th>
                <th>Especialidade</th>
              </tr>
            </thead>
            {medicoRow(medicos)}
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