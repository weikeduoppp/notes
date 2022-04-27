#  webpack

先整理问题

打包构建工具.

(转载)所有的代码在[github](https://github.com/Woc12138/Webpack-study)



**Webpack是⼀个打包模块化JavaScript的⼯具，它会从⼊⼝模块出发，识别 出源码中的模块化导⼊语句，递归地找出⼊⼝⽂件的所有依赖，将⼊⼝和其所 有的依赖打包到⼀个单独的⽂件中**.



版本控制很重要.



```json
{
  "name": "day",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "webpack",
    "dev": "webpack --config webpack.dev.config.js",
    "server": "webpack-dev-server"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.7.4",
    "@babel/polyfill": "^7.7.0",
    "@babel/preset-env": "^7.7.4",
    "autoprefixer": "9.7.2",
    "axios": "^0.21.1",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "3.2.0",
    "express": "^4.17.1",
    "file-loader": "^6.2.0",
    "html-webpack-plugin": "^4.5.2",
    "less": "3.10.3",
    "less-loader": "5.0.0",
    "mini-css-extract-plugin": "^0.8.0",
    "postcss-loader": "3.0.0",
    "style-loader": "1.0.0",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0"
  }
}

```





### 默认配置

- webpack默认⽀持JS模块和JSON模块 
- ⽀持CommonJS Es moudule AMD等模块类型 
- webpack4⽀持零配置使⽤,但是很弱，稍微复杂些的场景都需要额外扩 展

```js
// webpack 基于nodeJS
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 使用CommonJS规范导出一个对象
module.exports = {
  entry: "./src/index.js",
  // entry: {"./src/index.js"}, 多个入口是对象
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  mode: "development",
  /* 模块 */
  module: {
    // 不支持的模块 找loader
    rules: [
      {
        // 字体
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              // string / function
              name: "[name]_[hash:8].[ext]",
              // 输出目录
              outputPath: "images",
              // 指定自定义公共路径。 string / function
              // publicPath: "assets",
            },
          },
        ],
      },
      {
        // 字体
        test: /\.woff2$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              // string / function
              name: "[name]_[hash:8].[ext]",
              // 输出目录
              outputPath: "font",
              // 指定自定义公共路径。 string / function
              // publicPath: "assets",
            },
          },
        ],
      },
      {
        test: /\.less$/i,
        // 自右向左,  看loader去github看 可能文档不是最新的
        use: [
          // style-loader v3 也放弃了对 Webpack 4 的支持。
          {
            loader: "style-loader",
            options: {
              // 生成一个style. styleTag: 默认多个
              injectType: "singletonStyleTag",
            },
          },
          // 兼容样式postcss-loader autoprefixer
          // postcss-loader 需要配置postcss.config.js
          // "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: [
    // 插件
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html'
    // }),
  ],
};
```

### bundle分析于实现

#### 实现webpack bundle

babel 原理

- fs拿到文件. 转换成抽象语法树. AST
- 可以AST获取指定内容 查看依赖
- 可以将AST转换成想要的版本(es5, ie8...)
- 根据入口文件依赖递归引入打包的code.



1. 初始化参数

2. 根据入口文件获取所有的依赖模块, 递归所有依赖模块并AST转换成最终code. 

3. 根据入口和模块之间的依赖关系, 依次添加到输出列表

4. 确认输出内容, 根据输出路径和文件名, 写入bundle文件

parser.js 工具函数

```js
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAstSync } = require("@babel/core");

module.exports = {
  getAst(filename) {
    const code = fs.readFileSync(filename, "utf-8");
    // @babel/parser@7.7.4
    return parser.parse(code, {
      // 默认script.  指明模式的代码应解析可以是一个。"script"，"module"或"unambiguous"。默认为"script". "unambiguous"将使 @babel/parser 尝试根据 ES6或语句的存在来猜测。带有 ES6 s 和s 的文件被考虑
      sourceType: "module",
    });
  },
  getDenpendencies(ast, filename) {
    const denpendencies = {};
    // 分析依赖
    traverse(ast, {
      ImportDeclaration({ node }) {
        //  node.source.value 相对路径
        // 想要相对于根目录的路径
        const dirname = path.dirname(filename);
        // linux 路径
        const newPath = "./" + path.posix.join(dirname, node.source.value);
        denpendencies[node.source.value] = newPath;
      },
    });
    return denpendencies;
  },
  // 浏览器支持的Code
  getCode(ast) {
    const { code } = transformFromAstSync(ast, null, {
      presets: ["@babel/preset-env"],
    });
    return code;
  },
};

```

complier.js 编译

```js
const path = require('path')
const fs = require('fs')
const { getAst, getCode, getDenpendencies } = require('./parser')
// 编译
module.exports = class Complier {
  constructor(options) {
    this.entry = options.entry;
    this.output = options.output;
  }

  run() {
    const info = this.build(this.entry);
    this.modules = [info];
    // 遍历添加依赖
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      for (const key in item.denpendencies) {
        if (Object.hasOwnProperty.call(item.denpendencies, key)) {
          this.modules.push(this.build(item.denpendencies[key]));
        }
      }
    }
    this.denpendenciesObj = {}
    this.modules.forEach((d) => {
      this.denpendenciesObj[d.filename] = {
        denpendencies: d.denpendencies,
        code: d.code
      }
    })
    this.exportFile(this.denpendenciesObj);
  }

  build(filename) {
    const ast = getAst(filename);
    const denpendencies = getDenpendencies(ast, filename);
    const code = getCode(ast);
    return {
      filename,
      denpendencies,
      code,
    };
  }
  // 编一个bundle文件
  exportFile(code) {
    console.log(this.output.path, this.output.filename);
    // 出口路径
    const filePath = path.join(this.output.path, this.output.filename); 

    const bundle = `(function(graph) {
      function require(moduleId) {
        function _require(relativePath) {
          return require(graph[moduleId].denpendencies[relativePath])
        }
        var exports = {};
        (function(require, exports, code) {
          eval(code)
        })(_require, exports, graph[moduleId].code)
        return exports;
      }
      require('${this.entry}')
    })(${JSON.stringify(code)})`;
    fs.mkdirSync(this.output.path);
    fs.writeFileSync(filePath, bundle, "utf8");
  }
};

```



### 编译一个loader

- 自下往上 自右往左
- 引入resolveLoader 解决 loader路径
- 生成loaders文件夹
- options属性传参

webpack.config.js 

```js

const path = require("path");
const FileListPlugin = require("./plugins/file-list-plugin.js")

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  mode: "development",
  // 处理loader的路径问题
  resolveLoader: {
    modules: ["node_modules", "./loaders"],
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          // path.resolve(__dirname, "./loaders/addLoader.js"),
          "addLoader",
          {
            // loader: path.resolve(__dirname, "./loaders/replaceLoader.js"),
            loader: "replaceLoader",
            options: {
              name: "kkb",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new FileListPlugin({
      outputFile: "test.md",
    }),
  ],
};

```

loader文件

- loader文件source参数, 进行编辑操作
- loaderUtils插件 获取传参. this.query this指的loader对象
- this.callback 返回多个信息
- this.async 处理异步
- 链式操作

```js
//官⽅推荐处理loader,query的⼯具
const loaderUtils = require("loader-utils");

module.exports = function (source) {
  // console.log(source);
  // console.log(this.query); // options 传参
  const options = loaderUtils.getOptions(this);
  console.log(options);
  // return source.replace("name", options.name);
  const res = source.replace("name", options.name);
  // 如何返回多个信息，不⽌是处理好的源码呢，可以使⽤ this.callback来处理;
  // this.callback(null, res);

  // this.async：如果loader⾥⾯有异步的事情要怎么处理呢
  const callback = this.async();
  setTimeout(() => {
    callback(null, res);
  }, 1000);
  /* 
    this.callback(
      err: Error | null,
      content: string | Buffer,
      sourceMap?: SourceMap,
      ast?: any  // 本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
      );
   */
};

```

另一个loader

```js

module.exports = function (source) {
  console.log(source);
  source = source + "//add";
  return source;
};

```

### 编写一个plugin

https://webpack.docschina.org/contribute/writing-a-plugin/

- plugin是一个类
- 内置apply函数 接受complier参数. 进行钩子操作 
- 构造函数接受options传参
- complier.hooks.钩子事件名.同步(tap)|异步(tapAsync)
- complier钩子https://v4.webpack.docschina.org/api/compiler-hooks/
- compilation.assets编译的资源

/plugins/file-list-plugin.js

```js
// https://webpack.docschina.org/contribute/writing-a-plugin/
class FileListPlugin {
  static defaultOpions = {
    outputFile: 'assets.md'
  };
  constructor(options) {
    this.options = { ...this.defaultOpions, ...options };
  }

  apply(complier) {
    // https://v4.webpack.docschina.org/api/compiler-hooks/
    // 异步钩子emit "生成资源到 output 目录之前。"
    complier.hooks.emit.tapAsync(
      FileListPlugin.name,
      (compilation, callback) => {
        const { assets } = compilation;
        console.log(compilation.assets);
        const content =
          "# In this build:\n\n" +
          Object.keys(assets)
            .map((filename) => `- ${filename}`)
            .join("\n");
        compilation.assets[this.options.outputFile] = {
          source() {
            return content;
          },
          size() {
            return 1000;
          },
        };
        setTimeout(function () {
          console.log("Done with async work...");
          callback();
        }, 1000);
      }
    );
    // 同步钩子
    complier.hooks.thisCompilation.tap(
      FileListPlugin.name,
      (compliation) => {
        // 触发 compilation 事件之前执行
        console.log("触发 compilation 事件之前执行");
      }
    );
  }
}

module.exports = FileListPlugin;
```



webpack.config.js 

```js
const path = require("path");
const FileListPlugin = require("./plugins/file-list-plugin.js")

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  mode: "development",
  // 处理loader的路径问题
  resolveLoader: {
    modules: ["node_modules", "./loaders"],
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          // path.resolve(__dirname, "./loaders/addLoader.js"),
          "addLoader",
          {
            // loader: path.resolve(__dirname, "./loaders/replaceLoader.js"),
            loader: "replaceLoader",
            options: {
              name: "kkb",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new FileListPlugin({
      outputFile: "test.md",
    }),
  ],
};
```

### 是否写过loader 和plugin,面试怎么回答呢

1.如果自己确实没有写过的话，表明原因面试官应该是可以理解的，不过他们其实想要听到的是你了解不了解其中原理，然后知道可以怎么去开发一个 plugin 或者 loader，再好一些的回答呢，可以提出你对它们的思考，这些都是可以增加好感度的；

2、如果自己有写过的话，第一要结合需求来回答，也就是出于什么样的原因要写它们，介绍插件的功能并横向对比市场类似的 plugin 或者 loader，有什么差异或者优势；第二要简洁明了的描述清楚自己是怎么去开发的，或者开发过程中有碰到什么难点自己是如何去思考和处理的。

不论自己是否做过与否，自己能把它们的一些原理说明白，并展现自己对它们是有一些思考的，都是有利于你和面试官交流的。

### hash, chunkhash, contenthash 的区别

hash: 构建依赖. 每次构建生成新的hash值

chunkhash: 当有多个入口的时候, 生成对应模块(chunk)的hash.  使用chunkhash.  一个入口文件的改变不会影响到其他入口文件

contenthash:  每个文件都唯一的contenthash, 只关心内容. 内容没改变contenthash不变 推荐css(MiniCssExtractPlugin)使用, css不变. contenthash不变



## webpack性能优化

- 优化打包速度(构建速度)
  - 提升效率

    - **给loader加include**: 缩小查找范围

    - **添加resolve.modules**: 指定查找第三方库的位置 eg: modules: [path.resolve(__dirname, "./node_modules")],

    - **externals添加cdn隐射**. cdn资源. eg: 把react扔到cdn. html模板引入cdn. 项目开发正常使用import 

    - **合理使用别名 resolve.alias**: 减少查找过程,直接使用打包好的代码. 节省解析时间. eg: alias: {  react: path.resolve(

      ​    __dirname,

      ​    "./node_modules/react/umd/react.production.min.js"

         ) }

    - **speed-measure-webpack-plugin**@1.3.3: 可以测量各个插件和 loader 所花费的时间 分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。简称 SMP

    - **DllPlugin**: 采⽤webpack的 DllPlugin 和 DllReferencePlugin 引⼊dll，**让⼀些基本不会改动的代码先打包成静态资源,避免 反复编译浪费时间**

  - 优化构建速度

    - **HardSourceWebpackPlugin**: 提供中间缓存的作⽤ 第二次构建时间会有较大的节省
    - **thread-loader** 多进程打包

  - 优化压缩速度

    - **webpack-parallel-uglify-plugin** 多线程压缩js

  - 优化使⽤体验
- 优化输出质量(生产环境的质量) 
  - 优化要发布到线上的代码，减少⽤户能感知到的加载时间
  - **提升代码性能**，性能好，执⾏就快
    - **CDN加速**: **output.publicPath** 静态资源配置cdn
    - **压缩css** plugin: `optimize-css-assets-webpack-plugin` `cssnano`
    - **压缩html**: `HtmlWebpackPlugin.minify `
    - **tree shaking 清除无用的css, js**: 
      - css: glob-all@3.2.1 `purify-css@1.2.5` `purifycss-webpack@0.7.0` 
      -  js: `optimization.usedExports`: true 且只有mode: 'production'才生效. 消除副作用: package.json中的 sideEffects: ['*.less', '*.css', '@babel/polyfill'] // 免除消除
    - **代码分割 optimization.splitChunks **: 分离公共文件. 
    - **通过配置 optimization.concatenateModules**: true` ： 开启 Scope Hoisting -- 通过 ES6 语法的静态分析， 分析出模块之间的依赖关系， 尽可能地把模块放到同⼀个函数中。

  

性能优化相关操作:

- loader减少查找范围. 添加include减少查找路径

```js
rules: [
      {
        // 图片
        test: /\.(png|jpe?g|gif)$/i,
        include: path.resolve(__dirname, "./src"),
        use: [
          {
            loader: "file-loader",
            options: {
              // string / function
              name: "[name]_[hash:8].[ext]",
              // 输出目录
              outputPath: "images",
              // 单位: 字节 1024 = 1kb
              // limit:  1024
              // 指定自定义公共路径。 string / function
              // publicPath: "assets",
            },
          },
        ],
      },
  ]
```



- resolve.module 指定查找第三方库的位置
- 优化 resolve.alias 配置

```js
resolve: {
    // 指定查找第三方依赖库的位置
    modules: [path.resolve(__dirname, "./node_modules")],
    alias: {
      // 起别名 减少查找过程.
      /* 
        resolve.alias 配置通过别名来将原导⼊路径映射成⼀个新的导⼊路径
        拿 react 为例， 我们引⼊的 react 库， ⼀般存在两套代码
          - cjs 采⽤ commonJS 规范的模块化代码
          - umd 已经打包好的完整代码， 没有采⽤模块化， 可以直接执⾏
        默认情况下， webpack 会从⼊⼝⽂件 . /node_modules/bin/react/index 开始递归解析和处理依赖 的⽂件。 我们可以直接指定⽂件， 避免这处的耗时。
      */
      "@": path.join(__dirname, "./pages"),
      react: path.resolve(
        __dirname,
        "./node_modules/react/umd/react.production.min.js"
      ),
    },
    // resolve.extensions 在导⼊语句没带⽂件后缀时， webpack 会⾃动带上后缀后， 去尝试查找⽂件是否存在。
    /*
      推荐: 
        - 后缀尝试列表尽量的⼩
        - 导⼊语句尽量的带上后缀。
     */
    extensions: [".js", ".json", ".jsx", ".ts"], // 默认值
  },
```

- externals优化. cdn资源. eg: 把react扔到cdn. html模板引入cdn. 项目开发正常使用import

```js
externals: {
    // 使用场景: 工具库大的时候用.  eg: eChats
    // 全局React
    react: "React",
    lodash: "_",
  },
```

- output.publicPath 静态资源配置cdn

```js
output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]_[hash:8].js",
    // 打包公共路径 配置cdn
    publicPath: "./",
  },
