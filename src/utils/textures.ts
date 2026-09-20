import * as THREE from 'three';

// Generates crisp procedural canvas textures for each category artifact
export function createReceiptTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Paper background with subtle warmth
  ctx.fillStyle = '#faf8f2';
  ctx.fillRect(0, 0, 512, 1024);

  // Micro paper grain / noise
  ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
  for (let i = 0; i < 600; i++) {
    ctx.fillRect(Math.random() * 512, Math.random() * 1024, 2, 2);
  }

  // Header
  ctx.fillStyle = '#111215';
  ctx.font = 'bold 26px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('*** KIOSK ARCHIVE ***', 256, 70);
  ctx.font = '16px "JetBrains Mono", monospace';
  ctx.fillText('TRACE ID #8841-902', 256, 105);
  ctx.fillText('DATE: 14 OCT // 08:42 AM', 256, 130);

  // Divider dashed line
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = '#222328';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(32, 160);
  ctx.lineTo(480, 160);
  ctx.stroke();

  // Receipt Items
  ctx.setLineDash([]);
  ctx.textAlign = 'left';
  ctx.font = '500 18px "JetBrains Mono", monospace';

  const items = [
    { qty: '1', name: 'Oat Milk Flat White', price: '$5.50' },
    { qty: '1', name: 'Cinnamon Morning Roll', price: '$4.25' },
    { qty: '1', name: 'Used Paperback (Poetry)', price: '$8.00' },
    { qty: '1', name: 'Metro Day Pass', price: '$3.00' },
    { qty: '1', name: 'Vintage Postcard #12', price: '$2.50' },
  ];

  let y = 210;
  items.forEach((item) => {
    ctx.fillText(`${item.qty}x ${item.name}`, 36, y);
    ctx.textAlign = 'right';
    ctx.fillText(item.price, 476, y);
    ctx.textAlign = 'left';
    y += 45;
  });

  // Second divider
  ctx.setLineDash([6, 6]);
  ctx.beginPath();
  ctx.moveTo(32, y + 20);
  ctx.lineTo(480, y + 20);
  ctx.stroke();

  // Subtotal & Total
  y += 65;
  ctx.setLineDash([]);
  ctx.font = '16px "JetBrains Mono", monospace';
  ctx.fillText('SUBTOTAL', 36, y);
  ctx.textAlign = 'right';
  ctx.fillText('$23.25', 476, y);

  y += 35;
  ctx.textAlign = 'left';
  ctx.fillText('TAX (8.875%)', 36, y);
  ctx.textAlign = 'right';
  ctx.fillText('$2.06', 476, y);

  y += 45;
  ctx.font = 'bold 24px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('TOTAL PAID', 36, y);
  ctx.textAlign = 'right';
  ctx.fillText('$25.31', 476, y);

  // Card info
  y += 60;
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PAYMENT METHOD: CONTACTLESS (•• 9812)', 256, y);
  ctx.fillText('AUTH CODE: 489201 // APPROVED', 256, y + 26);

  // Barcode
  y += 85;
  ctx.fillStyle = '#111215';
  for (let x = 60; x < 452; ) {
    const width = (x % 5 === 0 ? 4 : (x % 3 === 0 ? 2 : 1));
    ctx.fillRect(x, y, width, 55);
    x += width + Math.floor(Math.random() * 4 + 2);
  }

  y += 80;
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillText('0 18274 99018 4', 256, y);

  // Footer message
  y += 45;
  ctx.font = 'italic 16px "Cormorant Garamond", serif';
  ctx.fillText('“A cup of coffee, a quiet morning, a remembered day.”', 256, y);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createPolaroidTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 620;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // White border
  ctx.fillStyle = '#f6f4ee';
  ctx.fillRect(0, 0, 512, 620);

  // Photo frame inner
  const px = 36;
  const py = 36;
  const pw = 440;
  const ph = 440;

  // Sky / sunset gradient
  const grad = ctx.createLinearGradient(px, py, px, py + ph);
  grad.addColorStop(0, '#ff7e5f');
  grad.addColorStop(0.4, '#feb47b');
  grad.addColorStop(0.8, '#834d9b');
  grad.addColorStop(1, '#24243e');
  ctx.fillStyle = grad;
  ctx.fillRect(px, py, pw, ph);

  // Sun disc
  ctx.fillStyle = '#fff4e0';
  ctx.beginPath();
  ctx.arc(px + pw * 0.5, py + ph * 0.45, 45, 0, Math.PI * 2);
  ctx.fill();

  // Distant hill silhouette
  ctx.fillStyle = 'rgba(30, 20, 50, 0.7)';
  ctx.beginPath();
  ctx.moveTo(px, py + ph);
  ctx.quadraticCurveTo(px + pw * 0.3, py + ph * 0.7, px + pw * 0.6, py + ph * 0.85);
  ctx.quadraticCurveTo(px + pw * 0.8, py + ph * 0.95, px + pw, py + ph * 0.75);
  ctx.lineTo(px + pw, py + ph);
  ctx.closePath();
  ctx.fill();

  // Hand-written label on bottom border
  ctx.fillStyle = '#33353b';
  ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('Golden Hour on the Roof, 19:42', 256, 555);

  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#777982';
  ctx.fillText('35mm • ISO 400 • F/2.8', 256, 585);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createVinylTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Black vinyl disc
  ctx.fillStyle = '#121316';
  ctx.beginPath();
  ctx.arc(256, 256, 250, 0, Math.PI * 2);
  ctx.fill();

  // Grooves (concentric subtle circles)
  ctx.strokeStyle = '#1e2025';
  ctx.lineWidth = 1.5;
  for (let r = 110; r < 245; r += 4) {
    ctx.beginPath();
    ctx.arc(256, 256, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Center label (Amber/Gold record sticker)
  ctx.fillStyle = '#d4af37';
  ctx.beginPath();
  ctx.arc(256, 256, 95, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#151518';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('SIDE A // 33 RPM', 256, 220);
  ctx.font = 'bold 18px "Cormorant Garamond", serif';
  ctx.fillText('MIDNIGHT DRIFT', 256, 250);
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillText('PLAYED 42 TIMES', 256, 280);

  // Center spindle hole
  ctx.fillStyle = '#08090b';
  ctx.beginPath();
  ctx.arc(256, 256, 16, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createTicketTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 280;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Dark slate luxury ticket background
  ctx.fillStyle = '#1a1c23';
  ctx.fillRect(0, 0, 600, 280);

  // Gold foil border
  ctx.strokeStyle = '#c5a059';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, 576, 256);

  // Stub perforation line
  ctx.setLineDash([8, 8]);
  ctx.beginPath();
  ctx.moveTo(440, 12);
  ctx.lineTo(440, 268);
  ctx.stroke();

  // Left Content
  ctx.setLineDash([]);
  ctx.fillStyle = '#c5a059';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('ADMIT ONE // ARCHIVE EXHIBIT', 36, 46);

  ctx.fillStyle = '#ffffff';
  ctx.font = '600 32px "Cormorant Garamond", serif';
  ctx.fillText('ECHOES OF THE EPHEMERAL', 36, 90);

  ctx.fillStyle = '#a1a6b4';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('VENUE: GRAND PAVILION, HALL 4', 36, 130);
  ctx.fillText('ROW 12 • SEAT 4B • ADULT TICKET', 36, 160);
  ctx.fillText('FRIDAY NOV 17 • 20:00 EST', 36, 190);

  // Price tag badge
  ctx.fillStyle = 'rgba(197, 160, 89, 0.15)';
  ctx.fillRect(36, 215, 90, 32);
  ctx.fillStyle = '#c5a059';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillText('$45.00', 48, 238);

  // Right Stub Content
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText('STUB #904', 520, 55);
  ctx.font = '12px "JetBrains Mono", monospace';
  ctx.fillStyle = '#a1a6b4';
  ctx.fillText('SEC 12', 520, 100);
  ctx.fillText('SEAT 4B', 520, 130);

  // Mini QR code block on stub
  ctx.fillStyle = '#c5a059';
  ctx.fillRect(490, 165, 60, 60);
  ctx.fillStyle = '#1a1c23';
  ctx.fillRect(500, 175, 40, 40);
  ctx.fillStyle = '#c5a059';
  ctx.fillRect(512, 187, 16, 16);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createBoardingPassTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 620;
  canvas.height = 260;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Clean sky blue / cream card
  ctx.fillStyle = '#f4f6f9';
  ctx.fillRect(0, 0, 620, 260);

  // Header band
  ctx.fillStyle = '#1e3a8a';
  ctx.fillRect(0, 0, 620, 48);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('AEROSPACE ARCHIVES // BOARDING PASS', 24, 32);

  // Flight Route
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 44px "JetBrains Mono", monospace';
  ctx.fillText('JFK', 36, 115);
  ctx.font = '24px "JetBrains Mono", monospace';
  ctx.fillStyle = '#64748b';
  ctx.fillText('➔', 140, 105);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 44px "JetBrains Mono", monospace';
  ctx.fillText('HND', 310, 115);

  // Details
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#64748b';
  ctx.fillText('FLIGHT: JL 005', 36, 165);
  ctx.fillText('GATE: 34B', 150, 165);
  ctx.fillText('BOARDING: 11:30', 250, 165);
  ctx.fillText('SEAT: 18K (WINDOW)', 36, 205);
  ctx.fillText('COORDINATES: 35.5494° N, 139.7798° E', 36, 235);

  // Perforated Stub
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = '#94a3b8';
  ctx.beginPath();
  ctx.moveTo(460, 0);
  ctx.lineTo(460, 260);
  ctx.stroke();

  // Stub
  ctx.setLineDash([]);
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('JFK > HND', 485, 95);
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#64748b';
  ctx.fillText('SEAT 18K', 485, 140);
  ctx.fillText('ZONE 2', 485, 175);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createMessageBubbleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Dark slate card
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.roundRect(10, 10, 492, 236, 24);
  ctx.fill();

  // Border
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Sender info
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 15px "JetBrains Mono", monospace';
  ctx.fillText('INCOMING TRANSMISSION // 23:48', 36, 52);

  // Message body
  ctx.fillStyle = '#f8fafc';
  ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('“Are you here yet? Look up at', 36, 110);
  ctx.fillText('the rooftop when you arrive.”', 36, 145);

  // Timestamp & delivery check
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('Delivered • Read 23:49 ✓✓', 36, 200);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createSearchPillTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 140;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Frosted pill capsule
  ctx.fillStyle = '#171921';
  ctx.beginPath();
  ctx.roundRect(8, 8, 496, 124, 62);
  ctx.fill();
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Search icon magnifying ring
  ctx.strokeStyle = '#a5b4fc';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(60, 70, 16, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(72, 82);
  ctx.lineTo(84, 94);
  ctx.stroke();

  // Query text
  ctx.fillStyle = '#ffffff';
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('how long does memory take to fade', 105, 77);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createStickyNoteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Warm amber note background
  ctx.fillStyle = '#fef08a';
  ctx.fillRect(0, 0, 400, 400);

  // Shadow at top glue strip
  ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
  ctx.fillRect(0, 0, 400, 48);

  // Hand-written lines
  ctx.fillStyle = '#1c1917';
  ctx.font = '600 22px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('NOTES TO SELF:', 32, 90);
  ctx.font = '20px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('• Buy 35mm film rolls', 32, 140);
  ctx.fillText('• Keep coffee receipt in coat pocket', 32, 185);
  ctx.fillText('• Call Grandma on Sunday', 32, 230);
  ctx.fillText('“We keep moments by keeping', 32, 290);
  ctx.fillText('    their paper shadows.”', 32, 325);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createCinemaTicketTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 280;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Deep ruby / midnight noir ticket
  ctx.fillStyle = '#221118';
  ctx.fillRect(0, 0, 600, 280);

  // Film sprocket border top and bottom
  ctx.fillStyle = '#ffffff';
  for (let x = 20; x < 580; x += 32) {
    ctx.fillRect(x, 10, 14, 10);
    ctx.fillRect(x, 260, 14, 10);
  }

  // Header
  ctx.fillStyle = '#e11d48';
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('CINÉMATHÈQUE // MIDNIGHT 35MM REEL', 32, 50);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 30px "Cormorant Garamond", serif';
  ctx.fillText('IN THE MOOD FOR LOVE', 32, 95);

  // Info
  ctx.fillStyle = '#fda4af';
  ctx.font = '14px "JetBrains Mono", monospace';
  ctx.fillText('AUDITORIUM 03 • ROW F • SEAT 14', 32, 135);
  ctx.fillText('SATURDAY 23:15 • 35MM ARCHIVAL PRINT', 32, 165);

  // Perforated line for stub
  ctx.setLineDash([6, 6]);
  ctx.strokeStyle = '#fda4af';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(430, 25);
  ctx.lineTo(430, 255);
  ctx.stroke();

  // Stub
  ctx.setLineDash([]);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.fillText('TICKET #9802', 450, 75);
  ctx.font = '13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#fda4af';
  ctx.fillText('ADMIT 1', 450, 115);
  ctx.fillText('$16.50', 450, 150);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
