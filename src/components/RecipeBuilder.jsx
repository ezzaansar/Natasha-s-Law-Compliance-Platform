import { useState } from 'react';
import { useToast } from './Toast';

function RecipeBuilder({ ingredients, onAddRecipe }) {
  const [recipeName, setRecipeName] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [currentQuantity, setCurrentQuantity] = useState('');
  const [currentUnit, setCurrentUnit] = useState('g');
  const { addToast } = useToast();

  const handleAddIngredient = () => {
    if (!currentIngredient || !currentQuantity) {
      addToast('Please select an ingredient and enter a quantity', 'warning');
      return;
    }

    const ingredient = ingredients.find(ing => ing.id === parseInt(currentIngredient));
    if (!ingredient) return;

    setSelectedIngredients(prev => [
      ...prev,
      {
        ingredientId: parseInt(currentIngredient),
        ingredientName: ingredient.name,
        quantity: parseFloat(currentQuantity),
        unit: currentUnit
      }
    ]);

    addToast(`${ingredient.name} added to recipe`, 'success');

    // Reset fields
    setCurrentIngredient('');
    setCurrentQuantity('');
    setCurrentUnit('g');
  };

  const handleRemoveIngredient = (index) => {
    const removed = selectedIngredients[index];
    setSelectedIngredients(prev => prev.filter((_, i) => i !== index));
    addToast(`${removed.ingredientName} removed`, 'info');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      addToast('Please enter a recipe name', 'error');
      return;
    }

    if (selectedIngredients.length === 0) {
      addToast('Please add at least one ingredient', 'error');
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name: recipeName.trim(),
      ingredients: selectedIngredients.map(ing => ({
        ingredientId: ing.ingredientId,
        quantity: ing.quantity,
        unit: ing.unit
      })),
      createdAt: new Date().toISOString()
    };

    onAddRecipe(newRecipe);
    addToast(`Recipe "${recipeName.trim()}" created!`, 'success');

    // Reset form
    setRecipeName('');
    setSelectedIngredients([]);
    setCurrentIngredient('');
    setCurrentQuantity('');
    setCurrentUnit('g');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Recipe Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recipe Name *
          </label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            placeholder="e.g., Chocolate Croissant"
          />
        </div>

        {/* Add Ingredient Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Add Ingredients</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ingredient
              </label>
              <select
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              >
                <option value="">Select ingredient...</option>
                {ingredients.map(ing => (
                  <option key={ing.id} value={ing.id}>
                    {ing.name} {ing.supplierName ? `(${ing.supplierName})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={currentQuantity}
                onChange={(e) => setCurrentQuantity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                placeholder="500"
                min="0"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={currentUnit}
                onChange={(e) => setCurrentUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              >
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value="pieces">pieces</option>
                <option value="cups">cups</option>
                <option value="tbsp">tbsp</option>
                <option value="tsp">tsp</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddIngredient}
            className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 hover:shadow-md transition-all duration-200"
          >
            + Add to Recipe
          </button>
        </div>

        {/* Selected Ingredients List */}
        {selectedIngredients.length > 0 && (
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Recipe Ingredients ({selectedIngredients.length})
            </h3>
            <div className="space-y-2">
              {selectedIngredients.map((ing, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 font-medium">{ing.ingredientName}</span>
                    <span className="text-gray-500 text-sm">
                      {ing.quantity} {ing.unit}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(idx)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default RecipeBuilder;
