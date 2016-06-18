
describe('Testing Velocity definition', function () {

  const def = require('../../definitions/velocity');

  it('should define base', function () {
    def.base.should.equal('meter/second');
    def.units[def.base].should.equal(1);
  });

  it('should define aliases', function () {
    def.aliases.should.have.property('kph').equal('kilometer/hour');
    def.aliases.should.have.property('mph').equal('mile/hour');
    // TODO : check more aliases
  });

  it('should define conversion params', function () {
    def.conversion.params.should.have.property('initialVelocity').equal('velocity');
    def.conversion.params.should.have.property('velocity').equal('velocity');
    def.conversion.params.should.have.property('acceleration').equal('acceleration');
    def.conversion.params.should.have.property('time').equal('time');
  });

  it('should calculate from conversion', function () {
    def.conversion.converters.accelerationAndTime(0, 5, 20).should.equal(100);
    def.conversion.converters.initialVelocity(100, 5, 20).should.equal(0);
    // TODO : check more conversions (i.e. validating unit values)
  });

});
