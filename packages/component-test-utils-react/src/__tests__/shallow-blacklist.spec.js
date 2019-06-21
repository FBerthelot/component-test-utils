const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - blackList', () => {
  const ChildrenComponent2 = () => {
    return 'yolooo';
  };

  const ChildrenComponent = () => {
    return (
      <div>
        <ChildrenComponent2/>
      </div>
    );
  };

  const ComponentParent = () => {
    return (
      <div>
        <ChildrenComponent/>
      </div>
    );
  };

  it('it should not mock anything', () => {
    const cmp = shallow(<ComponentParent/>, {
      blackList: true
    });

    expect(cmp.html()).toBe('<div><ChildrenComponent><div><ChildrenComponent2>yolooo</ChildrenComponent2></div></ChildrenComponent></div>');
  });

  it('it should only mock ChildrenComponent2', () => {
    const cmp = shallow(<ComponentParent/>, {
      mocks: {
        ChildrenComponent2: false
      },
      blackList: true
    });

    expect(cmp.html()).toBe('<div><ChildrenComponent><div><ChildrenComponent2/></div></ChildrenComponent></div>');
  });
});
