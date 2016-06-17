'use strict';

describe('Testing Converter', function () {

  const Converter = require('../../lib/converter');
  const Units = require('../../lib/units');

  before(function () {
    Units.registerType('distance', {
      name: 'distance',
      conversion: {
        params: {
          surface: 'area',
          width: 'distance'
        },
        converters: {
          square(surface) {
            return Math.sqrt(surface);
          },
          rectangle(surface, width) {
            return surface / width;
          }
        }
      },
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
      cconversion: {
        params: {
          width: 'distance',
          length: 'distance'
        },
        converters: {
          square(width) {
            return width * width;
          },
          rectangle(width, length) {
            return width * length;
          }
        }
      },
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
      Converter.convert( 'distance' ).as( 'area' ).isCompatible.should.be.true;
    });

  });

  describe('Convertint values', function () {

    it('should convert to', function () {
      Converter.convert( 'distance' ).from( 1, 'km' ).to( 'm' ).should.equal( 1000 );
      Converter.convert( 'area' ).as( 'distance' ).using( 'rectangle' ).with( 'surface', 2, 'square kilometer' ).with( 'width', 1000, 'meter' ).to( 'km' ).should.be.approximately( 2, 0.001 );
      Converter.convert( 'area' ).as( 'distance' ).using( 'rectangle' ).with( 'surface', 2, 'square kilometer' ).with( 'width', 700, 'yard' ).to( 'yard' ).should.be.approximately( 3417.1144, 0.001 );
    });

  });


});
