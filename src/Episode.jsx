import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';

const Episode = () => {
    const { tmdbId, seasonNumber, episodeNumber } = useParams();
    const [episodeDetails, setEpisodeDetails] = useState(null);
    const [embedUrl, setEmbedUrl] = useState('');
    const [seasons, setSeasons] = useState([]);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        const fetchEpisodeDetails = async () => {
            // Fetch episode details using tmdbId, seasonNumber, and episodeNumber
            const response = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=27b2a20921a9341d9eb0a368d4c7697b`);
            const data = await response.json();
            setEpisodeDetails(data);
            // Construct the embed URL
            setEmbedUrl(`https://vidsrc.to/embed/tv/${tmdbId}/${seasonNumber}/${episodeNumber}`);
        };

        const fetchSeasonsAndEpisodes = async () => {
            // Fetch seasons for TV show
            const seasonResponse = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId}?api_key=27b2a20921a9341d9eb0a368d4c7697b`);
            const seasonData = await seasonResponse.json();
            setSeasons(seasonData.seasons);

            // Fetch episodes for the selected season
            const episodeResponse = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId}/season/${seasonNumber}?api_key=27b2a20921a9341d9eb0a368d4c7697b`);
            const episodeData = await episodeResponse.json();
            setEpisodes(episodeData.episodes);
        };

        fetchEpisodeDetails();
        fetchSeasonsAndEpisodes();
    }, [tmdbId, seasonNumber, episodeNumber]);

    if (!episodeDetails) {
        return <div className="container mx-auto text-white">Loading...</div>;
    }

    return (
        <div className="container mx-auto bg-gray-900 text-white py-8 px-4">
            <h2 className="text-3xl font-bold mb-4">{episodeDetails.name}</h2>
            
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                    <img src={`https://image.tmdb.org/t/p/original${episodeDetails.still_path}`} alt={episodeDetails.name} className="w-full rounded-lg shadow-lg" />
                </div>
                <Helmet>
                <title>Watch {episodeDetails.name}</title>
                <meta
                    name="description"
                    content={episodeDetails.overview}
                />
              </Helmet>
                <div className="w-full lg:w-1/2">
                    <p className="text-lg mb-4">{episodeDetails.overview}</p>
                    {/* Embed video using iframe */}
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                        <iframe
                            title={episodeDetails.name}
                            className="w-full h-full rounded-lg"
                            src={embedUrl}
                
                            style={{ height: "300px" }}
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Seasons</h3>
                        <ul className="mb-4">
                            {seasons.map(season => (
                                <li key={season.id}>
                                    <button className="text-blue-500 hover:underline focus:outline-none">
                                        <Link to={`/watch/episode/${tmdbId}/${season.season_number}/${episodeNumber}`}>
                                            Season {season.season_number}
                                        </Link>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Episodes</h3>
                        <ul>
                            {episodes.map(episode => (
                                <li key={episode.id}>
                                    <Link to={`/watch/episode/${tmdbId}/${seasonNumber}/${episode.episode_number}`} className="text-blue-500 hover:underline">
                                        Episode {episode.episode_number}: {episode.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Episode;
