'use strict';

/* ===== STATE ===== */
let currentPlayer = null;
let deferredInstallPrompt = null;

/* ===== MAIN VIEW CONTAINER ===== */
const view = () => document.getElementById('page-view');

function setView(html) {
  if (currentPlayer) { currentPlayer.destroy(); currentPlayer = null; }
  view().innerHTML = html;
  window.scrollTo(0, 0);
}

/* ===== HOME / TRENDING ===== */
async function loadHome() {
  setActiveNav('home');
  setView(`<div class="page-header">Inicio</div><div class="video-grid">${renderSkeletons()}</div>`);
  try {
    const videos = await api.getTrending();
    const grid = view().querySelector('.video-grid');
    if (!videos || !videos.length) { grid.innerHTML = renderError('Sin videos de tendencias'); return; }
    grid.innerHTML = videos.map(renderVideoCard).join('');
  } catch (err) {
    view().querySelector('.video-grid').innerHTML = renderError(err.message, 'loadHome');
  }
}

async function loadTrending() {
  setActiveNav('trending');
  setView(`<div class="page-header">Tendencias</div><div class="video-grid">${renderSkeletons()}</div>`);
  try {
    const videos = await api.getTrending();
    const grid = view().querySelector('.video-grid');
    if (!videos || !videos.length) { grid.innerHTML = renderError('Sin tendencias'); return; }
    grid.innerHTML = videos.map(renderVideoCard).join('');
  } catch (err) {
    view().querySelector('.video-grid').innerHTML = renderError(err.message, 'loadTrending');
  }
}

/* ===== SEARCH ===== */
let searchNextpage = null;
let searchCurrentQuery = '';
let searchCurrentFilter = 'all';

function renderSearchPage(query = '') {
  setActiveNav('search');
  setView(`
    <div class="filter-bar">
      <button class="filter-chip active" data-filter="all">Todo</button>
      <button class="filter-chip" data-filter="videos">Videos</button>
      <button class="filter-chip" data-filter="channels">Canales</button>
      <button class="filter-chip" data-filter="playlists">Playlists</button>
    </div>
    <div class="search-results-list" id="search-results">
      ${query ? renderLoader() : '<p style="text-align:center;color:var(--text3);padding:40px">Escribe algo para buscar</p>'}
    </div>
  `);

  view().querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      view().querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      searchCurrentFilter = chip.dataset.filter;
      if (searchCurrentQuery) doSearch(searchCurrentQuery, searchCurrentFilter, true);
    });
  });

  if (query) {
    searchCurrentQuery = query;
    doSearch(query, searchCurrentFilter, true);
  }
}

async function doSearch(query, filter = 'all', reset = false) {
  const resultsEl = document.getElementById('search-results');
  if (!resultsEl) return;
  if (reset) {
    searchNextpage = null;
    resultsEl.innerHTML = renderLoader();
  }
  try {
    const data = await api.search(query, filter, reset ? null : searchNextpage);
    searchNextpage = data.nextpage || null;
    const items = data.items || [];
    if (reset) {
      if (!items.length) {
        resultsEl.innerHTML = '<p style="text-align:center;color:var(--text3);padding:40px">Sin resultados</p>';
        return;
      }
      resultsEl.innerHTML = items.map(renderSearchCard).join('');
    } else {
      const loader = resultsEl.querySelector('.loader');
      if (loader) loader.remove();
      items.forEach(item => { resultsEl.insertAdjacentHTML('beforeend', renderSearchCard(item)); });
    }
    if (searchNextpage) {
      const existing = resultsEl.querySelector('.load-more-btn');
      if (existing) existing.remove();
      const btn = document.createElement('button');
      btn.className = 'load-more-btn';
      btn.textContent = 'Cargar más';
      btn.onclick = () => { btn.textContent = 'Cargando...'; btn.disabled = true; doSearch(query, filter, false); };
      resultsEl.appendChild(btn);
    }
  } catch (err) {
    if (resultsEl) resultsEl.innerHTML = renderError(err.message, `()=>doSearch('${query}','${filter}',true)`);
  }
}

