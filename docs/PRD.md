# Natasha's Law Compliance Platform — Product Requirements Document

**Version:** 2.0  
**Last Updated:** January 30, 2026  
**Status:** Active Development

---

## 1. Executive Summary

### 1.1 Purpose
This platform enables small UK food businesses to achieve and maintain compliance with Natasha's Law (October 2021) for pre-packed for direct sale (PPDS) food labeling.

### 1.2 Target Market
- Independent cafés, bakeries, takeaways, and food trucks
- Small restaurant chains (2-10 locations)
- Market stalls and farm shops with packaged goods

### 1.3 Core Value Proposition
Transform compliance anxiety into operational confidence through centralized ingredient management, automated allergen calculation, and audit-ready documentation.

---

## 2. Problem Definition

### 2.1 User Personas

**Sarah, 42 — Business Owner**
- Operates 2 café locations
- No compliance background
- Primary concern: Avoiding £5,000 fines and potential closure

**Marcus, 28 — Kitchen Manager**
- Manages daily operations
- Handles supplier relationships and recipe updates
- Struggles with tracking ingredient changes across multiple suppliers

**Jess, 21 — Front-of-House Staff**
- Responds to customer allergen inquiries
- Needs immediate access to accurate allergen information
- Limited technical expertise

### 2.2 Current Pain Points

**Legal Risk**
- Mandatory ingredient and allergen labeling on PPDS items
- Penalties include £5,000 fines, closure orders, and criminal prosecution
- Zero tolerance for labeling errors that cause customer harm

**Data Fragmentation**
- Ingredient information scattered across supplier emails, PDFs, and handwritten notes
- No centralized source of truth
- Difficult to maintain version history

**Supplier Communication Gaps**
- Ingredient reformulations occur without notification
- Yesterday's verified recipe becomes today's liability
- Manual tracking of supplier changes is error-prone

**Audit Preparedness**
- Environmental Health Officers require documented controls
- Version history and staff training logs expected
- Most businesses rely on inadequate spreadsheet systems

**Cognitive Overload**
- Managing 14 allergen categories
- Cross-contamination tracking
- "May contain" threshold determinations
- Storage and shelf-life regulations

### 2.3 Success Criteria

Users can confidently face Environmental Health Officer inspections with:
- Provably accurate labels for all current products
- Complete ingredient change history
- Documented workflows and staff training records
- Zero risk of customer harm due to labeling errors

### 2.4 Adoption Barriers

| Barrier | Impact on Adoption |
|---------|-------------------|
| Setup time exceeding 2 hours | Immediate abandonment during onboarding |
| Requirement for compliance expertise | Users seek solution specifically because they lack this expertise |
| Desktop-only interface | Kitchen staff work primarily on mobile/tablet devices |
| Confusing workflows | Loss of trust leads to immediate churn |
| Perceived busywork | Must demonstrably prevent real risk, not add administrative burden |

---

## 3. Product Architecture

### 3.1 Design Principles

**Progressive Disclosure**
- Start with simple task (print a label)
- Reveal advanced features gradually
- Minimize initial cognitive load

**Trust Through Transparency**
- Every allergen flag displays supporting evidence
- Clear provenance for all data
- Explicit confidence levels for AI-assisted inputs

**Fail-Safe Defaults**
- Recipes without complete allergen data cannot generate labels
- Manual confirmation required for all AI-extracted information
- Immutable audit trail for all compliance-critical actions

---

## 4. Feature Specification

### 4.1 Phase 1 — MVP (Months 0-3)

**Goal:** Enable legally compliant label generation within 30 minutes of signup.

#### 4.1.1 Ingredient Master

**Purpose:** Centralize scattered allergen data into single source of truth.

**Core Features:**
- Ingredient library with comprehensive metadata
  - Name, supplier, dates (added/last verified)
  - 14 UK allergen flags: celery, gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, tree nuts, peanuts, sesame, soya, sulphites
  - Cross-contamination indicators ("may contain")
  - Data provenance tracking (manual entry, CSV import, PDF extraction)
- Fuzzy search to prevent duplicate entries
- Bulk CSV import capability

**Trust Mechanism Display:**
```
Ingredient: Butter (Anchor, unsalted)
Allergens: Milk [confirmed]
Source: Supplier spec sheet (uploaded 12 Jan 2026)
Last verified: 12 Jan 2026 by Marcus
```

**AI Integration:**
- Parse supplier PDFs to suggest allergen flags
- All suggestions require explicit user confirmation
- Display confidence scores for extracted data

