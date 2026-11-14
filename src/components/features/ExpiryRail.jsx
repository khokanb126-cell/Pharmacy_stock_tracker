import { classifyMedicine } from '../../services/medicineService.js';
import { formatDate } from '../../utils/dates.js';

export function ExpiryRail({ medicines }) {
  const urgent = medicines
    .map((m) => ({ med: m, c: classifyMedicine(m) }))
    .filter(({ c }) => c.expired || c.critical || c.expiringSoon)
    .sort((a, b) => a.c.days - b.c.days)
    .slice(0, 6);

  return (
    <aside className="rail reveal" style={{ '--d': '240ms' }}>
      <div className="rail__head">
        <h3>Expiry watch</h3>
        <p>Sorted by days remaining. Pull expired stock from shelves first.</p>
      </div>
      {urgent.length === 0 ? (
        <p className="rail__calm">All batches are stable. No action needed this week.</p>
      ) : (
        <ol className="rail__list">
          {urgent.map(({ med, c }) => (
            <li key={med.id} className={c.expired ? 'urgent' : ''}>
              <div>
                <p className="rail__name">{med.name}</p>
                <p className="rail__meta mono">{med.batch} · {formatDate(med.expiry)}</p>
              </div>
              <p className={`rail__days mono ${c.expired ? 'neg' : 'warn'}`}>
                {c.expired ? `-${Math.abs(c.days)}d` : `${c.days}d`}
              </p>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
