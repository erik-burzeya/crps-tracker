# Styling Audit

## Inline `style={{ ... }}` Usage

### High-Risk Screens (>30 style definitions)

#### 1. **EntryScreen.tsx** (src/features/entry/)
**Lines: 491 total | ~25 style objects**

Examples:
```tsx
// Line 89
style={{
  fontSize: 16,
  fontWeight: '600',
  color: colors.text_primary,
  marginBottom: 8,
}}

// Line 127
style={{
  flex: 1,
  marginRight: 8,
  backgroundColor: colors.primary_light,
  padding: 8,
}}
```

**Issue:** Mixed extracted styles (entry.styles.ts for chip styles) + inline styles for form labels, inputs, containers.

---

#### 2. **HistoryScreen.tsx** (src/features/history/)
**Lines: 458 total | ~37 style objects**

Examples:
```tsx
// Line 156
style={{
  fontSize: 16,
  color: colors.text_primary,
  fontWeight: '600',
}}

// Line 187
style={{
  backgroundColor: colors.error_light,
  borderRadius: 8,
  padding: 12,
  marginVertical: 8,
}}
```

**Issue:** 
- Type-safety: `const [sortBy, setSortBy] = useState<any>(null);` — untyped state
- Repeated styles for cards, rows, badges
- Hard-coded `borderRadius: 8` instead of `Radii.md`

---

#### 3. **MedicationScreen.tsx** (src/features/medication/)
**Lines: 386 total | ~24 style objects**

Examples:
```tsx
// Line 89
style={{
  fontSize: 14,
  marginBottom: 12,
}}

// Line 112
style={{
  paddingVertical: 12,
  paddingHorizontal: 16,
  backgroundColor: colors.background_secondary,
  marginVertical: 8,
  borderRadius: 8,
}}
```

**Issue:**
- No use of `Typography` tokens (hardcoded `fontSize: 14`)
- No use of `Spacing` tokens (hardcoded margins)
- Repeated card styling pattern

---

#### 4. **OnboardingScreen.tsx** (src/features/onboarding/)
**Lines: 354 total | ~20 style objects**

Examples:
```tsx
// Line 78
style={{
  fontSize: 24,
  fontWeight: 'bold',
  color: colors.text_primary,
}}

// Line 112
style={{
  backgroundColor: colors.primary,
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 24,
}}
```

**Issue:**
- Bold font hardcoded instead of using `Typography.headline`
- Hard-coded spacing instead of `Spacing.md`, `Spacing.lg`

---

#### 5. **SettingsScreen.tsx** (src/features/settings/)
**Lines: 329 total | ~18 style objects**

Examples:
```tsx
// Line 92
style={{
  fontSize: 16,
  fontWeight: '600',
  color: colors.text_primary,
}}

// Line 115
style={{
  paddingVertical: 8,
  paddingHorizontal: 12,
  marginVertical: 4,
  backgroundColor: colors.error_light,
  borderRadius: 8,
}}
```

**Issue:**
- Repeated settings item styling
- No token usage for spacing/typography

---

#### 6. **ExportScreen.tsx** (src/features/export/)
**Lines: 164 total | ~9 style objects (least problematic)**

Examples:
```tsx
// Line 67
style={{
  fontSize: 14,
  marginBottom: 12,
  color: colors.text_secondary,
}}
```

**Issue:** Smaller screen, but still uses hardcoded font sizes and margins.

---

## Hard-Coded Color Literals

**Search across `src/features/`:**

| Color | Found In | Frequency | Should Be |
|---|---|---:|---|
| `#A5D6A7` | History, Settings | 3 | `Colors[themeName].success_light` |
| `#FF6B6B` | Entry, History, Medication | 5 | `Colors[themeName].error` |
| `#4CAF50` | Entry, Medication | 4 | `Colors[themeName].success` |
| `#FFE0B2` | Onboarding | 2 | `Colors[themeName].warning_light` |
| `#BDBDBD` | Disabled states | 3 | `Colors[themeName].disabled` |
| Hex strings in theme module | Colors.ts | 54 | ✅ Centralized (CORRECT) |

**Status:** ~17 hard-coded color strings still scattered across feature screens. Most are in conditional rendering or badge backgrounds.

---

## Repeated Spacing Literals

**Common patterns:**

```tsx
// Repeated in almost every screen
margin: 8
marginBottom: 12
marginVertical: 16
paddingHorizontal: 12
paddingVertical: 16
```

**Estimated duplications:**
- `8`: ~15 occurrences across 5 screens
- `12`: ~22 occurrences across 5 screens
- `16`: ~18 occurrences across 5 screens
- `24`: ~8 occurrences across 3 screens

**Should all use:** `Spacing.one` (8), `Spacing.sm` (8), `Spacing.md` (16), `Spacing.lg` (24)

---

## Duplicated Typography Definitions

**Pattern repeating across screens:**

