// ===== Phân hệ DƯỢC LÝ (Tách riêng biệt hoàn toàn với Antibiotic) =====
// Gồm: Trang chủ Dược lý, Tra cứu Thuốc, Ôn tập Lý thuyết (Sách & Slide & Mix),
// Trắc nghiệm Luyện thi (Sách & Slide & Mix), Mind map Dược lý, Flashcard Dược lý,
// So sánh Thuốc, Công cụ Dược lý Lâm sàng (Tương tác thuốc & Tính liều PK), Tiến độ Dược lý.

const getDrug = (id) => (DATA.drugs || []).find((d) => d.id === id);

// Đảm bảo state có compareDrugs
if (!S.compareDrugs) S.compareDrugs = [];

// ---------- Modal Chi tiết Thuốc Dược lý ----------
function openDrug(id) {
  const d = getDrug(id);
  if (!d) return;

  const inCompare = (S.compareDrugs || []).includes(d.id);
  const html = `
    <h2>${esc(d.name)}</h2>
    <div style="margin-bottom:12px">
      <span class="tag" style="background:#e0f2fe;color:#0369a1">${esc(d.system)}</span>
      <span class="tag" style="background:#fef3c7;color:#92400e">${esc(d.class)}</span>
    </div>
    ${dl([
      ["Biệt dược thông dụng", list(d.brandNames)],
      ["Cơ chế tác động & Thụ thể Receptor", esc(d.mechanism)],
      ["Dược động học (ADME)", esc(d.pharmacokinetics)],
      ["Chỉ định điều trị chính", list(d.indications)],
      ["Chống chỉ định & Cảnh báo", list(d.contraindications)],
      ["Tác dụng không mong muốn (ADR)", list(d.sideEffects)],
      ["Tương tác thuốc quan trọng", list(d.interactions)],
      ["💡 Lưu ý lâm sàng & Mẹo nhớ", esc(d.notes)],
    ])}
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn small-btn ${inCompare ? "ghost" : ""}" data-cmp-drug="${esc(d.id)}">${inCompare ? "✓ Đã có trong so sánh" : "⚖️ Thêm vào so sánh"}</button>
      <button class="btn small-btn ghost" onclick="openInteractionWith('${esc(d.id)}')">⚠️ Kiểm tra tương tác thuốc này</button>
    </div>
    ${detailFooter("dr:" + id)}
  `;
  showModal(html);
}

function openInteractionWith(drugId) {
  closeModal();
  location.hash = "#duocly-tools";
  setTimeout(() => {
    const sel1 = $("#ddiDrug1");
    if (sel1) {
      sel1.value = drugId;
      sel1.dispatchEvent(new Event("change"));
    }
  }, 100);
}

// ---------- 1. Trang chủ Dược lý (duocly-home) ----------
function renderDuoclyHome() {
  const drugsCount = (DATA.drugs || []).length;
  const revCount = (DATA.pharmaco_reviews || []).length;
  const quizCount = (DATA.pharmaco_quizzes || []).length;
  const mmCount = (DATA.mindmaps || []).filter((m) => m.id.startsWith("mm-")).length;
  const fcCount = (DATA.flashcards || []).filter((f) => f.id.startsWith("pfc")).length;

  const cDrug = $("#dlCountDrug"); if (cDrug) cDrug.textContent = drugsCount + " thuốc chuẩn hóa";
  const cRev = $("#dlCountReview"); if (cRev) cRev.textContent = revCount + " chuyên đề (Sách & Slide)";
  const cQuiz = $("#dlCountQuiz"); if (cQuiz) cQuiz.textContent = quizCount + " câu trắc nghiệm (Mix/Sách/Slide)";
  const cMm = $("#dlCountMm"); if (cMm) cMm.textContent = mmCount + " sơ đồ tư duy";
  const cFc = $("#dlCountFc"); if (cFc) cFc.textContent = fcCount + " thẻ ghi nhớ";

  // Tìm kiếm toàn cục trong Dược lý
  const searchInput = $("#duoclyGlobalSearch");
  if (searchInput) {
    searchInput.oninput = (e) => {
      const q = norm(e.target.value.trim());
      const out = $("#duoclyGlobalResults");
      if (!out) return;
      if (!q) { out.innerHTML = ""; return; }

      const results = [];
      // 1. Tìm trong thuốc
      (DATA.drugs || []).forEach((d) => {
        const text = norm([d.name, d.system, d.class, d.mechanism, d.notes, ...(d.brandNames || []), ...(d.indications || [])].join(" "));
        if (text.includes(q)) {
          results.push({ key: "dr:" + d.id, icon: "💊", title: d.name, sub: d.system + " · " + d.class });
        }
      });
      // 2. Tìm trong ôn tập lý thuyết
      (DATA.pharmaco_reviews || []).forEach((r) => {
        const text = norm([r.title, r.topic, r.sourceType, r.reference, ...(r.keyPoints || []), ...(r.clinicalPearls || [])].join(" "));
        if (text.includes(q)) {
          results.push({ key: "rev:" + r.id, icon: "📖", title: r.title, sub: "Ôn tập · " + r.topic });
        }
      });
      // 3. Tìm trong mindmap
      (DATA.mindmaps || []).filter((m) => m.id.startsWith("mm-")).forEach((m) => {
        if (norm(m.title).includes(q)) {
          results.push({ key: "mm:" + m.id, icon: "🧠", title: m.title, sub: "Sơ đồ tư duy Dược lý" });
        }
      });

      out.innerHTML = results.slice(0, 10).map((r) => {
        if (r.key.startsWith("rev:")) {
          return `<div onclick="location.hash='#duocly-review'">${r.icon} <b>${esc(r.title)}</b> <span class="muted">${esc(r.sub)}</span></div>`;
        }
        return `<div data-open="${esc(r.key)}">${r.icon} <b>${esc(r.title)}</b> <span class="muted">${esc(r.sub)}</span></div>`;
      }).join("") || '<div class="muted">Không tìm thấy nội dung dược lý phù hợp.</div>';
    };
  }
}
PAGES["duocly-home"] = renderDuoclyHome;
PAGES["duocly"] = () => { location.hash = "#duocly-home"; };
PAGES["pharmacology"] = () => { location.hash = "#duocly-home"; };

