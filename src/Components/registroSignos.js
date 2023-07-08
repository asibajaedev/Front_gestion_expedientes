import React from "react";
export default function registroSignos({ data, handleCellClick }) {
  data.map((item) => {
    console.log(item.idsignos);
  });

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">SignoID</th>
                <th scope="col">Cédula</th>
                <th scope="col">Fecha</th>
                <th scope="col">Fecha Modificación</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr id={item.idsignos} key={item.idsignos} onClick={handleCellClick}>
                  <th scope="row">{item.idsignos}</th>
                  <td>{item.persona_cedula}</td>
                  <td>{item.fecha_creado}</td>
                  <td>{item.fecha_modificado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
