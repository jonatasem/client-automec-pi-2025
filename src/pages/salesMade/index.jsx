import QRCode from "qrcode";
import { deleteSale } from "../../service/api";
import { useState } from "react";
import "./index.scss";
import Loading from "../../components/loading";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
import useClients from "../../hooks/useClients";
import useSales from "../../hooks/useSales";

export default function SalesMade() {
  const { sales, loading: loadingSales, refetchSales } = useSales(); // Adicionando refetchSales
  const { clients, loading: loadingClients } = useClients();
  const [expandedSaleId, setExpandedSaleId] = useState(null);
  const [deleteSaleMade, setDeleteSaleMade] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const downloadQRCode = async (sale) => {
    const saleInfoURL = `http://localhost:5173/invoice/${sale.id}`;
    const canvas = document.createElement("canvas");
    await QRCode.toCanvas(canvas, saleInfoURL, { errorCorrectionLevel: "H" });
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `recibo_venda_${sale.id}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const handleDeleteSale = async (saleId) => {
    if (window.confirm("Você tem certeza que deseja excluir esta venda?")) {
      await deleteSale(saleId);
      await refetchSales(); // Atualiza a lista de vendas após a exclusão

      setDeleteSaleMade("Venda deletada com sucesso!"); // Mensagem de venda deletada com sucesso
      setTimeout(() => {
        setDeleteSaleMade("");
      }, 1500);
    }
  };

  const sortedSales = Array.isArray(sales)
    ? sales.sort((a, b) => new Date(b.data_emissao) - new Date(a.data_emissao))
    : [];
    
  const isLoading = loadingSales || loadingClients;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="container-sales">
      <h2 className="title-default">Vendas Realizadas</h2>
      {deleteSaleMade && (
        <div className="success-message">{deleteSaleMade}</div>
      )}
      <article>
        <div className="item-sale">
          {sortedSales.length > 0 ? (
            sortedSales.map((sale, index) => {
              const client = clients.find(
                (client) => client.id === sale.clienteId,
              );
              const isExpanded = expandedSaleId === sale.id;

              return (
                <div key={sale.id} className="container-layout">
                  <div className="layout-left">
                    <div className="layout-left">
                      <h3>{index + 1} -</h3>
                      <p>{client ? client.nome : "Carregando..."}</p>
                    </div>
                    <button
                      className="btn-options"
                      onClick={() =>
                        setExpandedSaleId(isExpanded ? null : sale.id)
                      }
                    >
                      {isExpanded ? <BsCaretUp /> : <BsCaretDown />}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className={`layout-right expanded`}>
                      <ul>
                        <li>Data: {formatDate(sale.data_emissao)}</li>
                        <li>Status: {sale.status}</li>
                        <li>Valor Total: R$ {sale.valor_total.toFixed(2)}</li>
                      </ul>
                      <ul className="container-btn">
                        <li
                          className="btn-qr-code"
                          onClick={() => downloadQRCode(sale)}
                        >
                          <button>Qr Code</button>
                        </li>
                        <li
                          className="btn-delete"
                          onClick={() => handleDeleteSale(sale.id)}
                        >
                          <button>Excluir</button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="no-results">Nenhuma venda realizada.</p>
          )}
        </div>
      </article>
    </section>
  );
}

