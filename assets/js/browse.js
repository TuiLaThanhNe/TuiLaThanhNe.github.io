// ===== Duyệt dữ liệu: kháng sinh, vi sinh vật, chi tiết, so sánh, phổ tác dụng, phác đồ/MIC, tài liệu =====
function fillSelect(sel, values) {
  const el = $(sel); if (!el) return;
  const first = el.options[0] ? el.options[0].outerHTML : "";
  el.innerHTML = first;
  [...new Set(values.filter(Boolean))].sort().forEach((v) => {
    const o = document.createElement("option"); o.value = o.textContent = v; el.appendChild(o);
  });
}

const awareBadge = (aw) => {
  if (!aw) return "";
  const cls = aw === "Reserve" ? "b-res" : aw === "Watch" ? "b-wat" : "b-acc";
  const lbl = aw === "Reserve" ? "🔴 Reserve (Dự trữ)" : aw === "Watch" ? "🟡 Watch (Theo dõi)" : "🟢 Access (Tiếp cận)";
  return `<span class="tag ${cls}">${lbl}</span>`;
};
const priorityBadge = (p) => {
  if (!p) return "";
  const cls = p.includes("Critical") ? "b-crit" : p.includes("High") ? "b-high" : p.includes("Medium") ? "b-med" : "";
  return `<span class="tag ${cls}">WHO: ${esc(p)}</span>`;
};

// ---------- Chi tiết (modal) ----------
function detailFooter(key) {
  return `<div class="detail-actions"><button class="btn small-btn ghost" data-star="${key}">${starLabel(key)}</button></div>
  <label class="muted small" style="display:block;margin-top:14px">📝 Ghi chú của tôi (lưu trên máy)</label>
  <textarea class="notes" data-note="${key}" rows="3" placeholder="Mẹo nhớ, ghi chú...">${esc(S.notes[key] || "")}</textarea>`;
}
const chip = (key, text, extra = "") => `<span class="chip" data-open="${key}">${text}${extra}</span>`;

function openItem(key) {
  const [type, id] = key.split(":");
  if (type === "ab") openAb(id);
  else if (type === "mo") openMo(id);
  else if (type === "dr") openDrug(id);
  else if (type === "doc") {
    const doc = (DATA.documents || []).find((d) => d.id === id);
    if (doc) {
      showModal(`
        <h2>📖 ${esc(doc.title)}</h2>
        <div style="margin-bottom:10px">
          <span class="tag" style="background:#e0f2fe;color:#0369a1">${esc(doc.category)}</span>
          <span class="tag" style="background:#fef3c7;color:#92400e">${esc(doc.source)}</span>
        </div>
        <p style="line-height:1.5">${esc(doc.description)}</p>
        <p class="muted small">📁 Tệp tài liệu: <code>${esc(doc.file)}</code></p>
        ${doc.highlights && doc.highlights.length ? `
          <div class="expl" style="margin-top:10px">
            <b>📌 Điểm cốt lõi:</b>
            <ul style="margin:4px 0 0;padding-left:18px">
              ${doc.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}
            </ul>
          </div>
        ` : ""}
        <div style="margin-top:14px">
          <a class="btn small-btn" href="#duocly-review" onclick="closeModal()">📖 Sang mục Ôn tập Lý thuyết</a>
        </div>
      `);
    } else {
      location.hash = "#duocly-review";
    }
  }
}
function openAb(id) {
  const a = getAb(id); if (!a) return;
  const ms = microbesFor(id).map((m) => chip("mo:" + m.id, `<i>${esc(m.name)}</i>`)).join("");
  showModal(`<h2>${esc(a.name)}</h2><span class="tag">${esc(a.class)}</span>${awareBadge(a.aware)}` + dl([
    ["Biệt dược", list(a.brandNames)],
    ["Cơ chế tác động", esc(a.mechanism)],
    ["Phổ tác dụng", esc(a.spectrum)],
    ["Chỉ định lâm sàng", list(a.indications)],
    ["Liều dùng & Truyền (EUCAST / IDSA 2024)", esc(a.dosing)],
    ["Tác dụng phụ", list(a.sideEffects)],
    ["Chống chỉ định & Cảnh báo", list(a.contraindications)],
    ["Vi sinh vật nhạy cảm liên quan", ms],
    ["Ghi chú lâm sàng", esc(a.notes)],
  ]) + `<button class="mini" data-cmp="${a.id}">⚖️ Thêm vào so sánh</button>` + detailFooter("ab:" + id));
}
function openMo(id) {
  const m = getMo(id); if (!m) return;
  const abs = antibioticsFor(id).map((a) => chip("ab:" + a.id, esc(a.name), activity(a.id, id) ? ` <small>(${activity(a.id, id)})</small>` : "")).join("");
  showModal(`<h2><i>${esc(m.name)}</i></h2><span class="tag">${esc(m.gram)}</span><span class="tag">${esc(m.shape)}</span>${priorityBadge(m.whoPriority)}` + dl([
    ["Tên thường gọi", esc(m.commonName)],
    ["Bệnh lý gây ra", list(m.diseases)],
    ["Đặc điểm sinh học & Chẩn đoán", esc(m.characteristics)],
    ["Kháng sinh điều trị liên quan", abs],
    ["Cơ chế đề kháng", esc(m.resistance)],
    ["Phác đồ & Lưu ý (IDSA 2024 / Giáo trình Bộ Y tế)", esc(m.notes)],
  ]) + detailFooter("mo:" + id));
}

