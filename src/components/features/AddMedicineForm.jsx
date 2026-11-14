import { useState } from 'react';
import { CATEGORIES } from '../../config/app.js';
import { validateMedicine } from '../../services/medicineService.js';

const BLANK = {
  name: '',
  strength: '',
  form: 'Tablet',
  category: 'Other',
  batch: '',
  qty: '',
  lowAt: '20',
  expiry: '',
  supplier: '',
};

export function AddMedicineForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(BLANK);
  const [errors, setErrors] = useState({});

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const problems = validateMedicine(form);
    setErrors(problems);
    if (Object.keys(problems).length > 0) return;
    onSubmit(form);
    setForm(BLANK);
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>
          Medicine name *
          <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Amoxicillin" />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </label>
        <label>
          Batch *
          <input value={form.batch} onChange={(e) => set('batch', e.target.value)} placeholder="AX-25-101" className="mono" />
          {errors.batch ? <span className="field-error">{errors.batch}</span> : null}
        </label>
        <label>
          Strength
          <input value={form.strength} onChange={(e) => set('strength', e.target.value)} placeholder="500mg" />
        </label>
        <label>
          Form
          <input value={form.form} onChange={(e) => set('form', e.target.value)} placeholder="Tablet / Syrup / Pen" />
        </label>
        <label>
          Category
          <select value={form.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Supplier
          <input value={form.supplier} onChange={(e) => set('supplier', e.target.value)} placeholder="Northgate Labs" />
        </label>
        <label>
          Quantity *
          <input type="number" min="0" value={form.qty} onChange={(e) => set('qty', e.target.value)} placeholder="50" />
          {errors.qty ? <span className="field-error">{errors.qty}</span> : null}
        </label>
        <label>
          Low-stock threshold *
          <input type="number" min="0" value={form.lowAt} onChange={(e) => set('lowAt', e.target.value)} placeholder="20" />
          {errors.lowAt ? <span className="field-error">{errors.lowAt}</span> : null}
        </label>
        <label className="span-2">
          Expiry date *
          <input type="date" value={form.expiry} onChange={(e) => set('expiry', e.target.value)} />
          {errors.expiry ? <span className="field-error">{errors.expiry}</span> : null}
        </label>
      </div>
      <div className="form-actions">
        <button type="button" className="ghost-btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="primary-btn">Log into ledger</button>
      </div>
    </form>
  );
}
