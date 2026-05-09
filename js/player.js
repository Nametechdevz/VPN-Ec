'use strict';

class VideoPlayer {
  constructor(container) {
    this.container = container;
    this.hls = null;
    this.video = null;
    this._controlsTimer = null;
    this._seeking = false;
    this._volumeBeforeMute = 1;
    this._loaded = false;
    this._render();
    this._bindEvents();
    this._bindKeys();
  }

  _render() {
    this.container.innerHTML = `
      <div class="player-container" id="player-wrap">
        <video id="ytf-video" playsinline preload="metadata"></video>
        <div class="player-overlay" id="player-overlay">
          <div class="player-center-btn" id="player-center">
            <svg viewBox="0 0 24 24" fill="white" width="32" height="32"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div class="player-progress-area" id="progress-area">
            <div class="progress-bar" id="progress-bar">
              <div class="player-buffered" id="progress-buf"></div>
              <div class="progress-filled" id="progress-fill"></div>
              <div class="progress-handle" id="progress-handle" style="left:0%"></div>
            </div>
          </div>
          <div class="player-controls">
            <button class="player-btn" id="p-play" title="Reproducir/Pausar (k)">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" id="play-icon"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <button class="player-btn" id="p-skip-back" title="Retroceder 10s (←)">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M11.99 5V1l-5 5 5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6h-2c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/><text x="8" y="14" font-size="6" fill="currentColor" font-family="sans-serif" font-weight="bold">10</text></svg>
            </button>
            <button class="player-btn" id="p-skip-fwd" title="Adelantar 10s (→)">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12.01 5V1l5 5-5 5V7c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/><text x="8" y="14" font-size="6" fill="currentColor" font-family="sans-serif" font-weight="bold">10</text></svg>
            </button>
            <div class="volume-area">
              <button class="player-btn" id="p-mute" title="Silenciar (m)">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" id="vol-icon"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              </button>
              <input type="range" class="volume-slider" id="vol-slider" min="0" max="1" step="0.05" value="1">
            </div>
            <span class="player-time" id="p-time">0:00 / 0:00</span>
            <div class="player-spacer"></div>
            <select class="quality-select" id="quality-select" title="Calidad"></select>
            <select class="speed-select" id="speed-select" title="Velocidad">
              <option value="0.25">0.25x</option>
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1" selected>Normal</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>
            <button class="player-btn" id="p-pip" title="Picture in Picture">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M19 11h-8v6h8v-6zm4 10V3H1v18h22zm-2-1.98H3V4.97h18v14.05z"/></svg>
            </button>
            <button class="player-btn" id="p-fs" title="Pantalla completa (f)">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24" id="fs-icon"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;

    this.wrap = this.container.querySelector('#player-wrap');
    this.video = this.container.querySelector('#ytf-video');
    this.overlay = this.container.querySelector('#player-overlay');
  }

  _bindEvents() {
    const video = this.video;
    const wrap = this.wrap;

    // Play/pause toggle
    const playBtn = this.container.querySelector('#p-play');
    const playIcon = this.container.querySelector('#play-icon');
    const updatePlayIcon = () => {
      playIcon.innerHTML = video.paused
        ? '<path d="M8 5v14l11-7z"/>'
        : '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    };
    video.addEventListener('play', () => { updatePlayIcon(); wrap.classList.add('paused'); wrap.classList.remove('paused'); });
    video.addEventListener('pause', () => { updatePlayIcon(); wrap.classList.add('paused'); });
    video.addEventListener('playing', () => { updatePlayIcon(); wrap.classList.remove('paused'); });

    playBtn.addEventListener('click', () => this._togglePlay());
    video.addEventListener('click', () => this._togglePlay());

    // Double-tap seek on mobile
    let lastTap = 0;
    video.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTap < 300) {
        e.preventDefault();
        const x = e.changedTouches[0].clientX;
        const mid = wrap.getBoundingClientRect().width / 2;
        if (x < mid) video.currentTime -= 10;
        else video.currentTime += 10;
      }
      lastTap = now;
    });

    // Skip buttons
    this.container.querySelector('#p-skip-back').addEventListener('click', () => { video.currentTime -= 10; });
    this.container.querySelector('#p-skip-fwd').addEventListener('click', () => { video.currentTime += 10; });

    // Progress bar
    const progressArea = this.container.querySelector('#progress-area');
    const fill = this.container.querySelector('#progress-fill');
    const handle = this.container.querySelector('#progress-handle');
    const buf = this.container.querySelector('#progress-buf');

    video.addEventListener('timeupdate', () => {
      if (!video.duration || this._seeking) return;
      const pct = (video.currentTime / video.duration) * 100;
      fill.style.width = `${pct}%`;
      handle.style.left = `${pct}%`;
      this._updateTime();
    });

    video.addEventListener('progress', () => {
      if (!video.duration || !video.buffered.length) return;
      const pct = (video.buffered.end(video.buffered.length - 1) / video.duration) * 100;
      buf.style.width = `${pct}%`;
    });

    const seekTo = (e) => {
      const rect = progressArea.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      if (video.duration) video.currentTime = pct * video.duration;
      fill.style.width = `${pct * 100}%`;
      handle.style.left = `${pct * 100}%`;
    };

    progressArea.addEventListener('mousedown', (e) => {
      this._seeking = true;
      seekTo(e);
      const up = () => { this._seeking = false; document.removeEventListener('mouseup', up); document.removeEventListener('mousemove', move); };
      const move = (e) => seekTo(e);
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    });
    progressArea.addEventListener('touchstart', (e) => { this._seeking = true; seekTo(e); }, { passive: true });
    progressArea.addEventListener('touchmove', seekTo, { passive: true });
    progressArea.addEventListener('touchend', () => { this._seeking = false; });

    // Volume
    const volSlider = this.container.querySelector('#vol-slider');
    const volIcon = this.container.querySelector('#vol-icon');
    const muteBtn = this.container.querySelector('#p-mute');

    const updateVolIcon = () => {
      if (video.muted || video.volume === 0) {
        volIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>';
      } else if (video.volume < 0.5) {
        volIcon.innerHTML = '<path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>';
      } else {
        volIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
      }
    };

    video.addEventListener('volumechange', () => { volSlider.value = video.muted ? 0 : video.volume; updateVolIcon(); });
    volSlider.addEventListener('input', (e) => {
      video.volume = parseFloat(e.target.value);
      video.muted = video.volume === 0;
    });
    muteBtn.addEventListener('click', () => {
      if (video.muted) { video.muted = false; video.volume = this._volumeBeforeMute || 0.7; }
      else { this._volumeBeforeMute = video.volume; video.muted = true; }
    });

    // Restore volume from storage
    const savedVol = parseFloat(localStorage.getItem('player_volume') || '1');
    video.volume = savedVol;
    video.addEventListener('volumechange', () => { if (!video.muted) localStorage.setItem('player_volume', video.volume); });

    // Quality
    const qualitySelect = this.container.querySelector('#quality-select');
    qualitySelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (this.hls) {
        this.hls.currentLevel = parseInt(val);
      }
    });

    // Speed
    const speedSelect = this.container.querySelector('#speed-select');
    const savedSpeed = parseFloat(localStorage.getItem('player_speed') || '1');
    speedSelect.value = savedSpeed;
    video.playbackRate = savedSpeed;
    speedSelect.addEventListener('change', (e) => {
      video.playbackRate = parseFloat(e.target.value);
      localStorage.setItem('player_speed', e.target.value);
    });

    // Fullscreen
    const fsBtn = this.container.querySelector('#p-fs');
    const fsIcon = this.container.querySelector('#fs-icon');
    fsBtn.addEventListener('click', () => this._toggleFS());
    document.addEventListener('fullscreenchange', () => {
      const isFS = !!document.fullscreenElement;
      fsIcon.innerHTML = isFS
        ? '<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>'
        : '<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>';
    });

    // Picture in Picture
    const pipBtn = this.container.querySelector('#p-pip');
    pipBtn.addEventListener('click', async () => {
      try {
        if (document.pictureInPictureElement) await document.exitPictureInPicture();
        else if (video.requestPictureInPicture) await video.requestPictureInPicture();
      } catch {}
    });
    if (!document.pictureInPictureEnabled) pipBtn.style.display = 'none';

    // Auto-hide controls
    const showControls = () => {
      wrap.classList.add('show-controls');
      clearTimeout(this._controlsTimer);
      if (!video.paused) {
        this._controlsTimer = setTimeout(() => wrap.classList.remove('show-controls'), 3000);
      }
    };
    wrap.addEventListener('mousemove', showControls);
    wrap.addEventListener('touchstart', showControls, { passive: true });
    video.addEventListener('pause', () => wrap.classList.add('show-controls'));
    video.addEventListener('play', showControls);

    // Buffering indicator
    video.addEventListener('waiting', () => wrap.classList.add('buffering'));
    video.addEventListener('canplay', () => wrap.classList.remove('buffering'));

    // End of video
    video.addEventListener('ended', () => {
      wrap.classList.add('paused', 'show-controls');
      updatePlayIcon();
    });

    // Error
    video.addEventListener('error', () => {
      console.error('Video error:', video.error);
    });

    // Initial state
    wrap.classList.add('paused', 'show-controls');
    updateVolIcon();
  }

  _bindKeys() {
    document.addEventListener('keydown', (e) => {
      const tag = document.activeElement.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
      if (!this.video || !this._loaded) return;
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          this._togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.video.currentTime = Math.max(0, this.video.currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.video.currentTime = Math.min(this.video.duration || 0, this.video.currentTime + 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.video.volume = Math.min(1, this.video.volume + 0.1);
          this.video.muted = false;
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.video.volume = Math.max(0, this.video.volume - 0.1);
          break;
        case 'f':
          e.preventDefault();
          this._toggleFS();
          break;
        case 'm':
          e.preventDefault();
          this.video.muted = !this.video.muted;
          break;
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
          e.preventDefault();
          if (this.video.duration) this.video.currentTime = (parseInt(e.key) / 10) * this.video.duration;
          break;
      }
    });
  }

  _togglePlay() {
    if (this.video.paused) this.video.play().catch(() => {});
    else this.video.pause();
  }

  _toggleFS() {
    if (document.fullscreenElement) document.exitFullscreen();
    else this.wrap.requestFullscreen().catch(() => {});
  }

  _updateTime() {
    const v = this.video;
    const el = this.container.querySelector('#p-time');
    if (el) el.textContent = `${fmt(v.currentTime)} / ${fmt(v.duration)}`;
    function fmt(s) {
      if (!s || isNaN(s)) return '0:00';
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = Math.floor(s % 60).toString().padStart(2, '0');
      return h > 0 ? `${h}:${m.toString().padStart(2, '0')}:${sec}` : `${m}:${sec}`;
    }
  }

  async load(streamData) {
    this._destroyHLS();
    const { hls, videoStreams } = streamData;

    if (hls) {
      if (typeof Hls === 'undefined') {
        await this._loadHLSJS();
      }
      if (Hls.isSupported()) {
        this._loadWithHLSJS(hls);
      } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
        this.video.src = hls;
        this._loaded = true;
        await this.video.play().catch(() => {});
      }
    } else if (videoStreams && videoStreams.length > 0) {
      const best = videoStreams.sort((a, b) => (b.height || 0) - (a.height || 0))[0];
      this.video.src = best.url;
      this._loaded = true;
      await this.video.play().catch(() => {});
    }
  }

  _loadWithHLSJS(url) {
    this.hls = new Hls({
      enableWorker: true,
      lowLatencyMode: false,
      backBufferLength: 90,
    });
    this.hls.loadSource(url);
    this.hls.attachMedia(this.video);
    this.hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
      this._loaded = true;
      this._setupQualities(data.levels);
      this.video.play().catch(() => {});
    });
    this.hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) this.hls.startLoad();
        else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) this.hls.recoverMediaError();
        else this._destroyHLS();
      }
    });
  }

  _setupQualities(levels) {
    const sel = this.container.querySelector('#quality-select');
    sel.innerHTML = '<option value="-1">Auto</option>';
    levels.forEach((level, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `${level.height}p`;
      sel.appendChild(opt);
    });
    const saved = localStorage.getItem('player_quality');
    if (saved) { sel.value = saved; if (this.hls) this.hls.currentLevel = parseInt(saved); }
    sel.addEventListener('change', (e) => {
      if (this.hls) this.hls.currentLevel = parseInt(e.target.value);
      localStorage.setItem('player_quality', e.target.value);
    });
  }

  _loadHLSJS() {
    return new Promise((resolve, reject) => {
      if (typeof Hls !== 'undefined') return resolve();
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.13/dist/hls.min.js';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  _destroyHLS() {
    if (this.hls) { this.hls.destroy(); this.hls = null; }
    if (this.video) { this.video.pause(); this.video.src = ''; this.video.load(); }
    this._loaded = false;
  }

  destroy() {
    this._destroyHLS();
    document.removeEventListener('keydown', this._keyHandler);
  }
}
