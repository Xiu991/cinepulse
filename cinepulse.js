// Cinepulse Sora Module
// Adapté pour cinepulse.cc
// Version 2.0.3

const baseUrl = "https://cinepulse.cc/";

async function searchMovies(query) {
    const url = `${baseUrl}content/advanced-search?query=${encodeURIComponent(query)}&sortBy=pertinence`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        url: `${baseUrl}watch/${movie.slug}`,
        poster: movie.poster,
        type: "movie"
    }));
}

async function getMovieStreams(id) {
    const url = `${baseUrl}api/movie/${id}/streams`;
    const response = await fetch(url);
    const data = await response.json();
    return data.streams.map(stream => ({
        url: stream.url,
        quality: stream.quality,
        subtitles: stream.subtitles || []
    }));
}

// Export functions for Sora
export { searchMovies, getMovieStreams };
