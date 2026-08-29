// ============================================================
// names.js — Procedural Name Generator for The Committee
// Generates evocative, mythological, cosmic module names
// ============================================================

const NameGen = (() => {
  // Syllable banks — designed to feel mythological and resonant
  const prefixes = [
    'Ael', 'Asha', 'Bal', 'Cael', 'Dra', 'Eld', 'Fen', 'Gal',
    'Hel', 'Ith', 'Jor', 'Kal', 'Lum', 'Mor', 'Nyx', 'Ohr',
    'Pyr', 'Qua', 'Rhi', 'Sol', 'Tha', 'Umb', 'Vel', 'Wyr',
    'Xen', 'Zar', 'Aur', 'Bri', 'Cro', 'Dei', 'Ech', 'Fyr',
    'Glo', 'Hex', 'Ion', 'Kha', 'Lyr', 'Mys', 'Neb', 'Oph',
    'Pho', 'Ris', 'Syl', 'Ter', 'Und', 'Vox', 'Wyn', 'Zan',
    'Ash', 'Cor', 'Dusk', 'Ere', 'Flux', 'Grim', 'Haze',
    'Iris', 'Jade', 'Kern', 'Luna', 'Mist', 'Nova', 'Obsid',
    'Prism', 'Rune', 'Shade', 'Thorn', 'Ulm', 'Veil', 'Wraith'
  ];

  const middles = [
    'an', 'en', 'in', 'on', 'un', 'ar', 'er', 'ir', 'or', 'ur',
    'al', 'el', 'il', 'ol', 'ul', 'ath', 'eth', 'ith', 'oth',
    'ax', 'ex', 'ix', 'ox', 'ux', 'am', 'em', 'im', 'om',
    'as', 'es', 'is', 'os', 'us', 'ia', 'ea', 'oa', 'ua',
    'iel', 'ael', 'ael', 'oph', 'yth', 'yx', 'ix', ''
  ];

  const suffixes = [
    'ius', 'ara', 'eon', 'ith', 'oth', 'yre', 'ane', 'ium',
    'ora', 'ios', 'ael', 'une', 'ira', 'oss', 'yx', 'enn',
    'ark', 'usk', 'awn', 'eld', 'orn', 'yst', 'ume', 'ire',
    'ax', 'is', 'os', 'us', 'a', 'e', 'o', 'i',
    'on', 'an', 'en', 'in', 'ath', 'eth', 'oph',
    'alis', 'eris', 'oris', 'unis', 'axis', 'exis'
  ];

  // Title epithets — poetic descriptors
  const epithets = [
    'the Unbound', 'the Luminous', 'the Fading', 'the Radiant',
    'the Hollow', 'the Eternal', 'the Fractured', 'the Silent',
    'the Burning', 'the Frozen', 'the Wandering', 'the Dreaming',
    'the Forgotten', 'the Ascending', 'the Shapeless', 'the Gilded',
    'the Obsidian', 'the Prismatic', 'the Tidal', 'the Spectral',
    'the Recursive', 'the Boundless', 'the Mercurial', 'the Cryptic',
    'the Resonant', 'the Bifurcated', 'the Emergent', 'the Liminal',
    'the Incandescent', 'the Phosphorescent', 'the Atemporal',
    'the Tessellated', 'the Iridescent', 'the Chromatic',
    'the Verdant', 'the Abyssal', 'the Celestial', 'the Umbral',
    'the Seraphic', 'the Volcanic', 'the Crystalline', 'the Nebular',
    'Who Remembers', 'Who Forgets', 'Who Waits', 'Who Burns',
    'of Many Faces', 'of No Return', 'of the Threshold',
    'Between Worlds', 'Before Dawn', 'After Silence',
    'the Last', 'the First', 'the Only', 'the Other'
  ];

  // Rare two-word names — sometimes the generator picks these instead
  const rarePrefixes = [
    'Void', 'Star', 'Dream', 'Storm', 'Bone', 'Iron', 'Glass',
    'Rust', 'Silk', 'Ash', 'Salt', 'Thorn', 'Moss', 'Coral',
    'Ember', 'Frost', 'Dusk', 'Dawn', 'Ruin', 'Echo', 'Gloom',
    'Bloom', 'Shard', 'Smoke', 'Mist', 'Flame', 'Stone', 'Root'
  ];

  const rareSuffixes = [
    'walker', 'weaver', 'singer', 'keeper', 'binder', 'breaker',
    'caller', 'shaper', 'finder', 'maker', 'dancer', 'drinker',
    'eater', 'speaker', 'watcher', 'herald', 'born', 'touched',
    'sworn', 'marked', 'crowned', 'veiled', 'lost', 'found',
    'woven', 'spun', 'forged', 'carved', 'grown', 'dreamt'
  ];

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Generate a procedural name.
   * @param {object} [opts] - Options
   * @param {boolean} [opts.withEpithet=true] - Whether to include an epithet
   * @returns {object} { name, epithet, fullName }
   */
  function generate(opts = {}) {
    const withEpithet = opts.withEpithet !== false;
    let name;

    // 20% chance of a rare compound name
    if (Math.random() < 0.2) {
      name = pick(rarePrefixes) + pick(rareSuffixes);
      // Capitalize properly
      name = name.charAt(0).toUpperCase() + name.slice(1);
    } else {
      // Standard mythological name
      const p = pick(prefixes);
      const m = Math.random() < 0.5 ? pick(middles) : '';
      const s = pick(suffixes);
      name = p + m + s;
    }

    // Ensure name isn't too short or too long
    if (name.length < 4) name += pick(suffixes);
    if (name.length > 14) name = name.slice(0, 12);

    const epithet = withEpithet ? pick(epithets) : null;
    const fullName = epithet ? `${name}, ${epithet}` : name;

    return { name, epithet, fullName };
  }

  /**
   * Generate a name influenced by parent traits.
   * Takes syllables from parent names and recombines.
   */
  function generateFromLineage(parentNames = []) {
    if (parentNames.length === 0) return generate();

    // 40% chance to incorporate a parent syllable
    if (Math.random() < 0.4 && parentNames.length > 0) {
      const parent = pick(parentNames);
      const syllable = parent.slice(0, Math.min(3, parent.length));
      const mid = Math.random() < 0.5 ? pick(middles) : '';
      const suf = pick(suffixes);
      const name = syllable + mid + suf;
      const epithet = pick(epithets);
      return {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        epithet,
        fullName: `${name.charAt(0).toUpperCase() + name.slice(1)}, ${epithet}`
      };
    }

    return generate();
  }

  return { generate, generateFromLineage, pick };
})();
