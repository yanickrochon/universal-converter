
describe('Testing Accleration definition', function () {

  const def = require('../../definitions/acceleration');

  it('should define base', function () {
    def.base.should.equal('meter/square second');
    def.units[def.base].should.equal(1);
  });

  it('should define aliases', function () {
    def.aliases.should.have.property('G').equal('g-unit');
    // TODO : check more aliases
  });

  it('should define conversion params', function () {
    def.conversion.params.should.have.property('initialVelocity').equal('velocity');
    def.conversion.params.should.have.property('velocity').equal('velocity');
    def.conversion.params.should.have.property('time').equal('time');
  });

  it('should calculate from conversion', function () {
    def.conversion.converters.velocityOverTime({ initialVelocity: 0, velocity: 100, time: 20 }).should.equal(5);
    // TODO : check more conversions (i.e. validating unit values)
  });

});
