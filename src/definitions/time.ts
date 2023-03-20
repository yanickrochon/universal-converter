import { buildUnitDef } from "../units";

const timeDef = buildUnitDef({
  type: "time",
  base: "second",
  units: {
    shake: 1e-8,
    second: 1,
    minute: 60,
    hour: 3600,
    day: 86400,
    week: 604800,
    fortnight: 1209600,
    month: 2628000,
    quarter: 7884000,
    year: 31536000,
    decade: 315360000,
    century: 3153600000,
    microsecond: 1e-6,
    millennium: 31536000000,
    millisecond: 0.001,
    nanosecond: 1e-9,
  },
  aliases: {
    ns: "nanosecond",
    ms: "millisecond",
    s: "second",
    m: "minute",
    h: "hour",
    d: "day",
    w: "week",
  },
  conversion: {
    params: {
      initialVelocity: "velocity",
      velocity: "velocity",
      acceleration: "acceleration",
      distance: "distance",
    },
    converters: {
      velocityOverAcceleration: ({
        initialVelocity = 0,
        velocity = 0,
        acceleration = 0,
      }) => (velocity - initialVelocity) / acceleration,
      distanceOverVelocity: ({
        initialVelocity = 0,
        velocity = 0,
        distance = 0,
      }) => (distance * 2) / (initialVelocity + velocity),
    },
  },
});

export type TimeType = typeof timeDef;
export default timeDef;
