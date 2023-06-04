import { BrowserRouter, Route, Routes } from "react-router-dom";
import SidebarGeneral from "./Componentes/SidebarGeneral";
import Pqrs from "./Componentes/dashboard/pqrs";
import CorreosRepresados from "./Componentes/Correos/CorreosRepresados";
import Login from "./Componentes/Registro/Login/Login";
import Sidebar from "./Componentes/Bandeja/Sidebar";
import Bandeja from "./Componentes/Bandeja/BandejaView";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Login />} />
          <Route path="/dashboard/*" element={<DashboardWithSidebar />} />
          <Route path="/Bandeja" exact={true} element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function DashboardWithSidebar() {
  return (
    <>
      <SidebarGeneral />
      <Routes>
        <Route path="/" element={<Pqrs />} />
        <Route path="pqrs" element={<Pqrs />} />
        <Route path="correos-represados" element={<CorreosRepresados />} />
      </Routes>
    </>
  );
}

export default App;
