# Impact Analysis: Recipe-Level Allergen Overrides

**Change Request:** "Allergens must be editable per recipe, not just inherited from ingredients, because suppliers change and kitchen handling differs."

**Date:** January 31, 2026
**Analysis Duration:** 2 hours

---

## 1. What Breaks?

### Current Architecture Assumptions
The existing system assumes **allergens are always derived** from ingredients:
- `calculateRecipeAllergens()` aggregates allergens from all recipe ingredients
- Recipes store only ingredient references (`ingredientId`, `quantity`, `unit`)
- No storage exists for recipe-specific allergen data

### Components Affected
| Component | Impact |
|-----------|--------|
| `RecipeDemo.jsx` | Must add allergen override UI |
| `utils/calculateAllergens.js` | Must merge inherited + overridden allergens |
| `App.jsx` | Recipe data model must expand |
| LocalStorage schema | Breaking change - existing recipes lack override fields |

### Data Flow Disruption
```
BEFORE: Ingredients → Auto-calculate → Display
AFTER:  Ingredients → Auto-calculate → Allow Override → Merge → Display
```

---

## 2. What Becomes Ambiguous?

### Source Ambiguity
- **Problem:** Users won't know if an allergen is from ingredients or manually added
- **Solution:** Visual indicators (badges: "Inherited" vs "Manual Override")

### Sync Ambiguity
- **Problem:** If ingredient changes, should recipe override persist or reset?
- **Solution:** Overrides persist; show warning when ingredient allergens change

### Audit Ambiguity
- **Problem:** No record of who added an override and why
- **Solution:** Add `overrideReason` and `overrideDate` fields with audit log

### Compliance Ambiguity
- **Problem:** Manual overrides could remove real allergens (safety risk)
- **Solution:** Only allow ADDING allergens manually; inherited ones cannot be removed

---

## 3. Updated Data Model

### Previous Recipe Schema
```javascript
{
  id: 1,
  name: "Chocolate Croissant",
  ingredients: [{ ingredientId, quantity, unit }],
  createdAt: "2026-01-31"
}
```

### New Recipe Schema
```javascript
{
  id: 1,
  name: "Chocolate Croissant",
  ingredients: [{ ingredientId, quantity, unit }],
  allergenOverrides: {
    contains: ["sesame"],      // Manually added allergens
    mayContain: ["mustard"],   // Manually added cross-contamination
    reasons: {
      "sesame": "Kitchen uses shared equipment with sesame products",
      "mustard": "Supplier changed - new facility processes mustard"
    }
  },
  auditLog: [
    { action: "override_added", allergen: "sesame", date: "2026-01-31", reason: "..." }
  ],
  createdAt: "2026-01-31",
  updatedAt: "2026-01-31"
}
```

---

## 4. Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| User removes real allergen | **HIGH** | Prevent removal of inherited allergens |
| Override forgotten after ingredient update | Medium | Show sync warnings |
| Audit trail gaps | Medium | Require reason for each override |
| UI complexity increase | Low | Progressive disclosure (advanced panel) |

---

## 5. Recommendation

**Proceed with implementation** using the "additive-only" approach:
- Users can ADD allergens at recipe level
- Users CANNOT REMOVE inherited allergens (safety-first)
- All overrides require a reason (audit compliance)

This balances flexibility with food safety requirements under Natasha's Law.
