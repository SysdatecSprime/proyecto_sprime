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
          <Route path="/Login" exact={true} element={<Login />} />
          <Route path="/" exact={true} element={<Sidebar />}>
            <Route path="dashboard" element={<Pqrs />} />
            <Route path="correos-represados" element={<CorreosRepresados />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
