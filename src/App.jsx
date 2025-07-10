import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginButton from "./components/LoginButton/LoginButton";
import Callback from "./pages/Callback";
import Home from "./Home";

function App() {
  // State to manage authentication token, set to empty string if not available
  const [token, setToken] = useState(
    () => localStorage.getItem("access_token") || ""
  );
  // State to manage expiration time of the token, set to null if not available
  const [expirationTime, setExpirationTime] = useState(() => {
    const stored = localStorage.getItem("token_expiration");
    return stored ? parseInt(stored, 10) : null;
  });
  // State to manage session expiration, set to false initially
  const [sessionExpired, setSessionExpired] = useState(false);

  // Effect to update token and expiration time when time expires
  useEffect(() => {
    if (!token || !expirationTime) return;

    const timeout = expirationTime - Date.now();

    if (timeout <= 0) {
      // Already expired
      setToken("");
      setExpirationTime(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("expiration_time");
      setSessionExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setToken("");
      setExpirationTime(null);
      localStorage.removeItem("access_token");
      localStorage.removeItem("expiration_time");
      setSessionExpired(true);
    }, timeout);

    return () => clearTimeout(timer);
  }, [token, expirationTime]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            sessionExpired ? (
              <div>
                <p>Your session has expired. Please log in again.</p>
                <LoginButton />
              </div>
            ) : token ? (
              <Home />
            ) : (
              <LoginButton />
            )
          }
        />
        <Route
          path="/callback"
          element={<Callback setSessionExpired={setSessionExpired} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
