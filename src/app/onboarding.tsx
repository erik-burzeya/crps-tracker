import { saveProfile } from '@/storage/profileStorage';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function OnboardingScreen() {
  const finishOnboarding = async () => {
    await saveProfile({
      name: '',
      affectedRegion: '',
      crpsType: 'unknown',
      crpsPhase: 'unknown',
      onboardingCompleted: true,
    });

    router.replace('/(tabs)/entry');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginBottom: 12,
        }}
      >
        Willkommen bei CRPS APP
      </Text>

      <Text style={{ marginBottom: 30 }}>
        Dies ist ein Test des Onboarding-Flows.
      </Text>

      <Pressable
        onPress={finishOnboarding}
        style={{
          backgroundColor: '#4CAF50',
          padding: 14,
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '600',
          }}
        >
          App starten
        </Text>
      </Pressable>
    </View>
  );
}