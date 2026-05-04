/* ============================================
   Movie / TV Detail Page Logic
   ============================================ */

function $(id) { return document.getElementById(id); }

function formatYear(str) { return str ? str.substring(0, 4) : ''; }
function formatDate(str) {
  if (!str) return '';
  return new Date(str).toLocaleDateString(CONFIG.LANGUAGE, { year: 'numeric', month: 'long', day: 'numeric' });
}
function formatRuntime(m) {
  if (!m) return '';
  const h = Math.floor(m / 60), min = m % 60;
  return h ? `${h}h ${min}m` : `${min}m`;
}
function formatMoney(n) {
  if (!n || n === 0) return 'N/D';
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}
function formatNumber(n) { return n ? Number(n).toLocaleString(CONFIG.LANGUAGE) : '0'; }

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
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

/* ---------- Sliders ---------- */
const sliders = {};

function initSlider(id) {
  const track = $(`${id}-track`);
  const sliderEl = $(`${id}-slider`);
  if (!track || !sliderEl) return;
  sliders[id] = { track, position: 0 };

  document.querySelectorAll(`[data-slider="${id}"]`).forEach(btn => {
    btn.addEventListener('click', () => {
      const dir = btn.classList.contains('slider-arrow--left') ? -1 : 1;
      const cardW = (track.firstElementChild?.offsetWidth || 120) + 14;
      const visible = Math.floor(sliderEl.offsetWidth / cardW);
      const step = cardW * Math.max(1, visible - 1);
      const maxScroll = track.scrollWidth - sliderEl.offsetWidth;
      sliders[id].position = Math.max(0, Math.min(sliders[id].position + dir * step, maxScroll));
      track.style.transform = `translateX(-${sliders[id].position}px)`;
    });
  });
}

function fillSlider(id, items, type) {
  const track = $(`${id}-track`);
  if (!track) return;
  track.innerHTML = '';
  items.forEach(item => track.appendChild(buildCard(item, type)));
  initSlider(id);
}

/* ---------- Cast ---------- */
function fillCast(credits) {
  const track = $('cast-track');
  if (!track) return;
  track.innerHTML = '';
  const cast = (credits?.cast || []).slice(0, 20);

  if (cast.length === 0) {
    $('cast-track').closest('.section').style.display = 'none';
    return;
  }

  cast.forEach(person => {
    const img = API.profileUrl(person.profile_path, 'w185');
    const card = document.createElement('div');
    card.className = 'cast-card';
    card.innerHTML = `
      <div class="cast-card__img-wrap">
        ${img
          ? `<img class="cast-card__img" src="${img}" alt="${person.name}" loading="lazy" />`
          : `<div class="cast-card__img" style="display:flex;align-items:center;justify-content:center;height:100%;font-size:2rem;background:var(--bg-hover)">👤</div>`
        }
      </div>
      <p class="cast-card__name">${person.name}</p>
      <p class="cast-card__role">${person.character || ''}</p>
    `;
    track.appendChild(card);
  });
  initSlider('cast');
}

/* ---------- Trailer ---------- */
function findTrailer(videos) {
  if (!videos?.results?.length) return null;
  const ranked = ['Official Trailer', 'Trailer', 'Teaser'];
  for (const keyword of ranked) {
    const v = videos.results.find(v =>
      v.site === 'YouTube' && v.name.toLowerCase().includes(keyword.toLowerCase())
    );
    if (v) return v;
  }
  return videos.results.find(v => v.site === 'YouTube') || null;
}

function openTrailerModal(key) {
  const modal = $('trailer-modal');
  $('modal-video').innerHTML = `<iframe
    src="https://www.youtube.com/embed/${key}?autoplay=1&rel=0"
    allow="autoplay; encrypted-media"
    allowfullscreen
  ></iframe>`;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('trailer-modal')?.classList.remove('open');
  $('modal-video').innerHTML = '';
  document.body.style.overflow = '';
}

