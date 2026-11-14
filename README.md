# Remedium Ledger — Pharmacy Stock & Expiry Tracker

A lightweight, client-side React application for tracking pharmacy inventory, monitoring medicine expiry dates, and managing stock levels with visual status indicators.

![Status](https://img.shields.io/badge/status-production-green)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-8-yellow)

---

## 📋 Overview

**Remedium Ledger** helps pharmacies and stockrooms keep track of:

- 💊 **Medicine inventory** — name, batch, strength, form, category, supplier, quantity
- ⏰ **Expiry monitoring** — color-coded status badges (Stable, Expiring Soon ≤30d, Critical ≤7d, Expired)
- ⚠️ **Low-stock alerts** — configurable per-medicine thresholds
- 🔍 **Search & filter** — by name, batch, supplier, category, or stock status
- 📊 **Dashboard stats** — total units, low stock count, expired/expiring counts
- 💾 **Local storage** — data persists in the browser (no backend required)

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **Add Medicine** | Log new batches with full details via a validated form |
| **Adjust Stock** | Dispense (−1) or restock (+1) individual items |
| **Remove** | Delete medicines from the ledger |
| **Expiry Watch Rail** | Sidebar highlighting urgent/expired items sorted by days remaining |
| **Filter & Sort** | Filter by status (all/low/expiring/expired) and category; sort by expiry, qty, or name |
| **Search** | Full-text search across name, batch, supplier, category, and strength |
| **Seed Data** | Comes pre-loaded with 10 sample medicines for demo/testing |
| **Reset** | Restore original seed data at any time |

---

## 🛠️ Tech Stack

- **React 19** — UI library
- **Vite 8** — Build tool & dev server
- **JavaScript (ES modules)** — No build-step TypeScript
- **LocalStorage** — Client-side persistence
- **CSS** — Plain CSS with CSS custom properties (tokens)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/khokanb126-cell/Pharmacy_stock_tracker.git

# Navigate into the project
cd Pharmacy_stock_tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run oxlint |

---

## 🏗️ Project Structure

```
pharmacy-stock-tracker/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── main.jsx              # Entry point
│   ├── App.jsx               # Re-exports app/App.jsx
│   ├── app/
│   │   └── App.jsx           # Root component with MedicineProvider
│   ├── index.css
│   ├── config/
│   │   └── app.js            # App config (categories, limits, storage key)
│   ├── constants/
│   │   └── medicines.js      # Seed medicine data (10 items)
│   ├── context/
│   │   └── MedicineContext.jsx
│   ├── hooks/
│   │   ├── useMedicines.js   # CRUD + localStorage hook
│   │   └── useLocalStorage.js
│   ├── services/
│   │   └── medicineService.js# classifyMedicine, computeStats, filter, sort, validate
│   ├── utils/
│   │   ├── dates.js          # Expiry date calculations & formatting
│   │   └── format.js         # Quantity formatting, slug IDs
│   ├── components/
│   │   ├── features/
│   │   │   ├── AddMedicineForm.jsx
│   │   │   ├── MedicineTable.jsx
│   │   │   ├── ExpiryRail.jsx
│   │   │   └── Toolbar.jsx
│   │   └── ui/
│   │       ├── Badge.jsx
│   │       ├── EmptyState.jsx
│   │       ├── Modal.jsx
│   │       └── StatCard.jsx
│   ├── layouts/
│   │   ├── DashboardLayout.jsx
│   │   └── Sidebar.jsx
│   └── styles/
│       └── tokens.css        # CSS custom properties
└── README.md
```

---

## 📊 Medicine Data Model

Each medicine record contains:

```json
{
  "id": "m-amox-500",
  "name": "Amoxicillin",
  "strength": "500mg",
  "form": "Capsule",
  "category": "Antibiotic",
  "batch": "AX-24-118",
  "qty": 14,
  "lowAt": 25,
  "expiry": "2026-10-05",
  "supplier": "Northgate Labs"
}
```

### Status Classification

| Status | Condition | Badge |
|--------|-----------|-------|
| Expired | Days remaining < 0 | 🔴 Danger |
| Critical | ≤ 7 days remaining | 🔴 Danger |
| Expiring Soon | ≤ 30 days remaining | 🟡 Warning |
| Stable | > 30 days remaining | 🟢 OK |
| Low Stock | Qty ≤ lowAt threshold | 🔵 Low |

---

## 🔧 Configuration

Edit `src/config/app.js` to customize behavior:

```js
export const APP_CONFIG = {
  name: 'Remedium Ledger',
  tagline: 'Pharmacy stock & expiry control',
  lowStockDefault: 20,
  expirySoonDays: 30,
  expiryCriticalDays: 7,
  storageKey: 'remedium-ledger-v1',
};
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is private and maintained by **khokanb126-cell**.

---

## 👤 Author

**khokanb126-cell**  
GitHub: https://github.com/khokanb126-cell  
Repository: https://github.com/khokanb126-cell/Pharmacy_stock_tracker.git