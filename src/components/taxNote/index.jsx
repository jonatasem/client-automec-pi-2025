import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSales from "../../hooks/useSales";
import useClients from "../../hooks/useClients";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./index.scss";

export default function TaxNote() {
  const { id } = useParams();
  const { sales, loading: salesLoading, error: salesError } = useSales();
  const {
    clients,
    loading: clientsLoading,
    error: clientsError,
  } = useClients();
  const invoiceRef = useRef();
  const [clientName, setClientName] = useState("");

  const sale = sales.find((sale) => sale.id === id);

  useEffect(() => {
    if (sale && clients.length > 0) {
      const client = clients.find((client) => client.id === sale.clienteId);
      if (client) {
        setClientName(client.nome);
      }
    }
  }, [sale, clients]);

  if (salesLoading || clientsLoading)
    return <div className="loading">Carregando...</div>;
  if (salesError)
    return (
      <div className="no-results">
        Erro ao buscar venda: {salesError.message}
      </div>
    );
  if (clientsError)
    return (
      <div className="no-results">
        Erro ao buscar cliente: {clientsError.message}
      </div>
    );
  if (!sale) return <div className="no-results">Venda não encontrada.</div>;

  const generatePDF = () => {
    const button = invoiceRef.current.querySelector(".invoice-footer button");
    const buttonParent = button.parentElement;
    buttonParent.removeChild(button);

    html2canvas(invoiceRef.current, { scale: window.devicePixelRatio || 1 })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4", // Formato A4
          putOnlyUsedFonts: true,
          floatPrecision: 16,
        });

        const imgWidth = pdf.internal.pageSize.getWidth(); // Largura da página A4
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pageHeight = pdf.internal.pageSize.getHeight();

        let heightLeft = imgHeight;
        let position = 0;

        // Adiciona a primeira página
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Adiciona páginas subsequentes
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight; // Calcula a posição da próxima imagem
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save(`nota_fiscal_${sale.id}.pdf`);
        buttonParent.appendChild(button);
      })
      .catch((err) => {
        console.error("Erro na geração do PDF:", err);
        buttonParent.appendChild(button);
      });
  };

  return (
    <section className="tax-note" ref={invoiceRef}>
      <div className="layout-invoice">
        <article className="invoice-head">
          <h2>SENA AUTO PECAS</h2>
          <p>CNPJ: 23699781000150</p>
          <p>RUA AMADOR RODRIGUES, 916 - VILA PERES</p>
          <p>PACAEMBU - SP</p>
          <p>Fone: 1838627100</p>
        </article>
        <article className="invoice-header">
          <p>Cliente: {clientName || "Carregando..."}</p>
          <p className="data-invoice">
            Data de Faturamento:{" "}
            {new Date(sale.data_faturamento).toLocaleDateString()}
          </p>
          <p>Forma de Pagamento: {sale.forma_pagamento}</p>
          <p>Status: {sale.status}</p>
        </article>

        <div className="invoice-products">
          <h3>Produtos</h3>
          <table>
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Qtd</th>
                <th>Valor Uni</th>
              </tr>
            </thead>
            <tbody>
              {sale.produtos.map((product, index) => (
                <tr
                  key={product.id}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{product.descricao}</td>
                  <td>{product.quantidade}</td>
                  <td>R$ {product.preco_unitario.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <article className="invoice-footer">
          <p>
            <strong>Valor Total: R$ {sale.valor_total.toFixed(2)}</strong>
          </p>
          <button onClick={generatePDF}>Download PDF</button>
        </article>
        <article className="thanks">
          <p>OBRIGADO PELA PREFERÊNCIA!</p>
          <p>VOLTE SEMPRE!</p>
          <p>*** SEM VALOR FISCAL ***</p>
        </article>
      </div>
    </section>
  );
}