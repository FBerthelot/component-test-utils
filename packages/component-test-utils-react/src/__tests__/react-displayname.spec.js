const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react displayName', () => {
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
