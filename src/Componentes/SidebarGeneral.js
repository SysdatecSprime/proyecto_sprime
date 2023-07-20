import React, { useState } from "react";
import "./Styles/StyleCopia.css";
import { Link } from "react-router-dom";
import { Icon } from "@tremor/react";
import {
  FolderOpenIcon,
  ArrowRightIcon,
  ChartPieIcon,
  MailIcon,
  PresentationChartBarIcon,
  InboxInIcon,
} from "@heroicons/react/outline";
import { Outlet } from "react-router-dom";
// import BandejaView from "./BandejaView"; // Ruta relativa al archivo BandejaView

function SidebarGeneral(props) {
  const [show, setShow] = useState(false);

  return (
    <main className={show ? "sb-space-toggle" : null} style={{ zIndex: 100 }}>
      <header className={`sb-header ${show ? "sb-space-toggle" : null}`} />
      <aside className="sb-sidebar">
        <nav className={`sb-nav ${show ? "sb-show" : null}`}>
          <div className="sb-nav-list">
            {/*Boton de despliegue*/}
            <div className="sb-header-toggle" onClick={() => setShow(!show)}>
              <i className="fa-solid fa-bars" />
            </div>
            <div className="py-4 flex flex-col gap-4">
              <Link to="/Bandeja" className="">
                <Icon
                  className="ml-4"
                  size="sm"
                  variant="solid"
                  tooltip="Bandeja"
                  icon={InboxInIcon}
                  aria-label="Bandeja"
                />
              </Link>
              <Link to="/dashboard" className="">
                <Icon
                  className="ml-4"
                  size="sm"
                  variant="solid"
                  tooltip="Dashboard"
                  icon={ChartPieIcon}
                  aria-label="dashboard"
                />
              </Link>
              <Link to="/correosrepresados" className="">
                <Icon
                  className="ml-4"
                  size="sm"
                  variant="solid"
                  tooltip="Reportes"
                  icon={PresentationChartBarIcon}
                  aria-label="correos represados"
                />
              </Link>
            </div>
          </div>
          <Link to="" className="sb-nav-link">
            <Icon
              className=""
              size="sm"
              tooltip="Carpeta"
              icon={ArrowRightIcon}
              aria-label="hola"
            />
          </Link>
        </nav>
        <div className="" />
      </aside>
      {/* <div className="row sb-fond py-4"> */}
      <div>
        <Outlet />
      </div>
    </main>
  );
}

export default SidebarGeneral;