```

- 压缩css plugin: optimize-css-assets-webpack-plugin cssnano

```js
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      // css怎么压缩 => 借助cssnano
      cssProcessor: require("cssnano").CssNano,
      // 相关属性配置
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),
]
```

- 压缩html: HtmlWebpackPlugin.minify 

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
plugins: [
	new HtmlWebpackPlugin({
      title: "test",
      filename: "index.html",
      template: "./src/index.html",
      // 多个入口['chunk name']
      // chunks: ["index", "detail"],
      chunks: ["index"],
      minify: {
        // 压缩 HTML ⽂件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true, // 压缩内联 css
      },
    }),
]
```

- tree shaking 清除无用的css, js(只支持es module引入方式!) 
- 代码分割 optimization.splitChunks: 分离公共文件.
- 作⽤域提升 （ Scope Hoisting ） 是指 webpack 通过 ES6 语法的静态分析， 分析出模块之间的依赖关系， 尽可能地把模块放到同⼀个函数中。

```js
// css tree shaking
const PurifyPlugin = require("purifycss-webpack");
const Glob = require("glob-all");
plugins: [
    new PurifyPlugin({
      paths: Glob.sync([
        path.resolve(process.cwd(), "./src/*.html"),
        path.resolve(process.cwd(), "./src/*.js"),
      ]),
    }),
],
optimization: {
    // 哪些导出的模块被使⽤了， 再做打包
    usedExports: true,
    splitChunks: {
      chunks: "all",, //所有的chunks代码公共的部分分离出来成为⼀个单独的⽂件
      /* 
        
      */
    },
    // Scope Hoisting
    concatenateModules: true,
  },    
```





