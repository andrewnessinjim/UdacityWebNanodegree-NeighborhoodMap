import React, { Component } from 'react';
import ErrorPanel, { ERROR_MESSAGES } from './ErrorPanel';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPanel message={ERROR_MESSAGES.NETWORK_ERROR_MESSAGE} />
    }

    return this.props.children;
  }
}

export default ErrorBoundary;