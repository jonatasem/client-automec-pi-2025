import { useEffect, useState } from "react";
import { getProducts } from "../service/api";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response); // Armazena os produtos no estado
    } catch (err) {
      setError(err); // Armazena o erro no estado
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    refreshProducts(); // Chama a função ao montar o componente
  }, []);

  const countProducts = () => products.length; // Método para contar produtos

  return { 
    products, 
    loading, 
    error, 
    countProducts, 
    refreshProducts // Retorna a função para recarregar os produtos
  }; 
};

export default useProducts;