// ---------- Kháng sinh ----------
function renderAb() {
  const q = norm($("#abSearch").value), c = $("#abClass").value, aw = $("#abAware").value, st = $("#abStar").checked;
  const items = DATA.antibiotics.filter((a) =>
    (!c || a.class === c) && (!aw || a.aware === aw) && (!st || S.stars["ab:" + a.id]) &&
    norm([a.name, a.class, a.mechanism, a.dosing, a.notes, ...(a.brandNames || []), ...(a.indications || [])].join(" ")).includes(q));
  $("#abList").innerHTML = items.map((a) => `<div class="item" data-open="ab:${a.id}">
    <div class="item-top"><h3>${esc(a.name)}</h3><span>${S.stars["ab:" + a.id] ? "⭐" : ""}</span></div>
    <div><span class="tag">${esc(a.class)}</span>${awareBadge(a.aware)}</div>
    <p class="muted">${esc(a.mechanism)}</p>
    <button class="mini ${S.compare.includes(a.id) ? "on" : ""}" data-cmp="${a.id}">${S.compare.includes(a.id) ? "✓ Đã chọn so sánh" : "＋ So sánh"}</button></div>`).join("") || '<p class="muted">Không có dữ liệu phù hợp.</p>';
}
$("#abSearch").oninput = renderAb; $("#abClass").onchange = renderAb; $("#abAware").onchange = renderAb; $("#abStar").onchange = renderAb;
PAGES.antibiotics = renderAb;

// ---------- Vi sinh vật ----------
function renderMo() {
  const q = norm($("#moSearch").value), g = $("#moGram").value, pr = $("#moPriority").value, st = $("#moStar").checked;
  const items = DATA.microbes.filter((m) =>
    (!g || m.gram === g) && (!pr || m.whoPriority === pr) && (!st || S.stars["mo:" + m.id]) &&
    norm([m.name, m.commonName, m.characteristics, m.resistance, m.notes, ...(m.diseases || [])].join(" ")).includes(q));
  $("#moList").innerHTML = items.map((m) => `<div class="item" data-open="mo:${m.id}">
    <div class="item-top"><h3><i>${esc(m.name)}</i></h3><span>${S.stars["mo:" + m.id] ? "⭐" : ""}</span></div>
    <div style="margin-bottom:4px"><span class="tag">${esc(m.gram)}</span><span class="tag">${esc(m.shape)}</span>${priorityBadge(m.whoPriority)}</div>
    <div class="small"><b>${esc(m.commonName)}</b></div>
    <p class="muted small">${list(m.diseases)}</p></div>`).join("") || '<p class="muted">Không có dữ liệu phù hợp.</p>';
}
$("#moSearch").oninput = renderMo; $("#moGram").onchange = renderMo; $("#moPriority").onchange = renderMo; $("#moStar").onchange = renderMo;
PAGES.microbes = renderMo;

// ---------- So sánh kháng sinh ----------
function toggleCompare(id) {
  const i = S.compare.indexOf(id);
  if (i >= 0) S.compare.splice(i, 1);
  else if (S.compare.length >= 4) { toast("Tối đa 4 kháng sinh"); return; }
  else S.compare.push(id);
  save(); renderAb(); renderCompare();
  toast(i >= 0 ? "Đã bỏ khỏi so sánh" : "Đã thêm vào So sánh");
  $$('[data-cmp="' + id + '"]').forEach((b) => { if (b.closest("#modalBody")) b.textContent = i >= 0 ? "⚖️ Thêm vào so sánh" : "✓ Đã thêm"; });
}
function renderCompare() {
  const sel = $("#cmpAdd");
  sel.innerHTML = '<option value="">＋ Thêm kháng sinh để so sánh (tối đa 4)</option>' +
    DATA.antibiotics.filter((a) => !S.compare.includes(a.id)).map((a) => `<option value="${a.id}">${esc(a.name)}</option>`).join("");
  const items = S.compare.map(getAb).filter(Boolean);
  if (!items.length) { $("#cmpTable").innerHTML = '<p class="muted" style="padding:16px">Chưa chọn kháng sinh nào. Dùng danh sách phía trên hoặc nút "＋ So sánh" ở trang Kháng sinh.</p>'; return; }
  const rows = [
    ["Nhóm", (a) => esc(a.class)],
    ["Phân loại WHO AWaRe", (a) => awareBadge(a.aware)],
    ["Biệt dược", (a) => list(a.brandNames)],
    ["Cơ chế", (a) => esc(a.mechanism)],
    ["Phổ tác dụng", (a) => esc(a.spectrum)],
    ["Chỉ định", (a) => list(a.indications)],
    ["Liều dùng & Truyền", (a) => esc(a.dosing)],
    ["Tác dụng phụ", (a) => list(a.sideEffects)],
    ["Chống chỉ định", (a) => list(a.contraindications)],
    ["Lưu ý lâm sàng", (a) => esc(a.notes)]
  ];
  $("#cmpTable").innerHTML = `<table class="tbl cmp"><thead><tr><th>Tiêu chí</th>${items.map((a) => `<th data-open="ab:${a.id}">${esc(a.name)} <button class="mini" data-cmp="${a.id}">✕</button></th>`).join("")}</tr></thead><tbody>` +
    rows.map(([k, f]) => `<tr><td><b>${k}</b></td>${items.map((a) => `<td>${f(a) || "—"}</td>`).join("")}</tr>`).join("") + "</tbody></table>";
}
$("#cmpAdd").onchange = (e) => { if (e.target.value) toggleCompare(e.target.value); };
$("#cmpClear").onclick = () => { S.compare = []; save(); renderCompare(); renderAb(); };
PAGES.compare = renderCompare;