/* ===== WATCH PAGE ===== */
async function loadWatch(videoId) {
  setActiveNav('');
  document.getElementById('search-input').value = '';

  setView(`
    <div class="watch-layout">
      <div>
        <div id="player-mount" style="width:100%;border-radius:12px;overflow:hidden;background:#000;aspect-ratio:16/9"></div>
        <div class="video-info-section">
          ${renderLoader()}
        </div>
      </div>
      <aside>
        <p class="related-title">A continuación</p>
        <div id="related-mount">${renderSkeletons(8)}</div>
      </aside>
    </div>
  `);

  const playerMount = document.getElementById('player-mount');
  currentPlayer = new VideoPlayer(playerMount);

  try {
    const data = await api.getStreams(videoId);

    // Save to history
    History.add({
      id: videoId,
      title: data.title,
      thumbnail: data.thumbnailUrl,
      uploaderName: data.uploader,
      uploaderUrl: data.uploaderUrl,
      views: data.views,
      duration: data.duration,
    });

    // Load video
    await currentPlayer.load(data);

    // Render info
    const infoSection = view().querySelector('.video-info-section');
    const channelId = channelIdFromUrl(data.uploaderUrl);
    infoSection.innerHTML = `
      <h1 class="video-watch-title">${escHtml(data.title)}</h1>
      <div class="view-count-bar">
        <span>${fmtViews(data.views)} · ${data.uploadDate ? escHtml(data.uploadDate) : ''}</span>
      </div>
      <div class="video-actions">
        <div class="action-group">
          <button class="action-btn" id="like-btn" title="Me gusta">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
            ${fmtLikes(data.likes)}
          </button>
          <div class="action-divider"></div>
          <button class="action-btn" id="dislike-btn" title="No me gusta">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/></svg>
            ${data.dislikes && data.dislikes > 0 ? fmtLikes(data.dislikes) : ''}
          </button>
        </div>
        <button class="share-btn" id="share-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
          Compartir
        </button>
      </div>
      <div class="channel-bar">
        ${data.uploaderAvatar ? `<img class="channel-bar-avatar" src="${escHtml(data.uploaderAvatar)}" alt="${escHtml(data.uploader)}" onerror="this.style.display='none'" onclick="${channelId ? `router.go('/channel/${channelId}')` : ''}">` : ''}
        <div class="channel-bar-info" onclick="${channelId ? `router.go('/channel/${channelId}')` : ''}">
          <p class="channel-bar-name">${escHtml(data.uploader)}</p>
          ${data.uploaderSubscriberCount ? `<p class="channel-bar-subs">${fmtSubs(data.uploaderSubscriberCount)}</p>` : ''}
        </div>
        <button class="subscribe-btn" id="sub-btn">Suscribirse</button>
      </div>
      <div class="description-box" id="desc-box">
        <p class="description-date">${data.uploadDate ? escHtml(data.uploadDate) : ''}</p>
        <div class="description-text" id="desc-text">${escHtml(data.description || 'Sin descripción').replace(/\n/g,'<br>')}</div>
        <p class="description-toggle" id="desc-toggle">Mostrar más</p>
      </div>
      <div class="comments-section" id="comments-section">
        ${renderLoader()}
      </div>
    `;

    // Related videos
    const relatedMount = document.getElementById('related-mount');
    if (data.relatedStreams && data.relatedStreams.length) {
      relatedMount.innerHTML = data.relatedStreams.map(renderRelatedCard).join('');
    }

    // Description toggle
    const descBox = document.getElementById('desc-box');
    const descText = document.getElementById('desc-text');
    const descToggle = document.getElementById('desc-toggle');
    descBox.addEventListener('click', () => {
      const expanded = descText.classList.toggle('expanded');
      descToggle.textContent = expanded ? 'Mostrar menos' : 'Mostrar más';
    });

    // Like button
    document.getElementById('like-btn').addEventListener('click', function() {
      this.classList.toggle('liked');
      showToast(this.classList.contains('liked') ? 'Agregado a Me gusta' : 'Quitado de Me gusta');
    });

    // Subscribe button
    document.getElementById('sub-btn').addEventListener('click', function() {
      this.classList.toggle('subscribed');
      this.textContent = this.classList.contains('subscribed') ? 'Suscrito ✓' : 'Suscribirse';
      showToast(this.classList.contains('subscribed') ? `Suscrito a ${data.uploader}` : 'Suscripción cancelada');
    });

    // Share button
    document.getElementById('share-btn').addEventListener('click', () => {
      const shareUrl = `https://www.youtube.com/watch?v=${videoId}`;
      if (navigator.share) {
        navigator.share({ title: data.title, url: shareUrl }).catch(() => {});
      } else {
        navigator.clipboard.writeText(shareUrl).then(() => showToast('Enlace copiado'));
      }
    });

    // Load comments async
    loadComments(videoId);

  } catch (err) {
    const infoSection = view().querySelector('.video-info-section');
    if (infoSection) infoSection.innerHTML = renderError(err.message, `()=>loadWatch('${videoId}')`);
  }
}

