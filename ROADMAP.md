# Lộ trình phát triển (Roadmap)

## Giai đoạn 1 – Khởi tạo & Giao diện cốt lõi ✅
- [x] Khung giao diện SPA, chia thư mục `assets/`, `data/`, `tools/`
- [x] Quản lý dự án bằng hệ thống file `.md`
- [x] Chế độ Sáng / Tối / Tùy chỉnh màu bằng mã HEX (lưu `localStorage`), tối ưu hiển thị cho điện thoại & iPad, cấu hình sẵn sàng cho GitHub Pages

## Giai đoạn 2 – Công cụ học tập nâng cao & Thanh điều hướng nổi ✅
- [x] Thanh điều hướng nổi (Floating Dock) có thể thu gọn / mở rộng
- [x] Sơ đồ tư duy tương tác (Mind map SVG) + tự vẽ từ văn bản thụt lề
- [x] Flashcard lặp lại ngắt quãng (Leitner SRS), Thi thử tính giờ, Ôn câu sai, Ca lâm sàng, Ma trận phổ tác dụng, So sánh kháng sinh, Tiến độ & Sao lưu JSON

## Giai đoạn 3 – Phân tích 5 Tài liệu chuyên khảo & Hoàn thiện chuyên môn ✅
- [x] Phân tích chi tiết 5 tài liệu trong `data/documents/`:
  - Quyết định `1121/QĐ-TTg` (Chiến lược Quốc gia 2023–2030, tầm nhìn 2045)
  - `WHO BPPL 2024` (Danh sách vi khuẩn kháng thuốc ưu tiên của WHO)
  - `IDSA 2024 Guidance` (Phác đồ điều trị nhiễm khuẩn Gram âm đa kháng)
  - `EUCAST v16.1 Breakpoint Tables` (2026)
  - `Giáo trình Vi Sinh Học` – Đào tạo Dược sĩ Đại học (Bộ Y tế)
- [x] Xây dựng tab **🧭 Phác đồ & MIC (`#guidelines`)** gồm:
  - Bộ tra cứu phác đồ & bảng liều truyền kháng sinh người lớn theo **IDSA 2024**
  - Công cụ tính & phiên giải nhanh **MIC (mg/L) / Đường kính đĩa giấy (mm)** theo **EUCAST v16.1** đối chiếu **CLSI 2024**
  - Bảng tổng hợp **WHO BPPL 2024** & **Chiến lược Quốc gia 1121/QĐ-TTg**
- [x] Nâng cấp trang **📚 Tài liệu (`#docs`)** với khung phân tích điểm cốt lõi và **Trình đọc Markdown trực tiếp trong ứng dụng** (có mục lục tự động & tìm kiếm nội văn bản)
- [x] Mở rộng toàn diện cơ sở dữ liệu: 23 kháng sinh (kèm phân loại WHO AWaRe & liều dùng), 18 vi sinh vật (kèm phân loại WHO 2024 & chẩn đoán huyết thanh), 42 câu hỏi trắc nghiệm, 10 ca lâm sàng, 5 sơ đồ Mind map chuyên đề và bộ thẻ Flashcard

## Giai đoạn 4 – Định hướng mở rộng tiếp theo 🔜
- [ ] Công cụ tính chỉnh liều kháng sinh theo độ thanh thải Creatinin (CrCl / eGFR – công thức Cockcroft-Gault)
- [ ] Bổ sung ngân hàng hình ảnh vi sinh (nhuộm Gram, Ziehl-Neelsen, khuẩn lạc trên thạch MacConkey, TCBS, máu) vào `data/images/`
- [ ] Thêm chuyên đề Kháng sinh điều trị nhiễm khuẩn Gram dương đa kháng (MRSA, VRE) và Nấm xâm lấn
