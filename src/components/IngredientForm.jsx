import { useState } from 'react';
import { createEmptyAllergens } from '../data/allergens';
import AllergenSelector from './AllergenSelector';
import { useToast } from './Toast';

function IngredientForm({ onAddIngredient }) {
  const [name, setName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [allergens, setAllergens] = useState(createEmptyAllergens());
  const [mayContain, setMayContain] = useState(createEmptyAllergens());
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      addToast('Please enter an ingredient name', 'error');
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
    addToast(`${name.trim()} added successfully!`, 'success');

    // Reset form
    setName('');
    setSupplierName('');
    setAllergens(createEmptyAllergens());
    setMayContain(createEmptyAllergens());
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-200">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              placeholder="e.g., Anchor"
            />
          </div>
        </div>

        {/* Contains Allergens */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
            Contains Allergens
          </h3>
          <AllergenSelector
            selected={allergens}
            onChange={setAllergens}
            type="contains"
          />
        </div>

        {/* May Contain Allergens */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
            May Contain (Cross-contamination)
          </h3>
          <AllergenSelector
            selected={mayContain}
            onChange={setMayContain}
            type="mayContain"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Ingredient
        </button>
      </form>
    </div>
  );
}

export default IngredientForm;
