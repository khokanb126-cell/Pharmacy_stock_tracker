import { useMemo, useState } from 'react';
import { useMedicineStore } from '../context/MedicineContext.jsx';
import { Sidebar } from './Sidebar.jsx';
import { StatCard } from '../components/ui/StatCard.jsx';
import { Modal } from '../components/ui/Modal.jsx';
import { MedicineTable } from '../components/features/MedicineTable.jsx';
import { AddMedicineForm } from '../components/features/AddMedicineForm.jsx';
import { ExpiryRail } from '../components/features/ExpiryRail.jsx';
import { Toolbar } from '../components/features/Toolbar.jsx';
import { computeStats, filterMedicines, sortMedicines } from '../services/medicineService.js';

export function DashboardLayout() {
  const store = useMedicineStore();
  const [view, setView] = useState('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [sortKey, setSortKey] = useState('expiry-asc');

  const stats = useMemo(() => computeStats(store.list), [store.list]);
  const rows = useMemo(
    () =>
      sortMedicines(
        filterMedicines(store.list, { query, status: view === 'expiry' ? 'expiring' : status, category }),
        sortKey,
      ),
    [store.list, query, status, category, sortKey, view],
  );

  const showTable = view !== 'dashboard' || query || status !== 'all' || category !== 'all';

  return (
    <div className="shell">
      <Sidebar
        view={view}
        setView={setView}
        expiredCount={stats.expired}
        expiringCount={stats.expiring}
        onAdd={() => setModalOpen(true)}
      />

      <main className="dashboard">
        <header className="masthead reveal">
          <div>
            <p className="kicker">Apothecary control · {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            <h1>
              The morning ledger <em>never lies.</em>
            </h1>
            <p className="lede">
              {stats.expired} expired · {stats.expiring} expiring soon · {stats.low} low-stock
              batches across {stats.totalMedicines} medicines.
            </p>
          </div>
          <div className="masthead__actions">
            <button type="button" className="ghost-btn" onClick={store.reset}>Restore demo</button>
            <button type="button" className="primary-btn" onClick={() => setModalOpen(true)}>Log batch</button>
          </div>
        </header>

        <section className="stats" aria-label="Stock summary">
          <StatCard index={0} label="Medicines tracked" value={stats.totalMedicines} sub={`${stats.totalUnits.toLocaleString()} units on shelf`} tone="pine" />
          <StatCard index={1} label="Low stock" value={stats.low} sub="At or below minimum" tone="amber" />
          <StatCard index={2} label="Expiring ≤ 30 days" value={stats.expiring} sub="Schedule pull-forward" tone="paper" />
          <StatCard index={3} label="Expired" value={stats.expired} sub="Quarantine immediately" tone="blood" />
        </section>

        <div className="content-grid">
          <section className="panel reveal" style={{ '--d': '160ms' }}>
            <div className="panel__head">
              <h2>{view === 'expiry' ? 'Expiry queue' : view === 'medicines' ? 'Stockroom' : 'Ledger entries'}</h2>
              <p>{rows.length} batch{rows.length === 1 ? '' : 'es'} shown</p>
            </div>
            <Toolbar
              query={query}
              setQuery={setQuery}
              status={status}
              setStatus={setStatus}
              category={category}
              setCategory={setCategory}
              sortKey={sortKey}
              setSortKey={setSortKey}
            />
            {showTable ? (
              <MedicineTable rows={rows} onAdjust={store.adjust} onRemove={store.remove} />
            ) : (
              <MedicineTable rows={sortMedicines([...store.list], 'expiry-asc').slice(0, 5)} onAdjust={store.adjust} onRemove={store.remove} />
            )}
          </section>
          <ExpiryRail medicines={store.list} />
        </div>
      </main>

      {modalOpen ? (
        <Modal title="Log a new batch" sub="Validated at the boundary — nothing half-written enters the ledger." onClose={() => setModalOpen(false)}>
          <AddMedicineForm
            onCancel={() => setModalOpen(false)}
            onSubmit={(values) => {
              store.add(values);
              setModalOpen(false);
              setView('medicines');
            }}
          />
        </Modal>
      ) : null}
    </div>
  );
}
