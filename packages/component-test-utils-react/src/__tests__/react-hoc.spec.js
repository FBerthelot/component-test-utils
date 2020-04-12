const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react hoc', () => {
  it('should display the hoc displayName', () => {
    const withHoC = Cmp => props => {
      return <Cmp {...props}/>;
    };

    const Component = () => <div>2</div>;
    const Container = withHoC(Component);

    const cmp = shallow(<Container/>);

    expect(cmp.html()).toBe('<Component/>');
  });

  it('should display the component displayName', () => {
    const withHoC = Cmp => props => {
      return <Cmp {...props}/>;
    };

    const Component = () => <div>2</div>;
    Component.displayName = 'Toto';
    const Container = withHoC(Component);

    const cmp = shallow(<Container/>);

    expect(cmp.html()).toBe('<Toto/>');
  });

  it('should display a default warning when wrapping a unnamed component', () => {
    const withHoC = Cmp => props => {
      return <Cmp {...props}/>;
    };

    const Container = withHoC(() => <div>2</div>);

    const cmp = shallow(<Container/>);

    expect(cmp.html()).toBe('<UnnamedComponentPleaseNameIt/>');
  });

  it('should display the container displayName', () => {
    function withHoC(Cmp) {
      const NewCmp = props => (
        <Cmp {...props}/>
      );

      NewCmp.displayName = `withHoC(${Cmp.displayName || Component.name})`;
      return NewCmp;
    }

    const Component = () => <div>2</div>;
    const Container = withHoC(Component);
    Container.displayName = 'ContainerDisplayName';
    const SuperContainer = withHoC(Container);

    const cmp = shallow(<SuperContainer/>);

    expect(cmp.html()).toBe('<ContainerDisplayName/>');
  });

  it('should display the hoc displayName', () => {
    function withHoC(Cmp) {
      const NewCmp = props => (
        <Cmp {...props}/>
      );

      NewCmp.displayName = `withHoC(${Cmp.displayName || Component.name})`;
      return NewCmp;
    }

    const Component = () => <div>2</div>;
    const Container = withHoC(Component);
    const SuperContainer = withHoC(Container);

    const cmp = shallow(<SuperContainer/>);

    expect(cmp.html()).toBe('<withHoC(Component)/>');
  });

  it('should be able to render named hoc component', () => {
    function withHoC(Cmp) {
      const NewCmp = props => (
        <Cmp {...props}/>
      );

      NewCmp.displayName = `withHoC(${Cmp.displayName || Component.name})`;
      return NewCmp;
    }

    const Component = () => <div>2</div>;
    const Container = withHoC(Component);
    const SuperContainer = withHoC(Container);

    const cmp = shallow(<SuperContainer/>, {mocks: {
      'withHoC(Component)': true
    }});

    expect(cmp.html()).toBe('<withHoC(Component)><Component/></withHoC(Component)>');
  });

  it('should be able to render named container', () => {
    function withHoC(Cmp) {
      const NewCmp = props => (
        <Cmp {...props}/>
      );

      NewCmp.displayName = `withHoC(${Cmp.displayName || Component.name})`;
      return NewCmp;
    }

    const Component = () => <div>2</div>;
    const Container = withHoC(Component);
    Container.displayName = 'Toto';
    const SuperContainer = withHoC(Container);

    const cmp = shallow(<SuperContainer/>, {mocks: {
      Toto: true
    }});

    expect(cmp.html()).toBe('<Toto><Component/></Toto>');
  });

  it('should be able to render unnamed hoc component', () => {
    const withHoC = Cmp => props => <Cmp {...props}/>;

    const Component = () => <div>2</div>;
    const Container = withHoC(Component);
    const SuperContainer = withHoC(Container);

    const cmp = shallow(<SuperContainer/>, {mocks: {
      UnnamedComponentPleaseNameIt: true
    }});

    expect(cmp.html()).toBe('<UnnamedComponentPleaseNameIt><Component/></UnnamedComponentPleaseNameIt>');
  });
});
