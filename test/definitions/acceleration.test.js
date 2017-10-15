'use strict';

describe('Testing Accleration definition', () => {

  const def = require('../../definitions/acceleration');

  test('define base', () => {
    expect(def.base).toBe('meter/square second');
    expect(def.units[def.base]).toBe(1);
  });

  test('define aliases', () => {
    expect(def.aliases).toHaveProperty('G', 'g-unit');
    // TODO : check more aliases
  });

  test('define conversion params', () => {
    expect(def.conversion.params).toHaveProperty('initialVelocity', 'velocity');
    expect(def.conversion.params).toHaveProperty('velocity', 'velocity');
    expect(def.conversion.params).toHaveProperty('time', 'time');
  });

  test('calculate from conversion', () => {
    expect(def.conversion.converters.velocityOverTime({ initialVelocity: 0, velocity: 100, time: 20 })).toBe(5);
  });

  test('calculate velocityOverTime with default params', () => {
    expect(def.conversion.converters.velocityOverTime({ time: 20 })).toBe(0);
  });

});