/* ---------- Detail Render ---------- */
function renderDetail(data, type) {
  const isTV    = type === 'tv';
  const title   = data.title || data.name || 'Sin título';
  const tagline = data.tagline || '';
  const overview = data.overview || 'Sin descripción disponible.';
  const rating  = data.vote_average?.toFixed(1) || '?';
  const votes   = formatNumber(data.vote_count);
  const year    = formatYear(data.release_date || data.first_air_date);
  const runtime = isTV
    ? (data.episode_run_time?.[0] ? `${data.episode_run_time[0]}m / ep.` : '')
    : formatRuntime(data.runtime);
  const genres  = data.genres || [];
  const trailer = findTrailer(data.videos);
  const posterUrl  = API.posterUrl(data.poster_path, 'w500');
  const backdropUrl = API.backdropUrl(data.backdrop_path, 'original');

  // Meta
  document.title = `${title} (${year}) | ${CONFIG.SITE_NAME}`;
  $('meta-description').content = overview.substring(0, 160);

  // Logo
  document.querySelectorAll('.logo__text').forEach(el => el.textContent = CONFIG.SITE_NAME);
  document.querySelectorAll('.logo__icon').forEach(el => el.textContent = CONFIG.SITE_LOGO);

  // Backdrop
  if (backdropUrl) {
    $('detail-backdrop').style.backgroundImage = `url(${backdropUrl})`;
  }

  // Stats
  const statsBudget = !isTV ? `
    <div class="stat-box">
      <p class="stat-box__label">Presupuesto</p>
      <p class="stat-box__value">${formatMoney(data.budget)}</p>
    </div>
    <div class="stat-box">
      <p class="stat-box__label">Recaudación</p>
      <p class="stat-box__value">${formatMoney(data.revenue)}</p>
    </div>
  ` : `
    <div class="stat-box">
      <p class="stat-box__label">Temporadas</p>
      <p class="stat-box__value">${data.number_of_seasons || '?'}</p>
    </div>
    <div class="stat-box">
      <p class="stat-box__label">Episodios</p>
      <p class="stat-box__value">${data.number_of_episodes || '?'}</p>
    </div>
  `;

  const director = !isTV
    ? data.credits?.crew?.find(c => c.job === 'Director')?.name || ''
    : data.created_by?.map(c => c.name).join(', ') || '';

  $('detail-content').innerHTML = `
    <div class="detail-layout">
      <div class="detail-poster">
        ${posterUrl
          ? `<img src="${posterUrl}" alt="${title}" />`
          : `<div style="aspect-ratio:2/3;background:var(--bg-hover);display:flex;align-items:center;justify-content:center;font-size:4rem;">🎬</div>`
        }
      </div>
      <div class="detail-info">
        ${tagline ? `<p class="detail-tagline">"${tagline}"</p>` : ''}
        <h1 class="detail-title">${title}</h1>
        <div class="detail-meta">
          <span class="detail-rating">⭐ ${rating} <span class="detail-votes">(${votes} votos)</span></span>
          ${year ? `<span>📅 ${year}</span>` : ''}
          ${runtime ? `<span>⏱ ${runtime}</span>` : ''}
          ${data.original_language ? `<span>🌐 ${data.original_language.toUpperCase()}</span>` : ''}
          ${data.status ? `<span class="status-badge" style="padding:2px 10px;border-radius:50px;background:var(--bg-hover);font-size:0.75rem;">${translateStatus(data.status)}</span>` : ''}
        </div>
        ${genres.length ? `
          <div class="detail-genres">
            ${genres.map(g => `<a href="index.html?genre=${g.id}&category=${type}" class="genre-tag">${g.name}</a>`).join('')}
          </div>
        ` : ''}
        <p class="detail-overview">${overview}</p>
        <div class="detail-actions">
          ${trailer
            ? `<button class="btn btn--primary" id="play-trailer">▶ Ver Tráiler</button>`
            : ''
          }
          <a href="https://www.themoviedb.org/${type}/${data.id}" target="_blank" rel="noopener" class="btn btn--secondary btn--sm">
            🔗 TMDb
          </a>
        </div>
        <div class="detail-stats">
          ${runtime ? `<div class="stat-box"><p class="stat-box__label">Duración</p><p class="stat-box__value">${runtime}</p></div>` : ''}
          ${director ? `<div class="stat-box"><p class="stat-box__label">${isTV ? 'Creador' : 'Director'}</p><p class="stat-box__value">${director}</p></div>` : ''}
          ${statsBudget}
          ${data.production_countries?.[0] ? `<div class="stat-box"><p class="stat-box__label">País</p><p class="stat-box__value">${data.production_countries[0].name}</p></div>` : ''}
        </div>
      </div>
    </div>
  `;

  // Trailer button
  if (trailer) {
    $('play-trailer')?.addEventListener('click', () => openTrailerModal(trailer.key));

    // Embedded trailer section
    $('trailer-section').style.display = 'block';
    $('trailer-container').innerHTML = `<iframe
      src="https://www.youtube.com/embed/${trailer.key}?rel=0"
      allow="encrypted-media"
      allowfullscreen
    ></iframe>`;
  }

  // Cast
  fillCast(data.credits);

  // Similar
  const similar = data.similar?.results?.filter(m => m.poster_path) || [];
  if (similar.length > 0) {
    const simTitle = $('similar-title');
    if (simTitle) simTitle.textContent = isTV ? 'Series Similares' : 'Películas Similares';
    fillSlider('similar', similar, type);
  } else {
    $('similar-section').style.display = 'none';
  }

  // Show main
  $('detail-main').style.display = 'block';
}

