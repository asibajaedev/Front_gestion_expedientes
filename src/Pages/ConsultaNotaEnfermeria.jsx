import Navbar from "../Components/navbar";
import Separador from "../Components/separador";
import Footer from "../Components/footer";
import { useEffect, useState } from "react";
import "./consultanota.css";
import { Link } from "react-router-dom";

export default function ConsultaNotaEnfermeria() {
  const cedula = localStorage.getItem("cedulaConsulta");
  const idnotas = localStorage.getItem("idnotaConsulta");
  const cedulaEncargadoConsulta = localStorage.getItem(
    "cedulaEncargadoConsulta"
  );
  const [nota, setNota] = useState({});

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    try {
      const response1 = fetch(
        `http://localhost:3001/nota/consultar/${cedula}/${idnotas}`
      );
      const response2 = fetch(
        `http://localhost:3001/persona/consultar/${cedula}`
      );
      const response3 = fetch(
        `http://localhost:3001/persona/consultar/${cedulaEncargadoConsulta}`
      );

      const [dataResponse1, dataResponse2, dataResponse3] = await Promise.all([
        response1,
        response2,
        response3,
      ]);

      const jsonData1 = await dataResponse1.json();
      const jsonData2 = await dataResponse2.json();
      const jsonData3 = await dataResponse3.json();

      const newNota = {
        paciente:
          jsonData2["0"][0].nombre + " " + jsonData2["0"][0].primer_apellido,
        fecha: jsonData1["0"][0].fecha_creado,
        turno: jsonData1["0"][0].turno,
        encargado:
          jsonData3["0"][0].nombre + " " + jsonData3["0"][0].primer_apellido,
        nota: jsonData1["0"][0].nota,
      };

      console.log(jsonData1['0']);
      console.log(jsonData2['0']);
      console.log(jsonData3['0']);
      setNota(newNota);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="consulta-notas">
      <Navbar />
      <Separador />
      <div className="container main-body">
        <div className="row">
          <div className="container body">
            <h1 className="text-center">Consultar nota de enfermeria</h1>
            <div className="info">
              <div className="info-izquierda">
                <div className="espacio-info">
                  {nota.paciente}
                  <div className="decorador"></div>
                  <p>Paciente</p>
                </div>
                <div className="espacio-info">
                  {nota.fecha}
                  <div className="decorador"></div>
                  <p>Fecha</p>
                </div>
                <div className="espacio-info">
                  {nota.turno}
                  <div className="decorador"></div>
                  <p>Turno</p>
                </div>
                <div className="espacio-info">
                  {nota.encargado}
                  <div className="decorador"></div>
                  <p>Encargado</p>
                </div>
              </div>
              <div className="info-derecha">
                <div className="espacio-info">
                  <p>Descripcion</p>
                  <div className="area-descripcion">
                    <p>{nota.nota}</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/nota">
              <button className="btn btn-primary">Volver</button>
            </Link>
          </div>
        </div>
      </div>
      <Separador />
      <Footer />
    </div>
  );
}
