import React, { useState, useEffect } from 'react';
import API from '../../../api/api'
import removeData from '../delete';

// Tabela com todos os pacientes ativos
function getData() {

  const [pacientes, setPaciente] = useState([])

  useEffect(() => {
    let url = 'paciente-ms/pacientes/ativos?page=0';

    API.get(url).then((response) => {
      setPaciente(response.data["content"]);
    })
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
                <button className='update' type="button" onClick={() => alert(`Editar paciente: ${paciente.nome}`)}>Atualizar</button>
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