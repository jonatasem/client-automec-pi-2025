import React, { useState } from "react";
import useClients from "../../hooks/useClients";
import { deleteClient } from "../../service/api";
import "./index.scss";
import Loading from "../../components/loading";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";

export default function RegisteredCustomers() {
  const { clients, loading, error, refetchClients } = useClients();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState(new Set());
  const [expandedClientId, setExpandedClientId] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState("");

  if (loading) return <Loading />;
  if (error)
    return (
      <div className="error-loading">
        Erro ao buscar clientes: {error.message}
      </div>
    );

  // Filtra os clientes com base no termo de pesquisa
  const filteredClients = clients.filter((client) =>
    client.nome.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleClientSelect = (clientId) => {
    const updatedSelection = new Set(selectedClients);
    updatedSelection.has(clientId)
      ? updatedSelection.delete(clientId)
      : updatedSelection.add(clientId);
    setSelectedClients(updatedSelection);
  };

const handleDeleteClients = async (clientId) => {
  if (window.confirm("Você tem certeza que deseja excluir os clientes selecionados?")) {
    try {
      await deleteClient(clientId);
      await Promise.all(
        Array.from(selectedClients).map((clientId) => deleteClient(clientId)),
      );
      setDeleteMessage("Cliente excluído com sucesso!")
      await refetchClients();

      setTimeout(() => {
        setDeleteMessage("");
      }, 1500);
    } catch (error) {
      alert("Erro ao excluir clientes: " + error.message);
    }
  }
};


  const exportToCSV = () => {
    const selected = clients.filter((client) => selectedClients.has(client.id));
    const csvContent = [
      ["Nome", "Endereço", "Telefone", "Documento"], // Cabeçalho
      ...selected.map((client) => [
        client.nome,
        `${client.endereco.rua}, ${client.endereco.numero}, ${client.endereco.bairro}, ${client.endereco.cidade} - ${client.endereco.estado}`,
        client.telefone,
        client.documento.cnpj_cpf,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "clientes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

return (
  <section className="registered-customers">
    <h2 className="title-default">Clientes Cadastrados</h2>
    {deleteMessage && (
      <div className="success-message">{deleteMessage}</div>
    )}
    {clients.length === 0 ? ( // Verifica se não há clientes cadastrados
      <div className="no-results">Não há clientes cadastrados.</div>
    ) : (
      <>
        <input
          type="text"
          placeholder="Pesquisar pelo nome do cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="clients-list">
          {filteredClients.map((client, index) => {
            const isExpanded = expandedClientId === client.id;

            return (
              <div key={client.id} className="client-card">
                <div className="client-header">
                  <input
                    type="checkbox"
                    checked={selectedClients.has(client.id)}
                    onChange={() => handleClientSelect(client.id)}
                  />
                  <span>
                    {index + 1} - {client.nome}
                  </span>
                  <button
                    className="drop-clients"
                    onClick={() =>
                      setExpandedClientId(isExpanded ? null : client.id)
                    }
                  >
                    {isExpanded ? <BsCaretUp /> : <BsCaretDown />}
                  </button>
                </div>
                {isExpanded && (
                  <div className="client-details">
                    <p>
                      <strong>Endereço:</strong>{" "}
                      {`${client.endereco.rua}, ${client.endereco.numero}, ${client.endereco.bairro}, ${client.endereco.cidade} - ${client.endereco.estado}`}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {client.telefone}
                    </p>
                    <p>
                      <strong>Documento:</strong> {client.documento.cnpj_cpf}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    )}
    <div className="clients-actions">
      <button
        onClick={handleDeleteClients}
        className="delete-button"
        disabled={selectedClients.size === 0}
      >
        Excluir Clientes
      </button>
      <button
        onClick={exportToCSV}
        className="export-button"
        disabled={selectedClients.size === 0}
      >
        Exportar em CSV
      </button>
    </div>
  </section>
);


}