// ---------- 2. Tra cứu Thuốc Dược lý (duocly-drugs) ----------
function renderDuoclyDrugs() {
  const listEl = $("#dlDrugList");
  if (!listEl) return;

  const sysSel = $("#dlSystemFilter");
  if (sysSel && sysSel.options.length <= 1) {
    fillSelect("#dlSystemFilter", (DATA.drugs || []).map((d) => d.system));
    sysSel.onchange = renderDuoclyDrugs;
  }

  const q = norm($("#dlSearch") ? $("#dlSearch").value : "");
  const sys = sysSel ? sysSel.value : "";
  const starOnly = $("#dlStarOnly") && $("#dlStarOnly").checked;

  const drugs = (DATA.drugs || []).filter((d) => {
    if (sys && d.system !== sys) return false;
    if (starOnly && !S.stars["dr:" + d.id]) return false;
    if (!q) return true;
    const text = norm([
      d.name,
      d.system,
      d.class,
      d.mechanism,
      d.notes,
      ...(d.brandNames || []),
      ...(d.indications || []),
    ].join(" "));
    return text.includes(q);
  });

  if (!drugs.length) {
    listEl.innerHTML = '<p class="muted" style="padding:16px">Không tìm thấy thuốc dược lý phù hợp với điều kiện tìm kiếm.</p>';
    return;
  }

  listEl.innerHTML = drugs.map((d) => {
    const inCompare = (S.compareDrugs || []).includes(d.id);
    return `
      <div class="item" data-open="dr:${esc(d.id)}">
        <div class="item-top">
          <h3>💊 ${esc(d.name)}</h3>
          <span class="muted small">${starLabel("dr:" + d.id)}</span>
        </div>
        <div style="margin:4px 0">
          <span class="tag" style="background:#e0f2fe;color:#0369a1">${esc(d.system)}</span>
          <span class="tag" style="background:#fef3c7;color:#92400e">${esc(d.class)}</span>
        </div>
        <div class="muted small" style="margin-top:4px">
          <b>Cơ chế:</b> ${esc(d.mechanism ? d.mechanism.slice(0, 100) + (d.mechanism.length > 100 ? "..." : "") : "")}
        </div>
        <div class="muted small" style="margin-top:4px">
          <b>Chỉ định:</b> ${esc((d.indications || []).slice(0, 2).join(", "))}
        </div>
        <div class="item-actions" style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
          <button class="mini ${inCompare ? "on" : ""}" data-cmp-drug="${esc(d.id)}">${inCompare ? "✓ Đã chọn SS" : "⚖️ So sánh"}</button>
          <span class="muted small">Chi tiết →</span>
        </div>
      </div>
    `;
  }).join("");
}
PAGES["duocly-drugs"] = () => {
  if ($("#dlSearch")) $("#dlSearch").oninput = renderDuoclyDrugs;
  if ($("#dlStarOnly")) $("#dlStarOnly").onchange = renderDuoclyDrugs;
  renderDuoclyDrugs();
};

