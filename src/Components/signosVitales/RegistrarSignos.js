import React from "react";
//import './signosvitales.css';
import Navbar from "../navbar";
import Separador from "../separador";
import Footer from "../footer";
import { useState } from "react";
import ModalError from "../ModalError";
import ModalExito from "../ModalExito";
import "./RegistrarSignos.css";
import { Link } from "react-router-dom";
import { Modal } from "bootstrap";

export default function RegistrarSignos() {
  const [signos, setSignos] = useState([]);
  const [modalTextError, setModalTextError] = useState("");

  return (
    <div>
      <Navbar />
      <Separador />
      <div className="container main-body-signos">
        <div className="header-signos">
          <h1>Registrar signos vitales</h1>
        </div>
        <div className="container form-signos">
          <form>
            <div className="form-group form-signos-registrar">
              <div className="row sinput-body">
                <div className="col-4 column1">
                  <input
                    type="text"
                    className="form-control"
                    id="scedula"
                    placeholder=""
                  />
                  <label for="scedula">Cédula del paciente</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sfecha"
                    placeholder=""
                  />
                  <label for="sfecha">Fecha</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sfrecuencia_cardiaca"
                    placeholder=""
                  />
                  <label for="sfrecuencia_cardiaca">Frecuencia cardiaca</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sglucemia"
                    placeholder=""
                  />
                  <label for="sglucemia">Glucemia</label>
                </div>
                <div className="col-4 column1">
                  <input
                    type="text"
                    className="form-control"
                    id="stemperatura"
                    placeholder=""
                  />
                  <label for="stemperatura">Temperatura</label>
                  <input
                    type="text"
                    className="form-control"
                    id="spresion_arterial"
                    placeholder=""
                  />
                  <label for="spresion_arterial">Presión arterial</label>
                  <input
                    type="text"
                    className="form-control"
                    id="srespondable"
                    placeholder=""
                  />
                  <label for="srespondable">Responsable</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sturno"
                    placeholder=""
                  />
                  <label for="sturno">Turno</label>
                </div>
                <div className="col-4 column1">
                  <input
                    type="text"
                    className="form-control"
                    id="sfrecuencia_respirtaria"
                    placeholder=""
                  />
                  <label for="sfrecuencia_respirtaria">
                    Frecuencia Respiratoria
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="saturacion_oxigeno"
                    placeholder=""
                  />
                  <label for="saturacion_oxigeno">Saturación de oxígeno</label>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center">
                  <Link to="/signosvitales">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg btn-block"
                    >
                      Volver
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={sendData}
                  >
                    Registrar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Separador />
      <Footer />
      <ModalError texto={modalTextError} />
      <ModalExito texto={modalTextError}/>
    </div>
  );
  function takeFormData() {
    let cedula = document.getElementById("scedula").value;
    let fecha = document.getElementById("sfecha").value;
    let frecuencia_cardiaca = document.getElementById(
      "sfrecuencia_cardiaca"
    ).value;
    let glic = document.getElementById("sglucemia").value;
    let temperatura = document.getElementById("stemperatura").value;
    let presion_arterial = document.getElementById("spresion_arterial").value;
    let respondable = document.getElementById("srespondable").value;
    let turno = document.getElementById("sturno").value;
    let frecuencia_respirtaria = document.getElementById(
      "sfrecuencia_respirtaria"
    ).value;
    let saturacion_oxigeno =
      document.getElementById("saturacion_oxigeno").value;

    let data = {
      persona_cedula: cedula,
      temperatura: temperatura,
      frecuencia_respiratoria: frecuencia_respirtaria,
      frecuencia_cardiaca: frecuencia_cardiaca,
      presion_arterial: presion_arterial,
      saturacion_o: saturacion_oxigeno,
      glic: glic,
      respons: respondable,
      turno: turno,
      fecha_creado: fecha,
    };
    return data;
  }

  function validateData(data) {
    for (const [key, value] of Object.entries(data)) {
      if (value === "" || value === null || value === undefined) {
        setModalTextError("No se permiten campos vacios");
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
        const span = document.getElementsByClassName("closes")[0];
        span.onclick = function () {
          modal.style.display = "none";
        };
        return false;
      }
    }

    if (!validateCedula(data.persona_cedula)) {
      setModalTextError("Cédula incorrecta");
    } else if (!validarFormatoFecha(data.fecha_creado)) {
      setModalTextError("Fecha incorrecta");
    } else {
      return true;
    }
  }

  function validateCedula(mycedula) {
    //Validate format "123456789"
    const regex = /^\d{9}$/;
    const isValid = regex.test(mycedula);

    if (isValid) {
      try {
        return true;
      } catch (error) {
        console.log(error);
      }
      return true;
    } else {
      setModalTextError("Cédula incorrecta");
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
      const span = document.getElementsByClassName("closes")[0];
      span.onclick = function () {
        modal.style.display = "none";
      };
      return false;
    }
  }
  function validarFormatoFecha(date) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = regex.test(date);

    if (isValid) {
      return true;
    } else {
      setModalTextError("Formato de fecha incorrecto");
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
      const span = document.getElementsByClassName("closes")[0];
      span.onclick = function () {
        modal.style.display = "none";
      };
      return false;
    }
  }

  async function sendData() {
    const data = takeFormData();
    try {
      if (validateData(data)) {
        const response = await fetch("http://localhost:3001/signos/insertar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            mode: "no-cors",
          },
          body: JSON.stringify(data),
        });

        const results = await response.json();
        console.log("results", results);

        if(results.serverStatus === 2){
        setModalTextError("Signos vitales registrados correctamente");
        const modal = document.getElementById("myModalEx");
        modal.style.display = "block";
        const span = document.getElementsByClassName("closesE")[0];
        span.onclick = function () {
          modal.style.display = "none";
        };
        cleanForm();
      }
      }
    } catch (error) {
      console.log("error", error);
    }
  }
  function cleanForm(){
    document.getElementById("scedula").value = "";
    document.getElementById("sfecha").value = "";
    document.getElementById("sfrecuencia_cardiaca").value = "";
    document.getElementById("sglucemia").value = "";
    document.getElementById("stemperatura").value = "";
    document.getElementById("spresion_arterial").value = "";
    document.getElementById("srespondable").value = "";
    document.getElementById("sturno").value = "";
    document.getElementById("sfrecuencia_respirtaria").value = "";
    document.getElementById("saturacion_oxigeno").value = "";
  }
}
