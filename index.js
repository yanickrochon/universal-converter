const Converter = require('./src/converter');
const Units = require('./src/units');

// register all known unit types
Units.register(require('./definitions/acceleration'));
Units.register(require('./definitions/angle'));
Units.register(require('./definitions/area'));
Units.register(require('./definitions/binary'));
Units.register(require('./definitions/density'));
Units.register(require('./definitions/distance'));
Units.register(require('./definitions/electric.capacitance'));
Units.register(require('./definitions/electric.current'));
Units.register(require('./definitions/energy'));
Units.register(require('./definitions/flow.rate.mole'));
Units.register(require('./definitions/flow.rate.volume'));
Units.register(require('./definitions/force'));
Units.register(require('./definitions/frequency'));
Units.register(require('./definitions/illuminance'));
Units.register(require('./definitions/luminance'));
Units.register(require('./definitions/mass'));
Units.register(require('./definitions/power'));
Units.register(require('./definitions/pressure'));
Units.register(require('./definitions/temperature'));
Units.register(require('./definitions/time'));
Units.register(require('./definitions/torque'));
Units.register(require('./definitions/velocity'));
Units.register(require('./definitions/viscosity.dynamic'));
Units.register(require('./definitions/viscosity.dynamic.oil-water'));
Units.register(require('./definitions/viscosity.kinematic'));
Units.register(require('./definitions/volume'));

module.exports = Converter
module.exports.Converter = Converter;
module.exports.Units = Units;
