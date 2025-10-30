import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    // Log error to console in development
    if ((import.meta as any).env?.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;

      return (
        <div className='min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4'>
          <div className='max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8'>
            {/* Error Icon */}
            <div className='flex justify-center mb-6'>
              <div className='w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center'>
                <svg
                  className='w-8 h-8 text-red-600 dark:text-red-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-label='Error icon'
                >
                  <title>Error</title>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
            </div>

            {/* Error Message */}
            <div className='text-center mb-6'>
              <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                Something went wrong
              </h1>
              <p className='text-gray-600 dark:text-gray-400'>
                We encountered an unexpected error. Don't worry, your data is
                safe.
              </p>
            </div>

            {/* Error Details */}
            {error && (
              <div className='mb-6'>
                <details className='bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700'>
                  <summary className='cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-2'>
                    Error Details
                  </summary>
                  <div className='mt-2 text-sm'>
                    <p className='font-mono text-red-600 dark:text-red-400 break-words mb-2'>
                      {error.toString()}
                    </p>
                    {errorInfo?.componentStack && (
                      <pre className='text-xs text-gray-600 dark:text-gray-400 overflow-x-auto mt-2'>
                        {errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              </div>
            )}

            {/* Actions */}
            <div className='flex gap-4 justify-center'>
              <button
                type='button'
                onClick={this.handleReset}
                className='px-6 py-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-medium rounded-lg transition-colors duration-200'
              >
                Try Again
              </button>
              <button
                type='button'
                onClick={() => window.location.reload()}
                className='px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors duration-200'
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
