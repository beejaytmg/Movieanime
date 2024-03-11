import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.png'; // Import your logo image

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    // Fetch search results using TMDB API
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=27b2a20921a9341d9eb0a368d4c7697b&query=${searchQuery}`);
    const data = await response.json();
    setSearchResults(data.results);
  };

  // Function to format the title for the URL
  const formatTitle = (title) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  };

  const clearSearchResults = () => {
    setSearchResults([]);
  };

  return (
    <nav className="bg-black py-4 px-8 flex items-center justify-between">
      <div className="flex items-center">
        {/* <Link to="/" className="mr-8">
          <img src={logo} alt="Logo" className="h-8" />
        </Link> */}
        <ul className="flex space-x-4 text-gray-300">
          <li>
            <Link to="/" className="hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" className="hover:text-white">
              Movies
            </Link>
          </li>
          <li>
            <Link to="/tv-shows" className="hover:text-white">
              TV Shows
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 text-white px-4 py-2 rounded-full mr-4 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none absolute right-0"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {/* Add additional icons or menu items here */}
      </div>
      {/* Render search results */}
      {searchResults.length > 0 && (
        <div className="container mx-auto mt-4 bg-black rounded-md p-4">
          <h3 className="text-white text-lg font-bold mb-2">Search Results</h3>
          <ul>
            {searchResults.map((result) => (
              <li key={result.id} className="mb-2">
                <Link
                  to={`/watch/${result.media_type}/${formatTitle(result.title || result.name)}/${result.id}`}
                  className="flex items-center text-white hover:underline focus:outline-none"
                  onClick={clearSearchResults}
                >
                  {result.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                      alt={result.title || result.name}
                      className="w-12 h-12 mr-2"
                    />
                  )}
                  <span>{result.title || result.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;