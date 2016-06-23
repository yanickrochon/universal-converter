'use strict';


describe('Testing Units', function () {

  const units = require('../../lib/units');


  describe('Registering types', function () {
    const customType = {
      name: 'custom',
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
        'bar': 2
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
    })

    after('should unregister', function () {
      units.unregisterType('custom');
      units.unregisterType('strange');

      units.types.should.be.empty();
    });
  });


});
