/*
 * config file for nei server command
 * @author 
 * Auto build by NEI Builder
 */
var path = require('path');

module.exports = {
    /* 根目录 */
    webRoot: __dirname + '/../public/',
    /* 视图目录 */
    viewRoot: __dirname + '/../public/html/',
    /* 路由 */
    routes: {
      "ALL /api/*": "http://59.111.99.234/",
      "GET /captcha": "http://59.111.99.234/",
      "GET /uploads/:filename": "http://59.111.99.234/",
      "GET /works/detail/:id": { name: '作品详情页面', index: 0, list: [{"id":13096,"path":"works/detail"}] },
      "GET /works/create": { name: '作品创建页面', index: 0, list: [{"id":13081,"path":"works/create"}] },
      "GET /works": { name: '作品列表页面', index: 0, list: [{"id":13079,"path":"works/list"}] },
      // "GET /uploads/:filename": { path: 'get/uploads/_/filename/data', id: 36427, group: '图画',isFile: true },
      "GET /search": { name: '搜索结果页面', index: 0, list: [{"id":13080,"path":"search"}] },
      "GET /index": { name: '首页', index: 0, list: [{"id":13078,"path":"index"}] },
      // "GET /captcha": { path: 'get/captcha/data', id: 29450, group: '验证码',isFile: true },
      // "POST /api/works?upload": { path: 'post/api/works/_/upload/data', id: 28719, group: '作品' },
      //       "PATCH /api/works/:id": { path: 'patch/api/works/_/id/data', id: 28580, group: '作品' },
      //       "DELETE /api/works/:id": { path: 'delete/api/works/_/id/data', id: 28581, group: '作品' },
      //       "GET /api/works/:id": { path: 'get/api/works/_/id/data', id: 28577, group: '作品' },
      //       "POST /api/works": { path: 'post/api/works/data', id: 28579, group: '作品' },
      //       "GET /api/works": { path: 'get/api/works/data', id: 28578, group: '作品' },
      //       "POST /api/users?unfollow": { path: 'post/api/users/_/unfollow/data', id: 28971, group: '用户' },
      //       "GET /api/users?getstarlist": { path: 'get/api/users/_/getstarlist/data', id: 30936, group: '用户' },
      //       "GET /api/users?getloginuser": { path: 'get/api/users/_/getloginuser/data', id: 29446, group: '用户' },
      //       "POST /api/users?follow": { path: 'post/api/users/_/follow/data', id: 28970, group: '用户' },
      //       "GET /api/tags?recommend": { path: 'get/api/tags/_/recommend/data', id: 35276, group: '标签' },
      //       "POST /api/register": { path: 'post/api/register/data', id: 28507, group: '用户' },
      //       "POST /api/logout": { path: 'post/api/logout/data', id: 28525, group: '用户' },
      //       "POST /api/login": { path: 'post/api/login/data', id: 28516, group: '用户' },
          },
    /* 注入给页面的模型数据的服务器配置 */
    // modelServer: {
    //     // 完整的主机地址，包括协议、主机名、端口
    //     host: '',
    //     // 查询参数，键值对
    //     queries: {},
    //     // 自定义请求头，键值对
    //     headers: {},
    //     // path 可以是字符串，也可以是函数；默认不用传，即使用 host + 页面path + queries 的值
    //     // 如果是函数，则使用函数的返回值，传给函数的参数 options 是一个对象，它包含 host、path（页面path）、queries、headers 等参数
    //     // 如果 path 的值为假值，则使用 host + 页面path + queries 的值；
    //     // 如果 path 的值是相对地址，则会在前面加上 host
    //     // path: '',
    // },
    /* api 响应头 */
    apiResHeaders: {
    },
    /* 是否自动打开浏览器 */
    launch: true,
    /* 自动打开的页面地址 */
    openUrl: '',
    /* 端口 */
    port: 8002,
    /* 是否使用 https 协议，设为true的时候表示启用 */
    https: false,
    /* 是否使用 nei 提供的在线 mock 数据 */
    online: false,
    /* 是否监听静态文件和模板文件的变化并自动刷新浏览器 */
    reload: true,
    /* 文件监听的选项 */
    watchingFiles: {
        /* 需要即时编译的文件, 前提是 reload 为 true */
        compilers: {
            /* 值为 mcss 的配置选项, 默认为 false，即不编译 mcss 文件 */
            mcss: false
        },
        /* 不用监听的文件，支持通配符 */
        //ignored: '**/*.css'
    },
    /* 项目的 key */
    projectKey: 'e389c52125abdd607c4455e4d448e5d3',
    /* 同步模块mock数据路径 */
    mockTpl: __dirname + '/../mock.data/template/',
    /* 异步接口mock数据路径 */
    mockApi: __dirname + '/../mock.data/interface/',
    /* 模板后缀 */
    viewExt: '.html',
    /* 模板引擎 */
    engine: 'ejs',
    /* 打开下面的 fmpp 配置，可以在模板中调用自定义 jar 包中的类 */
    //fmpp: {
    //    /* 存放自定义 jar 的目录, 绝对路径 */
    //    jarDir: '',
    //    /* 暴露给模板的类实例名称和 jar 中的类名(带包名)的对应关系 */
    //    jarConfig: {
    //        [暴露给模板的类实例名称]: [类名] // 比如: HighlightUtil: 'yueduutil.HighlightUtil'
    //    }
    //}
};