import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Componentes/Sidebar";
import Pqrs from "./Componentes/dashboard/pqrs";
import CorreosRepresados from "./Componentes/Correos/CorreosRepresados";
import Login from "./Componentes/Registro/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Login />} />
          <Route path="/dashboard/*" element={<DashboardWithSidebar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function DashboardWithSidebar() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Pqrs />} />
        <Route path="pqrs" element={<Pqrs />} />
        <Route path="correos-represados" element={<CorreosRepresados />} />
      </Routes>
    </>
  );
}

export default App;
