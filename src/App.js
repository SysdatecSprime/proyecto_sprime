import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Componentes/Sidebar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
