import "./index.scss";

import { Link } from "react-router-dom";

//icons
import { FiUsers } from "react-icons/fi";
import { MdSettingsInputComposite } from "react-icons/md";

import { FaTachometerAlt, FaCog, FaWrench, FaFolder } from "react-icons/fa";

export default function Header({ setBtnMobile }) {
  return (
    <header className="container-header">
      <div className="sidebar-head">
        <h2>SB Admin</h2>
      </div>
      <ul className="sidebar-main">
        <p>Início</p>
        <li
          onClick={() => {
            setBtnMobile(false);
          }}
        >
          <Link to="/">
            <FaTachometerAlt className="icon" />
            Dashboard
          </Link>
        </li>
        <p>Cadastro</p>
        <li
          onClick={() => {
            setBtnMobile(false);
          }}
        >
          <Link to="/register-customer">
            <FaCog className="icon" />
            Cadastrar Cliente
          </Link>
        </li>
        <li
          onClick={() => {
            setBtnMobile(false);
          }}
        >
          <Link to="/register-product">
            <FaFolder className="icon" />
            Cadastrar Produto
          </Link>
        </li>
        <p>Cadastrados</p>
        <li
          onClick={() => {
            setBtnMobile(false);
          }}
        >
          <Link to="/registered-customers">
            <FiUsers className="icon" />
            Clientes Cadastrados
          </Link>
        </li>
        <li
          onClick={() => {
            setBtnMobile(false);
          }}
        >
          <Link to="/registered-products">
            <MdSettingsInputComposite className="icon" />
            Produtos Cadastrados
          </Link>
        </li>
        <p>Vendas</p>
        <li
          onClick={() => {
            setBtnMobile(false);
          }}
        >
          <Link to="/make-sale">
            <FaWrench className="icon" />
            Realizar Venda
          </Link>
        </li>
        <li
          onClick={() => {
            setBtnMobile(false);
          }}
        >
          <Link to="/sales-made">
            <MdSettingsInputComposite className="icon" />
            Vendas Realizadas
          </Link>
        </li>
      </ul>
    </header>
  );
}
