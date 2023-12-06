import React, { useState, useEffect } from 'react';
import API from '/src/api';
import removeData from '../delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const toastErro = () => {
  toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.', {
    position: toast.POSITION.TOP_RIGHT,
  });
}

// Tabela com todos os pacientes ativos
function getData() {
  const navigate = useNavigate();

  const atualizar = (cpf) => {
    return navigate(`atualizar/${cpf}`);
  };

  const [pacientes, setPaciente] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [paginaAtual, setPaginaAtual] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `paciente-ms/pacientes/ativos?page=${paginaAtual}`;
        const response = await API.get(url);
        if (response.status != 200) {
          return toastErro();
        }
        setPaciente(response.data["content"]);
        setTotalPages(response.data["totalPages"]);
      } catch (error) {
        return toastErro();
      }
    };

    fetchData();
  }, [paginaAtual]);

  function pacienteRow() {

    return (
      <>
        <tbody>
          {pacientes.map(paciente => (
            <tr key={paciente.cpf}>
              <td>{paciente.nome}</td>
              <td>{paciente.email}</td>
              <td>{paciente.cpf}</td>
              <td>
                <button className='update' type="button"
                  onClick={
                    () => { atualizar(paciente.cpf) }}>Atualizar</button>
              </td>
              <td>
                <button className='delete' type="button"
                  onClick={() => removeData({ setPaciente, pacientes, cpf: paciente.cpf })}>Desativar</button>
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
      {pacientes === null || pacientes.length === 0 ? (
        <div>
          <br></br><br></br>
          <h2>Nenhum paciente cadastrado</h2>
        </div>
      ) : (
        <div className='pt-container'>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>CPF</th>
              </tr>
            </thead>
            {pacienteRow(pacientes)}
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