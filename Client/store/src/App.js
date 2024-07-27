import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/store/login" element={<Login />} />
        <Route path="/store/register" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
