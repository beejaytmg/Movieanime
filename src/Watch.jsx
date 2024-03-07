import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
const Watch = () => {
    const { type, tmdbId } = useParams();
    const [details, setDetails] = useState(null);
    const [seasons, setSeasons] = useState([]);
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [episodes, setEpisodes] = useState([]);
    const [embedUrl, setEmbedUrl] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(`https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=27b2a20921a9341d9eb0a368d4c7697b`);
            const data = await response.json();
            setDetails(data);

            if (type === 'movie') {
                setEmbedUrl(`https://vidsrc.to/embed/movie/${tmdbId}`);
            } else if (type === 'tv') {
                setEmbedUrl(`https://vidsrc.to/embed/tv/${tmdbId}`);
                // Fetch seasons for TV show
                const seasonResponse = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId}?api_key=27b2a20921a9341d9eb0a368d4c7697b`);
                const seasonData = await seasonResponse.json();
                setSeasons(seasonData.seasons);
            } else {
                // Handle episodes
                setEmbedUrl(`https://vidsrc.to/embed/tv/${tmdbId}/${data.season}/${data.number}`);
            }
        };

        fetchDetails();
    }, [tmdbId, type]);

    useEffect(() => {
        if (selectedSeason) {
            const fetchEpisodes = async () => {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${tmdbId}/season/${selectedSeason}?api_key=27b2a20921a9341d9eb0a368d4c7697b`);
                const data = await response.json();
                setEpisodes(data.episodes);
            };
            fetchEpisodes();
        }
    }, [selectedSeason, tmdbId]);

    if (!details) {
        return <div className="container mx-auto text-white">Loading...</div>;
    }

    return (
        <div className="container mx-auto bg-gray-900 text-white py-8 px-4">
            <h2 className="text-3xl font-bold mb-4">{details.title || details.name}</h2>
            <Helmet>
                <title>Watch {details.title || details.name}</title>
                <meta
                    name="description"
                    content={details.overview}
                />
            </Helmet>
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                    <img src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`} alt={details.title || details.name} className="w-full rounded-lg shadow-lg" />
                </div>
                <div className="w-full lg:w-1/2">
                    <p className="text-lg mb-4">{details.overview}</p>
                    {/* Embed video using iframe */}
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                        <iframe
                            title={details.title}
                            className="w-full h-full rounded-lg"
                            src={embedUrl}
                            
                            allowFullScreen
                            style={{ height: "300px" }} // Adjust height here
                        ></iframe>
                    </div>
                    {type === 'tv' && (
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Seasons</h3>
                            <ul className="mb-4">
                                {seasons.map(season => (
                                    <li key={season.id}>
                                        <button
                                            className={`text-blue-500 hover:underline focus:outline-none ${selectedSeason === season.season_number ? 'font-bold' : ''}`}
                                            onClick={() => setSelectedSeason(season.season_number)}
                                        >
                                            Season {season.season_number}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            {selectedSeason && (
                                <div>
                                    <h3 className="text-2xl font-bold mb-4">Episodes</h3>
                                    <ul>
                                        {episodes.map(episode => (
                                            <li key={episode.id}>
                                                <Link to={`/watch/episode/${tmdbId}/${selectedSeason}/${episode.episode_number}`} className="text-blue-500 hover:underline">
                                                    Episode {episode.episode_number}: {episode.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Watch;
