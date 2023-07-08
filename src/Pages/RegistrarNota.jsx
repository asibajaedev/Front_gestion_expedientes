import Navbar from "../Components/navbar";
import Separador from "../Components/separador";
import Footer from "../Components/footer";
import { useEffect, useState } from "react";
import "./registrarnotas.css";
import { Link } from "react-router-dom";

export default function RegistrarNota() {
  const [formData, setFormData] = useState({
    paciente_persona_cedula: "",
    encargado_id_encargado: "",
    turno: "",
    nota: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:3001/nota/insertar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // La solicitud fue exitosa
        setFormData(
          {paciente_persona_cedula: "",
          encargado_id_encargado: "",
          turno: "",
          nota: ""});
      } else {
        // Maybe ventana modal
        console.error("Error al enviar datos");
      }
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
            <h1 className="text-center">Registrar nota de enfermeria</h1>
            <form className="info" onSubmit={handleSubmit}>
              <div className="info-izquierda">
                <div className="espacio-info">
                  <input
                    type="text"
                    name="paciente_persona_cedula"
                    value={formData.paciente_persona_cedula}
                    className="input-texto"
                    onChange={handleChange}
                  />
                  <div className="decorador"></div>
                  <p>Paciente</p>
                </div>                
                <div className="espacio-info">
                  <input
                    type="text"
                    name="turno"
                    value={formData.turno}
                    className="input-texto"
                    onChange={handleChange}
                  />
                  <div className="decorador"></div>
                  <p>Turno</p>
                </div>
                <div className="espacio-info">
                  <input
                    type="text"
                    name="encargado_id_encargado"
                    value={formData.encargado_id_encargado}
                    className="input-texto"
                    onChange={handleChange}
                  />
                  <div className="decorador"></div>
                  <p>Encargado</p>
                </div>
              </div>
              <div className="info-derecha">
                <div className="espacio-info">
                  <p>Descripcion</p>
                  <div className="area-descripcion">
                    <textarea
                      name="nota"
                      className="descripcion"
                      value={formData.nota}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
              <Link to="/nota">
                <button className="btn btn-primary volver">Volver</button>
              </Link>
              <button className="btn btn-primary enviar-form" type="submit">
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
      <Separador />
      <Footer />
    </div>
  );
}
