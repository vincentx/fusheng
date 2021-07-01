import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
// import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/bundle.min.cjs.js',
    format: 'cjs',
  },
  context: 'this',
  plugins: [
    resolve({
      exportConditions: ['node']
    }),
    babel(),
    commonjs(),
    json(),
    // terser()
  ],
}
