#!/usr/bin/env python3
"""
Đóng gói toàn bộ dữ liệu từ data/*.json vào file data/bundle.js
để trang web hoạt động 100% cả khi mở trực tiếp bằng file://
(double-click vào index.html không cần chạy server) lẫn khi chạy trên GitHub Pages / localhost.

Cách chạy mỗi khi bạn sửa file trong data/:
  python tools/build_bundle.py
"""
import json
import pathlib
import sys

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
OUT_FILE = DATA_DIR / "bundle.js"

JSON_KEYS = [
    "antibiotics",
    "microbes",
    "quizzes",
    "spectrum",
    "cases",
    "mindmaps",
    "flashcards",
    "guidelines",
]


def main():
    bundle = {"data": {}}
    for k in JSON_KEYS:
        p = DATA_DIR / f"{k}.json"
        if p.exists():
            bundle["data"][k] = json.loads(p.read_text(encoding="utf-8"))

    js_content = (
        "// File tự động sinh bởi tools/build_bundle.py — giúp mở trực tiếp index.html (file://) không bị lỗi CORS\n"
        "window.ANTIBIO_BUNDLE = "
        + json.dumps(bundle, ensure_ascii=False)
        + ";\n"
    )
    OUT_FILE.write_text(js_content, encoding="utf-8")
    print(f"Đã tạo {OUT_FILE} ({OUT_FILE.stat().st_size / 1024:.1f} KB)")


if __name__ == "__main__":
    main()
