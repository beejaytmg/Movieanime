import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TVShow() {
    const [latestTVShows, setLatestTVShows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        const tvResponse = await fetch(`https://vidsrc.to/vapi/tv/new/${currentPage}`);
        const tvData = await tvResponse.json();

        const tvShowsWithPosters = await Promise.all(tvData.result.items.map(async show => {
            const posterUrl = await fetchPosterUrl(show.tmdb_id, 'tv');
            return { ...show, posterUrl };
        }));
        setLatestTVShows(tvShowsWithPosters);
    };

    const fetchPosterUrl = async (tmdbId, type) => {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=27b2a20921a9341d9eb0a368d4c7697b`);
        const data = await response.json();
        return data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null;
    };

    const formatTitle = title => title.replace(/\s+/g, '-').toLowerCase();

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className="container mx-auto bg-gray-900 text-white py-8 px-4">
            <h2 className="text-3xl font-bold my-4">Latest TV Shows</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {latestTVShows.map(show => (
                    <div key={show.imdb_id} className="flex flex-col items-center">
                        <Link to={`/watch/${show.type}/${formatTitle(show.title)}/${show.tmdb_id}`} className="flex flex-col items-center">
                            {show.posterUrl && <img src={show.posterUrl} alt={show.title} className="mb-2 rounded-lg w-48 h-48 object-cover" />}
                            <span className="text-center">{show.title}</span>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handlePrevPage}
                >
                    Prev
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default TVShow;
