# Changelog

**1.1.0** (2023-05-18):
  * Added one more export path inside `package.json` in order to support
    dynamic `import()`.

**1.0.4** (2023-05-12):
  * Fixed parsing bug for image regions having only one role.

**1.0.3** (2023-04-22):
  * Document how to use the browser build.

**1.0.2** (2023-04-21):
  * Add missing `Buffer` class to the browser build.

**1.0.1** (2023-04-21):
  * Remove dangling imports to Node.js built-in modules (e.g. `fs`) from the
    browser build.

**1.0.0** (2023-04-21):
  * Build `image-display-control-metadata-parser-standalone.min.js` to be served
    by a CDN and used in the browser.

**0.1.0** (2023-04-19):
  * Initial version.
