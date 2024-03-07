import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import Watch from './Watch';
import Episode from './Episode';
import Movie from './Movie';
import TVShow from './TVshow';
import Navbar from './Navbar';
import Xml from './Xml';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/movies',
      element: (
        <>
          <Navbar />
          <Movie />
        </>
      ),
    },
    {
      path: '/sitemap',
      element: (
        <>
          <Navbar />
          <Xml />
        </>
      ),
    },
    {
      path: '/tv-shows',
      element: (
        <>
          <Navbar />
          <TVShow />
        </>
      ),
    },
    {
      path: '/watch/:type/:title/:tmdbId', // Route for inidual blog post
      element: (
        <>
          <Navbar />
          <Watch />
        </>
      ),
    },
    {
      path: '/watch/episode/:tmdbId/:seasonNumber/:episodeNumber', // Route for inidual blog post
      element: (
        <>
          <Navbar />
          <Episode />
        </>
      ),
    }
  ])
  return (
    
  
      <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
