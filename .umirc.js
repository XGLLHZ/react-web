/**
 * 项目配置文件
 */

// import webpackplugin from './src/config/plugin';   //插件配置
import global from './src/config/global';   //url
import routes from './src/routers/index';   //路由

//插件
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'react-web',
      dll: false,
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
    }
  ]
];

export default {
  //指定 react-router 的base，部署到非根目录时需要配置
  base: global.base,
  //指向静态资源文件所在的路径
  publicPath: global.publicPath,
  //插件
  plugins,
  // default chrome: 49, firefox: 45, safari: 10, edge: 13, ios: 10
  //兼容
  targets: {
    ie: 11
  },
  //路由
  routes: routes,
  //代理
  proxy: {
    '/api': {
      target: global.requestUrl,
      changeOrigin: true,
      pathRewrite: { '^/api': 'api' }
    }
  },
  //通过 webpack-chain 的 API 扩展或修改 webpack 配置。
  // chainWebpack: webpackplugin,
  //禁止redirect上提
  disableRedirectHoist: true,
  //忽略 moment 的 locale 文件，用于减少尺寸
  ignoreMomentLocale: true,
  //配置主题，实际上是配置less变量，支持对象和字符串两种类型
  theme: {
    'primary-color': 'red'
  },
  //配置后会生成 manifest.json，option 传给 https://www.npmjs.com/package/webpack-manifest-plugin
  manifest: {
    basePath: '/',
  },
  //给 less-loader 的额外配置项
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  //给 css-loader 的额外配置项 
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = antdProPath
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
}


