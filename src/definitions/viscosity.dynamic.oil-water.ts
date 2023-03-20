import { buildUnitDef } from "../units";

export default buildUnitDef({
  type: "viscosity.dynamic.oil-water",
  base: "poise",
  units: {
    poise: 1,
    centipoise: 0.01,
    "lbf-S/square foot": 478.698,
    "N-S/square meter": 10,
    "water(20 C)": 0.01,
    "water(40 C)": 0.0065,
    "heavy oil(20 C)": 4.5,
    "heavy oil(40 C)": 1.1,
    "glycerin(20 C)": 14.1,
    "glycerin(40 C)": 2.84,
    "SAE 5W(-18 C)": 12,
    "SAE 10W(-18 C)": 24,
    "SAE 20(-18 C)": 96,
    "SAE 5W(99 C)": 0.039,
    "SAE 10W(99 C)": 0.042,
    "SAE 20(99 C)": 0.057,
  },
});
