const Converter = require('./src/converter');
const Units = require('./src/units');

// register all known unit types
Units.registerType('acceleration', require('./definitions/acceleration'));
Units.registerType('angle', require('./definitions/angle'));
Units.registerType('area', require('./definitions/area'));
Units.registerType('binary', require('./definitions/binary'));
Units.registerType('density', require('./definitions/density'));
Units.registerType('distance', require('./definitions/distance'));
Units.registerType('electric.capacitance', require('./definitions/electric.capacitance'));
Units.registerType('electric.current', require('./definitions/electric.current'));
Units.registerType('energy', require('./definitions/energy'));
Units.registerType('flow.rate.mole', require('./definitions/flow.rate.mole'));
Units.registerType('flow.rate.volume', require('./definitions/flow.rate.volume'));
Units.registerType('force', require('./definitions/force'));
Units.registerType('frequency', require('./definitions/frequency'));
Units.registerType('illuminance', require('./definitions/illuminance'));
Units.registerType('luminance', require('./definitions/luminance'));
Units.registerType('mass', require('./definitions/mass'));
Units.registerType('power', require('./definitions/power'));
Units.registerType('pressure', require('./definitions/pressure'));
Units.registerType('temperature', require('./definitions/temperature'));
Units.registerType('time', require('./definitions/time'));
Units.registerType('torque', require('./definitions/torque'));
Units.registerType('velocity', require('./definitions/velocity'));
Units.registerType('viscosity.dynamic', require('./definitions/viscosity.dynamic'));
Units.registerType('viscosity.dynamic.oil-water', require('./definitions/viscosity.dynamic.oil-water'));
Units.registerType('viscosity.kinematic', require('./definitions/viscosity.kinematic'));
Units.registerType('volume', require('./definitions/volume'));

module.exports = Converter
module.exports.Converter = Converter;
module.exports.Units = Units;
