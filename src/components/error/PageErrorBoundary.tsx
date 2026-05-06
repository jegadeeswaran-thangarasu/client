import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { logger } from '@/lib/logger';

interface Props {
  children: ReactNode;
  pageName?: string;
}

interface State {
  hasError: boolean;
  resetKey: number;
}

export default class PageErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, resetKey: 0 };

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    const page = this.props.pageName ?? 'unknown';
    logger.error(`Render error in page: ${page}`, {
      message: error.message,
      stack: error.stack ?? undefined,
      componentStack: info.componentStack ?? undefined,
    });
  }

  handleReset = (): void => {
    this.setState((prev) => ({ hasError: false, resetKey: prev.resetKey + 1 }));
  };

  render() {
    if (this.state.hasError) {
      const page = this.props.pageName ? `"${this.props.pageName}"` : 'This page';
      return (
        <div className="rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold text-red-800">
            {page} encountered an error.
          </p>
          <p className="mt-1 text-xs text-red-600">
            The issue has been logged. You can try again or reload the page.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="mt-4 inline-flex items-center rounded-md border border-red-300 bg-white px-4 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            Try Again
          </button>
        </div>
      );
    }

    return (
      <div key={this.state.resetKey}>{this.props.children}</div>
    );
  }
}
