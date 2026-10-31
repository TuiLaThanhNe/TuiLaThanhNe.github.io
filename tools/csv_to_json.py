"""Chuyển CSV (xuất từ Excel, UTF-8) sang JSON cho thư mục data/.

Cách dùng:
    python tools/csv_to_json.py nguon.csv data/antibiotics.json

- Dòng đầu là tên cột (trùng tên trường JSON, xem DATA_GUIDE.md).
- Các cột dạng danh sách (brandNames, indications, sideEffects, contraindications,
  diseases, antibioticIds) phân cách các phần tử bằng dấu ';'.
- Cột 'answer' được đổi thành số; cột 'options' phân cách bằng ';'.
"""
import csv, json, sys

LIST_FIELDS = {"brandNames", "indications", "sideEffects", "contraindications", "diseases", "antibioticIds", "options"}


def convert(src, dst):
    with open(src, encoding="utf-8-sig", newline="") as f:
        rows = []
        for r in csv.DictReader(f):
            item = {}
            for k, v in r.items():
                v = (v or "").strip()
                if k in LIST_FIELDS:
                    item[k] = [x.strip() for x in v.split(";") if x.strip()]
                elif k == "answer":
                    item[k] = int(v or 0)
                else:
                    item[k] = v
            rows.append(item)
    with open(dst, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
    print(f"Đã ghi {len(rows)} dòng vào {dst}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    convert(sys.argv[1], sys.argv[2])
