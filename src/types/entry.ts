export interface AdditionalSymptom {
  symptom: string;
  intensity: number;
  note?: string;
}

export interface Entry {
  painLevel: number;

  temperatureFeeling?: string;
  skinColor?: string;
  swelling?: boolean;

  painQualities: string[];

  triggers: string[];

  notes: string;

  additionalSymptoms: AdditionalSymptom[];
}

export interface StoredEntry {
  id: string;
  date: string;
  pain: number;
  note: string;
  painQualities: string[];
  triggers: string[];
  temperatureFeeling: string | null;
  skinColor: string | null;
  swelling: boolean | null;
  additionalSymptoms: AdditionalSymptom[];
}