import React, { useState } from "react";
import { createClient } from "../../service/api";
import useClients from "../../hooks/useClients";
import "./index.scss";

export default function RegisterCustomer() {
  const { clients } = useClients();
  const [clientData, setClientData] = useState({
    nome: "",
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
    telefone: "",
    documento: {
      cnpj_cpf: "",
    },
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    // Atualiza estado para campos aninhados
    if (keys.length > 1) {
      setClientData((prevData) => ({
        ...prevData,
        [keys[0]]: {
          ...prevData[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setClientData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se o cliente já existe
    const clientExists = clients.some(
      (client) => client.nome.toLowerCase() === clientData.nome.toLowerCase(),
    );
    if (clientExists) {
      alert("Já existe um cliente cadastrado com esse nome.");
      return;
    }

    // Cria o cliente
    await createClient(clientData);
    resetForm();
    setSuccessMessage("Cliente cadastrado com sucesso!");

    // Limpa a mensagem de sucesso após 1.5 segundos
    setTimeout(() => {
      setSuccessMessage("");
    }, 1500);
  };

  // Função para resetar o formulário
  const resetForm = () => {
    setClientData({
      nome: "",
      endereco: {
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
      },
      telefone: "",
      documento: {
        cnpj_cpf: "",
      },
    });
  };

  return (
    <section className="register-customer">
      <form onSubmit={handleSubmit} className="create-client">
        <h2 className="title-default">Criar Cliente</h2>
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <div>
          <input
            name="nome"
            placeholder="Nome"
            value={clientData.nome}
            onChange={handleChange}
            required
          />
          <input
            name="endereco.rua"
            placeholder="Rua"
            value={clientData.endereco.rua}
            onChange={handleChange}
            required
          />
          <input
            name="endereco.numero"
            placeholder="Número"
            value={clientData.endereco.numero}
            onChange={handleChange}
            required
          />
          <input
            name="endereco.bairro"
            placeholder="Bairro"
            value={clientData.endereco.bairro}
            onChange={handleChange}
            required
          />
          <input
            name="endereco.cidade"
            placeholder="Cidade"
            value={clientData.endereco.cidade}
            onChange={handleChange}
            required
          />
          <input
            name="endereco.estado"
            placeholder="Estado"
            value={clientData.endereco.estado}
            onChange={handleChange}
            required
          />
          <input
            name="endereco.cep"
            placeholder="CEP"
            value={clientData.endereco.cep}
            onChange={handleChange}
            required
          />
          <input
            name="telefone"
            placeholder="Telefone"
            value={clientData.telefone}
            onChange={handleChange}
          />
          <input
            name="documento.cnpj_cpf"
            placeholder="CNPJ/CPF"
            value={clientData.documento.cnpj_cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="btn-create">
          <button type="submit">Cadastrar Cliente</button>
        </div>
      </form>
    </section>
  );
}
