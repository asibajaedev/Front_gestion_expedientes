import React from "react";
//import './signosvitales.css';
import Navbar from "../navbar";
import Separador from "../separador";
import Footer from "../footer";
import { useState, useEffect } from "react";
import ModalError from "../ModalError";
import "./RegistrarSignos.css";
import { Link } from "react-router-dom";
export default function ModificarSignos() {
  const [signos, setSignos] = useState([]);
  const [modalTextError, setModalTextError] = useState("");
  let idSignos = localStorage.getItem("idSignos");
  let cedula = localStorage.getItem("cedula");

  //Get data from API with useEffect
  useEffect(() => {
    fetch("http://localhost:3001/signos/consultar/" + cedula + "/" + idSignos)
      .then((res) => res.json())
      .then((data) => {
        setSignos(data[0][0]);
        fillForm(data[0][0]);
        console.log(data[0][0]);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Separador />
      <div className="container main-body-signos">
        <div className="header-signos">
          <h1>Modificar signos vitales</h1>
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
                    Modificar
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
    </div>
  );
  function takeFormData() {
    let cedula = document.getElementById("scedula").value;
    let fecha = document.getElementById("sfecha").value;
    let frecuencia_cardiaca = document.getElementById(
      "sfrecuencia_cardiaca"
    ).value;
    let glucemia = document.getElementById("sglucemia").value;
    let cedula_encargado = document.getElementById("scedula_encargado").value;
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
      frecuencia_respirtaria: frecuencia_respirtaria,
      frecuencia_cardiaca: frecuencia_cardiaca,
      presion_arterial: presion_arterial,
      saturacion_oxigeno: saturacion_oxigeno,
      glucemia: glucemia,
      respondable: respondable,
      turno: turno,
      fecha_creado: fecha,
      cedula_encargado: cedula_encargado,
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

    if (validateCedula(data.persona_cedula)) {
      if (validateCedula(data.cedula_encargado)) {
        return true;
      }
    } else {
      setModalTextError("Cédula incorrecta");
      return false;
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
      console.log("");
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
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  function fillForm(data) {
    console.log("temperatura", data.temperatura);
    console.log("data", data);
    let temperatura = data.temperatura;
    let frecuencia_respiratoria = data.frecuencia_respiratoria;
    let frecuencia_cardiaca = data.frecuencia_cardiaca;
    let presion_arterial = data.presion_arterial;
    let saturacion_oxigeno = data.saturacion_o;
    let glucemia = data.glic;
    let respondable = data.respons;
    let turno = data.turno;
    let fecha_creado = data.fecha_creado;
    let cedula = data.persona_cedula;
    
    
    try {
      document.getElementById("scedula").value = cedula;
      document.getElementById("sfecha").value = fecha_creado;
      document.getElementById("sfrecuencia_cardiaca").value = frecuencia_cardiaca
      document.getElementById("sglucemia").value = glucemia;
      document.getElementById("stemperatura").value = temperatura;
      document.getElementById("spresion_arterial").value = presion_arterial;
      document.getElementById("srespondable").value = respondable;
      document.getElementById("sturno").value = turno;
      document.getElementById("sfrecuencia_respirtaria").value = frecuencia_respiratoria
      document.getElementById("saturacion_oxigeno").value = saturacion_oxigeno;
      return true;
    } catch (error) {
      console.log("error", error);
      return false;
    }
  }
}
