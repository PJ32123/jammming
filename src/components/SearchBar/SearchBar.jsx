// Import React
import React, { useState } from "react";
import "./SearchBar.css";

// Declare component function that will create search bar
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // If the query is empty, do not proceed
    if (query.trim() === "") return;
    // Call the onSearch function passed as a prop with the current query
    onSearch(query);
    // Clear the input field after submission
    setQuery("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        name="query"
        id="query"
        type="text"
        value={query}
        placeholder="Enter A Song"
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        autoFocus
      />
      <button>SEARCH</button>
    </form>
  );
};

export default SearchBar;
