/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment */
import pkg from './package.json';
import ts from 'rollup-plugin-ts';
import del from 'rollup-plugin-delete';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import autoExternal from 'rollup-plugin-auto-external';
import copy from 'rollup-plugin-copy';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    del({ targets: 'dist/*' }),
    resolve(),
    commonjs(),
    copy({
      targets: [{ src: 'schemas', dest: 'dist/schemas' }],
    }),
    ts({
      tsconfig: 'tsconfig.build.json',
    }),
    autoExternal(),
  ],
  external: ['ajv/dist/2020'],
};
