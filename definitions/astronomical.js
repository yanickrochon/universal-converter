module.exports = {
  category: 'astronomical',
  //transform: [],
  base: 'meter',
  aliases: {
    'light year': 'light year [traditional]'
  },
  units: {
    'astronomical unit [1996]': 149597870691,
    'kilometer': 1000,
    'light second': 299792458,
    'light minute': 299792458 * 60,
    'light hour': 299792458 * 60 * 60,
    'light day': 299792458 * 60 * 60 * 24,
    'light year [Julian]': 299792458 * 60 * 60 * 24 * 365.25,
    'light year [tropical]': 299792458 * 31556925.9747,
    'light year [traditional]': 299792458 * 60 * 60 * 24 * 365,
    'parsec': 149597870691 * 206264.8,
    'meter': 1,
    'mile': 1609.344
  }
};