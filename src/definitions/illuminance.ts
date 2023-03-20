import { buildUnitDef } from "../units";

export default buildUnitDef({
  type: "illuminance",
  base: "lumen/square meter",
  units: {
    footcandle: 10.7639104,
    kilolux: 1000,
    "lumen/square centimeter": 10000,
    "lumen/square foot": 10.7639104,
    "lumen/square inch": 10.7639104 * 144,
    "lumen/square meter": 1,
    lux: 1,
    metercandle: 1,
    milliphot: 10,
    nox: 0.001,
    phot: 10000,
  },
});
