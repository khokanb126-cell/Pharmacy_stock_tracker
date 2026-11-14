export function formatQty(n) {
  return Number(n).toLocaleString('en-US');
}

export function slugId(name) {
  const base = String(name || 'medicine')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 32);
  return `m-${base || 'item'}-${Date.now().toString(36)}`;
}
