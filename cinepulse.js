// Module Sora pour Cinepulse
// Version 1.0.0
// https://cinepulse.cc/

const baseUrl = 'https://cinepulse.cc/';

async function searchMovies(query) {
    const searchUrl = `${baseUrl}search?q=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const movies = Array.from(doc.querySelectorAll('.movie-item')).map(movie => {
        const title = movie.querySelector('.movie-title').textContent.trim();
        const url = movie.querySelector('a').href;
        const poster = movie.querySelector('img').src;
        return { title, url, poster };
    });
    return movies;
}

async function getMovieStreams(url) {
    const response = await fetch(url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const streams = Array.from(doc.querySelectorAll('.stream-item')).map(stream => {
        const quality = stream.querySelector('.quality').textContent.trim();
        const streamUrl = stream.querySelector('a').href;
        return { quality, url: streamUrl };
    });
    return streams;
}

// Exportation des fonctions pour Sora
export { searchMovies, getMovieStreams };
