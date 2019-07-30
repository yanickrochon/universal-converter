import Converter from './converter';
import Units from './units';

import accelerationDef from './definitions/acceleration';
import angleDef from './definitions/angle';
import areaDef from './definitions/area';
import binaryDef from './definitions/binary';
import densityDef from './definitions/density';
import distanceDef from './definitions/distance';
import electricCapacitanceDef from './definitions/electric.capacitance';
import electricCurrentDef from './definitions/electric.current';
import energyDef from './definitions/energy';
import flowRateMoleDef from './definitions/flow.rate.mole';
import flowRateVolumeDef from './definitions/flow.rate.volume';
import forceDef from './definitions/force';
import frequencyDef from './definitions/frequency';
import illuminanceDef from './definitions/illuminance';
import luminanceDef from './definitions/luminance';
import massDef from './definitions/mass';
import powerDef from './definitions/power';
import pressureDef from './definitions/pressure';
import temperatureDef from './definitions/temperature';
import timeDef from './definitions/time';
import torqueDef from './definitions/torque';
import velocityDef from './definitions/velocity';
import viscosityDynamicDef from './definitions/viscosity.dynamic';
import viscosityDynamicOilWaterDef from './definitions/viscosity.dynamic.oil-water';
import viscosityKinematicDef from './definitions/viscosity.kinematic';
import volumeDef from './definitions/volume';


// register all known unit types
Units.register(accelerationDef);
Units.register(angleDef);
Units.register(areaDef);
Units.register(binaryDef);
Units.register(densityDef);
Units.register(distanceDef);
Units.register(electricCapacitanceDef);
Units.register(electricCurrentDef);
Units.register(energyDef);
Units.register(flowRateMoleDef);
Units.register(flowRateVolumeDef);
Units.register(forceDef);
Units.register(frequencyDef);
Units.register(illuminanceDef);
Units.register(luminanceDef);
Units.register(massDef);
Units.register(powerDef);
Units.register(pressureDef);
Units.register(temperatureDef);
Units.register(timeDef);
Units.register(torqueDef);
Units.register(velocityDef);
Units.register(viscosityDynamicDef);
Units.register(viscosityDynamicOilWaterDef);
Units.register(viscosityKinematicDef);
Units.register(volumeDef);

export default Converter;
export { Converter, Units };