const {shallow, ComponentWrapper} = require('./shallow');
const Vue = require('vue/dist/vue');

const HelloWorld = Vue.component('hello-world', {
  template: '<h1>Hello test world</h1>'
});

describe('shallow vue', () => {
  it('should return a wrapper', () => {
    expect(shallow(HelloWorld) instanceof ComponentWrapper).toBe(true);
  });

  it('should have a view method that return the html string', () => {
    expect(shallow(HelloWorld).view()).toEqual('<h1>Hello test world</h1>');
  });

  it('should not display sub component hello world', () => {
    /* Const HelloAppWorld = Vue.component('hello-app-world', {
      template: `
      <div>
        <hello-world />
        you are beautiful
      </div>
      `,
      components: {
        HelloWorld
      }
    });
    expect(shallow(HelloAppWorld).view()).toEqual(`<div><hello-world />
        you are beautiful
      </div>`); */
  });
});
