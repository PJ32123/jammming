import React, { useState } from "react";
import LogoutButton from "./components/LogoutButton/LogoutButton";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import "./Home.css";

// Home component
function Home() {
  // State to hold search results
  const [results, setResults] = useState([]);
  // State to track if a search has been performed
  const [searchPerformed, setSearchPerformed] = useState(false);
  // State to store tracks added to the playlist
  const [playlistTracks, setPlaylistTracks] = useState([]);
  // Retrieve access token from local storage
  const accessToken = localStorage.getItem("access_token");
  // If access token is not available, redirect to login
  if (!accessToken) {
    window.location.href = "/";
    return null;
  }

  // Function to search for tracks on Spotify
  const searchSpotify = async (query) => {
    // Number of results to limit the search to
    const limit = 10;
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=${limit}`;
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Check if the response is ok, if not throw an error
      if (!response.ok) throw new Error("Spotify API error");

      const data = await response.json();
      setResults(data.tracks.items || []);
    } catch (error) {
      console.error("Search failed:", error);
      // Clear previous results if the search fails
      setResults([]);
    }
    // Set searchPerformed to true to indicate that a search has been performed
    setSearchPerformed(true);
  };

  // Function to add a track to the playlist
  const onAddTrack = (track) => {
    setPlaylistTracks((prevTracks) => {
      // Check if the track is already in the playlist
      if (prevTracks.some((t) => t.id === track.id)) {
        return prevTracks; // If the track is already in the playlist, do not add it again
      }
      return [...prevTracks, track]; // Otherwise, add the track to the playlist
    });
  };

  // Function to save the playlist to Spotify
  const savePlaylist = async (name, tracks) => {
    try {
      // Step 1: Get user's Spotify ID
      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!userResponse.ok) throw new Error("Failed to fetch user ID");
      const userData = await userResponse.json();
      const userId = userData.id;

      // Step 2: Create a new playlist
      const playlistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            public: false,
          }),
        }
      );

      if (!playlistResponse.ok) throw new Error("Failed to create playlist");
      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;

      // Step 3: Add tracks to the new playlist
      const uris = tracks.map((track) => track.uri);

      const addTracksResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris }),
        }
      );

      if (!addTracksResponse.ok)
        throw new Error("Failed to add tracks to playlist");
      // Clear the playlist tracks after saving
      setPlaylistTracks([]);
      alert("Playlist saved to Spotify!");
    } catch (err) {
      console.error("Error saving playlist:", err);
      alert("Something went wrong while saving your playlist.");
    }
  };

  // Remove a track from the playlist
  const onRemoveTrack = (trackId) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((track) => track.id !== trackId)
    );
  };

  // Render the Home component
  return (
    <div classname="home">
      <LogoutButton />
      <h1>Welcome to Jammming</h1>
      <p>Your music app is ready to rock!</p>
      <div className="main-layout">
        <div className="left-pane">
          <SearchBar onSearch={searchSpotify} />
          {searchPerformed && (
            <SearchResults results={results} onAddTrack={onAddTrack} />
          )}
        </div>
        <Playlist
          playlistTracks={playlistTracks}
          savePlaylist={savePlaylist}
          onRemoveTrack={onRemoveTrack}
        />
      </div>
    </div>
  );
}

// Export the Home component
export default Home;
