import { UK_ALLERGENS } from '../data/allergens';

function Dashboard({ ingredients }) {
  // Calculate statistics
  const totalIngredients = ingredients.length;

  // Count allergens across all ingredients
  const allergenCounts = {};
  UK_ALLERGENS.forEach(allergen => {
    allergenCounts[allergen.id] = 0;
  });

  ingredients.forEach(ingredient => {
    Object.entries(ingredient.allergens || {}).forEach(([allergen, value]) => {
      if (value) allergenCounts[allergen]++;
    });
  });

  // Get most common allergens
  const topAllergens = Object.entries(allergenCounts)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => {
      const allergen = UK_ALLERGENS.find(a => a.id === id);
      return { label: allergen?.label.split('(')[0].trim() || id, count };
    });

  // Count ingredients with allergens
  const ingredientsWithAllergens = ingredients.filter(ing =>
    Object.values(ing.allergens || {}).some(v => v)
  ).length;

  // Count cross-contamination risks
  const crossContaminationCount = ingredients.filter(ing =>
    Object.values(ing.mayContain || {}).some(v => v)
  ).length;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Welcome to Your Compliance Dashboard</h2>
        <p className="text-blue-100">
          Manage your ingredients, track allergens, and maintain Natasha's Law compliance
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Ingredients */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Ingredients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{totalIngredients}</p>
            </div>
            <div className="bg-blue-100 rounded-full p-3">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        {/* Ingredients with Allergens */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">With Allergens</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{ingredientsWithAllergens}</p>
            </div>
            <div className="bg-red-100 rounded-full p-3">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Cross-Contamination Risks */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">May Contain Warnings</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{crossContaminationCount}</p>
            </div>
            <div className="bg-yellow-100 rounded-full p-3">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Allergen Types Tracked */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Allergen Types Tracked</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">14</p>
            </div>
            <div className="bg-green-100 rounded-full p-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Top Allergens Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Most Common Allergens</h3>
        {topAllergens.length > 0 ? (
          <div className="space-y-4">
            {topAllergens.map((allergen, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{allergen.label}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {allergen.count} ingredient{allergen.count !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(allergen.count / totalIngredients) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No allergen data available yet</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🎯 Quick Tip</h3>
          <p className="text-gray-700 text-sm">
            Regularly verify your ingredient allergen data with suppliers to maintain compliance.
            Under Natasha's Law, accuracy is critical for customer safety.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">✅ Compliance Status</h3>
          <p className="text-gray-700 text-sm">
            {ingredientsWithAllergens > 0 ? (
              <span className="text-green-700 font-medium">You're tracking allergens for {ingredientsWithAllergens} ingredients!</span>
            ) : (
              <span className="text-amber-700 font-medium">Add allergen data to your ingredients to ensure compliance.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
