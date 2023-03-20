import { buildUnitDef } from "../units";

export default buildUnitDef({
  type: "temperature",
  base: "kelvin",
  units: {
    celcius: {
      fromBase: (k) => k - 273.15,
      toBase: (c) => c + 273.15,
    },
    fahrenheit: {
      fromBase: (k) => (k - 273.15) * 1.8 + 32,
      toBase: (f) => (f - 32) / 1.8 + 273.15,
    },
    kelvin: 1,
    rankine: {
      fromBase: (k) => k * 1.8,
      toBase: (r) => r / 1.8,
    },
    reaumur: {
      fromBase: (k) => k * 1.25 + 273.15,
      toBase: (r) => (r - 273.15) / 1.25,
    },
  },
  aliases: {
    C: "celcius",
    F: "fahrenheit",
    K: "kelvin",
  },
});
