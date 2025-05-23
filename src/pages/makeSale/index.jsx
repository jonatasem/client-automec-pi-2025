import React, { useState } from "react";
import { createSale } from "../../service/api";
import useClients from "../../hooks/useClients";
import useProducts from "../../hooks/useProducts";
import "./index.scss";
import Loading from "../../components/loading";

export default function MakeSale() {
  const { clients } = useClients(); // Obtém a lista de clientes
  const { products, loading, error } = useProducts(); // Obtém a lista de produtos

  // Estados do componente
  const [selectedClient, setSelectedClient] = useState(""); // Cliente selecionado
  const [selectedProducts, setSelectedProducts] = useState([]); // Produtos selecionados
  const [quantity, setQuantity] = useState({}); // Quantidades dos produtos
  const [searchTerm, setSearchTerm] = useState(""); // Texto de busca
  const [successMessage, setSuccessMessage] = useState(""); // Mensagem de sucesso

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Validação: verifica se um cliente e pelo menos um produto foram selecionados
    if (!selectedClient || selectedProducts.length === 0) {
      alert("Por favor, selecione um cliente e pelo menos um produto.");
      return;
    }

    try {
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 15); // Define a data de faturamento como 15 dias a partir de hoje

      const saleData = {
        clienteId: selectedClient,
        produtos: selectedProducts.map((productId) => ({
          id: productId,
          quantidade: quantity[productId] || 1, // Usa a quantidade informada ou 1
          descricao:
            products.find((product) => product.id === productId)?.nome || "",
          preco_unitario:
            products.find((product) => product.id === productId)?.preco || 0,
        })),
        data_emissao: today.toISOString().split("T")[0], // Data de emissão
        data_faturamento: dueDate.toISOString().split("T")[0], // Data de faturamento
        forma_pagamento: "CARTEIRA",
        status: "FATURADO",
      };

      await createSale(saleData); // Tenta criar a venda
      setSuccessMessage("Venda realizada com sucesso!"); // Mensagem de sucesso

      // Remove a mensagem após 1.5 segundos
      setTimeout(() => {
        setSuccessMessage("");
      }, 1500);
    } catch (error) {
      console.error("Erro ao criar venda:", error);
      alert("Ocorreu um erro ao criar a venda. Tente novamente.");
    }
  };

  // Função para lidar com mudanças na quantidade de produtos
  const handleQuantityChange = (productId, value) => {
    const newQuantity = Math.max(value, 1); // Garante que a quantidade não fique abaixo de 1
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity,
    }));
  };

  // Filtra os produtos com base no texto de busca
  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="make-sale">
      <h2 className="title-default">Criar Venda</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <article className="sales-head">
        <div>
          <select onChange={(e) => setSelectedClient(e.target.value)} required>
            <option value="">Selecione um cliente</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="btn-create">
          <button onClick={handleSubmit}>Criar Venda</button>
        </div>
      </article>

      <div className="search-products">
        <input
          type="text"
          placeholder="Pesquise uma peça..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {products.length === 0 ? ( // Verifica se não há produtos cadastrados
        <div className="no-results">Cadastre um produto e tente novamente!</div>
      ) : (
        <form onSubmit={handleSubmit} className="container-vendas">
          {filteredProducts.map((product) => (
            <article key={product.id} className="vendas-center">
              <input
                type="checkbox"
                value={product.id}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    setSelectedProducts([...selectedProducts, product.id]);
                    setQuantity((prevQuantity) => ({
                      ...prevQuantity,
                      [product.id]: 1, // Define a quantidade padrão como 1
                    }));
                  } else {
                    setSelectedProducts(
                      selectedProducts.filter((id) => id !== product.id),
                    );
                    const { [product.id]: removed, ...rest } = quantity;
                    setQuantity(rest); // Atualiza o estado
                  }
                }}
              />
              <label>{product.nome}</label>
              <div className="quantity-controls">
                <input
                  type="number"
                  value={quantity[product.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                  min="1" // Garante que a quantidade mínima seja 1
                />
                <div className="quantity-buttons">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuantityChange(
                        product.id,
                        (quantity[product.id] || 1) + 1,
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuantityChange(
                        product.id,
                        (quantity[product.id] || 1) - 1,
                      )
                    }
                  >
                    -
                  </button>
                </div>
              </div>
            </article>
          ))}
        </form>
      )}
    </section>
  );
}
