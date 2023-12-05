import { React, useState, useEffect } from 'react';
import './style.css';
import { useNavigate, useLocation } from 'react-router-dom';
import API from '../../api';
import { ToastContainer, toast } from 'react-toastify';

function Consultas() {
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
        console.error('Erro na requisição: ', error);
        return toast.error('Não foi possível conectar ao servidor. Tente novamente mais tarde.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    };

    fetchData();

  }, []);

  const navigate = useNavigate();

  const marcar = () => {
    return navigate('marcar', { state: { especialidades: especialidades } });
  };
  
  const cancelar = (id) => {
    return navigate(`cancelar/${id}`);
  }

  return (
    <div className='c-container'>
      <ToastContainer />
      <h1 className='consultas-title'>Consultas</h1>
      <div>
        <div className='opcoes'>
          <button className='create' type='button'
            onClick={marcar}>
            Marcação
          </button>
          <button className='cancel' type='button'
            onClick={cancelar}>
            Cancelamento
          </button>
        </div>
        <div className='consultas-table'>
          {/*getData(especialidades)*/}
        </div>
      </div>
      <div className='empty'>
      </div>
    </div>
  )
}

export default Consultas;