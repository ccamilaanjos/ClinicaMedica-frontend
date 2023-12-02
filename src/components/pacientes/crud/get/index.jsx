import React, { useState, useEffect } from 'react';
import API from '../../../api/api'

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
                <button className='delete' type="button" onClick={() => alert(`Desativar paciente: ${paciente.nome}`)}>Desativar</button>
              </td>
            </tr>))}
        </tbody>
      </>
    )
  }

  return (
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
  )
}

export default getData;