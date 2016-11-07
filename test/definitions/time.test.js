
describe('Testing Time definition', function () {

  const def = require('../../definitions/time');

  it('should define base', function () {
    def.base.should.equal('second');
    def.units[def.base].should.equal(1);
  });

  it('should define aliases', function () {
    def.aliases.should.have.property('s').equal('second');
    def.aliases.should.have.property('m').equal('minute');
    def.aliases.should.have.property('h').equal('hour');
    // TODO : check more aliases
  });

  it('should define conversion params', function () {
    def.conversion.params.should.have.property('initialVelocity').equal('velocity');
    def.conversion.params.should.have.property('velocity').equal('velocity');
    def.conversion.params.should.have.property('acceleration').equal('acceleration');
    def.conversion.params.should.have.property('distance').equal('distance');
  });

  it('should calculate from conversion', function () {
    def.conversion.converters.velocityOverAcceleration({ initialVelocity: 0, velocity: 100, acceleration: 5 }).should.equal(20);
    def.conversion.converters.distanceOverVelocity({ initialVelocity: 0, velocity: 100, distance: 1300 }).should.equal(26);
    // TODO : check more conversions (i.e. validating unit values)
  });

});
