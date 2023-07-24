import React from "react";
import Navbar from "../Components/navbar";
import Separador from "../Components/separador";
import Footer from "../Components/footer";
import "./Home.css";
import PacienteImg from "../static/img/paciente.png";
import NotaImg from "../static/img/notas.png";
import SignosImg from "../static/img/signos.png";
import { Link } from "react-router-dom";

//import { Route } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Separador />
      <div className="container-fluid main-body-home">
        <div className="row myrow">
          <div className="col-4 mycol ">
            <div className="container cont-img">
              <Link to="/pacientes">
                <img src={PacienteImg} className=""></img>
              </Link>
            </div>
            <h1 className="header-title">Pacientes</h1>
          </div>
          <div className="col-4 mycol">
            <div className="container cont-img">
              <Link to="/nota">
                <img src={NotaImg} className=""></img>
              </Link>
            </div>
            <h1 className="header-title">
              Notas de <br />
              Enfermería
            </h1>
          </div>
          <div className="col-4 mycol">
            <div className="container cont-img">
              <Link to="/signosvitales">
                <img src={SignosImg} className=""></img>
              </Link>
            </div>
            <h1 className="header-title">Signos Vitales</h1>
          </div>
        </div>
      </div>
      <Separador />
      <Footer />
    </div>
  );
}
