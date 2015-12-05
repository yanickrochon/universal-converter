module.exports = {
  category: 'frequency',
  //transform: [],
  base: 'hertz',
  aliases: {
    'hz': 'hertz',
    'khz': 'kilohertz',
    'Mhz': 'megahertz',
    'Ghz': 'gigahertz',
    'THz': 'terrahertz',
    'RPM': 'revolution/minute'
  },
  units: {
    '1/second': 1,
    'cycle/second': 1,
    'degree/hour': 1 / 1296000,
    'degree/minute': 1 / 21600,
    'degree/second': 1 / 360,
    'gigahertz': 1000000000,
    'hertz': 1,
    'kilohertz': 1000,
    'megahertz': 1000000,
    'millihertz': 1 / 1000,
    'radian/hour': 1 / 22619.467,
    'radian/minute': 1 / 376.99112,
    'radian/second': 1 / 6.2831853,
    'revolution/hour': 1 / 3600,
    'revolution/minute': 1 / 60,
    'revolution/second': 1,
    'terrahertz': 1000000000000
  }
};