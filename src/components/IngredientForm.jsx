import { useState } from 'react';
import { UK_ALLERGENS, createEmptyAllergens } from '../data/allergens';

function IngredientForm({ onAddIngredient }) {
  const [name, setName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [allergens, setAllergens] = useState(createEmptyAllergens());
  const [mayContain, setMayContain] = useState(createEmptyAllergens());

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter an ingredient name');
      return;
    }

    const newIngredient = {
      id: Date.now(),
      name: name.trim(),
      supplierName: supplierName.trim(),
      allergens,
      mayContain,
      createdAt: new Date().toISOString()
    };

    onAddIngredient(newIngredient);

    // Reset form
    setName('');
    setSupplierName('');
    setAllergens(createEmptyAllergens());
    setMayContain(createEmptyAllergens());
  };

  const handleAllergenChange = (allergenId) => {
    setAllergens(prev => ({
      ...prev,
      [allergenId]: !prev[allergenId]
    }));
  };

  const handleMayContainChange = (allergenId) => {
    setMayContain(prev => ({
      ...prev,
      [allergenId]: !prev[allergenId]
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Ingredient</h2>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredient Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Plain Flour"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Supplier Name
            </label>
            <input
              type="text"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Anchor"
            />
          </div>
        </div>

        {/* Contains Allergens */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Contains Allergens
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {UK_ALLERGENS.map(allergen => (
              <label
                key={allergen.id}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={allergens[allergen.id]}
                  onChange={() => handleAllergenChange(allergen.id)}
                  className="w-4 h-4 text-red-600 focus:ring-red-500 rounded"
                />
                <span className="text-sm text-gray-700">{allergen.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* May Contain Allergens */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            May Contain (Cross-contamination)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {UK_ALLERGENS.map(allergen => (
              <label
                key={allergen.id}
                className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={mayContain[allergen.id]}
                  onChange={() => handleMayContainChange(allergen.id)}
                  className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 rounded"
                />
                <span className="text-sm text-gray-700">{allergen.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Ingredient
        </button>
      </form>
    </div>
  );
}

export default IngredientForm;
