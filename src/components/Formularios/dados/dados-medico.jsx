import React, { useEffect } from 'react';
import InputMask from 'react-input-mask';

const DadosPessoais = ({ handleDadosPessoaisChange, especialidades, dataFill }) => {
  const isUpdate = dataFill != null;

  // Se for modo de edição, pré-seleciona a especialidade na combobox
  if (isUpdate) {
    useEffect(() => {
      selecionarEspecialidade(dataFill.especialidade, 'select-especialidade');
    }, [dataFill.especialidade]);
  }

  function selecionarEspecialidade(valor, selectId) {
    const select = document.getElementById(selectId);

    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === valor) {
        select.options[i].selected = true;
        return;
      }
    }
  }

  return (
    <div>
      <h3>Dados Pessoais:</h3>
      <div>
        <div className="user-details">
          <div className='input-row'>
            <div className="data-input">
              <span className="details">Nome completo <span className='obgt'>*</span></span>
              <InputMask
                placeholder="Digite o nome"
                name='nome'
                defaultValue={isUpdate ? dataFill.nome : ""}
                onChange={handleDadosPessoaisChange}
                required />
            </div>
            <div className="data-input">
              <span className="details">Email <span className='obgt'>*</span></span>
              <InputMask
                placeholder="exemplo@dominio.com"
                name="email"
                defaultValue={isUpdate ? dataFill.email : ""}
                onChange={handleDadosPessoaisChange}
                disabled={isUpdate}
                required />
            </div>
            <div className="data-input">
              <span className="details">Telefone <span className='obgt'>*</span></span>
              <InputMask
                mask={isUpdate ? null : "(99) 99999-9999"}
                maskChar="_"
                pattern="\(\d{2}\) \d{5}-\d{4}"
                placeholder="(99) 99999-9999"
                name="telefone"
                defaultValue={isUpdate ? dataFill.telefone : ""}
                onChange={handleDadosPessoaisChange}
                required />
            </div>
            <div className="data-input">
              <span className="details">CRM <span className='obgt'>*</span></span>
              <InputMask
                placeholder="123456/UF"
                name="crm"
                defaultValue={isUpdate ? dataFill.crm : ""}
                onChange={handleDadosPessoaisChange}
                disabled={isUpdate}
                required />
            </div>
            <div className="data-input">
              <span className="details">Especialidade <span className='obgt'>*</span></span>
              <select
                className="select-especialidade"
                defaultValue=""
                disabled={isUpdate}
                id='select-especialidade'
                name='especialidade'
                onChange={handleDadosPessoaisChange}
                required>
                {isUpdate ? <></>
                  :
                  <>
                    <option value="" disabled hidden>Selecione uma opção</option>
                  </>}
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