import sys
try:
    import pdfplumber
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "pdfplumber"])
    import pdfplumber

with pdfplumber.open("rapport  site.pdf") as f:
    for i, page in enumerate(f.pages):
        text = page.extract_text()
        if text:
            print(f"=== PAGE {i+1} ===")
            print(text)
