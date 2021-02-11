import parser from '../../src/util/measure-parser.js';

describe('Testing Measure Parser', () => {

  test('parse with two arguments', () => {
    expect(parser(2, 'unit')).toEqual({ value: 2, unit: 'unit' });
    expect(parser('2', 'unit')).toEqual({ value: '2', unit: 'unit' });
  });

  test('parse with single argument', () => {
    expect(parser('2 unit')).toEqual({ value: '2', unit: 'unit' });
    expect(parser('2 unit', null)).toEqual({ value: '2', unit: 'unit' });
    expect(parser('2 unit', false)).toEqual({ value: '2', unit: 'unit' });
  });

  test('fail with invalid value', () => {
    [
      '2 unit', NaN, true, false, null, ''
    ].forEach(value => {
      expect(() => parser(value, 'unit')).toThrow();
    });
  });

  test('fail with invalid unit', () => {
    [
      NaN, true, false, null, ''
    ].forEach(unit => {
      expect(() => parser('2', unit)).toThrow();
      expect(() => parser(2, unit)).toThrow();
    });
  });

});
