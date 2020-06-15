import path from 'path';

import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import svg from 'rollup-plugin-vue-inline-svg';
import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'TagerAdminLayout',
      globals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        '@tager/admin-services': 'adminServices',
        '@tager/admin-ui': 'adminUi',
      },
    },
    {
      file: 'dist/index.min.js',
      format: 'iife',
      name: 'TagerAdminLayout',
      globals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        '@tager/admin-services': 'adminServices',
        '@tager/admin-ui': 'adminUi',
      },
    },
  ],
  external: [
    'vue',
    'vue-router',
    '@tager/admin-services',
    '@tager/admin-ui',
    '@babel/runtime',
  ],
  plugins: [
    alias({
      entries: [
        {
          find: /^@\/(.*)$/,
          replacement: `${path.resolve(__dirname, 'src')}/$1`,
        },
      ],
    }),
    resolve({ extensions: ['.js', '.css', '.svg', '.vue'] }),
    commonjs(),
    svg({ svgoConfig: { plugins: [{ removeViewBox: false }] } }),
    vue(),
    babel({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime'],
      babelHelpers: 'runtime',
    }),
  ],
};
