export default {
  name: 'temperature',
  //conversion: {},
  base: 'kelvin',
  aliases: {
    'C': 'celcius',
    'F': 'fahrenheit',
    'K': 'kelvin'
  },
  units: {
    'celcius': {
      fromBase(k) {
        return k - 273.15;
      },
      toBase(c) {
        return c + 273.15;
      }
    },
    'fahrenheit': {
      fromBase(k) {
        return ((k - 273.15) * 1.8) + 32;
      },
      toBase(f) {
        return ((f - 32) / 1.8) + 273.15;
      }
    },
    'kelvin': 1,
    'rankine': {
      fromBase(k) {
        return k * 1.8;
      },
      toBase(r) {
        return r / 1.8;
      }
    },
    'reaumur': {
      fromBase(k) {
        return (k * 1.25) + 273.15;
      },
      toBase(r) {
        return (r - 273.15) / 1.25;
      }
    }
  }
};