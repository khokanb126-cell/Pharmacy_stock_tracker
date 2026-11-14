import { CATEGORIES } from '../../config/app.js';

export function Toolbar({ query, setQuery, status, setStatus, category, setCategory, sortKey, setSortKey }) {
  const statuses = [
    ['all', 'All'],
    ['low', 'Low stock'],
    ['expiring', 'Expiring ≤30d'],
    ['expired', 'Expired'],
  ];
  return (
    <div className="toolbar">
      <label className="search">
        <span aria-hidden="true">⌕</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, batch, supplier…"
          aria-label="Search medicines"
        />
      </label>
      <div className="chip-row" role="tablist" aria-label="Stock status filter">
        {statuses.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={status === id}
            className={status === id ? 'chip active' : 'chip'}
            onClick={() => setStatus(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="select-row">
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filter by category">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={sortKey} onChange={(e) => setSortKey(e.target.value)} aria-label="Sort medicines">
          <option value="expiry-asc">Expiry · soonest</option>
          <option value="expiry-desc">Expiry · latest</option>
          <option value="qty-asc">Stock · lowest</option>
          <option value="qty-desc">Stock · highest</option>
          <option value="name-asc">Name · A–Z</option>
        </select>
      </div>
    </div>
  );
}
