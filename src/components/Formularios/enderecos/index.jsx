import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import './style.css';

const Endereco = ({ handleEnderecoChange, dataFill }) => {
  const isUpdate = dataFill != null;
  let uf;

  // Se for modo de edição, pré-seleciona o estado na combobox
  if (isUpdate) {
    uf = dataFill.uf.toLowerCase();

    useEffect(() => {
      selecionarUF(uf, 'select-estado');
    }, [uf]);
  }

  function selecionarUF(valor, selectId) {
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
      <h3>Endereço:</h3>
      <div className="user-details">
        <div className="data-input">
          <span className="details">Logradouro <span className='obgt'>*</span></span>
          <input
            type="text"
            name='logradouro'
            defaultValue={isUpdate ? dataFill.logradouro : ""}
            onChange={handleEnderecoChange}
            required />
        </div>
        <div className="data-input">
          <span className="details">Número</span>
          <input
            type="text"
            name='numero'
            defaultValue={isUpdate ? dataFill.numero : ""}
            onChange={handleEnderecoChange} />
        </div>
        <div className="data-input">
          <span className="details">Complemento</span>
          <input
            type="text"
            name='complemento'
            placeholder="Ex.: Bloco, apartamento, casa"
            defaultValue={isUpdate ? dataFill.complemento : ""}
            onChange={handleEnderecoChange} />
        </div>
        <div className="data-input">
          <span className="details">Bairro <span className='obgt'>*</span></span>
          <input
            type="text"
            name='bairro'
            defaultValue={isUpdate ? dataFill.bairro : ""}
            onChange={handleEnderecoChange} required />
        </div>
        <div className="data-input">
          <span className="details">Estado <span className='obgt'>*</span></span>
          <select
            className="select-estado"
            id='select-estado'
            defaultValue={isUpdate ? uf : ""}
            name='uf'
            onChange={handleEnderecoChange}
            required>
            {isUpdate ? <></>
              :
              <>
                <option value="" disabled hidden>Selecione uma opção</option>
              </>}
            <option value="ac">Acre</option>
            <option value="al">Alagoas</option>
            <option value="ap">Amapá</option>
            <option value="am">Amazonas</option>
            <option value="ba">Bahia</option>
            <option value="ce">Ceará</option>
            <option value="df">Distrito Federal</option>
            <option value="es">Espírito Santo</option>
            <option value="go">Goiás</option>
            <option value="ma">Maranhão</option>
            <option value="mt">Mato Grosso</option>
            <option value="ms">Mato Grosso do Sul</option>
            <option value="mg">Minas Gerais</option>
            <option value="pa">Pará</option>
            <option value="pb">Paraíba</option>
            <option value="pr">Paraná</option>
            <option value="pe">Pernambuco</option>
            <option value="pi">Piauí</option>
            <option value="rj">Rio de Janeiro</option>
            <option value="rn">Rio Grande do Norte</option>
            <option value="rs">Rio Grande do Sul</option>
            <option value="ro">Rondônia</option>
            <option value="rr">Roraima</option>
            <option value="sc">Santa Catarina</option>
            <option value="sp">São Paulo</option>
            <option value="se">Sergipe</option>
            <option value="to">Tocantins</option>
          </select>
        </div>
        <div className="data-input">
          <span className="details">Cidade <span className='obgt'>*</span></span>
          <input
            type="text"
            name='cidade'
            defaultValue={isUpdate ? dataFill.cidade : ""}
            onChange={handleEnderecoChange}
            required />
        </div>
        <div className="data-input">
          <span className="details">CEP <span className='obgt'>*</span></span>
          <InputMask
            mask={isUpdate ? null : "99999-999"}
            maskChar="_"
            pattern="[0-9]{5}-[0-9]{3}"
            placeholder="99999-999"
            name="cep"
            defaultValue={isUpdate ? dataFill.cep : ""}
            onChange={handleEnderecoChange}
            required />
        </div>
      </div>
    </div>
  )
}

export default Endereco;