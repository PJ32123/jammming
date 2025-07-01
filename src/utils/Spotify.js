import React from "react";

// Create an object that contains three methods: getAccessToken, search, and savePlaylist
const Spotify = {
  getAccessToken() {
    // Return an access token from the URL hash
  },
  search(term) {
    // Search for tracks using the Spotify API with the given search term and
    // return an array of track objects
  },
  savePlaylist(name, trackUris) {
    // Save a playlist with the given name and track URIs using the Spotify API
  },
};
// Export the Spotify object so it can be used in other parts of the application
export default Spotify;
