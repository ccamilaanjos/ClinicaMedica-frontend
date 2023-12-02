import React, { useState, useEffect } from 'react';
import API from '../../../api/api'

// Tabela com todos os médicos ativos
function getData() {
  const [medicos, setMedico] = useState([])

  useEffect(() => {
    let url = 'medico-ms/medicos/ativos?page=0';

    API.get(url).then((response) => {
      setMedico(response.data["content"]);
    })
  }, []);
  
  function medicoRow() {
    return (
      <>
      <tbody>
        {medicos.map(medico => (
          <tr key={medico.crm}>
            <td>{medico.nome}</td>
            <td>{medico.email}</td>
            <td>{medico.crm}</td>
            <td>
              <button className='update' type="button" onClick={() => alert(`Editar médico: ${medico.nome}`)}>Atualizar</button>
            </td>
            <td>
              <button className='delete' type="button" onClick={() => alert(`Desativar médico: ${medico.nome}`)}>Desativar</button>
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
          <th>CRM</th>
        </tr>
      </thead>
      {medicoRow(medicos)}
    </table>
  )
}

export default getData;