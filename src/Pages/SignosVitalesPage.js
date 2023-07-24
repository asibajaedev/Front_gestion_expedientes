import React from "react";
import "./signosvitales.css";
import Navbar from "../Components/navbar";
import Separador from "../Components/separador";
import Footer from "../Components/footer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ModalError from "../Components/ModalError";
import ModalAdvertencia from "../Components/ModalAdvertencia";
import RegistroSignos from "../Components/registroSignos";


export default function Signosvitales() {
  const [cedula, setCedula] = useState("");
  const [signos, setSignos] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [modalTextError, setModalTextError] = useState("");
    useEffect(() => {
      fetch("http://localhost:3001/signos/listar/0")
        .then((res) => res.json())
        .then((data) => {
          setSignos(data[0]);
          console.log(data[0]);
        });
    }, []);

  return (
    <div className="gestion-de-signos">
      <Navbar />
      <Separador />
      <div className="container main-body">
        <div className="row">
          <div className="col-3">
            <div className="container lside-menu">
              <div className="title-menu">
                <div className="header-menu">
                  <h1 className="header-title">Signos vitales</h1>
                </div>
                <div className="mybtn-group">
                  <Link
                    to={{
                      pathname: "/signosvitales/registrar",
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <button
                      type="button"
                      class="btn btn-primary btn-lg btn-block"
                    >
                      Registrar
                    </button>
                  </Link>
                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                    onClick={handleConsultarClick}
                  >
                    Consultar
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                    onClick={handleModificarClick}
                  >
                    Modificar
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                    onClick={handleEliminarClick}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9 rside-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="input-section">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cédula del paciente"
                  value={cedula}
                  onChange={handleCedulaChange}
                  onKeyDown={pressEnter}
                />
                <button
                  type="button"
                  class="btn btn-primary btn-lg btn-block "
                  onClick={validateCedula}
                >
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </form>
            <div className="results">
              <RegistroSignos data={signos} handleCellClick={handleCellClick} />
            </div>
          </div>
        </div>
      </div>
      <Separador />
      <ModalError texto={modalTextError} />
      <ModalAdvertencia texto={modalTextError} />
    </div>
  );

  async function fetchData(cedula) {
    let url = "http://127.0.0.1:3001/signos/consultar/" + cedula;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSignos(data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  function handleCedulaChange(event) {
    setCedula(event.target.value);
    localStorage.setItem("cedula", event.target.value);
  }

  function validateCedula() {
    //Validate format "123456789"
    const regex = /^\d{9}$/;
    const isValid = regex.test(cedula);
    if (isValid) {
      try {
        fetchData(cedula);
      } catch (error) {
        console.log(error);
      }
      console.log("");
      return true;
    } else {
      setModalTextError("La cédula ingresada no es válida");
      let modal = document.getElementById("myModal");
      modal.style.display = "block";
      const span = document.getElementsByClassName("closes")[0];
      span.onclick = function () {
        modal.style.display = "none";
      };
      return false;
    }
  }

  function pressEnter(event) {
    if (event.key === "Enter") {
      validateCedula();
    }
  }
  function handleCellClick(e) {
    let currentRow = e.target.parentNode.firstChild.innerHTML;
    setCedula(e.target.innerHTML)
    setSelectedCell(currentRow);
    localStorage.setItem("idSignos", currentRow);
    try {
      var row = document.getElementById(currentRow);
      var pastRow = document.getElementById(selectedCell);
      var tdcellspast = pastRow.getElementsByTagName("td");
      var thcellspast = pastRow.getElementsByTagName("th");
      var tdcells = row.getElementsByTagName("td");
      var thcells = row.getElementsByTagName("th");
    } catch (error) {
      console.log(error);
    }
    console.log("selectedCell", selectedCell);
    if (selectedCell === null || selectedCell === undefined) {
      try {
        thcells[0].style.backgroundColor = "lightblue";
        for (let i = 0; i < tdcells.length; i++) {
          tdcells[i].style.backgroundColor = "lightblue";
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        thcellspast[0].style.backgroundColor = "white";
        thcells[0].style.backgroundColor = "lightblue";
        for (let i = 0; i < tdcells.length; i++) {
          tdcellspast[i].style.backgroundColor = "white";
          tdcells[i].style.backgroundColor = "lightblue";
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleModificarClick(e) {
    //Primero se valida que se haya seleccionado una fila
    if (selectedCell === null) {
      setModalTextError("No se ha seleccionado un registro");
      let modalA = document.getElementById("myModalAdv");
      modalA.style.display = "block";
      const span = document.getElementsByClassName("closesA")[0];
      span.onclick = function () {
        modalA.style.display = "none";
      };
    } else {
      window.location.href = "/?#/signosvitales/modificar";
    }
  }

  function handleConsultarClick(e) {
    //Primero se valida que se haya seleccionado una fila
    if (selectedCell === null) {
      setModalTextError("No se ha seleccionado un registro");
      let modalA = document.getElementById("myModalAdv");
      modalA.style.display = "block";
      const span = document.getElementsByClassName("closesA")[0];
      span.onclick = function () {
        modalA.style.display = "none";
      };
    } else {
      window.location.href = "/?#/signosvitales/consultar";
    }
  }

  async function deleteData(cedula, idSignos) {
    let url =
      "http://127.0.0.1:3001/signos/eliminar/" + cedula + "/" + idSignos;
    try {
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
    fetchData(cedula);
  }

  function handleEliminarClick(e) {
    //Primero se valida que se haya seleccionado una fila
    if (selectedCell === null) {
      setModalTextError("No se ha seleccionado un registro");
      let modalA = document.getElementById("myModalAdv");
      modalA.style.display = "block";
      const span = document.getElementsByClassName("closesA")[0];
      span.onclick = function () {
        modalA.style.display = "none";
      };
    } else {
      deleteData(cedula, selectedCell);
      fetchData(cedula);
    }
  }
}