// ---------- Bảng phổ tác dụng (Phân loại theo Nhóm kháng sinh: Ma trận & Thẻ nhóm) ----------
const SP_STATE = { macro: "", collapsed: {}, mode: "matrix" };

function abMacroGroup(a) {
  const c = (a.class || "").toLowerCase();
  if (c.includes("thế hệ mới")) return "4. β-lactam / Ức chế β-lactamase thế hệ mới";
  if (c.includes("penicillin") || c.includes("ức chế β-lactamase")) return "1. Penicillin & β-lactam + Ức chế β-lactamase";
  if (c.includes("cephalosporin")) return "2. Cephalosporin (Thế hệ 3, 4 & Siderophore)";
  if (c.includes("carbapenem") || c.includes("monobactam")) return "3. Carbapenem & Monobactam";
  if (c.includes("glycopeptide") || c.includes("lipopeptide") || c.includes("oxazolidinone")) return "5. Nhóm Diệt/Kìm Gram dương (Glyco/Lipo/Oxazo)";
  if (c.includes("fluoroquinolone") || c.includes("aminoglycoside")) return "6. Fluoroquinolone & Aminoglycoside";
  if (c.includes("tetracycline") || c.includes("glycylcycline") || c.includes("fluorocycline")) return "7. Họ Tetracycline / Glycylcycline / Fluorocycline";
  if (c.includes("macrolide") || c.includes("lincosamide") || c.includes("phenicol")) return "8. Macrolide, Lincosamide & Phenicol";
  if (c.includes("kháng lao") || c.includes("kháng phong")) return "10. Kháng Lao & Kháng Phong chuyên biệt";
  return "9. Polymyxin, Kháng Folate, Tiết niệu & Kỵ khí";
}

const SHORT_MO_MAP = {
  "e-coli": "E. coli",
  "k-pneumoniae": "K. pneumoniae",
  "e-cloacae": "E. cloacae cpx",
  "k-aerogenes": "K. aerogenes",
  "c-freundii": "C. freundii",
  "p-aeruginosa": "P. aeruginosa",
  "a-baumannii": "A. baumannii",
  "s-maltophilia": "S. maltophilia",
  "b-pseudomallei": "B. pseudomallei",
  "s-typhi": "S. enterica (Typhi)",
  "shigella": "Shigella spp.",
  "v-cholerae": "V. cholerae",
  "c-jejuni": "C. jejuni",
  "h-pylori": "H. pylori",
  "h-influenzae": "H. influenzae",
  "h-ducreyi": "H. ducreyi",
  "n-gonorrhoeae": "N. gonorrhoeae",
  "n-meningitidis": "N. meningitidis",
  "s-aureus": "S. aureus",
  "s-pyogenes": "S. pyogenes (GAS)",
  "s-agalactiae": "S. agalactiae (GBS)",
  "s-pneumoniae": "S. pneumoniae",
  "viridans-strep": "Viridans Strep",
  "e-faecium": "Enterococcus spp.",
  "c-diphtheriae": "C. diphtheriae",
  "t-pallidum": "T. pallidum",
  "c-trachomatis": "C. trachomatis",
  "u-urealyticum": "Ureaplasma / Mycoplasma",
  "m-tuberculosis": "M. tuberculosis",
  "m-leprae": "M. leprae"
};

function shortMoName(m) {
  if (SHORT_MO_MAP[m.id]) return SHORT_MO_MAP[m.id];
  return m.name.replace(/\s*\(.*?\)/g, "").trim();
}

function shortGramBadge(g) {
  if (!g) return "";
  if (g === "Gram âm") return '<span class="sp-g g-neg">G−</span>';
  if (g === "Gram dương") return '<span class="sp-g g-pos">G+</span>';
  if (g.includes("AFB")) return '<span class="sp-g g-afb">AFB</span>';
  return '<span class="sp-g g-oth">KĐH</span>';
}

