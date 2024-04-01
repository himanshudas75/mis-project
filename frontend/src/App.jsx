import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import RegistrationFrom from "./components/RegistrationFrom";
import Home from "./components/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginForm from "./components/LoginForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mba_admission/home" element={<Home />} />
        <Route path="/mba_admission/register" element={<RegistrationFrom />} />
        <Route path="/mba_admission/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
