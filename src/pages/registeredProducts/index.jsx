import React, { useState } from "react";
import useProducts from "../../hooks/useProducts";
import { deleteProduct } from "../../service/api";
import "./index.scss";
import Loading from "../../components/loading";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";

export default function RegisteredProducts() {
  const { products, loading, error, refreshProducts } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProductId, setExpandedProductId] = useState(null);
  const [registerProduct, setRegisterProduct] = useState("");

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="error-loading">
        Erro ao buscar produtos: {error.message}
      </div>
    );

  // Filtra os produtos com base no termo de pesquisa
  const filteredProducts = products.filter((product) =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Função para excluir um produto
  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?",
    );
    if (confirmDelete) {
      try {
        await deleteProduct(productId); // Chame a função para deletar o produto
        await refreshProducts(); // Atualiza a lista de produtos
        setRegisterProduct("Produto excluído com sucesso!"); // Mensagem de sucesso
        // Remove a mensagem após 1.5 segundos
        setTimeout(() => {
          setRegisterProduct("");
        }, 1500);
      } catch (error) {
        console.error("Erro ao excluir o produto:", error);
        setRegisterProduct("Erro ao excluir o produto."); // Mensagem de erro
      }
    }
  };

  return (
    <section className="registered-products">
      <h2 className="title-default">Produtos Cadastrados</h2>
      {registerProduct && (
        <div className="success-message">{registerProduct}</div>
      )}
      <input
        type="text"
        placeholder="Pesquisar pelo nome do produto..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
        aria-label="Pesquisar pelo nome do produto"
      />
      {filteredProducts.length > 0 ? (
        <div className="products-list">
          {filteredProducts.map((product, index) => {
            const isExpanded = expandedProductId === product.id;

            return (
              <div key={product.id} className="product-card">
                <div className="card-left">
                  <div className="container-layout">
                    <p>{index + 1} - </p>
                    <h4 className="product-name">{product.nome}</h4>
                  </div>
                  <button
                    className="btn-options"
                    onClick={() =>
                      setExpandedProductId(isExpanded ? null : product.id)
                    }
                  >
                    {isExpanded ? <BsCaretUp /> : <BsCaretDown />}
                  </button>
                </div>
                {isExpanded && (
                  <div className={`card-right card-expanded`}>
                    <ul className="product-details">
                      <li>Preço: R$ {product.preco.toFixed(2)}</li>
                      <li>Quantidade: {product.quantidade || 0}</li>
                      <li>Descrição: {product.descricao}</li>
                    </ul>
                    <div className="details-right">
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(product.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-results">Nenhum produto encontrado.</p>
      )}
    </section>
  );
}