function renderSpectrumPills() {
  const box = $("#spClassPills");
  if (!box) return;
  const counts = {};
  DATA.antibiotics.forEach((a) => {
    const g = abMacroGroup(a);
    counts[g] = (counts[g] || 0) + 1;
  });
  const macros = Object.keys(counts).sort((a, b) => parseInt(a) - parseInt(b));
  box.innerHTML = `<button class="sp-pill ${!SP_STATE.macro ? "active" : ""}" data-macro="">Tất cả họ KS (${DATA.antibiotics.length})</button>` +
    macros.map((m) => `<button class="sp-pill ${SP_STATE.macro === m ? "active" : ""}" data-macro="${esc(m)}">${esc(m.replace(/^\d+\.\s*/, ""))} <b>(${counts[m]})</b></button>`).join("");
  $$(".sp-pill", box).forEach((b) => (b.onclick = () => {
    SP_STATE.macro = b.dataset.macro;
    if (SP_STATE.macro) $("#spClass").value = "";
    renderSpectrum();
  }));
}

function showSpCellDetail(abId, moId) {
  const a = getAb(abId), m = getMo(moId), v = activity(abId, moId);
  const banner = $("#spCellBanner");
  if (!a || !m || !banner) return;
  const lbl = v === "S"
    ? '<span class="cell S">S – Nhạy cảm (Liều chuẩn)</span>'
    : v === "I"
      ? '<span class="cell I">I – Nhạy cảm cần tăng phơi nhiễm (Liều cao / Thay đổi theo chủng)</span>'
      : v === "R"
        ? '<span class="cell R">R – Đề kháng (Tự nhiên hoặc Mắc phải phổ biến)</span>'
        : '<span class="cell N">– Không áp dụng / Không khuyến cáo lâm sàng</span>';
  banner.hidden = false;
  banner.innerHTML = `
    <div class="sp-banner-main">
      <div>
        <b>💊 ${esc(a.name)}</b> <span class="tag">${esc(a.class)}</span>
        <span style="margin:0 6px">×</span>
        <b>🦠 <i>${esc(m.name)}</i></b> <span class="tag">${esc(m.gram)}</span>
      </div>
      <div style="margin-top:4px">${lbl}</div>
      <div class="muted small" style="margin-top:4px"><b>Liều khuyến cáo:</b> ${esc(a.dosing || "Xem hồ sơ thuốc")}</div>
    </div>
    <div class="row-actions">
      <button class="btn small-btn" data-open="ab:${a.id}">💊 Hồ sơ thuốc</button>
      <button class="btn small-btn ghost" data-open="mo:${m.id}">🦠 Hồ sơ vi khuẩn</button>
      <button class="btn small-btn ghost" id="spBannerClose">✕</button>
    </div>`;
  $("#spBannerClose").onclick = () => { banner.hidden = true; };
}

