
describe('Testing Temperature definition', function () {

  const def = require('../../definitions/temperature');

  it('should define base', function () {
    def.base.should.equal('kelvin');
    def.units[def.base].should.equal(1);
  });

  it('should define aliases', function () {
    def.aliases.should.have.property('C').equal('celcius');
    def.aliases.should.have.property('F').equal('fahrenheit');
    def.aliases.should.have.property('K').equal('kelvin');
  });

  //it('should define conversion params');

  it('should calculate from conversion', function () {
    def.units['celcius'].toBase(0).should.equal(273.15);
    def.units['celcius'].fromBase(273.15).should.equal(0);

    def.units['fahrenheit'].toBase(0).should.be.approximately(255.37222, 0.0001);
    def.units['fahrenheit'].fromBase(273.15).should.be.approximately(32, 0.0001);

    def.units['rankine'].toBase(-30).should.be.approximately(-16.6666, 0.0001);
    def.units['rankine'].fromBase(200).should.be.approximately(360, 0.0001);

    def.units['reaumur'].toBase(-30).should.be.approximately(-242.5199, 0.0001);
    def.units['reaumur'].fromBase(200).should.be.approximately(523.15, 0.0001);

  });

});
