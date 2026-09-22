# Source structure

`src/app` contains only Expo Router route adapters. Screen implementations live
under `src/features`, so navigation configuration stays separate from feature
presentation and behavior.

```text
src/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── entry.tsx
│   │   ├── history.tsx
│   │   ├── medication.tsx
│   │   ├── export.tsx
│   │   └── settings.tsx
│   ├── _layout.tsx
│   ├── index.tsx
│   └── onboarding.tsx
├── features/
│   ├── entry/
│   │   ├── components/
│   │   ├── entry.styles.ts
│   │   └── EntryScreen.tsx
│   ├── export/ExportScreen.tsx
│   ├── history/HistoryScreen.tsx
│   ├── medication/MedicationScreen.tsx
│   ├── onboarding/OnboardingScreen.tsx
│   └── settings/SettingsScreen.tsx
├── theme/
│   ├── colors.ts
│   ├── typography.ts
│   ├── spacing.ts
│   ├── radii.ts
│   ├── shadows.ts
│   └── index.ts
├── components/
├── constants/
├── context/
├── hooks/
├── storage/
└── types/
```

The theme modules provide semantic colors, typography, spacing, radii, and
platform-aware shadows. `constants/theme.ts` remains as a compatibility
barrel for existing imports while new code should import from `src/theme`.