function renderSpectrum() {
  renderSpectrumPills();
  const c = $("#spClass").value, g = $("#spGram").value, act = $("#spAct") ? $("#spAct").value : "";
  const q = norm($("#spSearch") ? $("#spSearch").value : "");

  // Chỉ lấy vi khuẩn có trong phổ kháng sinh (loại bỏ siêu vi khuẩn / prion không dùng kháng sinh)
  const validMoIds = new Set(DATA.spectrum.map((s) => s.microbeId));
  let mos = DATA.microbes.filter((m) => validMoIds.has(m.id) && (!g || m.gram === g));
  let abs = DATA.antibiotics.filter((a) => (!c || a.class === c) && (!SP_STATE.macro || abMacroGroup(a) === SP_STATE.macro));

  if (q) {
    const abMatches = abs.filter((a) => norm([a.name, a.class, abMacroGroup(a), ...(a.brandNames || [])].join(" ")).includes(q));
    const moMatches = mos.filter((m) => norm([m.name, m.commonName, shortMoName(m)].join(" ")).includes(q));
    if (abMatches.length && (!moMatches.length || abMatches.length <= moMatches.length)) {
      abs = abMatches;
    } else if (moMatches.length) {
      mos = moMatches;
    } else {
      abs = [];
    }
  }

  if (act === "S") {
    abs = abs.filter((a) => mos.some((m) => activity(a.id, m.id) === "S"));
    mos = mos.filter((m) => abs.some((a) => activity(a.id, m.id) === "S"));
  } else if (act === "SI") {
    abs = abs.filter((a) => mos.some((m) => ["S", "I"].includes(activity(a.id, m.id))));
    mos = mos.filter((m) => abs.some((a) => ["S", "I"].includes(activity(a.id, m.id))));
  }

  // Nhóm kháng sinh theo Họ lớn (Macro-Group)
  const grouped = {};
  abs.forEach((a) => {
    const mg = abMacroGroup(a);
    (grouped[mg] = grouped[mg] || []).push(a);
  });
  const groupKeys = Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b));

  const statEl = $("#spStat");
  if (statEl) statEl.textContent = `Đang hiển thị ${abs.length} kháng sinh (${groupKeys.length} nhóm) × ${mos.length} vi khuẩn`;

  const matrixWrap = $("#spMatrixWrap"), cardsWrap = $("#spCardsWrap");
  if (SP_STATE.mode === "cards") {
    matrixWrap.hidden = true;
    cardsWrap.hidden = false;
    if (!abs.length) { cardsWrap.innerHTML = '<p class="muted" style="padding:16px">Không tìm thấy kháng sinh phù hợp bộ lọc.</p>'; return; }
    cardsWrap.innerHTML = groupKeys.map((gk) => {
      const listAb = grouped[gk];
      const isCol = !!SP_STATE.collapsed[gk];
      return `<div class="sp-group-section">
        <div class="sp-group-banner" data-toggle-grp="${esc(gk)}">
          <div><span class="sp-caret">${isCol ? "▶" : "▼"}</span> <b>${esc(gk)}</b> <span class="tag">${listAb.length} kháng sinh</span></div>
          <span class="muted small">${isCol ? "Bấm để mở rộng" : "Bấm để thu gọn"}</span>
        </div>
        ${isCol ? "" : `<div class="sp-card-grid">${listAb.map((a) => {
          const sList = mos.filter((m) => activity(a.id, m.id) === "S");
          const iList = mos.filter((m) => activity(a.id, m.id) === "I");
          const rList = mos.filter((m) => activity(a.id, m.id) === "R");
          return `<div class="sp-ab-card">
            <div class="item-top"><h3 data-open="ab:${a.id}" style="cursor:pointer;color:var(--primary)">💊 ${esc(a.name)}</h3>${awareBadge(a.aware)}</div>
            <div style="margin-bottom:8px"><span class="tag">${esc(a.class)}</span></div>
            <div class="sp-tier-row"><span class="cell S">S (${sList.length})</span> <div class="sp-chip-list">${sList.map((m) => `<span class="chip s-chip" data-open="mo:${m.id}" title="${esc(m.name)}"><i>${esc(shortMoName(m))}</i></span>`).join("") || '<span class="muted small">Không có trong bộ lọc</span>'}</div></div>
            ${iList.length ? `<div class="sp-tier-row"><span class="cell I">I (${iList.length})</span> <div class="sp-chip-list">${iList.map((m) => `<span class="chip i-chip" data-open="mo:${m.id}" title="${esc(m.name)}"><i>${esc(shortMoName(m))}</i></span>`).join("")}</div></div>` : ""}
            ${rList.length ? `<div class="sp-tier-row"><span class="cell R">R (${rList.length})</span> <div class="sp-chip-list">${rList.map((m) => `<span class="chip r-chip" data-open="mo:${m.id}" title="${esc(m.name)}"><i>${esc(shortMoName(m))}</i></span>`).join("")}</div></div>` : ""}
          </div>`;
        }).join("")}</div>`}
      </div>`;
    }).join("");
    $$("[data-toggle-grp]", cardsWrap).forEach((el) => (el.onclick = () => {
      const k = el.dataset.toggleGrp;
      SP_STATE.collapsed[k] = !SP_STATE.collapsed[k];
      renderSpectrum();
    }));
    return;
  }

  matrixWrap.hidden = false;
  cardsWrap.hidden = true;
  if (!abs.length || !mos.length) { $("#spTable").innerHTML = '<p class="muted" style="padding:16px">Không có dữ liệu phù hợp bộ lọc.</p>'; return; }

  const thead = `<thead><tr><th class="sp-corner">Kháng sinh (theo nhóm) \\ Vi khuẩn</th>${mos.map((m) =>
    `<th class="sp-mo-th" data-open="mo:${m.id}" title="${esc(m.name)} (${esc(m.commonName || m.gram)})">
      <div class="sp-mo-short"><i>${esc(shortMoName(m))}</i></div>
      ${shortGramBadge(m.gram)}
    </th>`).join("")}</tr></thead>`;

  const tbody = groupKeys.map((gk) => {
    const listAb = grouped[gk];
    const isCol = !!SP_STATE.collapsed[gk];
    const groupRow = `<tr class="sp-group-row" data-toggle-grp="${esc(gk)}">
      <td class="sp-group-cell" colspan="${mos.length + 1}">
        <span class="sp-caret">${isCol ? "▶" : "▼"}</span> <b>${esc(gk)}</b>
        <span class="tag" style="margin-left:6px">${listAb.length} thuốc</span>
        <span class="muted small" style="margin-left:8px">${isCol ? "(Đang thu gọn – bấm để mở)" : "(Bấm để thu gọn nhóm này)"}</span>
      </td>
    </tr>`;
    if (isCol) return groupRow;
    return groupRow + listAb.map((a) => {
      const sCount = mos.filter((m) => activity(a.id, m.id) === "S").length;
      return `<tr>
        <td class="sp-ab-td">
          <div class="sp-ab-name" data-open="ab:${a.id}" title="Xem chi tiết ${esc(a.name)}">${esc(a.name)}</div>
          <div class="sp-ab-sub"><span class="muted">${esc(a.class)}</span> · <b style="color:#16a34a">${sCount} S</b></div>
        </td>
        ${mos.map((m) => {
          const v = activity(a.id, m.id);
          return `<td class="sp-cell-td" data-sp-ab="${a.id}" data-sp-mo="${m.id}" title="${esc(a.name)} × ${esc(shortMoName(m))}: ${v || "Không áp dụng"}"><span class="cell ${v || "N"}">${v || "–"}</span></td>`;
        }).join("")}
      </tr>`;
    }).join("");
  }).join("");

  $("#spTable").innerHTML = `<table class="tbl sp-tbl">${thead}<tbody>${tbody}</tbody></table>`;

  $$("[data-toggle-grp]", $("#spTable")).forEach((tr) => (tr.onclick = () => {
    const k = tr.dataset.toggleGrp;
    SP_STATE.collapsed[k] = !SP_STATE.collapsed[k];
    renderSpectrum();
  }));
  $$("[data-sp-ab]", $("#spTable")).forEach((td) => (td.onclick = () => showSpCellDetail(td.dataset.spAb, td.dataset.spMo)));
}

