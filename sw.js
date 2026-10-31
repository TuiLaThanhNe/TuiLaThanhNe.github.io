// Service worker: dùng offline. Dữ liệu/mã nguồn: ưu tiên mạng, rơi về cache khi mất mạng.
const CACHE = "antibio-v5";
const SHELL = ["./", "index.html", "manifest.webmanifest", "assets/icon.svg", "assets/css/style.css",
  "data/bundle.js", "assets/js/core.js", "assets/js/theme.js", "assets/js/browse.js", "assets/js/study.js", "assets/js/mindmap.js", "assets/js/tools.js", "assets/js/main.js",
  "data/antibiotics.json", "data/microbes.json", "data/quizzes.json", "data/spectrum.json", "data/cases.json", "data/mindmaps.json", "data/flashcards.json", "data/guidelines.json"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request)));
});
