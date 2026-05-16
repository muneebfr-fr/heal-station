export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node.js 25 exposes localStorage globally but packages expect it to either
    // not exist or be safe to call. Stub it out on the server.
    const noop = () => null;
    const store = {};
    if (typeof globalThis.localStorage === "undefined" || typeof globalThis.localStorage.getItem !== "function") {
      globalThis.localStorage = {
        getItem: (k) => store[k] ?? null,
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
        clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
        key: (i) => Object.keys(store)[i] ?? null,
        get length() { return Object.keys(store).length; },
      };
    }
    if (typeof globalThis.sessionStorage === "undefined" || typeof globalThis.sessionStorage.getItem !== "function") {
      const ss = {};
      globalThis.sessionStorage = {
        getItem: (k) => ss[k] ?? null,
        setItem: (k, v) => { ss[k] = String(v); },
        removeItem: (k) => { delete ss[k]; },
        clear: () => { Object.keys(ss).forEach((k) => delete ss[k]); },
        key: (i) => Object.keys(ss)[i] ?? null,
        get length() { return Object.keys(ss).length; },
      };
    }
  }
}
