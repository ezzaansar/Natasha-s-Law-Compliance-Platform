# Natasha's Law Compliance Platform - MVP

A compliance platform for UK food businesses to manage allergen labeling in accordance with Natasha's Law (October 2021).

![MVP Demo](https://img.shields.io/badge/Status-Demo%20Ready-success)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-cyan)

## 🎯 Overview

This platform helps small UK food businesses (cafés, bakeries, food trucks) comply with Natasha's Law, which requires pre-packed for direct sale (PPDS) foods to display full ingredient lists with 14 specific allergens clearly labeled.

**Problem:** Manual allergen tracking is error-prone, time-consuming, and can result in £5,000 fines or business closure.

**Solution:** Automated allergen management with deterministic calculation, ensuring 100% accuracy for food safety compliance.

---

## ✨ Features

### 📊 Dashboard
- Real-time compliance statistics
- Visual allergen distribution charts
- Track total ingredients, recipes, and allergen coverage
- Quick compliance status overview

### 🥖 Ingredient Management
- Add/edit/delete ingredients with supplier information
- Track all 14 UK allergens per ingredient
- "Contains" vs "May Contain" distinction
- Export ingredient library to CSV
- Sample data pre-loaded for demo

### 🍰 Recipe Builder
- Create recipes from your ingredient library
- Select ingredients with quantities and units
- **Automatic allergen calculation** (deterministic algorithm)
- Visual allergen breakdown showing source ingredients
- Save recipes to localStorage
- Delete recipes functionality

### 🏷️ Allergen Calculation
- Aggregates allergens from all recipe ingredients
- Deterministic (non-AI) calculation - 100% accurate
- Differentiates "Contains" from "May Contain"
- Removes duplicates (if ingredient "contains X", removes from "may contain X")

---

## 🛠️ Tech Stack

- **Frontend:** React 18.3
- **Build Tool:** Vite 5.0
- **Styling:** Tailwind CSS 4.0
- **State Management:** React useState + useEffect
- **Data Persistence:** localStorage
- **Language:** JavaScript (ES6+)

### Why These Technologies?

- **Vite:** Lightning-fast hot module replacement for rapid development
- **Tailwind CSS:** Utility-first CSS for quick, responsive UI design
- **localStorage:** No backend needed for MVP demo, data persists in browser
- **React:** Component-based architecture for maintainable, scalable code

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/ezzaansar/Natasha-s-Law-Compliance-Platform.git
cd natasha-law-mvp

# Install dependencies
npm install

# Start development server
npm run dev
