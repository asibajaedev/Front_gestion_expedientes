import React, { useEffect, useState } from "react";
import "./notasenfermeria.css";
import Navbar from "../Components/navbar";
import Separador from "../Components/separador";
import Footer from "../Components/footer";
import RegistroNotas from "../Components/registroNotas";
import { Link } from "react-router-dom";

export default function Signosvitales() {
  const [notas, setNotas] = useState([]);
  const [cedula, setCedula] = useState("");

  const actualizarCedula = (e) => {
    setCedula(e.target.value);
  };

  const consultarNotas = () => {
    fetchNotas();
  };

  const eliminarNota = async () => {
    const cedula = localStorage.getItem("cedulaConsulta");
    const idnotas = localStorage.getItem("idnotaConsulta");
    try {
      const response = await fetch(`http://localhost:3001/nota/${cedula}/${idnotas}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // La solicitud de eliminación fue exitosa
        console.log('Elemento eliminado correctamente');
      } else {
        // La solicitud de eliminación no fue exitosa
        console.error('Error al eliminar el elemento');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchNotas = async () => {
    try {
      const response1 = fetch(`http://localhost:3001/nota/listar/${cedula}`);
      const response2 = fetch(
        `http://localhost:3001/persona/consultar/${cedula}`
      );

      const [dataResponse1, dataResponse2] = await Promise.all([
        response1,
        response2,
      ]);

      const jsonData1 = await dataResponse1.json();
      const jsonData2 = await dataResponse2.json();

      console.log(jsonData2['0']);
      const newNotas = jsonData1['0'].map((item) => {
        const {paciente_persona_cedula,idnotas, fecha_creado,encargado_persona_cedula} = item;
        const { nombre, primer_apellido, segundo_apellido } = jsonData2['0'][0];

        return {
          idnotas,
          paciente_persona_cedula,
          nombre, 
          primer_apellido,
          segundo_apellido,
          fecha_creado,
          encargado_persona_cedula
        };

      });

      setNotas(newNotas);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="gestion-de-notas">
      <Navbar />
      <Separador />
      <div className="container main-body">
        <div className="row">
          <div className="col-3">
            <div className="container menu-izquierdo d-flex flex-column align-items-center">
              <h1 className="text-center">Notas de enfermeria</h1>
              <Link to="/nota/registrar">
                <button className="btn btn-primary">Registrar</button>
              </Link>
              <Link to="/nota/consultar">
                <button className="btn btn-primary">Consultar</button>
              </Link>
              <button className="btn btn-primary">Modificar</button>
              <button className="btn btn-primary">Eliminar</button>
            </div>
          </div>
          <div className="col-9 lista-registros">
            <div className="container busqueda">
              <input
                type="text"
                className="form-control cedula-busqueda"
                placeholder="Número de cédula"
                onChange={actualizarCedula}
              />
              <button
                className="btn btn-primary btn-buscar"
                onClick={consultarNotas}
              >
                <i class="bi bi-search"></i>
              </button>
            </div>
            <div className="results">
              <RegistroNotas data={notas} />
            </div>
          </div>
        </div>
      </div>
      <Separador />
      <Footer />
    </div>
  );
}
