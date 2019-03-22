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
  });

  describe('dispatchEvent', () => {
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
});
