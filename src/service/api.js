import axios from "axios";

// Define a URL base da sua API
const API_URL = import.meta.env.VITE_API_URL;

// Função para tratar erros
const handleError = (error) => {
  console.error("Erro na requisição:", error);
  throw error; // Re-lança o erro para que possa ser tratado onde a função foi chamada
};

// Função para buscar as vendas
export const getSales = async () => {
  try {
    const response = await axios.get(`${API_URL}/vendas`);
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    handleError(error); // Lida com erros
  }
};

// Função para buscar os produtos
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/produtos`);
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    handleError(error); // Lida com erros
  }
};

// Função para buscar os clientes
export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clientes`);
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    handleError(error); // Lida com erros
  }
};

// Função para buscar um cliente específico pelo ID
export const getClientById = async (clientId) => {
  try {
    const response = await axios.get(`${API_URL}/clientes/${clientId}`);
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    handleError(error); // Lida com erros
  }
};

// Função para criar um novo cliente
export const createClient = async (clientData) => {
  try {
    const response = await axios.post(`${API_URL}/clientes`, clientData);
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    handleError(error); // Lida com erros
  }
};

// Função para criar um novo produto
export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/produtos`, productData);
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    handleError(error); // Lida com erros
  }
};

// Função para criar uma nova venda
export const createSale = async (saleData) => {
  try {
    const response = await axios.post(`${API_URL}/vendas`, saleData);
    return response.data; // Retorna apenas os dados da resposta
  } catch (error) {
    handleError(error); // Lida com erros
  }
};

// Função para excluir um cliente
export const deleteClient = async (clientId) => {
  try {
    await axios.delete(`${API_URL}/clientes/${clientId}`); // Ajuste a URL conforme necessário
  } catch (error) {
    handleError(error); // Lida com erros
  }
};

// Função para excluir uma venda
export const deleteSale = async (saleId) => {
  try {
    await axios.delete(`${API_URL}/vendas/${saleId}`); // Ajuste a URL conforme necessário
  } catch (error) {
    handleError(error); // Lida com erros
  }
};

// Função para excluir um produto
export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${API_URL}/produtos/${productId}`); // Ajuste a URL conforme necessário
  } catch (error) {
    handleError(error); // Lida com erros
  }
};
