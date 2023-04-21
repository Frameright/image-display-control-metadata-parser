// Notes:
// * this is **not** tsdx's rollup config. This is a separate rollup config
//   used to build a standalone bundle to be served from a CDN.
// * inspired from
//   https://github.com/Frameright/image-display-control-web-component/blob/main/image-display-control/rollup.config.mjs

// Import rollup plugins
import { copy } from '@web/rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import summary from 'rollup-plugin-summary';
import commonjs from '@rollup/plugin-commonjs';

export default {
  plugins: [
    // Resolve bare module specifiers to relative paths
    resolve({
      preferBuiltins: true,
    }),
    // Minify JS
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    // Print bundle summary
    summary(),
    // Optional: copy any static assets to build directory
    copy({
      patterns: [],
    }),
    // See https://stackoverflow.com/questions/71698891/rollup-js-can-not-detect-default-exports-when-trying-to-build-component-library
    commonjs({
      ignore: ['fs', 'path', 'events'],
    }),
  ],
  input: './standalone-entrypoint.js',
  output: {
    file: './dist/image-display-control-metadata-parser-standalone.min.js',
  },
  preserveEntrySignatures: 'strict',
};
