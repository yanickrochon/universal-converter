module.exports = {
  name: 'temperature',
  //converters: [],
  base: 'kelvin',
  aliases: {
    'C': 'celcius',
    'F': 'fahrenheit',
    'K': 'kelvin'
  },
  units: {
    'celcius': {
      fromBase: function (k) {
        return k - 273.15;
      },
      toBase: function (c) {
        return c + 273.15;
      }
    },
    'fahrenheit': {
      fromBase: function (k) {
        return ((k - 273.15) * 1.8) + 32;
      },
      toBase: function (f) {
        return ((f - 32) / 1.8) + 273.15;
      }
    },
    'kelvin': 1,
    'rankine': {
      fromBase: function (k) {
        return k * 1.8;
      },
      toBase: function (r) {
        return r / 1.8;
      }
    },
    'reaumur': {
      fromBase: function (k) {
        return (k * 1.25) + 273.15;
      },
      toBase: function (r) {
        return (r - 273.15) / 1.25;
      }
    }
  }
};
