
describe('Testing Area definition', function () {

  const def = require('../../definitions/area');

  it('should define base', function () {
    def.base.should.equal('square meter');
    def.units[def.base].should.equal(1);
  });

  it('should define aliases', function () {
    def.aliases.should.have.property('yard').equal('square yard');
    // TODO : check more aliases
  });

  it('should define conversion params', function () {
    def.conversion.params.should.have.property('width').equal('distance');
    def.conversion.params.should.have.property('length').equal('distance');
  });

  it('should calculate from conversion', function () {
    def.conversion.converters.squareArea(10).should.equal(100);
    def.conversion.converters.squareArea(1000).should.equal(def.units['square kilometer']);
    def.conversion.converters.rectangleArea(10, 50).should.equal(500);

    // TODO : check more conversions (i.e. validating unit values)
  });


});
