import { MedicineProvider } from '../context/MedicineContext.jsx';
import { DashboardLayout } from '../layouts/DashboardLayout.jsx';

export function App() {
  return (
    <MedicineProvider>
      <DashboardLayout />
    </MedicineProvider>
  );
}
