import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error);
    console.error('[ErrorBoundary] Component stack:', info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="text-5xl">⚠️</div>
            <div className="space-y-2">
              <h1 className="text-xl font-semibold text-slate-800">
                เกิดข้อผิดพลาด
              </h1>
              <p className="text-sm text-slate-500">
                แอปพลิเคชันเกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
              </p>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <pre className="text-left text-xs bg-red-50 border border-red-200 rounded-lg p-4 overflow-auto max-h-48 text-red-700">
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack}
              </pre>
            )}

            <div className="flex flex-col gap-2">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                ลองใหม่
              </button>
              <button
                onClick={() => {
                  this.handleReset();
                  window.location.href = '/';
                }}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors text-sm"
              >
                กลับหน้าหลัก
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
