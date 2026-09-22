export interface UserProfile {
  name: string;

  affectedRegion: string;

  crpsType: 'I' | 'II' | 'unknown';

  crpsPhase:
    | 'acute'
    | 'dystrophic'
    | 'atrophic'
    | 'unknown';

  diagnosisDate?: string;

  onboardingCompleted: boolean;
}