import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getProfile } from '../storage/profileStorage';

export default function Index() {
  const [destination, setDestination] = useState<string | null>(null);

  useEffect(() => {
    const checkProfile = async () => {
      const profile = await getProfile();

      if (!profile?.onboardingCompleted) {
        setDestination('/onboarding');
      } else {
        setDestination('/(tabs)/entry');
      }
    };

    checkProfile();
  }, []);

  if (!destination) return null;

  return <Redirect href={destination as any} />;
}