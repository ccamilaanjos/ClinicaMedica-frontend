import React from "react";
import './style.css';

const Endereco = ({ handleEnderecoChange }) => {
  return (
    <div>
      <h3>Endereço:</h3>
      <div className="user-details">
          <div className="data-input">
            <span className="details">Logradouro <span className='obgt'>*</span></span>
            <input type="text" name='logradouro' onChange={handleEnderecoChange} required />
          </div>
          <div className="data-input">
            <span className="details">Número</span>
            <input type="text" name='numero' />
          </div>
          <div className="data-input">
            <span className="details">Complemento</span>
            <input type="text" name='complemento' />
          </div>
          <div className="data-input">
            <span className="details">Bairro <span className='obgt'>*</span></span>
            <input type="text" name='bairro' onChange={handleEnderecoChange} required />
          </div>
          <div className="data-input">
            <span className="details">Estado <span className='obgt'>*</span></span>
            <select className="select-estado" name='estado' onChange={handleEnderecoChange} required>
              <option value="" disabled defaultValue={""} hidden>Selecione uma opção</option>
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
            <input type="text" name='cidade' onChange={handleEnderecoChange} required />
          </div>
          <div className="data-input">
            <span className="details">CEP <span className='obgt'>*</span></span>
            <input type="text" name='cep' placeholder="xx.xxx-xxx" maxLength="8" onChange={handleEnderecoChange} required />
          </div>
      </div>
    </div>
  )
}

export default Endereco;