// Import React and useState
import React, { useState } from "react";
import { memo } from "react";

// Declare component function that will create search bar
const SearchBar = memo(function SearchBar(props) {
  const [term, setTerm] = useState("");

  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Check if the term is empty or contains only whitespace
    if (term.trim() === "") {
      alert("Please enter a valid search term.");
      return;
    }
    // Set the term as the user types in the search bar
    setTerm(event.target.value);
    // Call the setSearchTerm function passed in props to update the search term
    props.setSearchTerm(term);
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
});

export default SearchBar;
