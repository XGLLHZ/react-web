/**
 * 项目部署到根目录时配置
 */

 const base = '/system/';   //后缀
 const ip = 'localhost:8081';   //后台请求基地址（测试）
//  const ip = 'www.xgllhz.top';   //后台请求基地址（正式）

module.exports = {
    requestUrl: `http://${ ip }`,   //接口请求地址
    publicPath: `${ base }`,   //指向静态资源文件所在的路径
    base: base   //base url
}