```js
    - loader减少查找范围. 添加include减少查找路径

    - resolve.module 指定查找第三方库的位置
    
    - 优化 resolve.alias 配置
    
    - resolve.extensions 在导⼊语句没带⽂件后缀时， webpack 会⾃动带上后缀后， 去尝试查找⽂件是否存在。
    
    - externals优化. cdn资源. eg: 把react扔到cdn. html模板引入cdn. 项目开发正常使用import

    - output.publicPath 静态资源配置cdn
    
    - 压缩css plugin: optimize-css-assets-webpack-plugin cssnano
    
    - 压缩html HtmlWebpackPlugin.minify 

    - tree shaking 清除无用的css, js(只支持es module引入方式!) 
      - css: glob-all@3.2.1 purify-css@1.2.5 purifycss-webpack@0.7.0 
      - js: optimization.usedExports: true 且只有mode: 'production'才生效. 消除副作用: package.json中的 sideEffects: ['*.less', '*.css', '@babel/polyfill'] // 免除消除

    - 代码分割 optimization.splitChunks  // https://webpack.js.org/plugins/split-chunks-plugin/  
      - 预获取/预加载 https://webpack.docschina.org/guides/code-splitting/#bundle-analysis 
        - prefetch(预获取)：将来某些导航下可能需要的资源 浏览器空闲时间获取
        - preload(预加载)：当前导航下可能需要资源 并行加载
        
    - 作⽤域提升 （ Scope Hoisting ） 是指 webpack 通过 ES6 语法的静态分析， 分析出模块之间的依赖关系， 尽可能地把模块放到同⼀个函数中。
      - 通过配置 optimization.concatenateModules=true 来开启 Scope Hoisting

    - speed-measure-webpack-plugin@1.3.3: 可以测量各个插件和 loader 所花费的时间

    - 打包后的模块依赖关系分析 webpack-bundle-analyzer@3.8.0

    - DllPlugin打包稳定(版本号不常变的)第三方类库 预先编译  优化开发体验 提升构建速度, 不会减少打包后的体积
		- 在 Webpack5 (内置)中已经不⽤它了， ⽽是 ⽤ HardSourceWebpackPlugin hard-source-webpack-plugin@0.13.1
    - happypack@5.0.1 多线程打包 推荐项目复杂度高的.
```

## 从源码窥探Webpack4.x原理

[文章](https://juejin.cn/post/6844904046294204429#heading-0)

1. 初始化webpack入口文件, 启动webpack-cli. webpack-cli做了什么

   1. 引入 yargs，对命令行进行定制
   2. 分析命令行参数，对各个参数进行转换，组成编译配置项 options
   3. 引用webpack，根据配置项进行编译和构建

2. webpack执行构建流程, compiler实例化.

   ```js
   // node_modules/webpack/lib/webpack.js
   const webpack = (options, callback) => {
       ...
       options = new WebpackOptionsDefaulter().process(options);
       compiler = new Compiler(options.context);
       // 清除缓存。
       new NodeEnvironmentPlugin().apply(compiler);
       ... // 将所有的配置options参数转换成webpack内部插件。
       compiler.options = new WebpackOptionsApply().process(options, compiler);
       ... // 默认配置
       webpack.WebpackOptionsDefaulter = WebpackOptionsDefaulter;
       // 将所有的配置options参数转换成webpack内部插件
       webpack.WebpackOptionsApply = WebpackOptionsApply;
       ...
       webpack.NodeEnvironmentPlugin = NodeEnvironmentPlugin;
   }
   ```

3. 通过`EntryOptionPlugin`插件进行参数校验。通过`WebpackOptionsDefaulter`将传入的参数和默认参数进行合并成为新的options，创建compiler，以及相关plugin，最后通过 `WebpackOptionsApply`将所有的配置options参数转换成Webpack内部插件。(加载所有配置的插件)
4. 判断是否watch. 启动`compiler.run`来构建文件.
5. 实例化`Compilation`对象, 进入make阶段. 从Entry读取文件.根据文件类型.和loader配置进行编译. 再找出依赖文件, 递归的编译和解析.
6. `seal`阶段也做了大量的的优化工作，进行了hash的创建以及对内容进行生成(`createModuleAssets`)。
7. emit阶段 将输出内容输出到磁盘.

### 总结

Webpack在启动阶段对配置参数和命令行参数以及默认参数进行了合并，并进行了插件的初始化工作。完成初始化的工作后调用Compiler的`run`开启Webpack编译构建过程，构建主要流程包括`compile`、`make`、`build`、`seal`、`emit`等阶段。

### webpack的构建流程

​	`初始化参数`  ==> `开始编译(实例化Compiler)` ==> `从入口编译模块(loader翻译)` ==> `根据模块之间的依赖关系组装成一个个Chunk` ===> `将Chunk转化成文件输出`

1. `初始化参数`: 启动构建, 读取并合并配置参数, 
2. `开始编译`: 根据参数实例化Compiler对象. 加载所有配置的插件,  执行run方法开始编译.
3. `从入口编译模块`: 从入口文件出发. 使用loader对模块进行翻译. 找出该模块的依赖模块, 再递归本步骤直到所有模块被loader翻译. 并得到了每个模块被翻译后的最终内容以及它们之间的 依赖关系；
4. `根据模块之间的依赖关系组装成一个个包含多个模块的Chunk` : 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表.
5. `将Chunk转化成文件输出`: 根据配置的输出路径和文件名. 将Chunk输出到文件系统.

## webpack 面试题

### 1.有哪些常见的Loader？你用过哪些Loader？

- `file-loader`:  处理图片字体
- `css-loader` `style-loader` `less-loader` `postcss-loader`: 处理css
- `babel-loader`: es6转换es5
- `thread-loader`: 对其后面的loader（这里是babel-loader）开启多进程打包。 
- `ts-loader`: 将 TypeScript 转换成 JavaScript
- `eslint-loader`
- `tslint-loader`
- `i18n-loader`: 国际化
- `image-loader`：加载并且压缩图片文件
- `cache-loader`: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里

### 2.有哪些常见的Plugin？你用过哪些Plugin？

- `HtmlWebpackPlugin`

- `CleanWebpackPlugin` 清空上次打包  构建前清空

  - cleanOnceBeforeBuildPatterns: [

    ​    "\**/\*",

    ​    "!dll/ \**", // 排除!某文件 !dll/**

       ]

- `MiniCssExtractPlugin` : 提取css到单独文件

- `HardSourceWebpackPlugin`:  提供缓存. 提升二次构建速度

- `OptimizeCssAssetsWebpackPlugin`: 压缩css

- `PurifyPlugin`: tree sharking 清除无用的css

- `SpeedMeasurePlugin`: 测量各个loader花费的时间

- `BundleAnalyzerPlugin`: 分析各个模块大小 `webpack-bundle-analyzer`

- `DLLPlugin` 和 `DLLReferencePlugin` 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。

- `ParallelUglifyPlugin` 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码

  

### 3. 那你再说一说Loader和Plugin的区别？

Loader: 是个函数. 在这函数接受内容进行转换, 返回转换后的结果. 因为webpack只认识javascript. loader成翻译官, 对其他类型的资源进行转译的预处理工作。

Plugin: 是个插件. 基于事件流框架`Tapable`, 可以扩张webpack功能. 在webpack生命周期中会广播很多事件钩子. plugin可以监听这些钩子, 在合适的时机通过webpack的api改变输出结果.

loader在module.rules配置. 类型是数组.里面是每个对象. test, use ,[loader,options]等属性.

plugin在plugins配置. 类型数组. 每一项是一个plugin的实例.参数用过构造函数传入.

### 4.Webpack构建流程简单说一下

`初始化参数`  ==> `开始编译(实例化Compiler)` ==> `从入口编译模块(loader翻译)` ==> `根据模块之间的依赖关系组装成一个个Chunk` ===> `将Chunk转化成文件输出`

1. `初始化参数`: 启动构建, 读取并合并配置参数, 
2. `开始编译`: 根据参数实例化Compiler对象. 加载所有配置的插件,  执行run方法开始编译.
3. `从入口编译模块`: 从入口文件出发. 使用loader对模块进行翻译. 找出该模块的依赖模块, 再递归本步骤直到所有模块被loader翻译. 得到了每个模块被翻译后的最终内容以及它们之间的 依赖关系；
4. `根据模块之间的依赖关系组装成一个个包含多个模块的Chunk` : 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表.
5. `将Chunk转化成文件输出`: 根据配置的输出路径和文件名. 将Chunk输出到文件系统.

### 5.使用webpack开发时，你用过哪些可以提高效率的插件？

- `HardSourceWebpackPlugin` 中间缓存.
- `webpack-merge`: 提取公用模块.减少重复配置代码
- `HotModuleReplacementPlugin`: 模块热替换
- `speed-measure-webpack-plugin`: SMP 分析各个loader花费的时间. 有助于找到构建过程中的性能瓶颈。
- `Dll-plugin` 拆分一般不改动的第三库.

### 6.source map是什么？生产环境怎么用？

source map是构建后的文件和源代码的映射.  map文件只要不打开开发者工具，浏览器是不会加载的。

`source map` 是将编译、打包、压缩后的代码映射回源代码的过程。**打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map**。

线上环境一般有三种处理方案：

- `sourcemap`：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)
- `hidden-source-map`：借助第三方错误监控平台 Sentry 使用
- `nosources-source-map`：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高

