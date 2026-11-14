export const APP_CONFIG = {
  name: 'Remedium Ledger',
  tagline: 'Pharmacy stock & expiry control',
  lowStockDefault: 20,
  expirySoonDays: 30,
  expiryCriticalDays: 7,
  storageKey: 'remedium-ledger-v1',
};

export const VIEWS = [
  { id: 'dashboard', label: 'Ledger', hint: 'Overview' },
  { id: 'medicines', label: 'Stockroom', hint: 'All medicines' },
  { id: 'expiry', label: 'Expiry', hint: 'Time-sensitive' },
];

export const CATEGORIES = [
  'Antibiotic',
  'Analgesic',
  'Cardiac',
  'Endocrine',
  'Respiratory',
  'GI',
  'Topical',
  'Supplement',
  'Other',
];
