// 14 UK Allergens (Natasha's Law)
export const UK_ALLERGENS = [
  { id: 'celery', label: 'Celery' },
  { id: 'gluten', label: 'Gluten (wheat, rye, barley, oats)' },
  { id: 'crustaceans', label: 'Crustaceans (crab, lobster, prawns)' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'fish', label: 'Fish' },
  { id: 'lupin', label: 'Lupin' },
  { id: 'milk', label: 'Milk' },
  { id: 'molluscs', label: 'Molluscs (mussels, oysters, squid)' },
  { id: 'mustard', label: 'Mustard' },
  { id: 'treeNuts', label: 'Tree Nuts (almonds, hazelnuts, walnuts)' },
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'sesame', label: 'Sesame seeds' },
  { id: 'soya', label: 'Soya' },
  { id: 'sulphites', label: 'Sulphites (>10mg/kg or 10mg/litre)' }
];

// Helper function to create empty allergen object
export const createEmptyAllergens = () => {
  const allergens = {};
  UK_ALLERGENS.forEach(allergen => {
    allergens[allergen.id] = false;
  });
  return allergens;
};
