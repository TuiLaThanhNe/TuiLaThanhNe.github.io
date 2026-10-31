// ===== Học tập: flashcard (Leitner), ôn luyện / thi thử, ca lâm sàng =====
const DAY = 864e5, BOX_DAYS = [0, 1, 2, 4, 8, 16];

function recordAnswer(topic, id, ok) {
  const t = topic || "Khác", st = S.stats[t] || (S.stats[t] = { right: 0, total: 0 });
  st.total++; if (ok) st.right++;
  if (id) ok ? delete S.wrong[id] : (S.wrong[id] = 1);
  save();
}

// ---------- Flashcard ----------
let CARDS = [];
function buildCards() {
  CARDS = [];
  DATA.antibiotics.forEach((a) => CARDS.push({ id: "ab:" + a.id, deck: "ab",
    front: `<b style="font-size:1.5rem">${esc(a.name)}</b><div class="muted">${esc(a.class)}${a.aware ? " · WHO " + esc(a.aware) : ""}</div><p class="muted small">Cơ chế? Phổ? Chỉ định? Liều dùng? Tác dụng phụ?</p>`,
    back: dl([["Cơ chế", esc(a.mechanism)], ["Phổ", esc(a.spectrum)], ["Chỉ định", list(a.indications)], ["Liều dùng", esc(a.dosing)], ["Tác dụng phụ", list(a.sideEffects)]]) }));
  DATA.microbes.forEach((m) => CARDS.push({ id: "mo:" + m.id, deck: "mo",
    front: `<b style="font-size:1.5rem"><i>${esc(m.name)}</i></b><div class="muted">${esc(m.commonName)}${m.whoPriority ? " · WHO: " + esc(m.whoPriority) : ""}</div><p class="muted small">Đặc điểm? Bệnh? Kháng sinh? Đề kháng?</p>`,
    back: dl([["Gram / hình thái", esc(m.gram + " – " + (m.shape || ""))], ["Bệnh", list(m.diseases)], ["Đặc điểm & Chẩn đoán", esc(m.characteristics)], ["Kháng sinh", antibioticsFor(m.id).map((a) => esc(a.name)).join(", ")], ["Đề kháng & Phác đồ", esc(m.resistance + " — " + (m.notes || ""))]]) }));
  (DATA.drugs || []).forEach((d) => CARDS.push({ id: "dr:" + d.id, deck: "dr",
    front: `<b style="font-size:1.5rem">${esc(d.name)}</b><div class="muted">${esc(d.system)} · ${esc(d.class)}</div><p class="muted small">Cơ chế? ADME? Chỉ định? Chống chỉ định? Tác dụng phụ?</p>`,
    back: dl([["Cơ chế & Thụ thể", esc(d.mechanism)], ["Dược động học (ADME)", esc(d.pharmacokinetics)], ["Chỉ định", list(d.indications)], ["Chống chỉ định", list(d.contraindications)], ["Tác dụng phụ", list(d.sideEffects)], ["Lưu ý lâm sàng", esc(d.notes)]]) }));
  DATA.flashcards.forEach((f) => CARDS.push({ id: "fc:" + f.id, deck: "fc",
    front: `<b>${esc(f.front)}</b>`, back: esc(f.back).replace(/\n/g, "<br>") }));
}
const isDue = (c) => !S.srs[c.id] || S.srs[c.id].due <= Date.now();
const deckCards = () => { const d = $("#fcDeck").value; return CARDS.filter((c) => d === "all" || c.deck === d || (d === "starred" && S.stars[c.id])); };
let fc = { queue: [], cur: null, flipped: false };

