# Universal Converter

Convert just about anything to anything else.

This package is an effort to provide a flexible and complete conversion tool to convert values.

## Disclaimer

A the moment, the precision of values in this package is as reliable as
[IEEE-754 double-precision](https://en.wikipedia.org/wiki/IEEE_floating_point)
arithmetics allow. Do not use if lives are involed, or if manipulating banking money.


## Install

*Soon to be on npm...*


## Usage

```javascript
var Converter = require('universal-converter');

/** Convert from one unit to another **/
Converter.convert('distance').from(2000, 'm').to('km');    // 2000 m = ? km
// -> 2
Converter.convert('distance').from(2, 'kilometer').to('meter');   // 2 km = ? m
// -> 2000
Converter.convert('speed').from('100 kph').to('mph');   // 100 km/h = ? mp/h
// -> 62.1371192237334

/** Convert from one type to another **/
Converter.convert('area')
  .using('square')
  .with( 'width', 100, 'inch' )
  .to('square foot') + ' ft';    // 100 in * 100 in = ? ft²
// -> "69.44444444444444 ft²"
Converter.convert('area')
  .using('rectangle')
  .with('width', ' 60 inch')
  .with('length', '84 feet')
  .to('square meter') + ' m¹';   // 60 in * 84 ft = ? m²
// -> "39.01927680000001 m¹"
Converter.convert('distance')
  .using('rectangle')
  .with('area', 39.01927680000001, 'square meter')
  .with('width', '84 feet')
  .to('inch') + ' in';  // m² / 84 ft = ? in
// -> "60.00000000000001 in"

/** Check possible conversions **/
Converter.convert('distance').isCompatible('area');   // can a distance be converted to an area?
// -> true
Converter.convert('area').isCompatible('velocity');   // can an area be converted to a velocity?
// -> false
```

```
Converter.convert( type : String )
    .from( value : Number, unit : String ) | .from( valueAndUnit : String )
      .to( unit : String ) : Number
    .using( fnName : String )
      .with( paramName : String, value : Number, unit : String ) | .with( paramName : String, valueAndUnit : String ) : [Circular]
      .to( unit : String ) : Number
    .isCompatible( type : String ) : Boolean
```

## Conversion functions

### Physics

* **distanceOverVelocity**(*initialVelocity:velocity*, *velocity:velocity*, *distance:distance*) : *time*
  Example:
  ```
  Converter.convert('time').using('distanceOverVelocity')
    .with('initialVelocity', '60 mph')
    .with('velocity', '60 mph')          // ie. constant speed
    .with('distance', '275 mile')
    .to('hour');
  // -> 4.58333...   (or a little over 4.5 hours)
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
