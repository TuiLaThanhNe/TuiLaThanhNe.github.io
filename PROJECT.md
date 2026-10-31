# Tổng quan dự án

## Mục tiêu
Xây dựng nền tảng web học tập, tra cứu lâm sàng và ôn luyện chuyên sâu về **Kháng sinh – Vi sinh vật gây bệnh – Kháng sinh đồ**, phục vụ sinh viên Y/Dược/Xét nghiệm và nhân viên y tế.

## Nguồn dữ liệu chính thống đã tích hợp
1. **Quyết định 1121/QĐ-TTg (25/09/2023)**: Chiến lược Quốc gia về phòng, chống kháng thuốc tại Việt Nam giai đoạn 2023–2030, tầm nhìn đến năm 2045.
2. **WHO Bacterial Priority Pathogens List, 2024 (BPPL 2024)**: Danh sách 24 cặp vi khuẩn–kháng thuốc thuộc 15 họ tác nhân ưu tiên của WHO.
3. **IDSA 2024 Guidance**: Hướng dẫn điều trị nhiễm khuẩn Gram âm kháng thuốc (ESBL-E, AmpC-E, CRE, DTR *P. aeruginosa*, CRAB, *S. maltophilia*).
4. **EUCAST Clinical Breakpoint Tables v16.1 (2026)**: Bảng tiêu chuẩn phiên giải MIC và đường kính vòng vô khuẩn khuếch tán đĩa giấy.
5. **Giáo trình Vi Sinh Học – Đào tạo Dược sĩ Đại học (Bộ Y tế, 2006)**: 15 bài từ đại cương, miễn dịch huyết thanh học, đề kháng kháng sinh đến vi sinh vật gây bệnh.

## Kiến trúc & Công nghệ
- **Frontend thuần (Vanilla HTML5 + CSS3 + ES6 JavaScript)**: Nhẹ, tốc độ phản hồi tức thì, không phụ thuộc framework ngoài, dễ bảo trì và triển khai miễn phí trên GitHub Pages.
- **PWA Offline-first**: Tích hợp `manifest.webmanifest` và `sw.js` giúp tra cứu cả khi mất kết nối mạng.
- **Dữ liệu tách biệt (`data/*.json`)**: Toàn bộ kiến thức chuyên môn nằm trong các file JSON chuẩn hóa UTF-8.
