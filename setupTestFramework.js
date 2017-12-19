// http://bit.ly/2jomLAa

/* eslint-disable import/no-extraneous-dependencies */
const chai = require('chai');
// chai.use( require( 'chai-shallow-deep-equal' ) );
// chai.use( require( 'chai-as-promised' ) );

// Make sure chai and jasmine ".not" play nice together
const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get;
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot);
    return originalNot.apply(this);
  },
  set(newNot) {
    this.assignedNot = newNot;
    return newNot;
  },
});

// Combine both jest and chai matchers on expect
const originalExpect = global.expect;

global.expect = (actual) => {
  const originalMatchers = originalExpect(actual);
  const chaiMatchers = chai.expect(actual);
  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers);
  return combinedMatchers;
};
// http://bit.ly/2joftwy
Object.keys(originalExpect).forEach((key) => {
  global.expect[key] = originalExpect[key];
});