### 7. 模块打包原理知道吗？

Webpack 实际上为每个模块创造了一个可以导出和导入的环境，本质上并没有修改 代码的执行逻辑，代码执行顺序与模块加载顺序也完全一致

### 8. 文件监听原理呢？

**轮询判断文件的最后编辑时间是否变化**，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 `aggregateTimeout` 后再执行。

```js
module.export = {
    // 默认false,也就是不开启
    watch: true,
    // 只有开启监听模式时，watchOptions才有意义
    watchOptions: {
        // 默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行，默认300ms
        aggregateTimeout:300,
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
        poll:1000
    }
}
```

Webpack开启监听模式，有两种方式：

- 启动 webpack 命令时，带上 --watch 参数
- 在配置 webpack.config.js 中设置 watch:true

### 9. 说一下 Webpack 的热更新原理吧

HMR: 可以不刷新浏览器将变更的模块替换掉旧的模块.

**HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，

- 客户端与WDS(`wepack-dev-server`)连接了一个webSocket. 
- 当本地文件修改了. WDS会向浏览器发起推送携带最新的hash. 
- 浏览器与旧资源比对后, 发起ajax请求向wds获取更新列表hash值, 
- 借助这些信息通过jsonp获取新的模块代码. 
- 后续部分交给hotModulePlugin进行新旧模块对⽐.决定是 否更新模块.

细节: https://zhuanlan.zhihu.com/p/30669007

### 10. 如何对bundle体积进行监控和分析？

- webpack-bundle-analyzer
- vscode插件 Impost Cost 对引入模块的大小进行实时监测
- `bundlesize` 工具包可以进行自动化资源体积监控

### 11. 文件指纹是什么？怎么用？

文件指纹是打包后输出的文件名的后缀。

- hash: 整个构建有关. 唯一hash
- chunkhash: 根据每个入口文件生成不同的chunkhash. 
- contenthash: 根据每个文件生成不同的contenthash.

js 设置 chunkhash: 

```js
module.exports = {
    entry: {
        app: './scr/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path:__dirname + '/dist'
    }
}
```

css 设置 contenthash: 

```js
module.exports = {
  module: {
      rules: [
          {
              test: '/\.css$/i',
              use: [{
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                      // 生成一个style. styleTag: 默认多个
                      injectType: "singletonStyleTag",
                  },
              },
                   'css-loader'
              ]
              
          }
      ]
  },
  plugins: [
      new MiniCssExtractPlugin({
          filename: "[name]_[contenthash:8].css",
      })
  ]
}
```

图片文件设置 hash

### 12. 在实际工程中，配置文件上百行乃是常事，如何保证各个loader按照预想方式工作？

可以使用 `enforce` 强制执行 `loader` 的作用顺序，`pre` 代表在所有正常 loader 之前执行，`post` 是所有 loader 之后执行.

### 13. 如何优化 Webpack 的构建速度？

- 缩小搜索范围. 

  - 添加include或exclude.
  - 指定第三方路径 resolve.modules
  - resolve.extensions 减少后缀尝试的可能性

- 给耗时长的loader加thread-loader, 开启多线程构建.

- 添加HardSourceWebpackPlugin. 缓存. 优化二次构建时间.

- 合理使用别名. resolve.alias

- 使用高版本的node和webpack.

- 压缩代码使用多线程压缩

  - 多进程并行压缩
    - webpack-paralle-uglify-plugin
    - uglifyjs-webpack-plugin 开启 parallel 参数 (不支持ES6)
    - terser-webpack-plugin 开启 parallel 参数
  - 通过 mini-css-extract-plugin 提取 Chunk 中的 CSS 代码到单独文件，通过 css-loader 的 minimize 选项开启 cssnano 压缩 CSS。

- Tree shaking
  - 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的bundle中去掉(只能对ES6 Modlue生效) 开发中尽可能使用ES6 Module的模块，提高tree shaking效率
  - 禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking
  - 使用 PurifyCSS(不在维护) 或者 uncss 去除无用 CSS 代码
    - purgecss-webpack-plugin 和 mini-css-extract-plugin配合使用(建议)
  
- `提取页面公共资源`：

  - 基础包分离：
    - 使用 html-webpack-externals-plugin，将基础包通过 CDN 引入，不打入 bundle 中
    - 使用 SplitChunksPlugin 进行(公共脚本、基础包、页面公共文件)分离(Webpack4内置) ，替代了 CommonsChunkPlugin 插件

### 14. 你刚才也提到了代码分割，那代码分割的本质是什么？有什么意义呢？

代码分割的本质是为了缓存，按需加载. 即所谓的性能优化！

大的项目, 所有代码放在一个文件显然是不够有效的.

- 多页面应用
  - 为了「提取公共依赖」，即「把几个页面之中都用到的依赖给打包为一个单独文件。」

>   A 依赖 C B依赖C  加载A页面和C页面的时候，都需要下载C.  把所有页面公有的依赖都给提取出来，然后搞成一个单独的文件（假设为D） A页面加载完D，那么B页面加载D的时候，直接拿缓存即可！

- 单页面应用
  - 为了「减少文件体积，拆分应用」, 即 「把需要异步加载的内容改成异步加载。」--- 按需加载

> 假如A页面有C、D这两个模块，而C、D我们并不是马上就用到它的，为了减少文件体积，提高首屏响应速度，于是我们就把C、D这两个模块异步地拆分出来，然后需要C、D模块的时候，再加载进来，这样一来，首屏的加载速度就会快很多！
>
> 这个东西的应用场景：路由懒加载，或者说是按需加载.

 **所以一般这么打包**

1）多页面应用

> 主业务代码+公共依赖（C模块、D模块……）+第三方包（jQuery、lodash……）+webpack运行代码

2）单页面应用

> 主业务代码+异步模块+第三方包+webpack运行代码

我们所知的打包：

vue-cli：app.js是入口文件，vendor.js是第三方包，mainfest.js 则是webpack运行代码，如果做了路由的异步加载，那么还会有异步包！

> 注意：单页面应用里边不存在公共模块的问题，只存在异步的问题，毕竟就只有一个页面，然后这些模块都只加载一次！

### 15.是否写过Loader？简单描述一下编写loader的思路？

loader支持链式调用. 遵循单一原则. 每个loader只负责自己需要负责的事情.

- Loader 运行在 Node.js 中，我们可以调用任意 Node.js 自带的 API 或者安装第三方模块进行调用
- Webpack 传给 Loader 的原内容都是 UTF-8 格式编码的字符串，当某些场景下 Loader 处理二进制文件时，需要通过 exports.raw = true 告诉 Webpack 该 Loader 是否需要二进制数据
- 尽可能的异步化 Loader，如果计算量很小，同步也可以
- Loader 是无状态的，我们不应该在 Loader 中保留状态
- 使用 loader-utils 和 schema-utils 为我们提供的实用工具
- 加载本地 Loader 方法
  - Npm link
  - ResolveLoader

### 16.是否写过Plugin？简单描述一下编写Plugin的思路？

