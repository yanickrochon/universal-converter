module.exports = {
  name: 'angle',
  //conversion: {},
  base: 'radian',
  //aliases: { },
  units: {
    'radian': 1,
    'mil': Math.PI / 3200,
    'grad': Math.PI / 200,
    'degree': Math.PI / 180,
    'minute': Math.PI / (180 * 60),
    'second': Math.PI / (180 * 3600),
    'point': Math.PI / 16,
    '1/16 circle': Math.PI / 8,
    '1/10 circle': Math.PI / 5,
    '1/8 circle': Math.PI / 4,
    '1/6 circle': Math.PI / 3,
    '1/4 circle': Math.PI / 2,
    '1/2 circle': Math.PI,
    'full circle': 2 * Math.PI
  }
};