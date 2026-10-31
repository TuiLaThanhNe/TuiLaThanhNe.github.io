// ===== Core: tiện ích, dữ liệu, trạng thái người dùng, router, modal =====
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const norm = (s) => (s || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const list = (arr) => (arr && arr.length ? arr.map(esc).join(", ") : "—");
const dl = (rows) => "<dl>" + rows.map(([k, v]) => `<dt>${k}</dt><dd>${v || "—"}</dd>`).join("") + "</dl>"; // v đã được escape
const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const DATA = { antibiotics: [], microbes: [], quizzes: [], documents: [], spectrum: [], cases: [], mindmaps: [], flashcards: [], guidelines: {} };

// ---- Trạng thái người dùng (lưu localStorage) ----
const STATE_KEY = "antibio.state.v1";
const defaultState = () => ({ stars: {}, notes: {}, stats: {}, wrong: {}, srs: {}, compare: [], history: [], myMap: null });
let S = defaultState();
try { S = Object.assign(defaultState(), JSON.parse(localStorage.getItem(STATE_KEY) || "{}")); } catch {}
const save = () => localStorage.setItem(STATE_KEY, JSON.stringify(S));

async function loadJSON(path, key) {
  const bundled = window.ANTIBIO_BUNDLE && window.ANTIBIO_BUNDLE.data && key ? window.ANTIBIO_BUNDLE.data[key] : null;
  if (location.protocol === "file:" && bundled) return bundled;
  try {
    const r = await fetch(path, { cache: "no-cache" });
    if (!r.ok) throw 0;
    return await r.json();
  } catch {
    if (bundled) return bundled;
    console.warn("Không tải được", path);
    return key === "guidelines" ? {} : [];
  }
}

const getAb = (id) => DATA.antibiotics.find((a) => a.id === id);
const getMo = (id) => DATA.microbes.find((m) => m.id === id);
const activity = (abId, moId) => (DATA.spectrum.find((s) => s.antibioticId === abId && s.microbeId === moId) || {}).activity || "";

// Liên kết hai chiều kháng sinh ↔ vi sinh vật (từ antibioticIds + bảng phổ tác dụng "S")
function microbesFor(abId) {
  const ids = new Set();
  DATA.microbes.forEach((m) => (m.antibioticIds || []).includes(abId) && ids.add(m.id));
  DATA.spectrum.forEach((s) => s.antibioticId === abId && s.activity === "S" && ids.add(s.microbeId));
  return [...ids].map(getMo).filter(Boolean);
}
function antibioticsFor(moId) {
  const m = getMo(moId), ids = new Set(m ? m.antibioticIds || [] : []);
  DATA.spectrum.forEach((s) => s.microbeId === moId && s.activity === "S" && ids.add(s.antibioticId));
  return [...ids].map(getAb).filter(Boolean);
}

// ---- Toast ----
let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.hidden = true), 1800);
}

// ---- Router ----
const PAGES = {}; // tên trang -> hàm render (phải an toàn khi gọi nhiều lần)
const currentPage = () => { const p = location.hash.replace("#", "") || "home"; return $("#page-" + p) ? p : "home"; };
function route() {
  const page = currentPage();
  document.body.dataset.page = page;
  if (page !== "mindmap" && document.body.classList.contains("mm-fullscreen-mode")) {
    document.body.classList.remove("mm-fullscreen-mode");
  }
  $$(".page").forEach((p) => p.classList.toggle("active", p.id === "page-" + page));
  $$("#nav a").forEach((a) => a.classList.toggle("active", a.dataset.page === page));
  window.scrollTo(0, 0);
  if (PAGES[page]) PAGES[page]();
}
window.addEventListener("hashchange", route);

// ---- Thanh điều hướng nổi: thu gọn / mở, nhớ trạng thái ----
function setDock(collapsed) {
  document.body.classList.toggle("nav-collapsed", collapsed);
  localStorage.setItem("dockCollapsed", collapsed ? "1" : "0");
}
setDock(localStorage.getItem("dockCollapsed") === "1");
$("#dockCollapse").onclick = () => setDock(true);
$("#dockFab").onclick = () => setDock(false);

// ---- Modal ----
function showModal(html) { $("#modalBody").innerHTML = html; $("#modal").hidden = false; }
function closeModal() {
  $("#modal").hidden = true;
  renderAb(); renderMo(); // cập nhật dấu ⭐
  if (currentPage() === "progress") PAGES.progress();
}
$("#modalClose").onclick = closeModal;
$("#modal").onclick = (e) => { if (e.target.id === "modal") closeModal(); };
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("#modal").hidden) closeModal(); });

// ---- Ủy quyền sự kiện chung ----
const starLabel = (key, short) => (S.stars[key] ? (short ? "⭐" : "⭐ Đã đánh dấu") : (short ? "☆" : "☆ Đánh dấu"));
document.addEventListener("click", (e) => {
  const c = e.target.closest("[data-cmp]");
  if (c) { e.stopPropagation(); toggleCompare(c.dataset.cmp); return; }
  const s = e.target.closest("[data-star]");
  if (s) {
    const k = s.dataset.star; S.stars[k] ? delete S.stars[k] : (S.stars[k] = 1); save();
    s.textContent = starLabel(k, s.hasAttribute("data-short")); return;
  }
  const o = e.target.closest("[data-open]");
  if (o) openItem(o.dataset.open);
});
document.addEventListener("input", (e) => {
  const k = e.target.dataset && e.target.dataset.note;
  if (k) { const v = e.target.value.trim(); v ? (S.notes[k] = v) : delete S.notes[k]; save(); }
});
