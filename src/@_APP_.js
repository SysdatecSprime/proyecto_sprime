import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./Componentes/Sidebar";
import Pqrs from "./Componentes/dashboard/pqrs";
import CorreosRepresados from "./Componentes/Correos/CorreosRepresados";
import Login from "./Componentes/Registro/Login/Login";

function App() {
  const isAuthenticated = false; // Coloca aquí tu lógica para verificar si el usuario ha iniciado sesión

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Sidebar />} />
          {/* <Route path="/Login" element={<Login />} /> */}

          <Route path="/dashboard" exact={true} element={<Pqrs />}>
            <Route path="pqrs" element={<Pqrs />} />
            <Route path="correos-represados" element={<CorreosRepresados />} />
          </Route>

          {/* {isAuthenticated ? (
            <Route path="/" exact={true} element={<AuthenticatedRoutes />} />
          ) : (
            <Route path="/" element={<Navigate to="/Login" replace />} />
          )} */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

function AuthenticatedRoutes() {
  return (
    <>
      <Sidebar />
      <Route path="/dashboard" exact={true} element={<Pqrs />} />
      <Route path="/correos-represados" element={<CorreosRepresados />} />
      {/* Agrega más rutas aquí para otros formularios y modales */}
    </>
  );
}

export default App;
