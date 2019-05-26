const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react getDerivedStateFromError', () => {
  it('should call getDerivedStateFromError when error occur', () => {
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = {error: null};
      }

      static getDerivedStateFromError(e) {
        return {error: e.message};
      }

      render() {
        if (this.state.error) {
          return <h1>{this.state.error}</h1>;
        }

        return this.props.children;
      }
    }
    const ComponentInError = () => {
      throw new Error('fetching...');
    };

    const cmp = shallow(
      <ErrorBoundary>
        <ComponentInError/>
      </ErrorBoundary>,
      {
        mocks: {ComponentInError}
      }
    );

    expect(cmp.html()).toBe('<h1>fetching...</h1>');
  });

  it('should throw error if getDerivedStateFromError is not implemented', () => {
    class ErrorBoundary extends React.Component {
      componentDidCatch() {}

      render() {
        return this.props.children;
      }
    }

    const error = new Error('fetching...');
    const ComponentInError = () => {
      throw error;
    };

    expect(() =>
      shallow(
        <ErrorBoundary>
          <ComponentInError/>
        </ErrorBoundary>,
        {
          mocks: {ComponentInError}
        }
      )
    ).toThrow('fetching...');
  });
});
