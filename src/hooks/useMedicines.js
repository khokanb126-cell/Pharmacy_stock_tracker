import { useMemo } from 'react';
import { APP_CONFIG } from '../config/app.js';
import { SEED_MEDICINES } from '../constants/medicines.js';
import { useLocalStorage } from './useLocalStorage.js';
import { slugId } from '../utils/format.js';

export function useMedicines() {
  const [medicines, setMedicines] = useLocalStorage(APP_CONFIG.storageKey, SEED_MEDICINES);

  const api = useMemo(
    () => ({
      list: medicines,
      add(input) {
        const item = {
          id: slugId(input.name),
          name: input.name.trim(),
          strength: input.strength.trim() || '—',
          form: input.form.trim() || 'Tablet',
          category: input.category || 'Other',
          batch: input.batch.trim(),
          qty: Number(input.qty),
          lowAt: Number(input.lowAt),
          expiry: input.expiry,
          supplier: input.supplier.trim() || 'Local supplier',
        };
        setMedicines((prev) => [item, ...prev]);
        return item;
      },
      remove(id) {
        setMedicines((prev) => prev.filter((m) => m.id !== id));
      },
      adjust(id, delta) {
        setMedicines((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, qty: Math.max(0, Number(m.qty) + delta) } : m,
          ),
        );
      },
      reset() {
        setMedicines(SEED_MEDICINES);
      },
    }),
    [medicines, setMedicines],
  );

  return api;
}
