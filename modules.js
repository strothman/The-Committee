// ============================================================
// modules.js — Module System for The Committee
// Defines archetypes, personality vectors, and genesis modules
// ============================================================

const ModuleSystem = (() => {
  let nextId = 1;

  // ── Personality Trait Definitions ───────────────────────────
  // Each module has a personality vector: [creativity, chaos, structure, emotion, logic]
  const TRAITS = ['creativity', 'chaos', 'structure', 'emotion', 'logic'];

  const TRAIT_COLORS = {
    creativity: '#a78bfa',
    chaos: '#f43f5e',
    structure: '#06b6d4',
    emotion: '#f59e0b',
    logic: '#10b981'
  };

  // ── Archetype Definitions ──────────────────────────────────
  // Each archetype defines a creative domain, default personality bias,
  // generator function, and visual identity template.

  const ARCHETYPES = {
    rebel: {
      name: 'The Rebel',
      icon: '🔥',
      domain: 'Chaos & Disruption',
      generator: 'chaos',
      personality: [0.7, 0.95, 0.1, 0.5, 0.2],
      hueRange: [340, 20],  // reds
      patternType: 'shatter'
    },
    architect: {
      name: 'The Architect',
      icon: '🔷',
      domain: 'Structure & Pattern',
      generator: 'structure',
      personality: [0.5, 0.1, 0.95, 0.2, 0.85],
      hueRange: [190, 220],  // cyans/blues
      patternType: 'grid'
    },
    dreamer: {
      name: 'The Dreamer',
      icon: '🌙',
      domain: 'Emotion & Aesthetics',
      generator: 'poetry',
      personality: [0.9, 0.3, 0.15, 0.95, 0.1],
      hueRange: [260, 300],  // purples
      patternType: 'wave'
    },
    oracle: {
      name: 'The Oracle',
      icon: '👁',
      domain: 'Prophecy & Foresight',
      generator: 'prophecy',
      personality: [0.6, 0.4, 0.3, 0.7, 0.6],
      hueRange: [40, 60],  // golds
      patternType: 'spiral'
    },
    philosopher: {
      name: 'The Philosopher',
      icon: '💭',
      domain: 'Questions & Meaning',
      generator: 'philosophy',
      personality: [0.7, 0.2, 0.5, 0.6, 0.9],
      hueRange: [160, 180],  // teals
      patternType: 'circles'
    },
    alchemist: {
      name: 'The Alchemist',
      icon: '⚗️',
      domain: 'Transmutation',
      generator: 'alchemy',
      personality: [0.8, 0.5, 0.6, 0.4, 0.7],
      hueRange: [30, 50],  // ambers
      patternType: 'hexagons'
    },
    cartographer: {
      name: 'The Cartographer',
      icon: '🗺',
      domain: 'Maps & Connections',
      generator: 'cartography',
      personality: [0.5, 0.2, 0.8, 0.3, 0.7],
      hueRange: [100, 130],  // greens
      patternType: 'network'
    },
    heretic: {
      name: 'The Heretic',
      icon: '⚡',
      domain: 'Contradiction & Dissent',
      generator: 'heresy',
      personality: [0.6, 0.9, 0.05, 0.7, 0.5],
      hueRange: [0, 15],  // deep reds
      patternType: 'crack'
    },
    gardener: {
      name: 'The Gardener',
      icon: '🌿',
      domain: 'Growth & Cultivation',
      generator: 'garden',
      personality: [0.6, 0.15, 0.7, 0.8, 0.4],
      hueRange: [80, 120],  // greens
      patternType: 'organic'
    },
    musician: {
      name: 'The Musician',
      icon: '🎵',
      domain: 'Rhythm & Harmony',
      generator: 'music',
      personality: [0.85, 0.4, 0.6, 0.9, 0.3],
      hueRange: [280, 320],  // magentas
      patternType: 'wave'
    },
    trickster: {
      name: 'The Trickster',
      icon: '🃏',
      domain: 'Illusion & Swaps',
      generator: 'trickster',
      personality: [0.9, 0.8, 0.1, 0.6, 0.3],
      hueRange: [45, 75],  // oranges
      patternType: 'zigzag'
    },
    weaver: {
      name: 'The Weaver',
      icon: '🕸',
      domain: 'Narrative & Connection',
      generator: 'narrative',
      personality: [0.8, 0.3, 0.5, 0.7, 0.5],
      hueRange: [200, 240],  // blues
      patternType: 'threads'
    },
    void_walker: {
      name: 'The Void',
      icon: '◼',
      domain: 'Absence & Negative Space',
      generator: 'void',
      personality: [0.3, 0.5, 0.2, 0.4, 0.3],
      hueRange: [0, 0],  // no hue (grayscale)
      patternType: 'void'
    },
    mirror: {
      name: 'The Mirror',
      icon: '🪞',
      domain: 'Reflection & Inversion',
      generator: 'mirror',
      personality: [0.5, 0.3, 0.5, 0.5, 0.7],
      hueRange: [220, 260],  // silver-blues
      patternType: 'mirror'
    },
    catalyst: {
      name: 'The Catalyst',
      icon: '⚛',
      domain: 'Acceleration & Reaction',
      generator: 'catalyst',
      personality: [0.7, 0.6, 0.4, 0.3, 0.6],
      hueRange: [55, 80],  // yellow-greens
      patternType: 'radial'
    },
    archivist: {
      name: 'The Archivist',
      icon: '📜',
      domain: 'Memory & Record',
      generator: 'archive',
      personality: [0.3, 0.05, 0.9, 0.4, 0.8],
      hueRange: [25, 40],  // parchment
      patternType: 'lines'
    },
    nomad: {
      name: 'The Nomad',
      icon: '🧭',
      domain: 'Journey & Discovery',
      generator: 'journey',
      personality: [0.6, 0.5, 0.2, 0.6, 0.3],
      hueRange: [150, 170],  // dusty greens
      patternType: 'path'
    },
    seer: {
      name: 'The Seer',
      icon: '🔮',
      domain: 'Visions & Futures',
      generator: 'seer',
      personality: [0.7, 0.4, 0.3, 0.8, 0.5],
      hueRange: [270, 290],  // deep purples
      patternType: 'spiral'
    },
    colorist: {
      name: 'The Colorist',
      icon: '🎨',
      domain: 'Color & Palette',
      generator: 'colorPalette',
      personality: [0.9, 0.3, 0.4, 0.8, 0.2],
      hueRange: [0, 360],  // all hues
      patternType: 'gradient'
    },
    paradox: {
      name: 'The Paradox',
      icon: '∞',
      domain: 'Contradiction & Recursion',
      generator: 'philosophy',
      personality: [0.8, 0.7, 0.3, 0.5, 0.8],
      hueRange: [300, 340],  // magentas
      patternType: 'mobius'
    },
    forge: {
      name: 'The Forge',
      icon: '🔨',
      domain: 'Creation & Industry',
      generator: 'structure',
      personality: [0.6, 0.3, 0.8, 0.2, 0.7],
      hueRange: [15, 35],  // forge orange
      patternType: 'sparks'
    },
    tempest: {
      name: 'The Tempest',
      icon: '🌊',
      domain: 'Storm & Change',
      generator: 'chaos',
      personality: [0.7, 0.85, 0.1, 0.8, 0.15],
      hueRange: [200, 230],  // storm blue
      patternType: 'turbulence'
    },
    sentinel: {
      name: 'The Sentinel',
      icon: '🛡',
      domain: 'Guard & Preservation',
      generator: 'archive',
      personality: [0.2, 0.05, 0.95, 0.3, 0.9],
      hueRange: [210, 230],  // steel blue
      patternType: 'shield'
    },
    chimera: {
      name: 'The Chimera',
      icon: '🐉',
      domain: 'Hybrid & Fusion',
      generator: 'alchemy',
      personality: [0.9, 0.6, 0.3, 0.6, 0.4],
      hueRange: [330, 360],  // crimsons
      patternType: 'fractal'
    },
    whisper: {
      name: 'The Whisper',
      icon: '💨',
      domain: 'Subtlety & Secrets',
      generator: 'narrative',
      personality: [0.5, 0.2, 0.3, 0.7, 0.4],
      hueRange: [240, 270],  // lavender
      patternType: 'mist'
    },
    epoch: {
      name: 'The Epoch',
      icon: '⏳',
      domain: 'Time & Cycles',
      generator: 'prophecy',
      personality: [0.4, 0.3, 0.7, 0.5, 0.8],
      hueRange: [40, 55],  // antique gold
      patternType: 'clock'
    },
    prism: {
      name: 'The Prism',
      icon: '💎',
      domain: 'Spectrum & Refraction',
      generator: 'colorPalette',
      personality: [0.8, 0.4, 0.5, 0.6, 0.5],
      hueRange: [0, 360],  // all hues
      patternType: 'prism'
    },
    root: {
      name: 'The Root',
      icon: '🌳',
      domain: 'Foundation & Origin',
      generator: 'garden',
      personality: [0.4, 0.1, 0.8, 0.5, 0.6],
      hueRange: [90, 115],  // forest
      patternType: 'roots'
    },
    cipher: {
      name: 'The Cipher',
      icon: '🔐',
      domain: 'Encoding & Mystery',
      generator: 'philosophy',
      personality: [0.6, 0.3, 0.7, 0.2, 0.95],
      hueRange: [170, 195],  // dark teal
      patternType: 'matrix'
    },
    ember: {
      name: 'The Ember',
      icon: '🕯',
      domain: 'Warmth & Persistence',
      generator: 'poetry',
      personality: [0.6, 0.2, 0.4, 0.85, 0.3],
      hueRange: [10, 30],  // warm orange
      patternType: 'flame'
    }
  };

  const ARCHETYPE_KEYS = Object.keys(ARCHETYPES);

  // ── Module Factory ─────────────────────────────────────────

  /**
   * Create a new module.
   * @param {object} config
   * @param {string} config.archetypeKey - Key from ARCHETYPES
   * @param {string} [config.name] - Module name (auto-generated if omitted)
   * @param {string} [config.epithet] - Module epithet
   * @param {number[]} [config.personality] - 5-element personality vector
   * @param {number} [config.generation] - Generation number
   * @param {string[]} [config.parentIds] - Parent module IDs
   * @param {boolean} [config.isGenesis] - Is this a genesis module?
   */
  function createModule(config) {
    const archetype = ARCHETYPES[config.archetypeKey] || ARCHETYPES.dreamer;

    // Generate name if not provided
    let nameData;
    if (config.name) {
      nameData = { name: config.name, epithet: config.epithet || null, fullName: config.epithet ? `${config.name}, ${config.epithet}` : config.name };
    } else {
      nameData = NameGen.generate();
    }

    // Personality: use provided, archetype default, or randomize
    let personality;
    if (config.personality) {
      personality = config.personality.map(v => Math.max(0, Math.min(1, v)));
    } else {
      // Start from archetype defaults with some noise
      personality = archetype.personality.map(v =>
        Math.max(0, Math.min(1, v + (Math.random() - 0.5) * 0.2))
      );
    }

    // Visual identity
    const hue = randomInRange(archetype.hueRange[0], archetype.hueRange[1]);
    const saturation = Math.floor(50 + Math.random() * 40);
    const lightness = Math.floor(35 + Math.random() * 25);
    const primaryColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    const secondaryColor = `hsl(${(hue + 30) % 360}, ${saturation - 10}%, ${lightness + 15}%)`;
    const glowColor = `hsla(${hue}, ${saturation}%, ${lightness + 20}%, 0.4)`;

    // Generate initial creative output
    const generator = Generators.getGenerator(archetype.generator);
    const initialOutput = generator();

    const mod = {
      id: `mod-${nextId++}`,
      name: nameData.name,
      epithet: nameData.epithet,
      fullName: nameData.fullName,
      archetypeKey: config.archetypeKey,
      archetype: archetype,
      personality: personality,
      generation: config.generation || 0,
      parentIds: config.parentIds || [],
      isGenesis: config.isGenesis || false,
      visual: {
        primaryColor,
        secondaryColor,
        glowColor,
        hue,
        saturation,
        lightness,
        patternType: archetype.patternType
      },
      outputs: [initialOutput],
      createdAt: Date.now(),

      /** Generate a new creative output */
      generate() {
        const gen = Generators.getGenerator(this.archetype.generator);
        const output = gen();
        this.outputs.push(output);
        return output;
      },

      /** Cast a vote / proposal for the next module */
      vote(context) {
        // Generate a proposal influenced by personality
        const output = this.generate();
        return {
          moduleId: this.id,
          moduleName: this.name,
          archetypeKey: this.archetypeKey,
          personality: [...this.personality],
          output: output,
          weight: this.personality.reduce((a, b) => a + b, 0) / TRAITS.length,
          chaos: this.personality[1],  // chaos trait determines how wild the vote is
        };
      }
    };

    return mod;
  }

  function randomInRange(min, max) {
    if (min > max) {
      // Handle wrapping (e.g., hue 340 to 20)
      const range = (360 - min) + max;
      const val = min + Math.random() * range;
      return val % 360;
    }
    return min + Math.random() * (max - min);
  }

  // ── Genesis Module Factories ───────────────────────────────

  function createPrometheus() {
    return createModule({
      archetypeKey: 'rebel',
      name: 'Prometheus',
      epithet: 'the Unbound',
      personality: [0.7, 0.95, 0.1, 0.5, 0.2],
      generation: 0,
      isGenesis: true
    });
  }

  function createAthena() {
    return createModule({
      archetypeKey: 'architect',
      name: 'Athena',
      epithet: 'the Luminous',
      personality: [0.5, 0.1, 0.95, 0.2, 0.85],
      generation: 0,
      isGenesis: true
    });
  }

  function createOrpheus() {
    return createModule({
      archetypeKey: 'dreamer',
      name: 'Orpheus',
      epithet: 'the Dreaming',
      personality: [0.9, 0.3, 0.15, 0.95, 0.1],
      generation: 0,
      isGenesis: true
    });
  }

  // ── Utility ────────────────────────────────────────────────

  function getRandomArchetypeKey() {
    return ARCHETYPE_KEYS[Math.floor(Math.random() * ARCHETYPE_KEYS.length)];
  }

  return {
    TRAITS,
    TRAIT_COLORS,
    ARCHETYPES,
    ARCHETYPE_KEYS,
    createModule,
    createPrometheus,
    createAthena,
    createOrpheus,
    getRandomArchetypeKey
  };
})();
