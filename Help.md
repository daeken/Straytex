API
====

Straytex provides a few base and helper methods/variables for your convenience:

- `width` and `height` -- Width and height of the texture canvas
- `texture` -- Array of `width*height*3` integers between 0 and 255.  This is your texture data, in RGB.
- `noisebw(width, height, add=0)` -- Generates an array of `width*height+add` random values from 0-255.
- `noisebw(width, height, add=0)` -- Generates an array of `width*height*3+add` random values from 0-255.  This is generally used when you need color noise data.
- `log2(value)` -- Natural logarithm of base 2.
