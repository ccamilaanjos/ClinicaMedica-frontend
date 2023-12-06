import { React, useState, useEffect } from 'react';
import './style.css';
import getData from './crud/get';
import API from '../../api'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Medicos() {
  return (
    <div>
      <Body />
    </div>
  )
}

function Body() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'medico-ms/especialidades/todas';
        const response = await API.get(url);
        const titulos = response.data.map(especialidade => especialidade.titulo);
        setEspecialidades(titulos);

      } catch (error) {
        // Toast removido para evitar duplicação
      }
    };

    fetchData();

  }, []);

  const navigate = useNavigate();

  const cadastrar = () => {
    return navigate('cadastrar', { state: { especialidades: especialidades } });
  };

  return (
    <div className='m-container'>
      <ToastContainer />
      <h1 className='medicos-title'>Médicos</h1>
      <div>
        <div>
          <button className='cadastrar' type='button'
            onClick={cadastrar}>
            Cadastrar novo médico
          </button>
        </div>
        <div className='medicos-table'>
          {getData(especialidades)}
        </div>
      </div>
      <div className='empty'>
      </div>
    </div>
  )
}
export default Medicos;