/* ============================================
   Homepage Logic
   ============================================ */

/* ---------- Helpers ---------- */
function $(id) { return document.getElementById(id); }

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str);
  return d.toLocaleDateString(CONFIG.LANGUAGE, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatYear(str) {
  if (!str) return '';
  return str.substring(0, 4);
}

function formatRuntime(minutes) {
  if (!minutes) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

function formatNumber(n) {
  if (!n) return '0';
  return Number(n).toLocaleString(CONFIG.LANGUAGE);
}

function formatMoney(n) {
  if (!n || n === 0) return 'N/D';
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${formatNumber(n)}`;
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function navigateToDetail(id, type) {
  window.location.href = `movie.html?id=${id}&type=${type || 'movie'}`;
}

/* ---------- Card Builder ---------- */
function buildCard(item, type) {
  const mediaType = type || item.media_type || 'movie';
  const title = item.title || item.name || 'Sin título';
  const year  = formatYear(item.release_date || item.first_air_date);
  const rating = item.vote_average ? item.vote_average.toFixed(1) : '?';
  const posterUrl = API.posterUrl(item.poster_path, 'w342');

  const card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${title} (${year})`);

  card.innerHTML = `
    <div class="card__img-wrap">
      ${posterUrl
        ? `<img class="card__img" src="${posterUrl}" alt="${title}" loading="lazy" />`
        : `<div class="card__no-img">🎬</div>`
      }
      <div class="card__rating">⭐ ${rating}</div>
      ${mediaType === 'tv' ? `<span class="card__type-badge">Serie</span>` : ''}
    </div>
    <div class="card__info">
      <p class="card__title">${title}</p>
      ${year ? `<p class="card__year">${year}</p>` : ''}
    </div>
  `;

  const go = () => navigateToDetail(item.id, mediaType);
  card.addEventListener('click', go);
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') go(); });

  return card;
}

function buildSkeletonCards(count = 8) {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<div class="card__img-wrap skeleton skeleton--card" style="height:240px;border-radius:10px;"></div>
      <div class="card__info">
        <div class="skeleton" style="height:12px;width:80%;margin-top:8px;"></div>
        <div class="skeleton" style="height:10px;width:40%;margin-top:6px;"></div>
      </div>`;
    frag.appendChild(div);
  }
  return frag;
}

/* ---------- Slider ---------- */
const sliders = {};

function initSlider(id) {
  const track = $(`${id}-track`);
  const slider = $(`${id}-slider`);
  if (!track || !slider) return;

  sliders[id] = { track, position: 0 };

  document.querySelectorAll(`[data-slider="${id}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = btn.classList.contains('slider-arrow--left') ? -1 : 1;
      scrollSlider(id, dir);
    });
  });
}

function scrollSlider(id, dir) {
  const s = sliders[id];
  if (!s) return;
  const sliderEl = s.track.parentElement;
  const cardW = (s.track.firstElementChild?.offsetWidth || 160) + 14;
  const visible = Math.floor(sliderEl.offsetWidth / cardW);
  const step = cardW * Math.max(1, visible - 1);
  const maxScroll = s.track.scrollWidth - sliderEl.offsetWidth;

  s.position = Math.max(0, Math.min(s.position + dir * step, maxScroll));
  s.track.style.transform = `translateX(-${s.position}px)`;
}

function fillSlider(id, items, type) {
  const track = $(`${id}-track`);
  if (!track) return;
  track.innerHTML = '';
  items.forEach(item => track.appendChild(buildCard(item, type)));
  initSlider(id);
}

/* ---------- Hero ---------- */
let heroItems = [];
let heroCurrent = 0;
let heroTimer = null;

