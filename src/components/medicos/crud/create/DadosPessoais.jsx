import React from "react";
import InputMask from 'react-input-mask';

const DadosPessoais = ({ handleDadosPessoaisChange, especialidades }) => {

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
              <InputMask placeholder="exemplo@dominio.com" name="email" onChange={handleDadosPessoaisChange} required/>
            </div>
            <div className="data-input">
              <span className="details">Telefone <span className='obgt'>*</span></span>
              <InputMask mask="(99) 9999-9999" maskChar="_" placeholder="(99) 99999-9999" name="telefone" onChange={handleDadosPessoaisChange} required />
            </div>
            <div className="data-input">
              <span className="details">CRM <span className='obgt'>*</span></span>
              <InputMask placeholder="123456/UF" name="crm" onChange={handleDadosPessoaisChange} required />
            </div>
            <div className="data-input">
              <span className="details">Especialidade <span className='obgt'>*</span></span>
              <select className="select-especialidade" defaultValue="" name='especialidade' onChange={handleDadosPessoaisChange} required>
                <option value="" disabled hidden>Selecione uma opção</option>
                {especialidades.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DadosPessoais;