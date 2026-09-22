import React, { createContext, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StoredEntry } from '@/types/entry';

const STORAGE_KEY = 'crps_entries';

type EntriesContextType = {
  entries: StoredEntry[];
  addEntry: (entry: StoredEntry) => void;
  deleteEntry: (id: string) => void;
  clearEntries: () => void;
};



const EntriesContext = createContext<EntriesContextType | null>(null);

export function EntriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [entries, setEntries] = useState<StoredEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setEntries(JSON.parse(stored) as StoredEntry[]);
        }
      } catch (error) {
        console.error('Loading entries failed:', error);
      } finally {
        setHydrated(true);
      }
    };

    void loadEntries();
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const saveEntries = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      } catch (error) {
        console.error('Saving entries failed:', error);
      }
    };

    void saveEntries();
  }, [entries, hydrated]);

const addEntry = (entry: StoredEntry) => {
  setEntries((prev) => [entry, ...prev]);
};

const deleteEntry = (id: string) => {
  setEntries((prev) =>
    prev.filter((entry) => entry.id !== id)
  );
};



  const clearEntries = () => {
    setEntries([]);
  };

  return (
    <EntriesContext.Provider
      value={{
        entries,
        addEntry,
        deleteEntry,
        clearEntries,
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