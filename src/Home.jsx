import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [latestMovies, setLatestMovies] = useState([]);
    const [latestTVShows, setLatestTVShows] = useState([]);
    const [latestEpisodes, setLatestEpisodes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const movieResponse = await fetch('https://vidsrc.to/vapi/movie/new');
            const movieData = await movieResponse.json();
            const tvResponse = await fetch('https://vidsrc.to/vapi/tv/new');
            const tvData = await tvResponse.json();
            const episodeResponse = await fetch('https://vidsrc.to/vapi/episode/latest');
            const episodeData = await episodeResponse.json();

            const moviesWithPosters = await Promise.all(movieData.result.items.map(async movie => {
                const posterUrl = await fetchPosterUrl(movie.tmdb_id, 'movie');
                return { ...movie, posterUrl };
            }));
            setLatestMovies(moviesWithPosters);

            const tvShowsWithPosters = await Promise.all(tvData.result.items.map(async show => {
                const posterUrl = await fetchPosterUrl(show.tmdb_id, 'tv');
                return { ...show, posterUrl };
            }));
            setLatestTVShows(tvShowsWithPosters);

            const episodesWithPosters = await Promise.all(episodeData.result.items.map(async episode => {
                const posterUrl = await fetchPosterUrl(episode.tmdb_id, 'tv');
                return { ...episode, posterUrl };
            }));
            setLatestEpisodes(episodesWithPosters);
        };

        fetchData();
    }, []);

    const fetchPosterUrl = async (tmdbId, type) => {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=27b2a20921a9341d9eb0a368d4c7697b`);
        const data = await response.json();
        return data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null;
    };

    const formatTitle = title => title.replace(/\s+/g, '-').toLowerCase();

    return (
        <div className="bg-black text-white">
            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-bold mb-8">Latest Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {latestMovies.map(movie => (
                        <div key={movie.imdb_id} className="relative">
                            <Link to={`/watch/${movie.type}/${formatTitle(movie.title)}/${movie.tmdb_id}`} className="block">
                                {movie.posterUrl && <img src={movie.posterUrl} alt={movie.title} className="rounded-lg w-full h-auto" />}
                            </Link>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-75 rounded-b-lg">
                                <span className="text-sm">{movie.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-bold mb-8">Latest TV Shows</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {latestTVShows.map(show => (
                        <div key={show.imdb_id} className="relative">
                            <Link to={`/watch/${show.type}/${formatTitle(show.title)}/${show.tmdb_id}`} className="block">
                                {show.posterUrl && <img src={show.posterUrl} alt={show.title} className="rounded-lg w-full h-auto" />}
                            </Link>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-75 rounded-b-lg">
                                <span className="text-sm">{show.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto py-8 px-4">
                <h2 className="text-3xl font-bold mb-8">Latest Episodes</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {latestEpisodes.map(episode => (
                        <div key={episode.imdb_id} className="relative">
                            <Link to={`/watch/${episode.type}/${formatTitle(episode.title)}/${episode.tmdb_id}`} className="block">
                                {episode.posterUrl && <img src={episode.posterUrl} alt={episode.title} className="rounded-lg w-full h-auto" />}
                            </Link>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-75 rounded-b-lg">
                                <span className="text-sm">{episode.title} (Season {episode.season}, Episode {episode.number})</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;