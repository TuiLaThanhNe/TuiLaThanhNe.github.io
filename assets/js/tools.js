// ===== Tìm kiếm mờ, trang chủ, tiến độ, sao lưu =====

// ---------- Tìm kiếm (không dấu, chịu sai chính tả nhẹ, tìm theo bệnh/chỉ định/cơ chế/phác đồ) ----------
let SEARCH_INDEX = [];
function buildSearchIndex() {
  SEARCH_INDEX = [
    ...DATA.antibiotics.map((a) => ({ key: "ab:" + a.id, icon: "💊", label: a.name, sub: a.class + (a.aware ? " · " + a.aware : ""), name: norm(a.name + " " + (a.brandNames || []).join(" ")),
      text: norm([a.class, a.aware, a.mechanism, a.spectrum, a.dosing, a.notes, ...(a.indications || []), ...(a.sideEffects || [])].join(" ")) })),
    ...DATA.microbes.map((m) => ({ key: "mo:" + m.id, icon: "🦠", label: m.name, sub: (m.commonName || "") + " · " + (m.whoPriority || m.gram || ""), name: norm(m.name + " " + (m.commonName || "")),
      text: norm([m.gram, m.shape, m.whoPriority, m.characteristics, m.resistance, m.notes, ...(m.diseases || [])].join(" ")) })),
    ...(DATA.drugs || []).map((d) => ({ key: "dr:" + d.id, icon: "📚", label: d.name, sub: d.system + " · " + d.class, name: norm(d.name + " " + (d.brandNames || []).join(" ")),
      text: norm([d.system, d.class, d.mechanism, d.pharmacokinetics, d.notes, ...(d.indications || []), ...(d.contraindications || []), ...(d.sideEffects || [])].join(" ")) })),
  ];
}
function lev(a, b) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
function tokenScore(tok, str) {
  if (str.includes(tok)) return 2;
  if (tok.length >= 4) for (const w of str.split(/\s+/)) if (Math.abs(w.length - tok.length) <= 1 && lev(w, tok) <= 1) return 1;
  return 0;
}
function fuzzySearch(q) {
  const toks = norm(q).split(/\s+/).filter(Boolean);
  if (!toks.length) return [];
  return SEARCH_INDEX.map((e) => {
    let score = 0;
    for (const t of toks) {
      const n = tokenScore(t, e.name), x = tokenScore(t, e.text);
      if (!n && !x) return null;
      score += n ? 3 + n : x;
    }
    return { e, score };
  }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 10).map((x) => x.e);
}
$("#globalSearch").oninput = (e) => {
  const out = $("#globalResults"), q = e.target.value.trim();
  if (!q) { out.innerHTML = ""; return; }
  const r = fuzzySearch(q);
  out.innerHTML = r.map((x) => `<div data-open="${x.key}">${x.icon} <b>${esc(x.label)}</b> <span class="muted">${esc(x.sub)}</span></div>`).join("") || '<div class="muted">Không tìm thấy.</div>';
};

// ---------- Trang chủ ----------
PAGES.home = () => {
  $("#countAb").textContent = DATA.antibiotics.length + " kháng sinh";
  const drEl = $("#countDrug");
  if (drEl) drEl.textContent = (DATA.drugs || []).length + " thuốc · " + (DATA.pharmaco_quizzes || []).length + " câu trắc nghiệm";
  $("#countMo").textContent = DATA.microbes.length + " vi sinh vật";
  $("#countQz").textContent = DATA.quizzes.length + " câu hỏi";
  $("#countCase").textContent = DATA.cases.length + " ca lâm sàng";
  $("#countFc").textContent = CARDS.length + " thẻ nhớ";
  const mmEl = $("#countMm");
  if (mmEl) mmEl.textContent = DATA.mindmaps.length + " sơ đồ";
  const due = CARDS.filter(isDue).length, wrong = Object.keys(S.wrong).length;
  $("#todayBox").innerHTML = `<a class="pill" href="#pharmacology">📚 Học Dược lý học & Làm trắc nghiệm</a><a class="pill" href="#flashcards">🗂️ ${due} thẻ cần ôn hôm nay</a><a class="pill" href="#quiz" id="goWrong">❌ ${wrong} câu sai cần ôn lại</a><a class="pill" href="#guidelines">🧭 Tra cứu Phác đồ IDSA 2024 & MIC EUCAST v16.1</a>`;
};

