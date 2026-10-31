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
    documents: "documents",
    drugs: "drugs",
    pharmaco_quizzes: "pharmaco_quizzes",
    pharmaco_reviews: "pharmaco_reviews",
    drug_interactions: "drug_interactions",
  };
  await Promise.all(Object.entries(files).map(async ([k, f]) => (DATA[k] = await loadJSON(`data/${f}.json`, k))));
  fillSelect("#abClass", DATA.antibiotics.map((a) => a.class));
  fillSelect("#spClass", DATA.antibiotics.map((a) => a.class));
  fillSelect("#moGram", DATA.microbes.map((m) => m.gram));
  fillSelect("#spGram", DATA.microbes.map((m) => m.gram));
  fillSelect("#moPriority", DATA.microbes.map((m) => m.whoPriority));
  buildCards(); buildSearchIndex();
  renderAb(); renderMo();
  if (typeof initDockSections === "function") initDockSections();
  if (typeof initPharmacology === "function") initPharmacology();
  if (typeof initFeedbackPopup === "function") initFeedbackPopup();
  route();
}
init();
