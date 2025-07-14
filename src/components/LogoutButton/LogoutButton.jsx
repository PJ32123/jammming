import React from "react";
import "./LogoutButton.css";

const LogoutButton = () => {
  const handleLogout = () => {
    // Clear the access token from local storage
    localStorage.removeItem("access_token");
    // Clear the token expiration from local storage
    localStorage.removeItem("token_expiration");
    // Redirect to home or login page
    window.location.href = "/";
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
