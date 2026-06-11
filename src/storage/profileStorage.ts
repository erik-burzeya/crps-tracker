import AsyncStorage from '@react-native-async-storage/async-storage';
import type { UserProfile } from '../../types/UserProfile';

const PROFILE_KEY = 'userProfile';

export async function saveProfile(profile: UserProfile) {
  await AsyncStorage.setItem(
    PROFILE_KEY,
    JSON.stringify(profile)
  );
}

export async function getProfile(): Promise<UserProfile | null> {
  const data = await AsyncStorage.getItem(PROFILE_KEY);

  if (!data) return null;

  return JSON.parse(data);
}