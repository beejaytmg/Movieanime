import fs from 'fs';
import fetch from 'node-fetch';
import xmlbuilder from 'xmlbuilder';

const totalPages = 50; // Total number of pages

const generateSitemap = async () => {
    try {
        const root = xmlbuilder.create('urlset', { encoding: 'utf-8' })
            .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

        for (let page = 1; page <= totalPages; page++) {
            const movieResponse = await fetch(`https://vidsrc.to/vapi/movie/new/${page}`);
            const movieData = await movieResponse.json();

            movieData.result.items.forEach(movie => {
                const movieTitle = movie.title.replace(/\s+/g, '-').toLowerCase();
                const url = `http://bharatitamang.com.np/watch/movie/${movieTitle}/${movie.tmdb_id}`;
                root.ele('url')
                    .ele('loc', url)
                    .up()
                    .ele('changefreq', 'weekly')
                    .up()
                    .ele('priority', '0.8');
            });
        }

        const xml = root.end({ pretty: true });

        // Write the XML to sitemap.xml file
        fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
        console.log('Sitemap generated successfully!');
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }
};

generateSitemap();