webpack在生命周期会广播许多事件. Plugin 可以监听这些事件，在特定的阶段钩子添加想要的自定义功能。eg: 输出文件列表信息.md文件 监听异步钩子emit "生成资源到 output 目录之前。"

Webpack 的 Tapable 事件流机制保证了插件的有序性，使得整个系统扩展性良好。

- compiler 暴露了和 Webpack 整个生命周期相关的钩子
- compilation 暴露了与模块和依赖有关的粒度更小的事件钩子
- 插件需要在其原型上绑定apply方法，才能访问 compiler 实例
- 传给每个插件的 compiler 和 compilation对象都是同一个引用，若在一个插件中修改了它们身上的属性，会影响后面的插件
- 找出合适的事件点去完成想要的功能
  - emit 事件发生时，可以读取到最终输出的资源、代码块、模块及其依赖，并进行修改(emit 事件是修改 Webpack 输出资源的最后时机)
  - watch-run 当依赖的文件发生变化时会触发
- 异步的事件需要在插件处理完任务时调用回调函数通知 Webpack 进入下一个流程，不然会卡住

### 17. Loader和Plugin的不同？

loader:  Webpack将⼀切⽂件视为模块，但是webpack原⽣是只能解析js⽂件，如果想将其他⽂件 也打包的话，就会⽤到 loader 。 loader是让webpack能加载和解析非js文件.

plugin:  可以扩展webpack的功能, 让webpack具有更多的灵活性。 在 Webpack 运⾏的⽣命 周期中会⼴播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

不同的用法:

- loader: module.rules里配置. 类型是数组. 每一项是个object. ⾥⾯描述了对于什么类型的⽂件（ test ），使⽤什么加载( loader )和使⽤的参数（ options ）

- Plugin在 plugins 中单独配置。 类型为数组，每⼀项是⼀个 plugin 的实例，参数都通过构造函数传⼊。

### 18.聊一聊Babel原理吧

大多数JavaScript Parser遵循 `estree` 规范，Babel 最初基于 `acorn` 项目(轻量级现代 JavaScript 解析器) Babel大概分为三大部分：

- 解析：将文件转换成 AST
  - 词法分析：将代码(字符串)分割为token流，即语法单元成的数组
  - 语法分析：分析token流(上面生成的数组)并生成 AST
