// ============================================================
// audio.js — Web Audio API Music Generator for The Committee
// Each musical archetype generates actual playable sound
// ============================================================

const AudioEngine = (() => {
  let audioCtx = null;
  let masterGain = null;
  let isPlaying = false;
  let currentSequence = null;
  let scheduledNodes = [];

  function getContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.3;
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function stopAll() {
    scheduledNodes.forEach(n => {
      try { n.stop(); } catch(e) {}
      try { n.disconnect(); } catch(e) {}
    });
    scheduledNodes = [];
    isPlaying = false;
    if (currentSequence) {
      clearTimeout(currentSequence);
      currentSequence = null;
    }
  }

  // ── Scales & Music Theory ──────────────────────────────────

  const SCALES = {
    pentatonic:  [0, 2, 4, 7, 9],
    minor:       [0, 2, 3, 5, 7, 8, 10],
    major:       [0, 2, 4, 5, 7, 9, 11],
    dorian:      [0, 2, 3, 5, 7, 9, 10],
    phrygian:    [0, 1, 3, 5, 7, 8, 10],
    lydian:      [0, 2, 4, 6, 7, 9, 11],
    mixolydian:  [0, 2, 4, 5, 7, 9, 10],
    blues:       [0, 3, 5, 6, 7, 10],
    chromatic:   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    wholetone:   [0, 2, 4, 6, 8, 10],
    japanese:    [0, 1, 5, 7, 8],
    arabic:      [0, 1, 4, 5, 7, 8, 11],
    hungarian:   [0, 2, 3, 6, 7, 8, 11],
  };

  function midiToFreq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

  function pickScale(personality) {
    // Personality-driven scale selection
    const chaos = personality[1];
    const emotion = personality[3];
    const structure = personality[2];

    if (chaos > 0.7) return Math.random() < 0.5 ? 'chromatic' : 'hungarian';
    if (emotion > 0.7) return Math.random() < 0.5 ? 'minor' : 'phrygian';
    if (structure > 0.7) return Math.random() < 0.5 ? 'major' : 'lydian';
    const scales = Object.keys(SCALES);
    return scales[Math.floor(Math.random() * scales.length)];
  }

  function getNote(scale, rootMidi, degree) {
    const s = SCALES[scale] || SCALES.pentatonic;
    const octave = Math.floor(degree / s.length);
    const idx = ((degree % s.length) + s.length) % s.length;
    return rootMidi + s[idx] + octave * 12;
  }

  // ── Synth Voices ───────────────────────────────────────────

  function playNote(freq, startTime, duration, type = 'sine', volume = 0.15) {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    // ADSR envelope
    const attack = Math.min(duration * 0.1, 0.05);
    const decay = duration * 0.2;
    const sustain = volume * 0.6;
    const release = Math.min(duration * 0.3, 0.3);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + attack);
    gain.gain.linearRampToValueAtTime(sustain, startTime + attack + decay);
    gain.gain.setValueAtTime(sustain, startTime + duration - release);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
    scheduledNodes.push(osc);

    return osc;
  }

  function playChord(freqs, startTime, duration, type = 'sine', volume = 0.08) {
    freqs.forEach(f => playNote(f, startTime, duration, type, volume));
  }

  function playDrum(startTime, type = 'kick') {
    const ctx = getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noise = type !== 'kick';

    if (type === 'kick') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, startTime);
      osc.frequency.exponentialRampToValueAtTime(30, startTime + 0.15);
      gain.gain.setValueAtTime(0.5, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
      osc.connect(gain); gain.connect(masterGain);
      osc.start(startTime); osc.stop(startTime + 0.25);
      scheduledNodes.push(osc);
    } else if (type === 'hihat') {
      // Use high-freq oscillator as pseudo-noise
      osc.type = 'square';
      osc.frequency.setValueAtTime(8000 + Math.random() * 4000, startTime);
      gain.gain.setValueAtTime(0.06, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);
      osc.connect(gain); gain.connect(masterGain);
      osc.start(startTime); osc.stop(startTime + 0.08);
      scheduledNodes.push(osc);
    } else if (type === 'snare') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(200, startTime);
      osc.frequency.exponentialRampToValueAtTime(50, startTime + 0.1);
      gain.gain.setValueAtTime(0.3, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
      osc.connect(gain); gain.connect(masterGain);
      osc.start(startTime); osc.stop(startTime + 0.2);
      scheduledNodes.push(osc);
      // Noise component
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(5000 + Math.random() * 3000, startTime);
      gain2.gain.setValueAtTime(0.08, startTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
      osc2.connect(gain2); gain2.connect(masterGain);
      osc2.start(startTime); osc2.stop(startTime + 0.15);
      scheduledNodes.push(osc2);
    }
  }

  // ── Music Generation Styles ────────────────────────────────

  /**
   * Generate and play music based on a module's personality.
   * Returns metadata about what was generated.
   */
  function generate(module) {
    stopAll();
    isPlaying = true;
    const ctx = getContext();
    const now = ctx.currentTime + 0.1;
    const personality = module.personality;
    const creativity = personality[0];
    const chaos = personality[1];
    const structure = personality[2];
    const emotion = personality[3];
    const logic = personality[4];

    const scaleName = pickScale(personality);
    const rootMidi = 48 + Math.floor(Math.random() * 12); // C3-B3
    const bpm = Math.floor(60 + creativity * 60 + chaos * 40 + (Math.random() - 0.5) * 30);
    const beatDur = 60 / bpm;

    let description = '';

    // Choose generation style based on personality balance
    if (emotion > 0.6 && chaos < 0.5) {
      description = generateAmbient(ctx, now, scaleName, rootMidi, beatDur, personality);
    } else if (structure > 0.6 && logic > 0.5) {
      description = generateSequence(ctx, now, scaleName, rootMidi, beatDur, personality);
    } else if (chaos > 0.6) {
      description = generateGlitch(ctx, now, scaleName, rootMidi, beatDur, personality);
    } else if (creativity > 0.7) {
      description = generateMelody(ctx, now, scaleName, rootMidi, beatDur, personality);
    } else {
      description = generateRhythmic(ctx, now, scaleName, rootMidi, beatDur, personality);
    }

    return {
      type: 'music',
      scale: scaleName,
      bpm,
      rootNote: rootMidi,
      description,
      duration: 8
    };
  }

  function generateAmbient(ctx, now, scale, root, beat, personality) {
    // Dreamy pads and long sustained notes
    const duration = 8;
    const noteCount = 3 + Math.floor(Math.random() * 3);
    const waveTypes = ['sine', 'triangle'];

    for (let i = 0; i < noteCount; i++) {
      const degree = Math.floor(Math.random() * 8);
      const midi = getNote(scale, root, degree);
      const freq = midiToFreq(midi);
      const start = now + i * (duration / noteCount) * Math.random();
      const dur = 2 + Math.random() * 4;
      const type = waveTypes[Math.floor(Math.random() * waveTypes.length)];
      playNote(freq, start, dur, type, 0.08 + Math.random() * 0.06);

      // Occasional harmony
      if (Math.random() < 0.5) {
        const harmDegree = degree + (Math.random() < 0.5 ? 2 : 4);
        const harmFreq = midiToFreq(getNote(scale, root, harmDegree));
        playNote(harmFreq, start + 0.2, dur - 0.4, type, 0.04);
      }
    }

    // Sub bass drone
    playNote(midiToFreq(root - 12), now, duration, 'sine', 0.06);

    return `ambient · ${scale} · drone at ${Math.round(midiToFreq(root))}Hz`;
  }

  function generateSequence(ctx, now, scale, root, beat, personality) {
    // Structured arpeggio pattern
    const steps = 16;
    const pattern = [];
    for (let i = 0; i < steps; i++) {
      pattern.push(Math.random() < 0.7 ? Math.floor(Math.random() * 8) : -1);
    }

    // Play 2 loops
    for (let loop = 0; loop < 2; loop++) {
      for (let i = 0; i < steps; i++) {
        const t = now + (loop * steps + i) * beat * 0.5;
        if (pattern[i] >= 0) {
          const midi = getNote(scale, root, pattern[i]);
          playNote(midiToFreq(midi), t, beat * 0.4, 'square', 0.07);
        }
        // Percussion
        if (i % 4 === 0) playDrum(t, 'kick');
        if (i % 4 === 2) playDrum(t, 'snare');
        if (i % 2 === 0) playDrum(t, 'hihat');
      }
    }

    return `sequence · ${scale} · ${Math.round(60 / beat)}bpm · 16-step`;
  }

  function generateGlitch(ctx, now, scale, root, beat, personality) {
    // Chaotic, unpredictable bursts
    const events = 15 + Math.floor(Math.random() * 20);
    const waveTypes = ['square', 'sawtooth', 'triangle', 'sine'];

    for (let i = 0; i < events; i++) {
      const t = now + Math.random() * 7;
      const dur = 0.02 + Math.random() * 0.3;

      if (Math.random() < 0.6) {
        const midi = root + Math.floor(Math.random() * 36) - 12;
        const type = waveTypes[Math.floor(Math.random() * waveTypes.length)];
        playNote(midiToFreq(midi), t, dur, type, 0.05 + Math.random() * 0.1);
      } else {
        playDrum(t, ['kick', 'snare', 'hihat'][Math.floor(Math.random() * 3)]);
      }
    }

    // Occasional glitch repeats
    const glitchNote = midiToFreq(root + Math.floor(Math.random() * 12));
    for (let r = 0; r < 8; r++) {
      playNote(glitchNote, now + 3 + r * 0.05, 0.03, 'square', 0.1);
    }

    return `glitch · ${scale} · ${events} chaotic events`;
  }

  function generateMelody(ctx, now, scale, root, beat, personality) {
    // Singable melody with variation
    const phraseLen = 8;
    const phrases = 2;
    let prevDegree = 0;

    for (let p = 0; p < phrases; p++) {
      for (let i = 0; i < phraseLen; i++) {
        const t = now + (p * phraseLen + i) * beat;

        // Melodic movement: prefer steps, occasional leaps
        const movement = Math.random() < 0.7
          ? (Math.random() < 0.5 ? 1 : -1)
          : Math.floor((Math.random() - 0.5) * 6);
        prevDegree = Math.max(-3, Math.min(10, prevDegree + movement));

        // Rest chance
        if (Math.random() < 0.15) continue;

        const midi = getNote(scale, root, prevDegree);
        const dur = Math.random() < 0.3 ? beat * 2 : beat * 0.8;
        playNote(midiToFreq(midi), t, dur, 'triangle', 0.1);
      }
    }

    // Simple bass
    for (let i = 0; i < phraseLen * phrases; i += 2) {
      const t = now + i * beat;
      playNote(midiToFreq(root - 12), t, beat * 1.8, 'sine', 0.06);
    }

    return `melody · ${scale} · ${phraseLen * phrases} notes · ${Math.round(60 / beat)}bpm`;
  }

  function generateRhythmic(ctx, now, scale, root, beat, personality) {
    // Percussion-focused with bass
    const steps = 16;
    const loops = 2;

    // Generate pattern
    const kickPattern = Array(steps).fill(0).map((_, i) => i % 4 === 0 || (Math.random() < 0.2) ? 1 : 0);
    const snarePattern = Array(steps).fill(0).map((_, i) => i % 4 === 2 ? 1 : (Math.random() < 0.1 ? 1 : 0));
    const hihatPattern = Array(steps).fill(0).map(() => Math.random() < 0.6 ? 1 : 0);

    for (let loop = 0; loop < loops; loop++) {
      for (let i = 0; i < steps; i++) {
        const t = now + (loop * steps + i) * beat * 0.5;
        if (kickPattern[i]) playDrum(t, 'kick');
        if (snarePattern[i]) playDrum(t, 'snare');
        if (hihatPattern[i]) playDrum(t, 'hihat');

        // Occasional bass note
        if (i % 4 === 0) {
          const degree = Math.floor(Math.random() * 3);
          playNote(midiToFreq(getNote(scale, root - 12, degree)), t, beat, 'sine', 0.08);
        }
      }
    }

    return `rhythm · ${Math.round(60 / beat)}bpm · kick-snare-hat pattern`;
  }

  return { generate, stopAll, getContext, isPlaying: () => isPlaying };
})();
