"use client";

import { Component, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="p-8 text-center">
            <h2 className="font-semibold text-lg">Something went wrong</h2>
            <p className="text-sm text-slate-500 mt-2">
              Please refresh the page or try again.
            </p>
            <Button
              className="mt-4"
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </Button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
