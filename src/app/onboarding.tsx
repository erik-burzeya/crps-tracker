import { saveProfile } from '@/storage/profileStorage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);

  const [name, setName] = useState('');
  const [affectedRegion, setAffectedRegion] = useState('');
  const [crpsType, setCrpsType] = useState<'I' | 'II' | 'unknown'>(
    'unknown'
  );
  const [crpsPhase, setCrpsPhase] = useState<
    'acute' | 'dystrophic' | 'atrophic' | 'unknown'
  >('unknown');
  const [diagnosisDate, setDiagnosisDate] = useState('');

  const totalSteps = 6;

  const next = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const finishOnboarding = async () => {
    await saveProfile({
      name,
      affectedRegion,
      crpsType,
      crpsPhase,
      diagnosisDate,
      onboardingCompleted: true,
    });

    router.replace('/(tabs)/entry');
  };

  const OptionButton = ({
    label,
    selected,
    onPress,
  }: {
    label: string;
    selected: boolean;
    onPress: () => void;
  }) => (
    <Pressable
      onPress={onPress}
      style={{
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: selected ? '#4CAF50' : '#666',
        backgroundColor: selected
          ? 'rgba(76,175,80,0.15)'
          : 'transparent',
      }}
    >
      <Text>{label}</Text>
    </Pressable>
  );

  const progress = ((step + 1) / (totalSteps + 1)) * 100;
console.log(back);
console.log(next);
  return (
    
    <View
      style={{
        flex: 1,
        padding: 24,
        paddingTop: 60,
      }}
    >
      <View
        style={{
          height: 8,
          backgroundColor: '#333',
          borderRadius: 999,
          marginBottom: 30,
        }}
      >
        <View
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: '#4CAF50',
            borderRadius: 999,
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        {step === 0 && (
          <>
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                marginBottom: 16,
              }}
            >
              Willkommen bei CRPS APP
            </Text>

            <Text>
              In wenigen Schritten richten wir dein Profil ein.
            </Text>
          </>
        )}

        {step === 1 && (
          <>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                marginBottom: 20,
              }}
            >
              Wie dürfen wir dich nennen?
            </Text>

            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Name"
              style={{
                borderWidth: 1,
                borderColor: '#666',
                borderRadius: 12,
                padding: 14,
              }}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                marginBottom: 20,
              }}
            >
              Betroffene Region
            </Text>

            <OptionButton
              label="Hand"
              selected={affectedRegion === 'Hand'}
              onPress={() => setAffectedRegion('Hand')}
            />

            <OptionButton
              label="Arm"
              selected={affectedRegion === 'Arm'}
              onPress={() => setAffectedRegion('Arm')}
            />

            <OptionButton
              label="Fuß"
              selected={affectedRegion === 'Fuß'}
              onPress={() => setAffectedRegion('Fuß')}
            />

            <OptionButton
              label="Bein"
              selected={affectedRegion === 'Bein'}
              onPress={() => setAffectedRegion('Bein')}
            />
          </>
        )}

        {step === 3 && (
          <>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                marginBottom: 20,
              }}
            >
              CRPS-Typ
            </Text>

            <OptionButton
              label="Typ I"
              selected={crpsType === 'I'}
              onPress={() => setCrpsType('I')}
            />

            <OptionButton
              label="Typ II"
              selected={crpsType === 'II'}
              onPress={() => setCrpsType('II')}
            />

            <OptionButton
              label="Unbekannt"
              selected={crpsType === 'unknown'}
              onPress={() => setCrpsType('unknown')}
            />
          </>
        )}

        {step === 4 && (
          <>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                marginBottom: 20,
              }}
            >
              Aktuelle Phase
            </Text>

            <OptionButton
              label="Akut"
              selected={crpsPhase === 'acute'}
              onPress={() => setCrpsPhase('acute')}
            />

            <OptionButton
              label="Dystrophisch"
              selected={crpsPhase === 'dystrophic'}
              onPress={() => setCrpsPhase('dystrophic')}
            />

            <OptionButton
              label="Atrophisch"
              selected={crpsPhase === 'atrophic'}
              onPress={() => setCrpsPhase('atrophic')}
            />

            <OptionButton
              label="Unbekannt"
              selected={crpsPhase === 'unknown'}
              onPress={() => setCrpsPhase('unknown')}
            />
          </>
        )}

        {step === 5 && (
          <>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                marginBottom: 20,
              }}
            >
              Diagnosezeitpunkt
            </Text>

            <TextInput
              value={diagnosisDate}
              onChangeText={setDiagnosisDate}
              placeholder="MM/JJJJ"
              style={{
                borderWidth: 1,
                borderColor: '#666',
                borderRadius: 12,
                padding: 14,
              }}
            />
          </>
        )}

        {step === 6 && (
          <>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '600',
                marginBottom: 50,
              }}
            >
              Zusammenfassung
            </Text>

            <Text>Name: {name || '-'}</Text>
            <Text>Region: {affectedRegion || '-'}</Text>
            <Text>CRPS-Typ: {crpsType}</Text>
            <Text>Phase: {crpsPhase}</Text>
            <Text>Diagnose: {diagnosisDate || '-'}</Text>
          </>
        )}
      </View>

      <View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  }}
>
  <Pressable
    onPress={back}
    style={{
      paddingHorizontal: 20,
      paddingVertical: 12,
    }}
  >
    <Text
      style={{
        fontWeight: '600',
      }}
    >
      Zurück
    </Text>
  </Pressable>

  {step < 6 ? (
    <Pressable
    
      onPress={next}
      
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
      }}
    >
      <Text
        style={{
          fontWeight: '600',
        }}
      >
        Weiter
      </Text>
    </Pressable>
  ) : (
    <Pressable
      onPress={finishOnboarding}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
      }}
    >
      <Text
        style={{
          fontWeight: '600',
        }}
      >
        Fertig
      </Text>
    </Pressable>
  )}
</View>
    </View>
  );
}