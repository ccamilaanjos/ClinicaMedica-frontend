import API from '../../../api/api';
import { toast } from "react-toastify";

function removeData({ setMedico, medicos, crm }) {
  let toastId = null;
  let url = `medico-ms/medicos/${crm}`;

  if (!toastId) {
    toastId = toast.loading("Desativando...", { autoClose: false });
  }

  API.delete(url)
    .then(res => {
      if (res.status == 200) {
        const novaLista = medicos.filter((medico) => medico.crm !== crm);
        setMedico(novaLista);
        toast.update(toastId, {
          render: "Médico desativado!",
          isLoading: false,
          type: "success",
          autoClose: true
        });
      }
    })
    .catch(error => {
      console.error("Erro na requisição: " + error);
      toast.update(toastId, {
        render: "Falha ao desativar médico",
        isLoading: false,
        type: "error",
        autoClose: true
      });
    });
};

export default removeData;