'use strict';

class Router {
  constructor() {
    this._routes = {};
    this._current = null;
    window.addEventListener('hashchange', () => this._handle());
    window.addEventListener('popstate', () => this._handle());
  }

  on(path, handler) {
    this._routes[path] = handler;
    return this;
  }

  go(path) {
    window.location.hash = path;
  }

  _handle() {
    const raw = window.location.hash.slice(1) || '/';
    const qIdx = raw.indexOf('?');
    const path = qIdx >= 0 ? raw.slice(0, qIdx) : raw;
    const qs = qIdx >= 0 ? raw.slice(qIdx + 1) : '';
    const params = Object.fromEntries(new URLSearchParams(qs));
    const handler = this._routes[path] || this._routes['*'];
    if (handler) {
      this._current = { path, params };
      handler(params);
    }
  }

  start() {
    this._handle();
  }
}

const router = new Router();
