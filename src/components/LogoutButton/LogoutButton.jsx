import React from "react";

const LogoutButton = () => {
  const handleLogout = () => {
    // Clear the access token from local storage
    localStorage.removeItem("access_token");
    // Optionally redirect to home or login page
    window.location.href = "/";
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
