// Sample data for demo purposes
// Pre-populated to showcase app functionality

export const SAMPLE_INGREDIENTS = [
  {
    id: 1000,
    name: "Plain Flour",
    supplierName: "Tesco",
    allergens: { gluten: true, celery: false, crustaceans: false, eggs: false, fish: false, lupin: false, milk: false, molluscs: false, mustard: false, treeNuts: false, peanuts: false, sesame: false, soya: false, sulphites: false },
    mayContain: { gluten: false, celery: false, crustaceans: false, eggs: false, fish: false, lupin: false, milk: false, molluscs: false, mustard: false, treeNuts: false, peanuts: false, sesame: false, soya: false, sulphites: false },
    createdAt: new Date().toISOString()
  },
  {
    id: 1001,
    name: "Butter (Unsalted)",
    supplierName: "Anchor",
    allergens: { gluten: false, celery: false, crustaceans: false, eggs: false, fish: false, lupin: false, milk: true, molluscs: false, mustard: false, treeNuts: false, peanuts: false, sesame: false, soya: false, sulphites: false },
    mayContain: { gluten: false, celery: false, crustaceans: false, eggs: false, fish: false, lupin: false, milk: false, molluscs: false, mustard: false, treeNuts: false, peanuts: false, sesame: false, soya: false, sulphites: false },
    createdAt: new Date().toISOString()
  },
  {
    id: 1002,
    name: "Free Range Eggs",
    supplierName: "Local Farm",
    allergens: { gluten: false, celery: false, crustaceans: false, eggs: true, fish: false, lupin: false, milk: false, molluscs: false, mustard: false, treeNuts: false, peanuts: false, sesame: false, soya: false, sulphites: false },
    mayContain: { gluten: false, celery: false, crustaceans: false, eggs: false, fish: false, lupin: false, milk: false, molluscs: false, mustard: false, treeNuts: false, peanuts: false, sesame: false, soya: false, sulphites: false },
    createdAt: new Date().toISOString()
  },
  {
    id: 1003,
    name: "Dark Chocolate Chips",
    supplierName: "Cadbury",
    allergens: { gluten: false, celery: false, crustaceans: false, eggs: false, fish: false, lupin: false, milk: true, molluscs: false, mustard: false, treeNuts: false, peanuts: false, sesame: false, soya: true, sulphites: false },
    mayContain: { gluten: false, celery: false, crustaceans: false, eggs: false, fish: false, lupin: false, milk: false, molluscs: false, mustard: false, treeNuts: true, peanuts: false, sesame: false, soya: false, sulphites: false },
    createdAt: new Date().toISOString()
  },
  {
    id: 1004,
    name: "Almonds (Sliced)",
    supplierName: "Brakes",
    allergens: { gluten: false, celery: false, crustaceans: false, eggs: false, fish: false, lupin: false, milk: false, molluscs: false, mustard: false, treeNuts: true, peanuts: false, sesame: false, soya: false, sulphites: false },
    mayContain: { gluten: false, celery: false, crustaceans: false, eggs: false, fish: false, lupin: false, milk: false, molluscs: false, mustard: false, treeNuts: false, peanuts: true, sesame: false, soya: false, sulphites: false },
    createdAt: new Date().toISOString()
  }
];

export const SAMPLE_RECIPES = [
  {
    id: 2000,
    name: "Chocolate Croissant",
    ingredients: [
      { ingredientId: 1000, quantity: 500, unit: "g" },
      { ingredientId: 1001, quantity: 200, unit: "g" },
      { ingredientId: 1002, quantity: 3, unit: "pieces" },
      { ingredientId: 1003, quantity: 100, unit: "g" }
    ],
    createdAt: new Date().toISOString()
  }
];
