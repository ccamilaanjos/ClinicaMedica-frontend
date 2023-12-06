import API from '/src/api';
import { toast } from "react-toastify";

function removeData({ setPaciente, pacientes, cpf }) {
  let toastId = null;
  let url = `paciente-ms/pacientes/${cpf}`;

  if (!toastId) {
    toastId = toast.loading("Desativando...", { autoClose: false });
  }

  API.delete(url)
    .then(res => {
      if (res.status == 200) {
        const novaLista = pacientes.filter((paciente) => paciente.cpf !== cpf);
        setPaciente(novaLista);
        toast.update(toastId, {
          render: "Paciente desativado!",
          isLoading: false,
          type: "success",
          autoClose: true
        });
      }
    })
    .catch((error) => {
      toast.update(toastId, {
        render: "Falha ao desativar paciente",
        isLoading: false,
        type: "error",
        autoClose: true
      });
    });
};


export default removeData;