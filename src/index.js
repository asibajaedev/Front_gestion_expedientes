import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App";
import Home from "./Pages/Home";
import { createHashRouter, RouterProvider } from "react-router-dom";
import SignosVitalesPage from "./Pages/SignosVitalesPage";
import RegistrarSignos from "./Components/signosVitales/RegistrarSignos";
import ModificarSignos from "./Components/signosVitales/ModificarSignos";
import ConsultarSignos from "./Components/signosVitales/ConsultarSignos";
import ConsultaNotaEnfermeria from "./Pages/ConsultaNotaEnfermeria";
import NotasEnfermeriaPage from "./Pages/NotasEnfermeriaPage";
import RegistrarNota from "./Pages/RegistrarNota";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signosvitales",
    element: <SignosVitalesPage />,
  },
  {
    path: "/signosvitales/registrar",
    element: <RegistrarSignos />,
  },
  {
    path: "/signosvitales/modificar",
    element: <ModificarSignos />,
  },
  {
    path: "signosvitales/consultar",
    element: <ConsultarSignos />,
  },
  {
    path: "/nota",
    element: <NotasEnfermeriaPage />,
  },
  {
    path: "/nota/consultar",
    element: <ConsultaNotaEnfermeria />,
  },
  {
    path: "nota/registrar",
    element: <RegistrarNota />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
