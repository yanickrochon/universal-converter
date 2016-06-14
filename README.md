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
Converter.convert('speed').from(100, 'kph').to('mph');   // 100 km/h = ? mp/h
// -> 62.1371192237334

/** Convert from one type to another **/
Converter.convert('distance').from(100, 'inch').as('area').to('square foot') + ' ft²';    // 100 in * 100 in = ? ft²
// -> "69.44444444444444 ft²"
Converter.convert('distance').from(60, 'inch').as('area').with('distance', 84, 'feet').to('square meter') + ' m¹';   // 60 in * 84 ft = ? m²
// -> "39.01927680000001 m¹"
Converter.convert('area').from(39.01927680000001, 'square meter').as('distance').with('distance', 84, 'feet').to('inch') + ' in';  // m² / 84 ft = ? in
// -> "60.00000000000001 in"

/** Check possible conversions **/
Converter.convert('distance').as('area');   // can a distance be converted to an area?
// -> true
Converter.convert('area').as('speed');      // can an area be converted to a speed?
// -> false
```

```
Converter.convert( type )
    .as( type ) : Boolean
    .from( value, unit )
       .to( unit ) : Number
       .as( type )
           .with( type, value, unit ) ...
           .to( unit ) : Number
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