- 转换：访问 AST 的节点进行变换操作生产新的 AST
  - [Taro](https://github.com/NervJS/taro/blob/master/packages/taro-transformer-wx/src/index.ts#L15)就是利用 babel 完成的小程序语法转换
- 生成：以新的 AST 为基础生成代码, 新文件

### 19.如何⽤webpack来优化前端性能？

⽤webpack优化前端性能是指优化webpack的输出结果，让打包的最终结果在浏览器运⾏快速⾼效. 

- **CDN加速**: **output.publicPath** 静态资源配置cdn
- **压缩css** plugin: `optimize-css-assets-webpack-plugin` `cssnano`
- **压缩html**: `HtmlWebpackPlugin.minify ` 
- `ParallelUglifyPlugin` 来**压缩JS⽂件**
- **tree shaking 清除无用的css, js**: 
  - css: glob-all@3.2.1 `purify-css@1.2.5` `purifycss-webpack@0.7.0` 
  - js: `optimization.usedExports`: true 且只有mode: 'production'才生效. 消除副作用: package.json中的 sideEffects: ['*.less', '*.css', '@babel/polyfill'] // 免除消除
- **代码分割 optimization.splitChunks **: 分离公共文件. 
- **通过配置 optimization.concatenateModules**: true` ： 开启 Scope Hoisting --- 通过 ES6 语法的静态分析， 分析出模块之间的依赖关系， 尽可能地把模块放到同⼀个函数中。

### 20.如何提⾼webpack的打包速度?

- 耗时大loader使用**thread-loader 多线程编译, cache-loader 开启缓存**
- **hardSourceWebpackPlugin, 提供缓存**, 大大减少二次构建耗时
- **缩小⽂件搜索范围**. 
  - 给loader添加include或exclude.指定路径
  - 指定第三方库的路径 resolve.modules
- 使用 ParallelUglifyPlugin **多线程压缩**
- **配置externals**, 将常用第三方库脱离webpack打包.
- **DllPlugin** 采⽤webpack的 DllPlugin 和 DllReferencePlugin 引⼊dll，让⼀些基本不会改动的代码先打包成静态资源,避免 反复编译浪费时间





# 一、Webpack 简介

## 1.1 webpack 是什么

webpack 是一种**前端资源构建工具**，一个静态模块打包器(module bundler)。

在webpack 看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理。
它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

## 1.2 webpack 五个核心概念

#### 1.2.1 Entry

入口(Entry)：指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

#### 1.2.2 Output

输出(Output)：指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

#### 1.2.3 Loader

Loader：让 webpack 能够去处理那些非 JS 的文件，比如样式文件、图片文件(webpack 自身只理解
JS)

#### 1.2.4 Plugins

插件(Plugins)：可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，
一直到重新定义环境中的变量等。

#### 1.2.5 Mode

模式(Mode)：指示 webpack 使用相应模式的配置。

| 选项        | 描述                                                         | 特点                       |
| ----------- | :----------------------------------------------------------- | -------------------------- |
| development | 会将 DefinePlugin  中 process.env.NODE_ENV  的值设置为 development。启用 NamedChunksPlugin  和 NamedModulesPlugin。 | 能让代码本地调试运行的环境 |
| production  | 会将 DefinePlugin  中 process.env.NODE_ENV  的值设置为 production。启用 FlagDependencyUsagePlugin,  FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。 | 能让代码优化上线运行的环境 |

# 二、Webpack 初体验

## 2.1 初始化配置

1. 初始化 package.json：npm init

2. 下载安装webpack：(webpack4以上的版本需要全局/本地都安装webpack-cli)

   全局安装：cnpm i  webpack webpack-cli -g

   本地安装：cnpm i webpack webpack-cli -D

## 2.2 编译打包应用

创建 src 下的 js 等文件后，不需要配置 webpack.config.js 文件，在命令行就可以编译打包。

指令：

- 开发环境：webpack ./src/index.js -o ./build/built.js --mode=development

  webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js 整体打包环境，是开发环境

- 生产环境：webpack ./src/index.js -o ./build/built.js --mode=production

  webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js 整体打包环境，是生产环境

结论：

1. webpack 本身能处理 js/json 资源，不能处理 css/img 等其他资源

2. 生产环境和开发环境将 ES6 模块化编译成浏览器能识别的模块化，但是不能处理 ES6 的基本语法转化为 ES5（需要借助 loader）

3. 生产环境比开发环境多一个压缩 js 代码

# 三、Webpack 开发环境的基本配置

webpack.config.js 是 webpack 的配置文件。

作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）

所有构建工具都是基于 nodejs 平台运行的，模块化默认采用 commonjs。

开发环境配置主要是为了能让代码运行。主要考虑以下几个方面：

- 打包样式资源
- 打包 html 资源
- 打包图片资源
- 打包其他资源
- devServer

下面是一个简单的开发环境webpack.confg.js配置文件

```javascript
// resolve用来拼接绝对路径的方法
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引用plugin

module.exports = {
  // webpack配置
  entry: './src/js/index.js', // 入口起点
  output: {
    // 输出
    // 输出文件名
    filename: 'js/build.js',
    // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'), // 输出路径，所有资源打包都会输出到这个文件夹下
  },
  // loader配置
  module: {
    rules: [
      // 详细的loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上，依次执行(先执行css-loader)
          // style-loader：创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // css-loader：将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader',
          // less-loader：将less文件编译成css文件，需要下载less-loader和less
          'less-loader'
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // url-loader：处理图片资源，问题：默认处理不了html中的img图片
        test: /\.(jpg|png|gif)$/,
        // 需要下载 url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理，优点：减少请求数量（减轻服务器压力），缺点：图片体积会更大（文件请求速度更慢）
          // base64在客户端本地解码所以会减少服务器压力，如果图片过大还采用base64编码会导致cpu调用率上升，网页加载时变卡
          limit: 8 * 1024,
          // 给图片重命名，[hash:10]：取图片的hash的前10位，[ext]：取文件原来扩展名
          name: '[hash:10].[ext]',
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是conmonjs，解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          outputPath: 'imgs',
        },
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader',
      },
      // 打包其他资源(除了html/js/css资源以外的资源)
      {
        // 排除html|js|css|less|jpg|png|gif文件
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        // file-loader：处理其他文件
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  // plugin的配置
  plugins: [
    // html-webpack-plugin：默认会创建一个空的html文件，自动引入打包输出的所有资源（JS/CSS）
    // 需要有结构的HTML文件可以加一个template
    new HtmlWebpackPlugin({
      // 复制这个./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html',
    }),
  ],
  // 模式
  mode: 'development', // 开发模式
  // 开发服务器 devServer：用来自动化，不用每次修改后都重新输入webpack打包一遍（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出（不会像之前那样在外面看到打包输出的build包，而是在内存中，关闭后会自动删除）
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
}
```

其中，大部分配置都在注释中给出解释。

- 运行项目的两个指令：
  webpack 会将打包结果输出出去（build文件夹）
     npx webpack-dev-server 只会在内存中编译打包，没有输出

- loader 和 plugin 的不同：（plugin 一定要先引入才能使用）

    loader：1. 下载 2. 使用（配置 loader）

    plugins：1.下载 2. 引入 3. 使用

# 四、Webpack 生产环境的基本配置

而生产环境的配置需要考虑以下几个方面：

- 提取 css 成单独文件
- css 兼容性处理
- 压缩 css
- js 语法检查
- js 兼容性处理
- js 压缩
- html 压缩

下面是一个基本的生产环境下的webpack.config.js配置

```javascript
const { resolve } = require('path')
const MiniCssExtractorPlugin = require('mini-css-extract-plugin')
const OptimiziCssAssetsWebpackPlugin = require('optimizi-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义node.js的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

// 复用loader的写法
const commonCssLoader = [
  // 这个loader取代style-loader。作用：提取js中的css成单独文件然后通过link加载
  MiniCssExtractPlugin.loader,
  // css-loader：将css文件整合到js文件中
  // 经过css-loader处理后，样式文件是在js文件中的
  // 问题：1.js文件体积会很大2.需要先加载js再动态创建style标签，样式渲染速度就慢，会出现闪屏现象
  // 解决：用MiniCssExtractPlugin.loader替代style-loader
  'css-loader',
  /*
    postcss-loader：css兼容性处理：postcss --> 需要安装：postcss-loader postcss-preset-env
    postcss需要通过package.json中browserslist里面的配置加载指定的css兼容性样式
    在package.json中定义browserslist：
    "browserslist": {
      // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
      "development": [ // 只需要可以运行即可
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ],
      // 生产环境。默认是生产环境
      "production": [ // 需要满足绝大多数浏览器的兼容
        ">0.2%",
        "not dead",
        "not op_mini all"
      ]
    },
  */
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss', // 基本写法
      plugins: () => [
        // postcss的插件
        require('postcss-preset-env')(),
      ],
    },
  },
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      },
      /*
        正常来讲，一个文件只能被一个loader处理
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
        先执行eslint再执行babel（用enforce）
      */
      {
        /*
          js的语法检查： 需要下载 eslint-loader eslint
          注意：只检查自己写的源代码，第三方的库是不用检查的
          airbnb(一个流行的js风格) --> 需要下载 eslint-config-airbnb-base eslint-plugin-import
          设置检查规则：
            package.json中eslintConfig中设置
              "eslintConfig": {
                "extends": "airbnb-base"， // 继承airbnb的风格规范
                "env": {
                  "browser": true // 可以使用浏览器中的全局变量(使用window不会报错)
                }
              }
        */
        test: /\.js$/,
        exclude: /node_modules/, // 忽略node_modules
        enforce: 'pre', // 优先执行
        loader: 'eslint-loader',
        options: {
          // 自动修复
          fix: true,
        },
      },
      /*
        js兼容性处理：需要下载 babel-loader @babel/core @babel/core: babel功能函数
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill
            问题：只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
          3. 需要做兼容性处理的就做：按需加载  --> core-js
      */
      {
        // 第三种方式：按需加载
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎样的兼容性处理
          presets: [
            '@babel/preset-env', // 基本预设
            {
              useBuiltIns: 'usage', //按需加载
              corejs: { version: 3 }, // 指定core-js版本
              targets: { // 指定兼容到什么版本的浏览器
                chrome: '60',
                firefox: '50',
                ie: '9',
                safari: '10',
                edge: '17'
              },
            },
          ],
        },
      },
      {
        // 图片处理
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false, // 关闭url-loader默认使用的es6模块化解析
        },
      },
      // html中的图片处理
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // 处理其他文件
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css',
    }),
    // 压缩css
    new OptimiziCssAssetsWebpackPlugin(),
    // HtmlWebpackPlugin：html文件的打包和压缩处理
    // 通过这个插件会自动将单独打包的样式文件通过link标签引入
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  // 生产环境下会自动压缩js代码
  mode: 'production',
}
```

# 五、Webpack 优化配置

## 5.1 开发环境性能优化

### 5.1.1 HMR（模块热替换）

HMR: hot module replacement 热模块替换 / 模块热替换

作用：一个模块发生变化，只会重新打包构建这一个模块（而不是打包所有模块） ，极大提升构建速度

代码：只需要在 devServer 中设置 hot 为 true，就会自动开启HMR功能（只能在开发模式下使用）

```javascript
devServer: {
  contentBase: resolve(__dirname, 'build'),
  compress: true,
  port: 3000,
  open: true,
  // 开启HMR功能
  // 当修改了webpack配置，新配置要想生效，必须重启webpack服务
  hot: true
}
```

每种文件实现热模块替换的情况：

- 样式文件：可以使用HMR功能，因为开发环境下使用的 style-loader 内部默认实现了热模块替换功能

- js 文件：默认不能使用HMR功能（修改一个 js 模块所有 js 模块都会刷新）

  --> 实现 HMR 需要修改 js 代码（添加支持 HMR 功能的代码）

  ```javascript
  // 绑定
  if (module.hot) {
    // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
    module.hot.accept('./print.js', function() {
      // 方法会监听 print.js 文件的变化，一旦发生变化，只有这个模块会重新打包构建，其他模块不会。
      // 会执行后面的回调函数
      print();
    });
  }
  ```

  注意：HMR 功能对 js 的处理，只能处理非入口 js 文件的其他文件。

- html 文件: 默认不能使用 HMR 功能（html 不用做 HMR 功能，因为只有一个 html 文件，不需要再优化）

  使用 HMR 会导致问题：html 文件不能热更新了（不会自动打包构建）

  解决：修改 entry 入口，将 html 文件引入（这样 html 修改整体刷新）

  ```javascript
  entry: ['./src/js/index.js', './src/index.html']
  ```

### 5.1.2 source-map

source-map：一种提供**源代码到构建后代码的映射**的技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

参数：`[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`

代码：

```javascript
devtool: 'eval-source-map'
```

可选方案：[生成source-map的位置|给出的错误代码信息]

- source-map：外部，错误代码准确信息 和 源代码的错误位置
- inline-source-map：内联，只生成一个内联 source-map，错误代码准确信息 和 源代码的错误位置

- hidden-source-map：外部，错误代码错误原因，但是没有错误位置（为了隐藏源代码），不能追踪源代码错误，只能提示到构建后代码的错误位置
- eval-source-map：内联，每一个文件都生成对应的 source-map，都在 eval 中，错误代码准确信息 和 源代码的错误位
- nosources-source-map：外部，错误代码准确信息，但是没有任何源代码信息（为了隐藏源代码）
- cheap-source-map：外部，错误代码准确信息 和 源代码的错误位置，只能把错误精确到整行，忽略列
- cheap-module-source-map：外部，错误代码准确信息 和 源代码的错误位置，module 会加入 loader 的 source-map

内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

开发/生产环境可做的选择：

**开发环境**：需要考虑速度快，调试更友好

- 速度快( eval > inline > cheap >... )

  1. eval-cheap-souce-map

  2. eval-source-map

- 调试更友好 

  1. souce-map

  2. cheap-module-souce-map

  3. cheap-souce-map

**最终得出最好的两种方案 --> eval-source-map（完整度高，内联速度快） / eval-cheap-module-souce-map（错误提示忽略列但是包含其他信息，内联速度快）**

**生产环境**：需要考虑源代码要不要隐藏，调试要不要更友好

- 内联会让代码体积变大，所以在生产环境不用内联

- 隐藏源代码
  1. nosources-source-map 全部隐藏
  2. hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

**最终得出最好的两种方案 --> source-map（最完整） / cheap-module-souce-map（错误提示一整行忽略列）**

## 5.2 生产环境性能优化

### 5.2.1 优化打包构建速度

#### 5.2.1.1 oneOf

oneOf：匹配到 loader 后就不再向后进行匹配，优化生产环境的打包构建速度

代码：

```javascript
module: {
  rules: [
    {
      // js 语法检查
      test: /\.js$/,
      exclude: /node_modules/,
      // 优先执行
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        fix: true
      }
    },
    {
      // oneOf 优化生产环境的打包构建速度
      // 以下loader只会匹配一个（匹配到了后就不会再往下匹配了）
      // 注意：不能有两个配置处理同一种类型文件（所以把eslint-loader提取出去放外面）
      oneOf: [
        {
          test: /\.css$/,
          use: [...commonCssLoader]
        },
        {
          test: /\.less$/,
          use: [...commonCssLoader, 'less-loader']
        },
        {
          // js 兼容性处理
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {version: 3},
                  targets: {
                    chrome: '60',
                    firefox: '50'
                  }
                }
              ]
            ]
          }
        },
        {
          test: /\.(jpg|png|gif)/,
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            name: '[hash:10].[ext]',
            outputPath: 'imgs',
            esModule: false
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          exclude: /\.(js|css|less|html|jpg|png|gif)/,
          loader: 'file-loader',
          options: {
            outputPath: 'media'
          }
        }
      ]
    }
  ]
},
```

#### 5.2.1.2 babel 缓存

**babel 缓存**：类似 HMR，将 babel 处理后的资源缓存起来（哪里的 js 改变就更新哪里，其他 js 还是用之前缓存的资源），让第二次打包构建速度更快

代码：

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: { version: 3 },
          targets: {
            chrome: '60',
            firefox: '50'
          }
        }
      ]
    ],
    // 开启babel缓存
    // 第二次构建时，会读取之前的缓存
    cacheDirectory: true
  }
},
```

