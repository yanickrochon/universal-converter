import assert from './assert.js';

const UNIT_VALUE_REGEXP = /(-?\d+(?:\.\d+)?)\s(.+)$/;

/**
If value is a string, parse the value and unit.
The returned values are then validated, where value
must be numeric and unit must be a non-empty string.

Usage :
   parseMeasure(2, 'unit');
   parseMeasure('2', 'unit');
   parseMeasure('2 unit');
   parseMeasure('2 unit', null);
   parseMeasure('2 unit', false);

Returns an object as { value, unit }

@param value {Number|String}
@param unit {String}
@return {Object}
*/
export default (value, unit) => {
  if (typeof unit !== 'string' && typeof value === 'string') {
    const match = (value + '').match(UNIT_VALUE_REGEXP);
    if (match) {
      value = match[1];
      unit = match[2];
    }
  }

  assert(!(isNaN(value) || isNaN(parseFloat(value))), 'Value must be a number : "' + value + '"');
  assert(unit && typeof unit === 'string', 'Empty or invalid unit : "' + unit + '"');

  return { value, unit };
};
