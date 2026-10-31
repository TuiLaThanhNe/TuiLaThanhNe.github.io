// ===== Mind map (SVG không giới hạn khung): 3 sơ đồ lâm sàng trọng tâm + mở dần từng nhánh khi click =====
const MM = {
  root: null,
  nodes: [],
  view: { x: 40, y: 40, k: 1 },
  mapId: null,
  moved: false,
  selectedNode: null,
  fullscreen: false
};

const MM_GX = 78; // khoảng cách ngang giữa các cấp
const MM_GY = 14; // khoảng cách dọc giữa các thẻ
const MM_MAX_W = 310; // chiều rộng tối đa của 1 thẻ (tự xuống dòng nếu dài hơn)
const mmColor = (i) => ["#0b7a75", "#2563eb", "#d97706", "#7c3aed", "#dc2626", "#0891b2"][i % 6];
const mmCtx = document.createElement("canvas").getContext("2d");

const MY_MAP_DEFAULT =
  "Mind map của tôi\n  Nhánh chính 1\n    Ý nhỏ A\n    Ý nhỏ B\n  Nhánh chính 2\n    Ý nhỏ C";

// Chia văn bản thành các dòng vừa khung thẻ
function wrapLines(text, font, maxW) {
  if (!text) return [];
  mmCtx.font = font;
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    const test = cur ? cur + " " + w : w;
    if (mmCtx.measureText(test).width > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

// Mặc định thu gọn từ cấp 1 trở đi (progressive disclosure: bấm vào thẻ mới hiện phần sau)
function cloneTree(n, depth = 0, collapseFrom = 1) {
  const hasKids = !!(n.children && n.children.length);
  const c = {
    text: n.text || "",
    sub: n.sub || "",
    info: n.info || "",
    ref: n.ref || "",
    collapsed: hasKids ? depth >= collapseFrom : false,
    depth,
    children: []
  };
  c.children = (n.children || []).map((ch) => cloneTree(ch, depth + 1, collapseFrom));
  return c;
}

function parseIndented(text) {
  const lines = text.split("\n").map((l) => l.replace(/\t/g, "  ")).filter((l) => l.trim());
  if (!lines.length) return { text: "Mind map", children: [] };
  const top = { text: "__root__", children: [] }, stack = [{ indent: -1, node: top }];
  lines.forEach((l) => {
    const indent = l.match(/^ */)[0].length, node = { text: l.trim(), children: [] };
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
    stack[stack.length - 1].node.children.push(node);
    stack.push({ indent, node });
  });
  return top.children.length === 1 ? top.children[0] : { text: "Mind map", children: top.children };
}

function mapList() {
  return [
    ...DATA.mindmaps.map((m) => ({
      id: "m-" + m.id,
      title: m.title,
      shortTitle: m.id === "pathogen-directed"
        ? "🎯 Theo định danh vi khuẩn"
        : m.id === "empirical-moh-vn"
          ? "🩺 Kinh nghiệm (Bộ Y tế VN)"
          : m.id === "mechanism-of-action"
            ? "🧬 Theo cơ chế tác động"
            : m.title,
      build: () => m.root
    })),
    {
      id: "gen-mo",
      title: "🦠 Phân loại Vi sinh vật: Nhuộm Gram → Hình thái → Loài",
      shortTitle: "🦠 Cây Vi sinh vật",
      build: () => {
        const g = {};
        DATA.microbes.filter((m) => m.id !== "viruses-prion").forEach((m) => {
          ((g[m.gram || "Khác"] ||= {})[m.shape || "Khác"] ||= []).push(m);
        });
        return {
          text: "Hệ thống Vi sinh vật gây bệnh",
          sub: "Phân loại theo tính chất nhuộm Gram & Hình thái học",
          children: Object.entries(g).map(([gram, shapes]) => ({
            text: gram,
            sub: `${Object.values(shapes).reduce((s, a) => s + a.length, 0)} loài vi khuẩn`,
            children: Object.entries(shapes).map(([shape, arr]) => ({
              text: shape,
              children: arr.map((m) => ({
                text: m.name,
                sub: m.commonName || "",
                info: m.notes || "",
                ref: "mo:" + m.id
              }))
            }))
          }))
        };
      }
    },
    {
      id: "my",
      title: "✏️ Mind map tự ghi chú của tôi",
      shortTitle: "✏️ Tự vẽ",
      build: () => parseIndented(S.myMap || MY_MAP_DEFAULT)
    }
  ];
}

function renderQuickTabs() {
  const box = $("#mmQuickTabs");
  if (!box) return;
  const list = mapList();
  box.innerHTML = list.map((m) =>
    `<button class="subtab ${MM.mapId === m.id ? "active" : ""}" data-mm-id="${esc(m.id)}">${esc(m.shortTitle || m.title)}</button>`
  ).join("");
  $$("[data-mm-id]", box).forEach((b) => (b.onclick = () => selectMap(b.dataset.mmId)));
}

function selectMap(id, fit = true) {
  const list = mapList();
  const m = list.find((x) => x.id === id) || list[0];
  if (!m) return;
  MM.mapId = m.id;
  if ($("#mmSelect")) $("#mmSelect").value = m.id;
  renderQuickTabs();
  if ($("#mmEditor")) $("#mmEditor").hidden = m.id !== "my";
  if (m.id === "my" && $("#mmText")) $("#mmText").value = S.myMap || MY_MAP_DEFAULT;
  // Mặc định thu gọn từ nhánh cấp 1 (chỉ hiện Root + các nhánh cấp 1; click vào thẻ sẽ mở phần sau)
  MM.root = cloneTree(m.build(), 0, 1);
  MM.selectedNode = MM.root;
  showNodeDetail(MM.root);
  requestAnimationFrame(() => mmRender(fit));
}

function mmSetAll(n, collapsed) {
  n.children.forEach((c) => {
    if (c.children.length) c.collapsed = collapsed;
    mmSetAll(c, collapsed);
  });
}

// Mở thêm đúng 1 tầng sâu hơn trên toàn cây
function mmExpandNextLevel(root) {
  let minCollapsedDepth = Infinity;
  (function findMin(n) {
    if (n.children.length) {
      if (n.collapsed) {
        minCollapsedDepth = Math.min(minCollapsedDepth, n.depth);
      } else {
        n.children.forEach(findMin);
      }
    }
  })(root);
  if (minCollapsedDepth === Infinity) return false;
  (function openDepth(n) {
    if (n.children.length) {
      if (n.depth === minCollapsedDepth && n.collapsed) {
        n.collapsed = false;
      } else if (!n.collapsed) {
        n.children.forEach(openDepth);
      }
    }
  })(root);
  return true;
}

function measureNode(n) {
  const titleFont = n.depth === 0 ? "700 15px system-ui, sans-serif" : "600 13.5px system-ui, sans-serif";
  const subFont = "400 11.5px system-ui, sans-serif";
  n.titleLines = wrapLines(n.text, titleFont, MM_MAX_W);
  n.subLines = n.sub ? wrapLines(n.sub, subFont, MM_MAX_W) : [];

  mmCtx.font = titleFont;
  const maxTitleW = Math.max(...n.titleLines.map((l) => mmCtx.measureText(l).width), 60);
  mmCtx.font = subFont;
  const maxSubW = n.subLines.length ? Math.max(...n.subLines.map((l) => mmCtx.measureText(l).width), 0) : 0;

  const badgeExtra = n.children.length ? 42 : (n.ref ? 26 : 0);
  n.w = Math.min(MM_MAX_W + 46, Math.max(120, Math.round(Math.max(maxTitleW, maxSubW)) + 30 + badgeExtra));
  n.h = 18 + n.titleLines.length * 18 + (n.subLines.length ? 4 + n.subLines.length * 15 : 0);
}

function mmRender(fit, focusNode = null) {
  if (!MM.root) return;
  const root = MM.root, colW = [], nodes = [], links = [];

  (function measureTree(n) {
    measureNode(n);
    colW[n.depth] = Math.max(colW[n.depth] || 0, n.w);
    if (!n.collapsed) n.children.forEach(measureTree);
  })(root);

  const xs = [];
  let acc = 0;
  colW.forEach((w, d) => {
    xs[d] = acc;
    acc += w + MM_GX;
  });

  let leafY = 0;
  (function place(n, color, branchIdx) {
    n.x = xs[n.depth];
    n.color = color;
    const vis = n.collapsed ? [] : n.children;
    if (vis.length) {
      vis.forEach((c, i) => place(c, n.depth === 0 ? mmColor(i) : color, n.depth === 0 ? i : branchIdx));
      const first = vis[0], last = vis[vis.length - 1];
      n.cy = (first.cy + last.cy) / 2;
      n.y = n.cy - n.h / 2;
    } else {
      n.y = leafY;
      n.cy = n.y + n.h / 2;
      leafY += n.h + MM_GY;
    }
    nodes.push(n);
    vis.forEach((c) => links.push([n, c]));
  })(root, "var(--primary)", 0);

  // Chuẩn hóa tọa độ y để không có node nào bị âm
  const minY = Math.min(...nodes.map((n) => n.y), 0);
  const maxY = Math.max(...nodes.map((n) => n.y + n.h), 100);
  if (minY < 0) {
    nodes.forEach((n) => {
      n.y -= minY;
      n.cy -= minY;
    });
  }
  MM.nodes = nodes;
  MM.size = { w: Math.max(acc - MM_GX, 200), h: Math.max(maxY - minY, 160) };

  const pathsHtml = links.map(([p, c]) => {
    const x1 = p.x + p.w, y1 = p.cy;
    const x2 = c.x, y2 = c.cy;
    const dx = (x2 - x1) * 0.48;
    return `<path d="M${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}" fill="none" stroke="${c.color}" stroke-width="2.4" opacity=".82"/>`;
  }).join("");

  const nodesHtml = nodes.map((n, i) => {
    const isRoot = n.depth === 0;
    const isSel = MM.selectedNode === n;
    const hasKids = n.children.length > 0;
    let ty = 22;
    const titleSvg = n.titleLines.map((line) => {
      const s = `<text class="mm-title" x="14" y="${ty}">${esc(line)}</text>`;
      ty += 18;
      return s;
    }).join("");
    ty += 2;
    const subSvg = n.subLines.map((line) => {
      const s = `<text class="mm-sub" x="14" y="${ty}">${esc(line)}</text>`;
      ty += 15;
      return s;
    }).join("");

    // Huy hiệu đóng/mở nhánh (+N hoặc −) hoặc biểu tượng xem chi tiết (🔍)
    let badgeSvg = "";
    if (hasKids) {
      const label = n.collapsed ? `+${n.children.length}` : "−";
      const bw = n.collapsed ? 30 : 22;
      const bx = n.w - bw - 8, by = n.h / 2 - 11;
      badgeSvg = `<g class="mm-exp-pill ${n.collapsed ? "is-col" : "is-open"}" transform="translate(${bx},${by})">
        <rect width="${bw}" height="22" rx="11" fill="${n.collapsed ? n.color : "var(--accent)"}" stroke="${n.color}" stroke-width="1.2"/>
        <text x="${bw / 2}" y="11" dy=".36em" text-anchor="middle" fill="${n.collapsed ? "#fff" : n.color}" style="font-size:11.5px;font-weight:700">${label}</text>
      </g>`;
    } else if (n.ref) {
      badgeSvg = `<text x="${n.w - 18}" y="${n.h / 2}" dy=".35em" text-anchor="middle" style="font-size:13px">🔍</text>`;
    }

    return `<g class="mm-node ${isRoot ? "root" : ""} ${isSel ? "selected" : ""}" data-i="${i}" transform="translate(${n.x},${n.y})">
      <rect width="${n.w}" height="${n.h}" rx="12" stroke="${n.color}"/>
      <rect class="mm-stripe" x="0" y="0" width="6" height="${n.h}" rx="3" fill="${n.color}"/>
      ${titleSvg}
      ${subSvg}
      ${badgeSvg}
    </g>`;
  }).join("");

  $("#mmG").innerHTML = pathsHtml + nodesHtml;
  if (fit) mmFit();
  else if (focusNode) mmEnsureVisible(focusNode);
  else mmApply();
}

function mmApply() {
  const v = MM.view;
  $("#mmG").setAttribute("transform", `translate(${v.x},${v.y}) scale(${v.k})`);
}

function mmFit() {
  const box = $("#mmView"), cw = box.clientWidth, ch = box.clientHeight;
  if (!MM.size || !cw) return;
  const padX = 56, padY = 64;
  const k = Math.min((cw - padX) / MM.size.w, (ch - padY) / MM.size.h, 1.18);
  const clampedK = Math.max(0.28, k);
  MM.view = {
    k: clampedK,
    x: Math.max(24, (cw - MM.size.w * clampedK) / 2),
    y: Math.max(36, (ch - MM.size.h * clampedK) / 2)
  };
  mmApply();
}

// Dịch chuyển mượt khung nhìn để thấy rõ nhánh vừa mở
function mmEnsureVisible(n) {
  const box = $("#mmView"), cw = box.clientWidth, ch = box.clientHeight;
  if (!cw || !n) { mmApply(); return; }
  const k = MM.view.k;
  const targetX = n.x + (n.children && !n.collapsed && n.children.length ? n.w + 140 : n.w / 2);
  const targetY = n.cy;
  const screenX = MM.view.x + targetX * k;
  const screenY = MM.view.y + targetY * k;

  if (screenX > cw - 120 || screenX < 100) {
    MM.view.x = cw * 0.42 - targetX * k;
  }
  if (screenY > ch - 110 || screenY < 80) {
    MM.view.y = ch * 0.48 - targetY * k;
  }
  mmApply();
}

function mmZoom(f, cx, cy) {
  const box = $("#mmView"), v = MM.view;
  cx ??= box.clientWidth / 2;
  cy ??= box.clientHeight / 2;
  const k = Math.min(3.2, Math.max(0.18, v.k * f));
  v.x = cx - ((cx - v.x) / v.k) * k;
  v.y = cy - ((cy - v.y) / v.k) * k;
  v.k = k;
  mmApply();
}

function showNodeDetail(n) {
  const box = $("#mmDetail");
  if (!box) return;
  if (!n || (!n.info && !n.sub && !n.ref && !n.children?.length)) {
    box.hidden = true;
    return;
  }
  box.hidden = false;
  const hasKids = n.children && n.children.length > 0;
  box.innerHTML = `
    <div class="mm-detail-body">
      <div class="mm-detail-title">
        <b>${esc(n.text)}</b>
        ${n.sub ? `<span class="muted small"> — ${esc(n.sub)}</span>` : ""}
      </div>
      ${n.info ? `<div class="mm-detail-info">💡 ${esc(n.info)}</div>` : ""}
    </div>
    <div class="row-actions">
      ${hasKids ? `<button class="btn small-btn ghost" id="mmDetailToggle">${n.collapsed ? `📂 Mở ${n.children.length} nhánh con` : "📁 Thu gọn nhánh này"}</button>` : ""}
      ${n.ref ? `<button class="btn small-btn" data-open="${esc(n.ref)}">🔍 Xem hồ sơ chi tiết</button>` : ""}
      <button class="btn small-btn ghost" id="mmDetailClose" title="Đóng bảng thông tin">✕</button>
    </div>`;
  const tBtn = $("#mmDetailToggle");
  if (tBtn) tBtn.onclick = () => {
    n.collapsed = !n.collapsed;
    mmRender(false, n);
    showNodeDetail(n);
  };
  const cBtn = $("#mmDetailClose");
  if (cBtn) cBtn.onclick = () => { box.hidden = true; };
}

// Kéo + pinch + click
(function bindMindmap() {
  const svg = $("#mmSvg"), ptrs = new Map();
  let downNode = null, pinch = 0;
  svg.addEventListener("pointerdown", (e) => {
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 1) {
      MM.moved = false;
      downNode = e.target.closest(".mm-node");
    }
    if (ptrs.size === 2) {
      const [a, b] = [...ptrs.values()];
      pinch = Math.hypot(a.x - b.x, a.y - b.y);
      MM.moved = true;
    }
  });
  svg.addEventListener("pointermove", (e) => {
    const p = ptrs.get(e.pointerId);
    if (!p) return;
    if (ptrs.size === 1) {
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) {
        MM.moved = MM.moved || Math.hypot(dx, dy) > 4;
        MM.view.x += dx;
        MM.view.y += dy;
        mmApply();
      }
    } else if (ptrs.size === 2) {
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [a, b] = [...ptrs.values()], d = Math.hypot(a.x - b.x, a.y - b.y), r = svg.getBoundingClientRect();
      if (pinch) mmZoom(d / pinch, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      pinch = d;
      return;
    }
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
  });
  const up = (e) => {
    ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch = 0;
    if (!ptrs.size && !MM.moved && downNode) mmNodeClick(MM.nodes[+downNode.dataset.i]);
    if (!ptrs.size) downNode = null;
  };
  svg.addEventListener("pointerup", up);
  svg.addEventListener("pointercancel", (e) => { ptrs.delete(e.pointerId); });
  svg.addEventListener("wheel", (e) => {
    e.preventDefault();
    const r = svg.getBoundingClientRect();
    mmZoom(e.deltaY < 0 ? 1.14 : 1 / 1.14, e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
})();

function mmNodeClick(n) {
  if (!n) return;
  MM.selectedNode = n;
  if (n.children.length) {
    n.collapsed = !n.collapsed;
    showNodeDetail(n);
    mmRender(false, n);
  } else {
    showNodeDetail(n);
    mmRender(false);
    if (n.ref) openItem(n.ref);
  }
}

$("#mmSelect").onchange = (e) => selectMap(e.target.value);
$("#mmZoomIn").onclick = () => mmZoom(1.25);
$("#mmZoomOut").onclick = () => mmZoom(0.8);
$("#mmFit").onclick = mmFit;
$("#mmExpand").onclick = () => {
  MM.root.collapsed = false;
  mmSetAll(MM.root, false);
  mmRender(true);
  toast("Đã mở toàn bộ các nhánh");
};
if ($("#mmStep")) {
  $("#mmStep").onclick = () => {
    const changed = mmExpandNextLevel(MM.root);
    mmRender(true);
    if (!changed) toast("Tất cả các cấp đã được mở!");
  };
}
$("#mmCollapse").onclick = () => {
  mmSetAll(MM.root, true);
  MM.root.collapsed = false;
  mmRender(true);
  toast("Đã thu gọn về các nhánh chính");
};
if ($("#mmFullscreen")) {
  $("#mmFullscreen").onclick = () => {
    MM.fullscreen = !MM.fullscreen;
    document.body.classList.toggle("mm-fullscreen-mode", MM.fullscreen);
    $("#mmFullscreen").textContent = MM.fullscreen ? "✕ Thoát toàn màn hình" : "⛶ Toàn màn hình";
    setTimeout(mmFit, 60);
  };
}
$("#mmDraw").onclick = () => { S.myMap = $("#mmText").value; save(); selectMap("my"); };
window.addEventListener("resize", () => { if (currentPage() === "mindmap") mmFit(); });

PAGES.mindmap = () => {
  const sel = $("#mmSelect"), keep = MM.mapId;
  const list = mapList();
  sel.innerHTML = list.map((m) => `<option value="${m.id}">${esc(m.title)}</option>`).join("");
  selectMap(keep || (list[0] && list[0].id));
};
