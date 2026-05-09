// Genera íconos PNG para PWA usando Canvas API de Node.js
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const SIZES = [72, 96, 128, 144, 152, 180, 192, 384, 512];
const OUT = path.join(__dirname, 'icons');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const r = size * 0.16;

  // Rounded background
  ctx.fillStyle = '#0f0f0f';
  ctx.beginPath();
  ctx.moveTo(r, 0);
  ctx.lineTo(size - r, 0);
  ctx.quadraticCurveTo(size, 0, size, r);
  ctx.lineTo(size, size - r);
  ctx.quadraticCurveTo(size, size, size - r, size);
  ctx.lineTo(r, size);
  ctx.quadraticCurveTo(0, size, 0, size - r);
  ctx.lineTo(0, r);
  ctx.quadraticCurveTo(0, 0, r, 0);
  ctx.closePath();
  ctx.fill();

  // Red circle
  ctx.fillStyle = '#FF0000';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.37, 0, Math.PI * 2);
  ctx.fill();

  // White play triangle
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  const cx = size / 2, cy = size / 2;
  const w = size * 0.22, h = size * 0.30;
  ctx.moveTo(cx - w * 0.3, cy - h / 2);
  ctx.lineTo(cx + w * 0.7, cy);
  ctx.lineTo(cx - w * 0.3, cy + h / 2);
  ctx.closePath();
  ctx.fill();

  return canvas;
}

SIZES.forEach(size => {
  const canvas = drawIcon(size);
  const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
  fs.writeFileSync(path.join(OUT, name), canvas.toBuffer('image/png'));
  console.log(`✅ ${name}`);
});
console.log('Done!');
