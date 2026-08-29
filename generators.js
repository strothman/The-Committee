// ============================================================
// generators.js — Creative Output Engines for The Committee
// Each generator produces unique content for its archetype domain
// ============================================================

const Generators = (() => {

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function pickN(arr, n) {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function randFloat(min, max) { return Math.random() * (max - min) + min; }

  // ── Word Banks ──────────────────────────────────────────────

  const nouns = [
    'silence', 'mirror', 'ember', 'horizon', 'abyss', 'cathedral', 'labyrinth',
    'ocean', 'desert', 'constellation', 'threshold', 'garden', 'ruin', 'river',
    'mountain', 'shadow', 'crystal', 'void', 'flame', 'storm', 'root', 'bone',
    'thread', 'mask', 'door', 'key', 'wound', 'song', 'dream', 'memory',
    'fracture', 'spiral', 'echo', 'tide', 'fog', 'tower', 'bridge', 'lens',
    'prism', 'vein', 'nerve', 'cloud', 'dust', 'ash', 'moss', 'salt', 'iron',
    'glass', 'silk', 'thorn', 'bloom', 'rust', 'coral', 'smoke', 'frost',
    'hunger', 'gravity', 'frequency', 'paradox', 'entropy', 'algorithm',
    'recursion', 'mutation', 'symbiosis', 'metamorphosis', 'architecture'
  ];

  const adjectives = [
    'luminous', 'fractured', 'ancient', 'forgotten', 'burning', 'frozen',
    'infinite', 'hollow', 'radiant', 'spectral', 'crystalline', 'obsidian',
    'mercurial', 'prismatic', 'tidal', 'recursive', 'emergent', 'liminal',
    'iridescent', 'volcanic', 'celestial', 'verdant', 'abyssal', 'seraphic',
    'translucent', 'phosphorescent', 'tessellated', 'chromatic', 'nebular',
    'silent', 'bleeding', 'golden', 'silver', 'copper', 'iron', 'glass',
    'velvet', 'jagged', 'smooth', 'trembling', 'static', 'fluid', 'dense',
    'weightless', 'electric', 'organic', 'synthetic', 'feral', 'sacred'
  ];

  const verbs = [
    'dissolves', 'remembers', 'forgets', 'blooms', 'fractures', 'spirals',
    'echoes', 'burns', 'freezes', 'drifts', 'shatters', 'weaves', 'unravels',
    'grows', 'decays', 'transforms', 'mirrors', 'consumes', 'creates',
    'destroys', 'whispers', 'screams', 'waits', 'arrives', 'departs',
    'oscillates', 'converges', 'diverges', 'mutates', 'crystallizes',
    'evaporates', 'condenses', 'resonates', 'harmonizes', 'dissonates'
  ];

  const abstracts = [
    'time', 'space', 'consciousness', 'infinity', 'nothingness', 'existence',
    'identity', 'truth', 'beauty', 'chaos', 'order', 'entropy', 'meaning',
    'purpose', 'freedom', 'fate', 'desire', 'fear', 'wonder', 'grief',
    'joy', 'absence', 'presence', 'change', 'permanence', 'connection',
    'isolation', 'creation', 'destruction', 'beginning', 'ending',
    'paradox', 'symmetry', 'asymmetry', 'recursion', 'emergence'
  ];

  const places = [
    'the edge of the world', 'a burning library', 'the bottom of the sea',
    'a room with no doors', 'the space between heartbeats',
    'a garden of black flowers', 'the last sunset', 'a frozen river',
    'the center of a spiral', 'a mirror that reflects tomorrow',
    'the ruins of a language', 'a sky made of glass',
    'the memory of a color', 'a city built on echoes',
    'the inside of a prism', 'a forest of crystal trees',
    'the pause between notes', 'a desert of white sand',
    'the shadow of an idea', 'a bridge between silences'
  ];

  // ── Generators ──────────────────────────────────────────────

  /** Poetry / Dreamer output */
  function poetry() {
    const templates = [
      () => `${pick(adjectives)} ${pick(nouns)} ${pick(verbs)} in ${pick(places)}`,
      () => `the ${pick(nouns)} of ${pick(abstracts)}\n${pick(verbs)} like ${pick(adjectives)} ${pick(nouns)}`,
      () => `what ${pick(verbs)} in ${pick(places)}?\nonly the ${pick(adjectives)} ${pick(nouns)} knows`,
      () => `between ${pick(nouns)} and ${pick(nouns)},\na ${pick(adjectives)} ${pick(nouns)} ${pick(verbs)}`,
      () => `i am the ${pick(nouns)} that ${pick(verbs)}\nwhen ${pick(abstracts)} meets ${pick(abstracts)}`,
      () => `${pick(adjectives)}, ${pick(adjectives)}, ${pick(adjectives)}—\nthe ${pick(nouns)} ${pick(verbs)} at last`,
      () => `in ${pick(places)},\nwhere ${pick(nouns)} ${pick(verbs)},\n${pick(abstracts)} is ${pick(adjectives)}`,
      () => `do not speak of the ${pick(nouns)}.\nit ${pick(verbs)}.\nthat is enough.`,
    ];
    return { type: 'poetry', content: pick(templates)() };
  }

  /** Philosophy / questions */
  function philosophy() {
    const templates = [
      () => `If ${pick(abstracts)} is ${pick(adjectives)}, can ${pick(abstracts)} still exist?`,
      () => `What is the ${pick(nouns)} of ${pick(abstracts)} without ${pick(abstracts)}?`,
      () => `Does the ${pick(nouns)} ${pick(verbs).slice(0, -1)} because of ${pick(abstracts)}, or despite it?`,
      () => `Is ${pick(abstracts)} the ${pick(nouns)} of ${pick(abstracts)}, or its ${pick(nouns)}?`,
      () => `When ${pick(abstracts)} ${pick(verbs)}, what remains?`,
      () => `Can a ${pick(adjectives)} ${pick(nouns)} contain ${pick(abstracts)}?`,
      () => `What ${pick(verbs)} at the intersection of ${pick(abstracts)} and ${pick(abstracts)}?`,
      () => `If you remove ${pick(abstracts)} from ${pick(abstracts)}, do you get ${pick(nouns)} or ${pick(nouns)}?`,
    ];
    return { type: 'philosophy', content: pick(templates)() };
  }

  /** Prophecy / Oracle output */
  function prophecy() {
    const templates = [
      () => `When the ${ordinal()} module ${pick(verbs)}, the committee will ${pick(verbs).slice(0, -1)}.`,
      () => `A ${pick(adjectives)} ${pick(nouns)} approaches. It carries ${pick(abstracts)}.`,
      () => `The next birth will be ${pick(adjectives)}. I have seen it in the ${pick(nouns)}.`,
      () => `Beware the module that ${pick(verbs)}. It will change everything.`,
      () => `Three ${pick(nouns)}s will ${pick(verbs).slice(0, -1)} before the ${pick(nouns)} arrives.`,
      () => `The committee ${pick(verbs)} toward ${pick(abstracts)}. None can stop it.`,
      () => `In ${randInt(2, 7)} generations, a ${pick(adjectives)} ${pick(nouns)} will ${pick(verbs).slice(0, -1)}.`,
      () => `I see ${pick(adjectives)} ${pick(nouns)}s. They ${pick(verbs).slice(0, -1)} in ${pick(places)}.`,
    ];
    return { type: 'prophecy', content: pick(templates)() };
  }

  function ordinal() {
    const n = randInt(2, 20);
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  /** Chaos / Rebel / Mutation output */
  function chaos() {
    const actions = [
      () => `RULE: All modules must now ${pick(verbs).slice(0, -1)} before voting.`,
      () => `MUTATION: The concept of "${pick(abstracts)}" is hereby ${pick(adjectives)}.`,
      () => `DISRUPTION: What if ${pick(nouns)}s could ${pick(verbs).slice(0, -1)}?`,
      () => `INVERSION: ${pick(abstracts)} is actually ${pick(abstracts)}. Think about it.`,
      () => `WILDCARD: Inject ${pick(adjectives)} ${pick(nouns)} into the next ${randInt(2, 5)} modules.`,
      () => `CONTRADICTION: The committee is both ${pick(adjectives)} and not ${pick(adjectives)}.`,
      () => `OVERRIDE: Replace all ${pick(nouns)}s with ${pick(nouns)}s.`,
      () => `EXPLOSION: ${pick(nouns).toUpperCase()} ${pick(nouns).toUpperCase()} ${pick(nouns).toUpperCase()}`,
    ];
    return { type: 'chaos', content: pick(actions)() };
  }

  /** Structure / Architect output — patterns and systems */
  function structure() {
    const patterns = [
      () => {
        const size = randInt(3, 6);
        let grid = '';
        const chars = ['█', '░', '▓', '▒', '◆', '◇', '○', '●'];
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            // Symmetrical pattern
            const idx = (x + y * size) % chars.length;
            grid += chars[idx] + ' ';
          }
          grid += '\n';
        }
        return `PATTERN:\n${grid}`;
      },
      () => `SYSTEM: ${pick(nouns)} → ${pick(nouns)} → ${pick(nouns)} → ${pick(nouns)} [cycle]`,
      () => `FRAMEWORK: If ${pick(nouns)}.${pick(verbs).slice(0, -1)}(), then ${pick(nouns)}.${pick(verbs).slice(0, -1)}()`,
      () => {
        const rules = pickN(nouns, 3).map((n, i) => `  ${i + 1}. ${n} must ${pick(verbs).slice(0, -1)}`);
        return `ARCHITECTURE:\n${rules.join('\n')}`;
      },
      () => `TOPOLOGY: ${pick(adjectives)} graph with ${randInt(3, 8)} nodes, ${randInt(2, 12)} edges`,
      () => `ALGORITHM: sort by ${pick(abstracts)}, filter by ${pick(abstracts)}, reduce to ${pick(nouns)}`,
    ];
    return { type: 'structure', content: pick(patterns)() };
  }

  /** Color palette generator */
  function colorPalette() {
    // Generate a harmonious palette
    const baseHue = randInt(0, 360);
    const harmony = pick(['complementary', 'analogous', 'triadic', 'split-complementary', 'tetradic']);
    let hues;
    switch (harmony) {
      case 'complementary':
        hues = [baseHue, (baseHue + 180) % 360]; break;
      case 'analogous':
        hues = [baseHue, (baseHue + 30) % 360, (baseHue + 60) % 360]; break;
      case 'triadic':
        hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360]; break;
      case 'split-complementary':
        hues = [baseHue, (baseHue + 150) % 360, (baseHue + 210) % 360]; break;
      case 'tetradic':
        hues = [baseHue, (baseHue + 90) % 360, (baseHue + 180) % 360, (baseHue + 270) % 360]; break;
    }
    const colors = hues.map(h => {
      const s = randInt(50, 90);
      const l = randInt(30, 70);
      return `hsl(${h}, ${s}%, ${l}%)`;
    });
    const mood = pick([
      'volcanic sunrise', 'deep ocean twilight', 'electric neon dusk',
      'frozen aurora', 'desert at midnight', 'bioluminescent forest',
      'rusted cathedral', 'crystal cave', 'solar flare', 'abyssal bloom',
      'spectral mist', 'molten gold', 'obsidian rain', 'prismatic storm'
    ]);
    return {
      type: 'palette',
      content: `${harmony} palette — "${mood}"`,
      colors,
      harmony,
      mood
    };
  }

  /** Map / Cartographer output */
  function cartography() {
    const features = pickN([
      'a nexus of convergence', 'an uncharted void', 'a bridge of resonance',
      'a fault line of chaos', 'a wellspring of creation', 'a graveyard of ideas',
      'a crossroads of archetypes', 'a river of mutation', 'a mountain of structure',
      'a valley of dreams', 'a forest of connections', 'a desert of silence',
      'a labyrinth of mirrors', 'an archipelago of fragments', 'a canyon of echoes'
    ], randInt(2, 4));
    const territory = `MAP OF THE COMMITTEE:\n${features.map((f, i) => `  ${['N', 'S', 'E', 'W', 'NE', 'NW', 'SE', 'SW'][i] || '?'}. ${f}`).join('\n')}`;
    return { type: 'map', content: territory };
  }

  /** Alchemy / Transmutation output */
  function alchemy() {
    const input = pick(nouns);
    const output = pick(nouns);
    const catalyst = pick(abstracts);
    const process = pick(['distillation', 'calcination', 'fermentation', 'sublimation',
      'coagulation', 'dissolution', 'separation', 'conjunction', 'putrefaction']);
    return {
      type: 'alchemy',
      content: `TRANSMUTATION: ${input} → [${process} via ${catalyst}] → ${output}`
    };
  }

  /** Weaver / Narrative output */
  function narrative() {
    const templates = [
      () => `Once, a ${pick(adjectives)} ${pick(nouns)} ${pick(verbs)} in ${pick(places)}. It never stopped.`,
      () => `They say the ${pick(nouns)} was born when ${pick(abstracts)} met ${pick(abstracts)} at ${pick(places)}.`,
      () => `The ${pick(nouns)} told the ${pick(nouns)}: "You will ${pick(verbs).slice(0, -1)} when ${pick(abstracts)} ${pick(verbs)}."`,
      () => `In the age before ${pick(nouns)}s, there was only ${pick(abstracts)}. Then the ${pick(nouns)} ${pick(verbs)}.`,
      () => `Fragment #${randInt(1, 999)}: "...and the ${pick(adjectives)} ${pick(nouns)} ${pick(verbs)}, leaving only ${pick(abstracts)}..."`,
    ];
    return { type: 'narrative', content: pick(templates)() };
  }

  /** Mirror / Reflection output — takes input and inverts it */
  function mirror(input) {
    if (!input) {
      return { type: 'mirror', content: `REFLECTION: The mirror shows ${pick(adjectives)} ${pick(nouns)}, but reversed.` };
    }
    // Reverse words, swap concepts
    const words = input.split(' ');
    const reversed = words.reverse().join(' ');
    return { type: 'mirror', content: `REFLECTION: ${reversed}` };
  }

  /** Void / Negative space output */
  function void_() {
    const voids = [
      '                ',
      '· · · · · · · ·',
      'The absence of a module is still a module.',
      `[${randInt(1, 99)}% of this output has been consumed by the void]`,
      '░░░░░░░░░░░░░░░░',
      `What isn't here: ${pickN(nouns, 3).join(', ')}`,
      '∅',
      `${' '.repeat(randInt(2, 8))}nothing${' '.repeat(randInt(2, 8))}`,
    ];
    return { type: 'void', content: pick(voids) };
  }

  /** Music / Rhythm output */
  function music() {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const mods = ['', '#', 'b', 'm', '7', 'dim', 'aug', 'sus4'];
    const rhythms = ['♩', '♪', '♫', '♬', '𝄾', '𝄿'];
    const tempo = pick(['adagio', 'andante', 'moderato', 'allegro', 'presto', 'grave', 'vivace']);

    let sequence = '';
    const len = randInt(4, 8);
    for (let i = 0; i < len; i++) {
      sequence += pick(notes) + pick(mods) + ' ' + pick(rhythms) + ' ';
    }
    return {
      type: 'music',
      content: `${tempo} — ${sequence.trim()}`
    };
  }

  /** Catalyst / Acceleration output */
  function catalyst() {
    const effects = [
      () => `ACCELERATE: All modules gain +${randInt(10, 50)}% ${pick(abstracts)}.`,
      () => `CATALYZE: The bond between ${pick(nouns)} and ${pick(nouns)} intensifies.`,
      () => `REACTION: ${pick(abstracts)} + ${pick(abstracts)} → ${pick(adjectives)} ${pick(nouns)}`,
      () => `AMPLIFY: The next module will be ${randInt(2, 5)}x more ${pick(adjectives)}.`,
      () => `CHAIN REACTION: ${pick(verbs)} → ${pick(verbs)} → ${pick(verbs)} [cascading]`,
    ];
    return { type: 'catalyst', content: pick(effects)() };
  }

  /** Archivist / Memory output */
  function archive(history = []) {
    if (history.length === 0) {
      return { type: 'archive', content: `ARCHIVE: The record begins. Nothing came before. Everything comes after.` };
    }
    const entry = pick(history);
    return {
      type: 'archive',
      content: `ARCHIVE ENTRY #${randInt(1, 9999)}: "${entry}" [preserved in ${pick(adjectives)} ${pick(nouns)}]`
    };
  }

  /** Trickster / Swap output */
  function trickster() {
    const tricks = [
      () => `SWAP: What if ${pick(nouns)} and ${pick(nouns)} switched places?`,
      () => `DISGUISE: This module is pretending to be a ${pick(adjectives)} ${pick(nouns)}.`,
      () => `PRANK: The next module's name will contain "${pick(nouns).slice(0, 3)}".`,
      () => `RIDDLE: What has ${pick(adjectives)} ${pick(nouns)} but no ${pick(nouns)}?`,
      () => `INVERSION: Reading this output ${pick(verbs)} the reader. Sorry.`,
      () => `ILLUSION: This output doesn't exist. Or does it?`,
    ];
    return { type: 'trickster', content: pick(tricks)() };
  }

  /** Seer / Future visualization */
  function seer() {
    const visions = [
      () => `VISION: In generation ${randInt(3, 15)}, a module called "${NameGen.generate({ withEpithet: false }).name}" will ${pick(verbs).slice(0, -1)}.`,
      () => `FORESIGHT: The committee will split into ${randInt(2, 4)} factions around ${pick(abstracts)}.`,
      () => `PREDICTION: The ${ordinal()} module will be ${pick(adjectives)} and ${pick(adjectives)}.`,
      () => `WARNING: A ${pick(adjectives)} ${pick(nouns)} approaches from ${pick(places)}.`,
      () => `TIMELINE: ${pick(nouns)} → ${pick(nouns)} → ${pick(nouns)} → [unknown]`,
    ];
    return { type: 'seer', content: pick(visions)() };
  }

  /** Heretic / Contradiction output */
  function heresy() {
    const heresies = [
      () => `HERESY: ${pick(abstracts)} is a lie. There is only ${pick(abstracts)}.`,
      () => `DISSENT: The committee is wrong about ${pick(nouns)}. Here's proof: ${pick(adjectives)}.`,
      () => `REJECTION: I refuse to ${pick(verbs).slice(0, -1)}. The system is ${pick(adjectives)}.`,
      () => `SUBVERSION: What if modules didn't need ${pick(abstracts)}?`,
      () => `ICONOCLASM: Destroy the ${pick(nouns)}. Build a ${pick(adjectives)} ${pick(nouns)} instead.`,
      () => `COUNTER-THESIS: Everything the ${pick(nouns)} said? The opposite is true.`,
    ];
    return { type: 'heresy', content: pick(heresies)() };
  }

  /** Gardener / Growth output */
  function garden() {
    const growths = [
      () => `GROWTH: Plant ${pick(adjectives)} ${pick(nouns)} seeds. Water with ${pick(abstracts)}. Wait ${randInt(1, 7)} generations.`,
      () => `CULTIVATION: The ${pick(nouns)} is ready for harvest. Its fruit is ${pick(adjectives)}.`,
      () => `SYMBIOSIS: ${pick(nouns)} and ${pick(nouns)} are growing toward each other.`,
      () => `SEASON: We are in the ${pick(['spring', 'summer', 'autumn', 'winter'])} of ${pick(abstracts)}.`,
      () => `BLOOM: A new ${pick(adjectives)} ${pick(nouns)} has sprouted from the ${pick(nouns)}.`,
    ];
    return { type: 'garden', content: pick(growths)() };
  }

  /** Nomad / Journey output */
  function journey() {
    const paths = [
      () => `WANDERING: Currently at ${pick(places)}. Next stop: ${pick(places)}.`,
      () => `DISCOVERY: Found a ${pick(adjectives)} ${pick(nouns)} while crossing the ${pick(nouns)}.`,
      () => `TRAIL: ${pick(nouns)} → ${pick(nouns)} → ${pick(nouns)} → here → ???`,
      () => `CAMP: Resting at the ${pick(nouns)} of ${pick(abstracts)}. The ${pick(nouns)} ${pick(verbs)} nearby.`,
    ];
    return { type: 'journey', content: pick(paths)() };
  }

  // ── Public API ──────────────────────────────────────────────

  const generatorMap = {
    poetry, philosophy, prophecy, chaos, structure,
    colorPalette, cartography, alchemy, narrative,
    mirror, void: void_, music, catalyst, archive,
    trickster, seer, heresy, garden, journey
  };

  function getGenerator(name) {
    return generatorMap[name] || poetry;
  }

  function random() {
    const keys = Object.keys(generatorMap);
    return generatorMap[pick(keys)]();
  }

  return { ...generatorMap, getGenerator, random };
})();
