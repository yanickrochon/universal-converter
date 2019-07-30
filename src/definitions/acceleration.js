export default {
  name: 'acceleration',
  conversion: {
    params: {
      initialVelocity: 'velocity',
      velocity: 'velocity',
      time: 'time'
    },
    converters: {
      velocityOverTime(params) {
        return ((params.velocity || 0) - (params.initialVelocity || 0)) / params.time;
      }
    }
  },
  base: 'meter/square second',
  aliases: {
    'G': 'g-unit'
  },
  units: {
    'centigal': 0.0001,
    'centimeter/square second': 0.01,
    'decigal': 0.001,
    'decimeter/square second': 0.1,
    'dekameter/square second': 10,
    'foot/square second': 0.3048,
    'gal': 0.01,
    'galileo': 0.01,
    'gn': 9.80665,
    'grav': 9.80665,
    'g-unit': 9.80665,
    'hectometer/square second': 100,
    'kilometer/hour second': 0.2777777777777778,
    'kilometer/square second': 1000,
    'inch/square second': 0.0254,
    'meter/square second': 1,
    'mile/square second': 1609.344,
    'mile/hour minute': 0.007450666666666667,
    'mile/hour second': 0.44704,
    'milligal': 0.00001,
    'millimeter/square second': 0.001
  }
};