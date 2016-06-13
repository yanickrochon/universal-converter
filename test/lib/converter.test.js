'use strict';

describe('Testing Converter', function () {

  const Converter = require('../../lib/converter');


  describe('Validate possible conversions', function () {

    it('should validate distance to area', function () {
      Converter.convert( 'distance' ).as('area').should.be.true;
    });

  });

  describe('Convertint values', function () {

    it('should convert to', function () {
      Converter.convert( 'distance' ).from( 1, 'km' ).to( 'm' ).should.equal( 1000 );
      Converter.convert( 'area' ).from( 2, 'square kilometer' ).as( 'distance' ).with( 'distance', 40, 'meter' ).to( 'meter' ).should.equal( 50 );
    });

  });


});
