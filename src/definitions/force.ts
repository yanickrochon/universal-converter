import { buildUnitDef } from "../units";

export default buildUnitDef({
  type: "force",
  base: "newton",
  units: {
    attonewton: 1e-18,
    centinewton: 0.01,
    "decigram-force": 0.000980665,
    decinewton: 0.1,
    "dekagram-force": 0.0980665,
    dekanewton: 10,
    dyne: 0.00001,
    exanewton: 1e18,
    femtonewton: 1e-15,
    giganewton: 1e9,
    "gram-force": 0.00980665,
    hectonewton: 100,
    "joule/meter": 1,
    "kilogram-force": 9.80665,
    kilonewton: 1000,
    kilopond: 9.80665,
    kip: 4448.2216,
    meganewton: 1000000,
    megapond: 9806.65,
    micronewton: 0.000001,
    millinewton: 0.001,
    nanonewton: 0.000000001,
    newton: 1,
    "ounce-force": 4.4482216 / 16,
    petanewton: 1e15,
    piconewton: 1e-12,
    pond: 0.00980665,
    "pound-force": 4.4482216,
    poundal: 0.13825495,
    sthene: 1000,
    teranewton: 1e12,
    "ton-force [long]": 4.4482216 * 2240,
    "ton-force [metric]": 9806.65,
    "ton-force [short]": 4.4482216 * 2000,
    yoctonewton: 1e-24,
    yottanewton: 1e24,
    zeptonewton: 1e-21,
    zettanewton: 1e21,
  },
});
