import React from "react";
import PkceFlow from "../../utils/Pkce";
import "./LoginButton.css";
// Client ID and redirect URI for Spotify OAuth
const clientId = "6f266cd3efd84e0396843a602bc0fb86";
const redirectUri = "http://127.0.0.1:5173/callback";

// Component for the login button
function LoginButton() {
  const handleLogin = async () => {
    try {
      const { codeVerifier, codeChallenge } = await PkceFlow();
      sessionStorage.setItem("codeVerifier", codeVerifier);
      // This scope allows the app to modify private and public playlists and read user profile information
      const scope =
        "playlist-modify-private playlist-modify-public user-read-private";
      const authUrl = new URL("https://accounts.spotify.com/authorize");
      const params = {
        response_type: "code",
        client_id: clientId,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="login-container">
      <h1>Welcome To My First App! Please</h1>
      <button className="login-button" onClick={handleLogin}>
        Login with Spotify
      </button>
      <footer>By PS</footer>
    </div>
  );
}

export default LoginButton;
