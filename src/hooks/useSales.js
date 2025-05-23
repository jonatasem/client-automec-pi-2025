import { useEffect, useState } from "react";
import { getSales } from "../service/api";

const useSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const response = await getSales();
      setSales(response); // Armazena as vendas no estado
    } catch (err) {
      setError(err); // Armazena o erro no estado
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    fetchSales(); // Busca as vendas ao montar o componente
  }, []);

  return { sales, loading, error, refetchSales: fetchSales };
};

export default useSales;
