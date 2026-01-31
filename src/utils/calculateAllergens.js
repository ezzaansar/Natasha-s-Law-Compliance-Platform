import { UK_ALLERGENS } from '../data/allergens';

/**
 * Get allergen label from ID
 */
export const getAllergenLabel = (id) => {
  const allergen = UK_ALLERGENS.find(a => a.id === id);
  return allergen ? allergen.label.split('(')[0].trim() : id;
};

/**
 * Calculate allergens from recipe ingredients (Deterministic Algorithm)
 * @param {Array} ingredients - Array of ingredient objects
 * @returns {Object} - { contains: [], mayContain: [] }
 */
export function calculateRecipeAllergens(ingredients) {
  const contains = new Set();
  const mayContain = new Set();

  // Aggregate all allergens from ingredients
  ingredients.forEach(ingredient => {
    // Add "contains" allergens
    Object.entries(ingredient.allergens || {}).forEach(([allergen, value]) => {
      if (value) contains.add(allergen);
    });

    // Add "may contain" allergens
    Object.entries(ingredient.mayContain || {}).forEach(([allergen, value]) => {
      if (value) mayContain.add(allergen);
    });
  });

  // Remove duplicates: if "contains X", remove X from "may contain"
  mayContain.forEach(allergen => {
    if (contains.has(allergen)) {
      mayContain.delete(allergen);
    }
  });

  // Convert to arrays and sort alphabetically
  const containsArray = Array.from(contains).sort();
  const mayContainArray = Array.from(mayContain).sort();

  // Get full allergen labels
  const getAllergenLabel = (id) => {
    const allergen = UK_ALLERGENS.find(a => a.id === id);
    return allergen ? allergen.label.split('(')[0].trim() : id;
  };

  return {
    contains: containsArray.map(id => ({ id, label: getAllergenLabel(id) })),
    mayContain: mayContainArray.map(id => ({ id, label: getAllergenLabel(id) }))
  };
}

/**
 * Calculate final allergens with overrides (inherited + manual)
 * @param {Array} ingredients - Array of ingredient objects
 * @param {Object} overrides - { contains: [], mayContain: [], reasons: {} }
 * @returns {Object} - { inherited: {...}, overrides: {...}, final: {...} }
 */
export function calculateAllergensWithOverrides(ingredients, overrides = {}) {
  // Get inherited allergens from ingredients
  const inherited = calculateRecipeAllergens(ingredients);

  // Get override allergens
  const overrideContains = (overrides.contains || []).map(id => ({
    id,
    label: getAllergenLabel(id),
    reason: overrides.reasons?.[id] || ''
  }));

  const overrideMayContain = (overrides.mayContain || []).map(id => ({
    id,
    label: getAllergenLabel(id),
    reason: overrides.reasons?.[id] || ''
  }));

  // Merge: inherited + overrides (no duplicates)
  const inheritedContainsIds = new Set(inherited.contains.map(a => a.id));
  const inheritedMayContainIds = new Set(inherited.mayContain.map(a => a.id));

  // Final contains = inherited + override (exclude duplicates)
  const finalContains = [
    ...inherited.contains.map(a => ({ ...a, source: 'inherited' })),
    ...overrideContains
      .filter(a => !inheritedContainsIds.has(a.id))
      .map(a => ({ ...a, source: 'manual' }))
  ];

  // Final mayContain = inherited + override (exclude duplicates and those in contains)
  const finalContainsIds = new Set(finalContains.map(a => a.id));
  const finalMayContain = [
    ...inherited.mayContain
      .filter(a => !finalContainsIds.has(a.id))
      .map(a => ({ ...a, source: 'inherited' })),
    ...overrideMayContain
      .filter(a => !inheritedMayContainIds.has(a.id) && !finalContainsIds.has(a.id))
      .map(a => ({ ...a, source: 'manual' }))
  ];

  return {
    inherited,
    overrides: {
      contains: overrideContains,
      mayContain: overrideMayContain
    },
    final: {
      contains: finalContains,
      mayContain: finalMayContain
    }
  };
}
