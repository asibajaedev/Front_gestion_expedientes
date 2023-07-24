import React from 'react';
import errorImg from "../static/img/exito.png";

export default function ModalExito({texto}) {
  return (
    <div>
      <div id="myModalEx" class="modal">
        <div class="modal-content">
          <img
            src={errorImg}
            alt="error"
            className="exito"
            style={{
              width: "100px",
              height: "100px",
              margin: "auto",
              display: "block",
            }}
          />
          <p
            className="text-center"
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
              fontStyle: "italic",
              paddingTop: "1rem",
            }}
          >
            {texto}
          </p>
          <button type="button" className="btn closesE btn-modal">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
