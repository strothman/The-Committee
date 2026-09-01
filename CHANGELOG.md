# 📝 CHANGELOG.md — The Committee

All notable changes, bug fixes, and feature updates to **The Committee** project are documented in this file.

> **Beginner's Note:** A changelog is a diary of the project's journey. Whenever new features are built, bugs are fixed, or files are changed, a new entry is added here so anyone can easily understand what has changed over time.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Lineage tree visualizer canvas to see full family lineage connections.
- Save and load committee state to browser `localStorage`.
- High-resolution artwork export (PNG) and audio download (WAV).

---

## [1.0.0] - 2026-09-01 — Genesis Release

### Added
- **Core Orchestrator (`app.js`)**:
  - Application lifecycle management and dynamic state tracking.
  - Event binding for card clicks, creation studio triggers, and committee convening.
- **Genetic Breeding & Deliberation Engine (`deliberation.js`)**:
  - Proposal gathering system where existing committee members submit trait votes.
  - Genetic cross-pollination algorithm with chaos-weighted averages, mutation rates, and entropy injection.
  - Automatic archetype determination based on multidimensional distance matching.
- **Module System & Archetypes (`modules.js`)**:
  - `Module` class encapsulating 5D personality vectors (`[Creativity, Chaos, Structure, Emotion, Logic]`).
  - 13 distinct creative archetypes: The Rebel, The Architect, The Dreamer, The Oracle, The Philosopher, The Alchemist, The Cartographer, The Heretic, The Gardener, The Musician, The Trickster, The Weaver, and The Void.
  - Genesis seed triad: Prometheus, Athena, and Orpheus.
- **Generative Art Engine (`artgen.js`)**:
  - Canvas 2D procedural rendering system with dynamic color palette calculations based on module hue and saturation.
  - Multiple visual styles: Flow fields, glitch art, cellular automata, watercolor blooms, geometric mandalas, and particle explosions.
- **Web Audio Synthesizer (`audio.js`)**:
  - Browser Web Audio API synthesizer for procedural music.
  - 13 musical scales (pentatonic, minor, major, dorian, phrygian, lydian, mixolydian, blues, chromatic, wholetone, japanese, arabic, hungarian).
  - Personality-driven chord progressions, arpeggios, basslines, and ambient drones.
- **Procedural Writing Engine (`generators.js`)**:
  - Rich vocabulary tables and generative algorithms producing poems, manifestos, prophecies, questions, and alchemy formulas.
- **Lineage & Mythic Namer (`names.js`)**:
  - Mythological name generator blending Greek, Latin, and abstract roots with titles and epithets.
- **Visuals & UI Engine (`visuals.js`, `style.css`, `index.html`)**:
  - Interactive ambient particle background canvas.
  - Animated Deliberation Theater overlay with fusion core and birth flash animations.
  - Creation Studio modal with live canvas rendering, sound playback controls, and "Roll Again" generator.
  - Detailed module inspector modal displaying lineage, personality breakdown, and manifestos.
  - Glassmorphism dark-mode UI with responsive grid layout.
- **Documentation**:
  - `README.md`: Novice-friendly guide and quick start instructions.
  - `PROJECT_STATE.md`: Real-time system health and feature roadmap.
  - `CHANGELOG.md`: Revision tracking guide.

---

## 📖 How to Update This Changelog on Every Revision

When you make changes to the project:
1. Under **`[Unreleased]`** (or a new version header like `## [1.1.0] - YYYY-MM-DD`), categorize your work using these tags:
   - **`Added`** for new features.
   - **`Changed`** for changes in existing functionality.
   - **`Fixed`** for bug fixes.
   - **`Removed`** for removed features.
2. Write each bullet point in clear, plain language so anyone reading it can immediately grasp what was done!
