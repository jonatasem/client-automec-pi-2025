import { useEffect, useState } from "react";
import { getSales, getProducts, getClients } from "../service/api";

const useDashboardData = () => {
  const [data, setData] = useState({
    salesCount: 0,
    totalRevenue: 0,
    clientsCount: 0,
    productsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const sales = await getSales();
      const products = await getProducts();
      const clients = await getClients();

      setData({
        salesCount: sales.length,
        totalRevenue: sales.reduce(
          (total, sale) => total + sale.valor_total,
          0,
        ),
        clientsCount: clients.length,
        productsCount: products.length,
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return { data, loading, error };
};

export default useDashboardData;
