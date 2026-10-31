// ===== Khởi tạo =====
async function init() {
  const files = {
    antibiotics: "antibiotics",
    microbes: "microbes",
    quizzes: "quizzes",
    spectrum: "spectrum",
    cases: "cases",
    mindmaps: "mindmaps",
    flashcards: "flashcards",
    guidelines: "guidelines",
  };
  await Promise.all(Object.entries(files).map(async ([k, f]) => (DATA[k] = await loadJSON(`data/${f}.json`, k))));
  fillSelect("#abClass", DATA.antibiotics.map((a) => a.class));
  fillSelect("#spClass", DATA.antibiotics.map((a) => a.class));
  fillSelect("#moGram", DATA.microbes.map((m) => m.gram));
  fillSelect("#spGram", DATA.microbes.map((m) => m.gram));
  fillSelect("#moPriority", DATA.microbes.map((m) => m.whoPriority));
  buildCards(); buildSearchIndex();
  renderAb(); renderMo();
  route();
}
init();
