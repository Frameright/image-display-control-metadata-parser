// Entrypoint for building
// dist/image-display-control-metadata-parser-standalone.js to be served from a
// CDN and used in a browser.

import * as ImageDisplayControl from './dist/image-display-control-metadata-parser.esm.js';

window.ImageDisplayControl = ImageDisplayControl;
