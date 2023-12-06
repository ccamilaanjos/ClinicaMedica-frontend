import { React, useState, useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import API from '../../api';
import { ToastContainer, toast } from 'react-toastify';
import getData from './get';

function Consultas() {
  return (
    <div>
      <Body />
    </div>
  )
}

const putData = (id, consultaBody) => {
  let toastId = null;
  let url = `consulta-ms/consultas/cancelar?id=${id}`;
  console.log(consultaBody)
  
  if (!toastId) {
    toastId = toast.loading("Cancelando...", { autoClose: false });
  }

  API.put(url, consultaBody)
    .then(res => {
      if (res.status == 200) {
        toast.update(toastId, {
          render: "Consulta cancelada!",
          isLoading: false,
          type: "success",
          autoClose: true
        });
      }
    })
    .catch((error) => {
      const errorMessage = ": " + error.response.data.message || "";
      toast.update(toastId, {
        render: "Não foi possível cancelar" + errorMessage,
        isLoading: false,
        type: "error",
        autoClose: true
      });
    });
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
    // return navigate(`cancelar/${id}`, { state: { cancelamento: putData } });
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
          {getData(putData)}
        </div>
      </div>
      <div className='empty'>
      </div>
    </div>
  )
}

export default Consultas;