function fcInfo() {
  const cs = deckCards();
  $("#fcInfo").textContent = `${cs.filter((c) => !S.srs[c.id]).length} thẻ mới · ${cs.filter((c) => S.srs[c.id] && isDue(c)).length} đến hạn · ${cs.filter((c) => S.srs[c.id] && S.srs[c.id].box >= 4).length} đã thuộc · tổng ${cs.length}`;
}
function startFc() {
  const cs = deckCards(), more = $("#fcMore").checked;
  fc.queue = shuffle(cs.filter((c) => more || isDue(c)));
  fcInfo(); nextCard();
}
function nextCard() {
  fc.cur = fc.queue.shift() || null; fc.flipped = false; renderCard();
}
function renderCard() {
  const box = $("#fcBox");
  if (!fc.cur) {
    box.innerHTML = '<div class="quiz-box"><h3>🎉 Hết thẻ cần học!</h3><p class="muted">Tick "Gồm cả thẻ chưa đến hạn" để ôn thêm, hoặc quay lại sau.</p></div>'; return;
  }
  const c = fc.cur;
  box.innerHTML = `<p class="muted small">Còn ${fc.queue.length} thẻ nữa · bấm vào thẻ (hoặc phím Space) để lật</p>
    <div class="fc-card ${fc.flipped ? "back" : ""}" id="fcCard">${fc.flipped ? c.back : c.front}</div>
    <div class="fc-actions">${fc.flipped
      ? '<button class="btn danger" data-rate="again">😵 Quên (1)</button><button class="btn ghost" data-rate="hard">🤔 Khó (2)</button><button class="btn" data-rate="easy">😀 Dễ (3)</button>'
      : '<button class="btn" id="fcFlip">Lật thẻ</button>'}
      <button class="btn ghost" data-star="${c.id}" data-short title="Đánh dấu">${starLabel(c.id, true)}</button></div>`;
  $("#fcCard").onclick = flipCard;
  const f = $("#fcFlip"); if (f) f.onclick = flipCard;
  $$("[data-rate]", box).forEach((b) => (b.onclick = () => rateCard(b.dataset.rate)));
}
function flipCard() { if (fc.cur) { fc.flipped = !fc.flipped; renderCard(); } }
function rateCard(r) {
  const c = fc.cur; if (!c) return;
  const box0 = (S.srs[c.id] || { box: 0 }).box;
  const box = r === "again" ? 0 : r === "hard" ? Math.max(1, box0) : Math.min(5, box0 + 1);
  S.srs[c.id] = { box, due: Date.now() + BOX_DAYS[box] * DAY, last: Date.now() };
  if (r === "again") fc.queue.push(c);
  save(); fcInfo(); nextCard();
}
document.addEventListener("keydown", (e) => {
  if (currentPage() !== "flashcards" || !fc.cur || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
  if (e.key === " ") { e.preventDefault(); flipCard(); }
  else if (fc.flipped && "123".includes(e.key)) rateCard(["again", "hard", "easy"][+e.key - 1]);
});
$("#fcStart").onclick = startFc; $("#fcDeck").onchange = () => { fcInfo(); };
PAGES.flashcards = fcInfo;

// ---------- Ôn luyện / Thi thử ----------
let quiz = null, quizTimer = null;
$("#quizMode").onchange = () => { $("#quizMinutes").hidden = $("#quizMode").value !== "exam"; };

function startQuiz() {
  const mode = $("#quizMode").value, topic = $("#quizTopic").value;
  const allQs = [...DATA.quizzes, ...(DATA.pharmaco_quizzes || [])];
  let pool = allQs.filter((q) => !topic || q.topic === topic);
  if (mode === "wrong") pool = pool.filter((q) => S.wrong[q.id]);
  if (mode === "starred") pool = pool.filter((q) => S.stars["q:" + q.id] || S.stars["pq:" + q.id]);
  pool = shuffle(pool).slice(0, +$("#quizCount").value || pool.length);
  clearInterval(quizTimer);
  if (!pool.length) { $("#quizBox").innerHTML = '<p class="muted">Không có câu hỏi phù hợp (chưa có dữ liệu, hoặc chưa có câu sai/đánh dấu).</p>'; return; }
  quiz = { mode, qs: pool, i: 0, answers: [], score: 0, deadline: mode === "exam" ? Date.now() + (+$("#quizMinutes").value || 15) * 60000 : null };
  if (quiz.deadline) quizTimer = setInterval(tickTimer, 500);
  renderQ();
}
function tickTimer() {
  const left = Math.max(0, quiz.deadline - Date.now()), el = $("#qTimer");
  if (el) el.textContent = "⏱ " + String(Math.floor(left / 60000)).padStart(2, "0") + ":" + String(Math.floor(left / 1000) % 60).padStart(2, "0");
  if (!left) finishQuiz(true);
}
function renderQ() {
  const box = $("#quizBox");
  if (quiz.i >= quiz.qs.length) return finishQuiz();
  const q = quiz.qs[quiz.i], exam = quiz.mode === "exam", last = quiz.i === quiz.qs.length - 1;
  box.innerHTML = `<div class="quiz-head"><span class="muted">Câu ${quiz.i + 1}/${quiz.qs.length} · ${esc(q.topic)}</span>
    <span>${exam ? '<span class="timer" id="qTimer"></span> ' : ""}<button class="mini" data-star="q:${q.id}" data-short>${starLabel("q:" + q.id, true)}</button></span></div>
    <h3>${esc(q.question)}</h3>${q.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}
    <div id="qFoot"></div>`;
  if (exam) tickTimer();
  $$(".opt", box).forEach((b) => (b.onclick = () => {
    const k = +b.dataset.k;
    if (exam) {
      quiz.answers[quiz.i] = k;
      $$(".opt", box).forEach((x) => x.classList.toggle("sel", x === b));
      $("#qFoot").innerHTML = `<button class="btn" id="qNext">${last ? "Nộp bài" : "Câu tiếp →"}</button>`;
      $("#qNext").onclick = () => { quiz.i++; renderQ(); };
      return;
    }
    quiz.answers[quiz.i] = k;
    const ok = k === q.answer; if (ok) quiz.score++;
    recordAnswer(q.topic, q.id, ok);
    $$(".opt", box).forEach((x) => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add("correct"); });
    if (!ok) b.classList.add("wrong");
    $("#qFoot").innerHTML = (q.explanation ? `<div class="expl">${esc(q.explanation)}</div>` : "") + `<p><button class="btn" id="qNext">${last ? "Xem kết quả" : "Câu tiếp →"}</button></p>`;
    $("#qNext").onclick = () => { quiz.i++; renderQ(); };
  }));
}
function finishQuiz(timeUp) {
  clearInterval(quizTimer);
  if (!quiz) return;
  const exam = quiz.mode === "exam";
  if (exam) { // chấm toàn bộ, câu bỏ trống tính sai
    quiz.score = 0;
    quiz.qs.forEach((q, i) => { const ok = quiz.answers[i] === q.answer; if (ok) quiz.score++; recordAnswer(q.topic, q.id, ok); });
  }
  const total = quiz.qs.length, pct = Math.round((quiz.score / total) * 100);
  S.history.push({ t: Date.now(), mode: quiz.mode, score: quiz.score, total }); S.history = S.history.slice(-50); save();
  const review = quiz.qs.map((q, i) => ({ q, a: quiz.answers[i] })).filter((x) => x.a !== x.q.answer);
  $("#quizBox").innerHTML = `<h3>${timeUp === true ? "⏰ Hết giờ! " : ""}Kết quả: ${quiz.score}/${total} (${pct}%)</h3>` +
    (review.length ? "<h4>Các câu cần xem lại</h4>" + review.map(({ q, a }) => `<div class="case"><b>${esc(q.question)}</b>
      <p>Bạn chọn: <span class="muted">${a === undefined ? "(bỏ trống)" : esc(q.options[a])}</span><br>Đáp án đúng: <b>${esc(q.options[q.answer])}</b></p>${q.explanation ? `<div class="expl">${esc(q.explanation)}</div>` : ""}</div>`).join("") : "<p>🎉 Chính xác tất cả!</p>");
  quiz = null;
}
$("#quizStart").onclick = startQuiz;
PAGES.quiz = () => {
  const sel = $("#quizTopic"), cur = sel.value;
  const allQs = [...DATA.quizzes, ...(DATA.pharmaco_quizzes || [])];
  sel.innerHTML = '<option value="">Tất cả chủ đề</option>'; fillSelect("#quizTopic", allQs.map((q) => q.topic)); sel.value = cur;
};

// ---------- Ca lâm sàng ----------
PAGES.cases = () => {
  $("#caseList").innerHTML = DATA.cases.map((c) => `<div class="case" data-case="${c.id}"><h3>${esc(c.title)}</h3>
    <div class="scenario">${esc(c.scenario)}</div><p><b>${esc(c.question)}</b></p>
    ${c.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join("")}<div class="case-foot"></div></div>`).join("") || '<p class="muted">Chưa có ca lâm sàng. Thêm vào data/cases.json.</p>';
  $$(".case[data-case]").forEach((el) => {
    const c = DATA.cases.find((x) => x.id === el.dataset.case);
    $$(".opt", el).forEach((b) => (b.onclick = () => {
      const k = +b.dataset.k, ok = k === c.answer;
      $$(".opt", el).forEach((x) => { x.disabled = true; if (+x.dataset.k === c.answer) x.classList.add("correct"); });
      if (!ok) b.classList.add("wrong");
      $(".case-foot", el).innerHTML = c.explanation ? `<div class="expl">${esc(c.explanation)}</div>` : "";
      recordAnswer("Ca lâm sàng", null, ok);
    }));
  });
};
