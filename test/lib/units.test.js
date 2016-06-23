'use strict';


describe('Testing Units', function () {

  const units = require('../../lib/units');

  const customType = {
    name: 'custom',
    conversion: {
      params: {
        test: 'strange'
      },
      converters: [
        function test(test) { return 1; }
      ]
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

  before('should register', function () {
    units.types.should.be.empty();

    units.registerType('custom', customType);
    units.registerType('strange', strangeType);

    units.types.should.not.be.empty().and.deepEqual(['custom', 'strange']);
  });

  it('should return all available units', function () {
    units.available('custom').sort().should.deepEqual(customUnits);
    units.available('strange').sort().should.deepEqual(strangeUnits);
    units.available().sort().should.deepEqual(allUnits);
  });

  it('should throw when trying to get invalid type', function () {
    (function () { units.getType('missingType'); }).should.throw(/Invalid unit type/);
  });

  it('should find the type from the unit', function () {
    units.getUnitTypeName('foo').should.equal('strange');
    (units.getUnitTypeName('something') === undefined).should.be.true;
  });

  it('should convert to base', function () {
    for (let i = 0; i < 1000; ++i) {
      let v = Math.random() * i;
      units.getType('strange').calcBase(v, 'foo').should.equal(v);
      units.getType('strange').calc(v, 'foo', 'foo').should.equal(v);
    }
  });

  it('should convert bases', function () {
    units.getType('strange').calc(1, 'foo', 'bar').should.equal(0.5);
    units.getType('strange').calc(1, 'bar', 'foo').should.equal(2);
  });

  it('should use conversion functions', function () {
    units.getType('strange').calc(1, 'foo', 'buz').should.equal(30);
    units.getType('strange').calc(-1, 'foo', 'buz').should.equal(32);
    units.getType('strange').calc(47, 'foo', 'buz').should.equal(-16);
    units.getType('strange').calc(-47, 'foo', 'buz').should.equal(78);

    units.getType('strange').calc(30, 'buz', 'foo').should.equal(1);
    units.getType('strange').calc(32, 'buz', 'foo').should.equal(-1);
    units.getType('strange').calc(-16, 'buz', 'foo').should.equal(47);
    units.getType('strange').calc(78, 'buz', 'foo').should.equal(-47);
  });

  it('should test compatibility', function () {
    units.getType('strange').canConvert('custom').should.be.false;
    units.getType('custom').canConvert('strange').should.be.true;
  })

  after('should unregister', function () {
    units.unregisterType('custom');
    units.unregisterType('strange');

    units.types.should.be.empty();
  });

});
