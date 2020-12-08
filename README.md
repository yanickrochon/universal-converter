# Universal Converter

[![npm version](https://badge.fury.io/js/universal-converter.svg)](https://badge.fury.io/js/universal-converter)
[![Build Status](https://travis-ci.org/yanickrochon/universal-converter.svg?branch=master)](https://travis-ci.org/yanickrochon/universal-converter)
[![Coverage Status](https://coveralls.io/repos/github/yanickrochon/universal-converter/badge.svg?branch=master)](https://coveralls.io/github/yanickrochon/universal-converter?branch=master)

Convert just about anything to anything else.

This package is an effort to provide a flexible and complete conversion tool to convert
values between different unit and types with a verbose API.

## Disclaimer

Currently, the precision of values in this package is as reliable as
[IEEE-754 double-precision](https://en.wikipedia.org/wiki/IEEE_floating_point)
arithmetics allow. Do not use if lives are involed, or if manipulating banking money.


## Install

`npm i universal-converter --save`


## Usage

```js
var Converter = require('universal-converter');
// or
import Converter from 'universal-converter';

/** Convert from one unit to another **/
Converter.convert('distance').from(2000, 'm').to('km');    // 2000 m = ? km
// -> 2
Converter.convert('distance').from(2, 'kilometer').to('meter');   // 2 km = ? m
// -> 2000
Converter.convert('speed').from('100 kph').to('mph');   // 100 km/h = ? mp/h
// -> 62.1371192237334

/** Convert from one type to another **/
Converter.convert('area')
  .using('squareArea')
  .with( 'width', 100, 'inch' )
  .to('square foot') + ' ft²';   // 100 in * 100 in = ? ft²
// -> "69.44444444444444 ft²"
Converter.convert('area')
  .using('rectangleArea')
  .with('width', ' 60 inch')     // same as .with({ width: '60 inch', length: [84, 'feet'] })
  .with('length', '84 feet')
  .to('square meter') + ' m²';   // 60 in * 84 ft = ? m²
// -> "39.01927680000001 m¹"
Converter.convert('distance')
  .using('rectangleWidth')
  .with('surface', 39.01927680000001, 'square meter')
  .with('width', '84 feet')
  .to('inch') + ' in';  // 39.01927680000001 m² / 84 ft = ? in
// -> "60.00000000000001 in"

/** Check possible conversions **/
Converter.convert('distance').isCompatible('area');   // can a distance be converted to an area?
// -> true
Converter.convert('area').isCompatible('velocity');   // can an area be converted to a velocity?
// -> false


Converter.Units.types;
// -> ... array of all available unit types,
// ex: ['acceleration', 'angle', 'area', ..., 'mass', ..., 'velocity', ...]
Converter.Units.available();
// -> ... array of all available units across all unit types, 
// ex: [..., 'in', ..., 'inch [international, U.S.]', ...]
Converter.Units.available('binary');
// -> ['bit', 'byte', 'kilobyte', 'megabyte', ..., 'KB', 'MB', ...]
Converter.Units.getUnitTypeName('mph');
// -> 'velocity'
Converter.Units.get('velocity');
// -> [Object:UnitDefinition]
```

Alternative import methods :

```js
import { Converter, convert, Units } from 'universal-converter';

import Converter from 'universal-converter/converter';
import Units, { UnitDefinition } from 'universal-converter/units';

Converter.convert === convert;
// -> true
```

**Note:** the main module must be imported in order to have all available types registered!
For example, importing `universal-converter/converter` and *not* `universal-converter` will
cause all conversions attempt to fail. For manual control over the available types, users
must import them manually.

```js
import Converter from 'universal-converter/converter';
import Units from 'universal-converter/units';
import distanceDef from 'universal-converter/definitions/distance';

Units.register(distanceDef);

Units.types;
// -> ['distance']

Converter.convert('distance').from('1 km').to('mile');
// -> 0.6213712

Converter.convert('speed').from('100 kph').to('mph');
// Error! Invalid unit type name : 'speed'
```

### API

```
Converter.convert( type : String )
    .from( value : Number, unit : String ) | .from( valueAndUnit : String )
      .to( unit : String ) : Number
    .using( fnName : String )
      .with( paramName : String, value : Number, unit : String ) : [Circular]
      .with( paramName : String, valueAndUnit : String ) : [Circular]
      .with( params : Object<String,String|Array<String>> ) : [Circular]
      .to( unit : String ) : Number
    .isCompatible( type : String ) : Boolean

Units.types : Array<String>
Units.available([ typename : String ]) : Array<String>
Units.get(typename : String) : UnitDefinition
Units.getUnitTypeName(type : String) : String
```

**Note:** Since the `Converter` API is chainable, one may preserve the state at any time and
reuse it with different parameters and values. For example:

```js
const height = Converter.convert('distance').from('24000 feet');

console.log(height.to('meter'));
// -> 7315.20000000000
console.log(height.to('yard'));
// -> 8000.000000000001

const rect = Converter.convert('area').using('rectangleArea');
rect.with('length', '300 feet');

rect.with('width', '120 feet');        // set param 'width'
console.log(rect.to('square yard'));
// -> 3999.999999999999
console.log(rect.to('acre'));
// -> 0.8264462809917354

rect.with({ width: '75 meter' });        // reset param 'width'
console.log(rect.to('square yard'));
// -> 8202.099737532808
console.log(rect.to('acre'));
// -> 1.6946487061018198
```

## Units

Please, view the [definitions](definitions/) package directory for more information.

## Conversion functions

### Physics

* **accelerationAndTime**(*initialVelocity : velocity*, *acceleration : acceleration*, *time : time*) : *velocity*
  ```js
  // Example
  Converter.convert('velocity').using('accelerationAndTime')
    .with('initialVelocity', '0 mph')
    .with('acceleration', '0.68 G')
    .with('time', '7.6 second')
    .to('kph');
  // -> 182.45076192
  ```

* **distanceOverVelocity**(*initialVelocity : velocity*, *velocity : velocity*, *distance : distance*) : *time*
  ```js
  // Example
  Converter.convert('time').using('distanceOverVelocity')
    .with('initialVelocity', '60 mph')
    .with('velocity', '60 mph')          // ie. constant speed
    .with('distance', '275 mile')
    .to('hour');
  // -> 4.58333...   (or a little over 4.5 hours)
  ```

* **initialVelocity**(*velocity : velocity*, *acceleration : acceleration*, *time : time*) : *velocity*
  ```js
  // Example
  Converter.convert('velocity').using('initialVelocity')
    .with('velocity', '70 mph')
    .with('acceleration', '0.2 G')
    .with('time', '0.06 minute')
    .to('mph');
  // -> 54.205467072297786
  ```

* **velocityAndTime**(*initialVelocity : velocity*, *velocity : velocity*, *time : time*) : *distance*
  ```js
  // Example
  Converter.convert('distance').using('velocityAndTime')
    .with('initialVelocity', 0, 'kilometer/hour')
    .with('velocity', 100, 'kph')  // 'kph' = 'kilometer/hour'
    .with('time', '25 second')
    .to('feet');
  // -> 1139.180519...
  ```

* **velocityOverAcceleration**(*initialVelocity : velocity*, *velocity : velocity*, *acceleration : acceleration*) : *time*
  ```js
  // Example
  Converter.convert('time').using('velocityOverAcceleration')
    .with('initialVelocity', '0 mph')
    .with('velocity', '680 kph')
    .with('acceleration', '1.5 G')
    .to('second');
  // -> 12.84087083009243
  ```

* **velocityOverTime**(*initialVelocity : velocity*, *velocity : velocity*, *time : time*) : *acceleration*
  ```js
  // Example
  Converter.convert('acceleration').using('velocityOverTime')
    .with('initialVelocity', '0 kph')
    .with('velocity', '100 kph')
    .with('time', '20 second')
    .to('G');
  // -> 0.141627...
  ```

### Geometry

* **squareArea**(*with : distance*) : *area*
  ```js
  // Example
  Converter.convert('area').using('squareArea')
    .with('width', 100, 'inch')
    .to('square foot');
  // -> 69.44444444444444
  ```

* **squareWidth**(*surface : area*) : *distance*
  ```js
  // Example
  Converter.convert('distance').using('squareWidth')
  .with('surface', '5 acre')
  .to('meter')
  // -> 142.2472569577354
  ```

* **rectangleArea**(*with : distance*, *length : distance*) : *area*
  ```js
  // Example
  Converter.convert('area').using('rectangleArea')
    .with('width', ' 60 inch')
    .with('length', '84 feet')
    .to('square meter')
  // -> 39.01927680000001
  ```

* **rectangleWidth**(*surface : area*, *length : distance*) : *distance*
  ```js
  // Example
  Converter.convert('distance').using('rectangleWidth')
  .with('surface', '5 acre')
  .with('length', '200 feet')
  .to('meter')
  // -> 331.9272
  ```


## Extending functionality

The API of this module is as flexible as it gets. It's use is as simple as a
single module import, or as custom as ipmorting only the required units. Consequently,
new unit types, new units, and new conversion functions can be defined and used
seemlessly with the API.

For examle :

```js
import Converter, { Units } from 'universal-converter';

// register new parameter, which is of unit type 'distance'
Units.get('area').conversion.params.apothem = 'distance';
// add converter for area of a pentagon, use sementic function name
Units.get('area').conversion.converters.pentagonArea = ({ width, apothem }) => (5 / 2) * width * apothem;

// anywhere
Converter.convert('area')
  .using('pentagonArea')
  .with({ width: '10 m', apothem: '5 m' })
  .to('square meter');
// -> 125

```


## Contribution

All contributions welcome! Every PR **must** be accompanied by their associated
unit tests!


## License

The MIT License (MIT)

Copyright (c) 2015 Mind2Soft <yanick.rochon@mind2soft.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
