import { calculateRecipeAllergens } from '../utils/calculateAllergens';

function LabelGenerator({ recipe, ingredients }) {
  const recipeIngredients = recipe.ingredients.map(ing => {
    const details = ingredients.find(i => i.id === ing.ingredientId);
    return details;
  }).filter(Boolean);

  const { contains, mayContain } = calculateRecipeAllergens(recipeIngredients);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Label - ${recipe.name}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 400px;
              margin: 0 auto;
            }
            .label {
              border: 2px solid #000;
              padding: 16px;
              border-radius: 8px;
            }
            .product-name {
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              border-bottom: 2px solid #000;
              padding-bottom: 12px;
              margin-bottom: 12px;
            }
            .section-title {
              font-size: 12px;
              font-weight: bold;
              text-transform: uppercase;
              color: #666;
              margin-top: 12px;
              margin-bottom: 4px;
            }
            .ingredients-list {
              font-size: 11px;
              line-height: 1.4;
            }
            .allergen-section {
              margin-top: 12px;
              padding-top: 12px;
              border-top: 1px solid #ccc;
            }
            .allergen-title {
              font-size: 14px;
              font-weight: bold;
            }
            .contains {
              font-weight: bold;
              text-transform: uppercase;
            }
            .may-contain {
              font-style: italic;
              margin-top: 8px;
            }
            .footer {
              margin-top: 16px;
              padding-top: 12px;
              border-top: 1px solid #ccc;
              font-size: 10px;
              color: #666;
              text-align: center;
            }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="label">
            <div class="product-name">${recipe.name}</div>

            <div class="section-title">Ingredients</div>
            <div class="ingredients-list">
              ${recipeIngredients.map(ing => ing.name).join(', ')}
            </div>

            <div class="allergen-section">
              <div class="allergen-title">Allergen Information</div>
              ${contains.length > 0 ? `
                <div class="contains">
                  Contains: ${contains.map(a => a.label).join(', ')}
                </div>
              ` : '<div>No allergens</div>'}
              ${mayContain.length > 0 ? `
                <div class="may-contain">
                  May contain: ${mayContain.map(a => a.label).join(', ')}
                </div>
              ` : ''}
            </div>

            <div class="footer">
              Produced in compliance with Natasha's Law (UK)<br/>
              Generated: ${new Date().toLocaleDateString('en-GB')}
            </div>
          </div>

          <div class="no-print" style="margin-top: 20px; text-align: center;">
            <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
              Print Label
            </button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
    >
      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
      Print Label
    </button>
  );
}

export default LabelGenerator;
