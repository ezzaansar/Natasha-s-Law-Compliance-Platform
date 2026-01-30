import { useState } from 'react';
import { calculateRecipeAllergens } from '../utils/calculateAllergens';
import RecipeBuilder from './RecipeBuilder';
import LabelGenerator from './LabelGenerator';

function RecipeDemo({ recipes, ingredients, onAddRecipe, onDeleteRecipe }) {
  const [showBuilder, setShowBuilder] = useState(false);

  // Helper to get full ingredient details
  const getIngredientDetails = (ingredientId) => {
    return ingredients.find(ing => ing.id === ingredientId);
  };

  // Get allergen names for display
  const getAllergenLabel = (id) => {
    return id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="space-y-6">
      {/* Header with Toggle */}
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Recipe Management</h2>
            <p className="text-gray-600 text-sm mt-1">
              {showBuilder ? 'Create a new recipe from your ingredients' : 'View your saved recipes with automatic allergen calculation'}
            </p>
          </div>
          <button
            onClick={() => setShowBuilder(!showBuilder)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            {showBuilder ? 'View Recipes' : '+ Create Recipe'}
          </button>
        </div>
      </div>

      {/* Recipe Builder or Recipe List */}
      {showBuilder ? (
        <RecipeBuilder
          ingredients={ingredients}
          onAddRecipe={(recipe) => {
            onAddRecipe(recipe);
            setShowBuilder(false);
          }}
        />
      ) : (
        <div className="space-y-6">
          {recipes.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No recipes yet</h3>
              <p className="text-gray-500 mb-4">Create your first recipe to see automatic allergen calculation</p>
              <button
                onClick={() => setShowBuilder(true)}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Create First Recipe
              </button>
            </div>
          ) : (
            recipes.map(recipe => {
              // Build ingredient details for calculation
              const recipeIngredients = recipe.ingredients.map(ing => {
                const details = getIngredientDetails(ing.ingredientId);
                return {
                  ...details,
                  quantity: ing.quantity,
                  unit: ing.unit
                };
              }).filter(ing => ing.id); // Filter out any missing ingredients

              // Calculate allergens
              const { contains, mayContain } = calculateRecipeAllergens(recipeIngredients);

              return (
                <div key={recipe.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">{recipe.name}</h3>
                      <p className="text-sm text-gray-500">
                        Created {new Date(recipe.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <LabelGenerator recipe={recipe} ingredients={ingredients} />
                      <button
                        onClick={() => onDeleteRecipe(recipe.id)}
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Ingredient Breakdown */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Ingredient Breakdown ({recipeIngredients.length})
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {recipeIngredients.map((ingredient, idx) => {
                        const allergens = Object.entries(ingredient.allergens || {})
                          .filter(([_, value]) => value)
                          .map(([key]) => getAllergenLabel(key));

                        const mayContainList = Object.entries(ingredient.mayContain || {})
                          .filter(([_, value]) => value)
                          .map(([key]) => getAllergenLabel(key));

                        return (
                          <div key={idx} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                              <svg
                                className="w-3 h-3 text-blue-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                <path
                                  fillRule="evenodd"
                                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-baseline space-x-2 mb-1">
                                <span className="font-medium text-gray-900">
                                  {ingredient.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  ({ingredient.quantity} {ingredient.unit})
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {allergens.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {allergens.map((allergen, i) => (
                                      <span
                                        key={i}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800"
                                      >
                                        Contains: {allergen}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {mayContainList.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {mayContainList.map((allergen, i) => (
                                      <span
                                        key={i}
                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800"
                                      >
                                        May contain: {allergen}
                                      </span>
                                    ))}
                                  </div>
                                )}
                                {allergens.length === 0 && mayContainList.length === 0 && (
                                  <span className="text-xs text-gray-400 italic">No allergens</span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Calculated Allergens Summary */}
                  <div className="border-t-2 border-blue-200 pt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg
                        className="w-5 h-5 text-blue-600 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Final Calculated Allergens
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Contains */}
                      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                        <h5 className="font-semibold text-red-900 mb-3">
                          Contains Allergens ({contains.length})
                        </h5>
                        {contains.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {contains.map((allergen, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold bg-red-200 text-red-900"
                              >
                                {allergen.label.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-red-700 italic">None</p>
                        )}
                      </div>

                      {/* May Contain */}
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <h5 className="font-semibold text-yellow-900 mb-3">
                          May Contain ({mayContain.length})
                        </h5>
                        {mayContain.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {mayContain.map((allergen, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-semibold bg-yellow-200 text-yellow-900"
                              >
                                {allergen.label.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-yellow-700 italic">None</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeDemo;
