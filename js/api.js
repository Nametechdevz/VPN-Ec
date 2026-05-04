/* ============================================
   TMDB API Module
   Centraliza todas las llamadas a la API
   ============================================ */

const API = (() => {
  const base    = () => CONFIG.API_BASE;
  const key     = () => CONFIG.API_KEY;
  const lang    = () => CONFIG.LANGUAGE;
  const region  = () => CONFIG.REGION;
  const imgBase = () => CONFIG.IMAGE_BASE;

  const cache = new Map();

  async function request(endpoint, params = {}) {
    const url = new URL(`${base()}${endpoint}`);
    url.searchParams.set('api_key', key());
    url.searchParams.set('language', lang());
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
    const cacheKey = url.toString();
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      cache.set(cacheKey, data);
      return data;
    } catch (err) {
      console.error('[TMDB API]', err);
      throw err;
    }
  }

  return {
    /* ---- Imágenes ---- */
    posterUrl(path, size = 'w342')  { return path ? `${imgBase()}${size}${path}` : null; },
    backdropUrl(path, size = 'w1280') { return path ? `${imgBase()}${size}${path}` : null; },
    profileUrl(path, size = 'w185') { return path ? `${imgBase()}${size}${path}` : null; },

    /* ---- Trending ---- */
    trending(type = 'movie', window = 'day') {
      return request(`/trending/${type}/${window}`);
    },

    /* ---- Movies ---- */
    popular(page = 1)   { return request('/movie/popular', { page, region: region() }); },
    topRated(page = 1)  { return request('/movie/top_rated', { page, region: region() }); },
    upcoming(page = 1)  { return request('/movie/upcoming', { page, region: region() }); },
    nowPlaying(page = 1){ return request('/movie/now_playing', { page, region: region() }); },

    movieDetail(id) {
      return request(`/movie/${id}`, { append_to_response: 'credits,videos,similar' });
    },

    /* ---- TV Shows ---- */
    tvPopular(page = 1)   { return request('/tv/popular', { page }); },
    tvTopRated(page = 1)  { return request('/tv/top_rated', { page }); },
    tvOnAir(page = 1)     { return request('/tv/on_the_air', { page }); },

    tvDetail(id) {
      return request(`/tv/${id}`, { append_to_response: 'credits,videos,similar' });
    },

    /* ---- Search ---- */
    search(query, page = 1) {
      return request('/search/multi', { query, page, include_adult: false });
    },

    /* ---- By Genre ---- */
    byGenre(genreId, page = 1, type = 'movie') {
      return request(`/discover/${type}`, { with_genres: genreId, page, sort_by: 'popularity.desc' });
    },

    /* ---- Genres List ---- */
    genreList(type = 'movie') {
      return request(`/genre/${type}/list`);
    },

    /* ---- Person ---- */
    personDetail(id) {
      return request(`/person/${id}`, { append_to_response: 'movie_credits,tv_credits' });
    },
  };
})();
