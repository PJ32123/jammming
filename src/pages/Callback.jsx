import React, { useEffect } from "react";
// client Id and redirect URI for Spotify OAuth
const clientId = "6f266cd3efd84e0396843a602bc0fb86";
const redirectUri = "http://127.0.0.1:5173/callback";

const Callback = (props) => {
  // Effect that will run when the component mounts and will run getToken if "code" is in URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      getToken(code);
    } else {
      console.error("No code found in URL parameters.");
    }
  }, []);

  // fetches the access token from Spotify using codeVerifier and code and stores it in local storage
  const getToken = async (code) => {
    const codeVerifier = sessionStorage.getItem("codeVerifier");
    const url = "https://accounts.spotify.com/api/token";
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    };

    try {
      const body = await fetch(url, payload);
      const response = await body.json();
      // Stores the access token and token expiration in local storage
      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        // Set the token expiration
        localStorage.setItem(
          "token_expiration",
          Date.now() + response.expires_in * 1000
        );
        // Set the session expired state to false
        props.setSessionExpired(false);
        // Redirect to home page
        window.location.href = "/";
      } else {
        console.error("Failed to get access token:", response);
      }
    } catch (err) {
      console.error("Error fetching access token:", err);
    }
  };

  // Render a simple message while logging in
  // This is returned while the access token is being fetched
  return <div>Logging in...</div>;
};

export default Callback;
