import { useState } from "react";
import "./registroNotas.css";

export default function RegistroNotas({ data }) {

  const [notaSelec, setNotaSelec] = useState("");

  const selecNota = nota => {
    setNotaSelec(nota);
    localStorage.setItem('cedulaConsulta', nota.paciente_persona_cedula);
    localStorage.setItem('idnotaConsulta', nota.idnotas);
    localStorage.setItem('cedulaEncargadoConsulta', nota.encargado_persona_cedula);
  }
  
  return (
    <div>
      <div className="table-responsive">
        <table className="table table-hover tabla">
          <thead>
            <tr>
              <th scope="col">Cédula</th>
              <th scope="col">Nombre</th>
              <th scope="col">Primer Apellido</th>
              <th scope="col">Segundo Apellido</th>
              <th scope="col">Fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.idnotas} className={notaSelec.idnotas === item.idnotas ? "table-active" : ""} onClick={() =>  selecNota(item)}>
                <td>{item.paciente_persona_cedula}</td>
                <td>{item.nombre}</td>
                <td>{item.primer_apellido}</td>
                <td>{item.segundo_apellido}</td>
                <td>{item.fecha_creado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}