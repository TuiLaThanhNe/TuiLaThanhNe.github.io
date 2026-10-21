/**
 * CÔNG CỤ TÍNH TOÁN LIỀU, ĐỘC TÍNH & BẢNG ĐIỂM LÂM SÀNG
 * Dựa trên: Hướng dẫn Chẩn đoán, điều trị và dự phòng bệnh Lao
 * Ban hành theo Quyết định số 162/QĐ-BYT ngày 19/01/2024 của Bộ Y tế
 */

const TBCalculator = {
  // 1. TÍNH LIỀU VÀ PHÁC ĐỒ ĐIỀU TRỊ CÁ THỂ HÓA (ALGORITHMS A & D)
  calculateRegimen: function(inputs) {
    const age = parseFloat(inputs.age) || 30;
    const weight = parseFloat(inputs.weight) || 50;
    let regimenType = inputs.regimenType || "A1";
    const renal = inputs.renal || "normal"; // 'normal', 'crcl_under_30', 'dialysis'
    const hepatic = inputs.hepatic || "normal";
    const hiv = inputs.hiv || "none"; // 'none', 'art_dtg', 'art_pi'
    const pregnant = inputs.pregnant || "no";
    const fqStatus = inputs.fqStatus || "susceptible"; // 'susceptible', 'resistant', 'unknown'
    const priorExposure = inputs.priorExposure || "no"; // 'no', 'yes'

    let result = {
      regimenName: "",
      code: regimenType,
      duration: "",
      attackPhase: "",
      continuationPhase: "",
      drugDetails: [],
      fdcRecommendation: null,
      redFlags: [],
      warnings: [],
      pdf_ref: ""
    };

    // Xác định nhóm cân nặng theo Bảng 2 FDC (Phụ lục 6 - QĐ 162/QĐ-BYT)
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

    // =========================================================================
    // THUẬT TOÁN A: KIỂM TRA ĐIỀU KIỆN NGHIÊM NGẶT PHÁC ĐỒ BPaLM / BPaL
    // =========================================================================
    if (regimenType === "BPaLM" || regimenType === "BPaL") {
      // 1. Kiểm tra Độ tuổi (< 14 tuổi chống chỉ định BPaLM/BPaL)
      if (age < 14) {
        result.redFlags.push({
          title: "CHỐNG CHỈ ĐỊNH: BỆNH NHÂN DƯỚI 14 TUỔI (QĐ 162/QĐ-BYT & WHO)",
          message: "Phác đồ 6 tháng BPaLM/BPaL chỉ được chỉ định cho người bệnh từ 14 tuổi trở lên. Trẻ em dưới 14 tuổi mắc Lao kháng Rifampicin (RR/MDR-TB) bắt buộc chuyển sang phác đồ Lao trẻ em (phác đồ chuẩn ngắn ngày có hiệu chỉnh theo Bảng 12 hoặc phác đồ dài ngày) và hội chẩn Hội đồng chuyên môn Lao kháng thuốc."
        });
      }

      // 2. Kiểm tra Tiền sử điều trị thuốc mới (> 1 tháng nguy cơ kháng thuốc)
      if (priorExposure === "yes") {
        result.redFlags.push({
          title: "CẢNH BÁO NGUY CƠ KHÁNG THUỐC MỚI (TIỀN SỬ DÙNG BDQ/PA/LZD > 1 THÁNG)",
          message: "Người bệnh đã từng điều trị với Bedaquiline, Pretomanid, hoặc Linezolid quá 1 tháng (30 ngày) KHÔNG ĐỦ ĐIỀU KIỆN áp dụng phác đồ BPaLM/BPaL chuẩn ngay từ đầu. Nguy cơ vi khuẩn đã phát sinh đột biến kháng chéo (gen atpE, rv0678, 23S rRNA). BẮT BUỘC gửi mẫu làm Kháng sinh đồ kiểu hình hoặc giải trình tự gen (WGS) với thuốc mới và hội chẩn chuyên gia để xây dựng phác đồ cá thể hóa."
        });
      }

      // 3. Kiểm tra Mức độ kháng Fluoroquinolone
      if (fqStatus === "resistant") {
        // Tự động chuyển đổi sang phác đồ BPaL
        regimenType = "BPaL";
        result.code = "BPaL";
        result.regimenName = "Phác đồ BPaL 6 tháng (Dành cho Lao tiền siêu kháng Pre-XDR: Kháng Rifampicin + Kháng Quinolone)";
        result.duration = "6 tháng (26 tuần uống hoàn toàn)";
        result.attackPhase = "Dùng liên tục 26 tuần gồm 3 thuốc: Bdq + Pa + Lzd (LOẠI BỎ MOXIFLOXACIN)";
        result.continuationPhase = "Không có giai đoạn duy trì riêng biệt";
        result.pdf_ref = "QĐ 162/QĐ-BYT: Trang 48 (Sơ đồ 6) & Trang 57-65";

        result.warnings.push("PHÁT HIỆN ĐỘT BIẾN KHÁNG FLUOROQUINOLONE: Đã tự động loại bỏ Moxifloxacin ra khỏi phác đồ và chuyển sang phác đồ 3 thuốc BPaL (Bedaquiline + Pretomanid + Linezolid) theo đúng Sơ đồ 6 (QĐ 162/QĐ-BYT).");

        result.drugDetails = [
          { name: "Bedaquiline (Bdq)", dose: "Tuần 1-2: 400 mg/ngày; Tuần 3-26: 200 mg x 3 lần/tuần", freq: "Uống cùng bữa ăn", note: "Đo ECG theo dõi QTc định kỳ. Tránh chất cảm ứng CYP3A4." },
          { name: "Pretomanid (Pa)", dose: "200 mg/ngày (Trần tối đa 200 mg)", freq: "Hàng ngày suốt 26 tuần", note: "Uống cùng thức ăn. Theo dõi chức năng gan." },
          { name: "Linezolid (Lzd)", dose: "600 mg/ngày (Trần tối đa 600 mg)", freq: "Hàng ngày", note: "Theo dõi CTM 2 tuần/lần phát hiện giảm tiểu cầu/thiếu máu. Giảm còn 300 mg/ngày nếu có độc tính." }
        ];

      } else {
        // Nhạy cảm Fluoroquinolone hoặc chưa rõ -> Phác đồ BPaLM
        result.regimenName = "Phác đồ BPaLM 6 tháng (Chuẩn vàng cho Lao kháng Rifampicin / MDR-TB còn nhạy Quinolone)";
        result.duration = "6 tháng (26 tuần uống hoàn toàn)";
        result.attackPhase = "Dùng liên tục 26 tuần gồm 4 thuốc: Bdq + Pa + Lzd + Mfx";
        result.continuationPhase = "Không phân chia giai đoạn (toàn bộ 26 tuần)";
        result.pdf_ref = "QĐ 162/QĐ-BYT: Trang 48 (Sơ đồ 6) & Trang 57-65";

        if (fqStatus === "unknown") {
          result.warnings.push("CHƯA CÓ KẾT QUẢ KSĐ FLUOROQUINOLONE: Cần gửi mẫu làm khẩn cấp LPA hàng 2 hoặc KSĐ kiểu hình. Nếu có đột biến kháng Quinolone, lập tức chuyển sang phác đồ BPaL (bỏ Moxifloxacin).");
        }

        result.drugDetails = [
          { name: "Bedaquiline (Bdq)", dose: "Tuần 1-2: 400 mg/ngày; Tuần 3-26: 200 mg x 3 lần/tuần", freq: "Uống cùng bữa ăn", note: "Đo ECG theo dõi QTc trước điều trị và tuần 2, 4, 8, 12, 16, 20, 24." },
          { name: "Pretomanid (Pa)", dose: "200 mg/ngày", freq: "Hàng ngày suốt 26 tuần", note: "Uống cùng thức ăn. Theo dõi men gan." },
          { name: "Linezolid (Lzd)", dose: "600 mg/ngày", freq: "Hàng ngày", note: "Giảm còn 300 mg/ngày nếu có ức chế tủy hoặc viêm thần kinh. Theo dõi CTM định kỳ." },
          { name: "Moxifloxacin (Mfx)", dose: "400 mg/ngày (Trần tối đa 400 mg)", freq: "Hàng ngày suốt 26 tuần", note: "Theo dõi QTc phối hợp cùng Bedaquiline." }
        ];
      }

      result.warnings.push("BẮT BUỘC THEO DÕI ĐIỆN TÂM ĐỒ (ECG): Bedaquiline + Moxifloxacin kéo dài hiệp đồng khoảng QT. Ngừng ngay nếu QTc > 500 ms.");
      result.warnings.push("THEO DÕI HUYẾT HỌC: Xét nghiệm Công thức máu (CBC) 2 tuần/lần trong 2 tháng đầu để phát hiện sớm suy tủy do Linezolid.");

    } else if (regimenType === "A1") {
      result.regimenName = "Phác đồ A1: 2RHZE / 4RH (Chuẩn 6 tháng cho Lao nhạy cảm người lớn)";
      result.duration = "6 tháng (2 tháng tấn công + 4 tháng duy trì)";
      result.attackPhase = "2 tháng đầu: R, H, Z, E dùng hàng ngày";
      result.continuationPhase = "4 tháng sau: R, H dùng hàng ngày";
      result.pdf_ref = "QĐ 162/QĐ-BYT: Trang 52 (Mục 2.1) & Phụ lục 6 (Trang 196-197)";

      // =======================================================================
      // THUẬT TOÁN D: GIỚI HẠN LIỀU TỐI ĐA (MAX DOSE CAP) THEO PHỤ LỤC 6
      // =======================================================================
      // Isoniazid (H): 5 mg/kg -> TRẦN TỐI ĐA 300 mg/ngày
      const h_calc = Math.round(weight * 5);
      const h_dose = Math.min(h_calc, 300);

      // Rifampicin (R): 10 mg/kg -> TRẦN TỐI ĐA 600 mg/ngày
      const r_calc = Math.round(weight * 10);
      const r_dose = Math.min(r_calc, 600);

      // Pyrazinamide (Z): 25 mg/kg -> TRẦN TỐI ĐA 2000 mg/ngày
      let z_dose = 2000;
      if (weight >= 30 && weight <= 39) z_dose = 1000;
      else if (weight >= 40 && weight <= 54) z_dose = 1500;
      else if (weight >= 55 && weight <= 70) z_dose = 2000;
      else z_dose = 2000; // Cap tuyệt đối 2000 mg cho BN > 70 kg

      // Ethambutol (E): 15 mg/kg -> TRẦN TỐI ĐA 1200 mg/ngày (NGĂN CHẶN ĐỘC TÍNH MẮT)
      let e_dose = 1200;
      if (weight >= 30 && weight <= 39) e_dose = 550;
      else if (weight >= 40 && weight <= 54) e_dose = 825;
      else if (weight >= 55 && weight <= 70) e_dose = 1100;
      else e_dose = 1200; // Cap tuyệt đối 1200 mg cho BN > 70 kg

      // Kiểm tra suy thận (CrCl < 30 hoặc lọc máu)
      let z_freq = "Uống hàng ngày";
      let e_freq = "Uống hàng ngày";
      if (renal === "crcl_under_30" || renal === "dialysis") {
        z_freq = "GIẢM CÒN 3 LẦN/TUẦN (uống sau buổi lọc máu hoặc cách nhật: Thứ 2, 4, 6)";
        e_freq = "GIẢM CÒN 3 LẦN/TUẦN (uống sau buổi lọc máu hoặc cách nhật: Thứ 2, 4, 6)";
        result.redFlags.push({
          title: "CẢNH BÁO SUY THẬN NẶNG (CrCl < 30 ml/min): KHÔNG DÙNG VIÊN PHỐI HỢP FDC",
          message: "Viên FDC cố định không thể tách riêng tần suất của Pyrazinamide và Ethambutol. BẮT BUỘC dùng viên rời: H (300mg) và R (600mg) uống hàng ngày; còn Z (1500-2000mg) và E (800-1200mg) CHỈ UỐNG 3 LẦN/TUẦN sau buổi lọc máu theo Bảng 5 (QĐ 162/QĐ-BYT)."
        });
      } else if (fdcCount > 0) {
        result.fdcRecommendation = {
          band: fdcBand,
          attack: `${fdcCount} viên phối hợp 4 thuốc (RHZE 150/75/400/275 mg) uống 1 lần duy nhất trong ngày lúc đói`,
          continuation: `${fdcCount} viên phối hợp 2 thuốc (RH 150/75 mg) hoặc ${Math.ceil(fdcCount/2)} viên (RH 300/150 mg) uống 1 lần trong ngày`
        };
      }

      result.drugDetails = [
        { name: "Isoniazid (H)", dose: `${h_dose} mg/ngày`, freq: "Hàng ngày (lúc đói)", note: `Liều 5 mg/kg (Trần tối đa 300 mg/ngày). Bổ sung Pyridoxine (B6) 25 mg/ngày.` },
        { name: "Rifampicin (R)", dose: `${r_dose} mg/ngày`, freq: "Hàng ngày (lúc đói)", note: `Liều 10 mg/kg (Trần tối đa 600 mg/ngày). Nước tiểu/dịch tiết có màu đỏ cam.` },
        { name: "Pyrazinamide (Z)", dose: `${z_dose} mg/ngày`, freq: z_freq, note: `Liều 25 mg/kg (Trần tối đa 2000 mg/ngày). Dùng trong 2 tháng tấn công.` },
        { name: "Ethambutol (E)", dose: `${e_dose} mg/ngày`, freq: e_freq, note: `Liều 15 mg/kg (TRẦN TỐI ĐA 1200 mg/ngày). Theo dõi thị lực và sắc giác đỏ - xanh.` }
      ];

    } else if (regimenType === "A1a") {
      result.regimenName = "Phác đồ A1a: 2HPMZ / 2HPM (Phác đồ rút ngắn 4 tháng cho người từ 12 tuổi trở lên)";
      result.duration = "4 tháng (17 tuần)";
      result.attackPhase = "2 tháng đầu (8 tuần): H, P (Rifapentine), M (Moxifloxacin), Z dùng hàng ngày cùng bữa ăn";
      result.continuationPhase = "2 tháng sau (9 tuần): H, P, M dùng hàng ngày cùng bữa ăn";
      result.pdf_ref = "QĐ 162/QĐ-BYT: Trang 52 (Mục 2.1 Phác đồ 4 tháng)";

      if (age < 12) {
        result.redFlags.push({
          title: "CHỐNG CHỈ ĐỊNH PHÁC ĐỒ A1a Ở TRẺ EM DƯỚI 12 TUỔI",
          message: "Phác đồ 4 tháng 2HPMZ/2HPM chỉ áp dụng cho người từ 12 tuổi trở lên. Trẻ em dưới 12 tuổi cần dùng phác đồ A1 hoặc A2 theo quy định."
        });
      }

      const z_cap = Math.min(Math.round(weight * 25), 2000);
      result.drugDetails = [
        { name: "Isoniazid (H)", dose: "300 mg/ngày (Trần tối đa 300 mg)", freq: "Hàng ngày", note: "Bắt buộc uống cùng Pyridoxine (B6) 25-50 mg/ngày" },
        { name: "Rifapentine (P)", dose: "1200 mg/ngày (Trần tối đa 1200 mg)", freq: "Hàng ngày (cùng bữa ăn)", note: "Uống cùng bữa ăn nhiều dầu mỡ để tăng hấp thu" },
        { name: "Moxifloxacin (M)", dose: "400 mg/ngày (Trần tối đa 400 mg)", freq: "Hàng ngày", note: "Theo dõi QTc trên ECG, không cần chỉnh liều suy thận" },
        { name: "Pyrazinamide (Z)", dose: `${z_cap} mg/ngày (Trần tối đa 2000 mg)`, freq: "Hàng ngày (chỉ dùng trong 8 tuần đầu)", note: "Liều 25 mg/kg" }
      ];

    } else if (regimenType === "B1") {
      result.regimenName = "Phác đồ B1: 2RHZE / 10RH (12 tháng cho Lao màng não, Lao xương khớp người lớn)";
      result.duration = "12 tháng (2 tháng tấn công + 10 tháng duy trì)";
      result.attackPhase = "2 tháng đầu: R, H, Z, E dùng hàng ngày";
      result.continuationPhase = "10 tháng tiếp theo: R, H dùng hàng ngày";
      result.pdf_ref = "QĐ 162/QĐ-BYT: Trang 53 (Phác đồ B1)";

      const h_cap = Math.min(Math.round(weight * 5), 300);
      const r_cap = Math.min(Math.round(weight * 10), 600);
      const z_cap = Math.min(Math.round(weight * 25), 2000);
      const e_cap = Math.min(Math.round(weight * 15), 1200);

      result.drugDetails = [
        { name: "Isoniazid (H)", dose: `${h_cap} mg/ngày (Trần 300 mg)`, freq: "Hàng ngày", note: "Xuyên thấu hàng rào máu não cực tốt (CSF 80-100%)." },
        { name: "Rifampicin (R)", dose: `${r_cap} mg/ngày (Trần 600 mg)`, freq: "Hàng ngày", note: "Ngấm CSF 10-20% khi màng não có viêm." },
        { name: "Pyrazinamide (Z)", dose: `${z_cap} mg/ngày (Trần 2000 mg)`, freq: "Hàng ngày x 2 tháng", note: "Ngấm CSF xuất sắc (80-100%)." },
        { name: "Ethambutol (E)", dose: `${e_cap} mg/ngày (Trần 1200 mg)`, freq: "Hàng ngày x 2 tháng", note: "Ngấm CSF khi màng não có viêm." }
      ];

      result.warnings.push("CHỈ ĐỊNH BẮT BUỘC CORTICOSTEROID TRONG LAO MÀNG NÃO: Dùng Dexamethasone hoặc Prednisolone bổ trợ đường tĩnh mạch/uống (giảm liều dần trong 6 - 8 tuần) để phòng ngừa phù não, viêm tắc mạch não và dính tắc dịch não tủy gây não úng thủy.");

    } else if (regimenType === "TPT_3HP") {
      result.regimenName = "Phác đồ 3HP: Rifapentine + Isoniazid (Dự phòng Lao tiềm ẩn 3 tháng uống 1 lần/tuần)";
      result.duration = "12 tuần (12 liều hàng tuần)";
      result.attackPhase = "Uống 1 lần vào một ngày cố định trong tuần x 12 tuần";
      result.continuationPhase = "Hoàn thành sau đủ 12 liều";
      result.pdf_ref = "QĐ 162/QĐ-BYT: Trang 114 (Mục 2.2 Phác đồ 3HP)";

      let rpt_dose = 900;
      if (weight >= 30 && weight <= 35) rpt_dose = 600;
      else if (weight >= 36 && weight <= 45) rpt_dose = 750;
      else if (weight >= 46) rpt_dose = 900;

      result.drugDetails = [
        { name: "Rifapentine (P)", dose: `${rpt_dose} mg (Trần tối đa 900 mg)`, freq: "1 LẦN/TUẦN (cùng bữa ăn)", note: "Viên 150 mg hoặc 300 mg" },
        { name: "Isoniazid (H)", dose: "900 mg (Trần tối đa 900 mg/tuần)", freq: "1 LẦN/TUẦN", note: "Uống cùng ngày với Rifapentine" },
        { name: "Pyridoxine (Vitamin B6)", dose: "50 mg", freq: "1 LẦN/TUẦN", note: "Phòng ngừa độc thần kinh ngoại vi" }
      ];
    }

    // Tương tác ARV / Thai kỳ
    if (hiv === "art_dtg") {
      result.redFlags.push({
        title: "TƯƠNG TÁC THUỐC NẶNG: RIFAMPICIN + DOLUTEGRAVIR (DTG)",
        message: "Rifampicin cảm ứng mạnh mẽ enzyme CYP3A4 và UGT1A1 làm giảm nồng độ Dolutegravir tới 50%. BẮT BUỘC TĂNG LIỀU DOLUTEGRAVIR LÊN 50 mg x 2 LẦN/NGÀY (uống cách nhau 12 giờ) trong suốt thời gian điều trị có Rifampicin và duy trì thêm 2 tuần sau khi ngừng Rifampicin."
      });
    } else if (hiv === "art_pi") {
      result.redFlags.push({
        title: "CHỐNG CHỈ ĐỊNH PHỐI HỢP: RIFAMPICIN + THUỐC ỨC CHẾ PROTEASE (LPV/r, ATV/r)",
        message: "Rifampicin làm giảm nồng độ Lopinavir/ritonavir xuống dưới ngưỡng điều trị gây thất bại ức chế HIV. BẮT BUỘC THAY RIFAMPICIN BẰNG RIFABUTIN liều 150 mg/ngày (hoặc 300 mg x 3 lần/tuần) theo đúng Phụ lục 7 (QĐ 162/QĐ-BYT)."
      });
    }

    if (pregnant === "yes") {
      result.warnings.push("PHỤ NỮ CÓ THAI: Phác đồ A1 (2RHZE/4RH) là an toàn (nhóm A theo WHO). Bắt buộc bổ sung Vitamin B6 25 mg/ngày cho mẹ và tiêm Vitamin K dự phòng cho trẻ sơ sinh ngay sau sinh. TUYỆT ĐỐI CHỐNG CHỈ ĐỊNH Streptomycin (gây điếc bẩm sinh) và Ethionamide (gây quái thai).");
    }

    return result;
  },

  // 2. TÍNH ĐIỂM LAO TRẺ EM THEO BẢNG 4 (QĐ 162/QĐ-BYT - TRANG 33)
  calculatePediatricScore: function(scores) {
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
      action = "Chỉ định điều trị ngay phác đồ lao trẻ em: Phác đồ A2 (2HRZ/2HR cho thể nhẹ không biến chứng) hoặc phác đồ chuẩn 2HRZE/4HR. Không cần chờ kết quả vi sinh.";
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
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 33 (Sơ đồ 3 & Bảng 4: Bảng chấm điểm chẩn đoán lao phổi trẻ em)"
    };
  },

  // ===========================================================================
  // THUẬT TOÁN B: XỬ TRÍ ĐỘC TÍNH GAN DO THUỐC (DILI) THEO BẢNG 10 (QĐ 162/QĐ-BYT)
  // ===========================================================================
  assessDILI: function(alt, ast, bili, symptoms) {
    const uln_trans = 40; // Giới hạn trên bình thường tiêu chuẩn (U/L)
    const uln_bili = 1.2; // mg/dL hoặc 20.5 mcmol/L

    const max_trans = Math.max(alt, ast);
    const trans_ratio = (max_trans / uln_trans);
    const bili_ratio = (bili / uln_bili);

    let status = "";
    let severity = "";
    let alertType = ""; // 'red_flag', 'warning', 'safe'
    let recommendation = "";

    // TRƯỜNG HỢP 1: ALT/AST >= 3 lần ULN KÈM triệu chứng lâm sàng
    if (trans_ratio >= 3 && symptoms) {
      alertType = "red_flag";
      severity = "BÁO ĐỘNG ĐỎ: TỔN THƯƠNG GAN CẤP CÓ TRIỆU CHỨNG (BẢNG 10 - QĐ 162/QĐ-BYT)";
      status = `Men gan tăng ${trans_ratio.toFixed(1)} lần ULN (ALT: ${alt}, AST: ${ast}) KÈM TRIỆU CHỨNG LÂM SÀNG (buồn nôn, nôn, chán ăn, vàng da, đau hạ sườn phải). Bilirubin: ${bili} mg/dL (${bili_ratio.toFixed(1)}x ULN).`;
      recommendation = `
        <div class="clinical-steps">
          <p><strong>1. HÀNH ĐỘNG KHẨN CẤP:</strong> <span class="text-danger font-weight-bold">NGỪNG NGAY LẬP TỨC TẤT CẢ CÁC THUỐC CÓ ĐỘC TÍNH VỚI GAN</span>: Isoniazid (H), Rifampicin (R), Pyrazinamide (Z).</p>
          <p><strong>2. PHÁC ĐỒ TẠM THỜI THAY THẾ:</strong> Nếu người bệnh đang trong tình trạng lao nặng đe dọa tính mạng (Lao kê, Lao màng não, suy hô hấp): Bắt đầu ngay phác đồ không độc tế bào gan gồm: <strong>Ethambutol (E) + Kháng sinh nhóm Quinolone (Levofloxacin) ± Streptomycin (S)</strong>.</p>
          <p><strong>3. THEO DÕI HỒI PHỤC:</strong> Xét nghiệm lại AST, ALT, Bilirubin mỗi 3 - 7 ngày cho đến khi ALT giảm xuống < 2 lần ULN và bệnh nhân hết hoàn toàn triệu chứng lâm sàng.</p>
          <p><strong>4. QUY TRÌNH THỬ LẠI THUỐC (RE-CHALLENGE) TỪNG BƯỚC THEO QĐ 162/QĐ-BYT:</strong>
            <ul>
              <li><strong>Bước 1:</strong> Thử lại <strong>Rifampicin</strong> liều nhỏ (150 mg/ngày -> tăng lên 300mg -> 450/600mg sau 3 - 5 ngày). Rifampicin ít gây hoại tử tế bào gan nhất trong nhóm HRZ.</li>
              <li><strong>Bước 2:</strong> Nếu men gan bình thường sau 1 tuần, tiếp tục thử lại <strong>Isoniazid</strong> (100 mg/ngày -> tăng lên 300mg sau 3 - 5 ngày).</li>
              <li><strong>Bước 3:</strong> <span class="text-danger">NẾU BỆNH NHÂN TỪNG CÓ VÀNG DA HOẶC VIÊM GAN NẶNG: KHÔNG ĐƯỢC DÙNG LẠI PYRAZINAMIDE (Z)</span>. Kéo dài phác đồ thành <strong>2RHE / 7RH</strong> (tổng thời gian 9 tháng).</li>
            </ul>
          </p>
        </div>
      `;

    // TRƯỜNG HỢP 2: ALT/AST >= 5 lần ULN dù KHÔNG có triệu chứng
    } else if (trans_ratio >= 5) {
      alertType = "red_flag";
      severity = "BÁO ĐỘNG ĐỎ: MEN GAN TĂNG RẤT CAO ≥ 5 LẦN ULN (BẢNG 10 - QĐ 162/QĐ-BYT)";
      status = `Men gan tăng ${trans_ratio.toFixed(1)} lần ULN (ALT: ${alt}, AST: ${ast}) dù bệnh nhân KHÔNG CÓ TRIỆU CHỨNG LÂM SÀNG.`;
      recommendation = `
        <div class="clinical-steps">
          <p><strong>1. HÀNH ĐỘNG KHẨN CẤP:</strong> <span class="text-danger font-weight-bold">NGỪNG NGAY LẬP TỨC CÁC THUỐC ĐỘC GAN (H, R, Z)</span>. Ngưỡng tăng ≥ 5 lần ULN có nguy cơ hoại tử tế bào gan bùng phát dẫn đến suy gan cấp.</p>
          <p><strong>2. ĐÁNH GIÁ CĂN NGUYÊN PHỐI HỢP:</strong> Làm xét nghiệm HBsAg, Anti-HCV, IgM Anti-HAV, tiền sử dùng Paracetamol, rượu bia hoặc các thuốc thảo dược.</p>
          <p><strong>3. THEO DÕI:</strong> Đo men gan mỗi 3 - 5 ngày. Khi ALT < 2 lần ULN, tiến hành thử lại từng thuốc theo quy trình như trên.</p>
        </div>
      `;

    // TRƯỜNG HỢP 3: ALT/AST từ 3 đến < 5 lần ULN và KHÔNG có triệu chứng
    } else if (trans_ratio >= 3 && trans_ratio < 5 && !symptoms) {
      alertType = "warning";
      severity = "BÁO ĐỘNG VÀNG: MEN GAN TĂNG 3 - < 5 LẦN ULN KHÔNG TRIỆU CHỨNG (BẢNG 10)";
      status = `Men gan tăng ${trans_ratio.toFixed(1)} lần ULN (ALT: ${alt}, AST: ${ast}), chưa vượt ngưỡng 5 lần ULN và không có triệu chứng lâm sàng.`;
      recommendation = `
        <div class="clinical-steps">
          <p><strong>1. XỬ TRÍ:</strong> <span class="text-warning font-weight-bold">CHƯA CẦN NGỪNG THUỐC CHỐNG LAO</span>.</p>
          <p><strong>2. THEO DÕI SÁT:</strong> Xét nghiệm lại men gan và Bilirubin mỗi 3 - 7 ngày một lần.</p>
          <p><strong>3. CẢNH BÁO BỆNH NHÂN:</strong> Tuyệt đối không dùng rượu bia, không tự ý uống paracetamol hoặc thuốc nam/thuốc bắc. Dặn dò bệnh nhân báo bác sĩ ngay nếu xuất hiện mệt mỏi, chán ăn, buồn nôn hoặc nước tiểu sẫm màu.</p>
        </div>
      `;

    // TRƯỜNG HỢP 4: Men gan < 3 lần ULN và không triệu chứng -> AN TOÀN
    } else {
      alertType = "safe";
      severity = "MEN GAN TRONG GIỚI HẠN AN TOÀN CHO PHÉP (< 3 LẦN ULN)";
      status = `Men gan tăng nhẹ (${trans_ratio.toFixed(1)} lần ULN), đáp ứng sinh lý bình thường trong điều trị lao.`;
      recommendation = "Tiếp tục phác đồ điều trị lao hiện tại. Tái khám và xét nghiệm men gan định kỳ hàng tháng.";
    }

    return {
      severity: severity,
      status: status,
      alertType: alertType,
      recommendation: recommendation,
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 90-95 (Mục 5.3) & Phụ lục 10 (Nhận dạng ADR & Giảm mẫn cảm)"
    };
  },

  // ===========================================================================
  // THUẬT TOÁN C: KIỂM SOÁT KHOẢNG QTc TRÊN ECG (PHÂN TẦNG THEO GIỚI TÍNH)
  // ===========================================================================
  assessQTc: function(qtcMs, gender, baselineQtc) {
    gender = gender || "male";
    const normalThreshold = (gender === "female") ? 470 : 450;
    const deltaQtc = baselineQtc ? (qtcMs - baselineQtc) : 0;

    let level = "";
    let alertType = ""; // 'red_flag', 'warning', 'safe'
    let action = "";

    // 1. BÁO ĐỘNG ĐỎ: QTc > 500 ms HOẶC tăng > 60 ms so với ECG nền
    if (qtcMs > 500 || deltaQtc > 60) {
      alertType = "red_flag";
      level = `BÁO ĐỘNG ĐỎ: KÉO DÀI QTc NGUY HIỂM (> 500 ms HOẶC TĂNG ΔQTc > 60 ms) - NGUY CƠ XOẮN ĐỈNH (TORSADES DE POINTES)`;
      action = `
        <div class="clinical-steps">
          <p><strong>1. HÀNH ĐỘNG NGAY:</strong> <span class="text-danger font-weight-bold">NGỪNG NGAY LẬP TỨC CÁC THUỐC KÉO DÀI QT</span>: Bedaquiline (Bdq), Moxifloxacin (Mfx), Clofazimine (Cfz), Delamanid (Dlm).</p>
          <p><strong>2. ĐIỀU CHỈNH ĐIỆN GIẢI KHẨN CẤP:</strong> Xét nghiệm khẩn cấp Điện giải đồ máu. Bù dịch và điện giải đường tĩnh mạch/uống để đạt mục tiêu:
            <ul>
              <li><strong>Kali máu (K+):</strong> Duy trì > 4.0 - 4.5 mmol/L.</li>
              <li><strong>Magie máu (Mg2+):</strong> Duy trì > 0.8 - 1.0 mmol/L.</li>
            </ul>
          </p>
          <p><strong>3. THEO DÕI:</strong> Đo lại ECG hàng ngày hoặc theo dõi monitor liên tục cho đến khi QTc < 480 ms.</p>
          <p><strong>4. HỘI CHẨN CHUYÊN GIA:</strong> Hội chẩn Tim mạch và Hội đồng Lao kháng thuốc. Cân nhắc thay Moxifloxacin bằng Levofloxacin (ít kéo dài QT hơn) sau khi QTc đã về ngưỡng an toàn.</p>
        </div>
      `;

    // 2. CẢNH BÁO / RANH GIỚI: QTc từ 450 (Nam) / 470 (Nữ) đến 500 ms, hoặc delta 30-60 ms
    } else if (qtcMs >= normalThreshold || deltaQtc >= 30) {
      alertType = "warning";
      level = `CẢNH BÁO: QTc KÉO DÀI RANH GIỚI (${normalThreshold} - 500 ms) HOẶC TĂNG ΔQTc: ${deltaQtc} ms`;
      action = `
        <div class="clinical-steps">
          <p><strong>1. XỬ TRÍ:</strong> Tiếp tục dùng thuốc nhưng BẮT BUỘC TĂNG TẦN SUẤT ĐO ECG LÊN HÀNG TUẦN.</p>
          <p><strong>2. KIỂM SOÁT ĐIỆN GIẢI:</strong> Xét nghiệm Kali, Magie máu và bù điện giải dự phòng nếu ở ngưỡng thấp.</p>
          <p><strong>3. TRÁNH TƯƠNG TÁC THUỐC:</strong> Rà soát và ngưng các thuốc dùng kèm làm kéo dài QT (thuốc chống nôn Ondansetron/Domperidone, thuốc chống loạn thần, thuốc kháng nấm azole, kháng sinh macrolide).</p>
        </div>
      `;

    // 3. AN TOÀN
    } else {
      alertType = "safe";
      level = `KHOẢNG QTc TRONG GIỚI HẠN AN TOÀN SINH LÝ (< ${normalThreshold} ms Ở ${gender === 'female' ? 'NỮ' : 'NAM'})`;
      action = `An toàn. Tiếp tục theo dõi ECG theo lịch trình chuẩn của phác đồ (trước điều trị và ở tuần 2, 4, 8, 12, 16, 20, 24).`;
    }

    return {
      level: level,
      alertType: alertType,
      deltaQtc: deltaQtc,
      action: action,
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 65 (Bảng 5: Chống chỉ định & Cẩn trọng Bedaquiline)"
    };
  }
};

if (typeof window !== "undefined") {
  window.TBCalculator = TBCalculator;
}