function translateStatus(status) {
  const map = {
    'Released':          'Estrenada',
    'In Production':     'En producción',
    'Post Production':   'Post-producción',
    'Planned':           'Planeada',
    'Canceled':          'Cancelada',
    'Returning Series':  'En emisión',
    'Ended':             'Finalizada',
  };
  return map[status] || status;
}

/* ---------- Init ---------- */
async function init() {
  const params = new URLSearchParams(window.location.search);
  const id   = params.get('id');
  const type = params.get('type') || 'movie';

  if (!id) {
    window.location.href = 'index.html';
    return;
  }

  try {
    const data = type === 'tv'
      ? await API.tvDetail(id)
      : await API.movieDetail(id);

    renderDetail(data, type);
  } catch (err) {
    $('detail-content').innerHTML = `
      <div style="text-align:center;padding:60px 20px;">
        <p style="font-size:3rem;margin-bottom:16px;">⚠️</p>
        <h2 style="margin-bottom:8px;">No se pudo cargar</h2>
        <p style="color:var(--text-muted);margin-bottom:20px;">Verifica tu API Key en config.js o intenta más tarde.</p>
        <a href="index.html" class="btn btn--primary">← Volver al Inicio</a>
      </div>
    `;
    console.error(err);
  }
}

/* ---------- UI ---------- */
function setupUI() {
  const header = $('header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 50);
    $('back-to-top')?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  $('back-to-top')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const hamburger = $('hamburger');
  const mobileMenu = $('mobile-menu');
  hamburger?.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });

  // Modal close
  $('modal-overlay')?.addEventListener('click', closeModal);
  $('modal-close')?.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Search from detail page
  const doSearch = (input) => {
    const q = input?.value?.trim();
    if (q?.length >= 2) window.location.href = `index.html?q=${encodeURIComponent(q)}`;
  };
  $('search-btn')?.addEventListener('click', () => doSearch($('search-input')));
  $('search-input')?.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(e.target); });
}

document.addEventListener('DOMContentLoaded', () => {
  setupUI();
  init();
});
