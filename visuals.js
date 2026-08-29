// ============================================================
// visuals.js — Visual Rendering Engine for The Committee
// Particle background, procedural patterns, lineage threads,
// deliberation animation
// ============================================================

const Visuals = (() => {

  // ── Particle Background ────────────────────────────────────

  let particleCanvas, particleCtx;
  let particles = [];
  let animFrameId;

  function initParticles() {
    particleCanvas = document.getElementById('particle-canvas');
    if (!particleCanvas) return;
    particleCtx = particleCanvas.getContext('2d');
    resizeParticles();
    window.addEventListener('resize', resizeParticles);
    spawnParticles();
    animateParticles();
  }

  function resizeParticles() {
    if (!particleCanvas) return;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }

  function spawnParticles() {
    const count = Math.min(120, Math.floor(window.innerWidth * window.innerHeight / 12000));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.15 + 0.02,
        drift: (Math.random() - 0.5) * 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.3 ? Math.floor(Math.random() * 60 + 240) : 0 // some purple-ish
      });
    }
  }

  function animateParticles() {
    if (!particleCtx) return;
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(p => {
      p.y -= p.speed;
      p.x += p.drift;
      p.twinklePhase += p.twinkleSpeed;
      const twinkle = (Math.sin(p.twinklePhase) + 1) / 2;
      const alpha = p.opacity * (0.3 + twinkle * 0.7);

      if (p.y < -5) p.y = particleCanvas.height + 5;
      if (p.x < -5) p.x = particleCanvas.width + 5;
      if (p.x > particleCanvas.width + 5) p.x = -5;

      particleCtx.beginPath();
      particleCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      if (p.hue > 0) {
        particleCtx.fillStyle = `hsla(${p.hue}, 60%, 70%, ${alpha})`;
      } else {
        particleCtx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      }
      particleCtx.fill();
    });

    animFrameId = requestAnimationFrame(animateParticles);
  }

  // ── Procedural Pattern Generator ───────────────────────────
  // Draws unique patterns on module card canvases

  function drawPattern(canvas, module) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = canvas.offsetWidth * 2; // retina
    const h = canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);
    const dw = w / 2;
    const dh = h / 2;

    const { hue, saturation, lightness, patternType } = module.visual;

    // Dark base
    ctx.fillStyle = `hsl(${hue}, ${Math.max(saturation - 30, 10)}%, ${Math.max(lightness - 25, 5)}%)`;
    ctx.fillRect(0, 0, dw, dh);

    ctx.globalAlpha = 0.4;

    switch (patternType) {
      case 'wave':
        drawWaves(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'grid':
        drawGrid(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'shatter':
        drawShatter(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'spiral':
        drawSpiral(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'circles':
        drawCircles(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'hexagons':
        drawHexagons(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'network':
        drawNetwork(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'organic':
        drawOrganic(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'threads':
        drawThreads(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'void':
        drawVoid(ctx, dw, dh);
        break;
      case 'mirror':
        drawMirror(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'radial':
        drawRadial(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'lines':
        drawLines(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'zigzag':
        drawZigzag(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'fractal':
        drawFractal(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'gradient':
        drawGradient(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'crack':
        drawCrack(ctx, dw, dh, hue, saturation, lightness);
        break;
      case 'path':
        drawPath(ctx, dw, dh, hue, saturation, lightness);
        break;
      default:
        drawWaves(ctx, dw, dh, hue, saturation, lightness);
    }

    ctx.globalAlpha = 1;

    // Subtle vignette
    const grad = ctx.createRadialGradient(dw / 2, dh / 2, dw * 0.2, dw / 2, dh / 2, dw * 0.8);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(1, `hsl(${hue}, ${Math.max(saturation - 30, 10)}%, ${Math.max(lightness - 25, 5)}%)`);
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, dw, dh);
    ctx.globalAlpha = 1;
  }

  // ── Pattern drawing functions ──────────────────────────────

  function drawWaves(ctx, w, h, hue, sat, light) {
    const waveCount = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < waveCount; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `hsla(${(hue + i * 15) % 360}, ${sat}%, ${light + 15}%, ${0.3 + Math.random() * 0.3})`;
      ctx.lineWidth = 1 + Math.random() * 2;
      const amp = 8 + Math.random() * 20;
      const freq = 0.01 + Math.random() * 0.03;
      const yOff = (h / (waveCount + 1)) * (i + 1);
      ctx.moveTo(0, yOff);
      for (let x = 0; x <= w; x += 2) {
        ctx.lineTo(x, yOff + Math.sin(x * freq + i) * amp);
      }
      ctx.stroke();
    }
  }

  function drawGrid(ctx, w, h, hue, sat, light) {
    const spacing = 15 + Math.floor(Math.random() * 10);
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 20}%, 0.2)`;
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += spacing) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += spacing) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    // Highlighted intersections
    ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light + 30}%, 0.5)`;
    for (let x = 0; x < w; x += spacing) {
      for (let y = 0; y < h; y += spacing) {
        if (Math.random() < 0.3) {
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  function drawShatter(ctx, w, h, hue, sat, light) {
    const points = [];
    const count = 8 + Math.floor(Math.random() * 8);
    for (let i = 0; i < count; i++) {
      points.push({ x: Math.random() * w, y: Math.random() * h });
    }
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 15}%, 0.4)`;
    ctx.lineWidth = 1;
    points.forEach((p, i) => {
      const connections = 2 + Math.floor(Math.random() * 3);
      for (let j = 0; j < connections; j++) {
        const target = points[(i + j + 1) % points.length];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }
    });
    // Impact point
    ctx.fillStyle = `hsla(${hue}, ${sat + 10}%, ${light + 25}%, 0.6)`;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawSpiral(ctx, w, h, hue, sat, light) {
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 20}%, 0.5)`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const cx = w / 2, cy = h / 2;
    const turns = 3 + Math.random() * 4;
    for (let t = 0; t < turns * Math.PI * 2; t += 0.05) {
      const r = t * (Math.min(w, h) / (turns * Math.PI * 2 * 2.5));
      const x = cx + r * Math.cos(t);
      const y = cy + r * Math.sin(t);
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function drawCircles(ctx, w, h, hue, sat, light) {
    const cx = w / 2, cy = h / 2;
    const count = 5 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const r = (Math.min(w, h) / 2) * ((i + 1) / count) * 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${(hue + i * 10) % 360}, ${sat}%, ${light + 15}%, ${0.15 + (i / count) * 0.3})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawHexagons(ctx, w, h, hue, sat, light) {
    const size = 18 + Math.floor(Math.random() * 8);
    const hexH = size * Math.sqrt(3);
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 20}%, 0.3)`;
    ctx.lineWidth = 0.8;

    for (let row = -1; row < h / hexH + 1; row++) {
      for (let col = -1; col < w / (size * 1.5) + 1; col++) {
        const x = col * size * 1.5;
        const y = row * hexH + (col % 2 ? hexH / 2 : 0);
        drawHexagon(ctx, x, y, size * 0.9);
      }
    }
  }

  function drawHexagon(ctx, x, y, size) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = x + size * Math.cos(angle);
      const py = y + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }

  function drawNetwork(ctx, w, h, hue, sat, light) {
    const nodes = [];
    const count = 10 + Math.floor(Math.random() * 8);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: 10 + Math.random() * (w - 20),
        y: 10 + Math.random() * (h - 20),
        r: 2 + Math.random() * 3
      });
    }
    // Draw connections (nearest neighbors)
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 20}%, 0.2)`;
    ctx.lineWidth = 0.5;
    nodes.forEach((n, i) => {
      const dists = nodes.map((n2, j) => ({ j, d: Math.hypot(n.x - n2.x, n.y - n2.y) }))
        .filter(d => d.j !== i)
        .sort((a, b) => a.d - b.d);
      dists.slice(0, 3).forEach(d => {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(nodes[d.j].x, nodes[d.j].y);
        ctx.stroke();
      });
    });
    // Draw nodes
    ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light + 25}%, 0.6)`;
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawOrganic(ctx, w, h, hue, sat, light) {
    const branches = 3 + Math.floor(Math.random() * 4);
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 15}%, 0.4)`;
    ctx.lineWidth = 1.5;
    for (let b = 0; b < branches; b++) {
      let x = Math.random() * w;
      let y = h;
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let step = 0; step < 30; step++) {
        x += (Math.random() - 0.5) * 15;
        y -= 2 + Math.random() * 5;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  function drawThreads(ctx, w, h, hue, sat, light) {
    const count = 5 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      ctx.beginPath();
      ctx.strokeStyle = `hsla(${(hue + i * 20) % 360}, ${sat}%, ${light + 15}%, 0.3)`;
      ctx.lineWidth = 0.8;
      const x1 = Math.random() * w, y1 = 0;
      const x2 = Math.random() * w, y2 = h;
      const cx1 = Math.random() * w, cy1 = Math.random() * h;
      const cx2 = Math.random() * w, cy2 = Math.random() * h;
      ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
      ctx.stroke();
    }
  }

  function drawVoid(ctx, w, h) {
    // Almost nothing — just a few scattered dots fading
    ctx.fillStyle = 'rgba(30, 30, 40, 0.3)';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const alpha = Math.random() * 0.15;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawMirror(ctx, w, h, hue, sat, light) {
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 20}%, 0.3)`;
    ctx.lineWidth = 1;
    // Draw mirrored lines
    const count = 6 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const x1 = Math.random() * (w / 2);
      const y1 = Math.random() * h;
      const x2 = Math.random() * (w / 2);
      const y2 = Math.random() * h;
      // Left side
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      // Mirror right side
      ctx.beginPath(); ctx.moveTo(w - x1, y1); ctx.lineTo(w - x2, y2); ctx.stroke();
    }
    // Center line
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 30}%, 0.2)`;
    ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
    ctx.setLineDash([]);
  }

  function drawRadial(ctx, w, h, hue, sat, light) {
    const cx = w / 2, cy = h / 2;
    const rays = 8 + Math.floor(Math.random() * 12);
    const maxR = Math.min(w, h) * 0.4;
    for (let i = 0; i < rays; i++) {
      const angle = (Math.PI * 2 / rays) * i;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = `hsla(${(hue + i * 5) % 360}, ${sat}%, ${light + 20}%, 0.3)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawLines(ctx, w, h, hue, sat, light) {
    const count = 15 + Math.floor(Math.random() * 10);
    const spacing = h / count;
    for (let i = 0; i < count; i++) {
      const y = spacing * i + spacing / 2;
      const lineWidth = Math.random() < 0.2 ? w * 0.8 : w * (0.3 + Math.random() * 0.5);
      const x = (w - lineWidth) / 2;
      ctx.fillStyle = `hsla(${hue}, ${sat - 20}%, ${light + 15}%, ${0.1 + Math.random() * 0.2})`;
      ctx.fillRect(x, y, lineWidth, 1);
    }
  }

  function drawZigzag(ctx, w, h, hue, sat, light) {
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 20}%, 0.4)`;
    ctx.lineWidth = 1.5;
    const zigCount = 3 + Math.floor(Math.random() * 3);
    for (let z = 0; z < zigCount; z++) {
      ctx.beginPath();
      let y = (h / (zigCount + 1)) * (z + 1);
      ctx.moveTo(0, y);
      const step = 10 + Math.random() * 15;
      const amp = 5 + Math.random() * 15;
      for (let x = 0; x < w; x += step) {
        y += (Math.floor(x / step) % 2 === 0 ? amp : -amp);
        ctx.lineTo(x + step, y);
      }
      ctx.stroke();
    }
  }

  function drawFractal(ctx, w, h, hue, sat, light) {
    function branch(x, y, len, angle, depth) {
      if (depth <= 0 || len < 2) return;
      const x2 = x + Math.cos(angle) * len;
      const y2 = y + Math.sin(angle) * len;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `hsla(${(hue + depth * 15) % 360}, ${sat}%, ${light + 15}%, ${0.2 + depth * 0.1})`;
      ctx.lineWidth = depth * 0.5;
      ctx.stroke();
      branch(x2, y2, len * 0.7, angle - 0.5 + Math.random() * 0.3, depth - 1);
      branch(x2, y2, len * 0.7, angle + 0.5 + Math.random() * 0.3, depth - 1);
    }
    branch(w / 2, h, Math.min(w, h) * 0.3, -Math.PI / 2, 6);
  }

  function drawGradient(ctx, w, h, hue, sat, light) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    const stops = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < stops; i++) {
      const t = i / (stops - 1);
      const h2 = (hue + i * 40) % 360;
      grad.addColorStop(t, `hsla(${h2}, ${sat}%, ${light + 10}%, 0.4)`);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function drawCrack(ctx, w, h, hue, sat, light) {
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 20}%, 0.5)`;
    ctx.lineWidth = 1;
    function crack(x, y, angle, len, depth) {
      if (depth <= 0 || len < 3) return;
      const x2 = x + Math.cos(angle) * len;
      const y2 = y + Math.sin(angle) * len;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2); ctx.stroke();
      // Branch
      if (Math.random() < 0.4) {
        crack(x2, y2, angle + (Math.random() - 0.5) * 1.5, len * 0.7, depth - 1);
      }
      crack(x2, y2, angle + (Math.random() - 0.5) * 0.6, len * 0.8, depth - 1);
    }
    crack(w / 2, h / 2, Math.random() * Math.PI * 2, 20, 6);
    crack(w / 2, h / 2, Math.random() * Math.PI * 2, 20, 6);
  }

  function drawPath(ctx, w, h, hue, sat, light) {
    ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light + 20}%, 0.4)`;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    let x = 0, y = h / 2;
    ctx.moveTo(x, y);
    while (x < w) {
      x += 10 + Math.random() * 20;
      y += (Math.random() - 0.5) * 20;
      y = Math.max(10, Math.min(h - 10, y));
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    // Waypoint dots
    ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light + 30}%, 0.6)`;
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(w * (0.2 + i * 0.2), h / 2 + (Math.random() - 0.5) * 20, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── Module Card HTML Generator ─────────────────────────────

  function createCardHTML(module) {
    const { TRAIT_COLORS, TRAITS } = ModuleSystem;

    const paletteHTML = module.outputs[0]?.type === 'palette' && module.outputs[0].colors
      ? `<div class="palette-display">${module.outputs[0].colors.map(c =>
        `<div class="palette-swatch" style="background:${c}"></div>`
      ).join('')}</div>`
      : '';

    const output = module.outputs[module.outputs.length - 1];
    const outputText = output ? output.content : '';

    const personalityHTML = TRAITS.map((trait, i) => {
      const val = Math.round(module.personality[i] * 100);
      return `
        <div class="personality-bar" title="${trait}: ${val}%">
          <div class="personality-fill" style="width:${val}%;background:${TRAIT_COLORS[trait]}"></div>
        </div>`;
    }).join('');

    const lineageHTML = module.parentIds.length > 0
      ? `<div class="module-lineage">
          ${module.parentIds.slice(0, 5).map(() =>
        `<span class="lineage-dot" style="background:${module.visual.primaryColor}"></span>`
      ).join('')}
          <span>Gen ${module.generation} · ${module.parentIds.length} parents</span>
        </div>`
      : `<div class="module-lineage"><span>Genesis Module</span></div>`;

    const card = document.createElement('div');
    card.className = 'module-card';
    card.id = `card-${module.id}`;
    card.style.setProperty('--card-accent', `linear-gradient(90deg, ${module.visual.primaryColor}, ${module.visual.secondaryColor})`);
    card.style.setProperty('--card-glow-color', module.visual.glowColor);
    card.style.animationDelay = `${Math.random() * 0.3}s`;

    card.innerHTML = `
      <canvas class="card-pattern" data-module-id="${module.id}"></canvas>
      <span class="module-generation">GEN ${module.generation}</span>
      <div class="card-content">
        <div class="module-name">${module.archetype.icon} ${module.name}</div>
        ${module.epithet ? `<div class="module-epithet">${module.epithet}</div>` : ''}
        <div class="module-archetype">${module.archetype.name} · ${module.archetype.domain}</div>
        <div class="module-output">${escapeHtml(outputText)}</div>
        ${paletteHTML}
        <div class="personality-bars">${personalityHTML}</div>
        ${lineageHTML}
        <button class="card-create-btn" data-create-id="${module.id}">🎲 Create</button>
      </div>
    `;

    return card;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ── Deliberation Animation ─────────────────────────────────

  /**
   * Run the full deliberation animation.
   * @param {object} result - Result from Deliberation.deliberate()
   * @param {object[]} modules - All existing modules
   * @returns {Promise} Resolves when animation is complete
   */
  async function animateDeliberation(result, modules) {
    const overlay = document.querySelector('.deliberation-overlay');
    const stage = document.querySelector('.deliberation-stage');
    const flash = document.querySelector('.birth-flash');

    if (!overlay || !stage) return;

    // Clear previous
    stage.innerHTML = '<div class="fusion-core"></div><div class="new-module-reveal"></div>';

    // Activate overlay
    overlay.classList.add('active');

    // Awaken cards
    document.querySelectorAll('.module-card').forEach(card => {
      card.classList.add('awakened');
    });

    await delay(800);

    // Place proposal orbs around the stage
    const { proposals, newModule } = result;
    const orbCount = proposals.length;
    const stageRect = stage.getBoundingClientRect();
    const cx = stageRect.width / 2;
    const cy = stageRect.height / 2;
    const radius = Math.min(cx, cy) * 0.7;

    proposals.forEach((proposal, i) => {
      const angle = (Math.PI * 2 / orbCount) * i - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius - 45;
      const y = cy + Math.sin(angle) * radius - 45;

      const mod = modules.find(m => m.id === proposal.moduleId);
      const hue = mod ? mod.visual.hue : 260;

      const orb = document.createElement('div');
      orb.className = 'proposal-orb';
      orb.style.left = `${x}px`;
      orb.style.top = `${y}px`;
      orb.style.background = `radial-gradient(circle, hsla(${hue}, 70%, 50%, 0.8), hsla(${hue}, 60%, 30%, 0.6))`;
      orb.style.setProperty('--orb-glow', `hsla(${hue}, 70%, 50%, 0.5)`);
      orb.textContent = mod ? mod.name : '?';
      stage.appendChild(orb);

      // Stagger appearance
      setTimeout(() => orb.classList.add('visible'), 300 + i * 400);
    });

    // Wait for all orbs to appear
    await delay(300 + orbCount * 400 + 600);

    // Converge orbs to center
    const orbs = stage.querySelectorAll('.proposal-orb');
    orbs.forEach(orb => {
      orb.classList.add('converging');
      orb.style.left = `${cx - 45}px`;
      orb.style.top = `${cy - 45}px`;
      orb.style.opacity = '0.5';
      orb.style.transform = 'scale(0.5)';
    });

    // Activate fusion core
    const fusionCore = stage.querySelector('.fusion-core');
    await delay(400);
    fusionCore.classList.add('active');

    await delay(1500);

    // Explode
    fusionCore.classList.remove('active');
    fusionCore.classList.add('explode');
    orbs.forEach(orb => { orb.style.opacity = '0'; orb.style.transform = 'scale(0)'; });

    // Flash
    flash.classList.add('active');

    await delay(400);

    // Reveal new module
    const reveal = stage.querySelector('.new-module-reveal');
    reveal.innerHTML = `
      <div class="reveal-name">${newModule.archetype.icon} ${newModule.name}</div>
      <div class="reveal-archetype">${newModule.archetype.name}</div>
      <div class="reveal-output">${escapeHtml(newModule.outputs[0]?.content || '')}</div>
    `;
    reveal.classList.add('visible');

    await delay(3000);

    // Cleanup
    overlay.classList.remove('active');
    flash.classList.remove('active');
    document.querySelectorAll('.module-card').forEach(card => {
      card.classList.remove('awakened');
    });

    await delay(500);
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ── Public API ─────────────────────────────────────────────

  return {
    initParticles,
    drawPattern,
    createCardHTML,
    animateDeliberation,
    escapeHtml
  };
})();
