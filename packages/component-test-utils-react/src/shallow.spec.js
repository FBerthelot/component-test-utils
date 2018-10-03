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
        mock: {
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
  });
});
