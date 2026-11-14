import { Badge } from '../ui/Badge.jsx';
import { EmptyState } from '../ui/EmptyState.jsx';
import { classifyMedicine } from '../../services/medicineService.js';
import { formatDate } from '../../utils/dates.js';
import { formatQty } from '../../utils/format.js';

function statusBadges(med) {
  const c = classifyMedicine(med);
  const out = [];
  if (c.expired) out.push(<Badge key="exp" tone="danger">Expired</Badge>);
  else if (c.critical) out.push(<Badge key="crit" tone="danger">≤7 days</Badge>);
  else if (c.expiringSoon) out.push(<Badge key="soon" tone="warn">≤30 days</Badge>);
  else out.push(<Badge key="ok" tone="ok">Stable</Badge>);
  if (c.low && !c.expired) out.push(<Badge key="low" tone="low">Low stock</Badge>);
  return out;
}

export function MedicineTable({ rows, onAdjust, onRemove }) {
  if (rows.length === 0) {
    return (
      <EmptyState
        title="Nothing in this drawer"
        body="No medicines match the current search and filters. Loosen a filter or log a new batch."
      />
    );
  }

  return (
    <div className="table-wrap">
      <table className="ledger-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Batch</th>
            <th>Expiry</th>
            <th>Stock</th>
            <th>Status</th>
            <th className="th-actions">Adjust</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => {
            const c = classifyMedicine(m);
            return (
              <tr key={m.id} className={c.expired ? 'is-expired' : ''}>
                <td>
                  <p className="med-name">{m.name}</p>
                  <p className="med-meta">
                    {m.strength} · {m.form} · {m.category}
                  </p>
                  <p className="med-meta dim">{m.supplier}</p>
                </td>
                <td className="mono">{m.batch}</td>
                <td>
                  <p className="mono">{formatDate(m.expiry)}</p>
                  <p className={`days ${c.expired ? 'neg' : c.days <= 30 ? 'warn' : ''}`}>
                    {c.expired ? `${Math.abs(c.days)}d overdue` : `${c.days}d left`}
                  </p>
                </td>
                <td>
                  <p className="qty mono">{formatQty(m.qty)}</p>
                  <p className="med-meta dim">min {formatQty(m.lowAt)}</p>
                </td>
                <td>
                  <div className="badge-row">{statusBadges(m)}</div>
                </td>
                <td>
                  <div className="row-actions">
                    <button
                      type="button"
                      className="mini-btn"
                      onClick={() => onAdjust(m.id, -1)}
                      aria-label={`Dispense one ${m.name}`}
                    >
                      −1
                    </button>
                    <button
                      type="button"
                      className="mini-btn"
                      onClick={() => onAdjust(m.id, 1)}
                      aria-label={`Restock one ${m.name}`}
                    >
                      +1
                    </button>
                    <button
                      type="button"
                      className="mini-btn danger"
                      onClick={() => onRemove(m.id)}
                      aria-label={`Remove ${m.name}`}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
