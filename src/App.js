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
          <Route path="/dashboard" exact={true} element={<Sidebar />}>
            <Route path="pqrs" element={<Pqrs />} />
            <Route path="correos-represados" element={<CorreosRepresados />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
