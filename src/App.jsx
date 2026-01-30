import { useState, useEffect } from 'react';
import IngredientForm from './components/IngredientForm';
import IngredientList from './components/IngredientList';
import RecipeDemo from './components/RecipeDemo';
import Dashboard from './components/Dashboard';
import { ToastProvider, useToast } from './components/Toast';
import ConfirmModal from './components/ConfirmModal';
import SearchFilter from './components/SearchFilter';
import { SAMPLE_INGREDIENTS, SAMPLE_RECIPES } from './data/sampleData';

function AppContent() {
  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem('ingredients');
    return saved ? JSON.parse(saved) : SAMPLE_INGREDIENTS;
  });

  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : SAMPLE_RECIPES;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState({ searchTerm: '', allergenFilter: '' });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, type: null, id: null, name: '' });
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleAddIngredient = (newIngredient) => {
    setIngredients(prev => [...prev, newIngredient]);
  };

  const handleDeleteIngredient = (id) => {
    const ingredient = ingredients.find(ing => ing.id === id);
    setDeleteModal({
      isOpen: true,
      type: 'ingredient',
      id,
      name: ingredient?.name || 'this ingredient'
    });
  };

  const handleAddRecipe = (newRecipe) => {
    setRecipes(prev => [...prev, newRecipe]);
  };

  const handleDeleteRecipe = (id) => {
    const recipe = recipes.find(r => r.id === id);
    setDeleteModal({
      isOpen: true,
      type: 'recipe',
      id,
      name: recipe?.name || 'this recipe'
    });
  };

  const confirmDelete = () => {
    if (deleteModal.type === 'ingredient') {
      setIngredients(prev => prev.filter(ing => ing.id !== deleteModal.id));
      addToast(`${deleteModal.name} deleted`, 'success');
    } else if (deleteModal.type === 'recipe') {
      setRecipes(prev => prev.filter(r => r.id !== deleteModal.id));
      addToast(`${deleteModal.name} deleted`, 'success');
    }
    setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, type: null, id: null, name: '' });
  };

  // Filter ingredients based on search and allergen filter
  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = !filters.searchTerm ||
      ingredient.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      (ingredient.supplierName && ingredient.supplierName.toLowerCase().includes(filters.searchTerm.toLowerCase()));

    const matchesAllergen = !filters.allergenFilter ||
      ingredient.allergens[filters.allergenFilter] ||
      ingredient.mayContain[filters.allergenFilter];

    return matchesSearch && matchesAllergen;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Natasha's Law Compliance Platform
                </h1>
                <p className="text-sm text-gray-500">
                  UK Food Allergen Management System
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                MVP Demo
              </span>
              <span className="text-gray-500">
                {ingredients.length} ingredient{ingredients.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('ingredients')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'ingredients'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>Ingredient Management</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('recipe')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'recipe'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Recipe Demo</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard ingredients={ingredients} />
        )}
        {activeTab === 'ingredients' && (
          <div className="space-y-6">
            <IngredientForm onAddIngredient={handleAddIngredient} />
            <SearchFilter onFilterChange={setFilters} />
            <IngredientList
              ingredients={filteredIngredients}
              totalCount={ingredients.length}
              onDeleteIngredient={handleDeleteIngredient}
            />
          </div>
        )}
        {activeTab === 'recipe' && (
          <RecipeDemo
            recipes={recipes}
            ingredients={ingredients}
            onAddRecipe={handleAddRecipe}
            onDeleteRecipe={handleDeleteRecipe}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Built for demonstrating Natasha's Law compliance |{' '}
              <span className="font-medium">14 UK Allergens Tracked</span>
            </p>
            <p className="mt-1 text-xs">
              Prototype MVP - No database, data persists in browser localStorage
            </p>
          </div>
        </div>
      </footer>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title={`Delete ${deleteModal.type === 'ingredient' ? 'Ingredient' : 'Recipe'}?`}
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        variant="danger"
      />
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
