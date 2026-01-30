# Natasha's Law Compliance Platform

A compliance platform for UK food businesses to manage allergen labeling in accordance with Natasha's Law (October 2021).

![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff)
![Tailwind](https://img.shields.io/badge/Tailwind-4.1-38bdf8)

## Overview

This platform helps small UK food businesses (cafés, bakeries, food trucks) comply with Natasha's Law, which requires pre-packed for direct sale (PPDS) foods to display full ingredient lists with 14 specific allergens clearly labeled.

**Problem:** Manual allergen tracking is error-prone, time-consuming, and can result in £5,000 fines or business closure.

**Solution:** Automated allergen management with deterministic calculation, ensuring 100% accuracy for food safety compliance.

---

## Features

### Dashboard
- Real-time compliance statistics
- Visual allergen distribution charts
- Track total ingredients and allergen coverage
- Quick compliance tips

### Ingredient Management
- Add/delete ingredients with supplier information
- Track all 14 UK allergens per ingredient
- "Contains" vs "May Contain" distinction
- **Search & filter** by name, supplier, or allergen
- **Compact pill-style allergen selector**
- Export ingredient library to CSV
- Sample data pre-loaded for demo

### Recipe Builder
- Create recipes from your ingredient library
- Select ingredients with quantities and units
- **Automatic allergen calculation** (deterministic algorithm)
- Visual allergen breakdown showing source ingredients
- **Print-ready compliance labels**

### User Experience
- **Toast notifications** instead of browser alerts
- **Confirmation modals** for delete actions
- **Hover animations** on cards and interactive elements
- Responsive design for all screen sizes
- Custom favicon

### Allergen Calculation
- Aggregates allergens from all recipe ingredients
- Deterministic (non-AI) calculation - 100% accurate
- Differentiates "Contains" from "May Contain"
- Removes duplicates (if ingredient "contains X", removes from "may contain X")

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2 | Frontend UI framework |
| Vite | 7.2 | Build tool & dev server |
| Tailwind CSS | 4.1 | Utility-first styling |
| localStorage | - | Data persistence (MVP) |

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/ezzaansar/Natasha-s-Law-Compliance-Platform.git
cd Natasha-s-Law-Compliance-Platform

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── AllergenSelector.jsx   # Compact pill-style allergen picker
│   │   ├── ConfirmModal.jsx       # Styled confirmation dialogs
│   │   ├── Dashboard.jsx          # Statistics & charts
│   │   ├── IngredientForm.jsx     # Add ingredient form
│   │   ├── IngredientList.jsx     # Ingredient table with actions
│   │   ├── LabelGenerator.jsx     # Print-ready compliance labels
│   │   ├── RecipeBuilder.jsx      # Create recipes
│   │   ├── RecipeDemo.jsx         # View recipes with allergens
│   │   ├── SearchFilter.jsx       # Search & filter controls
│   │   ├── Skeleton.jsx           # Loading state components
│   │   └── Toast.jsx              # Toast notification system
│   ├── data/
│   │   ├── allergens.js           # 14 UK allergen definitions
│   │   └── sampleData.js          # Demo data
│   ├── utils/
│   │   ├── calculateAllergens.js  # Deterministic allergen calculation
│   │   └── exportToCSV.js         # CSV export utility
│   ├── App.jsx                    # Main application
│   └── main.jsx                   # Entry point
├── docs/
│   └── PRD.md                     # Product Requirements Document
├── public/
│   └── favicon.svg                # App icon
└── package.json
```

---

## UK Allergens Tracked (14)

| Allergen | Description |
|----------|-------------|
| Celery | Including celeriac |
| Gluten | Wheat, rye, barley, oats |
| Crustaceans | Prawns, crab, lobster |
| Eggs | |
| Fish | |
| Lupin | |
| Milk | |
| Molluscs | Mussels, oysters, squid |
| Mustard | |
| Tree Nuts | Almonds, hazelnuts, walnuts, etc. |
| Peanuts | |
| Sesame | |
| Soya | |
| Sulphites | Above 10ppm |

---

## License

This project was created as a demonstration of Natasha's Law compliance tooling.

---

## Documentation

See [docs/PRD.md](docs/PRD.md) for the full Product Requirements Document.
