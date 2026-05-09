#!/usr/bin/env python3
"""Genera íconos PNG para PWA usando solo stdlib (sin dependencias)."""
import struct, zlib, math, os

def png(width, height, pixels):
    """Genera un PNG mínimo desde una lista de (r,g,b,a) pixels."""
    def chunk(name, data):
        c = struct.pack('>I', len(data)) + name + data
        return c + struct.pack('>I', zlib.crc32(name + data) & 0xffffffff)

    raw = b''
    for y in range(height):
        raw += b'\x00'
        for x in range(width):
            r, g, b, a = pixels[y * width + x]
            raw += bytes([r, g, b, a])

    ihdr = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    # RGBA
    ihdr = struct.pack('>II', width, height) + bytes([8, 6, 0, 0, 0])
    idat = zlib.compress(raw)

    return (
        b'\x89PNG\r\n\x1a\n'
        + chunk(b'IHDR', ihdr)
        + chunk(b'IDAT', idat)
        + chunk(b'IEND', b'')
    )

def draw_icon(size):
    pixels = [(15, 15, 15, 255)] * (size * size)  # dark bg

    cx, cy = size / 2, size / 2
    rad = size * 0.37
    corner = size * 0.16

    for y in range(size):
        for x in range(size):
            # Rounded corners (background)
            dx = min(x, size - 1 - x)
            dy = min(y, size - 1 - y)
            in_corner = dx < corner and dy < corner
            corner_dist = math.sqrt((dx - corner)**2 + (dy - corner)**2)

            if in_corner and corner_dist > corner:
                pixels[y * size + x] = (0, 0, 0, 0)  # transparent corner
                continue

            # Red circle
            dist = math.sqrt((x - cx)**2 + (y - cy)**2)
            if dist <= rad:
                pixels[y * size + x] = (255, 0, 0, 255)

                # Play triangle (inside circle)
                tx = x - cx
                ty = y - cy
                tw = size * 0.22
                th = size * 0.30
                # Triangle: left edge at -tw*0.3, right tip at +tw*0.7
                left_x = -tw * 0.3
                right_x = tw * 0.7
                top_y = -th / 2
                bot_y = th / 2

                # Point-in-triangle test
                def sign(ax, ay, bx, by, px, py):
                    return (px - bx) * (ay - by) - (ax - bx) * (py - by)

                s1 = sign(left_x, top_y, right_x, 0, tx, ty)
                s2 = sign(right_x, 0, left_x, bot_y, tx, ty)
                s3 = sign(left_x, bot_y, left_x, top_y, tx, ty)

                has_neg = (s1 < 0) or (s2 < 0) or (s3 < 0)
                has_pos = (s1 > 0) or (s2 > 0) or (s3 > 0)

                if not (has_neg and has_pos):
                    pixels[y * size + x] = (255, 255, 255, 255)

    return png(size, size, pixels)

OUT = os.path.join(os.path.dirname(__file__), 'icons')
os.makedirs(OUT, exist_ok=True)

SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512]
for size in SIZES:
    name = 'apple-touch-icon.png' if size == 180 else f'icon-{size}.png'
    data = draw_icon(size)
    with open(os.path.join(OUT, name), 'wb') as f:
        f.write(data)
    print(f'✅ {name} ({size}x{size})')

print('¡Íconos generados!')
