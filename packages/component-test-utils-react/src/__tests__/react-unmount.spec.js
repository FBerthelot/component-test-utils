const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - react unmount', () => {
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
