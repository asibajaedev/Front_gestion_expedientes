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
  const [formData, setFormData] = useState({
    persona_cedula: "",
    temperatura: "",
    frecuencia_respiratoria: "",
    frecuencia_cardiaca: "",
    presion_arterial: "",
    saturacion_o: "",
    glic: "",
    respons: "",
    turno: "",
  });
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
                  {/*******************************************************/}
                  <input
                    type="text"
                    className="form-control"
                    id="scedula"
                    placeholder=""
                    tabIndex={1}
                    onChange={handleChange}
                    name="persona_cedula"
                    value={formData.persona_cedula}
                  />
                  <label for="scedula">Cédula del paciente</label>
                  {/*******************************************************/}
                  <input
                    type="text"
                    className="form-control"
                    id="sfrecuencia_cardiaca"
                    placeholder=""
                    tabIndex={4}
                    onChange={handleChange}
                    name="frecuencia_cardiaca"
                    value={formData.frecuencia_cardiaca}
                  />
                  <label for="sfrecuencia_cardiaca">Frecuencia cardiaca</label>
                  {/*******************************************************/}

                  <input
                    type="text"
                    className="form-control"
                    id="sglucemia"
                    placeholder=""
                    tabIndex={7}
                    onChange={handleChange}
                    name="glic"
                    value={formData.glic}
                  />
                  <label for="sglucemia">Glucemia</label>
                  {/*******************************************************/}
                </div>
                <div className="col-4 column1">
                  <input
                    type="text"
                    className="form-control"
                    id="stemperatura"
                    placeholder=""
                    tabIndex={2}
                    onChange={handleChange}
                    name="temperatura"
                    value={formData.temperatura}
                  />
                  <label for="stemperatura">Temperatura</label>
                  {/*******************************************************/}

                  <input
                    type="text"
                    className="form-control"
                    id="spresion_arterial"
                    placeholder=""
                    tabIndex={5}
                    onChange={handleChange}
                    name="presion_arterial"
                    value={formData.presion_arterial}
                  />
                  <label for="spresion_arterial">Presión arterial</label>
                  {/*******************************************************/}

                  <input
                    type="text"
                    className="form-control"
                    id="srespondable"
                    placeholder=""
                    tabIndex={8}
                    onChange={handleChange}
                    name="respons"
                    value={formData.respons}
                  />
                  <label for="srespondable">Responsable</label>
                  {/*******************************************************/}

                  <input
                    type="text"
                    className="form-control"
                    id="sturno"
                    placeholder=""
                    tabIndex={9}
                    onChange={handleChange}
                    name="turno"
                    value={formData.turno}
                  />
                  <label for="sturno">Turno</label>
                  {/*******************************************************/}
                </div>
                <div className="col-4 column1">
                  <input
                    type="text"
                    className="form-control"
                    id="sfrecuencia_respirtaria"
                    placeholder=""
                    tabIndex={3}
                    onChange={handleChange}
                    name="frecuencia_respiratoria"
                    value={formData.frecuencia_respiratoria}
                  />
                  <label for="sfrecuencia_respirtaria">
                    Frecuencia Respiratoria
                  </label>
                  {/*******************************************************/}

                  <input
                    type="text"
                    className="form-control"
                    id="saturacion_oxigeno"
                    placeholder=""
                    tabIndex={6}
                    onChange={handleChange}
                    name="saturacion_o"
                    value={formData.saturacion_o}
                  />
                  <label for="saturacion_oxigeno">Saturación de oxígeno</label>
                  {/*******************************************************/}
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
      <ModalExito texto={modalTextError} />
    </div>
  );

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

  async function sendData(event) {
    event.preventDefault();
    console.log("whhat")
    const data = formData;
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

        if (results.serverStatus === 2) {
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

  function cleanForm() {
    setFormData({
      persona_cedula: "",
      temperatura: "",
      frecuencia_respiratoria: "",
      frecuencia_cardiaca: "",
      presion_arterial: "",
      saturacion_o: "",
      glic: "",
      respons: "",
      turno: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
}