// ---------- 3. Ôn tập Lý thuyết Dược lý (duocly-review) ----------
function renderDuoclyReview() {
  const contentEl = $("#dlRevContent");
  if (!contentEl) return;

  const sourceSel = $("#dlRevSource");
  const topicSel = $("#dlRevTopic");
  const searchInput = $("#dlRevSearch");

  const sourceVal = sourceSel ? sourceSel.value : "mix"; // 'mix', 'book', 'slide'
  const curTopic = topicSel ? topicSel.value : "";
  const q = searchInput ? norm(searchInput.value.trim()) : "";

  // Lọc danh sách chuyên đề theo nguồn
  let availableReviews = (DATA.pharmaco_reviews || []).filter((r) => {
    if (sourceVal === "book") return r.sourceType === "book";
    if (sourceVal === "slide") return r.sourceType === "slide";
    return true; // mix
  });

  const topics = [...new Set(availableReviews.map((r) => r.topic))].sort();
  if (topicSel) {
    const prev = topicSel.value;
    topicSel.innerHTML = '<option value="">Tất cả chuyên đề (' + availableReviews.length + ' bài ôn tập)</option>' +
      topics.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join("");
    if (topics.includes(prev)) topicSel.value = prev;
  }

  const selectedTopic = topicSel ? topicSel.value : "";
  let filtered = availableReviews.filter((r) => {
    if (selectedTopic && r.topic !== selectedTopic) return false;
    if (!q) return true;
    const text = norm([
      r.title, r.topic, r.reference,
      ...(r.keyPoints || []),
      ...(r.clinicalPearls || []),
      ...(r.mechanismTable ? r.mechanismTable.flatMap((row) => Object.values(row)) : [])
    ].join(" "));
    return text.includes(q);
  });

  if (!filtered.length) {
    contentEl.innerHTML = `
      <div class="panel" style="text-align:center;padding:32px">
        <p class="muted">Không có chuyên đề ôn tập nào khớp với bộ lọc "${sourceVal === "book" ? "Theo Sách" : sourceVal === "slide" ? "Theo Slide" : "Chế độ Mix"}".</p>
      </div>
    `;
    return;
  }

  contentEl.innerHTML = filtered.map((r) => {
    const isBook = r.sourceType === "book";
    const badgeClass = isBook ? "badge-book" : "badge-slide";
    const badgeIcon = isBook ? "📖" : "📑";
    const badgeText = isBook ? "Giáo trình Sách (ĐHYD & Katzung)" : "22 Slide Bài giảng";

    return `
      <article class="rev-card" id="rev-${esc(r.id)}">
        <div class="rev-head">
          <div>
            <div style="margin-bottom:6px">
              <span class="badge-source ${badgeClass}">${badgeIcon} ${badgeText}</span>
              <span class="tag" style="margin-left:6px">${esc(r.topic)}</span>
            </div>
            <h3>${esc(r.title)}</h3>
            <div class="muted small">📚 Nguồn tài liệu: ${esc(r.reference)}</div>
          </div>
          <div>
            <button class="btn small-btn ghost" onclick="startQuizForTopic('${esc(r.topic)}', '${r.sourceType}')">📝 Luyện trắc nghiệm bài này</button>
          </div>
        </div>

        <div class="rev-kp">
          <h4>📌 Trọng tâm Kiến thức & Thụ thể Receptor</h4>
          <ul>
            ${(r.keyPoints || []).map((kp) => `<li>${esc(kp)}</li>`).join("")}
          </ul>
        </div>

        ${r.mechanismTable && r.mechanismTable.length ? `
          <div style="margin:16px 0">
            <h4 style="margin:0 0 8px;font-size:0.95rem">⚖️ Bảng đối chiếu Phân loại & Cơ chế phân tử:</h4>
            <div class="table-wrap">
              <table class="tbl left">
                <thead>
                  <tr>
                    ${Object.keys(r.mechanismTable[0]).map((col) => `<th>${esc(col.toUpperCase())}</th>`).join("")}
                  </tr>
                </thead>
                <tbody>
                  ${r.mechanismTable.map((row) => `
                    <tr>
                      ${Object.values(row).map((val) => `<td>${esc(val)}</td>`).join("")}
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        ` : ""}

        ${r.clinicalPearls && r.clinicalPearls.length ? `
          <div class="rev-pearls">
            <h4>💡 Clinical Pearls & Mẹo nhớ Lâm sàng:</h4>
            <ul>
              ${r.clinicalPearls.map((cp) => `<li>${esc(cp)}</li>`).join("")}
            </ul>
          </div>
        ` : ""}
      </article>
    `;
  }).join("");
}

function startQuizForTopic(topic, sourceType) {
  location.hash = "#duocly-quiz";
  setTimeout(() => {
    const srcSel = $("#dlQuizSource");
    if (srcSel) srcSel.value = sourceType || "mix";
    initDuoclyQuizTopics();
    const topSel = $("#dlQuizTopic");
    if (topSel) topSel.value = topic;
    startDuoclyQuiz();
  }, 80);
}

PAGES["duocly-review"] = () => {
  const srcSel = $("#dlRevSource");
  const topSel = $("#dlRevTopic");
  const sInput = $("#dlRevSearch");
  if (srcSel) srcSel.onchange = renderDuoclyReview;
  if (topSel) topSel.onchange = renderDuoclyReview;
  if (sInput) sInput.oninput = renderDuoclyReview;
  renderDuoclyReview();
};

// ---------- 4. Trắc nghiệm Dược lý (duocly-quiz) ----------
let dlQuiz = null;
let dlQuizTimer = null;

function initDuoclyQuizTopics() {
  const srcSel = $("#dlQuizSource");
  const topSel = $("#dlQuizTopic");
  if (!topSel) return;

  const srcVal = srcSel ? srcSel.value : "mix";
  let pool = (DATA.pharmaco_quizzes || []);
  if (srcVal === "book") pool = pool.filter((q) => q.sourceType === "book");
  else if (srcVal === "slide") pool = pool.filter((q) => q.sourceType === "slide");

  const topics = [...new Set(pool.map((q) => q.topic))].sort();
  const cur = topSel.value;
  topSel.innerHTML = '<option value="">Tất cả chuyên đề (' + pool.length + ' câu)</option>' +
    topics.map((t) => `<option value="${esc(t)}">${esc(t)}</option>`).join("");
  if (topics.includes(cur)) topSel.value = cur;

  const modeSel = $("#dlQuizMode");
  if (modeSel) {
    modeSel.onchange = () => {
      const minInput = $("#dlQuizMinutes");
      if (minInput) minInput.hidden = modeSel.value !== "exam";
    };
  }
}

function startDuoclyQuiz() {
  const srcVal = $("#dlQuizSource") ? $("#dlQuizSource").value : "mix";
  const mode = $("#dlQuizMode") ? $("#dlQuizMode").value : "practice";
  const topic = $("#dlQuizTopic") ? $("#dlQuizTopic").value : "";
  const count = +($("#dlQuizCount") ? $("#dlQuizCount").value : 0);

  let pool = (DATA.pharmaco_quizzes || []);
  if (srcVal === "book") pool = pool.filter((q) => q.sourceType === "book");
  else if (srcVal === "slide") pool = pool.filter((q) => q.sourceType === "slide");

  if (topic) pool = pool.filter((q) => q.topic === topic);
  if (mode === "wrong") pool = pool.filter((q) => S.wrong[q.id]);
  if (mode === "starred") pool = pool.filter((q) => S.stars["pq:" + q.id]);

  pool = shuffle(pool);
  if (count > 0) pool = pool.slice(0, count);

  clearInterval(dlQuizTimer);

  const box = $("#dlQuizBox");
  if (!pool.length) {
    box.innerHTML = `<p class="muted">Không có câu hỏi phù hợp cho bộ lọc "${srcVal === "book" ? "Theo Sách" : srcVal === "slide" ? "Theo Slide" : "Chế độ Mix"}" (hoặc chưa có câu sai/đánh dấu).</p>`;
    return;
  }

  const mins = +($("#dlQuizMinutes") ? $("#dlQuizMinutes").value : 20) || 20;
  dlQuiz = {
    srcVal,
    mode,
    qs: pool,
    i: 0,
    answers: [],
    score: 0,
    deadline: mode === "exam" ? Date.now() + mins * 60000 : null,
  };

  if (dlQuiz.deadline) {
    dlQuizTimer = setInterval(tickDuoclyTimer, 500);
  }
  renderDuoclyQ();
}

function tickDuoclyTimer() {
  if (!dlQuiz || !dlQuiz.deadline) return;
  const left = Math.max(0, dlQuiz.deadline - Date.now());
  const el = $("#dlTimer");
  if (el) {
    el.textContent = "⏱ " + String(Math.floor(left / 60000)).padStart(2, "0") + ":" + String(Math.floor(left / 1000) % 60).padStart(2, "0");
  }
  if (!left) finishDuoclyQuiz(true);
}

function renderDuoclyQ() {
  const box = $("#dlQuizBox");
  if (!box || !dlQuiz) return;
  if (dlQuiz.i >= dlQuiz.qs.length) return finishDuoclyQuiz();

  const q = dlQuiz.qs[dlQuiz.i];
  const exam = dlQuiz.mode === "exam";
  const last = dlQuiz.i === dlQuiz.qs.length - 1;
  const isBook = q.sourceType === "book";
  const badgeClass = isBook ? "badge-book" : "badge-slide";
  const badgeIcon = isBook ? "📖 Theo Sách" : "📑 Theo Slide";

  box.innerHTML = `
    <div class="quiz-head">
      <span class="muted">
        <span class="badge-source ${badgeClass}">${badgeIcon}</span>
        Câu ${dlQuiz.i + 1}/${dlQuiz.qs.length} · <b>${esc(q.topic)}</b>
      </span>
      <span>
        ${exam ? '<span class="timer" id="dlTimer"></span> ' : ""}
        <button class="mini" data-star="pq:${esc(q.id)}" data-short>${starLabel("pq:" + q.id, true)}</button>
      </span>
    </div>
    <div class="muted small" style="margin:4px 0 10px">🏛️ Nguồn tài liệu: ${esc(q.source || "Giáo trình Dược lý học ĐHYD & 22 Slide")}</div>
    <h3 style="line-height:1.45">${esc(q.question)}</h3>
    ${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}
    <div id="dlQFoot"></div>
  `;

  if (exam) tickDuoclyTimer();

  $$(".opt", box).forEach((b) => {
    b.onclick = () => {
      const k = +b.dataset.k;
      if (exam) {
        dlQuiz.answers[dlQuiz.i] = k;
        $$(".opt", box).forEach((x) => x.classList.toggle("sel", x === b));
        $("#dlQFoot").innerHTML = `<button class="btn" id="dlQNext">${last ? "Nộp bài thi" : "Câu tiếp theo →"}</button>`;
        $("#dlQNext").onclick = () => { dlQuiz.i++; renderDuoclyQ(); };
        return;
      }

      dlQuiz.answers[dlQuiz.i] = k;
      const ok = k === q.answer;
      if (ok) dlQuiz.score++;
      recordAnswer("Dược lý: " + q.topic, q.id, ok);

      $$(".opt", box).forEach((x) => {
        x.disabled = true;
        if (+x.dataset.k === q.answer) x.classList.add("correct");
      });
      if (!ok) b.classList.add("wrong");

      $("#dlQFoot").innerHTML = `
        ${q.explanation ? `<div class="expl"><b>💡 Giải thích chi tiết & Cơ chế:</b><br>${esc(q.explanation)}</div>` : ""}
        <p style="margin-top:12px">
          <button class="btn" id="dlQNext">${last ? "Xem kết quả trắc nghiệm" : "Câu tiếp theo →"}</button>
        </p>
      `;
      $("#dlQNext").onclick = () => { dlQuiz.i++; renderDuoclyQ(); };
    };
  });
}

function finishDuoclyQuiz(timeUp) {
  clearInterval(dlQuizTimer);
  if (!dlQuiz) return;

  const exam = dlQuiz.mode === "exam";
  if (exam) {
    dlQuiz.score = 0;
    dlQuiz.qs.forEach((q, i) => {
      const ok = dlQuiz.answers[i] === q.answer;
      if (ok) dlQuiz.score++;
      recordAnswer("Dược lý: " + q.topic, q.id, ok);
    });
  }

  const total = dlQuiz.qs.length;
  const pct = Math.round((dlQuiz.score / total) * 100);
  S.history.push({ t: Date.now(), mode: "pharmaco_" + dlQuiz.mode, score: dlQuiz.score, total });
  S.history = S.history.slice(-50);
  save();

  const review = dlQuiz.qs.map((q, i) => ({ q, a: dlQuiz.answers[i] })).filter((x) => x.a !== x.q.answer);

  $("#dlQuizBox").innerHTML = `
    <h3>${timeUp === true ? "⏰ Hết giờ làm bài! " : ""}Kết quả Trắc nghiệm Dược lý: ${dlQuiz.score}/${total} (${pct}%)</h3>
    <p class="muted">Đã lưu kết quả vào tiến độ học tập cá nhân (Nguồn: ${dlQuiz.srcVal === "book" ? "Sách" : dlQuiz.srcVal === "slide" ? "Slide" : "Mix"}).</p>
    ${review.length ? `
      <h4 style="margin-top:18px">🔍 Các câu cần xem lại & ôn kỹ:</h4>
      ${review.map(({ q, a }) => `
        <div class="case">
          <div class="muted small">${esc(q.topic)} · Nguồn: ${esc(q.source)}</div>
          <h4 style="margin:6px 0">${esc(q.question)}</h4>
          <p>
            Bạn chọn: <span class="muted">${a === undefined ? "(Bỏ trống)" : esc(q.options[a])}</span><br>
            Đáp án đúng: <b style="color:var(--primary)">${esc(q.options[q.answer])}</b>
          </p>
          ${q.explanation ? `<div class="expl">${esc(q.explanation)}</div>` : ""}
        </div>
      `).join("")}
    ` : '<p style="color:var(--primary);font-weight:600">🎉 Xuất sắc! Bạn đã trả lời đúng 100% câu hỏi Dược lý học!</p>'}
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn" id="dlQuizRestart">Luyện tập bộ đề khác</button>
      <a class="btn ghost" href="#duocly-review">📖 Chuyển sang Ôn tập lý thuyết</a>
    </div>
  `;

  $("#dlQuizRestart").onclick = () => {
    dlQuiz = null;
    $("#dlQuizBox").innerHTML = '<p class="muted">Chọn chuyên đề hoặc chế độ rồi bấm Bắt đầu làm bài.</p>';
  };
  dlQuiz = null;
}

PAGES["duocly-quiz"] = () => {
  const srcSel = $("#dlQuizSource");
  if (srcSel) srcSel.onchange = initDuoclyQuizTopics;
  initDuoclyQuizTopics();
  if ($("#dlQuizStart")) $("#dlQuizStart").onclick = startDuoclyQuiz;
};

// ---------- 5. Mind map Dược lý (duocly-mindmap) ----------
function renderDuoclyMindmap() {
  const sel = $("#dlMmSelect");
  if (!sel) return;

  const pMaps = (DATA.mindmaps || []).filter((m) => m.id.startsWith("mm-"));
  sel.innerHTML = pMaps.map((m) => `<option value="${esc(m.id)}">${esc(m.title)}</option>`).join("");

  const updatePreview = () => {
    const curId = sel.value;
    const m = pMaps.find((x) => x.id === curId);
    const prev = $("#dlMmPreview");
    if (!m || !prev) return;

    const renderBranch = (node, depth = 0) => `
      <div style="margin-left:${depth * 18}px;margin-top:6px;border-left:2px solid var(--border);padding-left:8px">
        <b>${esc(node.text)}</b>
        ${node.sub ? `<div class="muted small">${esc(node.sub)}</div>` : ""}
        ${node.ref ? `<span class="chip" data-open="${esc(node.ref)}" style="margin-top:4px">🔍 Xem chi tiết</span>` : ""}
        ${(node.children || []).map((c) => renderBranch(c, depth + 1)).join("")}
      </div>
    `;

    prev.innerHTML = `
      <h3>${esc(m.title)}</h3>
      <p class="muted small">${esc(m.root.info || "")}</p>
      <div style="margin-top:14px">${(m.root.children || []).map((c) => renderBranch(c, 0)).join("")}</div>
    `;
  };

  sel.onchange = updatePreview;
  updatePreview();

  const openFullBtn = $("#dlMmOpenFull");
  if (openFullBtn) {
    openFullBtn.onclick = () => {
      const curId = sel.value;
      location.hash = "#mindmap";
      setTimeout(() => {
        const mmSel = $("#mmSelect");
        if (mmSel) {
          mmSel.value = curId;
          mmSel.dispatchEvent(new Event("change"));
        }
      }, 50);
    };
  }
}
PAGES["duocly-mindmap"] = renderDuoclyMindmap;

// ---------- 6. Flashcard Dược lý (duocly-flashcards) ----------
let dlFc = { queue: [], cur: null, flipped: false };

function dlFcCards() {
  return (DATA.flashcards || []).filter((f) => f.id.startsWith("pfc")).map((f) => ({
    id: "fc:" + f.id,
    front: `<b>${esc(f.front)}</b>`,
    back: esc(f.back).replace(/\n/g, "<br>"),
  }));
}

function renderDuoclyFlashcards() {
  const cs = dlFcCards();
  const infoEl = $("#dlFcInfo");
  if (infoEl) {
    infoEl.textContent = `Tổng cộng ${cs.length} thẻ Flashcard chuyên sâu Dược lý học (Cơ chế, Thụ thể, ADR & Thuốc giải độc).`;
  }
  const box = $("#dlFcBox");
  if (!box) return;

  if (!dlFc.cur) {
    box.innerHTML = `
      <div class="panel" style="text-align:center;padding:32px">
        <h3>🗂️ Sẵn sàng luyện tập Flashcard Dược lý?</h3>
        <p class="muted">Ghi nhớ nhanh các thụ thể phân tử, độc tính nguy hiểm và thuốc giải độc đặc hiệu.</p>
        <button class="btn" id="dlFcStartBtn">Bắt đầu học thẻ</button>
      </div>
    `;
    const btn = $("#dlFcStartBtn");
    if (btn) btn.onclick = startDuoclyFc;
    return;
  }

  const c = dlFc.cur;
  box.innerHTML = `
    <p class="muted small">Còn ${dlFc.queue.length} thẻ · Bấm vào thẻ để lật xem đáp án</p>
    <div class="fc-card ${dlFc.flipped ? "back" : ""}" id="dlFcCard">${dlFc.flipped ? c.back : c.front}</div>
    <div class="fc-actions">
      ${dlFc.flipped
        ? '<button class="btn danger" data-rate="again">😵 Quên (1)</button><button class="btn ghost" data-rate="hard">🤔 Khó (2)</button><button class="btn" data-rate="easy">😀 Dễ (3)</button>'
        : '<button class="btn" id="dlFcFlip">Lật thẻ</button>'}
      <button class="btn ghost" data-star="${c.id}" data-short title="Đánh dấu">${starLabel(c.id, true)}</button>
    </div>
  `;

  $("#dlFcCard").onclick = flipDuoclyCard;
  const f = $("#dlFcFlip"); if (f) f.onclick = flipDuoclyCard;
  $$("[data-rate]", box).forEach((b) => (b.onclick = () => rateDuoclyCard(b.dataset.rate)));
}

function startDuoclyFc() {
  dlFc.queue = shuffle(dlFcCards());
  nextDuoclyCard();
}
function nextDuoclyCard() {
  dlFc.cur = dlFc.queue.shift() || null;
  dlFc.flipped = false;
  renderDuoclyFlashcards();
}
function flipDuoclyCard() {
  if (dlFc.cur) {
    dlFc.flipped = !dlFc.flipped;
    renderDuoclyFlashcards();
  }
}
function rateDuoclyCard(rate) {
  if (!dlFc.cur) return;
  const id = dlFc.cur.id;
  const now = Date.now();
  if (!S.srs[id]) S.srs[id] = { box: 1, next: now };
  const s = S.srs[id];
  if (rate === "again") s.box = 1;
  else if (rate === "hard") s.box = Math.max(1, s.box);
  else if (rate === "easy") s.box = Math.min(5, s.box + 1);
  save();
  nextDuoclyCard();
}
PAGES["duocly-flashcards"] = renderDuoclyFlashcards;

// ---------- 7. So sánh Thuốc Dược lý (duocly-compare) ----------
function toggleCompareDrug(id) {
  if (!S.compareDrugs) S.compareDrugs = [];
  const i = S.compareDrugs.indexOf(id);
  if (i >= 0) {
    S.compareDrugs.splice(i, 1);
  } else if (S.compareDrugs.length >= 4) {
    toast("Tối đa so sánh 4 thuốc cùng lúc");
    return;
  } else {
    S.compareDrugs.push(id);
  }
  save();
  renderDuoclyDrugs();
  renderDuoclyCompare();
  toast(i >= 0 ? "Đã bỏ khỏi so sánh thuốc" : "Đã thêm vào so sánh thuốc");

  $$('[data-cmp-drug="' + id + '"]').forEach((b) => {
    b.textContent = i >= 0 ? "⚖️ So sánh" : "✓ Đã chọn SS";
    b.classList.toggle("on", i < 0);
  });
}

function renderDuoclyCompare() {
  const sel = $("#dlCmpAdd");
  if (sel) {
    sel.innerHTML = '<option value="">＋ Thêm thuốc dược lý để so sánh (tối đa 4)</option>' +
      (DATA.drugs || []).filter((d) => !(S.compareDrugs || []).includes(d.id)).map((d) => `<option value="${d.id}">${esc(d.name)} (${esc(d.system)})</option>`).join("");
    sel.onchange = () => {
      if (sel.value) {
        toggleCompareDrug(sel.value);
        sel.value = "";
      }
    };
  }

  const clearBtn = $("#dlCmpClear");
  if (clearBtn) {
    clearBtn.onclick = () => {
      S.compareDrugs = [];
      save();
      renderDuoclyDrugs();
      renderDuoclyCompare();
      toast("Đã xóa danh sách so sánh");
    };
  }

  const items = (S.compareDrugs || []).map(getDrug).filter(Boolean);
  const tableEl = $("#dlCmpTable");
  if (!tableEl) return;

  if (!items.length) {
    tableEl.innerHTML = '<p class="muted" style="padding:20px">Chưa chọn thuốc nào để so sánh. Bạn hãy bấm nút "⚖️ So sánh" ở trang Tra cứu Thuốc hoặc chọn từ danh sách phía trên.</p>';
    return;
  }

  const rows = [
    ["Hệ cơ quan", (d) => `<span class="tag" style="background:#e0f2fe;color:#0369a1">${esc(d.system)}</span>`],
    ["Phân loại dược lý", (d) => esc(d.class)],
    ["Biệt dược", (d) => list(d.brandNames)],
    ["Cơ chế & Thụ thể", (d) => esc(d.mechanism)],
    ["Dược động học (ADME)", (d) => esc(d.pharmacokinetics)],
    ["Chỉ định chính", (d) => list(d.indications)],
    ["Chống chỉ định", (d) => list(d.contraindications)],
    ["Tác dụng phụ (ADR)", (d) => list(d.sideEffects)],
    ["Tương tác thuốc", (d) => list(d.interactions)],
    ["💡 Lưu ý lâm sàng", (d) => esc(d.notes)],
  ];

  tableEl.innerHTML = `
    <table class="tbl cmp left">
      <thead>
        <tr>
          <th style="min-width:180px">Tiêu chí so sánh</th>
          ${items.map((d) => `
            <th style="min-width:220px">
              <b>${esc(d.name)}</b>
              <button class="mini" style="margin-left:6px" data-cmp-drug="${esc(d.id)}" title="Bỏ thuốc này">✕ Bỏ</button>
            </th>
          `).join("")}
        </tr>
      </thead>
      <tbody>
        ${rows.map(([label, fn]) => `
          <tr>
            <td><b>${label}</b></td>
            ${items.map((d) => `<td>${fn(d)}</td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  $$("[data-cmp-drug]", tableEl).forEach((b) => {
    b.onclick = () => toggleCompareDrug(b.dataset.cmpDrug);
  });
}
PAGES["duocly-compare"] = renderDuoclyCompare;

// ---------- 8. Công cụ Dược lý Lâm sàng: DDI Checker & PK Calculator (duocly-tools) ----------
function renderDuoclyTools() {
  const btnDdi = $("#btnToolDdi");
  const btnPk = $("#btnToolPk");
  const panelDdi = $("#panelToolDdi");
  const panelPk = $("#panelToolPk");

  if (btnDdi && btnPk && panelDdi && panelPk) {
    btnDdi.onclick = () => {
      btnDdi.classList.add("active");
      btnPk.classList.remove("active");
      panelDdi.hidden = false;
      panelPk.hidden = true;
    };
    btnPk.onclick = () => {
      btnPk.classList.add("active");
      btnDdi.classList.remove("active");
      panelPk.hidden = false;
      panelDdi.hidden = true;
    };
  }

  // Khởi tạo DDI Checker
  initDdiChecker();

  // Khởi tạo PK Calculator
  initPkCalculator();
}

function initDdiChecker() {
  const sel1 = $("#ddiDrug1");
  const sel2 = $("#ddiDrug2");
  if (!sel1 || !sel2) return;

  const drugs = (DATA.drugs || []).slice().sort((a, b) => a.name.localeCompare(b.name));
  const optionsHtml = '<option value="">-- Chọn thuốc --</option>' +
    drugs.map((d) => `<option value="${esc(d.id)}">${esc(d.name)} (${esc(d.system)})</option>`).join("");

  if (sel1.options.length <= 1) sel1.innerHTML = optionsHtml;
  if (sel2.options.length <= 1) sel2.innerHTML = optionsHtml;

  const checkBtn = $("#btnCheckDdi");
  if (checkBtn) checkBtn.onclick = runDdiCheck;

  const presetBtn = $("#btnPresetDdi");
  if (presetBtn) {
    presetBtn.onclick = () => {
      const presets = (DATA.drug_interactions || []);
      const area = $("#ddiResultArea");
      if (!area) return;

      area.innerHTML = `
        <div style="margin-top:14px">
          <h4 style="margin:0 0 10px">⭐ Các cặp tương tác thuốc kinh điển trên lâm sàng:</h4>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${presets.map((p, idx) => `
              <button class="btn small-btn ghost" onclick="loadDdiPreset('${esc(p.drug1Id)}', '${esc(p.drug2Id)}')">
                ${esc(p.drug1Name)} ⚡ ${esc(p.drug2Name)}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    };
  }
}

function loadDdiPreset(id1, id2) {
  const sel1 = $("#ddiDrug1");
  const sel2 = $("#ddiDrug2");
  if (sel1) sel1.value = id1;
  if (sel2) sel2.value = id2;
  runDdiCheck();
}

function runDdiCheck() {
  const id1 = $("#ddiDrug1") ? $("#ddiDrug1").value : "";
  const id2 = $("#ddiDrug2") ? $("#ddiDrug2").value : "";
  const area = $("#ddiResultArea");
  if (!area) return;

  if (!id1 || !id2) {
    area.innerHTML = '<p class="muted" style="margin-top:12px">⚠️ Vui lòng chọn cả Thuốc A và Thuốc B để tiến hành kiểm tra tương tác.</p>';
    return;
  }
  if (id1 === id2) {
    area.innerHTML = '<p class="muted" style="margin-top:12px">⚠️ Bạn đang chọn cùng một thuốc. Vui lòng chọn 2 thuốc khác nhau.</p>';
    return;
  }

  const d1 = getDrug(id1);
  const d2 = getDrug(id2);
  const interactions = (DATA.drug_interactions || []);

  const match = interactions.find((it) =>
    (it.drug1Id === id1 && it.drug2Id === id2) ||
    (it.drug1Id === id2 && it.drug2Id === id1)
  );

  if (match) {
    const sevClass = match.severity === "Chống chỉ định" ? "ddi-sev-contra" :
                     match.severity === "Nghiêm trọng" ? "ddi-sev-major" : "ddi-sev-mod";
    const sevIcon = match.severity === "Chống chỉ định" ? "⛔" : "⚠️";

    area.innerHTML = `
      <div class="ddi-result ${sevClass}">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
          <h3 style="margin:0">${sevIcon} ${esc(match.drug1Name)} + ${esc(match.drug2Name)}</h3>
          <span class="tag" style="background:rgba(0,0,0,0.1);font-weight:700">${esc(match.severity)}</span>
        </div>
        <div style="margin-top:12px">
          <b>🧬 Cơ chế tương tác:</b>
          <p style="margin:4px 0 8px">${esc(match.mechanism)}</p>
        </div>
        <div>
          <b>🚨 Hậu quả lâm sàng:</b>
          <p style="margin:4px 0 8px">${esc(match.effect)}</p>
        </div>
        <div style="margin-top:10px;padding-top:10px;border-top:1px dashed rgba(0,0,0,0.2)">
          <b>🛡️ Hướng dẫn xử trí & Khuyến cáo:</b>
          <p style="margin:4px 0">${esc(match.management)}</p>
        </div>
      </div>
    `;
    return;
  }

  // Tương tác theo nhóm chung nếu không có match cụ thể
  let genericWarning = null;
  if ((d1.class.includes("Ức chế men chuyển") || d1.class.includes("Chẹn thụ thể AT1")) &&
      (d2.class.includes("Ức chế men chuyển") || d2.class.includes("Chẹn thụ thể AT1"))) {
    genericWarning = {
      severity: "Chống chỉ định",
      mechanism: "Tác động kép lên hệ Renin-Angiotensin-Aldosterone (RAAS block).",
      effect: "Tăng nguy cơ tụt huyết áp nặng, suy thận cấp và tăng kali máu tử vong mà không tăng thêm lợi ích tim mạch.",
      management: "Tuyệt đối không phối hợp 2 thuốc thuộc nhóm ACEI và ARB cùng lúc."
    };
  } else if (d1.class.includes("NSAID") && d2.class.includes("NSAID")) {
    genericWarning = {
      severity: "Chống chỉ định",
      mechanism: "Ức chế trùng lắp COX-1 và COX-2 của 2 thuốc NSAID.",
      effect: "Tăng gấp nhiều lần nguy cơ loét thủng dạ dày tá tràng và suy thận cấp mà không tăng thêm hiệu quả giảm đau.",
      management: "Không dùng đồng thời 2 NSAID. Phối hợp Paracetamol nếu cần tăng kiểm soát đau."
    };
  }

  if (genericWarning) {
    area.innerHTML = `
      <div class="ddi-result ddi-sev-contra">
        <h3>⛔ ${esc(d1.name)} + ${esc(d2.name)}</h3>
        <p><b>Mức độ:</b> ${esc(genericWarning.severity)}</p>
        <p><b>Cơ chế:</b> ${esc(genericWarning.mechanism)}</p>
        <p><b>Hậu quả:</b> ${esc(genericWarning.effect)}</p>
        <p><b>Xử trí:</b> ${esc(genericWarning.management)}</p>
      </div>
    `;
    return;
  }

  area.innerHTML = `
    <div class="panel" style="margin-top:14px;background:#f0fdf4;border-color:#bbf7d0;color:#166534">
      <h4>✅ Chưa ghi nhận tương tác bất lợi nghiêm trọng</h4>
      <p style="margin:4px 0">Không tìm thấy cảnh báo tương tác đối đầu mức độ nặng giữa <b>${esc(d1.name)}</b> và <b>${esc(d2.name)}</b> trong cơ sở dữ liệu.</p>
      <p class="muted small" style="margin:4px 0">Khuyến cáo: Luôn theo dõi chức năng gan, thận và lâm sàng thực tế của người bệnh khi phối hợp đa thuốc.</p>
    </div>
  `;
}

function initPkCalculator() {
  const btn = $("#btnCalcPk");
  if (btn) btn.onclick = runPkCalc;
}

function runPkCalc() {
  const gender = $("#pkGender") ? $("#pkGender").value : "male";
  const age = +($("#pkAge") ? $("#pkAge").value : 65);
  const weight = +($("#pkWeight") ? $("#pkWeight").value : 60);
  let scr = +($("#pkScr") ? $("#pkScr").value : 1.2);
  const scrUnit = $("#pkScrUnit") ? $("#pkScrUnit").value : "mgdl";
  const drug = $("#pkDrug") ? $("#pkDrug").value : "none";
  const area = $("#pkResultArea");
  if (!area) return;

  if (scrUnit === "umol") {
    scr = scr / 88.4; // chuyển đổi sang mg/dL
  }

  if (age <= 0 || weight <= 0 || scr <= 0) {
    area.innerHTML = '<p class="muted">Vui lòng nhập đầy đủ các chỉ số hợp lệ (Tuổi > 0, Cân nặng > 0, Scr > 0).</p>';
    return;
  }

  // Công thức Cockcroft-Gault:
  // Clcr (mL/min) = [ (140 - Tuổi) * Cân nặng ] / [ 72 * Scr ] * (0.85 nếu Nữ)
  const factor = gender === "female" ? 0.85 : 1.0;
  const clcr = Math.round((((140 - age) * weight) / (72 * scr)) * factor * 10) / 10;

  let stage = "";
  let stageColor = "";
  if (clcr >= 90) { stage = "Bình thường / Tăng lọc (G1)"; stageColor = "#15803d"; }
  else if (clcr >= 60) { stage = "Giảm nhẹ chức năng thận (G2)"; stageColor = "#0284c7"; }
  else if (clcr >= 30) { stage = "Giảm vừa chức năng thận (G3a/G3b)"; stageColor = "#d97706"; }
  else if (clcr >= 15) { stage = "Giảm nặng chức năng thận (G4)"; stageColor = "#ea580c"; }
  else { stage = "Suy thận giai đoạn cuối / Cần lọc máu (G5)"; stageColor = "#dc2626"; }

  // Gợi ý liều theo thuốc
  let drugAdvice = "";
  if (drug === "digoxin") {
    let doseText = "";
    if (clcr >= 50) doseText = "0.25 mg/ngày (1 viên 0.25mg)";
    else if (clcr >= 30) doseText = "0.125 mg/ngày (hoặc 0.25mg cách nhật)";
    else if (clcr >= 15) doseText = "0.0625 mg/ngày (hoặc 0.125mg cách nhật)";
    else doseText = "0.0625 mg mỗi 48-72 giờ (hoặc chuyển thuốc khác)";

    drugAdvice = `
      <div style="margin-top:14px;padding:14px;background:var(--card);border:1px solid var(--border);border-radius:10px">
        <h4 style="margin:0 0 6px;color:var(--primary)">💊 Hướng dẫn Dược động học & Liều Digoxin:</h4>
        <p style="margin:4px 0"><b>Mục tiêu trị liệu:</b> Nồng độ đáy (trough level) $0.5 - 0.9\\text{ ng/mL}$ (lấy máu sau liều ít nhất 6-8 giờ).</p>
        <p style="margin:4px 0"><b>Gợi ý liều duy trì ước tính:</b> <b style="color:var(--primary)">${doseText}</b></p>
        <p class="muted small" style="margin:4px 0">⚠️ Lưu ý: Giảm 50% liều khi dùng chung với Amiodarone, Verapamil hoặc Clarithromycin. Bù Kali máu duy trì $K^+ > 4.0\\text{ mmol/L}$ để tránh ngộ độc tim.</p>
      </div>
    `;
  } else if (drug === "gentamicin") {
    let intervalText = "";
    if (clcr >= 60) intervalText = "Mỗi 24 giờ (q24h)";
    else if (clcr >= 40) intervalText = "Mỗi 36 giờ (q36h)";
    else if (clcr >= 20) intervalText = "Mỗi 48 giờ (q48h)";
    else intervalText = "Dùng 1 liều ban đầu, định lượng nồng độ huyết thanh để quyết định liều kế tiếp";

    const doseMg = Math.round(weight * 5); // 5 mg/kg
    drugAdvice = `
      <div style="margin-top:14px;padding:14px;background:var(--card);border:1px solid var(--border);border-radius:10px">
        <h4 style="margin:0 0 6px;color:var(--primary)">💊 Hướng dẫn Dược động học Gentamicin / Tobramycin:</h4>
        <p style="margin:4px 0"><b>Chế độ liều mở rộng (ODA - Once Daily Aminoglycoside):</b> $5 - 7\\text{ mg/kg}$ truyền TM 60 phút.</p>
        <p style="margin:4px 0"><b>Liều ước tính cho BN ${weight}kg:</b> <b style="color:var(--primary)">${doseMg} mg</b> · Khoảng cách liều: <b style="color:var(--primary)">${intervalText}</b></p>
        <p class="muted small" style="margin:4px 0">⚠️ Mục tiêu TDM: Nồng độ đáy $C_{trough} < 1\\text{ mg/L}$ trước liều kế tiếp để ngăn độc tính trên thận và thính giác.</p>
      </div>
    `;
  } else if (drug === "vancomycin") {
    const loadMg = Math.min(3000, Math.round(weight * 25));
    let maintText = "";
    if (clcr >= 90) maintText = "15 - 20 mg/kg mỗi 8-12 giờ";
    else if (clcr >= 50) maintText = "15 - 20 mg/kg mỗi 12-24 giờ";
    else if (clcr >= 20) maintText = "15 - 20 mg/kg mỗi 24-48 giờ";
    else maintText = "15 - 20 mg/kg mỗi 48-72 giờ hoặc đo nồng độ đáy trước khi lặp liều";

    drugAdvice = `
      <div style="margin-top:14px;padding:14px;background:var(--card);border:1px solid var(--border);border-radius:10px">
        <h4 style="margin:0 0 6px;color:var(--primary)">💊 Hướng dẫn Dược động học & TDM Vancomycin:</h4>
        <p style="margin:4px 0"><b>Liều nạp (Loading dose):</b> $25 - 30\\text{ mg/kg}$ $\\rightarrow$ <b style="color:var(--primary)">${loadMg} mg</b> (truyền chậm $\\le 10\\text{ mg/phút}$ để ngừa Red Man Syndrome).</p>
        <p style="margin:4px 0"><b>Liều duy trì ước tính:</b> <b style="color:var(--primary)">${maintText}</b></p>
        <p class="muted small" style="margin:4px 0">⚠️ Mục tiêu TDM theo IDSA 2024: $AUC_{24}/MIC = 400 - 600$ (hoặc nồng độ đáy $C_{trough} = 15 - 20\\text{ mg/L}$ trong nhiễm khuẩn nặng).</p>
      </div>
    `;
  }

  area.innerHTML = `
    <div class="calc-res-box">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap">
        <div>
          <span class="muted small">Độ thanh thải Creatinine ước tính (Cockcroft-Gault):</span>
          <div class="calc-res-val">${clcr} <span style="font-size:1.1rem;font-weight:normal">mL/phút</span></div>
        </div>
        <div>
          <span class="tag" style="background:${stageColor};color:#fff;font-size:0.85rem;padding:4px 10px">${esc(stage)}</span>
        </div>
      </div>
      <div class="calc-res-desc">
        Công thức tính: $Cl_{cr} = \\frac{(140 - ${age}) \\times ${weight}}{72 \\times ${scr.toFixed(2)}} \\times ${factor} = ${clcr}\\text{ mL/phút}$.
      </div>
      ${drugAdvice}
    </div>
  `;
}

PAGES["duocly-tools"] = renderDuoclyTools;

// ---------- 9. Tiến độ Dược lý (duocly-progress) ----------
function renderDuoclyProgress() {
  const box = $("#dlProgressBox");
  if (!box) return;

  const dlStats = Object.entries(S.stats).filter(([k]) => k.startsWith("Dược lý: "));
  const totalAnswers = dlStats.reduce((s, [, v]) => s + v.total, 0);
  const rightAnswers = dlStats.reduce((s, [, v]) => s + v.right, 0);
  const accuracy = totalAnswers ? Math.round((rightAnswers / totalAnswers) * 100) : 0;

  const dlCards = dlFcCards();
  const fcLearned = dlCards.filter((c) => S.srs[c.id] && S.srs[c.id].box >= 3).length;

  box.innerHTML = `
    <div class="stats">
      <div class="stat"><b>${accuracy}%</b><span class="muted small">Độ chính xác Trắc nghiệm (${rightAnswers}/${totalAnswers} câu)</span></div>
      <div class="stat"><b>${(DATA.drugs || []).length}</b><span class="muted small">Thuốc chuẩn hóa trong CSDL</span></div>
      <div class="stat"><b>${(DATA.pharmaco_reviews || []).length}</b><span class="muted small">Chuyên đề Ôn tập Lý thuyết</span></div>
      <div class="stat"><b>${fcLearned}/${dlCards.length}</b><span class="muted small">Flashcard đã nắm vững</span></div>
    </div>

    <div class="panel">
      <h3>📊 Thống kê ôn tập theo từng Chuyên đề Dược lý</h3>
      ${dlStats.length ? `
        ${dlStats.map(([topic, v]) => {
          const pct = Math.round((v.right / v.total) * 100);
          return `
            <div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between">
                <b>${esc(topic.replace("Dược lý: ", ""))}</b>
                <span>${v.right}/${v.total} (${pct}%)</span>
              </div>
              <div class="bar"><span style="width:${pct}%"></span></div>
            </div>
          `;
        }).join("")}
      ` : '<p class="muted">Chưa có kết quả làm bài trắc nghiệm Dược lý. Hãy vào mục "📝 Trắc nghiệm" để bắt đầu!</p>'}
    </div>
  `;
}
PAGES["duocly-progress"] = renderDuoclyProgress;

// Lắng nghe sự kiện click nút compare thuốc
document.addEventListener("click", (e) => {
  const c = e.target.closest("[data-cmp-drug]");
  if (c) {
    e.stopPropagation();
    toggleCompareDrug(c.dataset.cmpDrug);
  }
});
