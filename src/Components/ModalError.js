import React from "react";
import errorImg from "../static/img/error.png";

export default function ModalError({ texto }) {
  return (
    <div>
      <div id="myModal" class="modal">
        <div class="modal-content">
          <img
            src={errorImg}
            alt="error"
            className="error-img"
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
          <button type="button" className="btn closes btn-modal">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
