import React, { Component, ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  fallbackComponent: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Handle and cache the error
    this.setState({ hasError: true, error });
    // You can also log the error or send it to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackComponent;
    }

    return this.props.children;
  }
}

export default ErrorBoundary