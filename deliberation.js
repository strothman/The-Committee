// ============================================================
// deliberation.js — Committee Deliberation & Genetic Algorithm
// The heart of The Committee: how new modules are born
// ============================================================

const Deliberation = (() => {

  const TRAITS = ModuleSystem.TRAITS;

  /**
   * Collect proposals from all modules.
   * Each module votes by generating a creative output + personality snapshot.
   * @param {object[]} modules - Array of existing modules
   * @returns {object[]} Array of proposals
   */
  function collectProposals(modules) {
    return modules.map(mod => mod.vote());
  }

  /**
   * Cross-pollinate proposals to determine the new module's traits.
   * This is the genetic algorithm at the core of the committee.
   * @param {object[]} proposals - Array of proposals from collectProposals
   * @param {object[]} modules - All existing modules (for context)
   * @returns {object} Blueprint for the new module
   */
  function crossPollinate(proposals, modules) {
    if (proposals.length === 0) return null;

    // ── Step 1: Weighted personality averaging ──────────────
    const avgPersonality = [0, 0, 0, 0, 0];
    let totalWeight = 0;

    proposals.forEach(p => {
      // Chaotic modules get more weight (chaos begets change)
      const w = 0.5 + p.chaos * 0.5 + Math.random() * 0.3;
      totalWeight += w;
      p.personality.forEach((trait, i) => {
        avgPersonality[i] += trait * w;
      });
    });

    avgPersonality.forEach((_, i) => {
      avgPersonality[i] /= totalWeight;
    });

    // ── Step 2: Mutation ────────────────────────────────────
    // Each trait has a chance to mutate wildly
    const mutationRate = 0.15 + (avgPersonality[1] * 0.2); // more chaos = more mutation
    const mutatedPersonality = avgPersonality.map(trait => {
      if (Math.random() < mutationRate) {
        // Wild mutation: large random shift
        const mutation = (Math.random() - 0.5) * 0.8;
        return Math.max(0, Math.min(1, trait + mutation));
      }
      // Small noise
      return Math.max(0, Math.min(1, trait + (Math.random() - 0.5) * 0.15));
    });

    // ── Step 3: Entropy injection ───────────────────────────
    // Pure randomness that no parent contributed
    if (Math.random() < 0.2) {
      // 20% chance: one trait becomes completely random
      const traitIdx = Math.floor(Math.random() * 5);
      mutatedPersonality[traitIdx] = Math.random();
    }

    // ── Step 4: Determine archetype ─────────────────────────
    const archetypeKey = determineArchetype(mutatedPersonality, proposals);

    // ── Step 5: Generate name from lineage ──────────────────
    const parentNames = proposals.map(p => p.moduleName);
    const nameData = NameGen.generateFromLineage(parentNames);

    // ── Step 6: Determine generation ────────────────────────
    const maxParentGen = Math.max(...modules.map(m => m.generation));
    const generation = maxParentGen + 1;

    return {
      archetypeKey,
      name: nameData.name,
      epithet: nameData.epithet,
      personality: mutatedPersonality,
      generation,
      parentIds: modules.map(m => m.id),
      proposals // Keep for the deliberation animation
    };
  }

  /**
   * Determine which archetype best fits the personality vector.
   * Uses distance matching with some randomness.
   */
  function determineArchetype(personality, proposals) {
    const archetypes = ModuleSystem.ARCHETYPES;
    const keys = ModuleSystem.ARCHETYPE_KEYS;

    // Calculate distance to each archetype
    const scored = keys.map(key => {
      const arch = archetypes[key];
      let distance = 0;
      personality.forEach((trait, i) => {
        distance += Math.pow(trait - arch.personality[i], 2);
      });
      distance = Math.sqrt(distance);

      // Bonus for archetypes NOT already in the committee (encourage diversity)
      const existingKeys = proposals.map(p => p.archetypeKey);
      const noveltyBonus = existingKeys.includes(key) ? 0.3 : 0;

      return { key, distance: distance + noveltyBonus, randomFactor: Math.random() * 0.4 };
    });

    // Sort by distance + random factor (introduces unpredictability)
    scored.sort((a, b) => (a.distance + a.randomFactor) - (b.distance + b.randomFactor));

    // 70% chance: pick the closest match. 30% chance: pick from top 5
    if (Math.random() < 0.3) {
      const topN = scored.slice(0, Math.min(5, scored.length));
      return topN[Math.floor(Math.random() * topN.length)].key;
    }

    return scored[0].key;
  }

  /**
   * Birth a new module from a blueprint.
   * @param {object} blueprint - Output from crossPollinate
   * @returns {object} The new module
   */
  function birthModule(blueprint) {
    return ModuleSystem.createModule({
      archetypeKey: blueprint.archetypeKey,
      name: blueprint.name,
      epithet: blueprint.epithet,
      personality: blueprint.personality,
      generation: blueprint.generation,
      parentIds: blueprint.parentIds
    });
  }

  /**
   * Full deliberation cycle: collect, cross-pollinate, birth.
   * @param {object[]} modules - All existing modules
   * @returns {object} { proposals, blueprint, newModule }
   */
  function deliberate(modules) {
    const proposals = collectProposals(modules);
    const blueprint = crossPollinate(proposals, modules);
    const newModule = birthModule(blueprint);

    return { proposals, blueprint, newModule };
  }

  return { collectProposals, crossPollinate, birthModule, deliberate };
})();
