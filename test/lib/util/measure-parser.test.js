
describe('Testing Measure Parser', function () {

  const parser = require('../../../lib/util/measure-parser');

  it('should parse with two arguments', function () {
    parser(2, 'unit').should.deepEqual({ value: 2, unit: 'unit' });
    parser('2', 'unit').should.deepEqual({ value: '2', unit: 'unit' });
  });

  it('should parse with single argument', function () {
    parser('2 unit').should.deepEqual({ value: '2', unit: 'unit' });
    parser('2 unit', null).should.deepEqual({ value: '2', unit: 'unit' });
    parser('2 unit', false).should.deepEqual({ value: '2', unit: 'unit' });
  });

  it('should fail with invalid value', function () {
    [
      '2 unit', NaN, true, false, null, ''
    ].forEach(value => {
      (function () { parser(value, 'unit'); }).should.throw();
    });
  });

  it('should fail with invalid unit', function () {
    [
      NaN, true, false, null, ''
    ].forEach(unit => {
      (function () { parser('2', unit); }).should.throw();
      (function () { parser(2, unit); }).should.throw();
    });
  });
  
});
