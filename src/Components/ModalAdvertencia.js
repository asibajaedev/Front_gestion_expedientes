import React from "react";
import Infoimg from "../static/img/info.png";
export default function ModalAdvertencia({texto}) {
  return (
    <div>
      <div id="myModalAdv" class="modal">
        <div class="modal-content">
          <img
            src={Infoimg}
            alt="Advertencia"
            className="info"
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
          <button type="button" className="btn closesA btn-modal">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
