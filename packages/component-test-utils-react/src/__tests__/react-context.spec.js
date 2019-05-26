const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react context', () => {
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
