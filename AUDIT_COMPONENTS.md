# Components Audit

## Global Reusable Components

### Correctly Extracted

**Location:** `src/components/`

#### 1. **ThemedText** (`themed-text.tsx`)
- Abstracts Text component with theme-aware colors
- Props: `type` (default/secondary), `style`
- **Status:** ✅ Appropriate abstraction

#### 2. **ThemedView** (`themed-view.tsx`)
- Abstracts View component with theme-aware background
- Props: `type` (default/secondary), `style`
- **Status:** ✅ Appropriate abstraction

#### 3. **AnimatedIcon** (`animated-icon.tsx` + `.web.tsx`)
- Cross-platform animated icon component
- Used in navigation
- **Status:** ✅ Appropriate extraction (platform-specific needed)

#### 4. **UI/Collapsible** (`ui/collapsible.tsx`)
- Accordion/disclosure component
- Used in settings screens
- **Status:** ✅ Appropriate extraction

---

### Potentially Reusable but Not Extracted

| Component | Location | Risk | Status |
|---|---|---|---|
| Settings item row (text + toggle/button) | `src/features/settings/SettingsScreen.tsx` (inline) | Duplicated pattern | ⚠️ Should extract |
| Entry control card (label + input) | `src/features/entry/EntryScreen.tsx` (inline) | Used in onboarding too | ⚠️ Should extract |
| History entry card (date + status + delete) | `src/features/history/HistoryScreen.tsx` (inline) | Unique pattern | ✅ OK to keep local |
| Medication item (name + edit/delete) | `src/features/medication/MedicationScreen.tsx` (inline) | Potentially reusable | ⚠️ Should extract |

---

## Feature-Specific Components

### Entry Feature (`src/features/entry/components/`)

1. **MultiSelectChips.tsx** (97 lines)
   - Renders multiple checkboxes as chip-like buttons
   - Used for symptoms, triggers
   - **Status:** ✅ Correctly feature-local

2. **PainSlider.tsx** (73 lines)
   - Custom slider for pain level 0-10
   - Entry-specific logic
   - **Status:** ✅ Correctly feature-local

3. **SingleSelectChips.tsx** (89 lines)
   - Radio button rendering as chips
   - Entry-specific
   - **Status:** ✅ Correctly feature-local

---

### Other Features

No component extraction in:
- History feature
- Medication feature
- Settings feature
- Onboarding feature
- Export feature

All rendering is inline in the screen files.

---

## Duplicated Components or UI Patterns

### Pattern 1: Section Header with Subtext

Found in:
- EntryScreen.tsx (line ~89)
- HistoryScreen.tsx (line ~156)
- MedicationScreen.tsx (line ~89)
- SettingsScreen.tsx (line ~92)

```tsx
// Pattern
<Text style={{ fontSize: 16, fontWeight: '600', color: colors.text_primary }}>
  Section Title
</Text>
```

**Should extract:** `SectionHeader` component

---

### Pattern 2: Card Layout

Found in:
- HistoryScreen.tsx (entries card)
- MedicationScreen.tsx (medication card)
- SettingsScreen.tsx (setting items)

```tsx
// Pattern
<View style={{
  backgroundColor: colors.background_secondary,
  borderRadius: 8,
  padding: 12,
  marginVertical: 8,
}}>
  {content}
</View>
```

**Should extract:** `Card` or `Panel` component

---

### Pattern 3: Form Input Row

Found in:
- EntryScreen.tsx
- OnboardingScreen.tsx
- SettingsScreen.tsx (as text input for profile editing)

```tsx
// Pattern
<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
  <Text>{label}</Text>
  <Input value={value} onChange={handler} />
</View>
```

**Should extract:** `FormInputRow` or `LabeledInput` component

---

### Pattern 4: Delete/Confirm Button

Found in:
- HistoryScreen.tsx (delete entry)
- MedicationScreen.tsx (delete medication)
- SettingsScreen.tsx (clear all entries)

```tsx
// Pattern
<Pressable
  onPress={() => showAlert({
    title: 'Confirm?',
    onConfirm: () => deleteItem(id),
  })}
  style={{
    backgroundColor: colors.error_light,
    padding: 8,
    borderRadius: 8,
  }}
>
  <Text style={{ color: colors.error }}>Delete</Text>
</Pressable>
```

**Should extract:** `ConfirmButton` or `DestructiveAction` component

---

### Pattern 5: Status Badge

Found in:
- HistoryScreen.tsx (pain level indicator)
- MedicationScreen.tsx (usage status)

```tsx
// Pattern
<View style={{
  backgroundColor: getStatusColor(status),
  borderRadius: 999,
  paddingHorizontal: 8,
  paddingVertical: 4,
  alignSelf: 'flex-start',
}}>
  <Text style={{ fontSize: 12, color: colors.background }}>
    {statusLabel}
  </Text>
</View>
```

**Should extract:** `Badge` or `StatusBadge` component

---

## Over-Engineering Assessment

### ThemeContext

**Is it over-engineered?** ❌ No.

- Provides theme mode and color palette
- Simple, focused purpose
- Correctly used by screens

---

### Entry Feature Hooks

**Are component-specific hooks over-engineered?** ⚠️ Unclear.

None currently exist. Form state lives directly in EntryScreen.tsx.

If extracted, would need to clarify:
- Should hooks manage form state or delegate to context?
- Is medication persistence a separate concern?
- Should validation live in hooks or context?

Current approach (state in screen) is simpler but less testable.

---

### Styling Approach

**Is having both global tokens and feature-level StyleSheets over-engineered?** ❌ No.

This is the standard React Native pattern:
1. Global design tokens (colors, spacing, typography) in one place
2. Component-specific styling in colocated StyleSheets
3. Minimal inline styles (only dynamic changes)

---

## Component Architecture Assessment

| Aspect | Status | Evidence |
|---|---|---|
| Global UI components | ✅ GOOD | ThemedText, ThemedView, AnimatedIcon, Collapsible all well-extracted |
| Feature-local components | ✅ GOOD | Entry controls correctly isolated |
| Duplicated UI patterns | ⚠️ MEDIUM | 5+ patterns identified (section headers, cards, forms, badges, buttons) |
| Shared abstractions | ❌ LACKING | No Button, Card, Badge, Input, Modal abstractions despite duplications |
| Scaffold/template files | ⚠️ CLEANUP NEEDED | app-tabs.tsx, settings/*.tsx empty files remain |
| Over-engineering | ❌ NONE | Architecture is appropriate in scope |

---

## Remaining Issues

### High Priority

1. **Extract 5+ duplicated UI patterns** into reusable components:
   - `SectionHeader` — labeled section titles
   - `Card` — container with border/shadow/padding
   - `FormInputRow` — label + input pair
   - `ConfirmButton` — destructive action with confirmation
   - `Badge` — status indicator

2. **Remove empty/scaffold components:**
   - `src/components/app-tabs.tsx`
   - `src/components/settings/SettingsLink.tsx`
   - `src/components/settings/SettingsSection.tsx`
   - `src/components/settings/ThemeSelector.tsx`

3. **Clarify intent of low-usage components:**
   - `hint-row.tsx` — used?
   - `web-badge.tsx` — used?
   - `external-link.tsx` — used?

---

## Conclusion

**Components: PARTIAL**

The component architecture correctly separates global reusable components from feature-specific ones. However, significant UI patterns are duplicated across features without abstraction. This creates maintenance burden and inconsistency.

Extracting 5–7 reusable components would improve consistency, maintainability, and testability.

The codebase is not over-engineered; the remaining issues are about **adding the right abstractions at the right scope**, not removing unnecessary complexity.
