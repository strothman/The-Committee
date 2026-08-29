// ============================================================
// artgen.js — Generative Art Engine for The Committee
// Each visual archetype creates actual canvas-based artwork
// ============================================================

const ArtEngine = (() => {

  let activeAnimation = null;

  function stopAnimation() {
    if (activeAnimation) {
      cancelAnimationFrame(activeAnimation);
      activeAnimation = null;
    }
  }

  /**
   * Generate art on a canvas based on a module's personality.
   * Art is drawn progressively (animated) for dramatic effect.
   * @param {HTMLCanvasElement} canvas
   * @param {object} module
   * @returns {object} metadata about what was generated
   */
  function generate(canvas, module) {
    stopAnimation();
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const personality = module.personality;
    const hue = module.visual.hue;
    const sat = module.visual.saturation;
    const light = module.visual.lightness;

    // Clear
    ctx.fillStyle = `hsl(${hue}, ${Math.max(sat - 40, 5)}%, ${Math.max(light - 30, 3)}%)`;
    ctx.fillRect(0, 0, w, h);

    const creativity = personality[0];
    const chaos = personality[1];
    const structure = personality[2];
    const emotion = personality[3];
    const logic = personality[4];

    // Choose art style based on personality
    if (structure > 0.6 && logic > 0.5) {
      return drawGeometric(ctx, w, h, hue, sat, light, personality);
    } else if (chaos > 0.6) {
      return drawGlitchArt(ctx, w, h, hue, sat, light, personality);
    } else if (emotion > 0.6 && creativity > 0.5) {
      return drawFlowField(ctx, w, h, hue, sat, light, personality);
    } else if (creativity > 0.7) {
      return drawParticleExplosion(ctx, w, h, hue, sat, light, personality);
    } else if (emotion > 0.5) {
      return drawWatercolor(ctx, w, h, hue, sat, light, personality);
    } else if (structure > 0.5) {
      return drawCellularAutomata(ctx, w, h, hue, sat, light, personality);
    } else {
      return drawAbstract(ctx, w, h, hue, sat, light, personality);
    }
  }

  // ── Flow Field ─────────────────────────────────────────────
  function drawFlowField(ctx, w, h, hue, sat, light, personality) {
    const resolution = 15;
    const cols = Math.ceil(w / resolution);
    const rows = Math.ceil(h / resolution);
    const noiseScale = 0.005 + personality[1] * 0.01;
    const time = Math.random() * 1000;

    // Simple noise function (not Perlin but good enough)
    function noise(x, y) {
      return Math.sin(x * noiseScale * 3 + time) *
             Math.cos(y * noiseScale * 2.7 + time * 0.7) *
             Math.sin((x + y) * noiseScale * 1.5);
    }

    // Create flow field
    const field = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const angle = noise(x * resolution, y * resolution) * Math.PI * 2;
        field.push(angle);
      }
    }

    // Draw particles following the field
    const particleCount = 800 + Math.floor(personality[0] * 600);
    ctx.globalAlpha = 0.6;

    for (let i = 0; i < particleCount; i++) {
      let px = Math.random() * w;
      let py = Math.random() * h;
      const steps = 30 + Math.floor(Math.random() * 50);
      const hueShift = (hue + Math.random() * 60 - 30) % 360;
      const lineLight = light + Math.random() * 30;

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.strokeStyle = `hsla(${hueShift}, ${sat}%, ${lineLight}%, ${0.1 + Math.random() * 0.15})`;
      ctx.lineWidth = 0.5 + Math.random() * 1.5;

      for (let s = 0; s < steps; s++) {
        const col = Math.floor(px / resolution);
        const row = Math.floor(py / resolution);
        if (col >= 0 && col < cols && row >= 0 && row < rows) {
          const angle = field[row * cols + col];
          px += Math.cos(angle) * 2;
          py += Math.sin(angle) * 2;
          ctx.lineTo(px, py);
        } else break;
      }
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    return { type: 'art', style: 'flow field', particles: particleCount, description: 'organic flow field painting' };
  }

  // ── Particle Explosion ─────────────────────────────────────
  function drawParticleExplosion(ctx, w, h, hue, sat, light, personality) {
    const cx = w / 2 + (Math.random() - 0.5) * w * 0.3;
    const cy = h / 2 + (Math.random() - 0.5) * h * 0.3;
    const count = 500 + Math.floor(personality[0] * 1000);
    const bursts = 1 + Math.floor(Math.random() * 3);

    for (let b = 0; b < bursts; b++) {
      const bx = b === 0 ? cx : Math.random() * w;
      const by = b === 0 ? cy : Math.random() * h;
      const burstHue = (hue + b * 40 + Math.random() * 30) % 360;

      for (let i = 0; i < count / bursts; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * Math.random() * Math.max(w, h) * 0.4;
        const px = bx + Math.cos(angle) * speed;
        const py = by + Math.sin(angle) * speed;
        const size = 1 + Math.random() * 4;
        const alpha = 0.1 + Math.random() * 0.6 * (1 - speed / (Math.max(w, h) * 0.4));
        const particleLight = light + Math.random() * 30;

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${burstHue + Math.random() * 20}, ${sat}%, ${particleLight}%, ${alpha})`;
        ctx.fill();
      }
    }

    return { type: 'art', style: 'particle explosion', particles: count, description: `${bursts} burst particle explosion` };
  }

  // ── Geometric Construction ─────────────────────────────────
  function drawGeometric(ctx, w, h, hue, sat, light, personality) {
    const shapes = 20 + Math.floor(personality[2] * 30);
    const symmetry = Math.random() < personality[2] ? Math.floor(2 + Math.random() * 6) : 1;

    for (let i = 0; i < shapes; i++) {
      const shapeHue = (hue + i * (360 / shapes)) % 360;
      ctx.save();
      ctx.translate(w / 2, h / 2);

      for (let s = 0; s < symmetry; s++) {
        ctx.rotate((Math.PI * 2 / symmetry));
        const x = (Math.random() - 0.5) * w * 0.7;
        const y = (Math.random() - 0.5) * h * 0.7;
        const size = 10 + Math.random() * 60;

        ctx.strokeStyle = `hsla(${shapeHue}, ${sat}%, ${light + 20}%, ${0.3 + Math.random() * 0.4})`;
        ctx.fillStyle = `hsla(${shapeHue}, ${sat - 10}%, ${light + 10}%, ${0.05 + Math.random() * 0.1})`;
        ctx.lineWidth = 0.5 + Math.random() * 2;

        const shapeType = Math.floor(Math.random() * 4);
        ctx.beginPath();
        if (shapeType === 0) {
          // Circle
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        } else if (shapeType === 1) {
          // Rectangle
          ctx.rect(x - size / 2, y - size / 2, size, size * (0.5 + Math.random()));
        } else if (shapeType === 2) {
          // Triangle
          const sides = 3;
          for (let p = 0; p <= sides; p++) {
            const angle = (Math.PI * 2 / sides) * p - Math.PI / 2;
            const px = x + Math.cos(angle) * size / 2;
            const py = y + Math.sin(angle) * size / 2;
            if (p === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
        } else {
          // Polygon
          const sides = 5 + Math.floor(Math.random() * 4);
          for (let p = 0; p <= sides; p++) {
            const angle = (Math.PI * 2 / sides) * p;
            const px = x + Math.cos(angle) * size / 2;
            const py = y + Math.sin(angle) * size / 2;
            if (p === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
      ctx.restore();
    }

    // Connecting lines
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 15}%, 0.1)`;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.lineTo(Math.random() * w, Math.random() * h);
      ctx.stroke();
    }

    return { type: 'art', style: 'geometric construction', shapes, symmetry, description: `${symmetry}-fold symmetric geometric construction` };
  }

  // ── Glitch Art ─────────────────────────────────────────────
  function drawGlitchArt(ctx, w, h, hue, sat, light, personality) {
    // Horizontal scan lines
    for (let y = 0; y < h; y += 2) {
      if (Math.random() < 0.3) {
        const shift = (Math.random() - 0.5) * 40;
        const glitchW = 20 + Math.random() * (w - 20);
        const glitchH = 1 + Math.floor(Math.random() * 5);
        const glitchHue = Math.random() * 360;
        ctx.fillStyle = `hsla(${glitchHue}, ${80 + Math.random() * 20}%, ${30 + Math.random() * 40}%, ${0.2 + Math.random() * 0.4})`;
        ctx.fillRect(shift, y, glitchW, glitchH);
      }
    }

    // Block corruption
    const blocks = 10 + Math.floor(personality[1] * 20);
    for (let i = 0; i < blocks; i++) {
      const bx = Math.random() * w;
      const by = Math.random() * h;
      const bw = 10 + Math.random() * 100;
      const bh = 5 + Math.random() * 40;
      const blockHue = (hue + Math.random() * 120) % 360;
      ctx.fillStyle = `hsla(${blockHue}, ${sat}%, ${light + Math.random() * 20}%, ${0.3 + Math.random() * 0.5})`;
      ctx.fillRect(bx, by, bw, bh);
    }

    // RGB channel separation effect
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 5; i++) {
      const rectW = 30 + Math.random() * 200;
      const rectH = 10 + Math.random() * 80;
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.fillStyle = `rgba(${Math.random() < 0.33 ? 255 : 0}, ${Math.random() < 0.33 ? 255 : 0}, ${Math.random() < 0.33 ? 255 : 0}, 0.2)`;
      ctx.fillRect(x, y, rectW, rectH);
    }
    ctx.globalCompositeOperation = 'source-over';

    // Noise dots
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      ctx.fillRect(x, y, 1, 1);
    }

    return { type: 'art', style: 'glitch', blocks, description: 'corrupted data stream glitch art' };
  }

  // ── Watercolor ─────────────────────────────────────────────
  function drawWatercolor(ctx, w, h, hue, sat, light, personality) {
    const blobs = 8 + Math.floor(personality[3] * 12);

    for (let i = 0; i < blobs; i++) {
      const cx = Math.random() * w;
      const cy = Math.random() * h;
      const blobHue = (hue + Math.random() * 50 - 25) % 360;
      const blobLight = light + Math.random() * 25;
      const size = 30 + Math.random() * 120;

      // Draw multiple overlapping transparent circles
      const layers = 20 + Math.floor(Math.random() * 30);
      for (let l = 0; l < layers; l++) {
        const lx = cx + (Math.random() - 0.5) * size * 0.6;
        const ly = cy + (Math.random() - 0.5) * size * 0.6;
        const lr = size * (0.3 + Math.random() * 0.7);
        ctx.beginPath();
        ctx.arc(lx, ly, lr, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${blobHue + (Math.random() - 0.5) * 15}, ${sat - 10}%, ${blobLight}%, ${0.01 + Math.random() * 0.03})`;
        ctx.fill();
      }
    }

    // Paint drips
    for (let d = 0; d < 5; d++) {
      const dx = Math.random() * w;
      let dy = Math.random() * h * 0.5;
      const dripHue = (hue + Math.random() * 40) % 360;
      ctx.strokeStyle = `hsla(${dripHue}, ${sat}%, ${light + 15}%, 0.08)`;
      ctx.lineWidth = 1 + Math.random() * 3;
      ctx.beginPath();
      ctx.moveTo(dx, dy);
      while (dy < h) {
        dy += 2 + Math.random() * 5;
        ctx.lineTo(dx + (Math.random() - 0.5) * 4, dy);
      }
      ctx.stroke();
    }

    return { type: 'art', style: 'watercolor', blobs, description: 'layered watercolor wash' };
  }

  // ── Cellular Automata ──────────────────────────────────────
  function drawCellularAutomata(ctx, w, h, hue, sat, light, personality) {
    const cellSize = 4;
    const cols = Math.floor(w / cellSize);
    const rows = Math.floor(h / cellSize);
    const rule = Math.floor(Math.random() * 256);

    // Initialize first row randomly
    let row = new Array(cols).fill(0).map(() => Math.random() < 0.5 ? 1 : 0);

    for (let y = 0; y < rows; y++) {
      // Draw current row
      for (let x = 0; x < cols; x++) {
        if (row[x]) {
          const cellHue = (hue + y * 0.5 + x * 0.2) % 360;
          ctx.fillStyle = `hsla(${cellHue}, ${sat}%, ${light + 15}%, 0.7)`;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
        }
      }

      // Compute next row using 1D cellular automata rule
      const nextRow = new Array(cols).fill(0);
      for (let x = 0; x < cols; x++) {
        const left = row[(x - 1 + cols) % cols];
        const center = row[x];
        const right = row[(x + 1) % cols];
        const pattern = (left << 2) | (center << 1) | right;
        nextRow[x] = (rule >> pattern) & 1;
      }
      row = nextRow;
    }

    return { type: 'art', style: 'cellular automata', rule, description: `rule ${rule} cellular automaton` };
  }

  // ── Abstract Expressionism ─────────────────────────────────
  function drawAbstract(ctx, w, h, hue, sat, light, personality) {
    // Bold strokes
    const strokes = 15 + Math.floor(Math.random() * 20);
    for (let i = 0; i < strokes; i++) {
      ctx.beginPath();
      const strokeHue = (hue + Math.random() * 80 - 40) % 360;
      ctx.strokeStyle = `hsla(${strokeHue}, ${sat + 10}%, ${light + Math.random() * 20}%, ${0.2 + Math.random() * 0.5})`;
      ctx.lineWidth = 3 + Math.random() * 15;
      ctx.lineCap = 'round';

      let x = Math.random() * w;
      let y = Math.random() * h;
      ctx.moveTo(x, y);

      const points = 3 + Math.floor(Math.random() * 5);
      for (let p = 0; p < points; p++) {
        const cpx = x + (Math.random() - 0.5) * 200;
        const cpy = y + (Math.random() - 0.5) * 200;
        x = x + (Math.random() - 0.5) * 200;
        y = y + (Math.random() - 0.5) * 200;
        ctx.quadraticCurveTo(cpx, cpy, x, y);
      }
      ctx.stroke();
    }

    // Splatter
    const splatters = 50 + Math.floor(Math.random() * 100);
    for (let i = 0; i < splatters; i++) {
      const sx = Math.random() * w;
      const sy = Math.random() * h;
      const sr = 1 + Math.random() * 5;
      const splatHue = (hue + Math.random() * 60) % 360;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${splatHue}, ${sat}%, ${light + 15}%, ${0.2 + Math.random() * 0.4})`;
      ctx.fill();
    }

    return { type: 'art', style: 'abstract', strokes, description: 'abstract expressionist painting' };
  }

  // ── L-System / Growth (for Gardener type) ──────────────────
  function drawLSystem(ctx, w, h, hue, sat, light, personality) {
    const axiom = 'F';
    const rules = {
      'F': Math.random() < 0.5 ? 'FF+[+F-F-F]-[-F+F+F]' : 'F[+F]F[-F][F]'
    };
    const angle = 20 + Math.random() * 15;
    const iterations = 4;

    // Build string
    let current = axiom;
    for (let i = 0; i < iterations; i++) {
      let next = '';
      for (const ch of current) {
        next += rules[ch] || ch;
      }
      current = next;
    }

    // Draw
    const stack = [];
    let x = w / 2, y = h;
    let dir = -90;
    const stepLen = Math.min(w, h) / (iterations * 20);

    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 20}%, 0.5)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);

    for (const ch of current) {
      if (ch === 'F') {
        x += Math.cos(dir * Math.PI / 180) * stepLen;
        y += Math.sin(dir * Math.PI / 180) * stepLen;
        ctx.lineTo(x, y);
      } else if (ch === '+') {
        dir += angle + (Math.random() - 0.5) * 5;
      } else if (ch === '-') {
        dir -= angle + (Math.random() - 0.5) * 5;
      } else if (ch === '[') {
        stack.push({ x, y, dir });
      } else if (ch === ']') {
        const state = stack.pop();
        if (state) { x = state.x; y = state.y; dir = state.dir; }
        ctx.moveTo(x, y);
      }
    }
    ctx.stroke();

    return { type: 'art', style: 'L-system growth', iterations, description: 'botanical L-system growth pattern' };
  }

  return { generate, drawLSystem, stopAnimation };
})();
