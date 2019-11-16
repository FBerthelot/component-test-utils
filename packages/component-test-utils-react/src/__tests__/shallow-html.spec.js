const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - html', () => {
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

  it('should render component that with HOC and with mock', () => {
    const Child = ({className}) => {
      return <button type="button" className={className}>0 Like</button>;
    };

    const withStyle = Component => () => {
      return <Component className="class-for-button"/>;
    };

    const Component = withStyle(Child);

    const cmp = shallow(<Component/>, {mocks: {Child: true}});

    expect(cmp.html()).toBe(
      '<Child class="class-for-button"><button type="button" class="class-for-button">0 Like</button></Child>'
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

  it('should render childrens with custom element', () => {
    const ChildComponent1 = () => (<button type="button">0</button>);
    const ChildComponent2 = () => (<button type="button">1</button>);
    const ChildComponent3 = () => (<button type="button">3</button>);

    const Component = ({children}) => {
      return (
        <section id="post">
          <div>
            <span>yolo</span>
            {children}
          </div>
        </section>
      );
    };

    const cmp = shallow(
      <Component>
        <div>Test</div>
        <ChildComponent1/>
        <ChildComponent2/>
        <ChildComponent3/>
      </Component>
    );

    expect(cmp.html()).toBe(
      '<section id="post"><div><span>yolo</span><div>Test</div><ChildComponent1/><ChildComponent2/><ChildComponent3/></div></section>'
    );
  });
});
