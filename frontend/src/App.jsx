import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Registro from "./pages/registro";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Landing />}  />
        <Route path="/login"    element={<Login />}    />
        <Route path="/registro" element={<Registro />} />
        {/* Aquí irán las rutas de las demás pantallas */}
      </Routes>
    </BrowserRouter>
  );
}