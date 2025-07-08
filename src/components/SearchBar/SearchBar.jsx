// Import React and useState
import React, { useState } from "react";

// Declare component function that will create search bar
const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Set the term as the user types in the search bar
    setTerm(event.target.value);
    // Call search prop with the current term which will set the search results
    props.search(term);
    // Clear the input after submission
    setTerm(""); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        id="name"
        type="text"
        value={term}
        placeholder="Enter A Song, Album, or Artist"
        onChange={(e) => setTerm(e.target.value)}
        autoComplete="off"
        autoFocus
      />
      <button>SEARCH</button>
    </form>
  );
};

export default SearchBar;
