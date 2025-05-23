import "./styles/App.scss";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import Header from "./components/header";

export default function App() {
  //estado para controlar a visibilidade do menu bars
  const [btnMobile, setBtnMobile] = useState(false);

  // Função que alterna o estado do menu
  const toggleHeader = () => {
    setBtnMobile((prevState) => !prevState);
  };

  return (
    <>
      <section className="container-app">
        <article className={`app-left ${btnMobile ? "header-mobile" : ""}`}>
          <Header setBtnMobile={setBtnMobile} />
        </article>
        <article className="app-right">
          <Outlet />
        </article>
        <article className="container-mobile">
          <button onClick={toggleHeader}>
            {btnMobile ? <BsXLg /> : <FaBars />}
          </button>
        </article>
      </section>
    </>
  );
}
