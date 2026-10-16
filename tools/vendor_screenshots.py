#!/usr/bin/env python3
"""Download the three project screenshots into assets/ and verify them.

Standard library only. Run once from the site root before publishing:
    python3 tools/vendor_screenshots.py
The files come from Sashank Kuraganti's own public repositories.
"""
import hashlib
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://raw.githubusercontent.com/skuraganti"
FILES = {
    "relay-demo.png": ("data-pipeline-monitor", "b1f0897087a6e0870b62aae1d3506984a4ac63f3a962996b70f88b110cbacc42"),
    "folio-demo.png": ("private-ai-knowledge-engine", "af33e7c26509e73999fa80ef2ea10fd7f97c53943ece08c079fbabede6c86ae7"),
    "contour-demo.png": ("ai-codebase-explorer", "68938a29c95482489a6e3337f7360c95c8450d0be09c8b440d245b0a7c7ef528"),
}
REVISIONS = {'data-pipeline-monitor': '36bdfc5fce881f6f033c7c4a468459979226350b', 'private-ai-knowledge-engine': '077e593f0ecdb95c72ae672ec8bdfd3b7165ae30', 'ai-codebase-explorer': 'b6e174d455781b2058a116f2f19fb2b67bd5949f'}
MAX_BYTES = 2_000_000


def main():
    bad = 0
    for name, (repo, expected) in FILES.items():
        dest = ROOT / "assets" / name
        url = f"{BASE}/{repo}/{REVISIONS[repo]}/assets/{name}"
        with urllib.request.urlopen(url, timeout=30) as r:
            data = r.read(MAX_BYTES + 1)
        if len(data) > MAX_BYTES or not data.startswith(b"\x89PNG\r\n\x1a\n"):
            print(f"FAIL {name}: not a PNG under {MAX_BYTES} bytes")
            bad += 1
            continue
        got = hashlib.sha256(data).hexdigest()
        if got != expected:
            print(f"FAIL {name}: sha256 {got} != pinned {expected} (upstream changed; review it, then update the pin)")
            bad += 1
            continue
        dest.write_bytes(data)
        print(f"OK   {name} {len(data)} bytes")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