**文件资源缓存**

  文件名不变，就不会重新请求，而是再次用之前缓存的资源

 1.hash: 每次 wepack 打包时会生成一个唯一的 hash 值。

    问题：重新打包，所有文件的 hsah 值都改变，会导致所有缓存失效。（可能只改动了一个文件）

 2.chunkhash：根据 chunk 生成的 hash 值。来源于同一个 chunk的 hash 值一样

    问题：js 和 css 来自同一个chunk，hash 值是一样的（因为 css-loader 会将 css 文件加载到 js 中，所以同属于一个chunk）

 3.contenthash: 根据文件的内容生成 hash 值。不同文件 hash 值一定不一样(文件内容修改，文件名里的 hash 才会改变)

修改 css 文件内容，打包后的 css 文件名 hash 值就改变，而 js 文件没有改变 hash 值就不变，这样 css 和 js 缓存就会分开判断要不要重新请求资源 --> 让代码上线运行缓存更好使用

#### 5.2.1.3 多进程打包

多进程打包：某个任务消耗时间较长会卡顿，多进程可以同一时间干多件事，效率更高。

优点是提升打包速度，缺点是每个进程的开启和交流都会有开销（babel-loader消耗时间最久，所以使用thread-loader针对其进行优化）

```javascript
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    /* 
      thread-loader会对其后面的loader（这里是babel-loader）开启多进程打包。 
      进程启动大概为600ms，进程通信也有开销。(启动的开销比较昂贵，不要滥用)
      只有工作消耗时间比较长，才需要多进程打包
    */
    {
      loader: 'thread-loader',
      options: {
        workers: 2 // 进程2个
      }
    },
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: { version: 3 },
              targets: {
                chrome: '60',
                firefox: '50'
              }
            }
          ]
        ],
        // 开启babel缓存
        // 第二次构建时，会读取之前的缓存
        cacheDirectory: true
      }
    }
  ]
},
```

#### 5.2.1.4 externals

externals：让某些库不打包，通过 cdn 引入

webpack.config.js 中配置：

```javascript
externals: {
  // 拒绝jQuery被打包进来(通过cdn引入，速度会快一些)
  // 忽略的库名 -- npm包名
  jquery: 'jQuery'
}
```

需要在 index.html 中通过 cdn 引入：

```html
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
```




#### 5.2.1.5 dll

dll：让某些库单独打包，后直接引入到 build 中。可以在 code split 分割出 node_modules 后再用 dll 更细的分割，优化代码运行的性能。

webpack.dll.js 配置：(将 jquery 单独打包)

```javascript
/*
  node_modules的库会打包到一起，但是很多库的时候打包输出的js文件就太大了
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
  当运行webpack时，默认查找webpack.config.js配置文件
  需求：需要运行webpack.dll.js文件
    --> webpack --config webpack.dll.js（运行这个指令表示以这个配置文件打包）
*/
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery] --> 要打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    // 输出出口指定
    filename: '[name].js', // name就是jquery
    path: resolve(__dirname, 'dll'), // 打包到dll目录下
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个manifest.json --> 提供jquery的映射关系（告诉webpack：jquery之后不需要再打包和暴露内容的名称）
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
};
```

webpack.config.js 配置：(告诉 webpack 不需要再打包 jquery，并将之前打包好的 jquery 跟其他打包好的资源一同输出到 build 目录下)

```javascript
// 引入插件
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// plugins中配置：
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, 'dll/manifest.json')
  }),
  // 将某个文件打包输出到build目录下，并在html中自动引入该资源
  new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname, 'dll/jquery.js')
  })
],
```

### 5.2.2 优化代码运行的性能

#### 5.2.2.1 缓存

#### 5.2.2.2 tree shaking（树摇）

 tree shaking：去除无用代码

前提：1. 必须使用 ES6 模块化 2. 开启 production 环境 （这样就自动会把无用代码去掉）

作用：减少代码体积

在 package.json 中配置：

`"sideEffects": false` 表示所有代码都没有副作用（都可以进行 tree shaking）

这样会导致的问题：可能会把 css / @babel/polyfill 文件干掉（副作用）

所以可以配置：`"sideEffects": ["*.css", "*.less"]` 不会对css/less文件tree shaking处理

#### 5.2.2.3 code split（代码分割）

代码分割。将打包输出的一个大的 bundle.js 文件拆分成多个小文件，这样可以并行加载多个文件，比加载一个文件更快。

1.多入口拆分

```javascript
entry: {
    // 多入口：有一个入口，最终输出就有一个bundle
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
```

2.optimization：

```javascript
optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```

- 将 node_modules 中的代码单独打包（大小超过30kb）
- 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk(比如两个模块中都引入了jquery会被打包成单独的文件)（大小超过30kb）

3.import 动态导入语法：

```javascript
/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包(test文件不会和index打包在同一个文件而是单独打包)
  webpackChunkName:指定test单独打包后文件的名字
*/
import(/* webpackChunkName: 'test' */'./test')
  .then(({ mul, count }) => {
    // 文件加载成功~
    // eslint-disable-next-line
    console.log(mul(2, 5));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  });
```

#### 5.2.2.4 lazy loading（懒加载/预加载）

1.懒加载：当文件需要使用时才加载（需要代码分割）。但是如果资源较大，加载时间就会较长，有延迟。

2.正常加载：可以认为是并行加载（同一时间加载多个文件）没有先后顺序，先加载了不需要的资源就会浪费时间。

3.预加载 prefetch（兼容性很差）：会在使用之前，提前加载。等其他资源加载完毕，浏览器空闲了，再偷偷加载这个资源。这样在使用时已经加载好了，速度很快。所以在懒加载的基础上加上预加载会更好。

代码：

```javascript
document.getElementById('btn').onclick = function() {
  // 将import的内容放在异步回调函数中使用，点击按钮，test.js才会被加载(不会重复加载)
  // webpackPrefetch: true表示开启预加载
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
  import('./test').then(({ mul }) => {
    console.log(mul(2, 5))
  })
};
```

#### 5.2.2.5 pwa（离线可访问技术）

pwa：离线可访问技术（渐进式网络开发应用程序），使用 serviceworker 和 workbox 技术。优点是离线也能访问，缺点是兼容性差。

webpack.config.js 中配置：

```javascript
const WorkboxWebpackPlugin = require('workbox-webpack-plugin'); // 引入插件

// plugins中加入：
new WorkboxWebpackPlugin.GenerateSW({
  /*
    1. 帮助serviceworker快速启动
    2. 删除旧的 serviceworker

    生成一个 serviceworker 配置文件
  */
  clientsClaim: true,
  skipWaiting: true
})
```

index.js 中还需要写一段代码来激活它的使用：

```javascript
/*
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
    "env": {
      "browser": true // 支持浏览器端全局变量
    }
  2. sw代码必须运行在服务器上
    --> nodejs
    或-->
      npm i serve -g
      serve -s build 启动服务器，将打包输出的build目录下所有资源作为静态资源暴露出去
*/
if ('serviceWorker' in navigator) { // 处理兼容性问题
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js') // 注册serviceWorker
      .then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}
```

# 六、Webpack 配置详情

## 6.1 entry