$("#spClass").onchange = () => { if ($("#spClass").value) SP_STATE.macro = ""; renderSpectrum(); };
$("#spGram").onchange = renderSpectrum;
if ($("#spSearch")) $("#spSearch").oninput = renderSpectrum;
if ($("#spAct")) $("#spAct").onchange = renderSpectrum;
if ($("#spModeMatrix")) $("#spModeMatrix").onclick = () => {
  SP_STATE.mode = "matrix";
  $("#spModeMatrix").classList.add("active");
  $("#spModeCards").classList.remove("active");
  renderSpectrum();
};
if ($("#spModeCards")) $("#spModeCards").onclick = () => {
  SP_STATE.mode = "cards";
  $("#spModeCards").classList.add("active");
  $("#spModeMatrix").classList.remove("active");
  renderSpectrum();
};
if ($("#spExpandAll")) $("#spExpandAll").onclick = () => { SP_STATE.collapsed = {}; renderSpectrum(); };
if ($("#spCollapseAll")) $("#spCollapseAll").onclick = () => {
  DATA.antibiotics.forEach((a) => { SP_STATE.collapsed[abMacroGroup(a)] = true; });
  renderSpectrum();
};
PAGES.spectrum = renderSpectrum;

// ---------- Phác đồ IDSA 2024, Breakpoint EUCAST v16.1 & WHO/VN 1121 ----------
let glReady = false;
function initGuidelines() {
  if (glReady) return;
  const gl = DATA.guidelines || {};
  if (!gl.idsaRegimens) return;
  glReady = true;

  // Subtabs
  $$("#glTabs .subtab").forEach((b) => (b.onclick = () => {
    $$("#glTabs .subtab").forEach((x) => x.classList.toggle("active", x === b));
    $$(".gl-pane").forEach((p) => (p.hidden = p.id !== "gl-" + b.dataset.gl));
  }));

  // 1. IDSA 2024
  fillSelect("#idsaGroup", (gl.idsaRegimens || []).map((r) => r.group));
  $("#idsaGroup").onchange = renderIdsa;
  $("#idsaSearch").oninput = renderIdsa;
  $("#doseSearch").oninput = renderDoseTable;

  // 2. EUCAST v16.1
  const bps = gl.breakpoints || [];
  const groups = [...new Set(bps.map((b) => b.group))];
  $("#bpCalcGroup").innerHTML = groups.map((g) => `<option value="${esc(g)}">${esc(g)}</option>`).join("");
  fillSelect("#bpFilterGroup", groups);
  const updateDrugList = () => {
    const g = $("#bpCalcGroup").value;
    const drugs = bps.filter((b) => b.group === g);
    $("#bpCalcDrug").innerHTML = drugs.map((d) => `<option value="${esc(d.antibiotic)}">${esc(d.antibiotic)}</option>`).join("");
    calcBp();
  };
  $("#bpCalcGroup").onchange = updateDrugList;
  $("#bpCalcDrug").onchange = calcBp;
  $("#bpCalcMic").oninput = () => { if ($("#bpCalcMic").value) $("#bpCalcZone").value = ""; calcBp(); };
  $("#bpCalcZone").oninput = () => { if ($("#bpCalcZone").value) $("#bpCalcMic").value = ""; calcBp(); };
  $("#bpFilterGroup").onchange = renderBpTable;
  $("#bpFilterSearch").oninput = renderBpTable;
  updateDrugList();

  renderIdsa();
  renderDoseTable();
  renderBpTable();
  renderWhoVn();
}

function renderIdsa() {
  const gl = DATA.guidelines || {}, g = $("#idsaGroup").value, q = norm($("#idsaSearch").value);
  const listEl = $("#idsaList");
  const items = (gl.idsaRegimens || []).filter((r) =>
    (!g || r.group === g) &&
    norm([r.group, r.syndrome, r.pearls, ...(r.preferred || []), ...(r.alternative || [])].join(" ")).includes(q));
  listEl.innerHTML = items.map((r) => `<div class="gl-card">
    <span class="tag">${esc(r.group)}</span>
    <h3>${esc(r.syndrome)}</h3>
    <div class="gl-cols">
      <div class="gl-box pref"><h4>✅ Phác đồ Ưu tiên (Preferred)</h4><ul>${(r.preferred || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <div class="gl-box alt"><h4>🔄 Phác đồ Thay thế (Alternative)</h4><ul>${(r.alternative || []).map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
    </div>
    <div class="expl"><b>💡 Lưu ý lâm sàng (IDSA 2024):</b> ${esc(r.pearls)}</div>
  </div>`).join("") || '<p class="muted">Không tìm thấy phác đồ phù hợp.</p>';
}

