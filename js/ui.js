'use strict';

/* ===== FORMATTERS ===== */
function fmtDuration(secs) {
  if (!secs || isNaN(secs)) return '';
  if (secs === -1) return 'EN VIVO';
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, '0');
  return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${s}` : `${m}:${s}`;
}

function fmtViews(n) {
  if (!n && n !== 0) return '';
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B vistas`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M vistas`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K vistas`;
  return `${n} vistas`;
}

function fmtSubs(n) {
  if (!n && n !== 0) return '';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M suscriptores`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K suscriptores`;
  return `${n} suscriptores`;
}

function fmtLikes(n) {
  if (!n && n !== 0) return '';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

function videoIdFromUrl(url) {
  if (!url) return null;
  const m = url.match(/[?&]v=([^&]+)/) || url.match(/\/watch\?v=([^&]+)/) || url.match(/\/([a-zA-Z0-9_-]{11})(?:\?|$)/);
  return m ? m[1] : null;
}

function channelIdFromUrl(url) {
  if (!url) return null;
  const m = url.match(/\/channel\/([^/?]+)/) || url.match(/\/c\/([^/?]+)/);
  return m ? m[1] : null;
}

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ===== VIDEO CARD ===== */
function renderVideoCard(video) {
  const id = videoIdFromUrl(video.url);
  if (!id) return '';
  const duration = video.duration === -1 ? 'LIVE' : fmtDuration(video.duration);
  const isLive = video.duration === -1;
  const isShort = video.isShort;
  const thumb = video.thumbnail || '';
  const avatar = video.uploaderAvatar || '';
  const channelId = channelIdFromUrl(video.uploaderUrl);

  return `
    <article class="video-card" role="listitem">
      <div class="thumb-wrap" onclick="router.go('/watch?v=${id}')">
        <img src="${escHtml(thumb)}" alt="${escHtml(video.title)}" loading="lazy" onerror="this.style.display='none'">
        ${isLive ? '<span class="live-badge">EN VIVO</span>' : isShort ? '<span class="short-badge">SHORT</span>' : duration ? `<span class="duration-badge">${escHtml(duration)}</span>` : ''}
      </div>
      <div class="video-info">
        ${avatar ? `<img class="channel-avatar" src="${escHtml(avatar)}" alt="${escHtml(video.uploaderName)}" loading="lazy" onclick="event.stopPropagation();${channelId ? `router.go('/channel/${channelId}')` : ''}" onerror="this.style.display='none'">` : '<div class="channel-avatar" style="background:var(--bg3)"></div>'}
        <div class="video-meta">
          <h3 class="video-title" onclick="router.go('/watch?v=${id}')">${escHtml(video.title)}</h3>
          <p class="video-channel" onclick="${channelId ? `router.go('/channel/${channelId}')` : ''}">${escHtml(video.uploaderName || '')}</p>
          <p class="video-stats">${fmtViews(video.views)}${video.uploadedDate ? ' · ' + escHtml(video.uploadedDate) : ''}</p>
        </div>
      </div>
    </article>
  `;
}

/* ===== SKELETON CARDS ===== */
function renderSkeletons(count = 12) {
  return Array(count).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton-thumb"></div>
      <div style="padding:10px 4px">
        <div class="skeleton-text" style="width:90%"></div>
        <div class="skeleton-text" style="width:60%"></div>
        <div class="skeleton-text" style="width:40%"></div>
      </div>
    </div>
  `).join('');
}

/* ===== SEARCH RESULT CARD ===== */
function renderSearchCard(item) {
  if (item.type === 'channel') return renderChannelSearchCard(item);
  const id = videoIdFromUrl(item.url);
  if (!id) return '';
  const duration = item.duration === -1 ? 'EN VIVO' : fmtDuration(item.duration);
  const channelId = channelIdFromUrl(item.uploaderUrl);
  return `
    <article class="search-result-card" onclick="router.go('/watch?v=${id}')">
      <div class="search-thumb">
        <img src="${escHtml(item.thumbnail)}" alt="${escHtml(item.title)}" loading="lazy" onerror="this.style.display='none'">
        ${duration ? `<span class="duration-badge">${escHtml(duration)}</span>` : ''}
      </div>
      <div class="search-meta">
        <h3 class="video-title">${escHtml(item.title)}</h3>
        <p class="video-stats">${fmtViews(item.views)}${item.uploadedDate ? ' · ' + escHtml(item.uploadedDate) : ''}</p>
        <p class="video-channel" onclick="event.stopPropagation();${channelId ? `router.go('/channel/${channelId}')` : ''}">${escHtml(item.uploaderName || '')}</p>
        ${item.shortDescription ? `<p class="search-description">${escHtml(item.shortDescription)}</p>` : ''}
      </div>
    </article>
  `;
}

function renderChannelSearchCard(item) {
  const channelId = channelIdFromUrl(item.url);
  if (!channelId) return '';
  return `
    <article class="channel-result-card" onclick="router.go('/channel/${channelId}')">
      <img class="channel-result-avatar" src="${escHtml(item.thumbnail || '')}" alt="${escHtml(item.name)}" loading="lazy" onerror="this.style.display='none'">
      <div class="channel-result-info">
        <p class="channel-result-name">${escHtml(item.name)}</p>
        ${item.subscribers ? `<p class="channel-result-subs">${fmtSubs(item.subscribers)}</p>` : ''}
        ${item.description ? `<p class="search-description">${escHtml(item.description)}</p>` : ''}
      </div>
    </article>
  `;
}

/* ===== RELATED VIDEO CARD ===== */
function renderRelatedCard(video) {
  const id = videoIdFromUrl(video.url);
  if (!id) return '';
  const duration = video.duration === -1 ? 'LIVE' : fmtDuration(video.duration);
  return `
    <article class="related-card" onclick="router.go('/watch?v=${id}')">
      <div class="related-thumb">
        <img src="${escHtml(video.thumbnail)}" alt="${escHtml(video.title)}" loading="lazy" onerror="this.style.display='none'">
        ${duration ? `<span class="duration-badge">${escHtml(duration)}</span>` : ''}
      </div>
      <div class="related-meta">
        <p class="related-title-text">${escHtml(video.title)}</p>
        <p class="related-channel">${escHtml(video.uploaderName || '')}</p>
        <p class="related-stats">${fmtViews(video.views)}</p>
      </div>
    </article>
  `;
}

/* ===== LOADER / ERROR ===== */
function renderLoader() {
  return `<div class="loader"><div class="spinner"></div></div>`;
}

function renderError(msg, retryFn) {
  return `
    <div class="error-box">
      <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
      <h3>Error al cargar</h3>
      <p>${escHtml(msg)}</p>
      ${retryFn ? `<button class="retry-btn" onclick="(${retryFn})()">Reintentar</button>` : ''}
    </div>
  `;
}

/* ===== TOAST ===== */
let _toastTimer;
function showToast(msg, duration = 3000) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), duration);
}

/* ===== WATCH HISTORY ===== */
const History = {
  get() { try { return JSON.parse(localStorage.getItem('watch_history') || '[]'); } catch { return []; } },
  add(video) {
    let h = this.get().filter(v => v.id !== video.id);
    h.unshift({ ...video, watchedAt: Date.now() });
    if (h.length > CONFIG.HISTORY_MAX) h = h.slice(0, CONFIG.HISTORY_MAX);
    localStorage.setItem('watch_history', JSON.stringify(h));
  },
  clear() { localStorage.removeItem('watch_history'); },
};

/* ===== NAV ACTIVE STATE ===== */
function setActiveNav(route) {
  document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.route === route);
  });
}
