import math
from pathlib import Path


OUT = Path(__file__).parent


def make_obj(path):
    rings, segments = 128, 64
    lines = ["# A clear glass marble with physical internal swirl ribbons", "mtllib marble.mtl", "o Swirl_Marble", "usemtl GlassShell"]
    # Duplicate the seam column so the UV texture wraps cleanly.
    for j in range(segments + 1):
        phi = math.pi * j / segments
        for i in range(rings + 1):
            theta = 2 * math.pi * i / rings
            x = 1.0 * math.sin(phi) * math.cos(theta)
            y = 1.0 * math.sin(phi) * math.sin(theta)
            z = 1.0 * math.cos(phi)
            lines.append(f"v {x:.7f} {y:.7f} {z:.7f}")
    for j in range(segments + 1):
        v = 1 - j / segments
        for i in range(rings + 1):
            lines.append(f"vt {i / rings:.7f} {v:.7f}")
    for j in range(segments):
        for i in range(rings):
            a = j * (rings + 1) + i + 1
            b = a + 1
            c = a + rings + 1
            d = c + 1
            lines.append(f"f {a} {c} {d}")
            lines.append(f"f {a} {d} {b}")
    # Four narrow, twisted ribbons sit inside the transparent shell.
    ribbon_colors = ["SwirlBlue", "SwirlCyan", "SwirlCoral", "SwirlPearl"]
    samples, width, radius = 240, 0.075, 0.29
    for band, material in enumerate(ribbon_colors):
        lines.append(f"usemtl {material}")
        start = (segments + 1) * (rings + 1) + band * (samples + 1) * 2 + 1
        phase = band * math.pi / 2
        for k in range(samples + 1):
            t = k / samples
            theta = 4 * math.pi * t + phase
            z = -0.72 + 1.44 * t
            r = radius + 0.025 * math.sin(2 * theta)
            cx, cy = r * math.cos(theta), r * math.sin(theta)
            nx, ny = math.cos(theta), math.sin(theta)
            lines.append(f"v {cx + width * nx:.7f} {cy + width * ny:.7f} {z:.7f}")
            lines.append(f"v {cx - width * nx:.7f} {cy - width * ny:.7f} {z:.7f}")
        for k in range(samples):
            a = start + k * 2
            b, c, d = a + 1, a + 2, a + 3
            lines.append(f"f {a} {c} {d}")
            lines.append(f"f {a} {d} {b}")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


make_obj(OUT / "swirl_marble.obj")
(OUT / "marble.mtl").write_text(
    "newmtl GlassShell\nKa 0.080 0.100 0.140\nKd 0.520 0.700 0.860\nKs 0.950 0.980 1.000\nNs 220.000\nd 0.18\nTr 0.82\nNi 1.52\nTf 0.86 0.95 1.00\nillum 4\n\n"
    "newmtl SwirlBlue\nKa 0.050 0.080 0.300\nKd 0.060 0.180 0.850\nKs 0.350 0.450 0.900\nNs 80.000\nillum 2\n\n"
    "newmtl SwirlCyan\nKa 0.020 0.200 0.250\nKd 0.050 0.720 0.850\nKs 0.450 0.800 0.900\nNs 80.000\nillum 2\n\n"
    "newmtl SwirlCoral\nKa 0.250 0.040 0.050\nKd 0.950 0.120 0.180\nKs 0.600 0.350 0.350\nNs 80.000\nillum 2\n\n"
    "newmtl SwirlPearl\nKa 0.300 0.320 0.350\nKd 0.920 0.950 1.000\nKs 0.700 0.750 0.850\nNs 100.000\nillum 2\n",
    encoding="utf-8",
)
print("Created swirl_marble.obj and marble.mtl")
