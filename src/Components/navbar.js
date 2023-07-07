import React from "react";
import logo from "../static/img/logo.png";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container main-nav">
      <div className="row">
        <div className="col-6 text-start">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        </div>
        <div className="col-6 text-end rigth-sec ">
          <a class="" href="/">
            <i class="bi bi-question-circle-fill"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
