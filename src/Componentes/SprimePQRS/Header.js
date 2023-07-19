import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import sprimeLogo from "./images/LogoSprime.png";
import React, {useState} from "react";

function HeaderNav({handleZoomIn, handleZoomOut, handleReset}) {
  return (
    <>
      <header className="rect-nav d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 shadow-sm">
        <a
          href="/"
          className="d-flex align-items-center col-md-4 mb-3 mb-md-0 text-dark text-decoration-none"
        >
          <img src={sprimeLogo} width="100px" alt=""></img>
        </a>

        <ul className="rectangle nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          {/* <li>
            <a href="#" className="nav-link mx-1 link-dark">
              <FaIcons.FaFont />
            </a>
          </li> */}
          <li>
            <button
              onClick={handleZoomIn}
              className="nav-link mx-1 link-dark border-0 bg-transparent"
            >
              <FaIcons.FaSearchPlus />
            </button>
          </li>
          <li>
            <button
              onClick={handleZoomOut}
              className="nav-link mx-1 link-dark border-0 bg-transparent"
            >
              <FaIcons.FaSearchMinus />
            </button>
          </li>
          {/* <li>
            <a href="#" className="nav-link mx-1 link-dark">
              <BsIcons.BsFillBrightnessHighFill />
            </a>
          </li>
          <li>
            <a href="#" className="nav-link mx-1 link-dark">
              <FaIcons.FaLightbulb />
            </a>
          </li>
          <li>
            <a href="#" className="nav-link mx-1 link-dark">
              <FaIcons.FaEye />
            </a>
          </li> */}
          <li>
            <button
              onClick={handleReset}
              className="nav-link mx-1 link-dark border-0 bg-transparent"
            >
              <FaIcons.FaSyncAlt />
            </button>
          </li>
        </ul>
        <div className="col-md-3 text-end mx-5"></div>
      </header>
      <div className=""></div>
    </>
  );
}

export default HeaderNav;
