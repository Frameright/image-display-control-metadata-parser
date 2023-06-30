[<img src="https://avatars.githubusercontent.com/u/35964478?s=200&v=4" align="right" width="64" height="64">](https://frameright.io)
[![npm version](https://img.shields.io/npm/v/@frameright/image-display-control-metadata-parser)](https://www.npmjs.com/package/@frameright/image-display-control-metadata-parser)
[![github actions](https://github.com/Frameright/image-display-control-metadata-parser/actions/workflows/main.yml/badge.svg)](https://github.com/Frameright/image-display-control-metadata-parser/actions/workflows/main.yml)

&nbsp;

<!--
WARNINGS:
* Bits of information here are duplicated in several places:
    * https://docs.frameright.io/javascript
    * https://github.com/Frameright/image-display-control-metadata-parser
  Make sure to keep them in sync.
* Make sure all URLs in this document are absolute, and not relative within
  GitHub, as we are publishing this file to NPM and want URLs to remain valid
  there.
-->

# Image Display Control metadata parsing library

An easy way to retrieve [Image Display Control](https://frameright.io) metadata
out of images. Made with :heart: by [Frameright](https://frameright.io). Power
to the pictures!

&emsp; :bulb: [GitHub Discussions](https://github.com/Frameright/image-display-control-web-component/discussions)

> **NOTE**: this is a wrapper around
> [mattiasw/ExifReader](https://github.com/mattiasw/ExifReader) and
> [image-size](https://github.com/image-size/image-size). Many thanks to
> [mattiasw](https://github.com/mattiasw), [netroy](https://github.com/netroy),
> and other contributors!

## Table of Contents

<!-- toc -->

- [Overview](#overview)
- [Usage](#usage)
  * [In a Node.js back-end](#in-a-nodejs-back-end)
  * [Directly in a browser](#directly-in-a-browser)
- [Image Display Control metadata](#image-display-control-metadata)

<!-- tocstop -->

## Overview

The
[Image Display Control web component](https://github.com/Frameright/image-display-control-web-component)
extends the `<img>` tag with the ability to accept a list of
image regions, and to zoom in on the best one for the current element size, thus
achieving better results than
[`object-fit: cover;`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
a.k.a. middle-cropping. Its syntax looks like:

```html
<img
  is="image-display-control"
  src="https://images.pexels.com/photos/3625715/pexels-photo-3625715.jpeg"
  width="200"
  height="200"
  data-image-regions='[{
    "id": "oneanimal",
    "names": ["One animal"],
    "shape": "rectangle",
    "unit": "relative",
    "x": "0.217",
    "y": "0.708",
    "width": "0.239",
    "height": "0.1467"
  }, {
    "id": "threeanimals",
    "names": ["Three animals"],
    "shape": "rectangle",
    "unit": "relative",
    "x": "0.245",
    "y": "0.725",
    "width": "0.419",
    "height": "0.121"
  }]'
/>
```

Typically this list of image regions come from the metadata of the image file
itself, is retrieved by the back-end, and is placed in the front-end's
`<img data-image-regions="` attribute.

This is where this library comes into play: it allows your Node.js back-end to
easily retrieve this metadata.

> **NOTES**:
>
> * A React component leveraging this library is available
>   [here](https://github.com/Frameright/react-image-display-control).
> * A PHP equivalent of this library is available
>   [here](https://github.com/Frameright/php-image-metadata-parser).

## Usage

### In a Node.js back-end

```jsx
#!/usr/bin/env node
// ./myscript.mjs

import { promises as fs } from 'fs';

// npm install @frameright/image-display-control-metadata-parser
import { Parser } from '@frameright/image-display-control-metadata-parser';

// Get it from https://iptc.org/std/photometadata/examples/IPTC-PhotometadataRef-Std2021.1.jpg
const buffer = await fs.readFile('IPTC-PhotometadataRef-Std2021.1.jpg');

const parser = new Parser(buffer);
console.log(parser.getIdcMetadata());
```

This has been
[validated](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/test/index.test.ts)
with JPEG, PNG, and WebP images.

&emsp; :memo: [Tutorial](https://www.frameright.io/post/metadata-in-node-js)

&emsp; :scroll: [Reference](https://github.com/Frameright/image-display-control-metadata-parser/blob/main/generated-docs/classes/Parser.md)

&emsp; :wrench: [Contributing](https://docs.frameright.io/javascript/contributing)

&emsp; 📝 [Changelog](https://docs.frameright.io/javascript/contributing)

&emsp; :bulb: [GitHub Discussions](https://github.com/Frameright/image-display-control-web-component/discussions)

### Directly in a browser

For testing purposes, you can use this library directly in the browser:

```html
<html>
  <body onload="documentLoaded()">
    <script
      type="module"
      src="https://cdn.jsdelivr.net/npm/@frameright/image-display-control-metadata-parser@1.1.1/dist/image-display-control-metadata-parser-standalone.min.js"
    ></script>

    <script type="text/javascript">
      async function documentLoaded() {
        const image = await fetch(
          'https://iptc.org/std/photometadata/examples/IPTC-PhotometadataRef-Std2021.1.jpg'
        );
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.Buffer.from(arrayBuffer);
        const parser = new ImageDisplayControl.Parser(buffer);
        const regions = parser.getIdcMetadata();
        console.log(JSON.stringify(regions, null, 2 /*indent*/));
      }
    </script>
  </body>
</html>
```

The parsed metadata can then directly be fed to the
[Image Display Control web component](https://github.com/Frameright/image-display-control-web-component).

[This React component](https://github.com/Frameright/react-image-display-control/blob/main/src/index.tsx)
is an example of doing that.

&emsp; :sparkles: [Live mobile demo](https://webc.frameright.io)

&emsp; 💻 [CodeSandbox](https://codesandbox.io/s/image-display-control-web-component-6hzmq5)

## Image Display Control metadata

Nowadays an image file (e.g. JPEG, PNG) can contain this type of image regions
in their metadata according to
[the IPTC standard](https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#image-region).
Photographers, or anyone else, can use the
[Frameright webapp](https://frameright.app/) to define and store image regions in
the metadata of their pictures.
