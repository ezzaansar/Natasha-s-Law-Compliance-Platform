import { UK_ALLERGENS } from '../data/allergens';

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
