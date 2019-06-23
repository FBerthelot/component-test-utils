const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - setProps', () => {
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

  it('should not override all props', () => {
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
      nbPost: 34
    });

    expect(cmp.html()).toBe('<div>34 - 20</div>');
  });
});
