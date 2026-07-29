import { RouterProvider } from 'react-router/dom';
import { router } from './routes';
import { I18nProvider } from './i18n';
import { AuthProvider } from './hooks/useAuth';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <I18nProvider>
          <RouterProvider router={router} />
        </I18nProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
