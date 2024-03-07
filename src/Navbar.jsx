import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <Link to="/" className="text-white text-xl font-bold mb-4 sm:mb-0">Bharatitamang.com.np</Link>
                <div className="flex items-center mb-4 sm:mb-0">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-gray-700 text-white px-4 py-2 rounded mr-4 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                <div className="flex flex-wrap justify-end">
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="text-white hover:text-gray-400">Home</Link></li>
                        <li><Link to="/movies" className="text-white hover:text-gray-400">Movies</Link></li>
                        <li><Link to="/tv-shows" className="text-white hover:text-gray-400">TV Shows</Link></li>
                    </ul>
                </div>
            </div>
            {/* Render search results */}
            {searchResults.length > 0 && (
                <div className="container mx-auto mt-4 bg-gray-700 rounded-md p-4">
                    <h3 className="text-white text-lg font-bold mb-2">Search Results</h3>
                    <ul>
                        {searchResults.map(result => (
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
}

export default Navbar;
