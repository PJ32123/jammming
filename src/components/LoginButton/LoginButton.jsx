import React from "react";
import PkceFlow from "../../utils/Pkce";
// Client ID and redirect URI for Spotify OAuth
const clientId = "6f266cd3efd84e0396843a602bc0fb86";
const redirectUri = "http://127.0.0.1:5173/callback";

// Component for the login button
function LoginButton() {
  const handleLogin = async () => {
    try {
      const { codeVerifier, codeChallenge } = await PkceFlow();
      sessionStorage.setItem("codeVerifier", codeVerifier);
      const scope = "user-read-private user-read-email";
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
  return <button onClick={handleLogin}>Login with Spotify</button>;
}

export default LoginButton;
