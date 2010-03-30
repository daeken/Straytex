API
====

Straytex provides a few base and helper methods/variables for your convenience:

- `width` and `height` -- Width and height of the texture canvas
- `texture` -- Array of `width*height*3` integers between 0 and 255.  This is your texture data, in RGB.
- `noise(width, height, add=0)` -- Generates an array of `width*height*3+add` random values from 0-255.  This is generally used when you need color noise data.
- `noisebw(width, height, add=0)` -- Generates an array of `width*height+add` random values from 0-255.
- `log2(value)` -- Natural logarithm of base 2.
- `map(function(x, y))` -- Calls your function for every x and y on the texture.  You should return an array of 3 values to put in that texel.
- `mapbw(function(x, y))` -- Equivalent to `map`, with the exception that you return a single value, giving you a black and white texture.
