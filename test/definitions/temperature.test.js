'use strict';

describe('Testing Temperature definition', () => {

  const def = require('../../definitions/temperature');

  test('define base', () => {
    expect(def.base).toBe('kelvin');
    expect(def.units[def.base]).toBe(1);
  });

  test('define aliases', () => {
    expect(def.aliases).toHaveProperty('C', 'celcius');
    expect(def.aliases).toHaveProperty('F', 'fahrenheit');
    expect(def.aliases).toHaveProperty('K', 'kelvin');
  });

  //test('define conversion params');

  test('calculate from conversion', () => {
    expect(def.units['celcius'].toBase(0)).toBe(273.15);
    expect(def.units['celcius'].fromBase(273.15)).toBe(0);

    expect(def.units['fahrenheit'].toBase(0)).toBeCloseTo(255.37222, 4);
    expect(def.units['fahrenheit'].fromBase(273.15)).toBeCloseTo(32, 4);

    expect(def.units['rankine'].toBase(-30)).toBeCloseTo(-16.66666, 4);
    expect(def.units['rankine'].fromBase(200)).toBeCloseTo(360, 4);

    expect(def.units['reaumur'].toBase(-30)).toBeCloseTo(-242.51999, 4);
    expect(def.units['reaumur'].fromBase(200)).toBeCloseTo(523.15, 4);
  });

});
