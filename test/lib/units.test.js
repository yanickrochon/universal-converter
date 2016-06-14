'use strict';


describe('Testing Units', function () {

  const units = require('../../lib/units');


  it('should have unit types'/*, function () {
    units.types.should.not.be.empty();
  }*/);

  it('should return each types'/*, function () {
    units.types.forEach(function (type) {
      units.getType(type).should.have.property('units').be.instanceOf(Object).and.not.be.empty();
    });
  }*/);


});
