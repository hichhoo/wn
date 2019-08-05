// ref: https://umijs.org/config/

const {NODE_ENV} = process.env;

export default {
  treeShaking: true,
  publicPath: './',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: '微醺',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
  define: {
    NODE_ENV
  },
  history: 'hash',
  targets: {safari: 9, ios: 9},
  hash: true,
  proxy: {
    '/app': {
      target: 'https://test.winewishing.com',
      changeOrigin: true,
      pathRewrite: {"^/": ""}
    },
  },
}
