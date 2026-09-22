# Design System Audit

## Token Files

All design tokens live under `src/theme/`:

```text
src/theme/
├── colors.ts       (semantic color definitions)
├── typography.ts   (fonts, sizes, weights, line-heights, text styles)
├── spacing.ts      (margin/padding scale)
├── radii.ts        (border radius tokens)
├── shadows.ts      (elevation/shadow definitions)
└── index.ts        (barrel export)
```

---

## Color Tokens

### `src/theme/colors.ts`

**Semantic Palettes:**

#### Light Theme (`light`)
```ts
primary: #2196F3          (blue)
primary_light: #BBDEFB    (light blue)
success: #4CAF50          (green, success state)
success_light: #A5D6A7    (light green, success bg)
warning: #FF9800          (orange)
warning_light: #FFE0B2    (light orange)
error: #FF6B6B            (red)
error_light: #FFCDD2      (light red)
text_primary: #000000     (black text)
text_secondary: #666666   (gray text)
background: #FFFFFF       (white)
background_secondary: #F5F5F5 (light gray)
border: #CCCCCC           (light border)
disabled: #BDBDBD         (disabled state)
```

#### Dark Theme (`dark`)
```ts
primary: #1E88E5          (lighter blue)
primary_light: #0D47A1    (darker blue)
success: #66BB6A          (green)
success_light: #2E7D32    (darker green)
warning: #FFA726          (orange)
warning_light: #E65100    (darker orange)
error: #EF5350            (red)
error_light: #C62828      (darker red)
text_primary: #FFFFFF     (white text)
text_secondary: #BDBDBD   (light gray text)
background: #121212       (near-black)
background_secondary: #1E1E1E (dark gray)
border: #333333           (dark border)
disabled: #424242         (disabled state)
```

#### Blue Theme (`blue`) — Experimental/Unused
```ts
(Mirror of dark theme with blue accent)
```

**Type Exports:**
```ts
export type ThemeName = 'light' | 'dark' | 'blue';
export type ThemeColors = typeof light;
```

**Usage:**
```ts
import { Colors } from '@/theme';
const primaryColor = Colors.light.primary;  // #2196F3
const errorBg = Colors.dark.error_light;    // #FFCDD2
```

**Actual Application Colors:**
- Primary interaction: blue (`#2196F3` light, `#1E88E5` dark)
- Success (pain improving): green (`#4CAF50` light, `#66BB6A` dark)
- Warning (pain stable): orange (`#FF9800` light, `#FFA726` dark)
- Error (pain worsening): red (`#FF6B6B` light, `#EF5350` dark)

---

## Typography Tokens

### `src/theme/typography.ts`

**Font Families:**
```ts
fontFamily: 'System'  (platform native)
```

**Font Sizes:**
```ts
xs: 12
sm: 14
base: 16
lg: 18
xl: 20
2xl: 24
3xl: 32
```

**Font Weights:**
```ts
normal: '400'
medium: '500'
semibold: '600'
bold: '700'
```

**Line Heights:**
```ts
tight: 1.2
normal: 1.5
relaxed: 1.8
```

**Semantic Text Styles (objects combining size + weight + height):**
```ts
headline: { fontSize: 24, fontWeight: 'bold', lineHeight: 1.2 }
title: { fontSize: 20, fontWeight: 'semibold', lineHeight: 1.2 }
body: { fontSize: 16, fontWeight: 'normal', lineHeight: 1.5 }
caption: { fontSize: 12, fontWeight: 'normal', lineHeight: 1.5 }
```

**Usage:**
```ts
import { Typography } from '@/theme';
const headlineStyle = Typography.headline;  // { fontSize: 24, ... }
const bodyText = { ...Typography.body, color: Colors.light.text_primary };
```

---

## Spacing Tokens

### `src/theme/spacing.ts`

**Scale (in points/pixels):**
```ts
half: 4      (8px / 2)
one: 8       (base unit)
two: 16
three: 24
four: 32
five: 40
six: 48

// Semantic aliases
xs: 4
sm: 8
md: 16
lg: 24
xl: 32
2xl: 40
3xl: 48
```

**Usage:**
```ts
import { Spacing } from '@/theme';
const containerPadding = Spacing.md;    // 16
const marginTop = Spacing.lg;           // 24
```

---

## Radius Tokens

### `src/theme/radii.ts`

```ts
sm: 4
md: 8
lg: 12
xl: 16
pill: 999      (fully rounded)

// Semantic aliases
tabBar: 8      (tab bar bottom corners)
card: 12       (card/modal corners)
button: 8      (button corners)
```

**Usage:**
```ts
import { Radii } from '@/theme';
const tabBarRadius = Radii.tabBar;  // 8
```

---

## Shadows / Elevation Tokens

### `src/theme/shadows.ts`

