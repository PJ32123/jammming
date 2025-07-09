import React from "react";
import LogoutButton from "./components/LogoutButton/LogoutButton";

// Home component
function Home() {
  return (
    <div>
      <h1>Welcome to Jammming</h1>
      <p>Your music app is ready to rock!</p>
      <LogoutButton />
    </div>
  );
}

// Export the Home component
export default Home;
