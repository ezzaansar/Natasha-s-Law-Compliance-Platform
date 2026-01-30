import { useState } from 'react';
import { UK_ALLERGENS } from '../data/allergens';

function SearchFilter({ onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAllergen, setSelectedAllergen] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ searchTerm: value, allergenFilter: selectedAllergen });
  };

  const handleAllergenChange = (e) => {
    const value = e.target.value;
    setSelectedAllergen(value);
    onFilterChange({ searchTerm, allergenFilter: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedAllergen('');
    onFilterChange({ searchTerm: '', allergenFilter: '' });
  };

  const hasActiveFilters = searchTerm || selectedAllergen;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search ingredients or suppliers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
          {hasActiveFilters && (
            <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {(searchTerm ? 1 : 0) + (selectedAllergen ? 1 : 0)}
            </span>
          )}
        </button>

        {/* Allergen Filter (Desktop always visible, Mobile toggleable) */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
          <select
            value={selectedAllergen}
            onChange={handleAllergenChange}
            className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          >
            <option value="">All Allergens</option>
            {UK_ALLERGENS.map(allergen => (
              <option key={allergen.id} value={allergen.id}>
                {allergen.label.split('(')[0].trim()}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center justify-center px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchFilter;
