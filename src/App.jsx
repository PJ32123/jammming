import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./utils/Spotify";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);

  // Wrapping spotify.search in a useCallback to prevent unnecessary re-renders
  const search = useCallback(Spotify.search, []);
  const savePlaylist = useCallback(Spotify.savePlaylist, []);

  return (
    <div>
      <h1>Jammming</h1>
      <SearchBar setSearchTerm={setSearchTerm} />
      <SearchResults />
      <Playlist />
    </div>
  );
};

export default App;
