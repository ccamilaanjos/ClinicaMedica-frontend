import React from "react";
import InputMask from 'react-input-mask';

const DadosPessoais = ({ handleDadosPessoaisChange }) => {
  return (
    <div>
      <h3>Dados Pessoais:</h3>
      <div>
        <div className="user-details">
          <div className='input-row'>
            <div className="data-input">
              <span className="details">Nome completo <span className='obgt'>*</span></span>
              <InputMask placeholder="Digite o nome" name='nome' onChange={handleDadosPessoaisChange} required />
            </div>
            <div className="data-input">
              <span className="details">Email <span className='obgt'>*</span></span>
              <InputMask placeholder="exemplo@dominio.com" name="email" onChange={handleDadosPessoaisChange} required />
            </div>
            <div className="data-input">
              <span className="details">Telefone <span className='obgt'>*</span></span>
              <InputMask mask="(99) 9999-9999" maskChar="_" placeholder="(99) 99999-9999" name="telefone" onChange={handleDadosPessoaisChange} required />
            </div>
            <div className="data-input">
              <span className="details">CPF <span className='obgt'>*</span></span>
              <InputMask mask="999.999.999-99" maskChar="_" placeholder="123.456.789-01" name="cpf"
                onChange={handleDadosPessoaisChange}
                required />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DadosPessoais;