async function loadComments(videoId) {
  const el = document.getElementById('comments-section');
  if (!el) return;
  try {
    const data = await api.getComments(videoId);
    if (!data || !data.comments || !data.comments.length) {
      el.innerHTML = '<p style="color:var(--text3);font-size:.88rem">Los comentarios no están disponibles</p>';
      return;
    }
    el.innerHTML = `
      <h2 class="comments-header">${data.commentCount ? fmtLikes(data.commentCount) + ' comentarios' : 'Comentarios'}</h2>
      ${data.comments.slice(0, 20).map(c => `
        <div class="comment-card">
          <img class="comment-avatar" src="${escHtml(c.thumbnail || '')}" alt="${escHtml(c.author)}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23555%22><circle cx=%2212%22 cy=%2212%22 r=%2212%22/></svg>'">
          <div class="comment-body">
            <p class="comment-author">${escHtml(c.author)} <span style="color:var(--text3);font-weight:400;font-size:.78rem">${c.commentedTime ? '· ' + escHtml(c.commentedTime) : ''}</span></p>
            <p class="comment-text">${escHtml(c.commentText || '').replace(/\n/g,'<br>')}</p>
            <div class="comment-actions">
              <span class="comment-like">👍 ${c.likeCount ? fmtLikes(c.likeCount) : ''}</span>
            </div>
          </div>
        </div>
      `).join('')}
    `;
  } catch {
    if (el) el.innerHTML = '';
  }
}

/* ===== CHANNEL PAGE ===== */
async function loadChannel(channelId) {
  setActiveNav('');
  setView(renderLoader());
  try {
    const data = await api.getChannel(channelId);
    view().innerHTML = `
      ${data.bannerUrl ? `<div class="channel-banner"><img src="${escHtml(data.bannerUrl)}" alt="Banner" loading="lazy"></div>` : ''}
      <div class="channel-header">
        ${data.avatarUrl ? `<img class="channel-page-avatar" src="${escHtml(data.avatarUrl)}" alt="${escHtml(data.name)}">` : ''}
        <div class="channel-page-info">
          <h1 class="channel-page-name">${escHtml(data.name)}</h1>
          <p class="channel-page-stats">${data.subscriberCount ? fmtSubs(data.subscriberCount) : ''}</p>
          ${data.description ? `<p class="channel-page-desc">${escHtml(data.description)}</p>` : ''}
        </div>
        <button class="subscribe-btn" onclick="this.classList.toggle('subscribed');this.textContent=this.classList.contains('subscribed')?'Suscrito ✓':'Suscribirse';showToast(this.classList.contains('subscribed')?'Suscrito':'Suscripción cancelada')">Suscribirse</button>
      </div>
      <div class="video-grid" id="channel-videos">
        ${data.relatedStreams && data.relatedStreams.length ? data.relatedStreams.map(renderVideoCard).join('') : renderSkeletons(8)}
      </div>
    `;
  } catch (err) {
    setView(renderError(err.message, `()=>loadChannel('${channelId}')`));
  }
}

