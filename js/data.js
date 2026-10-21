/**
 * CƠ SỞ DỮ LIỆU CHUYÊN SÂU LAO HỌC, DƯỢC LÝ & PHÁC ĐỒ LÂM SÀNG
 * Dựa trên: Hướng dẫn Chẩn đoán, điều trị và dự phòng bệnh Lao ban hành theo Quyết định số 162/QĐ-BYT ngày 19/01/2024 của Bộ Y tế
 * Bổ sung cơ chế Dược lý, Di truyền học, Sinh lý bệnh & Trích dẫn quốc tế (WHO, NIH, PubMed)
 */

const TB_DATABASE = {
  // 1. TỪ ĐIỂN DƯỢC LÝ THUỐC CHỐNG LAO CHO LÂM SÀNG & NGHIÊN CỨU SINH
  drugs: [
    {
      id: "H",
      code: "H / INH",
      name: "Isoniazid (Acid Isonicotinic Hydrazid)",
      group: "Hàng 1 thiết yếu",
      class: "Kháng sinh ức chế tổng hợp thành tế bào vi khuẩn lao",
      molecular_target: {
        description: "Ức chế tổng hợp acid mycolic - thành phần lipid cấu trúc đặc thù của thành tế bào Mycobacterium tuberculosis.",
        mechanism: "Isoniazid là tiền dược (prodrug). Khi vào bên trong trực khuẩn lao, enzyme catalase-peroxidase nội bào (mã hóa bởi gen katG) sẽ hoạt hóa INH thành gốc tự do isonicotinoyl. Gốc tự do này tạo phức hợp cộng hóa trị với NAD+ và NADP+, tạo thành chất ức chế cạnh tranh với InhA (enoyl-acyl carrier protein reductase) và KasA (beta-ketoacyl-ACP synthase). Sự ức chế InhA làm ngắt chuỗi tổng hợp acid mycolic mạch dài (C60-C90), làm tổn hại màng lipid, làm vỡ vách tế bào vi khuẩn.",
        target_enzymes: "KatG (hoạt hóa tiền dược) -> InhA (enoyl-ACP reductase) & KasA"
      },
      pk_pd: {
        absorption: "Hấp thu nhanh và gần như hoàn toàn qua đường tiêu hóa (sinh khả dụng đường uống > 90%). Bị giảm hấp thu khi dùng cùng thức ăn giàu chất béo hoặc antacid chứa nhôm.",
        distribution: "Phân bố rộng rãi vào tất cả các mô và dịch cơ thể (thể tích phân bố Vd ~ 0.6 L/kg). Thâm nhập dịch não tủy (CSF) rất tốt: đạt 80 - 100% nồng độ huyết tương khi màng não viêm hoặc bình thường. Ngấm tốt vào ổ bã đậu, màng phổi, cổ trướng.",
        protein_binding: "< 10% (rất thấp).",
        metabolism: "Chuyển hóa tại gan qua quá trình acetyl hóa bởi enzyme N-acetyltransferase 2 (NAT2). Kiểu hình di truyền quyết định tốc độ chuyển hóa: Người acetyl hóa nhanh (fast acetylator, T1/2 ~ 1-1.5h, phổ biến ở người Châu Á ~ 60-80%) vs Người acetyl hóa chậm (slow acetylator, T1/2 ~ 3-4h). Chất chuyển hóa acetylisoniazid sau đó bị thủy phân thành monoacetylhydrazine (chất trung gian gây độc tế bào gan qua cytochrome P450 2E1).",
        elimination: "75 - 95% đào thải qua nước tiểu trong 24 giờ dưới dạng acetylisoniazid và các chất chuyển hóa không hoạt tính; chỉ < 10% đào thải dưới dạng không đổi.",
        pk_pd_index: "AUC0-24/MIC (hoặc Cmax/MIC). Diệt khuẩn phụ thuộc nồng độ và diện tích dưới đường cong."
      },
      bacterial_activity: {
        early_bactericidal_activity: "EBA CỰC CAO (Cao nhất trong các thuốc chống lao hàng 1). Trong 2 ngày đầu điều trị, INH tiêu diệt 95-99% quần thể trực khuẩn lao phân chia nhanh ở thành hang lao ngoại bào, làm giảm nhanh số lượng vi khuẩn trong đờm và cắt đứt nguồn lây.",
        sterilizing_activity: "Trung bình - thấp đối với thể ngủ (dormant bacilli) hoặc trực khuẩn bán ngủ trong môi trường toan hóa bã đậu."
      },
      resistance_genetics: {
        primary_mutations: "1) Đột biến gen katG (phổ biến nhất là đột biến Ser315Thr / S315T): làm mất khả năng hoạt hóa INH của enzyme catalase-peroxidase, gây kháng mức độ cao (high-level resistance, MIC > 5 mcg/ml).\n2) Đột biến vùng khởi động (promoter) của gen inhA (thường gặp -15 C->T): tăng biểu hiện enzyme InhA, gây kháng mức độ thấp (low-level resistance, MIC 0.2 - 1 mcg/ml) và gây KHÁNG CHÉO với Ethionamide (Eto/Pto).\n3) Đột biến gen kasA, oxyR-ahpC intergenic region.",
        natural_mutation_rate: "10^-6 (1 trên 1 triệu vi khuẩn). Đây là lý do không bao giờ được dùng đơn trị liệu INH khi đang mắc lao hoạt động."
      },
      dosage_v10: {
        adult: "5 mg/kg/ngày (khoảng 4 - 6 mg/kg). Liều tối đa: 300 mg/ngày. Dùng 1 lần duy nhất lúc đói (trước ăn 1 giờ hoặc sau ăn 2 giờ).",
        child: "10 mg/kg/ngày (khoảng 7 - 15 mg/kg). Liều tối đa: 300 mg/ngày.",
        fixed_dose_combination: "Có trong viên 4 FDC (RHZE) và 2 FDC (RH)."
      },
      special_adjustments: {
        renal: "CrCl < 30 ml/min hoặc chạy thận nhân tạo: Không cần chỉnh liều nếu là người acetyl hóa nhanh; người suy thận nặng hoặc acetyl hóa chậm có thể giảm còn 200-300 mg/ngày hoặc 300 mg x 3 lần/tuần sau lọc máu. BẮT BUỘC bổ sung Pyridoxine (Vitamin B6) 25 - 50 mg/ngày.",
        hepatic: "Thận trọng theo dõi men gan. Chống chỉ định khi viêm gan cấp tiến triển hoặc tiền sử tổn thương gan nặng do INH.",
        pregnancy_lactation: "An toàn trong thai kỳ và cho con bú (nhóm A theo WHO). Cần bổ sung Vitamin B6 25 mg/ngày cho mẹ để phòng ngừa độc thần kinh cho thai nhi/trẻ bú."
      },
      adr_monitoring: {
        common: "Tăng men gan không triệu chứng (10-20% tự hồi phục), tê bì đầu chi/viêm dây thần kinh ngoại biên (do cạnh tranh thoái giáng pyridoxal phosphate).",
        severe: "Viêm gan nhiễm độc thuốc (DILI) có hoại tử tế bào gan (tăng nguy cơ ở người cao tuổi, nghiện rượu, mang gen NAT2 chậm, dùng kèm Rifampicin/Pyrazinamide). Co giật, rối loạn tâm thần, hội chứng giống Lupus ban đỏ hệ thống (SLE-like).",
        monitoring: "AST, ALT, Bilirubin trước điều trị và hàng tháng ở nhóm nguy cơ cao; khám cảm giác ngoại vi."
      },
      drug_interactions: {
        details: "INH ức chế men gan CYP2C19, CYP2C9, CYP3A4 nhẹ và CYP2E1: làm tăng nồng độ Phenytoin, Carbamazepine, Theophylline, Warfarin (tăng nguy cơ ngộ độc thuốc chống co giật). Dùng cùng antacid nhôm hydroxide làm giảm hấp thu INH. Dùng cùng Paracetamol liều cao làm tăng độc tính gan."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 51 (Mục 2), Phụ lục 6 (Trang 196 - Bảng 1), Phụ lục 7 (Trang 208), Phụ lục 10 (Trang 218)",
      citations: [
        { title: "NIH / PubMed: Molecular mechanisms of Isoniazid resistance in M. tuberculosis", url: "https://pubmed.ncbi.nlm.nih.gov/16280194/" },
        { title: "PubChem: Isoniazid Compound Summary (CID 3767)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Isoniazid" },
        { title: "WHO Consolidated Guidelines on Tuberculosis: Module 4 Treatment", url: "https://www.who.int/publications/i/item/9789240048126" }
      ]
    },
    {
      id: "R",
      code: "R / RIF",
      name: "Rifampicin (Rifampin)",
      group: "Hàng 1 thiết yếu",
      class: "Kháng sinh nhóm Rifamycin ức chế tổng hợp RNA vi khuẩn",
      molecular_target: {
        description: "Ức chế enzyme RNA polymerase phụ thuộc DNA của vi khuẩn lao.",
        mechanism: "Rifampicin gắn kết vật lý chặt chẽ vào tiểu đơn vị beta (beta-subunit) của enzyme RNA polymerase (được mã hóa bởi gen rpoB) tại vị trí gần trung tâm xúc tác. Sự gắn kết này tạo rào cản không gian (steric hindrance) ngăn cản sự kéo dài chuỗi RNA sơ khai vượt quá 2-3 nucleotide, làm ngừng quá trình phiên mã và ức chế hoàn toàn quá trình tổng hợp protein của vi khuẩn. Rifampicin không ức chế RNA polymerase của tế bào nhân thực người ở nồng độ điều trị.",
        target_enzymes: "Tiểu đơn vị beta của RNA Polymerase (sản phẩm mã hóa gen rpoB)"
      },
      pk_pd: {
        absorption: "Hấp thu tốt qua đường tiêu hóa (sinh khả dụng ~ 90-95% khi uống lúc đói). Thức ăn làm giảm đỉnh nồng độ Cmax tới 30% và kéo dài Tmax.",
        distribution: "Là phân tử thân dầu mạnh (lipophilic), phân bố rất rộng vào khắp các mô, dịch phế quản, đại thực bào và dịch ngoại bào. Xuyên thấu tuyệt vời vào các tổn thương bã đậu và hang lao. Thâm nhập CSF: 10-20% khi màng não viêm (vẫn đủ nồng độ ức chế MIC), thấp khi màng não bình thường.",
        protein_binding: "Cao (~ 80 - 90%), chủ yếu gắn với albumin.",
        metabolism: "Khử acetyl nhanh chóng ở gan thành 25-O-deacetylrifampicin (vẫn còn hoạt tính kháng khuẩn). Rifampicin có chu trình gan - ruột (enterohepatic circulation). ĐẶC BIỆT: Rifampicin là chất cảm ứng cực mạnh enzyme gan CYP3A4, CYP2C9, CYP2C19, CYP1A2 và chất vận chuyển P-glycoprotein.",
        elimination: "Khoảng 60 - 65% thải trừ qua mật vào phân; khoảng 30% thải trừ qua nước tiểu (trong đó ~一半 là dạng không đổi). Gây hiện tượng đào thải chất màu đỏ cam qua nước tiểu, nước bọt, nước mắt, mồ hôi (lành tính).",
        pk_pd_index: "AUC0-24/MIC và Cmax/MIC. Hiệu lực tiệt khuẩn tối ưu khi đạt Cmax từ 8 - 24 mcg/ml."
      },
      bacterial_activity: {
        early_bactericidal_activity: "EBA cao (xếp thứ 2 sau INH trong vài ngày đầu).",
        sterilizing_activity: "HOẠT TÍNH TIỆT KHUẨN (STERILIZING ACTIVITY) MẠNH NHẤT: Tiêu diệt xuất sắc các trực khuẩn thể bán ngủ (persisters/semi-dormant) có những đợt bùng phát chuyển hóa ngắn ngủi trong môi trường kỵ khí hoặc bên trong u hạt bã đậu. Rifampicin là trụ cột quyết định việc rút ngắn thời gian điều trị lao từ 18 tháng xuống còn 6 tháng."
      },
      resistance_genetics: {
        primary_mutations: "> 95% chủng kháng Rifampicin mang đột biến trên đoạn 81-bp (vùng RRDR - Rifampicin Resistance Determining Region) thuộc gen rpoB từ codon 507 đến 533. Đột biến hay gặp nhất trên lâm sàng: S531L (Ser531Leu), H526Y, D516V. Đây chính là đích dò phân tử của xét nghiệm GeneXpert MTB/RIF và Hain GenoType MTBDRplus.",
        natural_mutation_rate: "10^-8 (1 trên 100 triệu vi khuẩn). Kháng Rifampicin hầu như luôn đi kèm đa kháng thuốc (MDR-TB)."
      },
      dosage_v10: {
        adult: "10 mg/kg/ngày (khoảng 8 - 12 mg/kg). Liều tối đa: 600 mg/ngày. Uống 1 lần duy nhất trước ăn sáng 1 giờ hoặc sau ăn 2 giờ.",
        child: "15 mg/kg/ngày (khoảng 10 - 20 mg/kg). Liều tối đa: 600 mg/ngày.",
        fixed_dose_combination: "Có trong viên 4 FDC và viên 2 FDC."
      },
      special_adjustments: {
        renal: "Thải trừ chủ yếu qua mật, do đó KHÔNG CẦN CHỈNH LIỀU ở bệnh nhân suy thận (kể cả CrCl < 30 ml/min và lọc máu chu kỳ). Uống liều bình thường sau buổi lọc máu.",
        hepatic: "Cẩn trọng ở bệnh nhân có tổn thương gan mạn tính. Nếu men gan tăng vọt > 3-5 lần ULN kèm triệu chứng, cần tạm ngừng.",
        pregnancy_lactation: "Dùng an toàn trong thai kỳ (nhóm A theo WHO). Có nguy cơ gây thiếu hụt vitamin K thoáng qua ở trẻ sơ sinh nếu mẹ dùng vào tuần cuối thai kỳ (tiêm Vitamin K dự phòng cho trẻ sau sinh)."
      },
      adr_monitoring: {
        common: "Nước tiểu, mồ hôi, nước mắt có màu đỏ cam (cần dặn trước người bệnh tránh hoang mang, không đeo kính áp tròng mềm). Rối loạn tiêu hóa nhẹ (buồn nôn, ợ hơi, đau bụng).",
        severe: "Độc tế bào gan (tăng bilirubin và men gan, nguy cơ tăng khi phối hợp với INH và PZA). Hội chứng giống cúm (Flu-like syndrome: sốt, ớn lạnh, đau cơ - hay gặp khi dùng ngắt quãng). Giảm tiểu cầu miễn dịch, thiếu máu tan máu cấp, suy thận cấp vô niệu (hiếm, cần ngừng vĩnh viễn).",
        monitoring: "Men gan, Bilirubin, Công thức máu (tiểu cầu), Creatinine huyết thanh."
      },
      drug_interactions: {
        details: "LÀ CHẤT CẢM ỨNG ENZYME CYP450 VÀ P-GLYCOPROTEIN MẠNH NHẤT:\n- Tương tác cực nặng với thuốc kháng virus HIV (ARV): Làm giảm sâu nồng độ thuốc ức chế Protease (PI) và NNRTI, Dolutegravir (phải tăng liều Dolutegravir lên 50mg x 2 lần/ngày, hoặc thay Rifampicin bằng Rifabutin).\n- Làm mất tác dụng của thuốc tránh thai đường uống (phải dùng biện pháp cơ học).\n- Làm giảm nồng độ: Thuốc chống đông kháng Vitamin K (Warfarin - giảm INR), Thuốc tim mạch (Amlodipine, Digoxin, Beta-blockers), Thuốc hạ đường huyết (Sulfonylureas), Corticosteroid, Thuốc chống thải ghép (Cyclosporine, Tacrolimus), Kháng nấm nhóm Azole (Itraconazole, Voriconazole)."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 51, Phụ lục 6 (Trang 196), Phụ lục 7 (Trang 208-212 - Bảng tương tác ARV), Phụ lục 10 (Trang 218)",
      citations: [
        { title: "NIH / PubMed: Mechanism of action and resistance of Rifampicin", url: "https://pubmed.ncbi.nlm.nih.gov/22008770/" },
        { title: "PubChem: Rifampicin Compound Summary (CID 135398735)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Rifampicin" },
        { title: "CDC: Treatment of Drug-Susceptible Tuberculosis", url: "https://www.cdc.gov/tb/topic/treatment/tbdisease.htm" }
      ]
    },
    {
      id: "Z",
      code: "Z / PZA",
      name: "Pyrazinamide",
      group: "Hàng 1 thiết yếu",
      class: "Thuốc kháng khuẩn đặc hiệu diệt khuẩn thể bán ngủ trong môi trường acid",
      molecular_target: {
        description: "Ức chế tổng hợp màng và gây rối loạn điện thế màng tế bào vi khuẩn lao trong môi trường acid nội bào.",
        mechanism: "Pyrazinamide là tiền dược. Vi khuẩn lao tiết enzyme pyrazinamidase / nicotinamidase (mã hóa bởi gen pncA) để chuyển PZA thành acid pyrazinoic (POA). Trong môi trường toan hóa (pH 5.0 - 5.5 bên trong phagolysosome của đại thực bào hoặc trong trung tâm ổ hoại tử bã đậu), POA tích lũy dưới dạng không tích điện, phá vỡ điện thế màng tế bào (proton motive force), ức chế enzyme tổng hợp acid béo FAS-I (fatty acid synthase type I) và gắn kết protein ribosomal RpsA làm đình trệ quá trình trans-translation của vi khuẩn.",
        target_enzymes: "PncA (enzyme hoạt hóa) -> Fas-I & RpsA (ribosome protein S1)"
      },
      pk_pd: {
        absorption: "Hấp thu nhanh và gần như hoàn toàn qua đường tiêu hóa (sinh khả dụng > 90%). Không bị ảnh hưởng nhiều bởi thức ăn.",
        distribution: "Thâm nhập mô cực tốt nhờ kích thước phân tử nhỏ và tính phân cực (Vd ~ 0.6 - 0.7 L/kg). THÂM NHẬP DỊCH NÃO TỦY (CSF) RẤT CAO: Nồng độ trong CSF đạt 80 - 100% nồng độ huyết tương cả khi màng não bình thường và màng não viêm. Xuyên thấu tuyệt vời vào các tế bào bạch cầu và u hạt viêm.",
        protein_binding: "Thấp (10 - 20%).",
        metabolism: "Thủy phân ở gan bởi men microsomal deaminase thành acid pyrazinoic (chất có hoạt tính), sau đó được xanthine oxidase oxy hóa thành acid 5-hydroxypyrazinoic.",
        elimination: "Khoảng 70% liều dùng đào thải qua nước tiểu trong 24 giờ dưới dạng các chất chuyển hóa và ~ 4-14% dạng thuốc gốc. Pyrazinamide và các chất chuyển hóa cạnh tranh bài tiết với acid uric tại ống thận, gây ứ đọng acid uric máu.",
        pk_pd_index: "AUC0-24/MIC. Cần nồng độ đỉnh đạt 20 - 60 mcg/ml."
      },
      bacterial_activity: {
        early_bactericidal_activity: "EBA rất thấp trong 2 ngày đầu đối với vi khuẩn phân chia nhanh ở môi trường trung tính.",
        sterilizing_activity: "HOẠT TÍNH TIỆT KHUẨN ĐẶC HIỆU TRONG 2 THÁNG ĐẦU: Tiêu diệt vi khuẩn lao 'ngủ đông' ẩn náu trong các thực bào toan hóa. PZA cho phép rút ngắn giai đoạn tấn công của phác đồ từ 6 tháng xuống còn 2 tháng. Sau 2 tháng, phần lớn vi khuẩn nhạy cảm với PZA đã bị tiêu diệt, nên không cần dùng PZA ở giai đoạn duy trì."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến điểm rải rác trên toàn bộ chiều dài của gen pncA (hoặc vùng điều hòa promoter), làm mất hoạt tính của enzyme pyrazinamidase nội bào. Mycobacterium bovis có tính đề kháng tự nhiên với PZA do mang đột biến điểm cố định His57Asp trên gen pncA.",
        natural_mutation_rate: "10^-5."
      },
      dosage_v10: {
        adult: "25 mg/kg/ngày (khoảng 20 - 30 mg/kg). Liều tối đa: 2000 mg/ngày (hoặc tối đa theo phân nhóm cân nặng: 30-39kg dùng 1000mg; 40-54kg dùng 1500mg; 55-70kg dùng 2000mg; >70kg dùng 2000mg).",
        child: "35 mg/kg/ngày (khoảng 30 - 40 mg/kg).",
        fixed_dose_combination: "Có trong viên 4 FDC (chứa 400 mg Z/viên)."
      },
      special_adjustments: {
        renal: "Thuốc và chất chuyển hóa tích lũy mạnh khi suy thận: CrCl < 30 ml/min hoặc chạy thận nhân tạo: GIẢM TẦN SUẤT XUỐNG 25 - 35 mg/kg x 3 LẦN/TUẦN (uống sau buổi lọc máu vào các ngày thứ 2, 4, 6), không dùng hàng ngày để tránh ngộ độc acid pyrazinoic.",
        hepatic: "ĐÂY LÀ THUỐC CÓ ĐỘC TÍNH VỚI GAN MẠNH NHẤT TRONG HÀNG 1. Chống chỉ định cho bệnh nhân suy gan nặng, xơ gan mất bù.",
        pregnancy_lactation: "WHO khuyến cáo an toàn trong thai kỳ (nhóm A); tại Hoa Kỳ CDC/FDA xếp nhóm C (vẫn ưu tiên dùng trong phác đồ chuẩn 6 tháng nếu không có chống chỉ định)."
      },
      adr_monitoring: {
        common: "Tăng acid uric máu không triệu chứng (gần như 100% người bệnh, do ức chế bài tiết acid uric tại ống thận), đau mỏi khớp (arthralgia, thường đáp ứng tốt với NSAIDs/Paracetamol mà không cần dừng thuốc).",
        severe: "Cơn Gút cấp (viêm ngón chân cái sưng nóng đỏ đau). Độc gan nặng phụ thuộc liều (viêm gan hoại tử tế bào, vàng da ứ mật). Nhạy cảm ánh sáng (phát ban da khi tiếp xúc nắng).",
        monitoring: "Định kỳ đo men gan (AST/ALT), Bilirubin; đo Acid uric huyết thanh khi có đau khớp cấp."
      },
      drug_interactions: {
        details: "Dùng cùng Allopurinol: không khuyến cáo dùng thường quy trừ khi bùng phát Gút nặng. Phối hợp với Rifampicin + Isoniazid làm tăng hiệp đồng độc tính trên gan."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 51, Phụ lục 6 (Trang 196 - Bảng 1 & 2), Phụ lục 7 (Bảng 5 điều chỉnh suy thận), Phụ lục 10",
      citations: [
        { title: "NIH / PubMed: Pyrazinamide - Mechanisms of Action and Resistance", url: "https://pubmed.ncbi.nlm.nih.gov/24434252/" },
        { title: "PubChem: Pyrazinamide Compound Summary (CID 1046)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Pyrazinamide" }
      ]
    },
    {
      id: "E",
      code: "E / EMB",
      name: "Ethambutol",
      group: "Hàng 1 thiết yếu",
      class: "Thuốc kìm khuẩn ức chế tổng hợp thành tế bào arabinogalactan",
      molecular_target: {
        description: "Ức chế enzyme arabinosyl transferase tham gia tổng hợp thành tế bào vi khuẩn.",
        mechanism: "Ethambutol khuếch tán vào bên trong trực khuẩn và ức chế chọn lọc các enzyme arabinosyl transferase (mã hóa bởi cụm gen operon embCAB, chủ yếu là EmbB). Sự ức chế này ngăn chặn sự polymer hóa arabinose thành arabinogalactan - phân tử polymer carbohydrate liên kết màng peptidoglycan bên dưới với lớp acid mycolic bên ngoài của thành tế bào mycobacteria. Mất lớp màng này làm tăng tính thấm của vỏ tế bào với các thuốc khác và làm vỡ vỏ vi khuẩn.",
        target_enzymes: "Arabinosyl transferase (mã hóa bởi gen embB)"
      },
      pk_pd: {
        absorption: "Hấp thu tốt qua đường tiêu hóa (~ 75 - 80% sinh khả dụng). Thức ăn không ảnh hưởng đáng kể đến độ hấp thu.",
        distribution: "Phân bố rộng khắp các cơ quan và mô phổi, hồng cầu. Thâm nhập dịch não tủy (CSF) KÉM KHI MÀNG NÃO BÌNH THƯỜNG (~ 2-5%), nhưng tăng lên khoảng 10 - 50% khi màng não có tình trạng viêm cấp tính.",
        protein_binding: "Thấp (20 - 30%).",
        metabolism: "Khoảng 15 - 20% được chuyển hóa ở gan qua enzyme alcohol và aldehyde dehydrogenase thành chất dẫn xuất acid dicarboxylic không hoạt tính.",
        elimination: "ĐÀO THẢI CHỦ YẾU QUA THẬN: Khoảng 50 - 70% liều dùng được thải trừ nguyên vẹn qua nước tiểu bằng cơ chế lọc cầu thận và bài tiết ống thận trong 24 giờ. Khoảng 20% thải qua phân.",
        pk_pd_index: "AUC0-24/MIC hoặc Cmax/MIC. Nồng độ đỉnh Cmax mục tiêu 2 - 6 mcg/ml."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Kìm khuẩn là chính ở nồng độ điều trị thông thường; có hoạt tính diệt khuẩn yếu ở nồng độ cao.",
        sterilizing_activity: "Rất thấp. Vai trò chủ chốt của Ethambutol trong phác đồ tấn công là PHÒNG NGỪA SỰ PHÁT SINH BIẾN CHỦNG KHÁNG THUỐC ĐỐI VỚI RIFAMPICIN VÀ ISONIAZID khi mật độ vi khuẩn ban đầu còn rất lớn."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến chủ yếu xảy ra trên gen embB, tập trung cao nhất tại codon 306 (đột biến EmbB Met306Val / Met306Ile / Met306Leu), chiếm khoảng 50-70% các chủng đề kháng Ethambutol lâm sàng; tiếp theo là codon embB 406 và 497.",
        natural_mutation_rate: "10^-5 đến 10^-7."
      },
      dosage_v10: {
        adult: "15 mg/kg/ngày (khoảng 15 - 20 mg/kg). Liều tối đa: 1200 mg/ngày (hoặc theo cân nặng: 30-39kg: 550mg; 40-54kg: 825mg; 55-70kg: 1100mg; >70kg: 1375mg trong viên 4 FDC).",
        child: "20 mg/kg/ngày (khoảng 15 - 25 mg/kg). Liều tối đa: 1200 mg/ngày.",
        fixed_dose_combination: "Có trong viên 4 FDC (275 mg E/viên)."
      },
      special_adjustments: {
        renal: "TÍCH LŨY MẠNH KHI SUY THẬN (nguy cơ ngộ độc thị thần kinh tăng vọt): Khi CrCl < 30 ml/min hoặc lọc máu: GIẢM TẦN SUẤT XUỐNG 15 - 25 mg/kg x 3 LẦN/TUẦN (uống cách ngày, sau lọc máu). Tuyệt đối không dùng hàng ngày.",
        hepatic: "Không phụ thuộc chuyển hóa gan, rất an toàn khi có bệnh gan nền.",
        pregnancy_lactation: "An toàn trong thai kỳ và thời kỳ cho con bú (nhóm A theo WHO, không ghi nhận dị tật thị giác ở thai nhi)."
      },
      adr_monitoring: {
        common: "Đau đầu, rối loạn cảm giác nhẹ, tăng nhẹ acid uric máu thứ phát do giảm bài tiết ống thận.",
        severe: "VIÊM DÂY THẦN KINH THỊ GIÁC HẬU NHÃN CẦU (Retrobulbar optic neuritis): Giảm thị lực, mờ mắt, mất khả năng phân biệt màu SẮC ĐỎ - XANH LÁ CÂY (red-green color blindness), thu hẹp thị trường. Tác dụng phụ này phụ thuộc liều và thời gian dùng. Cần ngừng ngay lập tức khi phát hiện; phần lớn sẽ hồi phục nếu phát hiện sớm.",
        monitoring: "Kiểm tra thị lực (bảng Snellen) và kiểm tra thị giác màu sắc (bảng màu Ishihara) trước khi bắt đầu và định kỳ hàng tháng. Dặn bệnh nhân ngừng ngay thuốc và báo bác sĩ nếu thấy mắt mờ."
      },
      drug_interactions: {
        details: "Antacid chứa hydroxyd nhôm làm chậm và giảm hấp thu Ethambutol (uống cách xa ít nhất 2 giờ)."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 51, Phụ lục 6 (Trang 196), Phụ lục 7 (Bảng 5), Phụ lục 10",
      citations: [
        { title: "NIH / PubMed: Ethambutol and its ocular toxicities", url: "https://pubmed.ncbi.nlm.nih.gov/22998396/" },
        { title: "PubChem: Ethambutol Compound Summary (CID 14052)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Ethambutol" }
      ]
    },
    {
      id: "Bdq",
      code: "Bdq",
      name: "Bedaquiline (TMC207)",
      group: "Hàng 2 - Nhóm A (Thuốc ưu tiên hàng đầu cho Lao kháng thuốc)",
      class: "Nhóm Diarylquinoline ức chế đặc hiệu ATP Synthase vi khuẩn",
      molecular_target: {
        description: "Ức chế sinh tổng hợp năng lượng ATP của vi khuẩn lao thông qua enzyme Mycobacterial ATP Synthase.",
        mechanism: "Bedaquiline gắn kết đặc hiệu cao vào tiểu đơn vị c (subunit c) của phức hợp màng F0 trong enzyme F0F1 ATP synthase của Mycobacterium (được mã hóa bởi gen atpE). Sự gắn kết này chẹn kênh proton quay, ngăn chặn dòng proton điều khiển phản ứng tổng hợp ATP từ ADP và phosphat vô cơ, làm cạn kiệt nguồn năng lượng dự trữ nội bào và gây chết vi khuẩn lao kể cả ở thể tiềm ẩn / chuyển hóa chậm. Bedaquiline có độ chọn lọc cao gấp hơn 20.000 lần đối với ATP synthase vi khuẩn so với enzyme của ty thể người.",
        target_enzymes: "Subunit c của phức hợp ATP Synthase vi khuẩn (mã hóa bởi gen atpE)"
      },
      pk_pd: {
        absorption: "Sinh khả dụng đường uống tăng gấp đôi (2x) khi dùng cùng bữa ăn giàu chất béo. Bắt buộc phải uống cùng thức ăn.",
        distribution: "Thân dầu cực cao, thể tích phân bố cực lớn (Vd > 10.000 L). Thâm nhập sâu và tích lũy nồng độ cực cao trong mô phổi, u hạt và đại thực bào. Thâm nhập CSF kém.",
        protein_binding: "Cực cao (> 99.9%).",
        metabolism: "Chuyển hóa chủ yếu qua gan bởi enzyme Cytochrome P450 3A4 (CYP3A4) tạo thành chất chuyển hóa N-monodesmethyl (M2) có hoạt tính kháng khuẩn yếu hơn 4-6 lần nhưng có thể làm kéo dài khoảng QT tương đương.",
        elimination: "Thải trừ chủ yếu qua phân; đào thải qua thận < 0.001%. Thời gian bán thải pha cuối (Terminal elimination half-life T1/2) KÉO DÀI TỚI 5.5 THÁNG (do thuốc giải phóng rất chậm từ các mô dự trữ).",
        pk_pd_index: "AUC/MIC. Thuốc diệt khuẩn phụ thuộc thời gian và nồng độ tích lũy."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Khởi phát chậm trong 3-4 ngày đầu do vi khuẩn cần thời gian cạn kiệt nguồn dự trữ năng lượng ATP nội bào; sau ngày thứ 4, hoạt tính diệt khuẩn bộc lộ rất mạnh mẽ.",
        sterilizing_activity: "CỰC MẠNH TRÊN VI KHUẨN THỂ NGỦ VÀ LAO ĐA KHÁNG. Đóng vai trò hạt nhân giúp rút ngắn thời gian điều trị phác đồ BPaLM / BPaL xuống 6 tháng."
      },
      resistance_genetics: {
        primary_mutations: "1) Đột biến gen atpE (vị trí A63P hoặc I66M): gây kháng đặc hiệu mức độ cao với Bedaquiline.\n2) Đột biến gen điều hòa phiên mã mmpR5 (còn gọi là Rv0678): làm tăng biểu hiện của bơm tống thuốc đa cơ chất MmpS5-MmpL5 efflux pump, dẫn tới KHÁNG CHÉO giữa Bedaquiline và Clofazimine.",
        natural_mutation_rate: "10^-7 đến 10^-8."
      },
      dosage_v10: {
        adult: "Phác đồ chuẩn 24 tuần: 2 tuần đầu uống 400 mg x 1 lần/ngày; 22 tuần tiếp theo uống 200 mg x 3 lần/tuần (cách nhau ít nhất 48 giờ, ví dụ Thứ 2, 4, 6). Uống cùng bữa ăn. Trong phác đồ BPaLM 6 tháng: Dùng suốt liệu trình 26 tuần.",
        child: "Xem Bảng liều theo nhóm tuổi và cân nặng (Phụ lục 6).",
        fixed_dose_combination: "Viên nén 100 mg hoặc 20 mg phân tán."
      },
      special_adjustments: {
        renal: "Không cần chỉnh liều ở bệnh nhân suy thận nhẹ, vừa hoặc nặng (do bài tiết qua thận không đáng kể). Thận trọng theo dõi điện giải khi lọc máu.",
        hepatic: "Không cần chỉnh liều ở suy gan nhẹ đến vừa (Child-Pugh A, B). Chưa có dữ liệu trên suy gan nặng (Child-Pugh C) -> cân nhắc lợi ích/nguy cơ.",
        pregnancy_lactation: "Dữ liệu WHO khuyến cáo có thể sử dụng cho phụ nữ mang thai khi mắc lao đa kháng thuốc sau khi hội chẩn chuyên môn."
      },
      adr_monitoring: {
        common: "Buồn nôn, đau đầu, đau khớp, tăng nhẹ men gan transaminase.",
        severe: "KÉO DÀI KHOẢNG QT TRÊN ĐIỆN TÂM ĐỒ (QTc prolongation, xoắn đỉnh Torsades de Pointes): Tăng nguy cơ rõ rệt khi phối hợp với Clofazimine, Fluoroquinolone (Moxifloxacin, Levofloxacin), Delamanid hoặc khi có hạ kali/magie máu.",
        monitoring: "BẮT BUỘC đo ECG ghi nhận QTc trước khi điều trị, sau 2, 4, 8, 12, 16, 20 và 24 tuần. Xét nghiệm Điện giải đồ (K+, Mg++, Ca++) định kỳ. Nếu QTc > 500 ms: cần tạm ngừng hoặc hội chẩn điều chỉnh thuốc."
      },
      drug_interactions: {
        details: "CHỐNG CHỈ ĐỊNH DÙNG CÙNG CÁC CHẤT CẢM ỨNG CYP3A4 MẠNH (như Rifampicin, Rifapentine, Efavirenz, Phenytoin, Carbamazepine): làm giảm nồng độ Bedaquiline trong máu tới 50-80%, dẫn tới thất bại điều trị và phát sinh kháng thuốc. Thận trọng khi dùng cùng các thuốc ức chế CYP3A4 mạnh (Ketoconazole, Clarithromycin, Lopinavir/r) vì làm tăng nồng độ và độc tính của Bdq."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 48 (Sơ đồ 6 Phác đồ BPaLM), Trang 65 (Bảng 5 Chống chỉ định & Thận trọng), Phụ lục 6 (Trang 201-202 Bảng 10)",
      citations: [
        { title: "NIH / PubMed: Bedaquiline - A review in multi-drug resistant tuberculosis", url: "https://pubmed.ncbi.nlm.nih.gov/24430752/" },
        { title: "WHO: Rapid communication on the 6-month treatment regimens for drug-resistant TB", url: "https://www.who.int/publications/i/item/9789240048126" },
        { title: "PubChem: Bedaquiline (CID 5460011)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Bedaquiline" }
      ]
    },
    {
      id: "Lzd",
      code: "Lzd",
      name: "Linezolid",
      group: "Hàng 2 - Nhóm A (Thuốc ưu tiên hàng đầu cho Lao kháng thuốc)",
      class: "Nhóm Oxazolidinone ức chế sinh tổng hợp protein ribosome",
      molecular_target: {
        description: "Ức chế giai đoạn khởi đầu của quá trình dịch mã protein tại ribosome 70S của vi khuẩn.",
        mechanism: "Linezolid gắn kết vào vị trí P (peptidyl transferase center) trên tiểu đơn vị ribosome 50S (đặc biệt là domain V của 23S rRNA), ngăn cản sự hình thành phức hợp khởi đầu dịch mã chức năng 70S (70S initiation complex) giữa 50S, 30S, mRNA và fMet-tRNA. Nhờ cơ chế hoàn toàn độc đáo này, Linezolid không bị kháng chéo với các kháng sinh ức chế tổng hợp protein khác (Aminoglycoside, Macrolide, Tetracycline). Tuy nhiên, vì ribosome ty thể của người có cấu trúc tương đồng với ribosome vi khuẩn, Linezolid ức chế kéo dài quá trình tổng hợp protein của ty thể người, gây độc tính ức chế tủy xương và viêm dây thần kinh.",
        target_enzymes: "Domain V của 23S rRNA trong tiểu đơn vị 50S ribosome"
      },
      pk_pd: {
        absorption: "Hấp thu đường uống 100% (sinh khả dụng ~ 100%, không bị ảnh hưởng bởi thức ăn). Có thể chuyển đổi 1:1 giữa đường uống và truyền tĩnh mạch.",
        distribution: "Phân bố tốt vào tất cả các mô (Vd ~ 40 - 50 L). THÂM NHẬP TUYỆT VỜI VÀO DỊCH NÃO TỦY (CSF): Nồng độ CSF đạt 70 - 100% nồng độ huyết tương, là lựa chọn số một cho lao màng não kháng thuốc.",
        protein_binding: "Thấp (~ 31%).",
        metabolism: "Chuyển hóa không qua enzym cytochrome P450 mà qua quá trình oxy hóa không enzyme tại gan tạo ra hai chất chuyển hóa acid hydroxyethylidene axetic và aminoethoxy axetic không có hoạt tính.",
        elimination: "Khoảng 65% bài tiết qua nước tiểu (trong đó 30% dạng nguyên vẹn, 35% chất chuyển hóa); 10% qua phân.",
        pk_pd_index: "AUC0-24/MIC và % thời gian vượt quá MIC (T > MIC)."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Khởi phát diệt khuẩn tốt trên trực khuẩn kháng thuốc.",
        sterilizing_activity: "Hoạt tính tiệt khuẩn rất cao trong phác đồ phối hợp BPaLM. Giúp xóa sạch vi khuẩn lao kháng thuốc thể tiềm ẩn."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến điểm tại gen 23S rRNA (phổ biến nhất G2576T hoặc G2061T) hoặc đột biến trên gen mã hóa protein ribosome L3/L4 (gen rplC và rplD). Tần suất phát sinh đột biến thấp.",
        natural_mutation_rate: "10^-9 đến 10^-11."
      },
      dosage_v10: {
        adult: "Trong phác đồ BPaLM/BPaL 6 tháng: 600 mg x 1 lần/ngày. Nếu có độc tính (ức chế tủy, viêm thần kinh ngoại biên), giảm xuống 300 mg/ngày hoặc tạm ngừng. Trong phác đồ dài ngày: 600 mg/ngày, sau đó có thể giảm 300 mg/ngày để duy trì an toàn.",
        child: "10 - 12 mg/kg x 1 lần/ngày (tối đa 600 mg/ngày).",
        fixed_dose_combination: "Viên nén 600 mg."
      },
      special_adjustments: {
        renal: "Không cần chỉnh liều ở bệnh nhân suy thận kể cả CrCl < 30 ml/min. Chạy thận nhân tạo đào thải khoảng 30% liều dùng, nên uống thuốc SAU KHI KẾT THÚC buổi lọc máu.",
        hepatic: "Không cần chỉnh liều ở suy gan nhẹ đến vừa.",
        pregnancy_lactation: "Nhóm C theo phân loại FDA. Cân nhắc lợi ích cứu sống người mẹ trong điều trị lao kháng thuốc nặng."
      },
      adr_monitoring: {
        common: "Buồn nôn, tiêu chảy, đau đầu, tăng men gan nhẹ.",
        severe: "ĐỘC TÍNH ỨC CHẾ TỦY XƯƠNG PHỤ THUỘC THỜI GIAN (Thường sau 4-8 tuần): Giảm tiểu cầu (thường gặp nhất), thiếu máu bất sản, giảm bạch cầu đa nhân trung tính.\nVIÊM DÂY THẦN KINH NGOẠI BIÊN & VIÊM THẦN KINH THỊ GIÁC (Thường xuất hiện khi dùng kéo dài > 3-6 tháng, có thể không hồi phục hoàn toàn nếu chậm phát hiện).\nNhiễm toan lactic (Lactic acidosis - do ức chế chuỗi hô hấp tế bào ty thể).",
        monitoring: "TỔNG PHÂN TÍCH TẾ BÀO MÁU NGOẠI VI (CBC) 2 tuần/lần trong 2 tháng đầu, sau đó hàng tháng. Khám cảm giác chi và thị lực định kỳ. Bổ sung Pyridoxine (B6) 50-100 mg/ngày có thể hỗ trợ giảm nguy cơ độc tủy."
      },
      drug_interactions: {
        details: "Linezolid là chất ức chế men Monoamine Oxidase (MAO) không chọn lọc, có hồi phục: Nguy cơ HỘI CHỨNG SEROTONIN khi dùng đồng thời với thuốc chống trầm cảm SSRI (Fluoxetine, Sertraline), SNRI, TCA, hoặc Pethidine/Tramadol. Nguy cơ tăng vọt huyết áp khi ăn thực phẩm giàu tyramine (phô mai ủ, men bia)."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 48, Phụ lục 6 (Trang 201 Bảng 10), Phụ lục 10",
      citations: [
        { title: "NIH / PubMed: Linezolid for the treatment of drug-resistant tuberculosis", url: "https://pubmed.ncbi.nlm.nih.gov/31804797/" },
        { title: "PubChem: Linezolid (CID 441401)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Linezolid" }
      ]
    },
    {
      id: "FQs",
      code: "Lfx / Mfx",
      name: "Fluoroquinolones (Levofloxacin / Moxifloxacin)",
      group: "Hàng 2 - Nhóm A (Thuốc ưu tiên hàng đầu)",
      class: "Kháng sinh nhóm Fluoroquinolone thế hệ mới ức chế DNA Gyrase",
      molecular_target: {
        description: "Ức chế enzyme DNA Topoisomerase II (DNA Gyrase) của trực khuẩn lao.",
        mechanism: "DNA Gyrase của vi khuẩn lao là một tetramer gồm 2 tiểu đơn vị GyrA và 2 tiểu đơn vị GyrB (mã hóa bởi gen gyrA và gyrB), chịu trách nhiệm tạo cấu trúc siêu xoắn âm (negative supercoiling) của DNA cần thiết cho sự nhân đôi, phiên mã và sửa chữa DNA. Fluoroquinolone ổn định phức hợp enzyme-DNA bị cắt đứt tạm thời, ngăn không cho hàn gắn lại chuỗi DNA kép, dẫn tới đứt gãy DNA hàng loạt và kích hoạt con đường chết theo chương trình của vi khuẩn.",
        target_enzymes: "Tiểu đơn vị GyrA và GyrB của DNA Gyrase"
      },
      pk_pd: {
        absorption: "Hấp thu đường uống cực nhanh (sinh khả dụng > 90-99%). Bị giảm hấp thu nghiêm trọng bởi các cation đa hóa trị (nhôm, magie, sắt, canxi).",
        distribution: "Phân bố rộng vào nhu mô phổi, phế nang và dịch lót biểu mô (nồng độ trong mô phổi cao gấp 2-5 lần huyết tương). Moxifloxacin thâm nhập CSF tốt (50-80%), Levofloxacin thâm nhập CSF trung bình-tốt (30-60%).",
        protein_binding: "Levofloxacin ~ 25-30%; Moxifloxacin ~ 30-50%.",
        metabolism: "Levofloxacin hầu như không chuyển hóa (< 5%). Moxifloxacin chuyển hóa qua liên hợp glucuronide và sulfat ở gan, không qua hệ enzyme CYP450.",
        elimination: "Levofloxacin đào thải > 80% nguyên vẹn qua nước tiểu (bài tiết ống thận). Moxifloxacin đào thải qua phân (~ 45%) và nước tiểu (~ 20% dạng nguyên vẹn).",
        pk_pd_index: "AUC0-24/MIC và Cmax/MIC. Tỷ lệ AUC/MIC > 100-125 tương quan với hiệu quả diệt khuẩn và ngăn ngừa đột biến kháng."
      },
      bacterial_activity: {
        early_bactericidal_activity: "EBA rất cao, tương đương với Isoniazid đối với các chủng nhạy cảm.",
        sterilizing_activity: "Moxifloxacin có hoạt tính tiệt khuẩn cao hơn Levofloxacin. Moxifloxacin là trụ cột trong phác đồ 4 tháng (2HPMZ/2HPM) và phác đồ BPaLM cho lao kháng thuốc."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến trong vùng QRDR (Quinolone Resistance-Determining Region) của gen gyrA, hay gặp nhất tại codon 90 (A90V) và codon 94 (D94G, D94A, D94N, D94Y); hiếm gặp hơn trên gen gyrB (codon 500, 538). Đột biến này gây kháng chéo toàn bộ nhóm Quinolone (định nghĩa Tiền siêu kháng - Pre-XDR).",
        natural_mutation_rate: "10^-7 đến 10^-8."
      },
      dosage_v10: {
        adult: "Levofloxacin: 750 - 1000 mg/ngày uống 1 lần (cân nặng < 50kg: 750mg; >= 50kg: 1000mg).\nMoxifloxacin: 400 mg/ngày uống 1 lần.",
        child: "Levofloxacin: 15 - 20 mg/kg/ngày (tối đa 1000 mg/ngày).\nMoxifloxacin: 10 - 15 mg/kg/ngày (tối đa 400 mg/ngày).",
        fixed_dose_combination: "Viên nén 500 mg, 750 mg (Lfx); 400 mg (Mfx)."
      },
      special_adjustments: {
        renal: "Levofloxacin: BẮT BUỘC CHỈNH LIỀU KHI SUY THẬN vì bài tiết qua thận. CrCl 20-49 ml/min: 500-750 mg mỗi 48h; CrCl < 20 ml/min hoặc lọc máu: 500-750 mg x 3 lần/tuần.\nMoxifloxacin: KHÔNG CẦN CHỈNH LIỀU ở mọi mức độ suy thận.",
        hepatic: "Levofloxacin không ảnh hưởng bởi suy gan. Moxifloxacin thận trọng trong suy gan nặng Child-Pugh C.",
        pregnancy_lactation: "Nhóm C. Ưu tiên sử dụng khi cần thiết trong phác đồ lao đa kháng (lợi ích vượt trội nguy cơ lý thuyết trên sụn khớp)."
      },
      adr_monitoring: {
        common: "Buồn nôn, chóng mặt, đau đầu, tiêu chảy nhẹ.",
        severe: "KÉO DÀI KHOẢNG QT (Moxifloxacin > Levofloxacin): Nguy cơ xoắn đỉnh khi dùng kèm Bedaquiline hoặc Clofazimine.\nViêm gân và đứt gân gót (Achilles tendon rupture - đặc biệt ở người cao tuổi, vận động nặng hoặc dùng kèm Corticosteroid).\nRối loạn tâm thần kinh (ảo giác, trầm cảm, co giật).\nRối loạn đường huyết (hạ đường huyết nặng hoặc tăng đường huyết).",
        monitoring: "Điện tâm đồ (ECG) theo dõi QTc; kiểm tra đau căng gân gót; đường huyết ở bệnh nhân đái tháo đường."
      },
      drug_interactions: {
        details: "Tương tác tạo chelate không tan với Antacid chứa Al/Mg, viên sắt, canxi, kẽm, sucralfate (uống cách xa ít nhất 2 giờ trước hoặc 4 giờ sau). Moxifloxacin kéo dài hiệp đồng QT khi phối hợp thuốc chống loạn thần, thuốc chống loạn nhịp tim."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 48, 51, 52 (Phác đồ A1a), Phụ lục 6 (Trang 201 Bảng 10), Phụ lục 7 (Bảng 5 điều chỉnh suy thận Lfx)",
      citations: [
        { title: "NIH / PubMed: Role of fluoroquinolones in tuberculosis treatment", url: "https://pubmed.ncbi.nlm.nih.gov/22422775/" },
        { title: "WHO: Guidelines for the treatment of drug-resistant tuberculosis", url: "https://www.who.int/publications/i/item/9789240007048" }
      ]
    },
    {
      id: "Cfz",
      code: "Cfz",
      name: "Clofazimine",
      group: "Hàng 2 - Nhóm B (Thuốc lựa chọn thứ hai)",
      class: "Nhóm Riminophenazine diệt khuẩn qua stress oxy hóa",
      molecular_target: {
        description: "Tạo các gốc oxy hóa phản ứng (ROS) và gây độc phospholipid màng vi khuẩn.",
        mechanism: "Clofazimine bị khử bởi enzyme NADH dehydrogenase (NDH-2) trong chuỗi chuyền điện tử hô hấp của vi khuẩn lao. Khi tái oxy hóa tự phát bởi oxy phân tử, Clofazimine tạo ra một lượng lớn gốc oxy hóa phản ứng (reactive oxygen species - ROS như superoxide O2-, H2O2), gây tổn thương oxy hóa nghiêm trọng màng tế bào, DNA và enzyme vi khuẩn. Ngoài ra thuốc còn ức chế phospholipase A2 và làm biến đổi tính thấm màng tế bào.",
        target_enzymes: "NADH dehydrogenase chuỗi hô hấp tế bào"
      },
      pk_pd: {
        absorption: "Hấp thu đường uống chậm và không hoàn toàn (~ 45 - 70%). Sinh khả dụng tăng đáng kể khi dùng cùng bữa ăn có chất béo.",
        distribution: "Thân dầu cực kỳ mạnh mẽ. Tích lũy nồng độ cực cao trong hệ võng nội mô, mỡ dưới da, tế bào đại thực bào và u hạt mô liên kết. Thâm nhập CSF kém.",
        protein_binding: "Cao (~ 85%).",
        metabolism: "Chuyển hóa rất chậm ở gan thành các chất chuyển hóa glucuronide không đáng kể.",
        elimination: "Bài tiết cực kỳ chậm: Thời gian bán thải T1/2 kéo dài khoảng 70 NGÀY (khoảng 2-3 tháng). Thải chủ yếu qua phân và mật; thải qua thận dạng nguyên vẹn rất ít.",
        pk_pd_index: "AUC/MIC phụ thuộc nồng độ tích lũy dài hạn."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Khởi phát tác dụng chậm, EBA thấp trong những ngày đầu.",
        sterilizing_activity: "Hoạt tính tiệt khuẩn tốt khi đã đạt nồng độ tích lũy mô ổn định sau 3-4 tuần. Rất hữu hiệu trong việc ngăn ngừa tái phát ở phác đồ điều trị lao đa kháng ngắn ngày."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến gen Rv0678 (mmpR5) làm tăng hoạt động của bơm tống thuốc MmpS5-MmpL5, gây đề kháng và KHÁNG CHÉO VỚI BEDAQUILINE.",
        natural_mutation_rate: "10^-7."
      },
      dosage_v10: {
        adult: "100 mg x 1 lần/ngày. Uống cùng thức ăn hoặc sữa để tăng hấp thu và giảm kích ứng dạ dày.",
        child: "2 - 5 mg/kg/ngày (tối đa 100 mg/ngày).",
        fixed_dose_combination: "Viên nang mềm 50 mg, 100 mg."
      },
      special_adjustments: {
        renal: "Không cần chỉnh liều ở bệnh nhân suy thận kể cả chạy thận nhân tạo.",
        hepatic: "Thận trọng ở bệnh nhân suy gan nặng.",
        pregnancy_lactation: "Nhóm C. Thuốc qua được nhau thai và bài tiết qua sữa mẹ (có thể làm da trẻ có màu nâu đỏ thoáng qua)."
      },
      adr_monitoring: {
        common: "ĐỔI MÀU DA VÀ MẮT (Skin discoloration): Da chuyển sang màu nâu đỏ, sạm da do tinh thể thuốc lắng đọng ở lớp mỡ dưới da (gặp ở 75-100% bệnh nhân, cần tư vấn kỹ rằng màu da sẽ mờ dần sau khi ngừng thuốc 6-12 tháng). Khô da, ngứa da. Rối loạn tiêu hóa (đầy bụng, buồn nôn).",
        severe: "KÉO DÀI KHOẢNG QTc TRÊN ECG (Nguy cơ tăng vọt khi dùng đồng thời với Bedaquiline hoặc Moxifloxacin).\nLắng đọng tinh thể trong ruột non và mạc treo gây hội chứng giả tắc ruột, đau bụng mạn tính, xuất huyết tiêu hóa (hiếm gặp khi dùng kéo dài).",
        monitoring: "ECG định kỳ theo dõi QTc. Hỗ trợ tâm lý người bệnh về sự đổi màu da."
      },
      drug_interactions: {
        details: "Hiệp đồng kéo dài khoảng QT với Bedaquiline, Moxifloxacin, Delamanid. Có thể làm giảm hấp thu Rifampicin nếu uống đồng thời."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 48, Phụ lục 6 (Trang 201 Bảng 10), Phụ lục 10",
      citations: [
        { title: "NIH / PubMed: Clofazimine for the treatment of drug-resistant tuberculosis", url: "https://pubmed.ncbi.nlm.nih.gov/28587127/" },
        { title: "PubChem: Clofazimine (CID 2794)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Clofazimine" }
      ]
    },
    {
      id: "Cs",
      code: "Cs / Trd",
      name: "Cycloserine / Terizidone",
      group: "Hàng 2 - Nhóm B (Thuốc lựa chọn thứ hai)",
      class: "Kháng sinh tương đồng D-alanine ức chế tổng hợp vỏ peptidoglycan",
      molecular_target: {
        description: "Ức chế cạnh tranh các enzyme liên kết cầu nối peptidoglycan của thành tế bào vi khuẩn.",
        mechanism: "Cycloserine là chất đồng đẳng cấu trúc lập thể của D-alanine. Thuốc ức chế cạnh tranh thuận nghịch hai enzyme trọng yếu trong giai đoạn đầu tổng hợp peptidoglycan của vi khuẩn lao: D-alanine racemase (chuyển đổi L-alanine thành D-alanine) và D-alanyl-D-alanine ligase (gắn hai phân tử D-alanine lại với nhau). Sự thiếu hụt pentapeptide làm cho thành tế bào vi khuẩn bị khiếm khuyết nghiêm trọng và dễ vỡ dưới áp lực thẩm thấu.",
        target_enzymes: "D-alanine racemase (Alr) & D-alanine:D-alanine ligase (Ddl)"
      },
      pk_pd: {
        absorption: "Hấp thu đường uống nhanh và gần như hoàn toàn (sinh khả dụng ~ 70-90%).",
        distribution: "Phân bố đều khắp các mô cơ thể. THÂM NHẬP DỊCH NÃO TỦY (CSF) RẤT TỐT: Nồng độ CSF đạt 80 - 100% nồng độ huyết tương, vượt qua hàng rào máu não dễ dàng.",
        protein_binding: "Rất thấp (< 20%).",
        metabolism: "Khoảng 30-40% được chuyển hóa ở gan thành các chất chuyển hóa không hoạt tính.",
        elimination: "ĐÀO THẢI CHỦ YẾU QUA NƯỚC TIỂU: 60-70% liều dùng được thải trừ nguyên vẹn qua lọc cầu thận.",
        pk_pd_index: "Cmax/MIC và AUC/MIC. Duy trì nồng độ đỉnh huyết thanh trong khoảng 20 - 35 mcg/ml (tránh vượt quá 35 mcg/ml vì tăng độc tính thần kinh)."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Tác dụng kìm khuẩn là chủ yếu.",
        sterilizing_activity: "Thấp. Sử dụng như một thuốc bảo vệ phác đồ phối hợp trong điều trị lao đa kháng."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến gen alr (tăng biểu hiện D-alanine racemase) hoặc ald (alanine dehydrogenase).",
        natural_mutation_rate: "10^-6 đến 10^-7."
      },
      dosage_v10: {
        adult: "10 - 15 mg/kg/ngày (thường dùng 500 - 750 mg/ngày, chia làm 2 lần sáng - tối để tránh đỉnh nồng độ quá cao gây độc thần kinh). BẮT BUỘC bổ sung Pyridoxine (B6) 100 - 200 mg/ngày.",
        child: "10 - 20 mg/kg/ngày (tối đa 1000 mg/ngày).",
        fixed_dose_combination: "Viên nang 250 mg."
      },
      special_adjustments: {
        renal: "TÍCH LŨY MẠNH KHI SUY THẬN GÂY NGỘ ĐỘC TÂM THẦN: CrCl < 30 ml/min: giảm liều xuống 250 mg/ngày hoặc 500 mg x 3 lần/tuần sau lọc máu.",
        hepatic: "Thận trọng ở bệnh nhân có bệnh gan tiến triển.",
        pregnancy_lactation: "Nhóm C. Thuốc qua hàng rào rau thai và sữa mẹ."
      },
      adr_monitoring: {
        common: "Đau đầu, chóng mặt, buồn ngủ, run tay nhẹ.",
        severe: "ĐỘC TÍNH NẶNG NỀ TRÊN HỆ THẦN KINH TRUNG ƯƠNG & TÂM THẦN: Trầm cảm nặng, có ý tưởng và hành vi tự sát, lo âu cấp tính, loạn thần cấp (hoang tưởng, ảo giác), co giật động kinh. Chống chỉ định cho bệnh nhân có tiền sử động kinh, rối loạn tâm thần nặng hoặc trầm cảm.",
        monitoring: "Đánh giá trạng thái tâm thần kinh hàng tháng. Bổ sung Pyridoxine (Vitamin B6) liều cao 100-200 mg/ngày để làm giảm nguy cơ độc thần kinh."
      },
      drug_interactions: {
        details: "Dùng chung với rượu làm tăng nguy cơ co giật. Dùng cùng INH và Ethionamide làm tăng độc tính trên hệ thần kinh trung ương."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 48, Phụ lục 6 (Trang 201), Phụ lục 7 (Bảng 5), Phụ lục 10",
      citations: [
        { title: "NIH / PubMed: Cycloserine for the treatment of multidrug-resistant tuberculosis", url: "https://pubmed.ncbi.nlm.nih.gov/30521689/" },
        { title: "PubChem: Cycloserine (CID 6234)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Cycloserine" }
      ]
    },
    {
      id: "Pa",
      code: "Pa",
      name: "Pretomanid (PA-824)",
      group: "Hàng 2 - Nhóm C & Thuốc mới mang tính cách mạng",
      class: "Dẫn xuất Nitroimidazooxazine diệt khuẩn kép",
      molecular_target: {
        description: "Cơ chế tác động kép: ức chế tổng hợp acid mycolic (ở vi khuẩn nhân lên) và gây cạn kiệt năng lượng ATP qua giải phóng oxit nitric (ở vi khuẩn thể ngủ).",
        mechanism: "Pretomanid là tiền dược. Trong vi khuẩn lao, enzyme nitroreductase Ddn (phụ thuộc deazaflavin cofactor F420) khử nhóm nitro của Pretomanid, giải phóng các chất trung gian phản ứng sinh ra Nitric Oxide (NO) hoạt tính cao. Ở điều kiện hiếu khí phân chia nhanh: Thuốc ức chế quá trình oxy hóa hydroxymycolate thành ketomycolate, chặn đứng con đường hoàn thiện vỏ acid mycolic. Ở điều kiện kỵ khí/thể ngủ: Các gốc NO làm tê liệt chuỗi chuyền điện tử hô hấp và tiêu tán gradient proton, làm cạn kiệt nguồn năng lượng ATP nội bào của vi khuẩn.",
        target_enzymes: "Nitroreductase Ddn & cofactor F420 (hoạt hóa tiền dược)"
      },
      pk_pd: {
        absorption: "Hấp thu tốt khi uống cùng thức ăn (sinh khả dụng tăng rõ rệt so với lúc đói).",
        distribution: "Phân bố rộng vào các mô phổi và hang lao. Thể tích phân bố lớn (Vd ~ 180 L).",
        protein_binding: "~ 86%.",
        metabolism: "Chuyển hóa rộng rãi qua gan thông qua nhiều con đường oxy hóa (CYP3A4 tham gia khoảng 20%) và chuyển hóa không qua CYP.",
        elimination: "Thời gian bán thải T1/2 khoảng 16 - 18 giờ (cho phép uống 1 lần/ngày). Đào thải khoảng 53% qua nước tiểu và 38% qua phân.",
        pk_pd_index: "AUC0-24/MIC."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Khởi phát diệt khuẩn tốt trên cả vi khuẩn nhạy cảm và vi khuẩn kháng thuốc.",
        sterilizing_activity: "CỰC KỲ MẠNH MẼ TRÊN THỂ NGỦ KỴ KHÍ. Phối hợp hiệp đồng hoàn hảo với Bedaquiline và Linezolid (phác đồ BPaL / BPaLM) tạo nên bước đột phá điều trị khỏi lao kháng thuốc trong 6 tháng."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến trên 5 gen thuộc hệ thống sinh tổng hợp cofactor F420 và enzyme Ddn: ddn, fgd1, fbiA, fbiB, fbiC. Có thể gây kháng chéo một phần với Delamanid.",
        natural_mutation_rate: "10^-6 đến 10^-7."
      },
      dosage_v10: {
        adult: "200 mg x 1 lần/ngày trong 26 tuần (uống cùng bữa ăn, phối hợp cùng Bedaquiline + Linezolid ± Moxifloxacin).",
        child: "Chưa có chỉ định rộng rãi cho trẻ nhỏ; áp dụng cho người lớn và trẻ vị thành niên từ 14-15 tuổi trở lên theo khuyến cáo WHO/Bộ Y Tế.",
        fixed_dose_combination: "Viên nén 200 mg."
      },
      special_adjustments: {
        renal: "Không cần chỉnh liều ở bệnh nhân suy thận.",
        hepatic: "Thận trọng ở bệnh nhân suy gan, theo dõi men gan thường xuyên.",
        pregnancy_lactation: "Dữ liệu trên người còn hạn chế. Cần cân nhắc hội chẩn kỹ lưỡng."
      },
      adr_monitoring: {
        common: "Buồn nôn, nôn, đau đầu, khó tiêu, tăng men gan.",
        severe: "Độc tính trên gan (tăng transaminase), nguy cơ kéo dài QTc khi dùng phối hợp trong phác đồ BPaLM.",
        monitoring: "Men gan định kỳ (2 tuần/lần trong 2 tháng đầu, sau đó hàng tháng), ECG theo dõi QTc."
      },
      drug_interactions: {
        details: "Tránh dùng cùng các chất cảm ứng CYP3A4 mạnh (như Efavirenz, Rifampicin, Carbamazepine) vì làm giảm nồng độ Pretomanid. Tránh dùng cùng các thuốc ức chế CYP3A4 mạnh kéo dài."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 48 (Sơ đồ 6 Phác đồ BPaLM), Trang 65, Phụ lục 6 (Trang 201)",
      citations: [
        { title: "NIH / PubMed: Pretomanid - A new drug for tuberculosis", url: "https://pubmed.ncbi.nlm.nih.gov/32098679/" },
        { title: "New England Journal of Medicine (NEJM): A Trial of Pretomanid in MDR-TB (TB-PRACTECAL)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2117145" }
      ]
    },
    {
      id: "Dlm",
      code: "Dlm",
      name: "Delamanid (OPC-67683)",
      group: "Hàng 2 - Nhóm C & Thuốc mới",
      class: "Dẫn xuất Dihydro-nitroimidazooxazole ức chế tổng hợp methoxy/keto-mycolic acid",
      molecular_target: {
        description: "Ức chế sinh tổng hợp acid mycolic của vách tế bào vi khuẩn lao.",
        mechanism: "Delamanid là tiền dược được hoạt hóa bởi enzyme nitroreductase nội bào vi khuẩn (mã hóa bởi gen ddn cùng hệ thống cofactor F420). Khi được hoạt hóa, các chất chuyển hóa trung gian gốc tự do ức chế chọn lọc sự tổng hợp của methoxy-mycolic acid và keto-mycolic acid - hai thành phần lipid tối quan trọng trong cấu trúc màng vi khuẩn lao.",
        target_enzymes: "Enzyme Ddn phụ thuộc F420"
      },
      pk_pd: {
        absorption: "Sinh khả dụng tăng gần 3 lần khi uống cùng bữa ăn tiêu chuẩn. BẮT BUỘC uống thuốc sau bữa ăn.",
        distribution: "Phân bố rộng vào các mô phổi, u hạt. Thể tích phân bố lớn.",
        protein_binding: "Rất cao (> 99.5%, chủ yếu gắn với albumin).",
        metabolism: "Chuyển hóa chủ yếu qua albumin huyết tương thành chất chuyển hóa DM-6705, không phụ thuộc nhiều vào các enzyme CYP450.",
        elimination: "Thời gian bán thải T1/2 kéo dài 30 - 38 giờ. Đào thải chủ yếu qua phân; đào thải qua nước tiểu < 5%.",
        pk_pd_index: "AUC/MIC."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Khởi phát diệt khuẩn tốt trên các chủng đa kháng thuốc.",
        sterilizing_activity: "Hoạt tính tiệt khuẩn cao trên thể vi khuẩn bán ngủ trong u hạt."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến trên các gen mã hóa hệ thống F420: ddn, fgd1, fbiA, fbiB, fbiC.",
        natural_mutation_rate: "10^-6 đến 10^-7."
      },
      dosage_v10: {
        adult: "100 mg x 2 lần/ngày (sáng - tối) trong 24 tuần. Uống ngay sau bữa ăn.",
        child: "Trẻ em và vị thành niên: Xem bảng liều theo lứa tuổi và cân nặng (Phụ lục 6).",
        fixed_dose_combination: "Viên nén 50 mg."
      },
      special_adjustments: {
        renal: "Không cần chỉnh liều ở bệnh nhân suy thận nhẹ hoặc vừa. Thận trọng ở suy thận nặng.",
        hepatic: "Không cần chỉnh liều ở suy gan nhẹ; thận trọng ở suy gan vừa đến nặng.",
        pregnancy_lactation: "Dữ liệu còn hạn chế; cân nhắc lợi ích vượt trội nguy cơ."
      },
      adr_monitoring: {
        common: "Buồn nôn, chóng mặt, nôn, run tay, mất ngủ.",
        severe: "KÉO DÀI KHOẢNG QTc (Do chất chuyển hóa DM-6705 tích lũy, đặc biệt trầm trọng hơn nếu albumin máu giảm < 28 g/L vì làm tăng phân đoạn DM-6705 tự do).",
        monitoring: "ECG định kỳ theo dõi QTc (trước điều trị và hàng tháng). Định lượng Albumin huyết thanh và Điện giải đồ."
      },
      drug_interactions: {
        details: "Tăng nguy cơ kéo dài khoảng QT khi dùng phối hợp với Bedaquiline, Clofazimine, Fluoroquinolone. Không bị tương tác chuyển hóa đáng kể qua hệ CYP."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 48, Phụ lục 6 (Trang 201 Bảng 10)",
      citations: [
        { title: "NIH / PubMed: Delamanid for multidrug-resistant tuberculosis", url: "https://pubmed.ncbi.nlm.nih.gov/26639536/" },
        { title: "WHO Guidelines on Drug-Resistant Tuberculosis Treatment", url: "https://www.who.int/publications/i/item/9789240007048" }
      ]
    }
  ,
    {
      id: "Rfb",
      code: "Rfb",
      name: "Rifabutin",
      group: "Hàng 1 thiết yếu",
      class: "Kháng sinh nhóm Rifamycin ít cảm ứng men gan CYP3A4",
      molecular_target: {
        description: "Ức chế enzyme RNA polymerase phụ thuộc DNA của vi khuẩn lao (mã hóa bởi gen rpoB).",
        mechanism: "Tương tự Rifampicin, Rifabutin liên kết với tiểu đơn vị beta của RNA polymerase làm ngưng trệ quá trình phiên mã tạo RNA. Tuy nhiên, Rifabutin có hoạt lực ức chế vi khuẩn (MIC) in vitro thấp hơn Rifampicin từ 2 đến 4 lần đối với Mycobacterium tuberculosis.",
        target_enzymes: "Tiểu đơn vị beta của RNA Polymerase (sản phẩm mã hóa gen rpoB)"
      },
      pk_pd: {
        absorption: "Hấp thu tốt qua đường tiêu hóa (sinh khả dụng ~ 20% do chuyển hóa bước một qua gan).",
        distribution: "Phân bố mô cực kỳ sâu rộng (Vd ~ 8 - 9 L/kg, cao hơn Rifampicin gấp nhiều lần). Nồng độ thuốc tích lũy trong đại thực bào và bạch cầu cao gấp 5 - 10 lần nồng độ trong huyết tương. Thâm nhập CSF trung bình (~ 10-20%).",
        protein_binding: "Trung bình (~ 70%).",
        metabolism: "Chuyển hóa qua gan bởi CYP3A4 thành chất chuyển hóa có hoạt tính 25-O-desacetylrifabutin. ĐẶC BIỆT: Tác dụng cảm ứng enzyme CYP3A4 của Rifabutin yếu hơn Rifampicin khoảng 40%, do đó ít làm giảm nồng độ các thuốc dùng kèm.",
        elimination: "Thải qua nước tiểu (~ 53%) và phân (~ 30%). Thời gian bán thải T1/2 kéo dài khoảng 35 - 45 giờ.",
        pk_pd_index: "AUC0-24/MIC."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Tương đương Rifampicin.",
        sterilizing_activity: "Hoạt tính tiệt khuẩn cao trên trực khuẩn thể ngủ. Là lựa chọn thay thế hoàn hảo cho Rifampicin ở bệnh nhân đồng nhiễm HIV đang dùng phác đồ ARV chứa thuốc ức chế Protease (PI) hoặc thuốc ức chế tích hợp (INSTI)."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến rpoB trong vùng RRDR (thường kháng chéo với Rifampicin, tuy nhiên khoảng 10-15% chủng có đột biến đặc biệt tại codon 516 hoặc 526 vẫn còn nhạy cảm với Rifabutin).",
        natural_mutation_rate: "10^-8."
      },
      dosage_v10: {
        adult: "5 mg/kg/ngày (liều thông thường 300 mg x 1 lần/ngày). KHI DÙNG CÙNG THUỐC ARV ỨC CHẾ PROTEASE (Lopinavir/ritonavir): BẮT BUỘC GIẢM LIỀU XUỐNG 150 mg/ngày (hoặc 300 mg x 3 lần/tuần) do PI ức chế chuyển hóa làm tăng nồng độ Rifabutin.",
        child: "5 mg/kg/ngày (tối đa 300 mg/ngày).",
        fixed_dose_combination: "Viên nang 150 mg."
      },
      special_adjustments: {
        renal: "CrCl < 30 ml/min: giảm liều 50% (150 mg/ngày).",
        hepatic: "Thận trọng ở bệnh nhân suy gan vừa đến nặng.",
        pregnancy_lactation: "Nhóm B. Sử dụng khi có chỉ định bắt buộc trong đồng nhiễm HIV/Lao."
      },
      adr_monitoring: {
        common: "Nước tiểu, dịch tiết có màu đỏ cam; phát ban ngoài da, rối loạn tiêu hóa nhẹ, giảm bạch cầu trung tính nhẹ.",
        severe: "VIÊM MÀNG BỒ ĐÀO CẤP (Uveitis): Mắt đỏ, đau nhức mắt, giảm thị lực (nguy cơ tăng vọt nếu nồng độ thuốc tăng cao do dùng kèm thuốc ức chế CYP3A4 hoặc liều > 300mg/ngày).\nGiảm bạch cầu trung tính nặng, đau đa cơ khớp.",
        monitoring: "Công thức máu định kỳ (theo dõi bạch cầu); khám mắt chuyên khoa nếu xuất hiện đỏ mắt hoặc đau mắt."
      },
      drug_interactions: {
        details: "Khi phối hợp với thuốc ức chế Protease kháng HIV (Lopinavir/r, Atazanavir/r) hoặc thuốc kháng nấm azole (Voriconazole, Itraconazole), nồng độ Rifabutin tăng gấp 3-4 lần (nguy cơ viêm màng bồ đào), bắt buộc giảm liều Rifabutin còn 150 mg/ngày."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 51, Phụ lục 6 (Trang 196), Phụ lục 7 (Trang 211 - Bảng tương tác ARV)",
      citations: [
        { title: "NIH / PubMed: Rifabutin in HIV-associated tuberculosis", url: "https://pubmed.ncbi.nlm.nih.gov/16014761/" },
        { title: "PubChem: Rifabutin (CID 54623551)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Rifabutin" }
      ]
    },
    {
      id: "Rpt",
      code: "Rpt / P",
      name: "Rifapentine",
      group: "Hàng 1 thiết yếu",
      class: "Nhóm Rifamycin bán thải kéo dài (Long-acting Rifamycin)",
      molecular_target: {
        description: "Ức chế tiểu đơn vị beta của enzyme RNA polymerase phụ thuộc DNA của vi khuẩn lao.",
        mechanism: "Gắn chặt vào rpoB ngăn cản phiên mã sơ khai. Do có phân tử cyclopentyl cồng kềnh hơn, Rifapentine gắn kết rất bền vững và có thời gian giải phóng khỏi enzyme cực kỳ kéo dài.",
        target_enzymes: "Tiểu đơn vị beta của RNA Polymerase (gen rpoB)"
      },
      pk_pd: {
        absorption: "Hấp thu đường uống tốt; sinh khả dụng tăng hơn 50% khi uống cùng bữa ăn giàu lipid.",
        distribution: "Phân bố rộng vào các mô phổi và hang bã đậu. Thâm nhập đại thực bào tốt.",
        protein_binding: "Rất cao (97 - 99%), gắn kết bền với albumin, giúp kéo dài thời gian lưu hành trong máu.",
        metabolism: "Khử acetyl ở gan thành 25-desacetyl-rifapentine có hoạt tính kháng khuẩn.",
        elimination: "THỜI GIAN BÁN THẢI T1/2 CỰC DÀI: 14 - 17 GIỜ (dài gấp 4-5 lần Rifampicin). Thải trừ chủ yếu qua phân và mật (~ 70%); qua nước tiểu (~ 17%). Cho phép dùng liều 1 lần/tuần.",
        pk_pd_index: "AUC0-24/MIC."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Hoạt tính diệt khuẩn cao.",
        sterilizing_activity: "HOẠT TÍNH TIỆT KHUẨN VƯỢT TRỘI TRONG PHÁC ĐỒ ĐIỀU TRỊ LAO TIỀM ẨN NGẮN NGÀY: Là linh hồn của phác đồ 3HP (12 liều hàng tuần) và phác đồ 1HP (30 ngày). Ngoài ra, Rifapentine liều cao phối hợp Moxifloxacin là nền tảng của phác đồ rút ngắn điều trị lao nhạy cảm xuống 4 THÁNG (Phác đồ A1a: 2HPMZ/2HPM)."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến trên vùng RRDR của gen rpoB. Kháng chéo hoàn toàn với Rifampicin.",
        natural_mutation_rate: "10^-8."
      },
      dosage_v10: {
        adult: "1) Trong phác đồ 3HP (Dự phòng lao tiềm ẩn 3 tháng): 900 mg x 1 lần/TUẦN trong 12 tuần (uống cùng INH 900 mg và B6).\n2) Trong phác đồ 1HP (1 tháng hàng ngày): 600 mg x 1 lần/NGÀY trong 30 ngày.\n3) Trong phác đồ 4 tháng (A1a): 1200 mg x 1 lần/ngày (uống cùng bữa ăn).",
        child: "Trong phác đồ 3HP: 30-35 kg: 600 mg/tuần; 36-45 kg: 750 mg/tuần; 46-55 kg: 900 mg/tuần.",
        fixed_dose_combination: "Viên nén 150 mg hoặc 300 mg."
      },
      special_adjustments: {
        renal: "Không cần chỉnh liều ở bệnh nhân suy thận.",
        hepatic: "Thận trọng ở bệnh nhân suy gan.",
        pregnancy_lactation: "Dữ liệu trên thai kỳ còn hạn chế. Ưu tiên dùng phác đồ 6H hoặc 3RH thay vì 3HP ở phụ nữ mang thai."
      },
      adr_monitoring: {
        common: "Nước tiểu và mồ hôi màu đỏ cam, buồn nôn, đau đầu, mệt mỏi.",
        severe: "Phản ứng quá mẫn toàn thân (Hypersensitivity / Flu-like syndrome) với sốt cao, tụt huyết áp; độc tính trên gan, giảm tiểu cầu.",
        monitoring: "Men gan, công thức máu định kỳ. Khám phát hiện hội chứng giả cúm."
      },
      drug_interactions: {
        details: "Cảm ứng enzyme CYP3A4 và CYP2C8/9 tương tự Rifampicin (yếu hơn một chút nhưng kéo dài liên tục). Làm giảm nồng độ ARV, thuốc tránh thai, thuốc chống đông."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 52 (Phác đồ A1a), Trang 114-118 (Phác đồ 3HP & 1HP), Phụ lục 6 (Trang 196)",
      citations: [
        { title: "NEJM: Four-Month Rifapentine Regimens with or without Moxifloxacin for Tuberculosis (TBTC Study 31)", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa2033400" },
        { title: "NEJM: Three Months of Rifapentine and Isoniazid for Latent Tuberculosis Infection", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa1104875" }
      ]
    },
    {
      id: "S",
      code: "S / SM",
      name: "Streptomycin",
      group: "Hàng 1 thiết yếu (Thuốc tiêm)",
      class: "Kháng sinh nhóm Aminoglycoside diệt khuẩn ức chế ribosome 30S",
      molecular_target: {
        description: "Ức chế tiểu đơn vị 30S của ribosome vi khuẩn, gây đọc sai mã dịch mã mRNA.",
        mechanism: "Streptomycin gắn kết đặc hiệu không thuận nghịch vào protein S12 (mã hóa bởi gen rpsL) và vòng xoắn helix 27 của 16S rRNA (mã hóa bởi gen rrs) thuộc tiểu đơn vị 30S của ribosome vi khuẩn lao. Điều này gây biến dạng thụ thể nhận diện tRNA, dẫn tới đọc sai mã bộ ba di truyền trên mRNA, chèn các acid amin sai lệch vào chuỗi polypeptide, làm mất chức năng protein màng và làm chết vi khuẩn.",
        target_enzymes: "Protein S12 (gen rpsL) và 16S rRNA (gen rrs) trên tiểu đơn vị ribosome 30S"
      },
      pk_pd: {
        absorption: "KHÔNG HẤP THU ĐƯỜNG UỐNG (tính phân cực cực cao). Bắt buộc phải tiêm bắp sâu (IM). Đạt nồng độ đỉnh trong máu sau tiêm bắp 1 giờ.",
        distribution: "Phân bố chủ yếu trong dịch ngoại bào (Vd ~ 0.25 L/kg). Thâm nhập dịch não tủy KÉM KHI MÀNG NÃO BÌNH THƯỜNG, nhưng đạt khoảng 20% khi màng não có viêm cấp.",
        protein_binding: "Thấp (20 - 35%).",
        metabolism: "Hầu như không chuyển hóa ở gan.",
        elimination: "ĐÀO THẢI GẦN NHƯ HOÀN TOÀN QUA NƯỚC TIỂU: 80 - 98% liều dùng được bài tiết nguyên vẹn qua lọc cầu thận trong 24 giờ. Thời gian bán thải T1/2 ~ 2-3 giờ ở người bình thường, nhưng kéo dài từ 24 - 100 giờ ở người suy thận.",
        pk_pd_index: "Cmax/MIC. Hiệu quả diệt khuẩn tối ưu khi nồng độ đỉnh Cmax đạt 25 - 50 mcg/ml và nồng độ đáy Crough < 2-4 mcg/ml để tránh độc tính tích lũy."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Diệt khuẩn nhanh và mạnh đối với vi khuẩn phân chia ngoại bào (Quần thể A trong hang lao).",
        sterilizing_activity: "Rất kém trên vi khuẩn nội bào hoặc trong môi trường acid bã đậu (vì aminoglycoside bị ức chế hoạt tính ở pH thấp và điều kiện thiếu oxy)."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến điểm tại gen rpsL (phổ biến nhất K43R và K88R) gây kháng mức độ rất cao; hoặc đột biến tại gen 16S rRNA (gen rrs quanh nucleotide 530).",
        natural_mutation_rate: "10^-6."
      },
      dosage_v10: {
        adult: "15 mg/kg/ngày (liều thông thường 750 - 1000 mg/ngày tiêm bắp sâu 1 lần duy nhất). NGƯỜI CAO TUỔI (> 60 tuổi): BẮT BUỘC GIẢM LIỀU XUỐNG 500 - 750 mg/ngày để phòng ngừa độc tính trên tai.",
        child: "15 mg/kg/ngày (từ 20 - 40 mg/kg/ngày ở trẻ sơ sinh, tối đa 1000 mg/ngày).",
        fixed_dose_combination: "Lọ bột pha tiêm 1g."
      },
      special_adjustments: {
        renal: "TÍCH LŨY CỰC NGUY HIỂM KHI SUY THẬN: CrCl < 30 ml/min hoặc lọc máu: GIẢM TẦN SUẤT XUỐNG 12 - 15 mg/kg x 2 - 3 LẦN/TUẦN (tiêm sau lọc máu).",
        hepatic: "Không ảnh hưởng bởi suy gan.",
        pregnancy_lactation: "CHỐNG CHỈ ĐỊNH TUYỆT ĐỐI CHO PHỤ NỮ CÓ THAI (Nhóm D): Thuốc qua hàng rào rau thai và gây ĐIẾC TIẾP NHẬN BẨM SINH KHÔNG HỒI PHỤC VÀ ĐỘC TIỀN ĐÌNH CHO THAI NHI."
      },
      adr_monitoring: {
        common: "Đau tại chỗ tiêm, dị cảm quanh miệng (tê môi, tê lưỡi ngay sau tiêm, lành tính).",
        severe: "ĐỘC TÍNH KHÔNG HỒI PHỤC TRÊN TAI & TIỀN ĐÌNH (Ototoxicity): Tổn thương tế bào lông ốc tai và mào ốc tai tiền đình. Triệu chứng: Chóng mặt, mất thăng bằng khi đi lại, ù tai, điếc thần kinh giác quan tần số cao. ĐẶC BIỆT: Bệnh nhân mang đột biến gen ty thể người m.1555A>G có nguy cơ điếc hoàn toàn dù chỉ dùng liều rất nhỏ!\nĐỘC TÍNH TRÊN THẬN (Nephrotoxicity): Hoại tử ống thận cấp do tích lũy ở biểu mô ống lượn gần, gây suy thận cấp thể bảo tồn nước tiểu.\nỨc chế dẫn truyền thần kinh cơ (gây liệt cơ hô hấp khi dùng chung thuốc giãn cơ).",
        monitoring: "Đo thính lực đồ (Audiogram) trước và trong khi điều trị; kiểm tra dấu hiệu thăng bằng Romberg; xét nghiệm Creatinine huyết thanh hàng tuần/tháng."
      },
      drug_interactions: {
        details: "Hiệp đồng tăng độc tính trên tai và thận khi phối hợp với Furosemide, Vancomycin, Amphotericin B, Cisplatin, NSAIDs."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 51, Phụ lục 6 (Trang 196, 207), Phụ lục 7 (Bảng 5 điều chỉnh suy thận)",
      citations: [
        { title: "NIH / PubMed: Streptomycin - Mechanism of action and toxicity", url: "https://pubmed.ncbi.nlm.nih.gov/20435439/" },
        { title: "PubChem: Streptomycin (CID 439570)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Streptomycin" }
      ]
    },
    {
      id: "Eto",
      code: "Eto / Pto",
      name: "Ethionamide / Prothionamide",
      group: "Hàng 2 - Nhóm C",
      class: "Dẫn xuất Thioamide ức chế tổng hợp acid mycolic",
      molecular_target: {
        description: "Ức chế enzyme InhA (enoyl-ACP reductase) tương tự Isoniazid nhưng qua con đường hoạt hóa enzyme độc lập.",
        mechanism: "Ethionamide là tiền dược, được hoạt hóa bởi enzyme monooxygenase nội bào EthA (mã hóa bởi gen ethA), phụ thuộc NADPH. Chất chuyển hóa sulfoxide sau đó gắn kết với NAD+ tạo thành chất ức chế InhA, chặn đứng quá trình tổng hợp acid mycolic của vách tế bào vi khuẩn. Do đó, vi khuẩn kháng INH do đột biến katG VẪN HOÀN TOÀN NHẠY CẢM VỚI ETHIONAMIDE. Ngược lại, vi khuẩn có đột biến promoter inhA sẽ KHÁNG CHÉO cả INH và Eto.",
        target_enzymes: "Monooxygenase EthA (hoạt hóa tiền dược) -> Enoyl-ACP reductase InhA"
      },
      pk_pd: {
        absorption: "Hấp thu đường uống hoàn toàn (sinh khả dụng ~ 100%).",
        distribution: "Phân bố rộng khắp. ĐẶC BIỆT THÂM NHẬP DỊCH NÃO TỦY (CSF) HOÀN HẢO: Đạt 80 - 100% nồng độ huyết tương, vượt trội hơn hầu hết các thuốc chống lao khác. Vì vậy, Eto là thành phần cốt lõi trong phác đồ B2a (6HRZEto) điều trị lao màng não ở trẻ em và vị thành niên.",
        protein_binding: "Thấp (10 - 30%).",
        metabolism: "Chuyển hóa rộng rãi ở gan thành các chất chuyển hóa sulfoxide có hoạt tính và acid carboxylic không hoạt tính.",
        elimination: "Thải trừ chủ yếu qua nước tiểu dưới dạng chất chuyển hóa (< 1% dạng nguyên vẹn). Thời gian bán thải T1/2 ~ 2-3 giờ.",
        pk_pd_index: "AUC/MIC."
      },
      bacterial_activity: {
        early_bactericidal_activity: "Hoạt tính diệt khuẩn vừa phải.",
        sterilizing_activity: "Thấp đến trung bình. Hữu hiệu bảo vệ phác đồ phối hợp trong điều trị lao màng não và lao kháng thuốc."
      },
      resistance_genetics: {
        primary_mutations: "Đột biến trên gen ethA (mất hoạt hóa tiền dược) hoặc đột biến trên vùng promoter của gen inhA (kháng chéo với Isoniazid mức độ thấp).",
        natural_mutation_rate: "10^-6."
      },
      dosage_v10: {
        adult: "15 - 20 mg/kg/ngày (thường dùng 500 - 750 mg/ngày, chia làm 2-3 lần uống sau bữa ăn hoặc trước khi đi ngủ để giảm buồn nôn). Bổ sung Pyridoxine (B6) 50-100 mg/ngày.",
        child: "15 - 20 mg/kg/ngày trong phác đồ 6HRZEto điều trị lao não màng não trẻ em (tối đa 1000 mg/ngày).",
        fixed_dose_combination: "Viên nén 250 mg."
      },
      special_adjustments: {
        renal: "CrCl < 30 ml/min hoặc lọc máu: giảm liều xuống 250 - 500 mg/ngày uống sau lọc máu.",
        hepatic: "Chống chỉ định ở bệnh nhân suy gan nặng (rất độc với gan).",
        pregnancy_lactation: "CHỐNG CHỈ ĐỊNH TRONG THAI KỲ (Gây dị tật thai nhi, quái thai trên động vật thực nghiệm - Nhóm X/D)."
      },
      adr_monitoring: {
        common: "RỐI LOẠN TIÊU HÓA RẤT NẶNG NỀ: Buồn nôn, nôn mửa dữ dội, chán ăn, vị kim loại khó chịu trong miệng, ợ chua, đau thượng vị (thường là nguyên nhân hàng đầu khiến bệnh nhân bỏ trị).\nSUY GIÁP TIẾN TRIỂN (Hypothyroidism): Do ức chế bắt giữ iod và tổng hợp hormone tuyến giáp (nguy cơ tăng gấp nhiều lần khi dùng kèm PAS).",
        severe: "Viêm gan nhiễm độc thuốc cấp tính, trầm cảm, rối loạn tâm thần, viêm dây thần kinh thị giác và ngoại biên.",
        monitoring: "Xét nghiệm chức năng tuyến giáp (TSH, FT4) trước điều trị và mỗi 3-6 tháng; xét nghiệm men gan AST/ALT định kỳ."
      },
      drug_interactions: {
        details: "Dùng cùng PAS làm tăng vọt nguy cơ suy giáp và độc tế bào gan. Dùng cùng Isoniazid và Cycloserine làm tăng độc tính trên hệ thần kinh trung ương."
      },
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 48, 54 (Phác đồ B2a lao não), Phụ lục 6 (Trang 199 Bảng 7, Trang 201), Phụ lục 10",
      citations: [
        { title: "NIH / PubMed: Ethionamide in tuberculous meningitis and drug-resistant TB", url: "https://pubmed.ncbi.nlm.nih.gov/25501832/" },
        { title: "PubChem: Ethionamide (CID 2761171)", url: "https://pubchem.ncbi.nlm.nih.gov/compound/Ethionamide" }
      ]
    }
],

  // 2. SƠ ĐỒ CHẨN ĐOÁN & THUẬT TOÁN ĐIỀU TRỊ (SƠ ĐỒ 1 ĐẾN 9 THEO TÀI LIỆU V10)
  algorithms: [
    {
      id: "schema_1",
      number: 1,
      title: "Chẩn đoán Lao Phổi Không Có Bằng Chứng Vi Khuẩn",
      page_ref: "QĐ 162/QĐ-BYT: Trang 24 (Sơ đồ 1)",
      description: "Quy trình chẩn đoán lâm sàng cho người nghi mắc bệnh lao phổi nhưng có kết quả xét nghiệm vi sinh (soi kính đờm AFB trực tiếp hoặc SHPT Xpert) âm tính.",
      why_rationale: "Tại sao vi sinh âm tính vẫn có thể là lao? Bởi vì ngưỡng phát hiện của soi kính trực tiếp (Z-N) đòi hỏi mật độ vi khuẩn rất lớn (> 5.000 - 10.000 vi khuẩn/ml đờm). Ở thể lao thâm nhiễm sớm, tổn thương nốt nhỏ hoặc hang chưa thông với phế quản, số lượng vi khuẩn thoát ra đờm rất thấp (paucibacillary), do đó soi trực tiếp sẽ âm tính giả. Cần chụp X-quang phổi và thử nghiệm điều trị kháng sinh phổ rộng (không dùng quinolone) để loại trừ nhiễm khuẩn thông thường.",
      steps: [
        {
          node_id: "s1_start",
          title: "Người nghi mắc bệnh lao phổi (Có triệu chứng nghi lao)",
          details: "Ho khạc đờm >= 2 tuần, sốt nhẹ về chiều, gầy sút cân, ra mồ hôi trộm, đau ngực, ho ra máu.",
          action: "Chỉ định chụp X-quang ngực và xét nghiệm vi sinh đờm (Soi AFB / Xpert MTB)."
        },
        {
          node_id: "s1_micro_neg",
          title: "Kết quả vi sinh: AFB (-) hoặc Xpert MTB (-)",
          details: "Chưa loại trừ được bệnh lao nếu lâm sàng hoặc X-quang có tổn thương nghi ngờ.",
          action: "Đánh giá hình ảnh X-quang ngực:"
        },
        {
          node_id: "s1_cxr_suspicious",
          title: "X-quang ngực: Tổn thương nghi lao (Đông đặc, thâm nhiễm đỉnh/hạ đòn, nốt, hang)",
          details: "Cơ chế: Lao thường thâm nhiễm vùng phân thùy đỉnh và sau thùy trên phổi phải/trái do áp lực oxy phế nang cao.",
          action: "Điều trị thử nghiệm kháng sinh phổ rộng (Amoxicillin-Clavulanate, Cefuroxime, Azithromycin...). LƯU Ý BẮT BUỘC: KHÔNG DÙNG KHÁNG SINH NHÓM FLUOROQUINOLONE (Lfx, Mfx, Cipro) VÌ QUINOLONE CÓ TÁC DỤNG DIỆT VI KHUẨN LAO, SẼ LÀM MỜ TRIỆU CHỨNG LÂM SÀNG VÀ CHẬM TRỄ CHẨN ĐOÁN HOẶC GÂY KHÁNG QUINOLONE."
        },
        {
          node_id: "s1_antibiotic_eval",
          title: "Đánh giá lại sau đợt kháng sinh phổ rộng (10 - 14 ngày)",
          details: "Chụp lại X-quang ngực và đánh giá triệu chứng lâm sàng:",
          action: "- Nếu tổn thương X-quang thuyên giảm hoàn toàn: Chẩn đoán Viêm phổi thường.\n- Nếu triệu chứng và tổn thương X-quang KHÔNG THAY ĐỔI hoặc TIẾN TRIỂN: Chuyển hội chẩn chẩn đoán lao phổi không có bằng chứng vi sinh và chỉ định điều trị phác đồ lao nhạy cảm."
        }
      ]
    },
    {
      id: "schema_2",
      number: 2,
      title: "Sử Dụng Xét Nghiệm Sinh Học Phân Tử (SHPT) Ban Đầu Chẩn Đoán Lao Nhanh",
      page_ref: "QĐ 162/QĐ-BYT: Trang 25 (Sơ đồ 2)",
      description: "Chiến lược 2X (X-quang & Xpert) được Bộ Y tế áp dụng nhằm phát hiện sớm ca bệnh lao và xác định tình trạng kháng Rifampicin ngay từ đầu.",
      why_rationale: "Tại sao SHPT thay thế soi đờm làm xét nghiệm đầu tay? Phương pháp soi đờm AFB chỉ phát hiện được khi vi khuẩn > 5.000 CFU/ml. GeneXpert MTB/RIF Ultra sử dụng PCR lồng thời gian thực nhắm vào chuỗi lặp IS6110 và IS1081 có giới hạn phát hiện (LOD) cực thấp: chỉ 15.6 CFU/ml, tăng độ nhạy lên vượt bậc (> 90%), đồng thời phát hiện đột biến kháng Rifampicin (rpoB) chỉ sau 2 giờ.",
      steps: [
        {
          node_id: "s2_start",
          title: "Người nghi ngờ mắc bệnh lao phổi",
          details: "Lâm sàng nghi ngờ hoặc có tổn thương trên X-quang ngực.",
          action: "Chỉ định xét nghiệm SHPT ban đầu (GeneXpert MTB/RIF hoặc Truenat MTB)."
        },
        {
          node_id: "s2_branch_pos_sens",
          title: "Kết quả: MTB (+) & Không kháng Rifampicin",
          details: "Khẳng định chắc chắn người bệnh mắc Lao phổi.",
          action: "Chỉ định ngay Phác đồ điều trị lao nhạy cảm thuốc (Phác đồ A1: 2RHZE/4RH hoặc Phác đồ A1a: 2HPMZ/2HPM)."
        },
        {
          node_id: "s2_branch_pos_res",
          title: "Kết quả: MTB (+) & Kháng Rifampicin (R-resistant)",
          details: "Xác định lao kháng thuốc (kháng Rifampicin = dấu chỉ điểm của lao đa kháng MDR-TB).",
          action: "Gửi mẫu làm ngay LPA hàng 2 (Line Probe Assay) và Kháng sinh đồ kiểu hình để kiểm tra nhạy cảm Fluoroquinolone. Bắt đầu phác đồ BPaLM hoặc phác đồ lao kháng thuốc chuẩn."
        },
        {
          node_id: "s2_branch_trace",
          title: "Kết quả: MTB (+) VẾT (Trace)",
          details: "Số lượng DNA vi khuẩn cực thấp, máy không xác định được tình trạng kháng R.",
          action: "Xử trí theo SƠ ĐỒ 5 (Tùy thuộc vào tình trạng HIV, tiền sử điều trị lao và đối tượng trẻ em)."
        },
        {
          node_id: "s2_branch_neg",
          title: "Kết quả: MTB (-)",
          details: "Âm tính với xét nghiệm SHPT.",
          action: "Nếu lâm sàng vẫn nghi ngờ cao: Làm xét nghiệm đờm lần 2, cấy MGIT lỏng hoặc xử trí theo Sơ đồ 1."
        }
      ]
    },
    {
      id: "schema_3",
      number: 3,
      title: "Tiếp Cận Chẩn Đoán Lao Phổi Không Có Bằng Chứng Vi Khuẩn Ở Trẻ Em (< 10 tuổi)",
      page_ref: "QĐ 162/QĐ-BYT: Trang 33 (Sơ đồ 3 & Bảng 4)",
      description: "Hệ thống thang điểm chấm điểm chẩn đoán lao trẻ em khi không lấy được bệnh phẩm đờm hoặc vi sinh âm tính.",
      why_rationale: "Tại sao lao trẻ em khó tìm thấy vi khuẩn? Trẻ em nhỏ (< 10 tuổi) không biết khạc đờm mà thường nuốt đờm vào dạ dày (paucibacillary), tổn thương lao ở trẻ em chủ yếu là lao sơ nhiễm với hạch to trung thất/rốn phổi chèn ép phế quản, ít khi tạo hang hoại tử vỡ vào lòng phế quản như người lớn. Do đó, việc chẩn đoán phải dựa trên Bảng tính điểm kết hợp: Tiền sử tiếp xúc nguồn lây + Triệu chứng mạn tính + TST/IGRA + X-quang ngực.",
      steps: [
        {
          node_id: "s3_start",
          title: "Trẻ nghi mắc lao phổi (Ho kéo dài > 2 tuần, sốt nhẹ dai dẳng, sụt cân/không tăng cân)",
          details: "Không đáp ứng với kháng sinh thông thường, có nguồn lây trong gia đình.",
          action: "Áp dụng BẢNG 4 - Thang điểm chẩn đoán lao phổi trẻ em (Bộ Y tế):"
        },
        {
          node_id: "s3_scoring",
          title: "Tiến hành cộng điểm các tiêu chí:",
          details: "1. Tiền sử tiếp xúc bệnh nhân lao phổi (Nghi ngờ: 1đ; Khẳng định AFB(+): 3đ).\n2. Triệu chứng kéo dài > 2 tuần (Ho dai dẳng: 1đ; Sốt kéo dài: 1đ; Sụt cân/chậm lớn: 1đ).\n3. Suy dinh dưỡng (Vừa: 1đ; Nặng/Không hồi phục: 2đ).\n4. Phản ứng TST (Mantoux) hoặc IGRA dương tính: 3đ.\n5. X-quang phổi gợi ý lao (Hạch rốn phổi/trung thất to, phức hợp nguyên thủy, đông đặc thùy): 3đ.",
          action: "Đánh giá tổng điểm:"
        },
        {
          node_id: "s3_high_score",
          title: "Tổng điểm >= 7 điểm: KHẲNG ĐỊNH LAO LÂM SÀNG",
          details: "Độ đặc hiệu cao, đủ tiêu chuẩn chẩn đoán mắc bệnh lao trẻ em.",
          action: "Chỉ định điều trị Phác đồ lao nhạy cảm trẻ em: Phác đồ A2 (2HRZ/2HR cho thể nhẹ) hoặc Phác đồ chuẩn (2HRZE/4HR)."
        },
        {
          node_id: "s3_mid_score",
          title: "Tổng điểm 5 - 6 điểm: NGHI NGỜ LAO CAO",
          details: "Cần làm thêm các xét nghiệm thăm dò chuyên sâu.",
          action: "Hội chẩn chuyên khoa lao nhi, chỉ định lấy dịch dạ dày buổi sáng làm GeneXpert/Nuôi cấy, chụp CT ngực liều thấp."
        },
        {
          node_id: "s3_low_score",
          title: "Tổng điểm < 5 điểm: ÍT NGHĨ ĐẾN LAO",
          details: "Tìm nguyên nhân khác (viêm phổi không điển hình, hen phế quản, dị vật đường thở).",
          action: "Điều trị theo căn nguyên khác và hẹn tái khám đánh giá lại sau 2-4 tuần nếu triệu chứng không đỡ."
        }
      ]
    },
    {
      id: "schema_5",
      number: 5,
      title: "Hướng Dẫn Xử Trí Kết Quả 'Vết' (Trace) Trong Xét Nghiệm GeneXpert Ultra",
      page_ref: "QĐ 162/QĐ-BYT: Trang 41 & 48 (Sơ đồ 5)",
      description: "Phân loại xử trí kết quả Ultra 'Trace' tùy thuộc vào đối tượng nguy cơ, tình trạng miễn dịch và tiền sử điều trị lao.",
      why_rationale: "Tại sao kết quả 'Trace' lại gây tranh cãi lâm sàng? GeneXpert Ultra cực kỳ nhạy cảm nhờ mồi khuếch đại chuỗi lặp IS6110 và IS1081. Khi vi khuẩn ở mật độ cực thấp (LOD 15.6 CFU/ml), máy chỉ đọc được tín hiệu IS6110/IS1081 mà không đủ tín hiệu gen rpoB để xác định kháng R, cho kết quả 'Trace'. Ở người từng điều trị lao trong 5 năm gần đây, xác vi khuẩn lao chết (non-viable DNA) có thể tồn tại dai dẳng trong ổ xơ hang phổi, gây DƯƠNG TÍNH GIẢ. Ngược lại, ở trẻ em hoặc người nhiễm HIV suy giảm miễn dịch, kết quả 'Trace' hầu như luôn là LAO HOẠT ĐỘNG THẬT SỰ.",
      steps: [
        {
          node_id: "s5_start",
          title: "Xét nghiệm Xpert Ultra cho kết quả: MTB (+) VẾT (Trace)",
          details: "Không xác định được tình trạng kháng Rifampicin.",
          action: "Phân loại người bệnh theo 3 nhóm đối tượng:"
        },
        {
          node_id: "s5_hiv_child",
          title: "Nhóm 1: Người nhiễm HIV, Trẻ em, hoặc Mẫu dịch ngoài phổi (DNT, màng dịch)",
          details: "Cơ chế: Đây là các đối tượng suy giảm miễn dịch hoặc thể lao ít vi khuẩn (paucibacillary), mật độ vi khuẩn thấp phản ánh bệnh thực sự.",
          action: "COI NHƯ DƯƠNG TÍNH THỰC SỰ: Bắt đầu điều trị ngay phác đồ lao nhạy cảm; đồng thời gửi mẫu nuôi cấy MGIT và KSĐ."
        },
        {
          node_id: "s5_no_history",
          title: "Nhóm 2: Người lớn KHÔNG có tiền sử điều trị lao trong 5 năm gần đây",
          details: "Không có xác vi khuẩn lao cũ lưu lại.",
          action: "COI NHƯ DƯƠNG TÍNH THỰC SỰ: Chỉ định điều trị phác đồ lao nhạy cảm; làm xét nghiệm Xpert lần 2 hoặc nuôi cấy nếu nghi ngờ kháng thuốc."
        },
        {
          node_id: "s5_history_5yrs",
          title: "Nhóm 3: Người lớn CÓ TIỀN SỬ ĐIỀU TRỊ LAO trong vòng 5 năm gần đây",
          details: "Nguy cơ cao dương tính giả do DNA vi khuẩn chết còn sót lại trong hang lao xơ hóa.",
          action: "KHÔNG VỘI KẾT LUẬN: Đánh giá kỹ lâm sàng và X-quang xem tổn thương có mới hay không. Chỉ định làm lại Xpert Ultra lần 2 và nuôi cấy đờm MGIT. Hội chẩn chuyên khoa Lao trước khi quyết định điều trị."
        }
      ]
    },
    {
      id: "schema_6",
      number: 6,
      title: "Điều Trị Lao Đa Kháng (MDR/RR-TB): Phác Đồ BPaLM & BPaL",
      page_ref: "QĐ 162/QĐ-BYT: Trang 48 (Sơ đồ 6) & Trang 57-65",
      description: "Phác đồ uống hoàn toàn 6 tháng BPaLM rút ngắn thời gian điều trị cho bệnh nhân Lao kháng Rifampicin (RR-TB) và Đa kháng thuốc (MDR-TB).",
      why_rationale: "Tại sao BPaLM thay thế phác đồ 18-24 tháng? Phác đồ truyền thống đòi hỏi tiêm kanamycin/amikacin gây điếc vĩnh viễn và uống 18-24 tháng với tỷ lệ thất bại/bỏ trị cao. Phác đồ BPaLM kết hợp 4 cơ chế độc lập: Bedaquiline (ức chế ATP) + Pretomanid (ức chế vách & NO) + Linezolid (ức chế ribosome 50S) + Moxifloxacin (ức chế DNA gyrase). Sự phối hợp này tạo hiệp đồng tiệt khuẩn cực mạnh, tiêu diệt cả vi khuẩn nhân lên nhanh và thể ngủ trong 6 tháng với tỷ lệ khỏi bệnh > 90%.",
      steps: [
        {
          node_id: "s6_confirm",
          title: "Khẳng định Lao kháng Rifampicin (RR-TB) hoặc Đa kháng (MDR-TB)",
          details: "Được chẩn đoán bằng GeneXpert, Truenat hoặc LPA hàng 1.",
          action: "Làm ngay xét nghiệm tính nhạy cảm với Fluoroquinolone (LPA hàng 2 hoặc KSĐ tự động)."
        },
        {
          node_id: "s6_bpalm_eligible",
          title: "Nhạy cảm với Fluoroquinolone (Không kháng Quinolone)",
          details: "Bệnh nhân từ 14 tuổi trở lên, chưa từng dùng Bedaquiline/Linezolid/Pretomanid > 1 tháng.",
          action: "CHỈ ĐỊNH PHÁC ĐỒ BPaLM 6 THÁNG (26 tuần):\n- Bedaquiline (Bdq): 400mg x 1 lần/ngày x 2 tuần đầu; sau đó 200mg x 3 lần/tuần x 24 tuần.\n- Pretomanid (Pa): 200mg x 1 lần/ngày x 26 tuần.\n- Linezolid (Lzd): 600mg x 1 lần/ngày (theo dõi CTM và thần kinh).\n- Moxifloxacin (Mfx): 400mg x 1 lần/ngày x 26 tuần."
        },
        {
          node_id: "s6_bpal_eligible",
          title: "Có đột biến kháng Fluoroquinolone (Tiền siêu kháng Pre-XDR)",
          details: "Kháng Quinolone trên LPA hàng 2 hoặc KSĐ.",
          action: "LOẠI BỎ MOXIFLOXACIN -> CHỈ ĐỊNH PHÁC ĐỒ BPaL 6 THÁNG (26 tuần): Gồm 3 thuốc: Bedaquiline + Pretomanid + Linezolid."
        },
        {
          node_id: "s6_monitoring",
          title: "Theo dõi an toàn phác đồ BPaLM / BPaL",
          details: "Các nguy cơ: Kéo dài QTc (Bdq + Mfx) và ức chế tủy/viêm thần kinh (Lzd).",
          action: "- Đo ECG định kỳ (tuần 2, 4, 8, 12, 16, 20, 24). Nếu QTc > 500 ms: tạm ngừng hoặc điều chỉnh.\n- Xét nghiệm Công thức máu (CBC) 2 tuần/lần trong 2 tháng đầu. Nếu tiểu cầu < 50.000 hoặc Hb < 80 g/L: giảm liều Linezolid xuống 300mg/ngày hoặc tạm ngừng."
        }
      ]
    },
    {
      id: "schema_7_8",
      number: 7,
      title: "Quy Trình Chẩn Đoán & Điều Trị Lao Tiềm Ẩn (TPT)",
      page_ref: "QĐ 162/QĐ-BYT: Trang 112 & 113 (Sơ đồ 7 & 8)",
      description: "Chiến lược điều trị dự phòng lao (Tuberculosis Preventive Treatment - TPT) nhằm ngăn chặn chuyển đổi từ nhiễm lao sang bệnh lao hoạt động.",
      why_rationale: "Tại sao phải điều trị lao tiềm ẩn? Người nhiễm lao tiềm ẩn (LTBI) mang vi khuẩn ở trạng thái ngủ được bao bọc bởi nang u hạt. Khoảng 5-10% số này sẽ bùng phát thành bệnh lao hoạt động trong đời, nhưng nguy cơ này tăng vọt lên tới 10% MỖI NĂM ở người nhiễm HIV hoặc trẻ em < 5 tuổi suy dinh dưỡng. Điều trị TPT bằng phác đồ ngắn ngày (3HP: Isoniazid + Rifapentine hàng tuần x 3 tháng hoặc 1HP x 1 tháng) tiêu diệt thể ngủ, làm giảm 60-90% nguy cơ bùng phát bệnh.",
      steps: [
        {
          node_id: "s7_target",
          title: "Xác định đối tượng nguy cơ cao cần sàng lọc TPT",
          details: "1. Trẻ em < 5 tuổi tiếp xúc hộ gia đình với bệnh nhân lao phổi.\n2. Người nhiễm HIV ở mọi lứa tuổi.\n3. Người chuẩn bị điều trị thuốc ức chế sinh học (anti-TNF alpha) hoặc ghép tạng, chạy thận nhân tạo.",
          action: "BƯỚC 1 QUAN TRỌNG NHẤT: LOẠI TRỪ BỆNH LAO HOẠT ĐỘNG (Sàng lọc 4 triệu chứng: Ho, Sốt, Sụt cân, Ra mồ hôi trộm + Chụp X-quang phổi)."
        },
        {
          node_id: "s7_rule_out",
          title: "Nếu CÓ bất kỳ triệu chứng nghi ngờ hoặc tổn thương X-quang",
          details: "Không được điều trị TPT ngay.",
          action: "Phải làm xét nghiệm vi sinh (GeneXpert/AFB đờm) để chẩn đoán xác định bệnh lao hoạt động. Tuyệt đối không dùng đơn trị liệu TPT khi đang có lao hoạt động vì sẽ tạo chủng vi khuẩn kháng thuốc."
        },
        {
          node_id: "s7_regimens",
          title: "Nếu LOẠI TRỪ hoàn toàn lao hoạt động: CHỈ ĐỊNH PHÁC ĐỒ TPT",
          details: "Lựa chọn một trong các phác đồ chuẩn của Bộ Y tế:",
          action: "1. Phác đồ 3HP (Ưu tiên): Rifapentine + Isoniazid uống 1 lần/tuần x 12 tuần (3 tháng).\n2. Phác đồ 1HP: Rifapentine + Isoniazid uống hàng ngày x 1 tháng (cho người nhiễm HIV).\n3. Phác đồ 3RH: Rifampicin + Isoniazid uống hàng ngày x 3 tháng.\n4. Phác đồ 6H: Isoniazid uống hàng ngày x 6 tháng."
        }
      ]
    },
    {
      id: "schema_9",
      number: 9,
      title: "Sơ Đồ Chẩn Đoán Bệnh Phổi Do NTM (Non-Tuberculous Mycobacteria)",
      page_ref: "QĐ 162/QĐ-BYT: Trang 138 (Sơ đồ 9)",
      description: "Tiêu chuẩn chẩn đoán phân biệt giữa bệnh lao phổi và nhiễm trùng phổi do Mycobacteria không lao (M. avium complex, M. kansasii, M. abscessus).",
      why_rationale: "Tại sao NTM ngày càng phổ biến và dễ nhầm với lao? NTM cũng là trực khuẩn kháng cồn kháng acid (AFB dương tính khi soi kính), nhưng GeneXpert MTB lại âm tính. NTM thường cư trú hoại sinh trong đường thở ở người có giãn phế quản, COPD cũ. Do đó, tiêu chuẩn chẩn đoán bệnh phổi do NTM đòi hỏi nghiêm ngặt: Phải có triệu chứng lâm sàng + Tổn thương X-quang/HRCT tương ứng + Nuôi cấy dương tính lặp lại ít nhất 2 mẫu đờm riêng biệt để loại trừ tình trạng vấy nhiễm.",
      steps: [
        {
          node_id: "s9_suspect",
          title: "Bệnh nhân có triệu chứng hô hấp mạn tính + Soi đờm AFB (+) nhưng GeneXpert MTB (-)",
          details: "Tổn thương phổi mạn tính (giãn phế quản, nốt cây đâm chồi, xơ hang trên CT ngực).",
          action: "Chỉ định nuôi cấy định danh Mycobacteria và làm kháng sinh đồ NTM."
        },
        {
          node_id: "s9_criteria",
          title: "Tiêu chuẩn Chẩn đoán Bệnh Phổi do NTM (Tiêu chuẩn ATS/IDSA & Bộ Y Tế):",
          details: "Phải thỏa mãn đồng thời 3 nhóm tiêu chuẩn: Lâm sàng + Chẩn đoán hình ảnh + Vi sinh học.",
          action: "Tiêu chuẩn vi sinh bắt buộc:\n- Ít nhất 2 mẫu đờm riêng biệt nuôi cấy dương tính cùng loài NTM, HOẶC\n- Ít nhất 1 mẫu rửa phế quản (BAL) cấy dương tính, HOẶC\n- Sinh thiết phổi có u hạt mô bệnh học và cấy dương tính."
        },
        {
          node_id: "s9_treatment",
          title: "Xác định loài NTM và Phác đồ điều trị:",
          details: "Điều trị kéo dài ít nhất 12 tháng sau khi nuôi cấy âm tính hóa:",
          action: "- Nhóm MAC (M. avium complex): Azithromycin/Clarithromycin + Rifampicin + Ethambutol.\n- M. kansasii: Isoniazid + Rifampicin + Ethambutol.\n- M. abscessus: Cần phối hợp thuốc tiêm (Amikacin, Cefoxitin/Imipenem) + Macrolide."
        }
      ]
    }
  ],

  // 3. CƠ CHẾ CHUYÊN SÂU: SINH LÝ BỆNH & GIẢI PHẪU DÀNH CHO BÁC SĨ & NCS
  deep_dives: [
    {
      id: "dd_apical_predilection",
      title: "Giải phẫu & Sinh lý Thông khí / Tưới máu: Tại Sao Lao Thường Khu Trú Tại Đỉnh Phổi?",
      category: "Giải phẫu & Sinh lý Hô hấp",
      summary: "Giải thích cơ sở huyết động học, tỷ lệ V/Q và phân áp oxy phế nang ưu thế ở thùy trên.",
      content: `
### 1. Cơ sở Vi sinh học của Mycobacterium tuberculosis
Trực khuẩn lao (*Mycobacterium tuberculosis*) là một vi sinh vật **hiếu khí tuyệt đối (obligate aerobe)**. Sự sinh trưởng, phân bào và chuyển hóa năng lượng qua chuỗi phosphoryl hóa oxy hóa của vi khuẩn đòi hỏi nồng độ oxy hòa tan rất cao. Mật độ nhân lên của trực khuẩn lao tỷ lệ thuận trực tiếp với phân áp oxy ($pO_2$) trong mô.

### 2. Sự bất đối xứng giải phẫu - sinh lý học phổi (West Zones of the Lung)
Ở tư thế đứng hoặc ngồi thẳng, dưới tác động của trọng lực:
* **Tưới máu phế nang ($Q$):** Đáy phổi nhận lượng máu tưới dồi dào do áp lực thủy tĩnh cao (Vùng West III), trong khi đỉnh phổi nhận được rất ít máu tưới (Vùng West I & II). Lưu lượng máu tưới ở đỉnh phổi chỉ bằng khoảng **1/10** so với đáy phổi.
* **Thông khí phế nang ($V$):** Mặc dù thông khí ở đáy phổi vẫn nhỉnh hơn đỉnh do sức căng giãn cơ học, nhưng sự chênh lệch thông khí nhỏ hơn rất nhiều so với sự chênh lệch tưới máu.
* **Tỷ lệ Thông khí / Tưới máu ($V/Q$):**
  - Tại đáy phổi: $V/Q pprox 0.6$ (thừa tưới máu so với thông khí).
  - **Tại đỉnh phổi (Apices):** Tỷ lệ $V/Q$ tăng vọt lên tới **$V/Q > 3.0$ đến $3.3$**.

### 3. Phân áp oxy phế nang cực đại tại đỉnh phổi
Do tỷ lệ $V/Q$ rất cao, máu mao mạch tại đỉnh phổi không lấy đi hết lượng oxy được hít vào:
* Phân áp oxy phế nang ($p_A O_2$) tại đỉnh phổi đạt tới **$pprox 130 - 132	ext{ mmHg}$**, cao hơn rất nhiều so với đáy phổi ($pprox 89	ext{ mmHg}$).
* Phân áp cacbonic ($p_A CO_2$) tại đỉnh phổi rất thấp ($pprox 28	ext{ mmHg}$), tạo môi trường kiềm hóa nhẹ thuận lợi cho chuyển hóa của vi khuẩn lao.

### 4. Dẫn lưu hệ bạch huyết tại đỉnh phổi
Lưu lượng bạch huyết ở đỉnh phổi chậm hơn đáng kể so với đáy phổi do giảm dao động giãn nở phế nang. Điều này làm chậm khả năng thanh thải kháng nguyên và chậm huy động tế bào miễn dịch, cho phép trực khuẩn lao dễ dàng kết tụ và thành lập ổ tổn thương nguyên phát hoặc tái hoạt hóa (ổ Simon / ổ Assmann) tại **phân thùy đỉnh (S1) và sau (S2) của thùy trên, hoặc phân thùy đỉnh thùy dưới (S6)**.
      `,
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 14 (Bảng 2: Hình ảnh bất thường trên Xquang) & Phụ lục 5 (Trang 179)",
      citations: [
        { title: "West's Respiratory Physiology: Ventilation/Perfusion Relationships", url: "https://pubmed.ncbi.nlm.nih.gov/28565158/" },
        { title: "NIH / PubMed: Upper lobe localization of pulmonary tuberculosis - Physiological basis", url: "https://pubmed.ncbi.nlm.nih.gov/11252125/" }
      ]
    },
    {
      id: "dd_granuloma_immunology",
      title: "Miễn Dịch Học U Hạt (Granuloma Immunopathology) & Cơ Chế Bùng Phát Do Kháng TNF-alpha",
      category: "Miễn dịch & Sinh bệnh học",
      summary: "Phản ứng miễn dịch tế bào qua trung gian lympho Th1, hình thành u hạt bã đậu và hoại tử hang lao.",
      content: `
### 1. Tương tác Ban đầu: Đại thực bào phế nang và Nhận diện PAMP
Khi vi khuẩn lao vào phế nang, các thụ thể nhận diện mẫu (PRRs: TLR-2, TLR-4, NOD2) trên đại thực bào phế nang gắn kết với các phân tử vách vi khuẩn (lipoarabinomannan - LAM, cord factor trehalose dimycolate). Vi khuẩn lao bị thực bào nhưng sử dụng enzyme phosphatase PtpA và ức chế protein EEA1 để **ngăn cản sự hòa màng giữa phagosome và lysosome**, tiếp tục sống sót nội bào.

### 2. Kích hoạt Trục Miễn dịch IL-12 / IFN-gamma / Th1
* Đại thực bào nhiễm khuẩn tiết ra **Interleukin-12 (IL-12)** và Interleukin-18.
* IL-12 kích hoạt tế bào **Lympho T CD4+ (biệt hóa thành dòng Th1)** và tế bào NK.
* Tế bào Th1 tiết ra lượng lớn **Interferon-gamma (IFN-gamma)** và **Tumor Necrosis Factor-alpha (TNF-alpha)**.
* **IFN-gamma** là cytokine quyết định: kích hoạt mạnh mẽ enzyme iNOS (inducible nitric oxide synthase) trong đại thực bào để tạo gốc NO và gốc ROS, đồng thời kích hoạt quá trình tự thực (autophagy) tiêu diệt vi khuẩn lao bên trong đại thực bào.

### 3. Cấu trúc Giải phẫu - Mô học của U Hạt Lao (Tuberculous Granuloma)
Dưới tác động liên tục của **TNF-alpha** làm phân tử bám dính và thu hút bạch cầu:
1. **Trung tâm u hạt:** Đại thực bào biến đổi hình thái thành **tế bào dạng biểu mô (epithelioid cells)** với bào tương rộng và hòa màng tạo thành **tế bào khổng lồ nhiều nhân Langhans (Langhans giant cells)** có các nhân xếp hình móng ngựa ở ngoại vi.
2. **Vùng hoại tử bã đậu (Caseous necrosis):** Do cạn kiệt oxy, thiếu máu cục bộ và độc tính của TNF-alpha/ROS, các tế bào trung tâm chết theo kiểu hoại tử vô cấu trúc, đặc quánh như phô mai (bã đậu). Môi trường này toan tính ($pH < 5.5$) ức chế vi khuẩn nhân lên, đẩy chúng vào trạng thái thể ngủ (dormant state).
3. **Vành đai ngoại vi:** Bao bọc bởi tế bào lympho T CD4+, CD8+, lympho B và lớp vỏ xơ do nguyên bào sợi (fibroblasts) tiết collagen.

### 4. Tại sao thuốc kháng TNF-alpha (Infliximab, Adalimumab) gây bùng phát lao kịch phát?
**TNF-alpha** là chất keo sinh học giữ vững tính toàn vẹn cấu trúc u hạt. Khi bệnh nhân sử dụng thuốc ức chế sinh học kháng TNF-alpha:
* U hạt bị ly giải và tan rã lớp vỏ bao bọc.
* Các tế bào nội mô mạch máu lân cận tăng tính thấm, u hạt hoại tử hóa lỏng tạo thành dịch bã đậu chứa hàng tỷ vi khuẩn lao.
* Dịch bã đậu vỡ vào các tiểu phế quản tạo thành **hang lao (cavitation)** và phát tán vi khuẩn theo đường phế quản ra toàn bộ phổi và vào máu gây **lao kê, lao màng não cấp tính**.
* *Khuyến cáo Guideline:* Luôn luôn phải sàng lọc lao tiềm ẩn (IGRA/TST + X-quang) và điều trị TPT đầy đủ trước khi bắt đầu bất kỳ liệu pháp sinh học nào!
      `,
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 110 (Mục 1.1 Nhóm nguy cơ cao lao tiềm ẩn) & Phụ lục 1",
      citations: [
        { title: "NIH / PubMed: Immunology of the Tuberculous Granuloma", url: "https://pubmed.ncbi.nlm.nih.gov/22422774/" },
        { title: "Nature Reviews Immunology: The role of TNF in tuberculosis and granuloma maintenance", url: "https://www.nature.com/articles/nri1604" }
      ]
    },
    {
      id: "dd_mitchison_populations",
      title: "Bốn Quần Thể Vi Khuẩn Của Mitchison & Cơ Sở Phân Tử Của Phác Đồ 4 Thuốc (2RHZE / 4RH)",
      category: "Dược lý học Phân tử & Vi sinh",
      summary: "Tại sao phải phối hợp đúng 4 thuốc? Tại sao tấn công 2 tháng và duy trì 4 tháng?",
      content: `
### 1. Bốn Quần Thể Vi Khuẩn Lao của Mitchison (Mitchison's Subpopulations)
Trong bất kỳ ổ tổn thương lao nào ở người, vi khuẩn lao không đồng nhất mà tồn tại ở 4 trạng thái chuyển hóa khác nhau:
1. **Quần thể A (Phân chia nhanh liên tục, extracellular):** Sống ở thành hang lao, nơi giàu oxy ($pO_2$ cao) và môi trường trung tính ($pH pprox 7.4$). Số lượng áp đảo ($10^7 - 10^9$ vi khuẩn). *Thuốc tiêu diệt:* **Isoniazid (H)** là thuốc diệt khuẩn mạnh nhất trên quần thể này (EBA cực cao), phối hợp với Rifampicin.
2. **Quần thể B (Phân chia chậm ngắt quãng, intracellular):** Nằm bên trong phagolysosome của đại thực bào, môi trường có tính acid nhẹ ($pH pprox 5.5$). Vi khuẩn chỉ bùng phát chuyển hóa trong những khoảng thời gian ngắn. *Thuốc tiêu diệt đặc hiệu:* **Pyrazinamide (Z)** chỉ có hoạt tính tối ưu trong môi trường toan hóa này.
3. **Quần thể C (Thể bán ngủ, semi-dormant in caseum):** Nằm sâu trong chất bã đậu đặc, nồng độ oxy rất thấp, chỉ thỉnh thoảng hoạt động chuyển hóa trong vài giờ rồi lại ngủ. *Thuốc tiêu diệt số một:* **Rifampicin (R)** - với khả năng ức chế RNA polymerase tức thì ngay khi vi khuẩn vừa thức giấc (hoạt tính tiệt khuẩn cao nhất).
4. **Quần thể D (Thể ngủ hoàn toàn, completely dormant):** Hoàn toàn đình trệ chuyển hóa, không thuốc nào tiêu diệt được, hệ miễn dịch cơ thể phải tự kiểm soát.

### 2. Xác suất Đột biến Kháng Thuốc Tự Nhiên (Spontaneous Mutation Rates)
Trong tự nhiên, vi khuẩn lao phát sinh đột biến kháng thuốc ngẫu nhiên trên nhiễm sắc thể mà không cần tiếp xúc với kháng sinh:
* Đột biến kháng Isoniazid ($katG/inhA$): $10^{-6}$ (Cứ $10^6$ vi khuẩn có 1 con kháng tự nhiên).
* Đột biến kháng Rifampicin ($rpoB$): $10^{-8}$ (Cứ $10^8$ vi khuẩn có 1 con kháng tự nhiên).
* Đột biến kháng Ethambutol ($embB$): $10^{-6}$.
* Đột biến kháng Pyrazinamide ($pncA$): $10^{-5}$.

Trong một hang lao đường kính 2cm có khoảng $10^8 - 10^9$ vi khuẩn.
- Nếu **đơn trị liệu bằng Isoniazid**: $100 - 1000$ vi khuẩn mang đột biến kháng INH tự nhiên sẽ sống sót, tiếp tục sinh sôi và biến toàn bộ quần thể thành lao kháng INH sau vài tuần!
- Nhưng xác suất đột biến kháng ĐỒNG THỜI cả Isoniazid VÀ Rifampicin là:
  $$P(H + R) = 10^{-6} 	imes 10^{-8} = 10^{-14}$$
Một người bệnh lao phổi nặng nhất cũng chỉ chứa tối đa $10^{10} - 10^{11}$ vi khuẩn. Do đó, **xác suất xuất hiện một vi khuẩn kháng tự nhiên cả H và R trước điều trị là gần như bằng KHÔNG ($< 10^{-14}$)**. Việc phối hợp ngay 4 thuốc (RHZE) bảo đảm tiêu diệt triệt để mọi đột biến đơn lẻ ngay từ ngày đầu tiên.

### 3. Tại sao Tấn công 2 Tháng và Duy trì 4 Tháng?
* **2 Tháng Tấn Công (2RHZE):** Mục tiêu diệt sạch Quần thể A và Quần thể B. Sau 8 tuần, > 85% người bệnh sẽ âm tính hóa đờm trên soi trực tiếp. Pyrazinamide đã hoàn thành nhiệm vụ tiêu diệt sạch vi khuẩn trong đại thực bào, do đó **không cần dùng PZA sau tháng thứ 2** (giúp giảm độc tính cho gan).
* **4 Tháng Duy Trì (4RH):** Mục tiêu tiệt khuẩn Quần thể C (thể bán ngủ trong bã đậu). Rifampicin và Isoniazid âm thầm phục kích tiêu diệt nốt những trực khuẩn thỉnh thoảng thức giấc, bảo đảm tiệt khuẩn triệt để và **ngăn ngừa lao tái phát**.
      `,
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 43 (Mục 1 Nguyên tắc điều trị) & Trang 50-52 (Phác đồ A1)",
      citations: [
        { title: "NIH / PubMed: Mitchison DA. Mechanisms of the action of antituberculosis drugs", url: "https://pubmed.ncbi.nlm.nih.gov/22008768/" },
        { title: "Lancet: High-dose rifamycins and modern regimens for tuberculosis", url: "https://pubmed.ncbi.nlm.nih.gov/30243884/" }
      ]
    },
    {
      id: "dd_cns_tb_anatomy",
      title: "Giải Phẫu Bệnh Lao Màng Não (TBM), Não Úng Thủy & Cơ Chế Sử Dụng Corticosteroid",
      category: "Giải phẫu Thần kinh & Hồi sức",
      summary: "Tại sao tổn thương tập trung ở nền sọ, gây liệt dây thần kinh sọ và tại sao Corticoid cứu sống bệnh nhân?",
      content: `
### 1. Cơ chế Bệnh sinh: Ổ Rich (Rich Focus)
Lao màng não không phải do vi khuẩn lao từ phổi trực tiếp xâm nhập màng não cùng lúc. Trong giai đoạn nhiễm lao nguyên phát hoặc phát tán theo đường máu ban đầu, vi khuẩn lắng đọng tại nhu mô não hoặc màng mềm, tạo thành các nốt u hạt nhỏ nằm sát bề mặt khoang dưới nhện gọi là **Ổ Rich (Rich Focus)**. Sau đó (vài tháng đến vài năm), ổ Rich hoại tử bã đậu và vỡ vào khoang dưới nhện, giải phóng một lượng lớn kháng nguyên lao gây ra phản ứng viêm quá mẫn chậm dữ dội.

### 2. Đặc điểm Giải phẫu Bệnh: Thể Dính Dịch Rỉ Nền Sọ (Basal Gelatinous Exudate)
* Khác với viêm màng não mủ do vi khuẩn sinh mủ tập trung ở vòm sọ, chất dịch rỉ viêm của lao màng não là chất nhầy quánh dính màu xám đục tập trung chủ yếu tại **khoang nền sọ (basal cisterns: bể liên cuống, chéo thị giác, bể quanh cuống)**.
* **Hậu quả 1: Liệt các dây thần kinh sọ (Cranial Nerve Palsies):** Các dây thần kinh sọ đi qua nền sọ bị bao bọc và chèn ép trong lớp dịch rỉ dính: hay gặp nhất là **Dây VI (thần kinh vận nhãn ngoài - gây lác trong)**, **Dây III (vận nhãn - sụp mi, giãn đồng tử)**, và **Dây VII (liệt mặt ngoại biên)**.
* **Hậu quả 2: Não úng thủy tắc nghẽn (Hydrocephalus):** Dịch rỉ dính làm tắc cống não Sylvius hoặc tắc các lỗ Luschka và Magendie ở não thất IV, hoặc bít tắc các hạt màng nhện Pacchioni ngăn cản hấp thu dịch não tủy, dẫn tới tăng áp lực nội sọ cấp tính đe dọa tính mạng.
* **Hậu quả 3: Viêm tắc động mạch nuôi não (Tuberculous Vasculitis & Stroke):** Quá trình viêm xâm lấn thành các động mạch lớn ở nền sọ (vòng Willis, động mạch não giữa), gây viêm dày nội mạc và huyết khối làm nhồi máu não diện rộng (thường gặp ở vùng bao trong và nhân nền).

### 3. Cơ Chế Tác Dụng Của Corticosteroid (Dexamethasone / Prednisolone)
Guideline Bộ Y tế và WHO quy định bắt buộc phải dùng Corticosteroid bổ trợ trong Lao màng não (giảm liều dần trong 6 - 8 tuần):
1. **Ức chế giải phóng các cytokine gây viêm:** Giảm nồng độ TNF-alpha, IL-1beta, IFN-gamma trong dịch não tủy.
2. **Làm giảm nhanh tính thấm hàng rào máu não:** Giảm phù não vận mạch (vasogenic cerebral edema), hạ áp lực nội sọ.
3. **Ngăn chặn quá trình xơ hóa và hình thành dính dịch rỉ nền sọ:** Làm thông thoáng đường lưu thông dịch não tủy, phòng ngừa biến chứng não úng thủy vĩnh viễn và giảm thiểu tỷ lệ nhồi máu não do viêm mạch.
      `,
      pdf_ref: "QĐ 162/QĐ-BYT: Trang 28 (Mục 3.3.1 Lao màng não), Trang 72 (Mục 3.3 Sử dụng Corticosteroid)",
      citations: [
        { title: "New England Journal of Medicine (NEJM): Dexamethasone for the Treatment of Tuberculous Meningitis", url: "https://www.nejm.org/doi/full/10.1056/NEJMoa040573" },
        { title: "Lancet Neurology: Pathogenesis and clinical management of tuberculous meningitis", url: "https://pubmed.ncbi.nlm.nih.gov/23726858/" }
      ]
    }
  ],

  // 4. MỤC LỤC & ĐỐI CHIẾU 229 TRANG TÀI LIỆU V10
  guideline_toc: [
    { section: "Phần I", title: "ĐẠI CƯƠNG", page: 10, topics: "Một số khái niệm cơ bản, Phân loại bệnh lao (theo vị trí giải phẫu, theo kết quả vi sinh, theo tiền sử điều trị, theo tình trạng kháng thuốc)" },
    { section: "Phần II", title: "CHẨN ĐOÁN BỆNH LAO", page: 13, topics: "Người nghi mắc lao, Kỹ thuật vi sinh (soi AFB, Xpert Ultra, LPA, nuôi cấy MGIT), CĐHA (Xquang, CT), Sinh thiết, Chẩn đoán lao phổi & lao ngoài phổi, Chẩn đoán lao kháng thuốc" },
    { section: "Phần III", title: "ĐIỀU TRỊ BỆNH LAO", page: 43, topics: "Nguyên tắc điều trị, Phác đồ lao nhạy cảm (A1 2RHZE/4RH, A1a 4 tháng, A2 trẻ em, B1, B2a), Phác đồ lao kháng thuốc (BPaLM, BPaL, ngắn ngày, dài ngày), Quản lý ADR độc tính thuốc" },
    { section: "Phần IV", title: "CHẨN ĐOÁN VÀ ĐIỀU TRỊ LAO TIỀM ẨN", page: 110, topics: "Nhóm nguy cơ cao, Xét nghiệm TST/IGRA, Phác đồ TPT (3HP, 1HP, 3RH, 6H), Quản lý điều trị" },
    { section: "Phần V", title: "DỰ PHÒNG BỆNH LAO", page: 125, topics: "Giảm nguy cơ nhiễm, Dự phòng trong cơ sở y tế (kiểm soát hành chính, môi trường, bảo vệ cá nhân N95), Dự phòng tại hộ gia đình" },
    { section: "Phần VI", title: "CHẨN ĐOÁN VÀ ĐIỀU TRỊ NHIỄM TRÙNG DO NTM", page: 130, topics: "Đại cương NTM, Tiêu chuẩn chẩn đoán bệnh phổi do NTM, Phác đồ điều trị MAC, M. kansasii, M. abscessus" },
    { section: "Phần VII", title: "PHỤ LỤC", page: 144, topics: "PL 1: Các thể lao ngoài phổi (145); PL 2: Sử dụng LF-LAM (152); PL 3: Lấy đờm (155); PL 4: Kỹ thuật vi sinh (156); PL 5: Chẩn đoán hình ảnh (162); PL 6: Liều lượng thuốc chống lao (179-190); PL 7: Tương tác thuốc (191-196); PL 8: Quên liều TPT (197); PL 9: Theo dõi lao tái phát (199); PL 10: Nhận dạng ADR & Giảm mẫn cảm thuốc (203-209)" }
  ],

  // 5. CA LÂM SÀNG TƯƠNG TÁC (CLINICAL CASES)
  clinical_cases: [
    {
      id: "case_1",
      title: "Ca lâm sàng 1: Bệnh nhân nam 32 tuổi ho kéo dài và sốt nhẹ",
      history: "Bệnh nhân nam, 32 tuổi, cân nặng 52 kg, làm nghề thợ mộc. Đến khám vì ho khạc đờm trắng đục kéo dài 3 tuần nay, kèm theo sốt gai gai về chiều, mệt mỏi, sút 3 kg trong vòng 1 tháng. Không khó thở, không ho ra máu. Tiền sử chưa từng mắc và chưa từng điều trị lao.",
      cxr: "X-quang ngực thẳng: Hình ảnh tổn thương thâm nhiễm nốt và dải mờ rải rác vùng hạ đòn phổi phải, có 1 hình hang nhỏ thành mỏng kích thước khoảng 1.5 cm ở phân thùy S2.",
      microbiology: "Đờm soi trực tiếp: AFB (+). Xét nghiệm GeneXpert MTB/RIF Ultra: MTB (+) Mức độ trung bình (Medium), Không phát hiện kháng Rifampicin (Rifampicin resistance NOT DETECTED). Xét nghiệm HIV: Âm tính. Men gan AST/ALT: 28/32 U/L, Creatinine: 78 mcmol/L.",
      questions: [
        {
          q: "Chẩn đoán xác định đầy đủ cho bệnh nhân này là gì?",
          options: [
            "Lao phổi AFB (+) mới, nhạy cảm với thuốc",
            "Lao phổi AFB (+) tái phát, nghi ngờ kháng thuốc",
            "Viêm phổi thùy áp xe hóa",
            "Nhiễm trùng phổi do NTM"
          ],
          correct: 0,
          explanation: "Bệnh nhân có triệu chứng lâm sàng nghi lao, tổn thương X-quang đỉnh phổi, xét nghiệm GeneXpert khẳng định MTB(+) không kháng Rifampicin và chưa từng điều trị lao trước đây -> Chẩn đoán chuẩn: Lao phổi AFB (+) mới, nhạy cảm thuốc (Theo Mục 2 Phân loại bệnh lao, Trang 10)."
        },
        {
          q: "Phác đồ điều trị chuẩn của Bộ Y tế chỉ định cho bệnh nhân này là gì?",
          options: [
            "Phác đồ BPaLM 6 tháng",
            "Phác đồ A1: 2RHZE / 4RH (Dùng hàng ngày)",
            "Phác đồ B1: 2RHZE / 10RH",
            "Phác đồ 2HRZ / 2HR"
          ],
          correct: 1,
          explanation: "Phác đồ A1 (2RHZE / 4RH) là phác đồ chuẩn cho người bệnh lao phổi mới nhạy cảm với thuốc ở người lớn (Trang 52)."
        },
        {
          q: "Với cân nặng 52 kg, liều lượng viên phối hợp cố định (FDC 4 thuốc RHZE: 150/75/400/275 mg) ở giai đoạn tấn công là bao nhiêu viên mỗi ngày?",
          options: [
            "2 viên/ngày",
            "3 viên/ngày",
            "4 viên/ngày",
            "5 viên/ngày"
          ],
          correct: 1,
          explanation: "Theo Bảng 2 Phụ lục 6 (Trang 197), bệnh nhân có cân nặng trong khoảng 40 - 54 kg chỉ định uống 3 viên RHZE/ngày, uống 1 lần duy nhất lúc đói."
        }
      ]
    },
    {
      id: "case_2",
      title: "Ca lâm sàng 2: Bệnh nhân lao tái phát và phát hiện kháng Rifampicin",
      history: "Bệnh nhân nữ, 45 tuổi, cân nặng 48 kg. Tiền sử điều trị lao phổi nhạy cảm hoàn thành cách đây 3 năm. Đợt này ho nhiều trở lại, khạc đờm đặc có lẫn tia máu, sụt 4 kg.",
      cxr: "X-quang ngực: Tổn thương xơ hang tiến triển ở đỉnh phổi trái kèm thâm nhiễm mới thùy dưới.",
      microbiology: "Xét nghiệm GeneXpert MTB/RIF: MTB (+) Cao (High), PHÁT HIỆN KHÁNG RIFAMPICIN (Rifampicin resistance DETECTED). Xét nghiệm LPA hàng 2: Không phát hiện đột biến kháng Fluoroquinolone (nhạy cảm Quinolone) và không kháng thuốc tiêm. ECG: QTc = 410 ms.",
      questions: [
        {
          q: "Theo Hướng dẫn Bộ Y tế V10, phác đồ ưu tiên hàng đầu hiện nay cho bệnh nhân này là gì?",
          options: [
            "Phác đồ dài ngày 18 - 20 tháng có thuốc tiêm Kanamycin",
            "Phác đồ BPaLM 6 tháng (Bedaquiline + Pretomanid + Linezolid + Moxifloxacin)",
            "Tiếp tục phác đồ A1 và tăng gấp đôi liều Rifampicin",
            "Phác đồ 2RHZE / 4RH"
          ],
          correct: 1,
          explanation: "Bệnh nhân mắc Lao kháng Rifampicin (RR-TB) và kết quả LPA khẳng định còn nhạy cảm với Fluoroquinolone, không có chống chỉ định -> Ưu tiên tuyệt đối chỉ định phác đồ BPaLM 6 tháng (26 tuần) đường uống hoàn toàn theo Sơ đồ 6 (Trang 48) và Khuyến cáo cập nhật của Bộ Y tế."
        },
        {
          q: "Hai xét nghiệm an toàn nào BẮT BUỘC phải theo dõi chặt chẽ nhất trong phác đồ BPaLM?",
          options: [
            "Men gan và Acid uric",
            "Điện tâm đồ (theo dõi QTc) và Tổng phân tích tế bào máu (CBC)",
            "Chức năng hô hấp và Khí máu động mạch",
            "Chụp CT ngực hàng tháng"
          ],
          correct: 1,
          explanation: "Phác đồ BPaLM có Bedaquiline và Moxifloxacin làm tăng nguy cơ kéo dài khoảng QT (cần đo ECG định kỳ); Linezolid có độc tính gây ức chế tủy xương (giảm tiểu cầu, thiếu máu) nên bắt buộc kiểm tra CBC 2 tuần/lần trong 2 tháng đầu."
        }
      ]
    }
  ],

  // 6. FLASHCARDS ÔN TẬP NHANH (QUICK REVIEW FLASHCARDS)
  flashcards: [
    {
      front: "Liều tối đa hàng ngày của Isoniazid (H) ở người lớn là bao nhiêu?",
      back: "300 mg/ngày (tính theo liều 5 mg/kg, khoảng 4-6 mg/kg). Luôn uống 1 lần lúc đói. (QĐ 162/QĐ-BYT, Phụ lục 6, Trang 196)."
    },
    {
      front: "Cơ chế tác dụng phân tử của Rifampicin là gì?",
      back: "Ức chế tiểu đơn vị beta của enzyme RNA polymerase phụ thuộc DNA của vi khuẩn (mã hóa bởi gen rpoB), chặn đứng quá trình phiên mã tạo RNA."
    },
    {
      front: "Đột biến gen nào phổ biến nhất gây kháng mức độ cao với Isoniazid?",
      back: "Đột biến tại gen katG (chủ yếu là đột biến Ser315Thr / S315T), làm mất khả năng hoạt hóa tiền dược INH của enzyme catalase-peroxidase."
    },
    {
      front: "Tại sao không dùng kháng sinh nhóm Fluoroquinolone khi thử điều trị viêm phổi ở người nghi lao?",
      back: "Vì Fluoroquinolone có hoạt tính diệt khuẩn lao rất mạnh, sẽ làm giảm tạm thời triệu chứng làm che mờ bệnh cảnh lao, gây chậm trễ chẩn đoán và đặc biệt là làm tăng nguy cơ phát sinh đột biến kháng Quinolone (Pre-XDR)."
    },
    {
      front: "Thành phần 4 thuốc trong phác đồ BPaLM điều trị lao kháng thuốc 6 tháng gồm những gì?",
      back: "Bedaquiline (Bdq) + Pretomanid (Pa) + Linezolid (Lzd) + Moxifloxacin (Mfx). Thời gian điều trị: 26 tuần (uống hoàn toàn)."
    },
    {
      front: "Ở bệnh nhân suy thận nặng (CrCl < 30 ml/min), hai thuốc hàng 1 nào PHẢI GIẢM TẦN SUẤT xuống 3 lần/tuần?",
      back: "Pyrazinamide (Z) và Ethambutol (E) (uống 3 lần/tuần sau buổi lọc máu). Isoniazid và Rifampicin vẫn dùng liều bình thường hàng ngày."
    },
    {
      front: "Chỉ số PK/PD quyết định hiệu quả diệt khuẩn của Rifampicin và Fluoroquinolone là gì?",
      back: "Tỷ số diện tích dưới đường cong trên nồng độ ức chế tối thiểu: AUC0-24 / MIC."
    },
    {
      front: "Tại sao u hạt lao có xu hướng khu trú ưu thế tại đỉnh phổi?",
      back: "Do tỷ lệ Thông khí / Tưới máu tại đỉnh phổi rất cao (V/Q > 3), dẫn tới phân áp oxy phế nang pO2 tại đỉnh phổi đạt cực đại (~ 130 mmHg), tạo môi trường hiếu khí lý tưởng cho vi khuẩn lao nhân lên."
    }
  ]
};

// Export to global scope
if (typeof window !== "undefined") {
  window.TB_DATABASE = TB_DATABASE;
}