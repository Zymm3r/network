import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { CourseLearn } from './pages/CourseLearn';
import { Lessons } from './pages/Lessons';
import { LessonDetail } from './pages/LessonDetail';
import { Paths } from './pages/Paths';
import { PathDetail } from './pages/PathDetail';
import { Resources } from './pages/Resources';
import { Profile } from './pages/Profile';
import { Auth } from './pages/Auth';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-32 text-center">
      <div className="text-6xl mb-4">🔌</div>
      <h1 className="text-slate-800 mb-2">หน้าไม่พบ</h1>
      <p className="text-slate-500 text-sm">ไม่พบหน้าที่คุณกำลังค้นหา</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/auth',
    Component: Auth,
  },
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Courses },
      { path: 'courses', Component: Courses },
      { path: 'courses/:courseId', Component: CourseDetail },
      { path: 'courses/:courseId/learn', Component: CourseLearn },
      { path: 'lessons', Component: Lessons },
      { path: 'lessons/:lessonId', Component: LessonDetail },
      { path: 'paths', Component: Paths },
      { path: 'paths/:pathId', Component: PathDetail },
      { path: 'resources', Component: Resources },
      { path: 'profile', Component: Profile },
      { path: '*', Component: NotFound },
    ],
  },
]);