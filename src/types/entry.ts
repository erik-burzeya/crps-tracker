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