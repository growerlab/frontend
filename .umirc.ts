import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/base',
      routes: [
        { path: '/', component: './index' },
        { path: '/register', component: './register' },
        { path: '/activate_user/:code', component: './activate_user' },
        { path: '/login', component: './login' },
        // user
        { path: '/user/', component: './user/index' },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'Rethinking Git',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8080',
  //     pathRewrite: { '^/api': '' },
  //     changeOrigin: true,
  //   },
  // },
};

export default config;
