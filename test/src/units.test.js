'use strict';

describe('Testing Units', () => {

  const Units = require('../../src/units');

  const customType = {
    name: 'custom',
    conversion: {
      params: {
        test: 'strange'
      },
      converters: {
        identity(test) { return 1; }
      }
    },
    base: 'unit',
    units: {
      'micro unit': 0.001,
      'unit': 1,
      'mega unit': 1000
    }
  };
  const strangeType = {
    name: 'strange',
    base: 'foo',
    aliases: {
      'f': 'foo',
      'b': 'bar'
    },
    units: {
      'foo': 1,
      'bar': 2,
      'buz': {
        fromBase(v) { return 31 - v; },
        toBase(v) { return -v + 31; }
      }
    }
  };
  const customUnits = Object.keys(customType.units).sort();
  const strangeUnits = Object.keys(strangeType.units).concat(Object.keys(strangeType.aliases)).sort();
  const allUnits = customUnits.concat(strangeUnits).sort();

  beforeEach(() => {
    expect(Units.types).toEqual([]);

    Units.registerType('custom', customType);
    Units.registerType('strange', strangeType);

    expect(Units.types).toEqual(['custom', 'strange']);
  });

  afterEach(() => {
    Units.unregisterType('custom');
    Units.unregisterType('strange');

    expect(Units.types).toEqual([]);
  });

  test('return all available units', () => {
    expect(Units.available('custom').sort()).toEqual(customUnits);
    expect(Units.available('strange').sort()).toEqual(strangeUnits);
    expect(Units.available().sort()).toEqual(allUnits);
  });

  test('throw when trying to get invalid type', () => {
    expect(() => Units.getType('missingType')).toThrow(/Invalid unit type/);
  });

  test('find the type from the unit', () => {
    expect(Units.getUnitTypeName('foo')).toBe('strange');
    expect(Units.getUnitTypeName('something')).toBeUndefined();
  });

  test('convert to base', () => {
    for (let i = 0; i < 1000; ++i) {
      let v = Math.random() * i;
      expect(Units.getType('strange').calcBase(v, 'foo')).toBe(v);
      expect(Units.getType('strange').calc(v, 'foo', 'foo')).toBe(v);
    }
  });

  test('convert bases', () => {
    expect(Units.getType('strange').calc(1, 'foo', 'bar')).toBe(0.5);
    expect(Units.getType('strange').calc(1, 'bar', 'foo')).toBe(2);
  });

  test('use conversion functions', () => {
    expect(Units.getType('strange').calc(1, 'foo', 'buz')).toBe(30);
    expect(Units.getType('strange').calc(-1, 'foo', 'buz')).toBe(32);
    expect(Units.getType('strange').calc(47, 'foo', 'buz')).toBe(-16);
    expect(Units.getType('strange').calc(-47, 'foo', 'buz')).toBe(78);

    expect(Units.getType('strange').calc(30, 'buz', 'foo')).toBe(1);
    expect(Units.getType('strange').calc(32, 'buz', 'foo')).toBe(-1);
    expect(Units.getType('strange').calc(-16, 'buz', 'foo')).toBe(47);
    expect(Units.getType('strange').calc(78, 'buz', 'foo')).toBe(-47);
  });

  test('test compatibility', () => {
    expect(Units.getType('strange').canConvert('custom')).toBe(false);
    expect(Units.getType('custom').canConvert('strange')).toBe(true);
  })

  test('conversion', () => {
    expect(Units.getType('custom').convert('identity')).toBe(1);
  });

});
