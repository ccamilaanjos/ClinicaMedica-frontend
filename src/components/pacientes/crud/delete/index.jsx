import React from 'react';
import API from '../../../api/api';
import { toast } from "react-toastify";

function removeData({ setPaciente, pacientes, cpf }) {
  let url = `paciente-ms/pacientes/${cpf}`;

  API.delete(url)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })

  const novaLista = pacientes.filter((paciente) => paciente.cpf !== cpf);
  setPaciente(novaLista);


  const toastSucesso = () => {
    toast.success("Paciente desativado!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const toastFalha = () => {
    toast.error("Falha ao desativar paciente", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
  
  toastSucesso();
};


export default removeData;