// ============================================================
// app.js — Main Application Orchestrator for The Committee
// State management, UI events, module detail views,
// Creation Studio integration
// ============================================================

const App = (() => {
  // ── State ──────────────────────────────────────────────────
  let modules = [];
  let isDeliberating = false;
  let selectedModuleId = null;
  let creationModuleId = null;

  // ── Initialization ─────────────────────────────────────────

  function init() {
    // Initialize particle background
    Visuals.initParticles();

    // Create genesis modules
    const prometheus = ModuleSystem.createPrometheus();
    const athena = ModuleSystem.createAthena();
    const orpheus = ModuleSystem.createOrpheus();

    modules = [prometheus, athena, orpheus];

    // Render all genesis modules
    modules.forEach(mod => addModuleCard(mod));

    // Update counter
    updateCounter();

    // Bind events
    bindEvents();

    console.log('The Committee has been initialized.');
    console.log('Genesis modules:', modules.map(m => m.fullName).join(', '));
  }

  // ── UI Rendering ───────────────────────────────────────────

  function addModuleCard(module) {
    const grid = document.getElementById('module-grid');
    if (!grid) return;

    const card = Visuals.createCardHTML(module);

    // Click card body to view details, but NOT when clicking the Create button
    card.addEventListener('click', (e) => {
      if (e.target.closest('.card-create-btn')) return;
      showModuleDetail(module.id);
    });

    grid.appendChild(card);

    // Draw the procedural pattern after the card is in the DOM
    requestAnimationFrame(() => {
      const canvas = card.querySelector('.card-pattern');
      if (canvas) {
        Visuals.drawPattern(canvas, module);
      }
    });
  }

  function updateCounter() {
    const counter = document.getElementById('generation-counter');
    if (!counter) return;
    const maxGen = Math.max(...modules.map(m => m.generation));
    counter.textContent = `${modules.length} modules · generation ${maxGen}`;
  }

  // ── Committee Convening ────────────────────────────────────

  async function conveneCommittee() {
    if (isDeliberating) return;
    isDeliberating = true;

    const btn = document.getElementById('convene-btn');
    if (btn) {
      btn.classList.add('deliberating');
      btn.textContent = 'Deliberating...';
    }

    try {
      // Run the deliberation
      const result = Deliberation.deliberate(modules);

      console.log('Committee deliberation complete.');
      console.log('New module:', result.newModule.fullName, `(${result.newModule.archetype.name})`);

      // Run the animation
      await Visuals.animateDeliberation(result, modules);

      // Add the new module to state
      modules.push(result.newModule);

      // Add the card
      addModuleCard(result.newModule);

      // Update counter
      updateCounter();

      // Scroll to the new card
      const newCard = document.getElementById(`card-${result.newModule.id}`);
      if (newCard) {
        newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

    } catch (err) {
      console.error('Deliberation error:', err);
    }

    isDeliberating = false;
    if (btn) {
      btn.classList.remove('deliberating');
      btn.textContent = 'Convene the Committee';
    }
  }

  // ── Creation Studio ────────────────────────────────────────

  function openCreationStudio(moduleId) {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    creationModuleId = moduleId;

    const overlay = document.getElementById('creation-overlay');
    const nameEl = document.getElementById('creation-module-name');
    const typeEl = document.getElementById('creation-module-type');

    if (!overlay) return;

    nameEl.textContent = `${module.archetype.icon} ${module.name}`;
    typeEl.textContent = `${module.archetype.name} · ${module.archetype.domain}`;

    overlay.classList.add('active');

    // Generate initial art
    generateCreation(module);

    // Show/hide sound button based on module type
    updateSoundButtons(module);
  }

  function generateCreation(module) {
    if (!module) {
      module = modules.find(m => m.id === creationModuleId);
    }
    if (!module) return;

    const canvas = document.getElementById('creation-canvas');
    const metaEl = document.getElementById('creation-meta');
    if (!canvas) return;

    // Generate art on the canvas
    const artResult = ArtEngine.generate(canvas, module);

    // Also generate a text output
    const textOutput = module.generate();

    // Update metadata
    const metaParts = [];
    if (artResult.style) metaParts.push(`style: ${artResult.style}`);
    if (artResult.description) metaParts.push(artResult.description);
    if (textOutput.content) metaParts.push(`"${textOutput.content.slice(0, 80)}${textOutput.content.length > 80 ? '...' : ''}"`);
    metaEl.textContent = metaParts.join(' · ');

    console.log(`[${module.name}] Created:`, artResult, textOutput);
  }

  function generateSound(module) {
    if (!module) {
      module = modules.find(m => m.id === creationModuleId);
    }
    if (!module) return;

    const metaEl = document.getElementById('creation-meta');
    const playBtn = document.getElementById('creation-play-sound');
    const stopBtn = document.getElementById('creation-stop-sound');

    // Generate and play music
    const musicResult = AudioEngine.generate(module);

    // Update meta
    const metaParts = [];
    if (musicResult.scale) metaParts.push(`scale: ${musicResult.scale}`);
    if (musicResult.bpm) metaParts.push(`${musicResult.bpm} bpm`);
    if (musicResult.description) metaParts.push(musicResult.description);
    metaEl.textContent = `♪ ${metaParts.join(' · ')}`;

    // Toggle buttons
    playBtn.style.display = 'none';
    stopBtn.style.display = 'inline-flex';

    // Auto-hide stop button after music duration
    setTimeout(() => {
      if (creationModuleId) {
        playBtn.style.display = 'inline-flex';
        stopBtn.style.display = 'none';
      }
    }, (musicResult.duration || 8) * 1000 + 500);

    console.log(`[${module.name}] Music:`, musicResult);
  }

  function stopSound() {
    AudioEngine.stopAll();
    const playBtn = document.getElementById('creation-play-sound');
    const stopBtn = document.getElementById('creation-stop-sound');
    if (playBtn) playBtn.style.display = 'inline-flex';
    if (stopBtn) stopBtn.style.display = 'none';
  }

  function updateSoundButtons(module) {
    const playBtn = document.getElementById('creation-play-sound');
    const stopBtn = document.getElementById('creation-stop-sound');
    if (playBtn) playBtn.style.display = 'inline-flex';
    if (stopBtn) stopBtn.style.display = 'none';
  }

  function closeCreationStudio() {
    const overlay = document.getElementById('creation-overlay');
    if (overlay) overlay.classList.remove('active');
    AudioEngine.stopAll();
    ArtEngine.stopAnimation();
    creationModuleId = null;
  }

  // ── Module Detail View ─────────────────────────────────────

  function showModuleDetail(moduleId) {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    selectedModuleId = moduleId;

    const overlay = document.getElementById('module-detail-overlay');
    const detail = document.getElementById('module-detail');
    if (!overlay || !detail) return;

    const { TRAITS, TRAIT_COLORS } = ModuleSystem;

    // Build personality trait bars
    const traitsHTML = TRAITS.map((trait, i) => {
      const val = Math.round(module.personality[i] * 100);
      return `
        <div class="detail-trait">
          <span class="detail-trait-name">${trait}</span>
          <div class="detail-trait-bar">
            <div class="detail-trait-fill" style="width:${val}%;background:${TRAIT_COLORS[trait]}"></div>
          </div>
          <span class="detail-trait-value">${val}%</span>
        </div>`;
    }).join('');

    // Build output history
    const outputsHTML = module.outputs.slice().reverse().map(o =>
      `<div class="detail-output-item">${Visuals.escapeHtml(o.content || '')}</div>`
    ).join('');

    // Build lineage info
    const parentNames = module.parentIds
      .map(id => modules.find(m => m.id === id))
      .filter(Boolean)
      .map(m => m.name)
      .join(', ');
    const lineageText = module.isGenesis
      ? 'Genesis module — no parents'
      : `Parents: ${parentNames || 'unknown'}`;

    detail.innerHTML = `
      <button class="detail-close" id="detail-close">&times;</button>
      <canvas class="detail-pattern" data-module-id="${module.id}"></canvas>
      <div class="detail-content">
        <div class="module-name" style="font-size:1.6rem">${module.archetype.icon} ${module.name}</div>
        ${module.epithet ? `<div class="module-epithet" style="font-size:0.9rem">${module.epithet}</div>` : ''}
        <div class="module-archetype" style="margin-top:8px">${module.archetype.name} · ${module.archetype.domain}</div>

        <div class="detail-section">
          <div class="detail-section-title">Personality Vector</div>
          <div class="detail-personality">${traitsHTML}</div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">Lineage</div>
          <div class="detail-output-item">${lineageText}<br>Generation ${module.generation}</div>
        </div>

        <div class="detail-section">
          <div class="detail-section-title">Creative Outputs (${module.outputs.length})</div>
          <div class="detail-outputs">${outputsHTML}</div>
        </div>
      </div>
    `;

    overlay.classList.add('active');

    // Draw detail pattern
    requestAnimationFrame(() => {
      const canvas = detail.querySelector('.detail-pattern');
      if (canvas) {
        Visuals.drawPattern(canvas, module);
      }
    });

    // Close button
    document.getElementById('detail-close').addEventListener('click', (e) => {
      e.stopPropagation();
      closeModuleDetail();
    });
  }

  function closeModuleDetail() {
    const overlay = document.getElementById('module-detail-overlay');
    if (overlay) overlay.classList.remove('active');
    selectedModuleId = null;
  }

  // ── Event Binding ──────────────────────────────────────────

  function bindEvents() {
    // Convene button
    const btn = document.getElementById('convene-btn');
    if (btn) {
      btn.addEventListener('click', conveneCommittee);
    }

    // Delegate Create button clicks on module cards
    document.addEventListener('click', (e) => {
      const createBtn = e.target.closest('.card-create-btn');
      if (createBtn) {
        e.stopPropagation();
        const moduleId = createBtn.dataset.createId;
        openCreationStudio(moduleId);
      }
    });

    // Creation Studio controls
    const creationClose = document.getElementById('creation-close');
    if (creationClose) {
      creationClose.addEventListener('click', closeCreationStudio);
    }

    const creationOverlay = document.getElementById('creation-overlay');
    if (creationOverlay) {
      creationOverlay.addEventListener('click', (e) => {
        if (e.target === creationOverlay) closeCreationStudio();
      });
    }

    const regenBtn = document.getElementById('creation-regenerate');
    if (regenBtn) {
      regenBtn.addEventListener('click', () => generateCreation());
    }

    const playSoundBtn = document.getElementById('creation-play-sound');
    if (playSoundBtn) {
      playSoundBtn.addEventListener('click', () => generateSound());
    }

    const stopSoundBtn = document.getElementById('creation-stop-sound');
    if (stopSoundBtn) {
      stopSoundBtn.addEventListener('click', stopSound);
    }

    // Close detail overlay on background click
    const detailOverlay = document.getElementById('module-detail-overlay');
    if (detailOverlay) {
      detailOverlay.addEventListener('click', (e) => {
        if (e.target === detailOverlay) {
          closeModuleDetail();
        }
      });
    }

    // Close deliberation overlay on background click (if stuck)
    const delibOverlay = document.querySelector('.deliberation-overlay');
    if (delibOverlay) {
      delibOverlay.addEventListener('click', (e) => {
        if (e.target === delibOverlay && !isDeliberating) {
          delibOverlay.classList.remove('active');
        }
      });
    }

    // Keyboard: Escape closes overlays
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (creationModuleId) {
          closeCreationStudio();
        } else {
          closeModuleDetail();
        }
        if (!isDeliberating) {
          const delibOverlay = document.querySelector('.deliberation-overlay');
          if (delibOverlay) delibOverlay.classList.remove('active');
        }
      }
      // Space bar to convene (only when no overlays are open)
      if (e.key === ' ' && !isDeliberating && !creationModuleId && !selectedModuleId && document.activeElement === document.body) {
        e.preventDefault();
        conveneCommittee();
      }
    });
  }

  // ── Public API ─────────────────────────────────────────────

  return {
    init,
    getModules: () => [...modules],
    conveneCommittee,
    openCreationStudio
  };
})();

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', App.init);
