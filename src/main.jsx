import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/index.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Dashboard from "./pages/dashboard/index.jsx";
import RegisterCustomer from "./pages/registerCustomer/index.jsx";
import MakeSale from "./pages/makeSale/index.jsx";
import RegisterProduct from "./pages/registerProduct/index.jsx";
import RegisteredCustomers from "./pages/registeredCustomers/index.jsx";
import RegisteredProducts from "./pages/registeredProducts/index.jsx";
import SalesMade from "./pages/salesMade/index.jsx";

import TaxNote from "./components/taxNote/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register-customer" element={<RegisterCustomer />} />
          <Route path="/make-sale" element={<MakeSale />} />
          <Route path="/register-product" element={<RegisterProduct />} />
          <Route
            path="/registered-customers"
            element={<RegisteredCustomers />}
          />
          <Route path="/registered-products" element={<RegisteredProducts />} />
          <Route path="/sales-made" element={<SalesMade />} />
        </Route>
        <Route path="/invoice/:id" element={<TaxNote />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
