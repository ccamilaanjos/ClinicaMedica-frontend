import React from 'react';

function getData() {
    let pacientes = fetchPacientes();
    
    return (
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
          </tr>
        </thead>
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
      </table>
    )
}

function fetchPacientes() {
  const pacientes = [
    { nome: 'Maria', email: 'maria@gmail.com', cpf: '12345678909' },
    { nome: 'João', email: 'joao@gmail.com', cpf: '98765432101' },
    { nome: 'Ana', email: 'ana@gmail.com', cpf: '12345678908' },
    { nome: 'Pedro', email: 'pedro@gmail.com', cpf: '98765432102' },
    { nome: 'Raul', email: 'raul@gmail.com', cpf: '12345678907' },
    { nome: 'Lua', email: 'lua@gmail.com', cpf: '98765432103' },
    { nome: 'Lucas Macedo Rabelo', email: 'lucasrabelo@gmail.com', cpf: '12345678906' },
    { nome: 'Maria', email: 'maria@gmail.com', cpf: '12345678900' },
    { nome: 'João', email: 'joao@gmail.com', cpf: '98765432104' },
    { nome: 'Ana', email: 'ana@gmail.com', cpf: '12345678905' },
  ];
  
  return pacientes;
}

export default getData;