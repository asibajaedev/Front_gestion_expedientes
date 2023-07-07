import React from "react";
import "./signosvitales.css";
import Navbar from "../Components/navbar";
import Separador from "../Components/separador";
import Footer from "../Components/footer";

export default function Signosvitales() {
  return (
    <div className="gestion-de-signos">
      <Navbar />
      <Separador />
      <div className="container main-body">
        <div className="row">
          <div className="col-3">
            <div className="container">
              <h1 className="text-start ">menu de navegación izquierdo</h1>
            </div>
          </div>
          <div className="col-9 test ">
            <h1 className="text-end">menú navegación derecho</h1>
          </div>
        </div>
      </div>
      <Separador />
      <Footer />
    </div>
  );
}
