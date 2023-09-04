var assert = require('assert');
const exp = require('constants');
var add = require('./test_functions/function').add

describe('Function Test IndexOf', function () {
  describe('#indexOf()', function () {
    it('should return 4 when the value is present', function () {
      assert.equal([1, 2, 3, 4, 5].indexOf(5), 4);
    });
  });
});

describe('Function Test add', function () {
  describe('#add()', function () {
    it('should return 2 when adding 1 and 1', function () {      
      var answer = add(1,1);
      const expected = 2;
      // Assertion technique
      assert.equal(answer, expected);
    });
  });
});

describe('Function Test add', function () {
  describe('#add()', function () {
    it('should return null when adding "a" and "b"', function () {      
      var answer = add("a","b");
      const expected = null;
      // Assertion technique
      assert.equal(answer, expected);
    });
  });
});