function renderDoseTable() {
  const gl = DATA.guidelines || {}, q = norm($("#doseSearch").value);
  const rows = (gl.idsaDosing || []).filter((d) => norm([d.drug, d.cystitis, d.systemic, d.infusion, d.targets].join(" ")).includes(q));
  $("#doseTable").innerHTML = `<table class="tbl left"><thead><tr>
    <th>Kháng sinh</th><th>Liều Viêm bàng quang</th><th>Liều cUTI / Nhiễm khuẩn ngoài đường niệu</th><th>Thời gian truyền</th><th>Tác nhân đích (IDSA 2024)</th>
  </tr></thead><tbody>` + rows.map((d) => `<tr>
    <td><b>${esc(d.drug)}</b></td><td>${esc(d.cystitis)}</td><td>${esc(d.systemic)}</td><td>${esc(d.infusion)}</td><td><span class="tag">${esc(d.targets)}</span></td>
  </tr>`).join("") + "</tbody></table>";
}

function calcBp() {
  const bps = (DATA.guidelines || {}).breakpoints || [];
  const b = bps.find((x) => x.group === $("#bpCalcGroup").value && x.antibiotic === $("#bpCalcDrug").value);
  const out = $("#bpCalcResult");
  if (!b) { out.innerHTML = ""; return; }
  const micStr = $("#bpCalcMic").value.trim(), zoneStr = $("#bpCalcZone").value.trim();
  const offScale = b.micS <= 0.001;
  let badge = "", msg = "";

  if (micStr !== "") {
    const v = parseFloat(micStr);
    if (b.atuMic && b.atuMic !== "—" && String(v) === String(b.atuMic)) {
      badge = `<span class="cell I">ATU (MIC = ${v} mg/L)</span>`;
      msg = "Nằm trong Vùng không chắc chắn kỹ thuật (ATU) của EUCAST! Cần kiểm tra lại xét nghiệm hoặc dùng phương pháp thay thế.";
    } else if (v <= b.micS && !offScale) {
      badge = `<span class="cell S">S – Nhạy cảm liều chuẩn (MIC = ${v} mg/L ≤ ${b.micS})</span>`;
      msg = `Có thể dùng chế độ <b>Liều chuẩn</b>: ${esc(b.stdDose)}`;
    } else if (v <= b.micR) {
      badge = `<span class="cell I">I – Nhạy cảm, cần tăng phơi nhiễm (MIC = ${v} mg/L ≤ ${b.micR})</span>`;
      msg = (offScale ? `EUCAST đặt S ≤ 0.001 mg/L nên mọi chủng nhạy (MIC ≤ ${b.micR} mg/L) đều phiên giải là <b>I</b>. ` : "") +
        `Bắt buộc dùng chế độ <b>Liều cao (High dosage)</b>: ${esc(b.highDose || b.stdDose)}`;
    } else {
      badge = `<span class="cell R">R – Đề kháng (MIC = ${v} mg/L > ${b.micR})</span>`;
      msg = "Kháng thuốc theo EUCAST v16.1 (nguy cơ thất bại điều trị cao ngay cả khi dùng liều cao).";
    }
  } else if (zoneStr !== "") {
    if (b.zoneS === null) {
      badge = `<span class="cell R">Không áp dụng đĩa giấy</span>`;
      msg = "EUCAST & CLSI cảnh báo: Thuốc này KHÔNG ĐƯỢC phiên giải bằng khuếch tán đĩa giấy, bắt buộc đo MIC (vi pha loãng canh thang).";
    } else {
      const z = parseFloat(zoneStr);
      if (z >= b.zoneS && b.zoneS < 50) {
        badge = `<span class="cell S">S – Nhạy cảm liều chuẩn (Vòng = ${z} mm ≥ ${b.zoneS} mm)</span>`;
        msg = `Dùng chế độ <b>Liều chuẩn</b>: ${esc(b.stdDose)}`;
      } else if (z >= b.zoneR) {
        badge = `<span class="cell I">I – Nhạy cảm, cần tăng phơi nhiễm (Vòng = ${z} mm ≥ ${b.zoneR} mm)</span>`;
        msg = `Bắt buộc dùng chế độ <b>Liều cao (High dosage)</b>: ${esc(b.highDose || b.stdDose)}`;
      } else {
        badge = `<span class="cell R">R – Đề kháng (Vòng = ${z} mm < ${b.zoneR} mm)</span>`;
        msg = "Đề kháng theo tiêu chuẩn khuếch tán đĩa giấy của EUCAST v16.1.";
      }
    }
  } else {
    badge = `<span class="tag">Ngưỡng chuẩn: MIC S ≤ ${b.micS} · R > ${b.micR} mg/L | Đĩa giấy S ≥ ${b.zoneS ?? "—"} · R < ${b.zoneR ?? "—"} mm</span>`;
    msg = `Nhập một giá trị <b>MIC (mg/L)</b> hoặc <b>Đường kính vòng vô khuẩn (mm)</b> ở ô trên để máy tự động phiên giải S / I / R.<br><b>Liều chuẩn:</b> ${esc(b.stdDose)} · <b>Liều cao (I):</b> ${esc(b.highDose || "—")}`;
  }
  out.innerHTML = `<div class="expl" style="margin-top:8px"><div style="margin-bottom:6px">${badge} <span class="tag">CLSI 2024 S: ${esc(b.clsiS)}</span></div><div>${msg}</div><div class="muted small" style="margin-top:4px">📌 ${esc(b.note)}</div></div>`;
}

