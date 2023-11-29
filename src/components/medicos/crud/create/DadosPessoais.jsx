import React from "react";

const DadosPessoais = ({ handleDadosPessoaisChange} ) => {
  return (
    <div>
      <h3>Dados Pessoais:</h3>
      <div>
          <div className="user-details">
            <div className='input-row'>
              <div className="data-input">
                <span className="details">Nome completo <span className='obgt'>*</span></span>
                <input type="text" name='nome' placeholder="Digite o nome" onChange={handleDadosPessoaisChange} required />
              </div>
              <div className="data-input">
                <span className="details">Email <span className='obgt'>*</span></span>
                <input type="text" name='email' placeholder="Digite o email" onChange={handleDadosPessoaisChange} required />
              </div>
              <div className="data-input">
                <span className="details">Telefone <span className='obgt'>*</span></span>
                <input type="text" name='telefone' placeholder="(99) 99999-9999" onChange={handleDadosPessoaisChange} required />
              </div>
              <div className="data-input">
                <span className="details">CRM <span className='obgt'>*</span></span>
                <input type="text" name='crm' size="9" minLength="4" maxLength="13" placeholder="xxxxxxxxxx/UF" onChange={handleDadosPessoaisChange} required />
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default DadosPessoais;