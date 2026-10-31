# 🧫 AntiBio

Website học tập, ôn luyện và tra cứu **Kháng sinh – Vi sinh vật gây bệnh** tích hợp dữ liệu từ 5 tài liệu chuyên khảo:
1. **Quyết định 1121/QĐ-TTg (2023)**: Chiến lược Quốc gia về phòng, chống kháng thuốc tại Việt Nam giai đoạn 2023–2030, tầm nhìn 2045.
2. **WHO BPPL 2024**: Danh sách Vi khuẩn Kháng thuốc Ưu tiên của Tổ chức Y tế Thế giới (Critical, High, Medium).
3. **IDSA 2024 Guidance**: Hướng dẫn điều trị nhiễm khuẩn Gram âm kháng thuốc (ESBL-E, AmpC-E, CRE, DTR *P. aeruginosa*, CRAB, *S. maltophilia*).
4. **EUCAST Clinical Breakpoints v16.1 (2026)**: Bảng chuẩn phiên giải giá trị MIC (mg/L) và đường kính vòng vô khuẩn (mm), liều chuẩn vs liều cao.
5. **Giáo trình Vi Sinh Học – Đào tạo Dược sĩ Đại học (Bộ Y tế)**: Đại cương, miễn dịch – huyết thanh học, cơ chế đề kháng và các vi sinh vật gây bệnh.

## Chạy thử
Trang dùng `fetch` đọc JSON và tài liệu Markdown nên cần chạy qua server cục bộ:

```powershell
python -m http.server 8000
# mở http://localhost:8000
```

## Deploy lên GitHub Pages
1. Push toàn bộ thư mục lên một repo GitHub (nhánh `main`).
2. Vào **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`** → Save.
3. Truy cập `https://<user>.github.io/<repo>/`.

Mọi đường dẫn đều là đường dẫn tương đối nên chạy được trong thư mục con của repo. File `.nojekyll` giúp GitHub Pages phục vụ nguyên trạng các file tĩnh.

## Tính năng chính
- **Thanh điều hướng nổi (Floating Dock)**: Dọc bên trái trên máy tính, thanh đáy trên iPad/điện thoại, thu gọn/mở rộng và tự nhớ trạng thái.
- **💊 Kháng sinh (23 nhóm/thuốc chủ chốt)**: Tra cứu cơ chế, phổ, chỉ định, liều chuẩn & liều đa kháng (IDSA 2024 / EUCAST v16.1), phân loại **WHO AWaRe** (`Access`, `Watch`, `Reserve`).
- **🦠 Vi sinh vật (18 họ/loài trọng điểm)**: Hình thái Gram, độc tố, chẩn đoán vi sinh & huyết thanh học (Widal, VDRL/RPR, TPHA, ASO, Elek, Ziehl-Neelsen, Optochin...), cơ chế kháng thuốc và phân tầng **WHO BPPL 2024** (`Critical`, `High`, `Medium`).
- **🧭 Phác đồ & MIC (`#guidelines`)**:
  - **Phác đồ IDSA 2024**: Tra cứu phác đồ Ưu tiên / Thay thế và Bảng liều truyền người lớn (Table 1) cho 6 nhóm Gram âm đa kháng.
  - **Công cụ Phiên giải MIC & Đĩa giấy EUCAST v16.1**: Nhập MIC (mg/L) hoặc đường kính vòng vô khuẩn (mm) để tự động phiên giải `S / I / R / ATU` (bao gồm quy tắc `S ≤ 0.001 mg/L`) kèm đối chiếu CLSI 2024.
  - **Tổng hợp WHO BPPL 2024 & Chiến lược Quốc gia 1121/QĐ-TTg**.
- **📊 Phổ tác dụng & ⚖️ So sánh kháng sinh**: Ma trận `S / I / R` trực quan và bảng đặt 2–4 kháng sinh cạnh nhau.
- **🧠 Mind map tương tác (SVG)**: Kéo, zoom, thu/mở nhánh, gồm 2 sơ đồ tự sinh từ dữ liệu + 5 sơ đồ chuyên đề (IDSA 2024, WHO 2024, Cơ chế đề kháng, QĐ 1121/QĐ-TTg, Chẩn đoán vi sinh) + trình vẽ Mind map cá nhân.
- **🗂️ Flashcard (Leitner SRS), 📝 Ôn luyện / Thi thử (42 câu) & 🩺 Ca lâm sàng (10 ca)**.
- **📚 Thư viện Tài liệu kèm Trình đọc Markdown trực tiếp**: Xem tóm tắt phân tích chuyên sâu, mục lục tự động và tìm kiếm từ khóa ngay trong nội dung 5 file tài liệu gốc.
- **🎨 Custom Theme (Sáng / Tối / Dán mã màu HEX)** & **📈 Tiến độ + Sao lưu/Khôi phục JSON**.

## Cấu trúc thư mục
```
Antibio/
├─ index.html              # Giao diện chính (SPA, hash routing)
├─ manifest.webmanifest    # PWA
├─ sw.js                   # Service worker (offline cache v3)
├─ .nojekyll
├─ assets/
│  ├─ css/style.css
│  ├─ icon.svg
│  └─ js/                  # core, theme, browse, study, mindmap, tools, main
├─ data/                   # ⭐ NƠI CẬP NHẬT DỮ LIỆU
│  ├─ antibiotics.json     # Kháng sinh (kèm liều dùng & WHO AWaRe)
│  ├─ microbes.json        # Vi sinh vật (kèm phân loại WHO BPPL 2024)
│  ├─ guidelines.json      # Phác đồ IDSA 2024, Breakpoint EUCAST v16.1, WHO & QĐ 1121
│  ├─ spectrum.json        # Phổ tác dụng (kháng sinh × vi sinh vật)
│  ├─ quizzes.json         # 42 câu hỏi ôn luyện đa chủ đề
│  ├─ cases.json           # 10 ca lâm sàng thực hành
│  ├─ flashcards.json      # Thẻ chuyên đề tự tạo
│  ├─ mindmaps.json        # 5 sơ đồ tư duy chuyên đề
│  ├─ documents.json       # Danh mục & phân tích 5 tài liệu gốc
│  ├─ documents/           # 5 file tài liệu (.md)
│  └─ images/              # Hình ảnh minh họa
├─ tools/csv_to_json.py    # Chuyển CSV (Excel) sang JSON
└─ README.md  PROJECT.md  ROADMAP.md  DATA_GUIDE.md  CHANGELOG.md
```