function renderHero(items) {
  heroItems = items;
  const content = $('hero-content');
  const backdrop = $('hero-backdrop');
  const indicators = $('hero-indicators');

  indicators.innerHTML = '';
  items.slice(0, 8).forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `hero__dot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => showHeroSlide(i));
    indicators.appendChild(dot);
  });

  showHeroSlide(0);
  clearInterval(heroTimer);
  heroTimer = setInterval(() => {
    heroCurrent = (heroCurrent + 1) % Math.min(heroItems.length, 8);
    showHeroSlide(heroCurrent);
  }, 6000);
}

function showHeroSlide(idx) {
  heroCurrent = idx;
  const item = heroItems[idx];
  if (!item) return;

  const mediaType = item.media_type || 'movie';
  const title    = item.title || item.name || '';
  const overview = item.overview || '';
  const rating   = item.vote_average?.toFixed(1) || '?';
  const year     = formatYear(item.release_date || item.first_air_date);
  const backdropPath = API.backdropUrl(item.backdrop_path, 'original');

  const backdrop = $('hero-backdrop');
  if (backdropPath) {
    backdrop.style.backgroundImage = `url(${backdropPath})`;
  }

  $('hero-content').innerHTML = `
    <div class="hero__badge">🔥 Tendencia ${mediaType === 'tv' ? 'Serie' : 'Película'}</div>
    <h1 class="hero__title">${title}</h1>
    <div class="hero__meta">
      <span class="hero__rating">⭐ ${rating}</span>
      ${year ? `<span>${year}</span>` : ''}
      ${item.vote_count ? `<span>${formatNumber(item.vote_count)} votos</span>` : ''}
    </div>
    <p class="hero__overview">${overview}</p>
    <div class="hero__actions">
      <button class="btn btn--primary" onclick="navigateToDetail(${item.id}, '${mediaType}')">
        ▶ Ver Detalles
      </button>
      <button class="btn btn--secondary" onclick="navigateToDetail(${item.id}, '${mediaType}')">
        + Más Info
      </button>
    </div>
  `;

  document.querySelectorAll('.hero__dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

/* ---------- Search ---------- */
let searchPage = 1;
let searchQuery = '';

function showSearchResults(query, page = 1, append = false) {
  searchQuery = query;
  searchPage = page;

  if (!append) {
    $('search-results-section').style.display = 'block';
    $('search-query-label').textContent = `"${query}"`;
    $('trending-section').parentElement.style.display = '';

    document.querySelectorAll('.section').forEach(s => {
      if (s.id !== 'search-results-section') s.style.display = 'none';
    });

    const grid = $('search-results-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const d = document.createElement('div');
      d.innerHTML = `<div class="skeleton" style="aspect-ratio:2/3;border-radius:10px;"></div>`;
      grid.appendChild(d);
    }
  }

  API.search(query, page).then(data => {
    const grid = $('search-results-grid');
    if (!append) grid.innerHTML = '';

    const results = data.results.filter(r => r.media_type !== 'person' && r.poster_path);
    results.forEach(item => grid.appendChild(buildCard(item)));

    const wrap = $('search-load-more-wrap');
    if (data.page < data.total_pages) {
      wrap.style.display = 'block';
    } else {
      wrap.style.display = 'none';
    }

    if (results.length === 0 && !append) {
      grid.innerHTML = `<p style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:40px 0;">
        No se encontraron resultados para "${query}"
      </p>`;
    }
  }).catch(() => showToast('Error al buscar. Verifica tu API Key.'));
}

function clearSearch() {
  $('search-results-section').style.display = 'none';
  document.querySelectorAll('.section').forEach(s => s.style.display = '');
  $('browse-section').style.display = 'none';
}

/* ---------- Browse by genre/list ---------- */
let browsePage = 1;
let browseParams = {};

function loadBrowse(params, page = 1, append = false) {
  browseParams = params;
  browsePage   = page;

  if (!append) {
    document.querySelectorAll('.section').forEach(s => {
      if (s.id !== 'browse-section') s.style.display = 'none';
    });
    $('browse-section').style.display = 'block';
    $('search-results-section').style.display = 'none';
    $('browse-grid').innerHTML = '';
  }

  let promise;
  const { list, genre, category } = params;

  if (list === 'popular')    promise = API.popular(page);
  else if (list === 'top_rated') promise = API.topRated(page);
  else if (list === 'upcoming')  promise = API.upcoming(page);
  else if (genre) promise = API.byGenre(genre, page, category || 'movie');
  else if (category === 'tv') promise = API.tvPopular(page);
  else promise = API.popular(page);

  promise.then(data => {
    const grid = $('browse-grid');
    data.results.forEach(item => grid.appendChild(buildCard(item, category || 'movie')));

    const wrap = $('browse-load-more-wrap');
    wrap.style.display = data.page < data.total_pages ? 'block' : 'none';
  }).catch(() => showToast('Error al cargar. Verifica tu API Key.'));
}

/* ---------- URL Params ---------- */
function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const list     = params.get('list');
  const genre    = params.get('genre');
  const category = params.get('category');
  const query    = params.get('q');

  const titles = {
    popular:   'Películas Populares',
    top_rated: 'Mejor Calificadas',
    upcoming:  'Próximos Estrenos',
  };

  if (query) {
    showSearchResults(query);
    return true;
  }
  if (list || genre || category) {
    let title = titles[list] || (category === 'tv' ? 'Series Populares' : 'Explorar');
    $('browse-title').textContent = title;
    loadBrowse({ list, genre, category });
    return true;
  }
  return false;
}

/* ---------- Init ---------- */
async function init() {
  // Apply config
  document.title = `${CONFIG.SITE_NAME} - Películas y Series`;
  const logoText = document.querySelectorAll('.logo__text');
  const logoIcon = document.querySelectorAll('.logo__icon');
  logoText.forEach(el => el.textContent = CONFIG.SITE_NAME);
  logoIcon.forEach(el => el.textContent = CONFIG.SITE_LOGO);

  // Sliders skeleton
  ['trending-track', 'popular-track', 'toprated-track', 'upcoming-track'].forEach(id => {
    const el = $(id);
    if (el) el.appendChild(buildSkeletonCards(8));
  });

  // Handle URL params first
  const hasFilter = handleUrlParams();

  // Hero
  API.trending('all', 'day').then(data => {
    renderHero(data.results);
  }).catch(() => showToast('Error al conectar con TMDB. Verifica tu API Key en config.js'));

  if (!hasFilter) {
    // Fill sliders
    API.trending('movie', 'day').then(d => fillSlider('trending', d.results, 'movie'));
    API.popular().then(d => fillSlider('popular', d.results, 'movie'));
    API.topRated().then(d => fillSlider('toprated', d.results, 'movie'));
    API.upcoming().then(d => fillSlider('upcoming', d.results, 'movie'));
  }

  // Trending toggle
  $('trending-movies-btn')?.addEventListener('click', () => {
    $('trending-movies-btn').classList.add('toggle-btn--active');
    $('trending-tv-btn').classList.remove('toggle-btn--active');
    API.trending('movie', 'day').then(d => fillSlider('trending', d.results, 'movie'));
  });
  $('trending-tv-btn')?.addEventListener('click', () => {
    $('trending-tv-btn').classList.add('toggle-btn--active');
    $('trending-movies-btn').classList.remove('toggle-btn--active');
    API.trending('tv', 'day').then(d => fillSlider('trending', d.results, 'tv'));
  });

  // Search load more
  $('search-load-more')?.addEventListener('click', () => {
    showSearchResults(searchQuery, searchPage + 1, true);
  });

  // Browse load more
  $('browse-load-more')?.addEventListener('click', () => {
    loadBrowse(browseParams, browsePage + 1, true);
  });
}

/* ---------- UI Interactions ---------- */
function setupUI() {
  // Header scroll
  const header = $('header');
  window.addEventListener('scroll', () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 50);
    $('back-to-top')?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  // Back to top
  $('back-to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Hamburger
  const hamburger = $('hamburger');
  const mobileMenu = $('mobile-menu');
  hamburger?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });

  // Search desktop
  const doSearch = (input) => {
    const q = input.value.trim();
    if (q.length >= 2) {
      showSearchResults(q);
    } else if (q.length === 0) {
      clearSearch();
    }
  };

  let searchTimer;
  $('search-input')?.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => doSearch(e.target), 400);
  });
  $('search-btn')?.addEventListener('click', () => doSearch($('search-input')));
  $('search-input')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch(e.target);
    if (e.key === 'Escape') clearSearch();
  });

  // Search mobile
  $('search-input-mobile')?.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => doSearch(e.target), 400);
  });
  $('search-btn-mobile')?.addEventListener('click', () => doSearch($('search-input-mobile')));
}

document.addEventListener('DOMContentLoaded', () => {
  setupUI();
  init();
});
