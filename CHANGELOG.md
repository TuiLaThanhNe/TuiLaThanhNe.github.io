# Nhật ký thay đổi (Changelog)

## v0.3.0 – Phân tích 5 Tài liệu chuyên khảo & Hoàn thiện tính năng Lâm sàng / Vi sinh (2026-10-31)
- **Phân tích & tích hợp toàn diện 5 tài liệu trong `data/documents/`**:
  1. `1121_QD-TTg_580479.md` – Chiến lược Quốc gia về phòng, chống kháng thuốc tại Việt Nam (2023–2030, tầm nhìn 2045).
  2. `WHO.md` – Danh sách Vi khuẩn Kháng thuốc Ưu tiên của WHO năm 2024 (WHO BPPL 2024).
  3. `gram_negative.md` – Hướng dẫn IDSA 2024 về điều trị nhiễm khuẩn Gram âm kháng thuốc (ESBL-E, AmpC-E, CRE, DTR *P. aeruginosa*, CRAB, *S. maltophilia*).
  4. `v_16.1_Breakpoint_Tables.md` – Bảng Breakpoint lâm sàng EUCAST v16.1 (2026).
  5. `sach-vi-sinh-hoc-nhathuocngocanh.md` – Giáo trình Vi Sinh Học Đào tạo Dược sĩ Đại học (Bộ Y tế).
- **Tính năng mới – Tab `🧭 Phác đồ & MIC` (`#guidelines`)**:
  - **Phác đồ & Liều truyền IDSA 2024**: Tra cứu phác đồ Ưu tiên / Thay thế theo từng cơ chế kháng thuốc (ESBL, AmpC, KPC, NDM/MBL, OXA-48, DTR-PA, CRAB, *S. maltophilia*) và bảng liều truyền người lớn (IDSA Table 1).
  - **Công cụ Phiên giải MIC & Đĩa giấy EUCAST v16.1**: Tự động phân loại `S / I / R / ATU`, giải thích quy tắc `S ≤ 0.001 mg/L` và gợi ý liều chuẩn vs liều cao, kèm bảng đối chiếu CLSI 2024.
  - **Chuyên trang WHO BPPL 2024 & Chiến lược Quốc gia 1121/QĐ-TTg**.
- **Tính năng mới – Trình đọc & Tìm kiếm Tài liệu trực tiếp (`#docs`)**:
  - Hiển thị phân tích chi tiết các điểm cốt lõi của từng tài liệu.
  - Đọc trực tiếp các file `.md` lớn ngay trong ứng dụng với mục lục tự động (`# / ## / ###`), phân trang mượt mà và tìm kiếm từ khóa theo dòng.
- **Mở rộng toàn bộ cơ sở dữ liệu (`data/*.json`)**:
  - `antibiotics.json`: 23 kháng sinh/nhóm thuốc với liều chuẩn/liều cao và nhãn **WHO AWaRe** (`Access`, `Watch`, `Reserve`).
  - `microbes.json`: 18 vi sinh vật gây bệnh trọng điểm với nhãn **WHO BPPL 2024** (`Critical`, `High`, `Medium`), độc tố và xét nghiệm huyết thanh học (Widal, VDRL/RPR/TPHA, ASO, Elek, Ziehl-Neelsen, Optochin...).
  - `quizzes.json` (42 câu hỏi), `cases.json` (10 ca lâm sàng), `mindmaps.json` (5 sơ đồ chuyên đề), `flashcards.json` (12 thẻ tổng hợp + 41 thẻ tự sinh).

## v0.2.0 – Thanh điều hướng nổi, Mind map & Công cụ ôn luyện nâng cao
- Thanh điều hướng nổi có thể thu gọn, nhớ trạng thái.
- Thêm tab Mind map (SVG), Flashcard lặp lại ngắt quãng (Leitner), Thi thử tính giờ, Ôn câu sai, Ca lâm sàng, Ma trận phổ tác dụng, So sánh kháng sinh, Tiến độ & Sao lưu JSON, PWA offline.

## v0.1.0 – Khởi tạo dự án & Custom Theme
- Khung giao diện SPA, tìm kiếm không dấu, chế độ Sáng / Tối / Tùy chỉnh mã màu HEX, giao diện điện thoại & iPad.
