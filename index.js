
const fs = require('fs');
const path = require('path');

const DEFINITION_PATH = path.join(__dirname, 'definitions');


module.exports = require('./lib/converter');
module.exports.Converter = module.exports;
module.exports.units = require('./lib/units');


// we need these definitions synchronously, now
fs.readdirSync(DEFINITION_PATH).forEach(function (file) {
  const type = path.basename(file, '.js');
  const def = require(path.join(DEFINITION_PATH, file));

  this.registerType(type, def);
}, module.exports.units);
