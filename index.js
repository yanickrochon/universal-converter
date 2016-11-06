const Converter = require('./lib/converter');
const units = require('./lib/units');


module.exports = Converter
module.exports.Converter = Converter;
module.exports.units = units;

units.registerType('acceleration', require('./definitions/acceleration'));
units.registerType('angle', require('./definitions/angle'));
units.registerType('area', require('./definitions/area'));
units.registerType('binary', require('./definitions/binary'));
units.registerType('density', require('./definitions/density'));
units.registerType('distance', require('./definitions/distance'));
units.registerType('electric.capacitance', require('./definitions/electric.capacitance'));
units.registerType('electric.current', require('./definitions/electric.current'));
units.registerType('energy', require('./definitions/energy'));
units.registerType('flow.rate.mole', require('./definitions/flow.rate.mole'));
units.registerType('flow.rate.volume', require('./definitions/flow.rate.volume'));
units.registerType('force', require('./definitions/force'));
units.registerType('frequency', require('./definitions/frequency'));
units.registerType('illuminance', require('./definitions/illuminance'));
units.registerType('luminance', require('./definitions/luminance'));
units.registerType('mass', require('./definitions/mass'));
units.registerType('power', require('./definitions/power'));
units.registerType('pressure', require('./definitions/pressure'));
units.registerType('temperature', require('./definitions/temperature'));
units.registerType('time', require('./definitions/time'));
units.registerType('torque', require('./definitions/torque'));
units.registerType('velocity', require('./definitions/velocity'));
units.registerType('viscosity.dynamic', require('./definitions/viscosity.dynamic'));
units.registerType('viscosity.dynamic.oil-water', require('./definitions/viscosity.dynamic.oil-water'));
units.registerType('viscosity.kinematic', require('./definitions/viscosity.kinematic'));
units.registerType('volume', require('./definitions/volume'));