// ---------- Tiến độ & dữ liệu cá nhân ----------
function downloadJSON(obj, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" }));
  a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
PAGES.progress = () => {
  const topics = Object.entries(S.stats), tot = topics.reduce((s, [, v]) => s + v.total, 0), right = topics.reduce((s, [, v]) => s + v.right, 0);
  const boxes = [0, 0, 0, 0, 0, 0]; let fresh = 0;
  CARDS.forEach((c) => (S.srs[c.id] ? boxes[S.srs[c.id].box]++ : fresh++));
  const starred = Object.keys(S.stars), noted = Object.keys(S.notes);
  const label = (k) => { const [t, id] = k.split(":"); return t === "ab" ? (getAb(id) || {}).name : t === "mo" ? (getMo(id) || {}).name : t === "q" ? ((DATA.quizzes.find((q) => q.id === id) || {}).question || "").slice(0, 50) : id; };
  const chips = (keys) => keys.map((k) => (/^(ab|mo):/.test(k) ? chip(k, esc(label(k) || k)) : `<span class="chip">${esc(label(k) || k)}</span>`)).join("") || '<span class="muted">Chưa có.</span>';
  $("#progressBox").innerHTML = `
  <div class="stats">
    <div class="stat"><b>${tot}</b>Câu đã làm</div>
    <div class="stat"><b>${tot ? Math.round((right / tot) * 100) : 0}%</b>Chính xác</div>
    <div class="stat"><b>${Object.keys(S.wrong).length}</b>Câu sai cần ôn</div>
    <div class="stat"><b>${CARDS.filter(isDue).length}</b>Thẻ đến hạn</div>
  </div>
  <div class="panel"><h3>Theo chủ đề</h3>${topics.map(([t, v]) => { const p = Math.round((v.right / v.total) * 100); return `<div>${esc(t)} — ${v.right}/${v.total} (${p}%)</div><div class="bar"><span style="width:${p}%"></span></div>`; }).join("") || '<p class="muted">Chưa có dữ liệu. Hãy làm vài câu ôn luyện!</p>'}
    <button class="btn small-btn ghost" id="pgWrong">Ôn các câu sai</button></div>
  <div class="panel"><h3>Flashcard (hộp Leitner)</h3><p>Mới: <b>${fresh}</b> · ${boxes.map((n, i) => `Hộp ${i}: <b>${n}</b>`).join(" · ")}</p></div>
  <div class="panel"><h3>⭐ Đã đánh dấu</h3>${chips(starred)}</div>
  <div class="panel"><h3>📝 Có ghi chú</h3>${chips(noted)}</div>
  <div class="panel"><h3>Lịch sử gần đây</h3>${S.history.slice(-5).reverse().map((h) => `<div class="muted">${new Date(h.t).toLocaleString("vi-VN")} · ${h.mode} · ${h.score}/${h.total}</div>`).join("") || '<span class="muted">Chưa có.</span>'}</div>
  <div class="panel"><h3>Sao lưu / chuyển máy</h3><p class="muted small">Gồm tiến độ, ghi chú, đánh dấu, mind map của bạn và theme.</p>
    <div class="row-actions"><button class="btn small-btn" id="expBtn">⬇️ Xuất file</button>
    <button class="btn small-btn ghost" id="impBtn">⬆️ Nhập file</button><input type="file" id="impFile" accept="application/json" hidden>
    <button class="btn small-btn danger" id="resetBtn">Xóa toàn bộ tiến độ</button></div></div>`;
  $("#pgWrong").onclick = () => { location.hash = "#quiz"; $("#quizMode").value = "wrong"; $("#quizMode").onchange(); startQuiz(); };
  $("#expBtn").onclick = () => downloadJSON({ app: "antibio", version: 1, state: S, theme: localStorage.getItem("theme"), customTheme: localStorage.getItem("customTheme") }, "antibio-backup.json");
  $("#impBtn").onclick = () => $("#impFile").click();
  $("#impFile").onchange = async (e) => {
    try {
      const d = JSON.parse(await e.target.files[0].text());
      if (d.app !== "antibio" || typeof d.state !== "object") throw 0;
      S = Object.assign(defaultState(), d.state); save();
      if (d.theme) localStorage.setItem("theme", d.theme);
      if (d.customTheme) localStorage.setItem("customTheme", d.customTheme);
      location.reload();
    } catch { toast("File không hợp lệ"); }
  };
  $("#resetBtn").onclick = () => { if (confirm("Xóa toàn bộ tiến độ, ghi chú, đánh dấu?")) { S = defaultState(); save(); PAGES.progress(); } };
};

// ---------- PWA (dùng offline; chỉ hoạt động trên https/localhost) ----------
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").then((reg) => reg.update()).catch(() => {});
}
