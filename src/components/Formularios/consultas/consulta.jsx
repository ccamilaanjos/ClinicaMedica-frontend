import InputMask from 'react-input-mask';
import './style.css';

const Consulta = ({ handleConsultaChange, especialidades }) => {

  return (
    <div>
      <h3>Paciente:</h3>
      <div className="user-details">
        <div className="data-input">
          <span className="details">CPF<span className='obgt'>*</span></span>
          <InputMask
            mask="999.999.999-99"
            maskChar="_"
            pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
            placeholder="123.456.789-01"
            name="cpf"
            onChange={handleConsultaChange}
            required />
        </div>
      </div>
      <h3>Médico:</h3>
      <div className="user-details">
        <div className="data-input">
          <span className="details">Especialidade <span className='obgt'>*</span></span>
          <select
            className="select-especialidade"
            name='especialidade'
            onChange={handleConsultaChange}
            required
            defaultValue="">
            <option value="" disabled hidden>Selecione uma opção</option>
            {especialidades.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="data-input">
          <span className="details">CRM</span>
          <input
            placeholder="123456-UF"
            name="crm"
            onChange={handleConsultaChange}
          />
        </div>
      </div>
      <h3>Horário e data:</h3>
      <div className="user-details">
        <div className="data-input">
          <span className="details">Horário <span className='obgt'>*</span></span>
          <InputMask
            type="text"
            mask={"99:99"}
            maskChar={"_"}
            pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
            name='horario'
            placeholder="HH:MM"
            onChange={handleConsultaChange}
            required />
        </div>
        <div className="data-input">
          <span className="details">Data <span className='obgt'>*</span></span>
          <InputMask
            type="text"
            mask={"99/99/9999"}
            maskChar={"_"}
            pattern="(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/\d{4}"
            name='data'
            placeholder="DD/MM/AAAA"
            onChange={handleConsultaChange}
            required />
        </div>
      </div>
    </div>
  )
}

export default Consulta;