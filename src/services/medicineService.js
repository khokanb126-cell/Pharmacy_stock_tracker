import { daysUntilExpiry } from '../utils/dates.js';
import { APP_CONFIG } from '../config/app.js';

export function classifyMedicine(med) {
  const days = daysUntilExpiry(med.expiry);
  const expired = days < 0;
  const critical = !expired && days <= APP_CONFIG.expiryCriticalDays;
  const expiringSoon = !expired && !critical && days <= APP_CONFIG.expirySoonDays;
  const low = med.qty <= med.lowAt;
  return { days, expired, critical, expiringSoon, low };
}

export function computeStats(list) {
  let totalUnits = 0;
  let low = 0;
  let expired = 0;
  let expiring = 0;
  for (const m of list) {
    totalUnits += Number(m.qty) || 0;
    const c = classifyMedicine(m);
    if (c.low) low += 1;
    if (c.expired) expired += 1;
    else if (c.expiringSoon || c.critical) expiring += 1;
  }
  return {
    totalMedicines: list.length,
    totalUnits,
    low,
    expired,
    expiring,
  };
}

export function filterMedicines(list, { query = '', status = 'all', category = 'all' } = {}) {
  const q = query.trim().toLowerCase();
  return list.filter((m) => {
    if (category !== 'all' && m.category !== category) return false;
    const c = classifyMedicine(m);
    if (status === 'low' && !c.low) return false;
    if (status === 'expired' && !c.expired) return false;
    if (status === 'expiring' && !(c.expiringSoon || c.critical)) return false;
    if (!q) return true;
    return [m.name, m.batch, m.supplier, m.category, m.strength]
      .join(' ')
      .toLowerCase()
      .includes(q);
  });
}

export function sortMedicines(list, sortKey = 'expiry-asc') {
  const out = [...list];
  switch (sortKey) {
    case 'qty-asc':
      return out.sort((a, b) => a.qty - b.qty);
    case 'qty-desc':
      return out.sort((a, b) => b.qty - a.qty);
    case 'name-asc':
      return out.sort((a, b) => a.name.localeCompare(b.name));
    case 'expiry-desc':
      return out.sort((a, b) => String(b.expiry).localeCompare(String(a.expiry)));
    case 'expiry-asc':
    default:
      return out.sort((a, b) => String(a.expiry).localeCompare(String(b.expiry)));
  }
}

export function validateMedicine(input) {
  const errors = {};
  if (!input.name || !input.name.trim()) errors.name = 'Name is required';
  if (!input.batch || !input.batch.trim()) errors.batch = 'Batch is required';
  if (!Number.isFinite(Number(input.qty)) || Number(input.qty) < 0)
    errors.qty = 'Qty must be 0 or more';
  if (!Number.isFinite(Number(input.lowAt)) || Number(input.lowAt) < 0)
    errors.lowAt = 'Low threshold must be 0 or more';
  if (!input.expiry) errors.expiry = 'Expiry date is required';
  return errors;
}
