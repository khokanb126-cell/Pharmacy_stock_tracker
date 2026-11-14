export function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function parseISODate(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function daysUntilExpiry(expiryISO, from = startOfToday()) {
  if (!expiryISO) return Number.POSITIVE_INFINITY;
  const target = parseISODate(expiryISO);
  const diff = target - from;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatDate(expiryISO) {
  const d = parseISODate(expiryISO);
  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
