'use strict';

class PipedAPI {
  constructor() {
    this.instances = CONFIG.PIPED_INSTANCES.slice();
    this.currentInstance = localStorage.getItem('piped_instance') || this.instances[0];
    this.region = localStorage.getItem('piped_region') || CONFIG.DEFAULT_REGION;
  }

  setInstance(url) {
    this.currentInstance = url;
    localStorage.setItem('piped_instance', url);
  }

  setRegion(code) {
    this.region = code;
    localStorage.setItem('piped_region', code);
  }

  async _fetch(url, retries = 0) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch(url, { signal: ctrl.signal });
      clearTimeout(t);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (retries < this.instances.length - 1) {
        const nextIdx = (this.instances.indexOf(this.currentInstance) + 1) % this.instances.length;
        this.currentInstance = this.instances[nextIdx];
        console.warn(`Switching to ${this.currentInstance}`);
        const newUrl = url.replace(/^https?:\/\/[^/]+/, this.currentInstance);
        return this._fetch(newUrl, retries + 1);
      }
      throw err;
    }
  }

  get(path, params = {}) {
    const url = new URL(this.currentInstance + path);
    Object.entries(params).forEach(([k, v]) => v != null && url.searchParams.set(k, v));
    return this._fetch(url.toString());
  }

  getTrending() {
    return this.get('/trending', { region: this.region });
  }

  search(query, filter = 'all', nextpage = null) {
    return this.get('/search', { q: query, filter, nextpage });
  }

  getStreams(videoId) {
    return this.get(`/streams/${videoId}`);
  }

  getChannel(channelId) {
    return this.get(`/channel/${channelId}`);
  }

  getChannelNextPage(channelId, nextpage) {
    return this.get(`/nextpage/channel/${channelId}`, { nextpage });
  }

  getPlaylist(playlistId) {
    return this.get(`/playlists/${playlistId}`);
  }

  getComments(videoId) {
    return this.get(`/comments/${videoId}`);
  }

  async getSuggestions(query) {
    const data = await this.get('/opensearch/suggestions', { query });
    return Array.isArray(data) && Array.isArray(data[1]) ? data[1] : [];
  }

  async pingInstance(url) {
    const start = performance.now();
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 5000);
      await fetch(`${url}/trending?region=US`, { signal: ctrl.signal });
      clearTimeout(t);
      return Math.round(performance.now() - start);
    } catch {
      return null;
    }
  }
}

const api = new PipedAPI();
