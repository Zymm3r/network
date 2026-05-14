import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Packages } from './pages/Packages';
import { Schedules } from './pages/Schedules';
import { Activities } from './pages/Activities';
import { NearbyPlaces } from './pages/NearbyPlaces';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-32 text-center">
      <div className="text-5xl mb-4">🌊</div>
      <h1 className="text-slate-800 mb-2">Page not found</h1>
      <p className="text-slate-500 text-sm">This page doesn't exist in the staff portal.</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'packages', Component: Packages },
      { path: 'schedules', Component: Schedules },
      { path: 'activities', Component: Activities },
      { path: 'nearby', Component: NearbyPlaces },
      { path: '*', Component: NotFound },
    ],
  },
]);
