/**
 * CÔNG CỤ TÍNH TOÁN LIỀU, ĐỘC TÍNH & BẢNG ĐIỂM LÂM SÀNG
 * Dựa trên tài liệu V10 Bộ Y Tế: Phụ lục 6, Phụ lục 7, Bảng 4, Bảng 5
 */

const TBCalculator = {
  // 1. TÍNH LIỀU VÀ PHÁC ĐỒ ĐIỀU TRỊ CÁ THỂ HÓA
  calculateRegimen: function(inputs) {
    const weight = parseFloat(inputs.weight) || 50;
    const ageGroup = inputs.ageGroup || "adult";
    const regimenType = inputs.regimenType || "A1";
    const renal = inputs.renal || "normal"; // 'normal', 'crcl_under_30', 'dialysis'
    const hepatic = inputs.hepatic || "normal";
    const hiv = inputs.hiv || "none"; // 'none', 'art_dtg', 'art_pi'
    const pregnant = inputs.pregnant || "no";

    let result = {
      regimenName: "",
      code: regimenType,
      duration: "",
      attackPhase: "",
      continuationPhase: "",
      drugDetails: [],
      fdcRecommendation: null,
      warnings: [],
      pdf_ref: ""
    };

    // Xác định nhóm cân nặng theo Bảng 2 FDC (Trang 197)
    let fdcBand = "";
    let fdcCount = 0;
    if (weight < 30) {
      fdcBand = "Dưới 30 kg (Cần chia theo liều thuốc rời hoặc dạng phân tán trẻ em)";
      fdcCount = 0;
    } else if (weight >= 30 && weight <= 39) {
      fdcBand = "30 - 39 kg";
      fdcCount = 2;
    } else if (weight >= 40 && weight <= 54) {
      fdcBand = "40 - 54 kg";
      fdcCount = 3;
    } else if (weight >= 55 && weight <= 70) {
      fdcBand = "55 - 70 kg";
      fdcCount = 4;
    } else {
      fdcBand = "Trên 70 kg";
      fdcCount = 5;
    }

    // Xử lý từng phác đồ
    if (regimenType === "A1") {
      result.regimenName = "Phác đồ A1: 2RHZE / 4RH (Chuẩn 6 tháng cho Lao nhạy cảm người lớn)";
      result.duration = "6 tháng (2 tháng tấn công + 4 tháng duy trì)";
      result.attackPhase = "2 tháng đầu: R, H, Z, E dùng hàng ngày";
      result.continuationPhase = "4 tháng sau: R, H dùng hàng ngày";
      result.pdf_ref = "Tài liệu V10: Trang 52 (Mục 2.1) & Phụ lục 6 (Trang 196-197)";

      // Liều thuốc rời mg/kg
      const h_dose = Math.min(Math.round(weight * 5), 300);
      const r_dose = Math.min(Math.round(weight * 10), 600);
      let z_dose = Math.round(weight * 25);
      let e_dose = Math.round(weight * 15);

      if (weight >= 30 && weight <= 39) { z_dose = 1000; e_dose = 550; }
      else if (weight >= 40 && weight <= 54) { z_dose = 1500; e_dose = 825; }
      else if (weight >= 55 && weight <= 70) { z_dose = 2000; e_dose = 1100; }
      else if (weight > 70) { z_dose = 2000; e_dose = 1375; }

      // Kiểm tra suy thận (CrCl < 30 hoặc lọc máu)
      let z_freq = "Uống hàng ngày";
      let e_freq = "Uống hàng ngày";
      if (renal === "crcl_under_30" || renal === "dialysis") {
        z_freq = "GIẢM CÒN 3 LẦN/TUẦN (uống sau buổi lọc máu hoặc cách nhật: Thứ 2, 4, 6)";
        e_freq = "GIẢM CÒN 3 LẦN/TUẦN (uống sau buổi lọc máu hoặc cách nhật: Thứ 2, 4, 6)";
        result.warnings.push("SUY THẬN NẶNG (CrCl < 30 ml/min): KHÔNG ĐƯỢC DÙNG VIÊN PHỐI HỢP CỐ ĐỊNH (FDC) VÌ KHÔNG THỂ TÁCH RIÊNG TẦN SUẤT Z VÀ E. Bắt buộc dùng viên rời: H (300mg) và R (hang ngày), còn Z và E chỉ uống 3 lần/tuần.");
      } else if (fdcCount > 0) {
        result.fdcRecommendation = {
          band: fdcBand,
          attack: `${fdcCount} viên phối hợp 4 thuốc (RHZE 150/75/400/275 mg) uống 1 lần duy nhất trong ngày lúc đói`,
          continuation: `${fdcCount} viên phối hợp 2 thuốc (RH 150/75 mg) hoặc ${Math.ceil(fdcCount/2)} viên (RH 300/150 mg) uống 1 lần trong ngày`
        };
      }

      result.drugDetails = [
        { name: "Isoniazid (H)", dose: `${h_dose} mg/ngày`, freq: "Hàng ngày (uống lúc đói)", note: "Liều 5 mg/kg, tối đa 300 mg/ngày. Bổ sung Pyridoxine (B6) 25 mg/ngày." },
        { name: "Rifampicin (R)", dose: `${r_dose} mg/ngày`, freq: "Hàng ngày (uống lúc đói)", note: "Liều 10 mg/kg, tối đa 600 mg/ngày. Nước tiểu/mồ hôi có màu đỏ cam." },
        { name: "Pyrazinamide (Z)", dose: `${z_dose} mg`, freq: z_freq, note: "Liều 25 mg/kg (giai đoạn tấn công 2 tháng). Chống chỉ định suy gan nặng." },
        { name: "Ethambutol (E)", dose: `${e_dose} mg`, freq: e_freq, note: "Liều 15 mg/kg (giai đoạn tấn công 2 tháng). Theo dõi thị lực và màu sắc đỏ-xanh." }
      ];

    } else if (regimenType === "A1a") {
      result.regimenName = "Phác đồ A1a: 2HPMZ / 2HPM (Phác đồ rút ngắn 4 tháng cho người từ 12 tuổi trở lên)";
      result.duration = "4 tháng (17 tuần)";
      result.attackPhase = "2 tháng đầu (8 tuần): H, P (Rifapentine), M (Moxifloxacin), Z dùng hàng ngày cùng bữa ăn";
      result.continuationPhase = "2 tháng sau (9 tuần): H, P, M dùng hàng ngày cùng bữa ăn";
      result.pdf_ref = "Tài liệu V10: Trang 52 (Mục 2.1 Phác đồ 4 tháng)";

      result.drugDetails = [
        { name: "Isoniazid (H)", dose: "300 mg/ngày", freq: "Hàng ngày", note: "Bắt buộc uống cùng Pyridoxine (B6) 25-50 mg/ngày" },
        { name: "Rifapentine (P)", dose: "1200 mg/ngày", freq: "Hàng ngày (uống cùng bữa ăn)", note: "Tăng sinh khả dụng khi uống cùng thức ăn béo" },
        { name: "Moxifloxacin (M)", dose: "400 mg/ngày", freq: "Hàng ngày", note: "Theo dõi QTc trên ECG, không cần chỉnh liều suy thận" },
        { name: "Pyrazinamide (Z)", dose: `${Math.min(Math.round(weight * 25), 2000)} mg/ngày`, freq: "Hàng ngày (chỉ dùng trong 8 tuần đầu)", note: "Liều 25 mg/kg" }
      ];

    } else if (regimenType === "BPaLM") {
      result.regimenName = "Phác đồ BPaLM 6 tháng (Chuẩn vàng cho Lao đa kháng/RR-TB còn nhạy cảm Quinolone)";
      result.duration = "6 tháng (26 tuần uống hoàn toàn)";
      result.attackPhase = "Dùng liên tục 26 tuần gồm 4 thuốc: Bdq + Pa + Lzd + Mfx";
      result.continuationPhase = "Không phân chia giai đoạn (toàn bộ 26 tuần)";
      result.pdf_ref = "Tài liệu V10: Trang 48 (Sơ đồ 6) & Trang 57-65";

      result.drugDetails = [
        { name: "Bedaquiline (Bdq)", dose: "Tuần 1-2: 400 mg/ngày; Tuần 3-26: 200 mg x 3 lần/tuần", freq: "Uống cùng bữa ăn", note: "Đo ECG theo dõi QTc định kỳ. Tránh xa các chất cảm ứng CYP3A4." },
        { name: "Pretomanid (Pa)", dose: "200 mg/ngày", freq: "Hàng ngày suốt 26 tuần", note: "Uống cùng thức ăn. Theo dõi men gan." },
        { name: "Linezolid (Lzd)", dose: "600 mg/ngày", freq: "Hàng ngày", note: "Nếu có ức chế tủy (giảm Hb/tiểu cầu) hoặc viêm thần kinh: giảm liều 300 mg/ngày hoặc tạm ngừng. Theo dõi CTM 2 tuần/lần." },
        { name: "Moxifloxacin (Mfx)", dose: "400 mg/ngày", freq: "Hàng ngày suốt 26 tuần", note: "Nếu kháng Quinolone (Pre-XDR): LOẠI BỎ Mfx chuyển thành phác đồ BPaL." }
      ];

      result.warnings.push("BẮT BUỘC THEO DÕI ĐIỆN TÂM ĐỒ (ECG): Bedaquiline + Moxifloxacin làm tăng nguy cơ kéo dài QTc. Đo trước điều trị và ở các tuần 2, 4, 8, 12, 16, 20, 24.");
      result.warnings.push("THEO DÕI HUYẾT HỌC: Xét nghiệm Công thức máu (CBC) 2 tuần/lần trong 2 tháng đầu để phát hiện sớm suy tủy do Linezolid.");

    } else if (regimenType === "BPaL") {
      result.regimenName = "Phác đồ BPaL 6 tháng (Cho Lao tiền siêu kháng Pre-XDR kháng Fluoroquinolone)";
      result.duration = "6 tháng (26 tuần)";
      result.attackPhase = "Dùng liên tục 26 tuần gồm 3 thuốc: Bdq + Pa + Lzd";
      result.continuationPhase = "Không có Moxifloxacin";
      result.pdf_ref = "Tài liệu V10: Trang 48 (Sơ đồ 6) & Trang 57-65";

      result.drugDetails = [
        { name: "Bedaquiline (Bdq)", dose: "Tuần 1-2: 400 mg/ngày; Tuần 3-26: 200 mg x 3 lần/tuần", freq: "Uống cùng thức ăn", note: "Đo ECG theo dõi QTc định kỳ." },
        { name: "Pretomanid (Pa)", dose: "200 mg/ngày", freq: "Hàng ngày suốt 26 tuần", note: "Uống cùng thức ăn." },
        { name: "Linezolid (Lzd)", dose: "600 mg/ngày", freq: "Hàng ngày", note: "Kiểm tra CTM định kỳ, phát hiện sớm thiếu máu / giảm tiểu cầu." }
      ];

    } else if (regimenType === "B1") {
      result.regimenName = "Phác đồ B1: 2RHZE / 10RH (12 tháng cho Lao màng não, Lao xương khớp người lớn)";
      result.duration = "12 tháng (2 tháng tấn công + 10 tháng duy trì)";
      result.attackPhase = "2 tháng đầu: R, H, Z, E dùng hàng ngày";
      result.continuationPhase = "10 tháng tiếp theo: R, H dùng hàng ngày";
      result.pdf_ref = "Tài liệu V10: Trang 53 (Phác đồ B1)";

      result.drugDetails = [
        { name: "Isoniazid (H)", dose: `${Math.min(Math.round(weight * 5), 300)} mg/ngày`, freq: "Hàng ngày", note: "Xuyên thấu hàng rào máu não cực tốt (CSF 80-100%)." },
        { name: "Rifampicin (R)", dose: `${Math.min(Math.round(weight * 10), 600)} mg/ngày`, freq: "Hàng ngày", note: "Ngấm CSF 10-20% khi màng não viêm." },
        { name: "Pyrazinamide (Z)", dose: `${Math.min(Math.round(weight * 25), 2000)} mg/ngày`, freq: "Hàng ngày x 2 tháng", note: "Ngấm CSF xuất sắc (80-100%)." },
        { name: "Ethambutol (E)", dose: `${Math.min(Math.round(weight * 15), 1200)} mg/ngày`, freq: "Hàng ngày x 2 tháng", note: "Ngấm CSF kém hơn." }
      ];

      result.warnings.push("CHỈ ĐỊNH CORTICOSTEROID TRONG LAO MÀNG NÃO: Bắt buộc dùng Dexamethasone hoặc Prednisolone bổ trợ đường tĩnh mạch/uống (giảm liều dần trong 6 - 8 tuần) để phòng phù não, viêm tắc mạch máu não và dính tắc dịch não tủy gây não úng thủy.");

    } else if (regimenType === "TPT_3HP") {
      result.regimenName = "Phác đồ 3HP: Rifapentine + Isoniazid (Dự phòng lao tiềm ẩn 3 tháng uống 1 lần/tuần)";
      result.duration = "12 tuần (12 liều hàng tuần)";
      result.attackPhase = "Uống 1 lần vào một ngày cố định trong tuần x 12 tuần";
      result.continuationPhase = "Hoàn thành sau đủ 12 liều";
      result.pdf_ref = "Tài liệu V10: Trang 114 (Mục 2.2 Phác đồ 3HP)";

      let rpt_dose = 900;
      if (weight >= 30 && weight <= 35) rpt_dose = 600;
      else if (weight >= 36 && weight <= 45) rpt_dose = 750;
      else if (weight >= 46) rpt_dose = 900;

      result.drugDetails = [
        { name: "Rifapentine (P)", dose: `${rpt_dose} mg`, freq: "1 LẦN/TUẦN (cùng bữa ăn)", note: "Viên 150 mg hoặc 300 mg" },
        { name: "Isoniazid (H)", dose: "900 mg (người lớn) hoặc 15 mg/kg (trẻ em)", freq: "1 LẦN/TUẦN", note: "Uống cùng ngày với Rifapentine" },
        { name: "Pyridoxine (Vitamin B6)", dose: "50 mg", freq: "1 LẦN/TUẦN", note: "Phòng ngừa độc thần kinh ngoại vi" }
      ];
    }

    // Cảnh báo tương tác HIV / Thai kỳ
    if (hiv === "art_dtg") {
      result.warnings.push("ĐỒNG NHIỄM HIV ĐANG DÙNG DOLUTEGRAVIR (DTG): Rifampicin cảm ứng mạnh CYP3A4 và UGT1A1 làm giảm nồng độ DTG tới 50%. BẮT BUỘC TĂNG LIỀU DOLUTEGRAVIR LÊN 50 mg x 2 LẦN/NGÀY (uống cách liều 12 giờ) trong suốt thời gian dùng Rifampicin và duy trì tiếp 2 tuần sau khi ngừng R.");
    } else if (hiv === "art_pi") {
      result.warnings.push("ĐỒNG NHIỄM HIV ĐANG DÙNG THUỐC ỨC CHẾ PROTEASE (Lopinavir/ritonavir): CHỐNG CHỈ ĐỊNH DÙNG RIFAMPICIN. Phải thay Rifampicin bằng RIFABUTIN liều 150 mg/ngày (hoặc 300 mg x 3 lần/tuần) do Rifabutin ít cảm ứng enzyme hơn.");
    }

    if (pregnant === "yes") {
      result.warnings.push("PHỤ NỮ CÓ THAI: Phác đồ A1 (2RHZE/4RH) là AN TOÀN (nhóm A theo WHO). Bắt buộc bổ sung Vitamin B6 25 mg/ngày và tiêm Vitamin K dự phòng cho trẻ sơ sinh ngay sau sinh. TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH Streptomycin và Ethionamide.");
    }

    return result;
  },

  // 2. TÍNH ĐIỂM LAO TRẺ EM THEO BẢNG 4 TÀI LIỆU V10 (TRANG 33)
  calculatePediatricScore: function(scores) {
    // scores = { contact: 0-3, symptoms: 0-3, nutrition: 0-2, tst_igra: 0-3, cxr: 0-3 }
    const contact = parseInt(scores.contact) || 0;
    const symptoms = parseInt(scores.symptoms) || 0;
    const nutrition = parseInt(scores.nutrition) || 0;
    const tst = parseInt(scores.tst_igra) || 0;
    const cxr = parseInt(scores.cxr) || 0;

    const total = contact + symptoms + nutrition + tst + cxr;
    let classification = "";
    let action = "";
    let badgeClass = "";

    if (total >= 7) {
      classification = "KHẲNG ĐỊNH LAO LÂM SÀNG Ở TRẺ EM (Độ đặc hiệu cao)";
      action = "Chỉ định điều trị ngay phác đồ lao trẻ em (Phác đồ A2: 2HRZ/2HR cho thể nhẹ không biến chứng, hoặc phác đồ chuẩn 2HRZE/4HR). Không cần chờ kết quả vi sinh.";
      badgeClass = "badge-danger";
    } else if (total >= 5 && total <= 6) {
      classification = "NGHI NGỜ LAO CAO (Cần thăm dò chuyên sâu)";
      action = "Hội chẩn bác sĩ chuyên khoa Lao Nhi. Chỉ định lấy dịch dạ dày buổi sáng 2 ngày liên tiếp làm GeneXpert Ultra và nuôi cấy MGIT. Cân nhắc chụp CT ngực liều thấp tìm hạch trung thất.";
      badgeClass = "badge-warning";
    } else {
      classification = "ÍT NGHĨ ĐẾN LAO (< 5 điểm)";
      action = "Tìm các nguyên nhân hô hấp khác (viêm phổi không điển hình, hen phế quản, dị vật phế quản bỏ quên). Hẹn tái khám đánh giá lại sau 2 - 4 tuần nếu triệu chứng dai dẳng.";
      badgeClass = "badge-success";
    }

    return {
      total: total,
      classification: classification,
      action: action,
      badgeClass: badgeClass,
      pdf_ref: "Tài liệu V10: Trang 33 (Sơ đồ 3 & Bảng 4: Bảng chấm điểm chẩn đoán lao phổi trẻ em)"
    };
  },

  // 3. ĐÁNH GIÁ ĐỘC TÍNH GAN DO THUỐC (DILI) & KÉO DÀI QTc
  assessDILI: function(alt, ast, bili, symptoms) {
    const uln_trans = 40; // U/L
    const uln_bili = 1.2; // mg/dL hoặc 20.5 mcmol/L

    const alt_x = (alt / uln_trans).toFixed(1);
    const ast_x = (ast / uln_trans).toFixed(1);
    const max_trans_x = Math.max(alt_x, ast_x);
    const bili_x = (bili / uln_bili).toFixed(1);

    let status = "";
    let severity = "";
    let recommendation = "";
    let alertClass = "";

    if (max_trans_x >= 5 || (max_trans_x >= 3 && symptoms) || bili_x >= 2) {
      severity = "TỔN THƯƠNG GAN NẶNG CẦN NGỪNG THUỐC NGAY LẬP TỨC (DILI Độ 3 - 4)";
      alertClass = "alert-danger";
      status = `Men gan tăng ${max_trans_x} lần ULN, Bilirubin tăng ${bili_x} lần ULN ${symptoms ? "KÈM TRIỆU CHỨNG LÂM SÀNG (vàng da, buồn nôn, chán ăn)" : ""}`;
      recommendation = `
        1. DỪNG NGAY TẤT CẢ CÁC THUỐC CÓ ĐỘC TÍNH TRÊN GAN: Isoniazid (H), Rifampicin (R), Pyrazinamide (Z).\n
        2. Nếu người bệnh đang trong tình trạng lao nặng, đe dọa tính mạng: Bắt đầu phác đồ an toàn tạm thời không độc gan: Ethambutol (E) + Kháng sinh nhóm Quinolone (Levofloxacin) ± Streptomycin (S).\n
        3. Theo dõi men gan và Bilirubin mỗi 3 - 7 ngày cho đến khi ALT giảm xuống < 2 lần ULN và hết triệu chứng lâm sàng.\n
        4. QUY TRÌNH DÙNG LẠI THUỐC (RE-CHALLENGE) TỪNG BƯỚC:\n
           - Bước 1: Thử lại Rifampicin liều nhỏ (150 mg/ngày -> tăng lên 300mg -> 450/600mg sau 3-5 ngày). R ít gây hoại tử tế bào gan hơn H và Z.\n
           - Bước 2: Nếu men gan ổn định sau 1 tuần, tiếp tục thử lại Isoniazid (100 mg/ngày -> tăng lên 300mg sau 3-5 ngày).\n
           - Bước 3: NẾU BỆNH NHÂN TỪNG VIÊM GAN NẶNG CÓ VÀNG DA: KHÔNG NÊN DÙNG LẠI PYRAZINAMIDE (Z). Kéo dài phác đồ 2RHE / 7RH (tổng thời gian 9 tháng).
      `;
    } else if (max_trans_x >= 3 && !symptoms) {
      severity = "TĂNG MEN GAN MỨC ĐỘ VỪA KHÔNG TRIỆU CHỨNG (DILI Độ 2)";
      alertClass = "alert-warning";
      status = `Men gan tăng ${max_trans_x} lần ULN, không có triệu chứng buồn nôn hay vàng da.`;
      recommendation = "Có thể tiếp tục phác đồ nhưng cần theo dõi chặt chẽ men gan mỗi tuần một lần. Tránh dùng chung rượu bia, paracetamol hoặc các thuốc độc gan khác. Dặn bệnh nhân báo ngay nếu xuất hiện buồn nôn, nôn hoặc nước tiểu sẫm màu.";
    } else {
      severity = "MEN GAN TRONG GIỚI HẠN CHẤP NHẬN ĐƯỢC (DILI Độ 1 hoặc Bình thường)";
      alertClass = "alert-success";
      status = `Men gan tăng nhẹ (${max_trans_x} lần ULN), đáp ứng an toàn.`;
      recommendation = "Tiếp tục phác đồ điều trị lao theo dõi định kỳ.";
    }

    return {
      severity: severity,
      status: status,
      recommendation: recommendation,
      alertClass: alertClass,
      pdf_ref: "Tài liệu V10: Trang 90-95 (Mục 5.3 Xử trí biến cố có hại của thuốc chống lao) & Phụ lục 10"
    };
  },

  assessQTc: function(qtcMs, drugs) {
    let result = {
      level: "",
      action: "",
      badgeClass: ""
    };

    if (qtcMs >= 500) {
      result.level = "KÉO DÀI QTc NGUY HIỂM (> 500 ms) - NGUY CƠ XOẮN ĐỈNH (Torsades de Pointes)";
      result.badgeClass = "badge-danger";
      result.action = `
        1. Bắt buộc tạm ngừng thuốc làm kéo dài QT mạnh nhất (Moxifloxacin, Bedaquiline, Clofazimine, Delamanid).\n
        2. Xét nghiệm khẩn cấp Điện giải đồ: Bù Kali máu duy trì K+ > 4.0 - 4.5 mmol/L; bù Magie máu duy trì Mg++ > 0.8 - 1.0 mmol/L.\n
        3. Đo lại ECG hàng ngày cho tới khi QTc < 480 ms.\n
        4. Cân nhắc thay Moxifloxacin bằng Levofloxacin (ít kéo dài QT hơn) sau hội chẩn chuyên gia.
      `;
    } else if (qtcMs >= 460 && qtcMs < 500) {
      result.level = "QTc KÉO DÀI RANH GIỚI (460 - 499 ms)";
      result.badgeClass = "badge-warning";
      result.action = "Tiếp tục dùng thuốc nhưng tăng cường theo dõi ECG mỗi tuần. Xét nghiệm bù điện giải nếu K+ hoặc Mg++ ở ngưỡng thấp.";
    } else {
      result.level = "QTc BÌNH THƯỜNG (< 460 ms)";
      result.badgeClass = "badge-success";
      result.action = "An toàn. Tiếp tục theo dõi ECG theo lịch trình định kỳ của phác đồ.";
    }

    return result;
  }
};

if (typeof window !== "undefined") {
  window.TBCalculator = TBCalculator;
}