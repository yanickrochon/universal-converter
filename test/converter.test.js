'use strict';
import Converter from '../src/converter.js';
import Units from '../src/units.js';


describe('Testing Converter', () => {

  beforeEach(() => {
    Units.register({
      name: 'distance',
      conversion: {
        params: {
          surface: 'area',
          width: 'distance'
        },
        converters: {
          square(params) {
            return Math.sqrt(params.surface);
          },
          rectangle(params) {
            return params.surface / params.width;
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
    Units.register({
      name: 'area',
      conversion: {
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

  afterEach(() => {
    Units.unregister('distance');
    Units.unregister('area');
  });


  describe('Validate possible conversions', () => {

    test('validate distance to area', () => {
      expect(Converter.convert('area').isCompatible('distance')).toBe(true);
      expect(Converter.convert('area').isCompatible('velocity')).toBe(false);
    });

  });

  describe('Converting values', () => {

    test('convert to', () => {
      expect(Converter.convert('distance').from( 1, 'km' ).to( 'm' )).toBe( 1000 );
      expect(Converter.convert('distance').using('rectangle').with( 'surface', 2, 'square kilometer' ).with( 'width', 1000, 'meter' ).to( 'km' )).toBeCloseTo( 2, 3 );
      expect(Converter.convert('distance').using('rectangle').with( 'surface', 2, 'square kilometer' ).with( 'width', 700, 'yard' ).to( 'yard' )).toBeCloseTo( 3417.1144, 3 );
    });

    test('convert to (using batch)', () => {
      expect(Converter.convert('distance').using('rectangle').with({ 'surface': [2, 'square kilometer'], 'width': '1000 meter' }).to( 'km' )).toBeCloseTo( 2, 3 );
      expect(Converter.convert('distance').using('rectangle').with({ 'surface': '2 square kilometer', 'width': [700, 'yard'] }).to( 'yard' )).toBeCloseTo( 3417.1144, 3 );
    });

    test('convert to (using batch) fail', () => {
      expect(() => Converter.convert('distance').using('rectangle').with({ 'surface': '2 square kilometer' }, 'invalid')).toThrow('Invalid arguments given');
    });

  });


  describe('Extending converters', () => {

    test('adding new conversion function', () => {

      // register new parameter, which is of unit type 'distance'
      Units.get('area').conversion.params.apothem = 'distance';
      // add converter for area of a pentagon, use sementic function name
      Units.get('area').conversion.converters.pentagonArea = ({ width, apothem }) => (5 / 2) * width * apothem;

      // anywhere
      const area = Converter.convert('area')
        .using('pentagonArea')
        .with({ width: '10 m', apothem: '5 m' })
        .to('square meter');
      
      expect(area).toBe(125);
    });

    test('throwing relevant error when using unknown function arguments', () => {

      expect(() => Converter.convert('distance').using('rectangle').with('invalid', 'test')).toThrow('Unknown argument "invalid" in conversion function "rectangle", expected one of : "surface", "width"');

    });

  });

});