**Abandonment Risk:**
- Setup time exceeding 10 minutes for first ingredient
- Unclear definition of "verified" status
- Ambiguous data provenance

#### 4.1.2 Recipe Builder

**Purpose:** Eliminate manual allergen calculations and associated errors.

**Core Features:**
- Drag-and-drop ingredient addition
- Real-time allergen propagation with visual hierarchy
- Warning system for incomplete data
- Version locking for finalized recipes

**Allergen Propagation Example:**
```
Croissant Recipe
├─ Plain Flour (500g) → Gluten
├─ Butter (200g) → Milk
├─ Eggs (3) → Eggs
└─ Chocolate Chips (100g) → Milk, Soya | May contain: Tree Nuts

FINAL ALLERGENS
Contains: Gluten, Milk, Eggs, Soya
May contain: Tree Nuts
```

**Warning Categories:**
- Critical: "3 ingredients missing allergen data — cannot generate label"
- Important: "Supplier updated Chocolate Chips on 15 Jan — review needed"

**AI Integration:**
- Suggest ingredient matches from partial names
- Example: "unsalt butt..." → "Butter (unsalted, Anchor)"

**Abandonment Risk:**
- Allergen calculation appears as unexplained "black box"
- Missing clear justification for each allergen flag

#### 4.1.3 Product Catalog

**Purpose:** Link recipes to sellable menu items (many-to-one relationship).

**Core Features:**
- Product-to-recipe associations
- Metadata management
  - Storage instructions
  - Shelf life calculations
  - Packaging type specifications
- Active/inactive status toggle for seasonal items

**Example Use Case:**
```
Product: "Vegan Brownie (Single)"
Recipe: "Vegan Brownie Base"
Label: A6 sticker
Shelf life: 48 hours

Product: "Vegan Brownie Box (6-pack)"
Recipe: "Vegan Brownie Base" [same recipe]
Label: 100x50mm box label
Shelf life: 48 hours
```

#### 4.1.4 Label Generator

**Purpose:** Generate FSA-compliant labels without legal consultation.

**FSA-Compliant Template:**
```
[Product Name - 16pt bold]

Ingredients: Flour (WHEAT), Butter (MILK), Sugar, Eggs (EGG), 
Chocolate Chips (MILK, SOYA)

Allergens: GLUTEN (wheat), MILK, EGG, SOYA
May contain: TREE NUTS

Best before: [auto-calculated from shelf life]
Made on premises also handling: [cross-contaminants]
```

**Label Specifications:**
- A6 sticker (small items)
- 50x25mm (sandwich packs)
- 100x50mm (cake boxes)

**Output Formats:**
- PDF for Dymo/Brother label printers
- Tablet display for staff reference
- Email to kitchen printer

**AI Integration:** None (template legally prescribed, must be deterministic)

**Abandonment Risk:**
- Confusing label formatting
- Allergens not properly emphasized (non-compliance risk)

#### 4.1.5 Basic Audit Trail

**Purpose:** Provide evidence of controls for Environmental Health Officers.

**Core Features:**
- Immutable log of compliance-critical actions
  - Recipe creation and modifications (user, timestamp, changes)
  - Ingredient additions and updates (with source document links)
  - Label generations (product, user, timestamp)
- Tabular view of last 30 days of activity
- PDF export ("EHO Compliance Pack")

**Example Log Entry:**
```
22 Jan 2026, 14:32
Marcus updated "Chocolate Chips (Lindt)"
Changed: Supplier from "Callebaut" to "Lindt"
Affected recipes: 3 (Croissant, Brownie, Cookie)
Action taken: All 3 recipes reviewed, labels reprinted
```

**Abandonment Risk:**
- Excessive detail causing overwhelm
- Insufficient detail rendering audit trail useless

### 4.2 Phase 2 — Operational Efficiency (Months 3-6)

#### 4.2.1 Supplier Integration
- CSV import from major suppliers (Brakes, Bidfood, Booker)
- Email parsing for forwarded spec sheets
- Automated change alerts

#### 4.2.2 Version Control and Rollback
- Full recipe versioning system
- Side-by-side version comparison
- Revert capability with audit notation

#### 4.2.3 EHO Compliance Pack
- One-click PDF generation including:
  - All active recipes with allergen matrices
  - Ingredient supplier list with review dates
  - Staff training logs
  - Six-month audit trail
- Branded cover page

#### 4.2.4 Team Management
- Role-based access control (Owner, Manager, Staff)
- Activity tracking and task assignment
- Permission granularity

