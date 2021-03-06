export default {
  name: 'time',
  conversion: {
    params: {
      initialVelocity: 'velocity',
      velocity: 'velocity',
      acceleration: 'acceleration',
      distance: 'distance'
    },
    converters: {
      velocityOverAcceleration: ({ initialVelocity, velocity, acceleration }) => ((velocity || 0) - (initialVelocity || 0)) / acceleration,
      distanceOverVelocity: ({ initialVelocity, velocity, distance }) => distance * 2 / ((initialVelocity || 0) + velocity)
    }
  },
  base: 'second',
  aliases: {
    'ns': 'nanosecond',
    'ms': 'millisecond',
    's': 'second',
    'm': 'minute',
    'h': 'hour',
    'd': 'day',
    'w': 'week'
  },
  units: {
    'shake': 1e-8,
    'second': 1,
    'minute': 60,
    'hour': 3600,
    'day': 86400,
    'week': 604800,
    'fortnight': 1209600,
    'month': 2628000,
    'quarter': 7884000,
    'year': 31536000,
    'decade': 315360000,
    'century': 3153600000,
    'microsecond': 1e-6,
    'millennium': 31536000000,
    'millisecond': 0.001,
    'nanosecond': 1e-9
  }
};