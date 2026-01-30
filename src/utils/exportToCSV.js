import { UK_ALLERGENS } from '../data/allergens';

/**
 * Get allergen names from an allergen object
 */
export function getAllergenNames(allergenObj) {
  return UK_ALLERGENS
    .filter(allergen => allergenObj[allergen.id])
    .map(allergen => allergen.label.split('(')[0].trim());
}

/**
 * Export ingredients list to CSV file
 */
export function exportIngredientsToCSV(ingredients) {
  const headers = ['Ingredient Name', 'Supplier', 'Contains Allergens', 'May Contain'];

  const rows = ingredients.map(ingredient => {
    const containsAllergens = getAllergenNames(ingredient.allergens).join('; ');
    const mayContainAllergens = getAllergenNames(ingredient.mayContain).join('; ');

    return [
      ingredient.name,
      ingredient.supplierName || '',
      containsAllergens || 'None',
      mayContainAllergens || 'None'
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `ingredients_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
