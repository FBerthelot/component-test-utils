const {shallow} = require('../shallow');
const React = require('react');

describe('shallow - event', () => {
  const ComponentParent = ({product, onProductAddedToBasket}) => {
    return (
      <button type="button" onClick={() => onProductAddedToBasket(product)}/>
    );
  };

  it('it should call productAddedToBasket event', () => {
    const productAddedToBasketSpy = jest.fn();
    const product = {price: 20};
    const cmp = shallow(<ComponentParent product={product}/>, {
      events: {
        productAddedToBasket: productAddedToBasketSpy
      }
    });

    expect(productAddedToBasketSpy).not.toHaveBeenCalled();

    cmp.dispatchEvent('click');

    expect(productAddedToBasketSpy).toHaveBeenCalledWith(product);
  });
});
