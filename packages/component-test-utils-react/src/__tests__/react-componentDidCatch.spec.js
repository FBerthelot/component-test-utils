const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react componentDidCatch', () => {
  it('should call componentDidCatch with the error and some info', () => {
    let args;
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          hasError: false
        };
      }

      static getDerivedStateFromError() {
        return {hasError: true};
      }

      componentDidCatch(...a) {
        args = a;
      }

      render() {
        if (this.state.hasError) {
          return <div/>;
        }

        return this.props.children;
      }
    }

    const error = new Error('fetching...');
    const ComponentInError = () => {
      throw error;
    };

    shallow(
      <ErrorBoundary>
        <ComponentInError/>
      </ErrorBoundary>,
      {
        mocks: {ComponentInError}
      }
    );

    expect(args).toEqual([
      error,
      {
        componentStack:
          'Please give me idea on how generate componentStack from here'
      }
    ]);
  });
});
