import Units from '../src/units.js';

describe('Testing Units', () => {

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

    Units.register(customType);
    Units.register(strangeType);

    expect(Units.types).toEqual(['custom', 'strange']);
  });

  afterEach(() => {
    Units.unregister('custom');
    Units.unregister('strange');

    expect(Units.types).toEqual([]);
  });

  test('return all available units', () => {
    expect(Units.available('custom').sort()).toEqual(customUnits);
    expect(Units.available('strange').sort()).toEqual(strangeUnits);
    expect(Units.available().sort()).toEqual(allUnits);
  });

  test('throw when invalid type name', () => {
    expect(() => Units.available('phoneyUnitType')).toThrow('Invalid unit type name');
  });

  test('throw when trying to get invalid type', () => {
    expect(() => Units.get('missingType')).toThrow(/Invalid unit type/);
  });

  test('find the type from the unit', () => {
    expect(Units.getUnitTypeName('foo')).toBe('strange');
    expect(Units.getUnitTypeName('something')).toBeUndefined();
  });

  test('convert to base', () => {
    for (let i = 0; i < 1000; ++i) {
      let v = Math.random() * i;
      expect(Units.get('strange').calcBase(v, 'foo')).toBe(v);
      expect(Units.get('strange').calc(v, 'foo', 'foo')).toBe(v);
    }
  });

  test('convert bases', () => {
    expect(Units.get('strange').calc(1, 'foo', 'bar')).toBe(0.5);
    expect(Units.get('strange').calc(1, 'bar', 'foo')).toBe(2);
  });

  test('use conversion functions', () => {
    expect(Units.get('strange').calc(1, 'foo', 'buz')).toBe(30);
    expect(Units.get('strange').calc(-1, 'foo', 'buz')).toBe(32);
    expect(Units.get('strange').calc(47, 'foo', 'buz')).toBe(-16);
    expect(Units.get('strange').calc(-47, 'foo', 'buz')).toBe(78);

    expect(Units.get('strange').calc(30, 'buz', 'foo')).toBe(1);
    expect(Units.get('strange').calc(32, 'buz', 'foo')).toBe(-1);
    expect(Units.get('strange').calc(-16, 'buz', 'foo')).toBe(47);
    expect(Units.get('strange').calc(78, 'buz', 'foo')).toBe(-47);
  });

  test('test compatibility', () => {
    expect(Units.get('strange').canConvert('custom')).toBe(false);
    expect(Units.get('custom').canConvert('strange')).toBe(true);
  })

  test('conversion', () => {
    expect(Units.get('custom').convert('identity')).toBe(1);
  });

});