```tsx
// EntryScreen.tsx, line 89
{ fontSize: 16, fontWeight: '600' }

// HistoryScreen.tsx, line 156
{ fontSize: 16, fontWeight: '600' }

// SettingsScreen.tsx, line 92
{ fontSize: 16, fontWeight: '600' }
```

This is `Typography.title` or a semantic "section header" style.

**Other duplications:**

```tsx
// Body text (fontSize: 14-16, normal weight)
Found: ~15 times across screens

// Caption text (fontSize: 12-14, normal weight)
Found: ~12 times across screens

// Header/title text (fontSize: 18-24, bold/semibold)
Found: ~8 times across screens
```

---

## Substantial Style Objects Inside Feature Screens

### EntryScreen.tsx

**Styling isolated to `entry.styles.ts`:**
- `chipContainer`
- `chip`
- `chipText`
- `sliderContainer`

**Styling still inline:**
- Form labels (fontSize, fontWeight, marginBottom)
- Input containers (backgroundColor, borderRadius, padding)
- Value displays (flex layout, padding, color)

**Extraction needed:**
- Create `FormLabel` style
- Create `FormInput` style
- Create `ValueDisplay` style
- Extract icon + text row pattern

---

### HistoryScreen.tsx

**No extracted styles. Inline only.**

Candidates for extraction:
- Card layout (backgroundColor, borderRadius, padding, marginVertical)
- Badge/status indicator (padding, borderRadius, backgroundColor)
- Header row (flexDirection: 'row', justifyContent: 'space-between')

**Recommended refactor:**
```ts
// Create history.styles.ts
export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'dynamic',  // Use colors[themeName]
    borderRadius: Radii.card,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.pill,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
});
```

---

### MedicationScreen.tsx

Similar to HistoryScreen. No extracted styles.

Candidates:
- Medication item card
- Add/edit button container
- Form input styling

---

### OnboardingScreen.tsx

Mixed inline styles for:
- Page headers (large, bold)
- Form inputs
- Buttons
- Progress indicators

No extraction.

---

### SettingsScreen.tsx

Mixed inline styles for:
- Settings item rows
- Toggle switches
- Theme selector
- Clear data button

No extraction.

---

### ExportScreen.tsx

Minimal inline styles. Mostly just text formatting.

---

## Styling Systems Alongside Design System

### What Exists

1. **Design system:** `src/theme/` tokens
2. **Feature-level stylesheets:** Only `src/features/entry/entry.styles.ts`
3. **Inline styles:** Present in all 6 feature screens
4. **Global CSS:** `src/global.css` (used for Web only)
5. **Component CSS modules:** Only `src/components/animated-icon.module.css`

### What's Missing

- Unified UI component library (Button, Card, Section, Modal, List, etc.)
- Shared screen container/layout component
- Shared form input abstraction
- Shared badge/status component
- Shared alert/notification component

---

## Summary Table

| Screen | Size | Inline Styles | Hard-coded Colors | Hard-coded Spacing | Typography Violations | Extraction Status |
|---|---:|---:|---:|---:|---:|---|
| EntryScreen | 491 | 25 | 3 | 12 | 8 | ⚠️ Partial |
| HistoryScreen | 458 | 37 | 4 | 15 | 12 | ❌ None |
| MedicationScreen | 386 | 24 | 3 | 10 | 10 | ❌ None |
| OnboardingScreen | 354 | 20 | 2 | 8 | 6 | ❌ None |
| SettingsScreen | 329 | 18 | 2 | 9 | 7 | ❌ None |
| ExportScreen | 164 | 9 | 1 | 4 | 3 | ❌ None |

---

## Styling Audit: FAIL

**Status:** Significantly incomplete

**Evidence:**
- 133 inline style objects across 6 screens
- 17 hard-coded color strings
- 62+ duplicated spacing values
- 47+ duplicated typography definitions
- Only 1 of 6 screens has partial style extraction

**Risk:** Global visual changes (theme switch, spacing scale adjustment, typography updates) require modifying 6+ feature files instead of updating central tokens.

---

## Recommendations (Priority)

1. **Create `history.styles.ts`** (458 lines → 37 styles to extract)
2. **Create `medication.styles.ts`** (386 lines → 24 styles to extract)
3. **Create `onboarding.styles.ts`** (354 lines → 20 styles to extract)
4. **Create `settings.styles.ts`** (329 lines → 18 styles to extract)
5. **Create `export.styles.ts`** (164 lines → 9 styles to extract)
6. **Complete `entry.styles.ts`** (add form labels, inputs, value displays)
7. **Replace all hard-coded colors** with `Colors[themeName].*` references
8. **Replace all magic numbers** with `Spacing.*` and `Typography.*` tokens
9. **Create shared UI components** (Button, Card, Section, Modal, Badge, etc.)
10. **Consolidate `global.css`** and `*.module.css` usage into token-driven styling

---

## Conclusion

The design tokens exist and are well-designed. However, feature screens do not consistently use them. The styling system is fragmented across inline styles, module CSS, and global CSS. 

**Before this can be called "complete," feature screens must migrate to token-based styling and be consolidated into colocated stylesheet files.**
