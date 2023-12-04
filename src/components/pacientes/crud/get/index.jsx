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

  const [pacientes, setPaciente] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'paciente-ms/pacientes/ativos?page=0';
        const response = await API.get(url);
        if (response.status != 200) {
          return toastErro();
        }
        setPaciente(response.data["content"]);
      } catch (error) {
        console.error('Erro na requisição: ', error);
        return toastErro();
      }
    };

    fetchData();
  }, []);

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

  return (
    <>
      {pacientes === null || pacientes.length === 0 ? (
        <div>
          <br></br><br></br>
          <h2>Nenhum paciente cadastrado</h2>
        </div>
      ) : (
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
      )}
    </>
  )
}

export default getData;