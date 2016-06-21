
describe('Testing Distance definition', function () {

  const def = require('../../definitions/distance');

  it('should define base', function () {
    def.base.should.equal('meter');
    def.units[def.base].should.equal(1);
  });

  it('should define aliases', function () {
    def.aliases.should.have.property('m').equal('meter');
    def.aliases.should.have.property('km').equal('kilometer');
    // TODO : check more aliases
  });

  it('should define conversion params', function () {
    def.conversion.params.should.have.property('surface').equal('area');
    def.conversion.params.should.have.property('length').equal('distance');
    def.conversion.params.should.have.property('initialVelocity').equal('velocity');
    def.conversion.params.should.have.property('velocity').equal('velocity');
    def.conversion.params.should.have.property('time').equal('time');
  });

  it('should calculate from conversion', function () {
    def.conversion.converters.squareWidth(100).should.equal(10);
    def.conversion.converters.squareWidth(100).should.equal(10 * def.units['meter']);
    def.conversion.converters.squareWidth(1).should.equal(def.units['meter']);

    def.conversion.converters.rectangleWidth(500, 10).should.equal(50);

    def.conversion.converters.velocityAndTime(100, 100, 10).should.equal(1000);
    def.conversion.converters.velocityAndTime(0, 150, 25).should.equal(1875);
    // TODO : check more conversions (i.e. validating unit values)
  });

});
