# Universal Converter

Convert just about anything to anything else.

This package is an effort to provide a flexible and complete conversion tool to convert values.

## Disclaimer

A the moment, the precision of values in this package is as reliable as [IEEE-754 double-precision](https://en.wikipedia.org/wiki/IEEE_floating_point) arithmetics allow. Do not use if lives are involed, or if manipulating banking money.


## Install

*Soon to be on npm...*


## Usage

```javascript
var Converter = require('universal-converter');

var distance = Converter('distance');
var area = Converter('area');

// convert miles to kilemeters
distance.convert(150, 'mile').to('kilometer') + 'km';
// -> "241.4016km"

// convert base unit (meters) to kilemeters
distance.convert(2000).to('km');
// -> 2

// convert miles to base unit
distance.convert(100, 'mile').toBase() + 'm (' + distance.baseUnit + ')';
// -> "160934.4m (meter)"

// convert feet and inch to square meters
distance.convert([60, 84], ['feet', 'inch']).to(area, 'square meter') + 'm²';
// -> "27.907488m²"

// convert back to feet and inch...
area.convert(27.907488, 'square meter').to(distance, ['feet', 'inch']);
// -> [60, 84]

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

