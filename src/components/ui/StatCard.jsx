import { formatQty } from '../../utils/format.js';

export function StatCard({ index, label, value, sub, tone = 'ink', action }) {
  return (
    <article className={`stat stat--${tone} reveal`} style={{ '--d': `${index * 90}ms` }}>
      <p className="stat__kicker">{label}</p>
      <p className="stat__value">{typeof value === 'number' ? formatQty(value) : value}</p>
      <p className="stat__sub">{sub}</p>
      {action}
    </article>
  );
}
