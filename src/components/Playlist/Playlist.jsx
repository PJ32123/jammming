import React, { useState } from "react";
import "./Playlist.css";
import "../TrackStyles.css";

// Create a functional component named Playlist
function Playlist({ playlistTracks, savePlaylist, onRemoveTrack }) {
  const [playlistName, setPlaylistName] = useState("");
  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // If the playlist name is empty, do not proceed
    if (playlistName.trim() === "") {
      alert("Playlist name cannot be empty");
      return;
    }
    if (playlistTracks.length === 0) {
      alert("Playlist cannot be empty");
      return;
    }
    // Call the savePlaylist function passed as a prop with the current playlist name and tracks
    savePlaylist(playlistName, playlistTracks);
    // Clear the playlist name after saving
    setPlaylistName("");
  };
  // Function to handle removing a track from the playlist
  const handleRemove = (trackId) => {
    const updated = playlistTracks.filter((track) => track.id !== trackId);
    savePlaylist(playlistName, updated); // optional if you want to auto-sync
    // or use a prop function: onRemoveTrack(trackId)
  };

  return (
    <form className="playlist" onSubmit={handleSubmit}>
      <input
        name="playlist-name"
        id="playlist-name"
        type="text"
        placeholder="New Playlist"
        autoComplete="off"
        onChange={(e) => setPlaylistName(e.target.value)}
        value={playlistName}
      />
      <ul>
        {playlistTracks.map((track) => (
          <li key={track.id} className="playlist-track">
            <div className="track-info">
              <p>{track.name}</p>
              <p>Artist: {track.artists.map((a) => a.name).join(", ")}</p>
              <p>Album: {track.album.name}</p>
            </div>
            <div className="track-controls">
              <button
                className="track-button"
                onClick={() => onRemoveTrack(track.id)}
              >
                x
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button class="save-playlist-btn">Save Playlist to Spotify</button>
    </form>
  );
}

export default Playlist;
