import { createBrowserRouter, useParams, Link } from 'react-router';
import { Unplug } from 'lucide-react';
import { useI18n } from './i18n';
import { AppLayout } from './components/layout/AppLayout';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { CourseLearn } from './pages/CourseLearn';
import { Lessons } from './pages/Lessons';
import { ChapterCatalog } from './pages/ChapterCatalog';
import { LessonDetail } from './pages/LessonDetail';
import { Paths } from './pages/Paths';
import { PathDetail } from './pages/PathDetail';
import { Resources } from './pages/Resources';
import { EquipmentPage } from '../features/equipment/pages/EquipmentPage';
import { EquipmentDetailPage } from '../features/equipment/pages/EquipmentDetailPage';
import { Profile } from './pages/Profile';
import { Dashboard } from './pages/Dashboard';
import { Auth } from './pages/Auth';
import { AuthCallback } from './pages/AuthCallback';

function NotFound() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center justify-center h-full py-32 text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 text-slate-400 border-8 border-slate-50/50">
        <Unplug size={32} />
      </div>
      <h1 className="text-xl font-bold text-slate-800 mb-2">{t.common?.error || 'Page Not Found'}</h1>
      <p className="text-slate-500 text-sm mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200/50">
        Return Home
      </Link>
    </div>
  );
}

function TestDb() {
  return <EquipmentDetailPage />;
}

export const router = createBrowserRouter([
  {
    path: '/auth',
    Component: Auth,
  },
  {
    path: '/auth/callback',
    Component: AuthCallback,
  },
  {
    path: '/test-db/:slug',
    Component: TestDb,
  },
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Courses },
      { path: 'courses', Component: Courses },
      { path: 'courses/:courseId', Component: CourseDetail },
      { path: 'courses/:courseId/learn', Component: CourseLearn },
      { path: 'lessons', Component: ChapterCatalog },
      { path: 'practice', Component: Lessons },
      { path: 'lessons/:lessonId', Component: LessonDetail },
      { path: 'paths', Component: Paths },
      { path: 'paths/:pathId', Component: PathDetail },
      { path: 'resources', Component: Resources },
      { path: 'equipment', Component: EquipmentPage },
      { path: 'equipment/:slug', Component: EquipmentDetailPage },
      { path: 'profile', Component: Profile },
      { path: 'dashboard', Component: Dashboard },
      { path: '*', Component: NotFound },
    ],
  },
]);