/* ===== LIBRARY PAGE ===== */
function loadLibrary() {
  setActiveNav('library');
  const history = History.get();
  setView(`
    <div class="library-section">
      <div class="library-header">
        <h2>Historial</h2>
        ${history.length ? `<button class="clear-history-btn" id="clear-history">Borrar historial</button>` : ''}
      </div>
      ${history.length
        ? `<div class="video-grid">${history.map(v => renderVideoCard({ url: `/watch?v=${v.id}`, title: v.title, thumbnail: v.thumbnail, uploaderName: v.uploaderName, uploaderUrl: v.uploaderUrl, duration: v.duration, views: v.views, uploadedDate: v.uploadedDate })).join('')}</div>`
        : `<div class="empty-state">
            <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64"><path d="M11 17H9V8l-3 2.92L4.6 9.5 9 5l4.4 4.5L12 10.92 11 8v9zm4-8h2v9l3-2.92 1.4 1.42L17 22l-4.4-4.5 1.4-1.42L15 18.99V9z"/></svg>
            <p>Sin historial de reproducción</p>
           </div>`
      }
    </div>
  `);

  const clearBtn = document.getElementById('clear-history');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      History.clear();
      loadLibrary();
      showToast('Historial borrado');
    });
  }
}

/* ===== SETTINGS PAGE ===== */
async function loadSettings() {
  setActiveNav('settings');
  const savedInstance = localStorage.getItem('piped_instance') || api.instances[0];
  const savedRegion = api.region;

  setView(`
    <div class="settings-page">
      <h2 class="settings-title">Configuración</h2>

      <div class="settings-group">
        <p class="settings-group-title">Instancia de Piped</p>
        <p style="font-size:.82rem;color:var(--text3);margin-bottom:12px">Piped extrae el contenido de YouTube sin anuncios ni rastreo.</p>
        <div class="instance-list" id="instance-list">
          ${api.instances.map(url => `
            <div class="instance-item ${url === savedInstance ? 'selected' : ''}" data-url="${url}">
              <div class="instance-radio"></div>
              <div>
                <p class="instance-name">${url.replace('https://', '')}</p>
              </div>
              <span class="instance-ping" id="ping-${btoa(url).replace(/=/g,'')}">...</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="settings-group">
        <p class="settings-group-title">Región de tendencias</p>
        <div class="settings-item">
          <div class="settings-item-info">
            <p class="settings-item-label">País</p>
            <p class="settings-item-desc">Afecta los videos en Inicio y Tendencias</p>
          </div>
          <select class="settings-select" id="region-select">
            ${CONFIG.REGIONS.map(r => `<option value="${r.code}" ${r.code === savedRegion ? 'selected' : ''}>${r.name}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="settings-group">
        <p class="settings-group-title">Acerca de</p>
        <div class="settings-item">
          <div class="settings-item-info">
            <p class="settings-item-label">YTFree v${CONFIG.VERSION}</p>
            <p class="settings-item-desc">YouTube sin anuncios usando Piped API · PWA instalable</p>
          </div>
        </div>
      </div>
    </div>
  `);

  // Instance selection
  document.querySelectorAll('.instance-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.instance-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      api.setInstance(item.dataset.url);
      showToast('Instancia cambiada');
    });
  });

  // Region selection
  document.getElementById('region-select').addEventListener('change', (e) => {
    api.setRegion(e.target.value);
    showToast('Región actualizada');
  });

  // Ping instances
  api.instances.forEach(async url => {
    const key = btoa(url).replace(/=/g, '');
    const el = document.getElementById(`ping-${key}`);
    if (!el) return;
    const ms = await api.pingInstance(url);
    if (!el.isConnected) return;
    if (ms === null) { el.textContent = 'Sin respuesta'; el.className = 'instance-ping'; }
    else { el.textContent = `${ms}ms`; el.className = `instance-ping ${ms < 500 ? 'fast' : 'slow'}`; }
  });
}

/* ===== SEARCH AUTOCOMPLETE ===== */
let _suggestTimer;
const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions-box');

