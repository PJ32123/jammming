import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton/LoginButton";
import Callback from "./pages/Callback";
import Home from "./Home";

function App() {
  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token" || "")
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <LoginButton />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