function renderBpTable() {
  const bps = (DATA.guidelines || {}).breakpoints || [];
  const g = $("#bpFilterGroup").value, q = norm($("#bpFilterSearch").value);
  const rows = bps.filter((b) => (!g || b.group === g) && norm([b.group, b.antibiotic, b.note, b.stdDose, b.highDose].join(" ")).includes(q));
  $("#bpTable").innerHTML = `<table class="tbl left"><thead><tr>
    <th>Nhóm vi khuẩn</th><th>Kháng sinh</th><th>EUCAST MIC (mg/L)<br><small>S ≤ / R &gt;</small></th><th>EUCAST Zone (mm)<br><small>S ≥ / R &lt;</small></th><th>ATU</th><th>CLSI 2024 (S)</th><th>Liều chuẩn vs Liều cao (EUCAST) & Ghi chú</th>
  </tr></thead><tbody>` + rows.map((b) => `<tr>
    <td><b>${esc(b.group)}</b></td>
    <td><b>${esc(b.antibiotic)}</b></td>
    <td><span class="cell S">≤ ${b.micS}</span> <span class="cell R">&gt; ${b.micR}</span></td>
    <td>${b.zoneS !== null ? `<span class="cell S">≥ ${b.zoneS}</span> <span class="cell R">&lt; ${b.zoneR}</span>` : '<span class="muted">Chỉ đo MIC</span>'}</td>
    <td><small>${esc(b.atuMic !== "—" ? "MIC: " + b.atuMic : "")} ${esc(b.atuZone !== "—" ? "Zone: " + b.atuZone : "—")}</small></td>
    <td><code>${esc(b.clsiS)}</code></td>
    <td><small><b>Chuẩn:</b> ${esc(b.stdDose)}<br><b>Cao (I):</b> ${esc(b.highDose)}<br><span class="muted">${esc(b.note)}</span></small></td>
  </tr>`).join("") + "</tbody></table>";
}

function renderWhoVn() {
  const gl = DATA.guidelines || {}, who = gl.whoBppl2024 || {}, vn = gl.vnStrategy1121 || {};
  if (!who.tiers) return;
  $("#whoBox").innerHTML = `
    <div class="panel">
      <h3>🌍 Danh sách Vi khuẩn Kháng thuốc Ưu tiên của WHO năm 2024 (WHO BPPL 2024)</h3>
      <p class="muted small">Đánh giá trên 24 cặp vi khuẩn–kháng thuốc (15 họ tác nhân) bằng phương pháp Phân tích quyết định đa tiêu chí (MCDA) với <b>8 tiêu chí</b>:</p>
      <div style="margin:8px 0 14px">${(who.criteria || []).map((c) => `<span class="tag">${esc(c)}</span>`).join("")}</div>
      <div class="gl-cols">
        ${(who.tiers || []).map((t) => `<div class="gl-box">
          <h4><span class="cell ${t.badgeClass}">${esc(t.tier)}</span></h4>
          <p class="muted small">${esc(t.description)}</p>
          <ul>${(t.items || []).map((it) => `<li><span class="chip" data-open="mo:${it.microbeId}">${esc(it.pathogen)}</span></li>`).join("")}</ul>
        </div>`).join("")}
      </div>
    </div>
    <div class="panel">
      <h3>🇻🇳 ${esc(vn.title)}</h3>
      <div class="expl" style="margin-bottom:14px"><b>Tầm nhìn đến năm 2045:</b> ${esc(vn.vision2045)}</div>
      <div class="gl-cols">
        ${(vn.targets || []).map((t) => `<div class="gl-box pref">
          <h4>🎯 ${esc(t.goal)}</h4>
          <ul>${(t.metrics || []).map((m) => `<li>${esc(m)}</li>`).join("")}</ul>
        </div>`).join("")}
      </div>
      <h4 style="margin-top:16px">🏛️ 3 Đề án Trọng điểm Liên ngành (Mô hình Một Sức Khỏe – One Health)</h4>
      <ul>${(vn.projects || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
    </div>`;
}
PAGES.guidelines = initGuidelines;

