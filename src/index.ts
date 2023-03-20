//export { default as Converter } from "./converter";

// export { default as acceleration } from "./definitions/acceleration";
// export { default as angle } from "./definitions/angle";
// export { default as area } from "./definitions/area";
// export { default as binary } from "./definitions/binary";
// export { default as density } from "./definitions/density";
// export { default as distance } from "./definitions/distance";
// export { default as electricCapacitance } from "./definitions/electric.capacitance";
// export { default as electricCurrent } from "./definitions/electric.current";
// export { default as energy } from "./definitions/energy";
// export { default as flowRateMole } from "./definitions/flow.rate.mole";
// export { default as flowRateVolume } from "./definitions/flow.rate.volume";
// export { default as force } from "./definitions/force";
// export { default as frequency } from "./definitions/frequency";
// export { default as illuminance } from "./definitions/illuminance";
// export { default as luminance } from "./definitions/luminance";
// export { default as mass } from "./definitions/mass";
// export { default as power } from "./definitions/power";
// export { default as pressure } from "./definitions/pressure";
// export { default as temperature } from "./definitions/temperature";
// export { default as time } from "./definitions/time";
// export { default as torque } from "./definitions/torque";
// export { default as velocity } from "./definitions/velocity";
// export { default as viscosityDynamic } from "./definitions/viscosity.dynamic";
// export { default as viscosityDynamicOilWater } from "./definitions/viscosity.dynamic.oil-water";
// export { default as viscosityKinematic } from "./definitions/viscosity.kinematic";
// export { default as volume } from "./definitions/volume";

import distance from "./definitions/distance";

import Converter from "./converter";

console.log(
  Converter.convert(distance)
    .using("rectangleWidth")
    .with("surface", 42)
    .with("length", distance.toBase(7000, "mm"))
    .to("m")
);

console.log(distance.cm(1000));
