import { useEffect, useState } from "react";
import { getClients } from "..//service/api";

const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await getClients();
      setClients(response); // Armazena os clientes no estado
    } catch (err) {
      setError(err); // Armazena o erro no estado
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    fetchClients(); // Busca os clientes ao montar o componente
  }, []);

  return { clients, loading, error, refetchClients: fetchClients };
};

export default useClients;