entry: 入口起点

1. string --> './src/index.js'，单入口

   打包形成一个 chunk。 输出一个 bundle 文件。此时 chunk 的名称默认是 main

2. array --> ['./src/index.js', './src/add.js']，多入口

   所有入口文件最终只会形成一个 chunk，输出出去只有一个 bundle 文件。

   （一般只用在 HMR 功能中让 html 热更新生效）

3. object，多入口

   有几个入口文件就形成几个 chunk，输出几个 bundle 文件，此时 chunk 的名称是 key 值

--> 特殊用法：

```javascript
entry: {
  // 最终只会形成一个chunk, 输出出去只有一个bundle文件。
  index: ['./src/index.js', './src/count.js'], 
  // 形成一个chunk，输出一个bundle文件。
  add: './src/add.js'
}
```

## 6.2 output

```javascript
output: {
  // 文件名称（指定名称+目录）
  filename: 'js/[name].js',
  // 输出文件目录（将来所有资源输出的公共目录）
  path: resolve(__dirname, 'build'),
  // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
  publicPath: '/',
  chunkFilename: 'js/[name]_chunk.js', // 指定非入口chunk的名称
  library: '[name]', // 打包整个库后向外暴露的变量名
  libraryTarget: 'window' // 变量名添加到哪个上 browser：window
  // libraryTarget: 'global' // node：global
  // libraryTarget: 'commonjs' // conmmonjs模块 exports
},
```

## 6.3 module

```javascript
module: {
  rules: [
    // loader的配置
    {
      test: /\.css$/,
      // 多个loader用use
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.js$/,
      // 排除node_modules下的js文件
      exclude: /node_modules/,
      // 只检查src下的js文件
      include: resolve(__dirname, 'src'),
      enforce: 'pre', // 优先执行
      // enforce: 'post', // 延后执行
      // 单个loader用loader
      loader: 'eslint-loader',
      options: {} // 指定配置选项
    },
    {
      // 以下配置只会生效一个
      oneOf: []
    }
  ]
},
```

## 6.4 resolve

```javascript
// 解析模块的规则
resolve: {
  // 配置解析模块路径别名: 优点：当目录层级很复杂时，简写路径；缺点：路径不会提示
  alias: {
    $css: resolve(__dirname, 'src/css')
  },
  // 配置省略文件路径的后缀名（引入时就可以不写文件后缀名了）
  extensions: ['.js', '.json', '.jsx', '.css'],
  // 告诉 webpack 解析模块应该去找哪个目录
  modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
}
```

这样配置后，引入文件就可以这样简写：`import '$css/index';`

## 6.5 dev server

```javascript
devServer: {
  // 运行代码所在的目录
  contentBase: resolve(__dirname, 'build'),
  // 监视contentBase目录下的所有文件，一旦文件变化就会reload
  watchContentBase: true,
  watchOptions: {
    // 忽略文件
    ignored: /node_modules/
  },
  // 启动gzip压缩
  compress: true,
  // 端口号
  port: 5000,
  // 域名
  host: 'localhost',
  // 自动打开浏览器
  open: true,
  // 开启HMR功能
  hot: true,
  // 不要显示启动服务器日志信息
  clientLogLevel: 'none',
  // 除了一些基本信息外，其他内容都不要显示
  quiet: true,
  // 如果出错了，不要全屏提示
  overlay: false,
  // 服务器代理，--> 解决开发环境跨域问题
  proxy: {
    // 一旦devServer(5000)服务器接收到/api/xxx的请求，就会把请求转发到另外一个服务器3000
    '/api': {
      target: 'http://localhost:3000',
      // 发送请求时，请求路径重写：将/api/xxx --> /xxx （去掉/api）
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
```

其中，跨域问题：同源策略中不同的协议、端口号、域名就会产生跨域。

正常的浏览器和服务器之间有跨域，但是服务器之间没有跨域。代码通过代理服务器运行，所以浏览器和代理服务器之间没有跨域，浏览器把请求发送到代理服务器上，代理服务器替你转发到另外一个服务器上，服务器之间没有跨域，所以请求成功。代理服务器再把接收到的响应响应给浏览器。这样就解决开发环境下的跨域问题。

## 6.6 optimization

contenthash 缓存会导致一个问题：修改 a 文件导致 b 文件 contenthash 变化。
因为在 index.js 中引入 a.js，打包后 index.js 中记录了 a.js 的 hash 值，而 a.js 改变，其重新打包后的 hash 改变，导致 index.js 文件内容中记录的 a.js 的 hash 也改变，从而重新打包后 index.js 的 hash 值也会变，这样就会使缓存失效。（改变的是a.js文件但是 index.js 文件的 hash 值也改变了）
解决办法：runtimeChunk --> 将当前模块记录其他模块的 hash 单独打包为一个文件 runtime，这样 a.js 的 hash 改变只会影响 runtime 文件，不会影响到 index.js 文件

```javascript
output: {
  filename: 'js/[name].[contenthash:10].js',
  path: resolve(__dirname, 'build'),
  chunkFilename: 'js/[name].[contenthash:10]_chunk.js' // 指定非入口文件的其他chunk的名字加_chunk
},
optimization: {
  splitChunks: {
    chunks: 'all',
    /* 以下都是splitChunks默认配置，可以不写
    miniSize: 30 * 1024, // 分割的chunk最小为30kb（大于30kb的才分割）
    maxSize: 0, // 最大没有限制
    minChunks: 1, // 要提取的chunk最少被引用1次
    maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量为5
    maxInitialRequests: 3, // 入口js文件最大并行请求数量
    automaticNameDelimiter: '~', // 名称连接符
    name: true, // 可以使用命名规则
    cacheGroups: { // 分割chunk的组
      vendors: {
        // node_modules中的文件会被打包到vendors组的chunk中，--> vendors~xxx.js
        // 满足上面的公共规则，大小超过30kb、至少被引用一次
        test: /[\\/]node_modules[\\/]/,
        // 优先级
        priority: -10
      },
      default: {
        // 要提取的chunk最少被引用2次
        minChunks: 2,
        prority: -20,
        // 如果当前要打包的模块和之前已经被提取的模块是同一个，就会复用，而不是重新打包
        reuseExistingChunk: true
      }
    } */
  },
  // 将index.js记录的a.js的hash值单独打包到runtime文件中
  runtimeChunk: {
    name: entrypoint => `runtime-${entrypoint.name}`
  },
  minimizer: [
    // 配置生产环境的压缩方案：js/css
    new TerserWebpackPlugin({
      // 开启缓存
      cache: true,
      // 开启多进程打包
      parallel: true,
      // 启用sourceMap(否则会被压缩掉)
      sourceMap: true
    })
  ]
}
```

# 七、Webpack5 介绍和使用

此版本重点关注以下内容:

- 通过持久缓存提高构建性能.
- 使用更好的算法和默认值来改善长期缓存.

- 通过更好的树摇和代码生成来改善捆绑包大小.

- 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改.

- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5.

## 下载

npm i webpack@next webpack-cli -D

## 自动删除 Node.js Polyfills

早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

- 尽可能尝试使用与前端兼容的模块。

- 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

Chunk 和模块 ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

```javascript
chunkIds: "deterministic", moduleIds: "deterministic"
```

## Chunk ID

你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的

webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了

## Tree Shaking

1. webpack 现在能够处理对嵌套模块的 tree shaking

```javascript
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';
export { inner };

// user.js
import * as module from './module';
console.log(module.inner.a);
```

在生产环境中, inner 模块暴露的 `b` 会被删除

2. webpack 现在能够多个模块之前的关系

```javascript
import { something } from './something';

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`

3. webpack 现在能处理对 Commonjs 的 tree shaking

## Output

webpack 4 默认只能输出 ES5 代码

webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.

如：`output.ecmaVersion: 2015`

SplitChunk

```javascript
// webpack4
minSize: 30000;
// webpack5
minSize: {
  javascript: 30000,
  style: 50000,
}
```

## Caching

```javascript
// 配置缓存
cache: {
  // 磁盘存储
  type: "filesystem",
  buildDependencies: {
    // 当配置修改时，缓存失效
    config: [__filename]
  }
}
```

缓存将存储到 `node_modules/.cache/webpack`

## 监视输出文件

之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

## 默认值

- `entry: "./src/index.js`

- `output.path: path.resolve(__dirname, "dist")`

- `output.filename: "[name].js"`

## 更多内容

[github](https://github.com/webpack/changelog-v5)

# 参考

[尚硅谷2020最新版Webpack5实战教程(从入门到精通)](https://www.bilibili.com/video/BV1e7411j7T5?p=1)