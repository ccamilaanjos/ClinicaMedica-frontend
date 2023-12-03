import React, { useState, useEffect } from 'react';
import API from '../../../api/api';
import { toast } from "react-toastify";
import removeData from '../delete';

const toastErro = () => {
  toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.', {
    position: toast.POSITION.TOP_RIGHT,
  });
}

// Tabela com todos os médicos ativos
function getData() {
  const [medicos, setMedico] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'medico-ms/medicos/ativos?page=0';
        const response = await API.get(url);
        if (response.status != 200) {
          return toastErro();
        }
        setMedico(response.data["content"]);
      } catch (error) {
        console.error('Erro na requisição: ', error);
        return toastErro();
      }
    };

    fetchData();
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
              <td>{medico.especialidade}</td>
              <td>
                <button className='update' type="button"
                onClick={() => alert(`Editar médico: ${medico.nome}`)}>Atualizar</button>
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

  return (
    <>
      {medicos === null || medicos.length === 0 ? (
        <div>
          <br></br><br></br>
          <h2>Nenhum médico cadastrado</h2>
        </div>
      ) : (
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
        </table>)}
    </>
  )
}

export default getData;