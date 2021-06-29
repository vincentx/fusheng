import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/bundle.min.cjs.js',
    format: 'cjs',
  },
  plugins: [
    resolve({
      exportConditions: ['node']
    }),
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
