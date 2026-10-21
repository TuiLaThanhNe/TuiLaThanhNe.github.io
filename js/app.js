/**
 * TB CLINICAL DECISION SUPPORT & PATHOPHYSIOLOGY HUB - CONTROLLER
 * Quản lý giao diện, tương tác, tìm kiếm, tính toán và hiển thị
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  initAlgorithms();
  initPharmacology();
  initCalculator();
  initPediatricScore();
  initToxicityManager();
  initDeepDives();
  initClinicalCases();
  initFlashcards();
  initGuidelineTOC();
  initModalHandlers();
  initMobileMode();
});

// 1. CHỦ ĐỀ SÁNG / TỐI (THEME MANAGER)
function initTheme() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const currentTheme = localStorage.getItem("tb_app_theme") || "light";
  
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const activeTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = activeTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("tb_app_theme", newTheme);
      updateThemeIcon(newTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#themeToggleBtn i");
  if (icon) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }
}

// 2. ĐIỀU HƯỚNG TABS TOÀN CỤC (GLOBAL TAB SWITCHER)
function switchTab(tabId) {
  if (!tabId) return;

  const tabButtons = document.querySelectorAll(".nav-tab-btn");
  const tabPanels = document.querySelectorAll(".tab-content-panel");
  const bottomNavItems = document.querySelectorAll(".mobile-nav-item");

  // Cập nhật tab buttons trên desktop
  tabButtons.forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Kích hoạt panel nội dung tương ứng
  tabPanels.forEach(panel => {
    if (panel.id === tabId) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });

  // Đồng bộ trạng thái active trên Bottom Navigation di động
  bottomNavItems.forEach(item => {
    if (item.getAttribute("data-tab") === tabId) {
      item.classList.add("active");
    } else if (item.getAttribute("data-tab") !== "more") {
      item.classList.remove("active");
    }
  });

  // Cuộn mượt mà lên đầu trang
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.switchTab = switchTab;

function openMobileDrawer() {
  const drawer = document.getElementById("mobileDrawerBackdrop");
  if (drawer) drawer.classList.add("active");
  document.body.style.overflow = "hidden";
}
window.openMobileDrawer = openMobileDrawer;

function closeMobileDrawer() {
  const drawer = document.getElementById("mobileDrawerBackdrop");
  if (drawer) drawer.classList.remove("active");
  document.body.style.overflow = "auto";
}
window.closeMobileDrawer = closeMobileDrawer;

function initNavigation() {
  const tabButtons = document.querySelectorAll(".nav-tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      switchTab(targetId);
    });
  });
}

// 3. SƠ ĐỒ THUẬT TOÁN TƯƠNG TÁC (ALGORITHMS)
let currentAlgoIndex = 0;

function initAlgorithms() {
  const selectorContainer = document.getElementById("algoSelectorContainer");
  const algoDisplayArea = document.getElementById("algoDisplayArea");
  if (!selectorContainer || !algoDisplayArea) return;

  const algos = TB_DATABASE.algorithms;

  // Render các chip chọn sơ đồ
  selectorContainer.innerHTML = algos.map((algo, idx) => `
    <button class="algo-select-chip ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <span class="badge badge-primary">Sơ đồ ${algo.number}</span>
      <span>${algo.title}</span>
    </button>
  `).join("");

  const chips = selectorContainer.querySelectorAll(".algo-select-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const index = parseInt(chip.getAttribute("data-index"));
      renderAlgorithmDetails(index);
    });
  });

  renderAlgorithmDetails(0);
}

function renderAlgorithmDetails(index) {
  const algo = TB_DATABASE.algorithms[index];
  const container = document.getElementById("algoDisplayArea");
  if (!algo || !container) return;

  container.innerHTML = `
    <div class="card mb-4" style="border-left: 5px solid var(--primary-color);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
        <div>
          <span class="badge badge-primary mb-1">SƠ ĐỒ ${algo.number} (BỘ Y TẾ)</span>
          <h3 style="font-size:1.35rem; font-weight:700;">${algo.title}</h3>
        </div>
        <span class="badge badge-info"><i class="fas fa-book-open"></i> ${algo.page_ref}</span>
      </div>
      <p style="color:var(--text-secondary); margin-bottom:1rem;">${algo.description}</p>
      
      <div class="callout-box" style="margin-top:0.5rem;">
        <h4 style="font-size:0.95rem; font-weight:700; color:var(--primary-color); margin-bottom:0.35rem;">
          <i class="fas fa-microscope"></i> TẠI SAO GUIDELINE LẠI HƯỚNG DẪN NHƯ VẬY? (CƠ CHẾ VI SINH & BỆNH HỌC)
        </h4>
        <p style="font-size:0.9rem; line-height:1.6; margin:0;">${algo.why_rationale}</p>
      </div>
    </div>

    <div class="flowchart-container">
      <h4 style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem;">
        <i class="fas fa-project-diagram"></i> Các Bước Xử Trí Tương Tác:
      </h4>
      ${algo.steps.map((step, sIdx) => `
        <div class="flowchart-node" onclick="openStepDetailModal(${index}, ${sIdx})">
          <div class="node-header">
            <div class="node-title">
              <span class="badge badge-primary" style="margin-right:0.4rem;">Bước ${sIdx + 1}</span>
              ${step.title}
            </div>
            <span class="badge badge-info"><i class="fas fa-hand-pointer"></i> Chi tiết</span>
          </div>
          <div class="node-desc">${step.details}</div>
          <div class="node-action">
            <strong><i class="fas fa-check-circle" style="color:var(--success-color);"></i> Hướng xử trí:</strong> 
            ${step.action.replace(/\n/g, '<br>')}
          </div>
        </div>
        ${sIdx < algo.steps.length - 1 ? '<div class="flowchart-connector"><i class="fas fa-arrow-down"></i></div>' : ''}
      `).join("")}
    </div>
  `;
}

function openStepDetailModal(algoIndex, stepIndex) {
  const algo = TB_DATABASE.algorithms[algoIndex];
  const step = algo.steps[stepIndex];
  const modalTitle = document.getElementById("globalModalTitle");
  const modalBody = document.getElementById("globalModalBody");

  modalTitle.innerHTML = `<i class="fas fa-stethoscope"></i> Sơ đồ ${algo.number} - Bước ${stepIndex + 1}: ${step.title}`;
  modalBody.innerHTML = `
    <div style="margin-bottom:1.25rem;">
      <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.4rem; color:var(--text-primary);">Tình huống lâm sàng:</h4>
      <p style="color:var(--text-secondary);">${step.details}</p>
    </div>
    <div class="callout-box" style="margin-bottom:1.25rem;">
      <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.4rem; color:var(--success-color);">Chỉ định hành động chuẩn Bộ Y Tế:</h4>
      <div style="color:var(--text-primary); line-height:1.6;">${step.action.replace(/\n/g, '<br>')}</div>
    </div>
    <div style="background-color:var(--bg-muted); padding:1rem; border-radius:var(--radius-md); font-size:0.85rem;">
      <strong>Đối chiếu tài liệu gốc:</strong> ${algo.page_ref} (Hướng dẫn chẩn đoán, điều trị và dự phòng bệnh lao - Bộ Y tế).
    </div>
  `;
  openModal();
}

// 4. TRA CỨU DƯỢC LÝ THUỐC CHỐNG LAO (PHARMACOLOGY COMPENDIUM)
function initPharmacology() {
  const drugGrid = document.getElementById("drugGridContainer");
  const searchInput = document.getElementById("drugSearchInput");
  const filterPills = document.querySelectorAll(".drug-filter-pill");
  if (!drugGrid) return;

  renderDrugCards(TB_DATABASE.drugs);

  if (searchInput) {
    searchInput.addEventListener("input", filterDrugs);
  }

  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      filterDrugs();
    });
  });
}

function filterDrugs() {
  const searchVal = document.getElementById("drugSearchInput")?.value.toLowerCase().trim() || "";
  const activePill = document.querySelector(".drug-filter-pill.active");
  const groupFilter = activePill ? activePill.getAttribute("data-group") : "all";

  const filtered = TB_DATABASE.drugs.filter(drug => {
    const matchSearch = drug.name.toLowerCase().includes(searchVal) ||
                        drug.code.toLowerCase().includes(searchVal) ||
                        drug.class.toLowerCase().includes(searchVal) ||
                        drug.molecular_target.target_enzymes.toLowerCase().includes(searchVal);

    const matchGroup = (groupFilter === "all") || (drug.group.includes(groupFilter));
    return matchSearch && matchGroup;
  });

  renderDrugCards(filtered);
}

function renderDrugCards(drugs) {
  const container = document.getElementById("drugGridContainer");
  if (!container) return;

  if (drugs.length === 0) {
    container.innerHTML = `<div class="card p-4 text-center" style="grid-column: 1/-1;">Không tìm thấy thuốc phù hợp với từ khóa tra cứu.</div>`;
    return;
  }

  container.innerHTML = drugs.map(drug => `
    <div class="drug-card">
      <div class="drug-card-top">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="drug-code-badge">${drug.code}</div>
          <span class="badge ${drug.group.includes('Hàng 1') ? 'badge-primary' : (drug.group.includes('Nhóm A') ? 'badge-danger' : 'badge-warning')}">${drug.group}</span>
        </div>
        <div class="drug-name">${drug.name}</div>
        <div class="drug-group">${drug.class}</div>

        <div class="drug-summary-list">
          <div class="drug-summary-item">
            <span class="drug-summary-label"><i class="fas fa-bullseye"></i> Đích:</span>
            <span>${drug.molecular_target.target_enzymes}</span>
          </div>
          <div class="drug-summary-item">
            <span class="drug-summary-label"><i class="fas fa-brain"></i> CSF:</span>
            <span>${drug.pk_pd.distribution.includes('DỊCH NÃO TỦY') ? drug.pk_pd.distribution.split('DỊCH NÃO TỦY')[1].substring(0, 45) + '...' : 'Theo dõi dược lực'}</span>
          </div>
          <div class="drug-summary-item">
            <span class="drug-summary-label"><i class="fas fa-pills"></i> Liều V10:</span>
            <span>${drug.dosage_v10.adult.substring(0, 48)}...</span>
          </div>
        </div>
      </div>

      <div style="border-top:1px solid var(--border-color); padding-top:0.75rem; display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:0.75rem; color:var(--text-muted);"><i class="fas fa-file-medical"></i> ${drug.pdf_ref.split(';')[0]}</span>
        <button class="btn btn-outline" style="padding:0.35rem 0.75rem; font-size:0.8rem;" onclick="openDrugModal('${drug.id}')">
          <i class="fas fa-microscope"></i> Dược Lý Chi Tiết
        </button>
      </div>
    </div>
  `).join("");
}

function openDrugModal(drugId) {
  const drug = TB_DATABASE.drugs.find(d => d.id === drugId);
  if (!drug) return;

  const modalTitle = document.getElementById("globalModalTitle");
  const modalBody = document.getElementById("globalModalBody");

  modalTitle.innerHTML = `<span class="badge badge-primary mr-2">${drug.code}</span> ${drug.name}`;
  modalBody.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:1rem;">
      <span class="badge badge-info">${drug.group}</span>
      <span class="badge badge-primary">${drug.class}</span>
    </div>

    <div class="callout-box mb-3" style="border-left-color: var(--primary-color);">
      <h4 style="font-weight:700; color:var(--primary-color); margin-bottom:0.35rem;">
        <i class="fas fa-dna"></i> 1. CƠ CHẾ PHÂN TỬ & ĐÍCH TÁC ĐỘNG (MOLECULAR TARGET)
      </h4>
      <p style="margin-bottom:0.5rem;"><strong>Đích enzyme/gen:</strong> ${drug.molecular_target.target_enzymes}</p>
      <p style="font-size:0.9rem; line-height:1.6; margin:0;">${drug.molecular_target.mechanism.replace(/\n/g, '<br>')}</p>
    </div>

    <div class="card mb-3 p-3">
      <h4 style="font-weight:700; margin-bottom:0.5rem; color:var(--info-color);">
        <i class="fas fa-wave-square"></i> 2. DƯỢC ĐỘNG HỌC & DƯỢC LỰC HỌC (PK/PD PROFILE)
      </h4>
      <ul style="font-size:0.88rem; line-height:1.6; padding-left:1.2rem; color:var(--text-secondary);">
        <li><strong>Hấp thu & Sinh khả dụng:</strong> ${drug.pk_pd.absorption}</li>
        <li><strong>Phân bố mô & Dịch não tủy (CSF):</strong> ${drug.pk_pd.distribution}</li>
        <li><strong>Gắn kết protein huyết tương:</strong> ${drug.pk_pd.protein_binding}</li>
        <li><strong>Chuyển hóa (Gan/Enzyme):</strong> ${drug.pk_pd.metabolism}</li>
        <li><strong>Đào thải & Thời gian bán thải (T1/2):</strong> ${drug.pk_pd.elimination}</li>
        <li><strong>Chỉ số PK/PD diệt khuẩn:</strong> ${drug.pk_pd.pk_pd_index}</li>
      </ul>
    </div>

    <div class="grid-2 mb-3">
      <div class="card p-3">
        <h4 style="font-weight:700; margin-bottom:0.4rem; color:var(--success-color);">
          <i class="fas fa-bacteria"></i> 3. HOẠT TÍNH VI SINH HỌC
        </h4>
        <p style="font-size:0.85rem; margin-bottom:0.4rem;"><strong>Diệt khuẩn sớm (EBA):</strong> ${drug.bacterial_activity.early_bactericidal_activity}</p>
        <p style="font-size:0.85rem; margin:0;"><strong>Tiệt khuẩn (Sterilizing):</strong> ${drug.bacterial_activity.sterilizing_activity}</p>
      </div>

      <div class="card p-3">
        <h4 style="font-weight:700; margin-bottom:0.4rem; color:var(--danger-color);">
          <i class="fas fa-shield-virus"></i> 4. DI TRUYỀN HỌC KHÁNG THUỐC
        </h4>
        <p style="font-size:0.85rem; margin-bottom:0.4rem;"><strong>Đột biến chính:</strong> ${drug.resistance_genetics.primary_mutations.replace(/\n/g, '<br>')}</p>
        <p style="font-size:0.85rem; margin:0;"><strong>Tần suất tự nhiên:</strong> ${drug.resistance_genetics.natural_mutation_rate}</p>
      </div>
    </div>

    <div class="card mb-3 p-3" style="border-left: 4px solid var(--primary-color);">
      <h4 style="font-weight:700; margin-bottom:0.5rem; color:var(--primary-color);">
        <i class="fas fa-prescription-bottle-alt"></i> 5. LIỀU DÙNG CHUẨN THEO TÀI LIỆU V10 (BỘ Y TẾ)
      </h4>
      <p style="font-size:0.88rem;"><strong>Người lớn:</strong> ${drug.dosage_v10.adult}</p>
      <p style="font-size:0.88rem;"><strong>Trẻ em:</strong> ${drug.dosage_v10.child}</p>
      <p style="font-size:0.88rem; margin-bottom:0.5rem;"><strong>Dạng chế phẩm:</strong> ${drug.dosage_v10.fixed_dose_combination}</p>
      
      <div style="background-color:var(--bg-muted); padding:0.75rem; border-radius:var(--radius-sm); font-size:0.85rem; margin-top:0.5rem;">
        <strong style="color:var(--warning-color);">Chỉnh liều suy thận:</strong> ${drug.special_adjustments.renal}<br>
        <strong>Suy gan:</strong> ${drug.special_adjustments.hepatic}<br>
        <strong>Thai kỳ & Cho con bú:</strong> ${drug.special_adjustments.pregnancy_lactation}
      </div>
    </div>

    <div class="callout-box warning mb-3">
      <h4 style="font-weight:700; color:var(--warning-color); margin-bottom:0.4rem;">
        <i class="fas fa-exclamation-triangle"></i> 6. ĐỘC TÍNH (ADR) & XÉT NGHIỆM THEO DÕI
      </h4>
      <p style="font-size:0.88rem; margin-bottom:0.35rem;"><strong>Phổ biến:</strong> ${drug.adr_monitoring.common}</p>
      <p style="font-size:0.88rem; margin-bottom:0.35rem;"><strong>Nghiêm trọng:</strong> ${drug.adr_monitoring.severe.replace(/\n/g, '<br>')}</p>
      <p style="font-size:0.88rem; margin:0;"><strong>Chỉ định theo dõi:</strong> ${drug.adr_monitoring.monitoring}</p>
    </div>

    <div class="card mb-3 p-3">
      <h4 style="font-weight:700; margin-bottom:0.4rem; color:var(--text-primary);">
        <i class="fas fa-random"></i> 7. TƯƠNG TÁC THUỐC LÂM SÀNG
      </h4>
      <p style="font-size:0.88rem; line-height:1.6; margin:0;">${drug.drug_interactions.details.replace(/\n/g, '<br>')}</p>
    </div>

    <div style="background-color:var(--bg-muted); padding:1rem; border-radius:var(--radius-md); font-size:0.85rem;">
      <p style="margin-bottom:0.5rem;"><strong><i class="fas fa-book"></i> Đối chiếu tài liệu gốc:</strong> ${drug.pdf_ref}</p>
      <strong><i class="fas fa-external-link-alt"></i> Trích dẫn nghiên cứu quốc tế:</strong>
      <ul style="padding-left:1.2rem; margin-top:0.25rem;">
        ${drug.citations.map(c => `<li><a href="${c.url}" target="_blank" rel="noopener noreferrer" style="color:var(--primary-color);">${c.title}</a></li>`).join("")}
      </ul>
    </div>
  `;
  openModal();
}

// 5. MÁY TÍNH LIỀU & PHÁC ĐỒ CÁ THỂ HÓA (CALCULATOR)
function initCalculator() {
  const form = document.getElementById("regimenCalcForm");
  if (!form) return;

  form.addEventListener("input", runRegimenCalculation);
  form.addEventListener("change", runRegimenCalculation);
  runRegimenCalculation();
}

function runRegimenCalculation() {
  const age = parseFloat(document.getElementById("calcAge")?.value) || 32;
  const weight = parseFloat(document.getElementById("calcWeight")?.value) || 50;
  const regimenType = document.getElementById("calcRegimenType")?.value || "A1";
  const renal = document.getElementById("calcRenal")?.value || "normal";
  const hiv = document.getElementById("calcHiv")?.value || "none";
  const pregnant = document.getElementById("calcPregnant")?.value || "no";
  const fqStatus = document.getElementById("calcFqResistance")?.value || "susceptible";
  const priorExposure = document.getElementById("calcPriorExposure")?.value || "no";

  // Hiển thị/ẩn các nhóm điều kiện cho Lao kháng thuốc
  const groupFq = document.getElementById("groupFqResistance");
  const groupPrior = document.getElementById("groupPriorExposure");
  if (groupFq && groupPrior) {
    if (regimenType === "BPaLM" || regimenType === "BPaL") {
      groupFq.style.display = "block";
      groupPrior.style.display = "block";
    } else {
      groupFq.style.display = "none";
      groupPrior.style.display = "none";
    }
  }

  const result = TBCalculator.calculateRegimen({
    age, weight, regimenType, renal, hiv, pregnant, fqStatus, priorExposure
  });

  const outputContainer = document.getElementById("calcResultContainer");
  if (!outputContainer) return;

  outputContainer.innerHTML = `
    <div class="card" style="border-top: 5px solid var(--primary-color);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
        <div>
          <span class="badge badge-primary mb-1">${result.code}</span>
          <h3 style="font-size:1.25rem; font-weight:700;">${result.regimenName}</h3>
        </div>
        <span class="badge badge-info"><i class="fas fa-clock"></i> ${result.duration}</span>
      </div>

      <div style="background-color:var(--bg-muted); padding:0.75rem 1rem; border-radius:var(--radius-md); margin-bottom:1rem; font-size:0.9rem;">
        <p style="margin-bottom:0.3rem;"><strong>Giai đoạn tấn công:</strong> ${result.attackPhase}</p>
        <p style="margin:0;"><strong>Giai đoạn duy trì:</strong> ${result.continuationPhase}</p>
      </div>

      ${result.fdcRecommendation ? `
        <div class="callout-box mb-3" style="border-left-color:var(--success-color); background-color:var(--success-bg);">
          <h4 style="font-weight:700; color:var(--success-color); margin-bottom:0.35rem;">
            <i class="fas fa-tablets"></i> Khuyến cáo Viên Phối Hợp Liều Cố Định (FDC - Bảng 2 Phụ lục 6):
          </h4>
          <p style="font-size:0.88rem; margin-bottom:0.25rem;"><strong>Nhóm cân nặng:</strong> ${result.fdcRecommendation.band}</p>
          <p style="font-size:0.88rem; margin-bottom:0.25rem;"><strong>Tấn công:</strong> ${result.fdcRecommendation.attack}</p>
          <p style="font-size:0.88rem; margin:0;"><strong>Duy trì:</strong> ${result.fdcRecommendation.continuation}</p>
        </div>
      ` : ''}

      <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.5rem;"><i class="fas fa-list-ul"></i> Chi Tiết Liều Lượng Từng Thuốc:</h4>
      <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1rem;">
        ${result.drugDetails.map(d => `
          <div style="background-color:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.6rem 0.85rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            <div>
              <strong>${d.name}:</strong> <span style="color:var(--primary-color); font-weight:700; font-size:1.05rem;">${d.dose}</span>
              <div style="font-size:0.78rem; color:var(--text-muted);">${d.note}</div>
            </div>
            <span class="badge badge-info">${d.freq}</span>
          </div>
        `).join("")}
      </div>

      ${result.redFlags && result.redFlags.length > 0 ? result.redFlags.map(rf => `
        <div class="alert-red-flag mb-3">
          <div class="alert-red-flag-header">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${rf.title}</span>
          </div>
          <p style="font-size:0.9rem; margin:0; line-height:1.6;">${rf.message}</p>
        </div>
      `).join("") : ''}

      ${result.warnings.length > 0 ? `
        <div class="alert-warning-banner mb-3">
          <div class="alert-warning-header">
            <i class="fas fa-bell"></i>
            <span>LƯU Ý & CẢNH BÁO LÂM SÀNG ĐẶC BIỆT (QĐ 162/QĐ-BYT):</span>
          </div>
          <ul style="font-size:0.88rem; padding-left:1.2rem; margin:0; line-height:1.5;">
            ${result.warnings.map(w => `<li style="margin-bottom:0.3rem;">${w}</li>`).join("")}
          </ul>
        </div>
      ` : ''}

      <div style="font-size:0.8rem; color:var(--text-muted); text-align:right;">
        <i class="fas fa-book-medical"></i> ${result.pdf_ref}
      </div>
    </div>
  `;
}

// 6. THANG ĐIỂM LAO TRẺ EM (PEDIATRIC SCORECARD)
function initPediatricScore() {
  const form = document.getElementById("pediatricScoreForm");
  if (!form) return;

  form.addEventListener("change", runPediatricScoreCalculation);
  runPediatricScoreCalculation();
}

function runPediatricScoreCalculation() {
  const contact = document.querySelector('input[name="scoreContact"]:checked')?.value || 0;
  const symptoms = document.querySelector('input[name="scoreSymptoms"]:checked')?.value || 0;
  const nutrition = document.querySelector('input[name="scoreNutrition"]:checked')?.value || 0;
  const tst = document.querySelector('input[name="scoreTst"]:checked')?.value || 0;
  const cxr = document.querySelector('input[name="scoreCxr"]:checked')?.value || 0;

  const res = TBCalculator.calculatePediatricScore({
    contact, symptoms, nutrition, tst_igra: tst, cxr
  });

  const outContainer = document.getElementById("pediatricScoreResult");
  if (!outContainer) return;

  outContainer.innerHTML = `
    <div class="card" style="border-top: 5px solid ${res.total >= 7 ? 'var(--danger-color)' : (res.total >= 5 ? 'var(--warning-color)' : 'var(--success-color)')};">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <h4 style="font-weight:700;">Kết Quả Đánh Giá Lao Trẻ Em:</h4>
        <span class="badge ${res.badgeClass}" style="font-size:1.1rem; padding:0.4rem 0.8rem;">Tổng: ${res.total} Điểm</span>
      </div>
      <div style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem; color:${res.total >= 7 ? 'var(--danger-color)' : (res.total >= 5 ? 'var(--warning-color)' : 'var(--success-color)')};">
        ${res.classification}
      </div>
      <div class="callout-box" style="margin-bottom:0.75rem;">
        <strong><i class="fas fa-stethoscope"></i> Khuyến nghị xử trí chuẩn:</strong>
        <p style="font-size:0.9rem; margin-top:0.3rem;">${res.action}</p>
      </div>
      <div style="font-size:0.8rem; color:var(--text-muted); text-align:right;">
        <i class="fas fa-book"></i> ${res.pdf_ref}
      </div>
    </div>
  `;
}

// 7. QUẢN LÝ ĐỘC TÍNH (DILI & QTc)
function initToxicityManager() {
  const diliBtn = document.getElementById("assessDiliBtn");
  const qtcBtn = document.getElementById("assessQtcBtn");

  if (diliBtn) {
    diliBtn.addEventListener("click", () => {
      const alt = parseFloat(document.getElementById("diliAlt")?.value) || 30;
      const ast = parseFloat(document.getElementById("diliAst")?.value) || 30;
      const bili = parseFloat(document.getElementById("diliBili")?.value) || 0.8;
      const symp = document.getElementById("diliSymptoms")?.checked || false;

      const res = TBCalculator.assessDILI(alt, ast, bili, symp);
      const out = document.getElementById("diliResultOutput");
      if (out) {
        const bannerClass = res.alertType === 'red_flag' ? 'alert-red-flag' : (res.alertType === 'warning' ? 'alert-warning-banner' : 'alert-safe-banner');
        const headerClass = res.alertType === 'red_flag' ? 'alert-red-flag-header' : (res.alertType === 'warning' ? 'alert-warning-header' : 'alert-safe-header');
        const icon = res.alertType === 'red_flag' ? 'fa-exclamation-triangle' : (res.alertType === 'warning' ? 'fa-exclamation-circle' : 'fa-check-circle');

        out.innerHTML = `
          <div class="${bannerClass}">
            <div class="${headerClass}">
              <i class="fas ${icon}"></i>
              <span>${res.severity}</span>
            </div>
            <p style="font-size:0.9rem; font-weight:600; margin-bottom:0.5rem;">${res.status}</p>
            <div style="font-size:0.88rem; line-height:1.6;">${res.recommendation}</div>
            <div style="font-size:0.78rem; margin-top:0.6rem; opacity:0.85;">
              <i class="fas fa-book-medical"></i> ${res.pdf_ref}
            </div>
          </div>
        `;
      }
    });
  }

  if (qtcBtn) {
    qtcBtn.addEventListener("click", () => {
      const qtc = parseFloat(document.getElementById("qtcValue")?.value) || 420;
      const gender = document.getElementById("qtcGender")?.value || "male";
      const baselineQtc = parseFloat(document.getElementById("qtcBaseline")?.value) || 0;

      const res = TBCalculator.assessQTc(qtc, gender, baselineQtc);
      const out = document.getElementById("qtcResultOutput");
      if (out) {
        const bannerClass = res.alertType === 'red_flag' ? 'alert-red-flag' : (res.alertType === 'warning' ? 'alert-warning-banner' : 'alert-safe-banner');
        const headerClass = res.alertType === 'red_flag' ? 'alert-red-flag-header' : (res.alertType === 'warning' ? 'alert-warning-header' : 'alert-safe-header');
        const icon = res.alertType === 'red_flag' ? 'fa-heart-broken' : (res.alertType === 'warning' ? 'fa-exclamation-triangle' : 'fa-heart');

        out.innerHTML = `
          <div class="${bannerClass}">
            <div class="${headerClass}">
              <i class="fas ${icon}"></i>
              <span>${res.level}</span>
            </div>
            ${res.deltaQtc ? `<p style="font-size:0.88rem; font-weight:600; margin-bottom:0.4rem;">Biến thiên QTc so với ECG nền (&Delta;QTc): +${res.deltaQtc} ms</p>` : ''}
            <div style="font-size:0.88rem; line-height:1.6;">${res.action}</div>
            <div style="font-size:0.78rem; margin-top:0.6rem; opacity:0.85;">
              <i class="fas fa-book-medical"></i> ${res.pdf_ref}
            </div>
          </div>
        `;
      }
    });
  }
}

// 8. CƠ CHẾ SINH LÝ BỆNH & GIẢI PHẪU (DEEP-DIVES)
function initDeepDives() {
  const container = document.getElementById("deepDiveContainer");
  if (!container) return;

  const topics = TB_DATABASE.deep_dives;
  container.innerHTML = topics.map((t, idx) => `
    <div class="card mb-4" style="border-left:5px solid var(--primary-color);">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
        <div>
          <span class="badge badge-info mb-1">${t.category}</span>
          <h3 style="font-size:1.25rem; font-weight:700;">${t.title}</h3>
        </div>
        <span class="badge badge-primary"><i class="fas fa-book"></i> ${t.pdf_ref.split(';')[0]}</span>
      </div>
      <p style="color:var(--text-secondary); margin-bottom:1rem; font-weight:500;">${t.summary}</p>
      
      <div class="deep-dive-article" style="background-color:var(--bg-muted); padding:1.25rem; border-radius:var(--radius-md); margin-bottom:1rem;">
        ${t.content.replace(/### (.*?)\n/g, '<h4 style="font-size:1.05rem; font-weight:700; color:var(--primary-color); margin-top:0.75rem; margin-bottom:0.35rem;">$1</h4>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n\n/g, '<br><br>')}
      </div>

      <div style="font-size:0.82rem; color:var(--text-muted);">
        <strong><i class="fas fa-external-link-alt"></i> Trích dẫn khoa học:</strong>
        ${t.citations.map(c => `<a href="${c.url}" target="_blank" rel="noopener noreferrer" style="color:var(--primary-color); margin-left:0.5rem;">${c.title}</a>`).join(" | ")}
      </div>
    </div>
  `).join("");
}

// 9. CA LÂM SÀNG TƯƠNG TÁC (CASES)
function initClinicalCases() {
  const container = document.getElementById("casesContainer");
  if (!container) return;

  const cases = TB_DATABASE.clinical_cases;
  container.innerHTML = cases.map((c, cIdx) => `
    <div class="card mb-4" style="border-top: 4px solid var(--primary-color);">
      <span class="badge badge-primary mb-2">CA LÂM SÀNG ${cIdx + 1}</span>
      <h3 style="font-size:1.25rem; font-weight:700; margin-bottom:0.75rem;">${c.title}</h3>
      
      <div style="background-color:var(--bg-muted); padding:1rem; border-radius:var(--radius-md); margin-bottom:1rem; font-size:0.9rem; line-height:1.6;">
        <p><strong><i class="fas fa-user"></i> Bệnh sử:</strong> ${c.history}</p>
        <p><strong><i class="fas fa-x-ray"></i> X-quang phổi:</strong> ${c.cxr}</p>
        <p style="margin:0;"><strong><i class="fas fa-vial"></i> Vi sinh & Xét nghiệm:</strong> ${c.microbiology}</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:1rem;">
        ${c.questions.map((q, qIdx) => `
          <div class="card p-3" style="border:1px solid var(--border-color);" id="case_${cIdx}_q_${qIdx}">
            <h5 style="font-size:0.95rem; font-weight:700; margin-bottom:0.5rem;">
              Câu ${qIdx + 1}: ${q.q}
            </h5>
            <div style="display:flex; flex-direction:column; gap:0.4rem; margin-bottom:0.5rem;">
              ${q.options.map((opt, oIdx) => `
                <label style="display:flex; align-items:center; gap:0.5rem; font-size:0.88rem; cursor:pointer; padding:0.4rem 0.6rem; border-radius:var(--radius-sm); background-color:var(--bg-card); border:1px solid var(--border-color);">
                  <input type="radio" name="case_${cIdx}_q_${qIdx}_radio" value="${oIdx}" onchange="checkCaseAnswer(${cIdx}, ${qIdx}, ${oIdx})">
                  <span>${opt}</span>
                </label>
              `).join("")}
            </div>
            <div class="case-feedback" style="display:none; margin-top:0.5rem;"></div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function checkCaseAnswer(cIdx, qIdx, selectedOpt) {
  const qData = TB_DATABASE.clinical_cases[cIdx].questions[qIdx];
  const qCard = document.getElementById(`case_${cIdx}_q_${qIdx}`);
  const feedbackDiv = qCard.querySelector(".case-feedback");
  if (!feedbackDiv) return;

  const isCorrect = (selectedOpt === qData.correct);
  feedbackDiv.style.display = "block";
  feedbackDiv.className = `callout-box ${isCorrect ? '' : 'danger'}`;
  feedbackDiv.style.borderLeftColor = isCorrect ? 'var(--success-color)' : 'var(--danger-color)';
  feedbackDiv.style.backgroundColor = isCorrect ? 'var(--success-bg)' : 'var(--danger-bg)';

  feedbackDiv.innerHTML = `
    <h5 style="font-weight:700; color:${isCorrect ? 'var(--success-color)' : 'var(--danger-color)'}; margin-bottom:0.25rem;">
      <i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i> ${isCorrect ? 'CHÍNH XÁC!' : 'CHƯA CHÍNH XÁC!'}
    </h5>
    <p style="font-size:0.85rem; margin:0; line-height:1.5;">${qData.explanation}</p>
  `;
}

// 10. FLASHCARDS ÔN TẬP NHANH
function initFlashcards() {
  const container = document.getElementById("flashcardsContainer");
  if (!container) return;

  const cards = TB_DATABASE.flashcards;
  container.innerHTML = cards.map((c, idx) => `
    <div class="flashcard" onclick="this.classList.toggle('flipped')">
      <div class="flashcard-inner">
        <div class="flashcard-front">
          <span class="badge badge-primary mb-2">Thẻ #${idx + 1}</span>
          <p style="font-weight:600; font-size:1rem;">${c.front}</p>
          <div class="flashcard-hint"><i class="fas fa-sync-alt"></i> Bấm để lật xem đáp án</div>
        </div>
        <div class="flashcard-back">
          <span class="badge badge-success mb-2">Đáp án</span>
          <p style="font-size:0.92rem; line-height:1.5;">${c.back}</p>
        </div>
      </div>
    </div>
  `).join("");
}

// 11. MỤC LỤC & ĐỐI CHIẾU 229 TRANG TÀI LIỆU V10
function initGuidelineTOC() {
  const container = document.getElementById("tocListContainer");
  const searchInput = document.getElementById("tocSearchInput");
  if (!container) return;

  renderTOC(TB_DATABASE.guideline_toc);

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const val = searchInput.value.toLowerCase().trim();
      const filtered = TB_DATABASE.guideline_toc.filter(item => 
        item.section.toLowerCase().includes(val) ||
        item.title.toLowerCase().includes(val) ||
        item.topics.toLowerCase().includes(val)
      );
      renderTOC(filtered);
    });
  }
}

function renderTOC(items) {
  const container = document.getElementById("tocListContainer");
  if (!container) return;

  container.innerHTML = items.map(item => `
    <div class="card mb-3" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem;">
      <div>
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
          <span class="badge badge-primary">${item.section}</span>
          <h4 style="font-size:1.05rem; font-weight:700;">${item.title}</h4>
        </div>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin:0;">${item.topics}</p>
      </div>
      <div style="text-align:right;">
        <span class="badge badge-info" style="font-size:0.9rem; padding:0.4rem 0.8rem;">
          <i class="fas fa-file-pdf"></i> Trang ${item.page}
        </span>
      </div>
    </div>
  `).join("");
}

// 12. GLOBAL MODAL CONTROLLERS
function initModalHandlers() {
  const backdrop = document.getElementById("globalModalBackdrop");
  const closeBtn = document.getElementById("globalModalCloseBtn");

  if (closeBtn && backdrop) {
    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function openModal() {
  const backdrop = document.getElementById("globalModalBackdrop");
  if (backdrop) backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const backdrop = document.getElementById("globalModalBackdrop");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "auto";
}

// 13. TỰ ĐỘNG NHẬN DIỆN & TỐI ƯU GIAO DIỆN ĐIỆN THOẠI (MOBILE MODE)
function initMobileMode() {
  const toggleBtn = document.getElementById("mobileViewToggleBtn");
  const toggleText = document.getElementById("mobileViewText");
  const drawerBackdrop = document.getElementById("mobileDrawerBackdrop");
  const moreBtn = document.getElementById("mobileMoreBtn");
  const closeDrawerBtn = document.getElementById("closeMobileDrawerBtn");

  // Kiểm tra thiết bị di động
  function detectMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera || "";
    const isMobileUA = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent.toLowerCase());
    const isSmallScreen = window.innerWidth <= 768;
    return isMobileUA || isSmallScreen;
  }

  // Khởi tạo trạng thái: Ưu tiên lựa chọn lưu trong localStorage, nếu chưa có thì tự động nhận diện
  const savedMode = localStorage.getItem("tb_view_mode");
  let isMobile = savedMode ? (savedMode === "mobile") : detectMobile();

  function applyMode(mobileActive) {
    if (mobileActive) {
      document.body.classList.add("mobile-mode");
      if (window.innerWidth > 768) {
        document.body.classList.add("mobile-simulator");
      } else {
        document.body.classList.remove("mobile-simulator");
      }
      if (toggleText) toggleText.innerText = "Xem trên máy tính";
      if (toggleBtn) {
        toggleBtn.classList.add("active");
        toggleBtn.innerHTML = '<i class="fas fa-desktop"></i> <span id="mobileViewText">Xem trên máy tính</span>';
      }
    } else {
      document.body.classList.remove("mobile-mode");
      document.body.classList.remove("mobile-simulator");
      if (toggleText) toggleText.innerText = "Xem trên điện thoại";
      if (toggleBtn) {
        toggleBtn.classList.remove("active");
        toggleBtn.innerHTML = '<i class="fas fa-mobile-alt"></i> <span id="mobileViewText">Xem trên điện thoại</span>';
      }
    }
  }

  applyMode(isMobile);

  // Lắng nghe thay đổi kích thước cửa sổ để tự điều chỉnh nếu chưa lưu tùy chọn thủ công
  window.addEventListener("resize", () => {
    if (!localStorage.getItem("tb_view_mode")) {
      applyMode(detectMobile());
    } else if (localStorage.getItem("tb_view_mode") === "mobile") {
      if (window.innerWidth > 768) {
        document.body.classList.add("mobile-simulator");
      } else {
        document.body.classList.remove("mobile-simulator");
      }
    }
  });

  // Nút chuyển đổi thủ công
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentActive = document.body.classList.contains("mobile-mode");
      const newActive = !currentActive;
      localStorage.setItem("tb_view_mode", newActive ? "mobile" : "desktop");
      applyMode(newActive);
    });
  }

  // Đồng bộ Bottom Navigation trên điện thoại
  const bottomNavItems = document.querySelectorAll(".mobile-nav-item");
  bottomNavItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const tabId = item.getAttribute("data-tab");
      if (tabId === "more") {
        openMobileDrawer();
        return;
      }
      switchTab(tabId);
    });
  });

  // Drawer menu mở rộng
  if (closeDrawerBtn && drawerBackdrop) {
    closeDrawerBtn.addEventListener("click", closeMobileDrawer);
    drawerBackdrop.addEventListener("click", (e) => {
      if (e.target === drawerBackdrop) closeMobileDrawer();
    });
  }

  const drawerItems = document.querySelectorAll(".drawer-item-btn");
  drawerItems.forEach(dItem => {
    dItem.addEventListener("click", (e) => {
      const tabId = dItem.getAttribute("data-tab");
      switchTab(tabId);
      closeMobileDrawer();
    });
  });

  // Lắng nghe khi tab thay đổi từ bất kỳ nguồn nào để đồng bộ trạng thái Bottom Nav
  const originalTabBtns = document.querySelectorAll(".nav-tab-btn");
  originalTabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tabId = btn.getAttribute("data-tab");
      bottomNavItems.forEach(b => {
        if (b.getAttribute("data-tab") === tabId) {
          b.classList.add("active");
        } else if (b.getAttribute("data-tab") !== "more") {
          b.classList.remove("active");
        }
      });
    });
  });
}
