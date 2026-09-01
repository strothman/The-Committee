# 🔮 The Committee — Self-Evolving Modular App

> **"Each module births the next. Nothing is off the table."**

Welcome to **The Committee**! This is an interactive, browser-based generative playground where autonomous digital modules gather, deliberate, and cross-pollinate their personality traits to give birth to completely new, unique generations of modules.

Every module in The Committee has its own personality, visual style, generative artwork engine, real-time procedural music synthesizer, and creative voice.

---

## 🌟 What is The Committee? (Explained Simply)

Imagine a room of digital creators with distinct personalities:
- **Prometheus** (The Rebel) loves raw energy, disruption, and chaos 🔥
- **Athena** (The Architect) loves clean structures, logic, and patterns 🔷
- **Orpheus** (The Dreamer) loves poetic emotions, harmony, and mystery 🌙

When you click **"Convene the Committee"**, all current members submit proposals. The system mixes their traits through a **genetic cross-pollination algorithm** (introducing mutation and entropy), picks an archetype for the offspring, blends their names, and births a brand-new generation module!

Each module can then be opened in the **Creation Studio** to:
1. 🎨 **Generate original visual art** (flow fields, glitch art, geometric mandalas, watercolor blooms, particle explosions, etc.).
2. 🔊 **Synthesize live algorithmic music & soundscapes** using the Web Audio API.
3. 📜 **Generate unique procedural writing** (poems, prophecies, philosophical treatises, alchemy formulas, and more).

---

## 🚀 Quick Start (How to Run)

No complex installations or build steps are required! The Committee runs entirely in your browser with vanilla web technologies.

### Option 1: Open Directly in Your Browser
Double-click `index.html` or drag and drop `index.html` into any modern web browser (Chrome, Firefox, Edge, Safari).

### Option 2: Run with a Local Web Server (Recommended)
If you have Python or Node installed, you can start a local development server in this directory:

```bash
# Using Python 3
python -m http.server 8000

# Using Node / npx
npx serve .
```

Then open `http://localhost:8000` (or the URL shown in your terminal) in your browser.

---

## 🎮 How to Use The App

1. **Explore the Genesis Modules**:
   - Hover over module cards to inspect their personality radar bars (**Creativity**, **Chaos**, **Structure**, **Emotion**, and **Logic**).
   - Click anywhere on a card to open its **Detail View** and read its manifesto and lineage.
   - Click the **"✨ Create"** button on any card to enter the **Creation Studio**.
2. **Experiment in the Creation Studio**:
   - Click **"🎲 Roll Again"** to generate new procedural canvas artwork from that module's visual style.
   - Click **"🔊 Generate Sound"** to hear that module's real-time Web Audio synth composition (scales and tempo are tuned to its personality).
3. **Convene the Committee**:
   - Click the big glowing **"Convene the Committee"** button at the bottom of the screen.
   - Watch the **Deliberation Theater** as proposals fuse together and birth a brand-new, unique module into the committee!

---

## 🧬 Core Concepts for Beginners

| Concept | Description |
| :--- | :--- |
| **Module** | An autonomous digital entity with an archetype, a unique name, an avatar, and a 5-dimensional personality. |
| **Personality Vector** | 5 sliders between 0% and 100%: `[Creativity, Chaos, Structure, Emotion, Logic]`. These numbers determine how the module creates art, sound, and text. |
| **Archetypes** | 13 distinct creative classes (e.g., *The Rebel*, *The Architect*, *The Dreamer*, *The Oracle*, *The Philosopher*, *The Alchemist*, *The Cartographer*, *The Heretic*, *The Gardener*, *The Musician*, *The Trickster*, *The Weaver*, *The Void*). |
| **Deliberation & Breeding** | When the committee convenes, parents' personalities are averaged with chaos weighting, random mutations are applied, and an archetype is chosen. |
| **Lineage & Generation** | Every new module remembers who its parent modules were and what generation it belongs to. |

---

## 📁 Project Structure

Here is a simple map of all files in this project:

```
The-Committee/
├── index.html            # Main HTML layout, canvas layers, and modal overlays
├── style.css             # Glassmorphism dark-theme styling, animations, and responsive layout
├── app.js                # Main application orchestrator, event bindings, and UI state
├── modules.js            # Module class, 13 archetype definitions, and Genesis modules
├── deliberation.js       # Genetic cross-pollination algorithm, mutation, and voting logic
├── generators.js         # Procedural text generators for each archetype's creative output
├── names.js              # Mythological name generator and lineage name blending
├── artgen.js             # Canvas 2D procedural generative art rendering engine
├── audio.js              # Web Audio API music synth with dynamic scales, chords, and arpeggios
├── visuals.js            # Particle background, card creation, and deliberation animations
├── README.md             # This friendly guide to the project
├── PROJECT_STATE.md      # Live technical status, health checks, and feature tracking
└── CHANGELOG.md          # Chronological log of changes and revision history
```

---

## 🛠️ Developer & Revision Guide

To keep documentation clean and synchronized as changes are made:
- Whenever code is modified, update **[PROJECT_STATE.md](file:///c:/Users/strot/Antigravity%20IDE/The-Committee/PROJECT_STATE.md)** to reflect the new feature state.
- Add an entry to **[CHANGELOG.md](file:///c:/Users/strot/Antigravity%20IDE/The-Committee/CHANGELOG.md)** explaining what changed in simple, friendly terms.

---

## 📜 License & Credits

Created with standard HTML5, CSS3, JavaScript (ES6+), Canvas 2D API, and Web Audio API. No external frameworks or heavy dependencies required!