#### 4.2.5 QR Code Labels
- QR code generation for labels
- Customer-facing allergen information
- Real-time data synchronization

### 4.3 Phase 3 — Intelligence and Scale (Months 6-12)

#### 4.3.1 AI Ingredient Intelligence
- OCR and LLM parsing of supplier PDFs
- Automated extraction of ingredients, allergens, and warnings
- Confidence scoring system (High/Medium/Low)
- Ambiguity flagging for human review

#### 4.3.2 Predictive Risk Alerts
- High-risk recipe identification
- Review reminder system
- Cross-contamination workflow recommendations

#### 4.3.3 Multi-Location Support
- Franchise mode with centralized recipe control
- Location-specific label customization
- Centralized compliance reporting

#### 4.3.4 POS Integration
- Synchronization with Square, Toast, Lightspeed
- Automatic menu allergen updates
- Checkout warnings for allergen-containing orders

#### 4.3.5 Regulatory Intelligence
- FSA guidance update monitoring
- Proactive notification system
- Quarterly compliance checks

---

## 5. Data Model

### 5.1 Core Entities

#### Ingredients
```
id: uuid
name: string (indexed, unique per business)
supplier_name: string
supplier_contact: string (optional)
allergen_flags: jsonb {gluten: bool, milk: bool, ...}
may_contain: jsonb
last_verified_date: timestamp
data_source: enum [manual, csv_import, pdf_extract]
source_document_url: string (S3 link)
created_by: user_id
updated_by: user_id
created_at: timestamp
updated_at: timestamp
is_active: boolean
```

#### Allergens (Reference Table)
```
id: int (1-14)
name: string
fsa_guidance_url: string
description: text
```

#### Recipes
```
id: uuid
name: string
version: int (auto-increment on edit)
ingredients: jsonb [{ingredient_id, quantity, unit}, ...]
derived_allergens: jsonb (calculated)
cross_contamination_warnings: jsonb
preparation_notes: text
locked: boolean
locked_by: user_id
locked_at: timestamp
created_by: user_id
parent_recipe_id: uuid (versioning)
created_at: timestamp
updated_at: timestamp
```

#### Products (Menu Items / PPDS Items)
```
id: uuid
name: string
recipe_id: uuid (foreign key)
description: text
storage_instructions: string
shelf_life_hours: int
label_template: enum [a6_sticker, sandwich_label, box_label]
is_active: boolean
created_at: timestamp
```

#### Audit Log
```
id: uuid
entity_type: enum [ingredient, recipe, product, label]
entity_id: uuid
action: enum [created, updated, deleted, label_printed]
changes: jsonb (old/new values)
user_id: uuid
timestamp: timestamp
ip_address: string
```

#### Users
```
id: uuid
email: string
role: enum [owner, manager, staff]
business_id: uuid (multi-tenancy)
permissions: jsonb
last_active: timestamp
```

---

## 6. AI Integration Strategy

### 6.1 Guiding Principle
AI assists, humans decide, system enforces. Allergen compliance is life-safety critical — AI cannot be the source of truth but can eliminate manual drudgery.

### 6.2 AI Application Map

| Task | AI Tool | AI Role | Human Checkpoint | Rationale |
|------|---------|---------|------------------|-----------|
| System Design | Claude Sonnet 4.5 | Generate data models, API schemas, compliance logic | Developer reviews edge cases | Best reasoning for complex domains |
| UI/UX | Cursor + Claude | Build forms, workflows, responsive layouts | Designer validates via user testing | Real-time iteration, tight feedback loop |
| Backend | Claude Code | Scaffold CRUD APIs, validation middleware, DB migrations | Developer reviews business rules | Fast scaffolding, strong code generation |
| PDF Parsing | GPT-4 Vision | Extract ingredients and allergens from supplier PDFs | User confirms/corrects each field | Best OCR and structured extraction |
| Ingredient Search | OpenAI Embeddings | Fuzzy match partial ingredient names | User selects final match | Semantic search superior to keyword matching |
| Compliance Validation | Rule Engine (deterministic) | Validate label completeness, allergen propagation | AI flags issues, user fixes | Too risky for AI — must be 100% deterministic |
| Audit Report | Claude Sonnet | Format PDF with narrative for EHO | User reviews before export | Strong explanatory prose generation |

### 6.3 Detailed AI Workflows

#### 6.3.1 Supplier PDF Ingestion

**Current Pain:** Manual copy-pasting from 20-page PDFs.

