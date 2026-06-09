import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type Entry = {
  id: string;
  date: string;
  pain: number;
  note: string;
};

const STORAGE_KEY = 'crps_entries';

type EntriesContextType = {
  entries: Entry[];
  addEntry: (entry: Entry) => void;
};

const EntriesContext = createContext<EntriesContextType | null>(null);

export function EntriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
  loadEntries();
}, []);

const loadEntries = async () => {
  try {
    const stored =
      await AsyncStorage.getItem(STORAGE_KEY);

    if (stored) {
      setEntries(JSON.parse(stored));
    }
  } catch (error) {
    console.error('Loading entries failed:', error);
  }
};

useEffect(() => {
  saveEntries();
}, [entries]);

const saveEntries = async () => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(entries)
    );
  } catch (error) {
    console.error('Saving entries failed:', error);
  }
};

const addEntry = (entry: Entry) => {
  setEntries((prev) => [entry, ...prev]);
};

return (
  <EntriesContext.Provider
    value={{
      entries,
      addEntry,
    }}
  >
    {children}
  </EntriesContext.Provider>
);
}

export function useEntries() {
  const context = useContext(EntriesContext);

  if (!context) {
    throw new Error(
      'useEntries must be used inside EntriesProvider'
    );
  }

  return context;
}