import { createContext, useContext, useState } from 'react';

type Entry = {
  id: string;
  date: string;
  pain: number;
  note: string;
};

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