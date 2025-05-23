import { MdOutlineReportProblem } from "react-icons/md";
import "./index.scss";
import DashboardChart from "../../components/chart";
import useDashboardData from "../../hooks/useDashboardData";
import { FaBrazilianRealSign } from "react-icons/fa6";

import Loading from "../../components/loading";

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="container-dashboard">
      <h2 className="title-default">Dashboard</h2>
      <div className="report">
        <h1 className="title-home"></h1>
        <div>
          <MdOutlineReportProblem className="icon" />
          <a href="">Reportar Problema</a>
        </div>
      </div>

      <article className="home-head">
        <div className="menu-registered-product menu-dash">
          <div className="left">
            <h2>{data.productsCount || 0}</h2>
          </div>
          <div className="right">
            <h3>Produtos Cadastrados</h3>
          </div>
        </div>
        <div className="menu-made-sale menu-dash">
          <div className="left">
            <h2>{data.salesCount || 0}</h2>
          </div>
          <div className="right">
            <h3>Vendas Realizadas</h3>
          </div>
        </div>
        <div className="menu-registered-customer menu-dash">
          <div className="left">
            <h2>{data.clientsCount || 0}</h2>
          </div>
          <div className="right">
            <h3>Clientes Cadastrados</h3>
          </div>
        </div>
        <div className="menu-earnings-month menu-dash">
          <div className="left">
            <h3>Ganhos do Mês</h3>
          </div>
          <div className="right">
            <FaBrazilianRealSign className="icon" />
            <p>{data.totalRevenue ? data.totalRevenue.toFixed(2) : "0.00"}</p>
          </div>
        </div>
      </article>

      <article className="home-main">
        <div className="graphic-sales">
          <DashboardChart />
        </div>
      </article>
    </section>
  );
}