searchInput.addEventListener('input', () => {
  clearTimeout(_suggestTimer);
  const q = searchInput.value.trim();
  if (!q) { suggestionsBox.innerHTML = ''; suggestionsBox.classList.add('hidden'); return; }
  _suggestTimer = setTimeout(async () => {
    try {
      const suggestions = await api.getSuggestions(q);
      if (!suggestions.length) { suggestionsBox.classList.add('hidden'); return; }
      suggestionsBox.innerHTML = suggestions.slice(0, 8).map(s => `
        <li role="option" tabindex="0">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          ${escHtml(s)}
        </li>
      `).join('');
      suggestionsBox.classList.remove('hidden');
      suggestionsBox.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => {
          searchInput.value = li.textContent.trim();
          suggestionsBox.classList.add('hidden');
          performSearch(li.textContent.trim());
        });
      });
    } catch {}
  }, 300);
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrapper')) suggestionsBox.classList.add('hidden');
});

/* ===== SEARCH FORM ===== */
document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const q = searchInput.value.trim();
  if (q) performSearch(q);
});

function performSearch(query) {
  suggestionsBox.classList.add('hidden');
  router.go(`/search?q=${encodeURIComponent(query)}`);
}

/* ===== MOBILE SEARCH TOGGLE ===== */
document.getElementById('search-toggle-mobile').addEventListener('click', () => {
  const center = document.getElementById('header-center');
  center.classList.toggle('mobile-show');
  if (center.classList.contains('mobile-show')) searchInput.focus();
});

/* ===== SIDEBAR TOGGLE ===== */
const sidebar = document.getElementById('sidebar');
let sidebarOverlay = document.createElement('div');
sidebarOverlay.id = 'sidebar-overlay';
document.body.appendChild(sidebarOverlay);

document.getElementById('sidebar-toggle').addEventListener('click', () => {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('active');
  } else {
    sidebar.classList.toggle('collapsed');
    document.getElementById('app').style.gridTemplateColumns =
      sidebar.classList.contains('collapsed') ? `${getComputedStyle(document.documentElement).getPropertyValue('--sidebar-mini')} 1fr` : `${getComputedStyle(document.documentElement).getPropertyValue('--sidebar-w')} 1fr`;
  }
});

sidebarOverlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('active');
});

/* ===== ROUTER ===== */
router
  .on('/', () => loadHome())
  .on('/trending', () => loadTrending())
  .on('/search', ({ q }) => { if (q) searchInput.value = decodeURIComponent(q); renderSearchPage(q ? decodeURIComponent(q) : ''); })
  .on('/watch', ({ v }) => { if (v) loadWatch(v); else router.go('/'); })
  .on('/channel', (params) => {
    const id = Object.keys(params)[0];
    if (id) loadChannel(id);
    else router.go('/');
  })
  .on('/library', () => loadLibrary())
  .on('/settings', () => loadSettings())
  .on('*', () => router.go('/'));

/* ===== HANDLE CHANNEL ROUTES ===== */
// Override channel route to handle /channel/UCxxxxxx format
const origHandle = router._handle.bind(router);
router._handle = function() {
  const raw = window.location.hash.slice(1) || '/';
  const m = raw.match(/^\/channel\/([^/?]+)/);
  if (m) { loadChannel(m[1]); return; }
  origHandle();
};

/* ===== PWA INSTALL ===== */
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const banner = document.getElementById('install-banner');
  const dismissed = localStorage.getItem('install_dismissed');
  if (!dismissed) banner.style.display = 'flex';
});

document.getElementById('install-btn').addEventListener('click', async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  const { outcome } = await deferredInstallPrompt.userChoice;
  if (outcome === 'accepted') showToast('¡App instalada!');
  deferredInstallPrompt = null;
  document.getElementById('install-banner').style.display = 'none';
});

document.getElementById('install-dismiss').addEventListener('click', () => {
  document.getElementById('install-banner').style.display = 'none';
  localStorage.setItem('install_dismissed', '1');
});

/* ===== SERVICE WORKER ===== */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

/* ===== START ===== */
router.start();
