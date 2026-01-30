import { UK_ALLERGENS } from '../data/allergens';

function AllergenSelector({ selected, onChange, type = 'contains' }) {
  const isContains = type === 'contains';

  const handleToggle = (allergenId) => {
    onChange({
      ...selected,
      [allergenId]: !selected[allergenId]
    });
  };

  const selectedCount = Object.values(selected).filter(Boolean).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">
          {selectedCount} selected
        </span>
        {selectedCount > 0 && (
          <button
            type="button"
            onClick={() => onChange(Object.fromEntries(UK_ALLERGENS.map(a => [a.id, false])))}
            className="text-xs text-gray-500 hover:text-gray-700 underline"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {UK_ALLERGENS.map(allergen => {
          const isSelected = selected[allergen.id];
          const label = allergen.label.split('(')[0].trim();

          return (
            <button
              key={allergen.id}
              type="button"
              onClick={() => handleToggle(allergen.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border-2 ${
                isSelected
                  ? isContains
                    ? 'bg-red-100 border-red-400 text-red-800 shadow-sm'
                    : 'bg-yellow-100 border-yellow-400 text-yellow-800 shadow-sm'
                  : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100'
              }`}
            >
              {isSelected && (
                <span className="mr-1">
                  {isContains ? '⚠️' : '❓'}
                </span>
              )}
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AllergenSelector;
