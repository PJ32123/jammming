import React from "react";
import "./SearchResults.css";
import "../TrackStyles.css";

// Create a functional component named SearchResults
function SearchResults({ results, onAddTrack, playlistTracks }) {
  // If there are no results, return a message indicating no results found
  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }
  // Map through the results and create a list of track names
  return (
    <div className="search-results">
      {results.map((track) => (
        <div key={track.id} className="track">
          <div className="track-info">
            <p>{track.name}</p>
            <p>
              Artist: {track.artists.map((artist) => artist.name).join(", ")}
            </p>
            <p>Album: {track.album.name}</p>
          </div>
          {/* Check if the track is already in the playlist */}
          {playlistTracks.some((t) => t.id === track.id) ? (
            <button className="check-button">✓</button>
          ) : (
            <button className="track-button" onClick={() => onAddTrack(track)}>
              +
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
