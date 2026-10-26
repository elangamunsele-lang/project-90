import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-white p-6 text-center">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-navy-900">Something went wrong</h1>
          <p className="mt-2 text-navy-600">Please reload the page and try again.</p>
          <button className="btn-primary mt-5" onClick={() => window.location.reload()}>Reload</button>
        </div>
      </div>
    );
  }
}
