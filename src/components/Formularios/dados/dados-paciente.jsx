import InputMask from 'react-input-mask';
import '../style.css';

const DadosPessoais = ({ handleDadosPessoaisChange, dataFill }) => {
  const isUpdate = dataFill != null;

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
                placeholder="(99) 99999-9999"
                pattern="\(\d{2}\) \d{5}-\d{4}"
                name="telefone"
                defaultValue={isUpdate ? dataFill.telefone : ""}
                onChange={handleDadosPessoaisChange}
                required />
            </div>
            <div className="data-input">
              <span className="details">CPF <span className='obgt'>*</span></span>
              <InputMask
                mask={isUpdate ? null : "999.999.999-99"}
                maskChar="_"
                placeholder="123.456.789-01"
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                name="cpf"
                defaultValue={isUpdate ? dataFill.cpf : ""}
                onChange={handleDadosPessoaisChange}
                disabled={isUpdate}
                required />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DadosPessoais;