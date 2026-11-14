import { VIEWS, APP_CONFIG } from '../config/app.js';

export function Sidebar({ view, setView, expiredCount, expiringCount, onAdd }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <p className="brand__mark">℞</p>
        <div>
          <h2>{APP_CONFIG.name}</h2>
          <p>{APP_CONFIG.tagline}</p>
        </div>
      </div>

      <nav aria-label="Primary">
        <ul>
          {VIEWS.map((v) => (
            <li key={v.id}>
              <button
                type="button"
                className={view === v.id ? 'nav-btn active' : 'nav-btn'}
                onClick={() => setView(v.id)}
                aria-current={view === v.id ? 'page' : undefined}
              >
                <span>{v.label}</span>
                <small>{v.hint}</small>
                {v.id === 'expiry' && (expiredCount + expiringCount) > 0 ? (
                  <em className="nav-count">{expiredCount + expiringCount}</em>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <button type="button" className="primary-btn wide" onClick={onAdd}>
        + Log batch
      </button>

      <div className="sidebar__note">
        <p>Rule of the shelf</p>
        <strong>First-expired, first-out.</strong>
        <span>Check amber batches every Monday.</span>
      </div>
    </aside>
  );
}
