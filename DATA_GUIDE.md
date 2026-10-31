# Hướng dẫn cập nhật dữ liệu (`data/*.json`)

Chỉ cần chỉnh sửa các file JSON trong thư mục `data/`, giao diện sẽ tự động cập nhật khi tải lại trang.

## 1. `data/antibiotics.json`
```json
{
  "id": "meropenem",
  "name": "Meropenem",
  "class": "Carbapenem",
  "aware": "Watch",
  "brandNames": ["Meronem"],
  "mechanism": "Gắn PBP ức chế tổng hợp peptidoglycan...",
  "spectrum": "Enterobacterales (ESBL, AmpC), P. aeruginosa, kỵ khí...",
  "indications": ["Nhiễm khuẩn huyết do ESBL-E..."],
  "dosing": "Liều chuẩn: 1g IV mỗi 8h (truyền 30p); Liều cao (CRE/I): 2g IV mỗi 8h truyền kéo dài 3h.",
  "sideEffects": ["Tiêu chảy", "Giảm nồng độ acid valproic"],
  "contraindications": ["Quá mẫn nặng với carbapenem"],
  "notes": "Ghi chú lâm sàng theo IDSA 2024 / EUCAST v16.1..."
}
```
- Trường `aware` nhận một trong 3 giá trị của WHO: `"Access"`, `"Watch"`, hoặc `"Reserve"`.

## 2. `data/microbes.json`
```json
{
  "id": "k-pneumoniae",
  "name": "Klebsiella pneumoniae",
  "commonName": "Trực khuẩn phổi Friedländer (ESBL / CRE)",
  "gram": "Gram âm",
  "shape": "Trực khuẩn",
  "whoPriority": "Critical (Nguy cấp)",
  "diseases": ["Viêm phổi bệnh viện", "cUTI", "Áp xe gan"],
  "characteristics": "Trực khuẩn Gram âm không di động, có vỏ dày...",
  "antibioticIds": ["meropenem", "ceftazidime-avibactam"],
  "resistance": "Cơ chế đề kháng ESBL, KPC, NDM, OXA-48...",
  "notes": "Lưu ý chẩn đoán & phác đồ điều trị..."
}
```

## 3. `data/guidelines.json`
Chứa dữ liệu cho tab **🧭 Phác đồ & MIC (`#guidelines`)**, gồm 4 khóa chính:
- `idsaRegimens`: Danh sách phác đồ ưu tiên (`preferred`), thay thế (`alternative`) và lưu ý (`pearls`) theo từng nhóm vi khuẩn (`group`) và hội chứng (`syndrome`).
- `idsaDosing`: Bảng liều dùng người lớn và thời gian truyền (`drug`, `cystitis`, `systemic`, `infusion`, `targets`).
- `breakpoints`: Bảng ngưỡng EUCAST v16.1 & CLSI 2024 (`group`, `antibiotic`, `micS`, `micR`, `zoneS`, `zoneR`, `atuMic`, `atuZone`, `clsiS`, `stdDose`, `highDose`, `note`).
- `whoBppl2024` & `vnStrategy1121`: Dữ liệu phân nhóm ưu tiên của WHO 2024 và Chiến lược Quốc gia 1121/QĐ-TTg.

## 4. `data/spectrum.json`
```json
{ "antibioticId": "meropenem", "microbeId": "e-coli", "activity": "S" }
```
- `activity`: `"S"` (Nhạy liều chuẩn), `"I"` (Nhạy khi tăng phơi nhiễm / Thay đổi), `"R"` (Kháng).

## 5. `data/quizzes.json` & `data/cases.json`
- Câu hỏi trắc nghiệm và ca lâm sàng có chỉ số đáp án đúng `answer` tính từ `0` (`0` = A, `1` = B, `2` = C, `3` = D) kèm giải thích chi tiết `explanation`.

## 6. `data/documents.json`
Khai báo các tài liệu trong `data/documents/`:
```json
{
  "id": "doc-idsa-2024",
  "title": "IDSA 2024 Guidance...",
  "category": "Phác đồ điều trị Lâm sàng (IDSA)",
  "source": "IDSA (2024)",
  "file": "data/documents/gram_negative.md",
  "description": "Mô tả tổng quan...",
  "highlights": ["Điểm cốt lõi 1...", "Điểm cốt lõi 2..."]
}
```
