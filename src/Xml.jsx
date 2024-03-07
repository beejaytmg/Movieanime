import React from 'react';

function Xml() {
  // Define your routes here
  const routes = [
    '/',
    '/about',
    '/movies',
    '/tv-shows',
    // Add more routes as needed
  ];

  // Generate sitemap XML
  const generateSitemap = () => {
    const baseUrl = 'https://example.com'; // Your website URL
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`).join('')}
</urlset>`;

    // Generate a data URI for downloading the sitemap
    const dataUri = `data:text/xml;charset=utf-8,${encodeURIComponent(xml)}`;
    
    // Create a link element and simulate click to trigger download
    const link = document.createElement('a');
    link.href = dataUri;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button className='text-black' onClick={generateSitemap}>Generate</button>
    </div>
  );
}

export default Xml;
