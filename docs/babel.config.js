const path = require('path');
const fse = require('fs-extra');

const errorCodesPath = path.resolve(__dirname, './public/static/error-codes.json');

const alias = {
  docs: '../node_modules/@mui/monorepo/docs',
  'docs-base': './',
};

const { version: transformRuntimeVersion } = fse.readJSONSync(
  require.resolve('@babel/runtime-corejs2/package.json'),
);

module.exports = {
  // TODO: Enable once nextjs uses babel 7.13
  // assumptions: {
  //   noDocumentAll: true,
  // },
  presets: [
    // backport of https://github.com/vercel/next.js/pull/9511
    [
      'next/babel',
      {
        'preset-react': { runtime: 'automatic' },
        'transform-runtime': { corejs: 2, version: transformRuntimeVersion },
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-macros',
      {
        muiError: {
          errorCodesPath,
        },
      },
    ],
    [
      'babel-plugin-module-resolver',
      {
        alias,
        transformFunctions: ['require', 'require.context'],
      },
    ],
    'babel-plugin-optimize-clsx',
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    production: {
      plugins: [
        '@babel/plugin-transform-react-constant-elements',
        ['babel-plugin-react-remove-properties', { properties: ['data-mui-test'] }],
        ['babel-plugin-transform-react-remove-prop-types', { mode: 'remove' }],
      ],
    },
  },
};
