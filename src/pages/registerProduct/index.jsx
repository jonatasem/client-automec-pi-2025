import { useState } from "react";
import { createProduct } from "../../service/api";
import "./index.scss";

export default function RegisterProduct() {
  const [productData, setProductData] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    quantidade: 0,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]:
        name === "preco" || name === "quantidade" ? parseFloat(value) : value, // Converte preço e quantidade para número
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    await createProduct(productData); // Cadastra o produto
    setProductData({
      // Limpa os campos do formulário
      nome: "",
      descricao: "",
      preco: 0,
      quantidade: 0,
    });
    setSuccessMessage("Produto criado com sucesso!"); // Define a mensagem de sucesso

    // Remove a mensagem após 5 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 1500);
  }

  return (
    <section className="register-product">
      <form onSubmit={handleSubmit} className="create-product">
        <h2 className="title-default">Criar Produto</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}{" "}
        {/* Exibe a mensagem de sucesso */}
        <input
          name="nome"
          placeholder="Nome"
          value={productData.nome}
          onChange={handleChange}
          required
        />
        <input
          name="descricao"
          placeholder="Descrição"
          value={productData.descricao}
          onChange={handleChange}
          required
        />
        <div className="create-product-center">
          <label>
            Preço
            <input
              name="preco"
              type="number"
              value={productData.preco}
              onChange={handleChange}
              required
              min="0"
            />
            <span>, 00</span>
          </label>

          <label htmlFor="quantidade">
            Quantidade
            <input
              name="quantidade"
              type="number"
              value={productData.quantidade}
              onChange={handleChange}
              required
              min="0"
            />
          </label>
        </div>
        <div className="btn-create">
          <button type="submit">Criar Produto</button>
        </div>
      </form>
    </section>
  );
}
