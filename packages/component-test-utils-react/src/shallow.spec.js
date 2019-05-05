const {shallow} = require('./shallow');
const React = require('react');

describe('react shallow render', () => {
  describe('html', () => {
    it('it should render component with one div', () => {
      const Component = () => {
        return <div/>;
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe('<div/>');
    });

    it('it should render component with one h1 and a text children', () => {
      const Component = () => {
        return <h1>Hello test world</h1>;
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe('<h1>Hello test world</h1>');
    });

    it('it should render component with one button of type button', () => {
      const Component = () => {
        return <button type="button">0</button>;
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe('<button type="button">0</button>');
    });

    it('it should render component with props', () => {
      const Component = ({message}) => {
        return <h1>Hello {message}</h1>;
      };

      const cmp = shallow(<Component message="test world"/>);

      expect(cmp.html()).toBe('<h1>Hello test world</h1>');
    });

    it('it should render Component but should mock ChildComponent', () => {
      const ChildComponent = () => {
        return <button type="button">0</button>;
      };

      const Component = () => {
        return (
          <section id="post">
            <ChildComponent/>
          </section>
        );
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe('<section id="post"><ChildComponent/></section>');
    });

    it('it should render should mock ChildComponent but display his props', () => {
      const ChildComponent = () => {
        return <button type="button">0</button>;
      };

      const Component = () => {
        return (
          <section id="post">
            <ChildComponent nbLikes={0}/>
          </section>
        );
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe(
        '<section id="post"><ChildComponent nbLikes="0"/></section>'
      );
    });

    it('should display children of ChildComponent even if mocked', () => {
      const ChildComponent = () => {
        return <button type="button">0</button>;
      };

      const Component = () => {
        return (
          <section id="post">
            <ChildComponent>Youpii</ChildComponent>
          </section>
        );
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe(
        '<section id="post"><ChildComponent>Youpii</ChildComponent></section>'
      );
    });

    it('should display children of ChildComponent even if mocked', () => {
      const ChildComponent = () => {
        return <button type="button">0</button>;
      };

      const Component = () => {
        return (
          <section id="post">
            <ChildComponent>Youpii</ChildComponent>
          </section>
        );
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe(
        '<section id="post"><ChildComponent>Youpii</ChildComponent></section>'
      );
    });

    it('should not mock ChildComponent', () => {
      // eslint-disable-next-line react/prop-types
      const ChildComponent = ({nbLikes}) => {
        return <button type="button">{nbLikes}</button>;
      };

      const Component = () => {
        return (
          <section id="post">
            <ChildComponent nbLikes={0}/>
          </section>
        );
      };

      const cmp = shallow(<Component/>, {
        mocks: {
          ChildComponent
        }
      });

      expect(cmp.html()).toBe(
        '<section id="post"><ChildComponent nbLikes="0"><button type="button">0</button></ChildComponent></section>'
      );
    });

    it('should render component that use useState hooks', () => {
      const Component = () => {
        const [nbLikes] = React.useState(0);
        return <button type="button">{nbLikes}</button>;
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe('<button type="button">0</button>');
    });

    it('should render event with anonymous function handler', () => {
      const Component = () => {
        const [nbLikes, setNbLike] = React.useState(0);
        return (
          <button type="button" onClick={() => setNbLike(nbLikes + 1)}>
            {nbLikes}
          </button>
        );
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe(
        '<button type="button" onClick="[onClick]">0</button>'
      );
    });

    it('should render event with named handler', () => {
      const Component = () => {
        const [nbLikes, setNbLike] = React.useState(0);
        function clickHandler() {
          setNbLike(nbLikes + 1);
        }

        return (
          <button type="button" onClick={clickHandler}>
            {nbLikes}
          </button>
        );
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe(
        '<button type="button" onClick="[clickHandler]">0</button>'
      );
    });

    it('should render a class component', () => {
      class Component extends React.Component {
        render() {
          return <h1>Hello test world</h1>;
        }
      }

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe('<h1>Hello test world</h1>');
    });

    it('should render a component containing a class component', () => {
      class InnerComponent extends React.Component {
        render() {
          return <h1>Hello test world</h1>;
        }
      }

      const OuterComponent = () => (
        <div>
          <InnerComponent/>
        </div>
      );

      const cmp = shallow(<OuterComponent/>);

      expect(cmp.html()).toBe('<div><InnerComponent/></div>');
    });

    it('should render a class component that use a state', () => {
      class Component extends React.Component {
        constructor(props) {
          super(props);
          this.state = {nbLikes: 0};
        }

        render() {
          return <button type="button">{this.state.nbLikes}</button>;
        }
      }

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe('<button type="button">0</button>');
    });
  });

  describe('Event', () => {
    it('should also work with trigger allias', () => {
      const Component = () => {
        const [nbLikes, setNbLike] = React.useState(0);
        return (
          <button type="button" onClick={() => setNbLike(nbLikes + 1)}>
            {nbLikes}
          </button>
        );
      };

      const cmp = shallow(<Component/>);

      cmp.trigger('Click');

      expect(cmp.html()).toBe(
        '<button type="button" onClick="[onClick]">1</button>'
      );
    });

    it('should trigger click event on the button and update state', () => {
      const Component = () => {
        const [nbLikes, setNbLike] = React.useState(0);
        return (
          <button type="button" onClick={() => setNbLike(nbLikes + 1)}>
            {nbLikes}
          </button>
        );
      };

      const cmp = shallow(<Component/>);

      cmp.dispatchEvent('Click');

      expect(cmp.html()).toBe(
        '<button type="button" onClick="[onClick]">1</button>'
      );
    });

    it('should trigger click on a class component that use a setState object', () => {
      class Component extends React.Component {
        constructor(props) {
          super(props);
          this.state = {nbLikes: 0};
          this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
          this.setState({
            nbLikes: 42
          });
        }

        render() {
          return (
            <button type="button" onClick={this.handleClick}>
              {this.state.nbLikes}
            </button>
          );
        }
      }

      const cmp = shallow(<Component/>);
      cmp.dispatchEvent('Click');

      expect(cmp.html()).toBe(
        '<button type="button" onClick="[bound handleClick]">42</button>'
      );
    });

    it('should trigger click on a class component that use a setState function', () => {
      class Component extends React.Component {
        constructor(props) {
          super(props);
          this.state = {nbLikes: 0};
          this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
          this.setState(prevState => {
            return {
              nbLikes: prevState.nbLikes + 1
            };
          });
        }

        render() {
          return (
            <button type="button" onClick={this.handleClick}>
              {this.state.nbLikes}
            </button>
          );
        }
      }

      const cmp = shallow(<Component/>);

      cmp.dispatchEvent('Click');

      expect(cmp.html()).toBe(
        '<button type="button" onClick="[bound handleClick]">1</button>'
      );
    });

    it('should trigger click event and retrieve the good hook', () => {
      const Component = () => {
        const [nbPost, setNbPost] = React.useState(0);
        const [nbLikes, setNbLike] = React.useState(6);

        return (
          <button
            type="button"
            onClick={() => {
              setNbLike(nbLikes + 1);
              setNbPost(nbPost + 4);
            }}
          >
            {nbPost} - {nbLikes}
          </button>
        );
      };

      const cmp = shallow(<Component/>);

      cmp.dispatchEvent('Click');

      expect(cmp.html()).toBe(
        '<button type="button" onClick="[onClick]">4 - 7</button>'
      );
    });

    it('should work with a setState into a useEffect', () => {
      const Component = () => {
        const [nbPost, setNbPost] = React.useState(0);
        React.useEffect(() => setNbPost(1));

        return <div>{nbPost}</div>;
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe('<div>0</div>');
    });
  });

  describe('setProps', () => {
    it('should set single props', () => {
      const Component = ({nbPost, nbLikes}) => {
        return (
          <div>
            {nbPost} - {nbLikes}
          </div>
        );
      };

      const cmp = shallow(<Component nbPost={4} nbLikes={20}/>);

      expect(cmp.html()).toBe('<div>4 - 20</div>');

      cmp.setProps({
        nbPost: 42,
        nbLikes: 65
      });

      expect(cmp.html()).toBe('<div>42 - 65</div>');
    });

    it('should work with useEffect', () => {
      const effect = jest.fn();
      const effect2 = jest.fn();
      const Component = ({nbPost, nbLikes}) => {
        React.useEffect(effect);
        React.useEffect(effect2, [nbPost, nbLikes]);
        return (
          <div>
            {nbPost} - {nbLikes}
          </div>
        );
      };

      const cmp = shallow(<Component nbPost={4} nbLikes={20}/>);

      expect(effect).toHaveBeenCalledTimes(1);
      expect(effect2).toHaveBeenCalledTimes(1);

      cmp.setProps({
        nbPost: 4,
        nbLikes: 20
      });

      expect(effect).toHaveBeenCalledTimes(2);
      expect(effect2).toHaveBeenCalledTimes(1);

      cmp.setProps({
        nbPost: 42,
        nbLikes: 65
      });

      expect(effect).toHaveBeenCalledTimes(3);
      expect(effect2).toHaveBeenCalledTimes(2);
    });
  });

  describe('context', () => {
    it('should work with useContext hooks', () => {
      const ThemeContext = React.createContext('light');

      const ThemedButton = () => {
        const context = React.useContext(ThemeContext);
        return <div>{context}</div>;
      };

      const Toolbar = () => {
        return (
          <div>
            <ThemedButton/>
          </div>
        );
      };

      const App = () => {
        return (
          <ThemeContext.Provider value="dark">
            <Toolbar/>
          </ThemeContext.Provider>
        );
      };

      const cmp = shallow(<App/>, {
        mocks: {
          Toolbar,
          ThemedButton
        }
      });

      expect(cmp.html()).toBe(
        '<Symbol(react.provider) value="dark"><Toolbar><div><ThemedButton><div>dark</div></ThemedButton></div></Toolbar></Symbol(react.provider)>'
      );
    });

    it('should work with useContext hooks when using the defaut value', () => {
      const ThemeContext = React.createContext('light');

      const ThemedButton = () => {
        const context = React.useContext(ThemeContext);
        return <div>{context}</div>;
      };

      const Toolbar = () => {
        return (
          <div>
            <ThemedButton/>
          </div>
        );
      };

      const App = () => {
        return (
          <ThemeContext.Provider>
            <Toolbar/>
          </ThemeContext.Provider>
        );
      };

      const cmp = shallow(<App/>, {
        mocks: {
          Toolbar,
          ThemedButton
        }
      });

      expect(cmp.html()).toBe(
        '<Symbol(react.provider)><Toolbar><div><ThemedButton><div>light</div></ThemedButton></div></Toolbar></Symbol(react.provider)>'
      );
    });
  });

  describe('querySelector', () => {
    it('should work with the useReducer hooks', () => {
      const initialState = {count: 0};
      const reducer = (state, action) => {
        switch (action.type) {
          case 'increment':
            return {count: state.count + 1};
          case 'decrement':
          default:
            return {count: state.count - 1};
        }
      };

      const Counter = () => {
        const [state, dispatch] = React.useReducer(reducer, initialState);
        return (
          <>
            Total : {state.count}
            <button type="button" onClick={() => dispatch({type: 'increment'})}>
              +
            </button>
            <button
              id="desc"
              type="button"
              onClick={() => dispatch({type: 'decrement'})}
            >
              -
            </button>
          </>
        );
      };

      const cmp = shallow(<Counter/>);

      expect(cmp.html()).toBe(
        '<>Total : 0<button type="button" onClick="[onClick]">+</button><button id="desc" type="button" onClick="[onClick]">-</button></>'
      );

      // Add 1 to total
      cmp.querySelector('button').dispatchEvent('Click');

      expect(cmp.html()).toBe(
        '<>Total : 1<button type="button" onClick="[onClick]">+</button><button id="desc" type="button" onClick="[onClick]">-</button></>'
      );

      cmp.querySelector('#desc').dispatchEvent('Click');

      expect(cmp.html()).toBe(
        '<>Total : 0<button type="button" onClick="[onClick]">+</button><button id="desc" type="button" onClick="[onClick]">-</button></>'
      );
    });
  });

  describe('ref', () => {
    it('should not ignore fowardref HOC', () => {
      const FancyButton = React.forwardRef((props, ref) => (
        <button ref={ref} className="FancyButton" type="button">
          {props.children}
        </button>
      ));

      const cmp = shallow(<FancyButton>test</FancyButton>);

      expect(cmp.html()).toBe(
        '<button class="FancyButton" type="button">test</button>'
      );
    });

    it('should work with foward ref', () => {
      const ref = React.createRef();

      const FancyButton = React.forwardRef((props, ref) => {
        return (
          <button ref={ref} className="FancyButton" type="button">
            {props.children}
          </button>
        );
      });

      const App = () => {
        return <FancyButton ref={ref}>Click me!</FancyButton>;
      };

      const cmp = shallow(<App/>, {
        mocks: {FancyButton}
      });

      expect(cmp.html()).toBe(
        '<button class="FancyButton" type="button">Click me!</button>'
      );
      expect(ref).toBe(cmp._rendered.ref);
    });
  });

  describe('debug option', () => {
    beforeEach(() => {
      console.initialDebug = console.debug;
      console.debug = jest.fn();
    });
    afterEach(() => {
      console.debug = console.initialDebug;
      delete console.initialDebug;
    });

    it('should call console.debug', () => {
      const Component = () => {
        React.useDebugValue('need to be logged');
        return <div/>;
      };

      shallow(<Component/>, {
        debug: true
      });

      expect(console.debug).toHaveBeenCalled();
    });

    it('should not call console.debug by default', () => {
      const Component = () => {
        React.useDebugValue('need to be logged');
        return <div/>;
      };

      shallow(<Component/>);

      expect(console.debug).not.toHaveBeenCalled();
    });
  });

  describe('class lifecycle', () => {
    it('should call getDerivedStateFromProps function on mounting', () => {
      class Component extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            initialState: 42
          };
        }

        static getDerivedStateFromProps(props) {
          return {iAmDerivedFromAProps: props.value + 1};
        }

        render() {
          return (
            <div>
              {this.state.iAmDerivedFromAProps} + {this.state.initialState}
            </div>
          );
        }
      }

      const cmp = shallow(<Component value={1}/>);

      expect(cmp.html()).toBe('<div>2 + 42</div>');
    });

    it('should call component did mount after first render', () => {
      const orderTester = [];
      class Component extends React.Component {
        componentDidMount() {
          orderTester.push('componentDidMount');
        }

        render() {
          orderTester.push('render');
          return <div/>;
        }
      }

      shallow(<Component/>);

      expect(orderTester).toEqual(['render', 'componentDidMount']);
    });

    it('should call getDerivedStateFromProps before a changement of props', () => {
      class Component extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            initialState: 42
          };
        }

        static getDerivedStateFromProps(props) {
          return {iAmDerivedFromAProps: props.value + 1};
        }

        render() {
          return (
            <div>
              {this.state.iAmDerivedFromAProps} + {this.state.initialState}
            </div>
          );
        }
      }

      const cmp = shallow(<Component value={1}/>);

      cmp.setProps({value: 42});

      expect(cmp.html()).toBe('<div>43 + 42</div>');
    });

    it('should call getSnapshotBeforeUpdate afterEach render', () => {
      const orderTester = [];
      class Component extends React.Component {
        getSnapshotBeforeUpdate() {
          orderTester.push('getSnapshotBeforeUpdate');
        }

        render() {
          orderTester.push('render');
          return <div/>;
        }
      }

      const cmp = shallow(<Component/>);
      cmp.setProps({value: 42});

      expect(orderTester).toEqual([
        'render',
        'render',
        'getSnapshotBeforeUpdate'
      ]);
    });

    it('should call getSnapshotBeforeUpdate with prevProps and prevState', () => {
      let args;
      class Component extends React.Component {
        constructor(props) {
          super(props);
          this.state = {};
          this.handleClick = this.handleClick.bind(this);
        }

        getSnapshotBeforeUpdate(...a) {
          args = a;
        }

        handleClick() {
          this.setState({
            nextState: true
          });
        }

        render() {
          return (
            <div onClick={this.handleClick}>
              {this.props.value} {this.state.nextState}
            </div>
          );
        }
      }

      const cmp = shallow(<Component value={1}/>);

      cmp.setProps({value: 42});

      expect(args).toEqual([{value: 1}, {}]);

      cmp.dispatchEvent('Click');

      expect(args).toEqual([{value: 42}, {}]);
    });
  });

  describe('componentDidUpdate', () => {
    it('should call componentDidMount just after getSnapshotBeforeUpdate', () => {
      const orderTester = [];
      class Component extends React.Component {
        getSnapshotBeforeUpdate() {
          orderTester.push('getSnapshotBeforeUpdate');
        }

        componentDidUpdate() {
          orderTester.push('componentDidUpdate');
        }

        render() {
          orderTester.push('render');
          return <div/>;
        }
      }

      const cmp = shallow(<Component/>);
      cmp.setProps({value: 42});

      expect(orderTester).toEqual([
        'render',
        'render',
        'getSnapshotBeforeUpdate',
        'componentDidUpdate'
      ]);
    });

    it('should call getSnapshotBeforeUpdate with prevProps and prevState and result from snapshot', () => {
      let args;
      class Component extends React.Component {
        constructor(props) {
          super(props);
          this.state = {};
          this.handleClick = this.handleClick.bind(this);
        }

        getSnapshotBeforeUpdate() {
          return 69;
        }

        componentDidUpdate(...a) {
          args = a;
        }

        handleClick() {
          this.setState({
            nextState: true
          });
        }

        render() {
          return (
            <div onClick={this.handleClick}>
              {this.props.value} {this.state.nextState}
            </div>
          );
        }
      }

      const cmp = shallow(<Component value={1}/>);

      cmp.setProps({value: 42});

      expect(args).toEqual([{value: 1}, {}, 69]);

      cmp.dispatchEvent('Click');

      expect(args).toEqual([{value: 42}, {}, 69]);
    });
  });

  describe('shouldComponentUpdate', () => {
    it('should call shouldComponentUpdate before rendering', () => {
      const orderTester = [];
      class Component extends React.Component {
        shouldComponentUpdate() {
          orderTester.push('shouldComponentUpdate');
          return false;
        }

        render() {
          orderTester.push('render');
          return <div>{this.props.value}</div>;
        }
      }

      const cmp = shallow(<Component value={1}/>);

      cmp.setProps({value: 42});

      expect(orderTester).toEqual(['render', 'shouldComponentUpdate']);
    });

    it('should not rerender if shouldComponentUpdate return false', () => {
      class Component extends React.Component {
        shouldComponentUpdate() {
          return false;
        }

        render() {
          return <div>{this.props.value}</div>;
        }
      }

      const cmp = shallow(<Component value={1}/>);

      cmp.setProps({value: 42});

      expect(cmp.html()).toEqual('<div>1</div>');
    });

    it('should rerender if shouldComponentUpdate return true', () => {
      class Component extends React.Component {
        shouldComponentUpdate() {
          return true;
        }

        render() {
          return <div>{this.props.value}</div>;
        }
      }

      const cmp = shallow(<Component value={1}/>);

      cmp.setProps({value: 42});

      expect(cmp.html()).toEqual('<div>42</div>');
    });

    it('should give nextProps and nextState to shouldComponentUpdate method', () => {
      let args;
      class Component extends React.Component {
        constructor(props) {
          super(props);
          this.state = {};
          this.handleClick = this.handleClick.bind(this);
        }

        shouldComponentUpdate(...a) {
          args = a;
        }

        handleClick() {
          this.setState({
            nextState: true
          });
        }

        render() {
          return (
            <div onClick={this.handleClick}>
              {this.props.value} {this.state.nextState}
            </div>
          );
        }
      }

      const cmp = shallow(<Component value={1}/>);

      cmp.setProps({value: 42});

      expect(args).toEqual([{value: 42}, {}]);

      cmp.dispatchEvent('Click');

      expect(args).toEqual([{value: 42}, {nextState: true}]);
    });
  });

  describe('unmount', () => {
    it('should return error when try to get html of unmounted component', () => {
      const Component = () => <div/>;

      const cmp = shallow(<Component/>);

      cmp.unmount();

      expect(() => cmp.html()).toThrow('unmounted');
    });

    it('should return error when try to get setProps of unmounted component', () => {
      const Component = () => <div/>;

      const cmp = shallow(<Component/>);

      cmp.unmount();

      expect(() => cmp.setProps({})).toThrow('unmounted');
    });

    it('should return error when try to get dispatchEvent of unmounted component', () => {
      const Component = () => <div/>;

      const cmp = shallow(<Component/>);

      cmp.unmount();

      expect(() => cmp.dispatchEvent('click')).toThrow('unmounted');
    });

    it('should return error when try to get trigger of unmounted component', () => {
      const Component = () => <div/>;

      const cmp = shallow(<Component/>);

      cmp.unmount();

      expect(() => cmp.trigger('click')).toThrow('unmounted');
    });

    it('should return error when try to get querySelector of unmounted component', () => {
      const Component = () => <div/>;

      const cmp = shallow(<Component/>);

      cmp.unmount();

      expect(() => cmp.querySelector('div')).toThrow('unmounted');
    });

    it('should call componentWillUnmount() when component implement it', () => {
      const orderTester = [];
      class Component extends React.Component {
        render() {
          orderTester.push('render');
          return <div/>;
        }

        componentWillUnmount() {
          orderTester.push('componentWillUnmount');
        }
      }

      const cmp = shallow(<Component/>);

      cmp.unmount();

      expect(orderTester).toEqual(['render', 'componentWillUnmount']);
    });
  });

  describe('getDerivedStateFromError', () => {
    // TODO
  });
  describe('componentDidCatch', () => {
    // TODO
  });
  describe('forceUpdate', () => {});

  describe('displayName', () => {
    it('should ovewrite the name displayed by html method', () => {
      const hoc = Cmp => props => <Cmp {...props} hoc/>;
      const Decorated = () => <div/>;

      const ComponentDecorated = hoc(Decorated);

      ComponentDecorated.displayName = 'withHoc(Component)';

      const Component = () => <ComponentDecorated/>;

      const cmp = shallow(<Component/>, {
        mocks: {
          'withHoc(Component)': ComponentDecorated
        }
      });

      expect(cmp.html()).toBe(
        '<withHoc(Component)><Decorated hoc/></withHoc(Component)>'
      );
    });
  });

  describe('defaultProps', () => {
    it('should initialize component with default props', () => {
      const Component = ({value}) => <div>{value}</div>;

      Component.defaultProps = {
        value: 42
      };

      const cmp = shallow(<Component/>);

      expect(cmp.html()).toBe('<div>42</div>');
    });
  });
});
