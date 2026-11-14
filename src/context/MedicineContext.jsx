import { createContext, useContext, useMemo } from 'react';
import { useMedicines } from '../hooks/useMedicines.js';

const MedicineContext = createContext(null);

export function MedicineProvider({ children }) {
  const store = useMedicines();
  const value = useMemo(() => store, [store]);
  return <MedicineContext.Provider value={value}>{children}</MedicineContext.Provider>;
}

export function useMedicineStore() {
  const ctx = useContext(MedicineContext);
  if (!ctx) throw new Error('useMedicineStore must be used inside MedicineProvider');
  return ctx;
}
