'use strict';

describe('Testing Converter', function () {

  const Converter = require('../../lib/converter');
  const Units = require('../../lib/units');

  before(function () {
    Units.registerType('distance', {
      name: 'distance',
      converters: [
        {
          params: ['area'],
          convert: function (a) {
            return Math.sqrt(a);
          }
        },
        {
          params: ['area', 'distance'],
          convert: function (a, b) {
            return a / b;
          }
        }
      ],
      base: 'meter',
      aliases: {
        'in': 'inch [international, U.S.]',
        'ft': 'feet [international, U.S.]',
        'yd': 'yard',
        'm': 'meter',
        'km': 'kilometer',
        'inch': 'inch [international, U.S.]',
        'feet': 'feet [international, U.S.]',
        'mile': 'mile [international]'
      },
      units: {
        'feet [international, U.S.]': 0.3048,
        'inch [international, U.S.]': 0.3048 / 12,
        'kilometer': 1000,
        'meter': 1,
        'mile [international]': 1609.344,
        'yard': 0.9144
      }
    });
    Units.registerType('area', {
      name: 'area',
      converters: [
        {
          params: ['distance'],
          convert: function (a) {
            return a * a;
          }
        },
        {
          params: ['distance', 'distance'],
          convert: function (a, b) {
            return a * b;
          }
        }
      ],
      base: 'square meter',
      units: {
        'square foot': 0.09290304,
        'square inch': 0.09290304 / 144,
        'square kilometer': 1000000,
        'square meter': 1,
        'square mile': 0.09290304 * 27878400,
        'square yard': 0.09290304 * 9
      }
    });
  });

  after(function () {
    Units.unregisterType('distance');
    Units.unregisterType('area');
  });


  describe('Validate possible conversions', function () {

    it('should validate distance to area', function () {
      Converter.convert( 'distance' ).as('area').should.be.true;
    });

  });

  describe('Convertint values', function () {

    it('should convert to', function () {
      Converter.convert( 'distance' ).from( 1, 'km' ).to( 'm' ).should.equal( 1000 );
      Converter.convert( 'area' ).from( 2, 'square kilometer' ).as( 'distance' ).with( 'distance', 700, 'yard' ).to( 'yard' ).should.be.approximately( 3417.1144, 0.001 );
    });

  });


});