**AI-Assisted Flow:**
1. User uploads supplier specification sheet (PDF)
2. GPT-4 Vision extracts structured data:
   - Ingredient name
   - Allergen flags with confidence percentages
   - "May contain" warnings
3. Side-by-side review interface displays:
   - PDF preview
   - Extracted data with confidence scores
4. User confirms or edits extracted information
5. System saves with `data_source: pdf_extract` and links original PDF

**Trust Layer:**
- Confidence scores displayed for all extractions
- Extractions below 90% confidence require mandatory human review
- Original source document always accessible

#### 6.3.2 Recipe Allergen Calculation (Deterministic Logic)

**Current Pain:** Manual cross-checking of 14 allergens across 30+ ingredients.

**Deterministic Algorithm (NOT AI):**
```python
def calculate_allergens(recipe):
    contains = set()
    may_contain = set()
    
    for ingredient in recipe.ingredients:
        contains.update(ingredient.allergen_flags)
        may_contain.update(ingredient.may_contain)
    
    # Remove duplicates: if "contains milk", remove from "may contain milk"
    may_contain -= contains
    
    return {
        'contains': sorted(contains),
        'may_contain': sorted(may_contain)
    }
```

**Rationale for Deterministic Approach:**
One hallucination equals legal liability. This calculation must be 100% deterministic and auditable.

#### 6.3.3 Smart Ingredient Search

**Current Pain:** Duplicate entries ("Milk", "Semi-Skimmed Milk", "Milk (Semi-Skimmed)").

**AI-Assisted Flow:**
1. User types partial ingredient name (e.g., "semi sk")
2. Embeddings-based semantic search finds matches:
   - Milk (Semi-Skimmed, Tesco) — 0.92 similarity
   - Milk (Skimmed, Sainsbury's) — 0.87 similarity
3. Display ranked results
4. If no adequate match, offer "Add as new ingredient"

**Rationale:**
Embeddings handle typos, synonyms, and partial matches superior to SQL `LIKE` queries.

#### 6.3.4 EHO Compliance Report Narrative

**Current Pain:** Environmental Health Officers require explanations, not raw data dumps.

**AI-Assisted Flow:**
1. User requests "Generate EHO Report"
2. Claude generates structured narrative:
   - Summary of ingredient inventory and verification status
   - Identification of highest-risk recipes
   - Documentation of cross-contamination controls
   - Summary of recent changes and actions taken
3. Human review required before export
4. User must explicitly approve final report

**Example Output:**
```
This business uses 47 ingredients from 8 suppliers. All ingredient 
allergen data was last verified within 60 days.

Highest-risk recipe: Almond Croissant (6 allergens).
Cross-contamination controls documented (see page 4).

Recent changes: On 22 Jan 2026, Chocolate Chips supplier changed 
from Callebaut to Lindt. 3 recipes affected—all reviewed and labels 
reprinted.
```

### 6.4 AI Safety Rails

| Risk | Mitigation |
|------|------------|
| Hallucinated allergens | All AI-extracted data requires explicit human confirmation |
| Over-confidence | Display confidence scores; below 90% flagged as "Needs Review" |
| Opaque decisions | Every allergen flag displays provenance ("Source: Supplier PDF, page 3") |
| Drift over time | Deterministic logic for critical paths (allergen calculation, label generation) |

---

## 7. Success Metrics

### 7.1 Six-Month Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| Time to first label | Under 30 minutes from signup | Measures onboarding friction |
| Recipes with complete allergen data | Above 95% | Proxy for compliance readiness |
| Audit trail exports | 200 per month | Indicates EHO visit preparedness |
| Supplier change alerts acted upon | Above 80% within 7 days | Measures proactive compliance |
| User NPS | Above 40 | Validates peace-of-mind value proposition |

---

## 8. Open Questions

### 8.1 Technical
- **Offline Mode:** How to handle label printing when kitchen tablets lose WiFi connectivity?
- **Multi-Language Support:** Should we auto-translate supplier specifications in Polish/Romanian?

### 8.2 Business Model
- **Pricing Structure:** Per-location or per-label-printed pricing model?
- **Integration Priority:** Which POS system should be prioritized? (Square has largest SMB market share)

### 8.3 Legal and Liability
- **AI Liability:** If AI mis-extracts an allergen and the user fails to catch the error, where does responsibility lie?

---

## 9. Document Control

**Revision History:**
- v2.0 (January 30, 2026): Restructured for clarity, completeness, and decision-forcing
- v1.0: Initial draft

**Stakeholders:**
- Product Management
- Engineering
- Legal and Compliance
- User Experience Design

**Next Review Date:** February 28, 2026
