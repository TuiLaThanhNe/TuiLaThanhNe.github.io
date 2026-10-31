// ===== Theme: sáng / tối / tùy chỉnh (dán mã HEX), lưu localStorage =====
const CUSTOM_DEFAULT = { bg: "#f5f8fb", fg: "#1c2733", card: "#ffffff", primary: "#0b7a75" };
const root = document.documentElement;
let themeName = localStorage.getItem("theme") || "light";
let customColors = { ...CUSTOM_DEFAULT };
try { Object.assign(customColors, JSON.parse(localStorage.getItem("customTheme") || "{}")); } catch {}

// Chấp nhận "#abc", "abc", "#aabbcc", "aabbcc" -> "#aabbcc"
function normHex(v) {
  v = (v || "").trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(v)) v = v.split("").map((c) => c + c).join("");
  return /^[0-9a-f]{6}$/i.test(v) ? "#" + v.toLowerCase() : null;
}
function contrastOn(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#0f1720" : "#ffffff";
}
function applyTheme() {
  const keys = ["bg", "fg", "card", "primary", "btn-fg"];
  if (themeName === "custom") {
    root.setAttribute("data-theme", "custom");
    Object.entries(customColors).forEach(([k, v]) => root.style.setProperty("--" + k, v));
    root.style.setProperty("--btn-fg", contrastOn(customColors.primary));
  } else {
    keys.forEach((k) => root.style.removeProperty("--" + k));
    root.setAttribute("data-theme", themeName);
  }
  $$(".preset").forEach((b) => b.classList.toggle("active", b.dataset.preset === themeName));
  $("#customFields").hidden = themeName !== "custom";
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(root).getPropertyValue("--card").trim() || "#ffffff";
}
function syncInputs() {
  $$("#customFields input").forEach((i) => {
    i.value = customColors[i.dataset.key].toUpperCase();
    i.classList.remove("invalid");
    $(`.swatch[data-for="${i.dataset.key}"]`).style.background = customColors[i.dataset.key];
  });
}
$$("#customFields input").forEach((i) => i.addEventListener("input", () => {
  const hex = normHex(i.value);
  i.classList.toggle("invalid", !hex);
  if (!hex) return;
  customColors[i.dataset.key] = hex;
  $(`.swatch[data-for="${i.dataset.key}"]`).style.background = hex;
  localStorage.setItem("customTheme", JSON.stringify(customColors));
  if (themeName === "custom") applyTheme();
}));
$$(".preset").forEach((b) => (b.onclick = () => {
  themeName = b.dataset.preset; localStorage.setItem("theme", themeName);
  applyTheme(); syncInputs();
}));
$("#themeReset").onclick = () => {
  customColors = { ...CUSTOM_DEFAULT }; localStorage.setItem("customTheme", JSON.stringify(customColors));
  applyTheme(); syncInputs();
};
$("#themeToggle").onclick = (e) => { e.stopPropagation(); $("#themePanel").hidden = !$("#themePanel").hidden; };
document.addEventListener("click", (e) => {
  if (!e.target.closest("#themePanel") && !e.target.closest("#themeToggle")) $("#themePanel").hidden = true;
});
applyTheme(); syncInputs();