**iOS (shadow) + Android (elevation) pairs:**

```ts
export const Shadows = {
  small: {
    ios: {
      shadowColor: Colors.light.text_primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: { elevation: 2 },
  },
  medium: {
    ios: {
      shadowColor: Colors.light.text_primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: { elevation: 4 },
  },
  tabBar: {
    ios: {
      shadowColor: Colors.light.text_primary,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: { elevation: 8 },
  },
};
```

**Usage:**
```ts
import { Shadows } from '@/theme';
const tabBarStyle = {
  ...Shadows.tabBar.ios,  // iOS users see shadow
  ...Shadows.tabBar.android,  // Android uses elevation (applied accordingly)
};
```

---

## Barrel Export

### `src/theme/index.ts`

```ts
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radii';
export * from './shadows';
```

**Recommended import:**
```ts
import { Colors, Typography, Spacing, Radii, Shadows } from '@/theme';
```

---

## ThemeContext Integration

### `src/context/ThemeContext.tsx`

**How tokens are connected:**

```ts
const { themeName } = useTheme();

// In component
const colors = Colors[themeName];  // 'light' | 'dark' | 'blue'
const bgColor = colors.background;
const textColor = colors.text_primary;
```

**Limitation:** ThemeContext only exposes `light` and `dark` modes. The `blue` palette exists in `Colors` but is never selected by the UI.

---

## Can Global Visual Language Change?

### Answer: **Partially (60%)**

**YES for:**
- Primary/secondary colors (via theme palette swap)
- Text colors (via theme palette swap)
- Border and background colors (via theme palette swap)
- Border radius (via Radii tokens)
- Elevation/shadows (via Shadows tokens)

**Example: Change primary interaction color globally**

Before:
```ts
// Scattered across screens
color: '#2196F3'
backgroundColor: '#BBDEFB'
```

After:
```ts
// Single source of truth
color: Colors[themeName].primary
backgroundColor: Colors[themeName].primary_light
```

This change only requires visiting `src/theme/colors.ts` and updating the palette.

---

**NO for:**
- Typography (font sizes/weights hardcoded in feature screens, not using `Typography` tokens)
- Spacing (margins/padding hardcoded as magic numbers `8`, `12`, `16`, `24` rather than `Spacing.sm`, `Spacing.md`)
- Component structure (cards, sections, buttons are feature-local, not abstracted)

**Example: Change all body text to size 14**

Current state:
- `EntryScreen.tsx` uses `fontSize: 16`
- `HistoryScreen.tsx` uses `fontSize: 16`
- `MedicationScreen.tsx` uses `fontSize: 14`
- No centralized `Typography.body` usage

To change globally:
- Must search and edit each file
- No single source of truth exists

---

## Design System Assessment

| Aspect | Status | Evidence |
|---|---|---|
| Token modules exist | ✅ YES | All 6 files created and exported |
| Color centralization | ✅ YES | 54 colors × 3 themes in one file |
| Typography tokens | ✅ YES | Font sizes, weights, semantic styles |
| Spacing tokens | ✅ YES | Scale from 4 to 48 pixels |
| Radius tokens | ✅ YES | 5 semantic radius values |
| Shadow tokens | ✅ YES | Platform-specific elevations |
| Token import pattern | ✅ YES | Barrel export from `@/theme` |
| ThemeContext connected | ✅ PARTIAL | Context reads themeName, but screens don't use tokens consistently |
| Global theme changeable | ⚠️ PARTIAL | Colors yes, typography/spacing no |

---

## Remaining Work

**To enable full global visual language changes:**

1. Replace hardcoded typography with `Typography.*` tokens
   - Find: `fontSize: 14`, `fontSize: 16`, `fontSize: 18`, etc.
   - Replace: `...Typography.body`, `...Typography.caption`, etc.

2. Replace hardcoded spacing with `Spacing.*` tokens
   - Find: `marginBottom: 8`, `paddingTop: 16`, etc.
   - Replace: `marginBottom: Spacing.sm`, `paddingTop: Spacing.md`, etc.

3. Replace hardcoded colors with semantic tokens
   - Find: `#FF6B6B`, `#4CAF50`, `#2196F3` (already mostly done in theme-aware screens)
   - Replace: `Colors[themeName].error`, `Colors[themeName].success`, etc.

4. Decide on `blue` theme
   - Is it experimental/unused? Can it be removed?
   - Or should it be exposed as a selectable theme option?

---

## Conclusion

**Design System: PARTIAL**

The token infrastructure is complete and well-organized. However, adoption in feature screens is incomplete. Screens still use hardcoded values for typography and spacing, limiting the ability to change the visual language globally.

The foundation is solid. With 1–2 more passes to migrate screens to token usage, the design system will be fully functional and centralized.
