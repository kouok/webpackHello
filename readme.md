<a href="https://www.npmjs.com/">
    <img src="https://img.shields.io/badge/npm-%3E5.6.0-green.svg">
</a>
<a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/node.js-%3E8.11-green.svg" alt="install size">
</a>
<a href="https://www.webpackjs.com/">
    <img src="https://img.shields.io/badge/webpack-%3E4.17-blue.svg" alt="install size">
</a>

# 从零开始通过node.js和webpack构建移动端项目（基于webpack+node.js的移动端或PC端模板项目）

本Demo分为两部分：

第一部分为基础部分，也就是搭建除vue以外的项目，该项目支持：热启动、自动刷新、`npm install` `npm start` 支持在项目中使用 css、less、css背景图、导入图标字体。

第二部分开始则为vue部分，请移步到该链接下载查看：[从零开始通过node.js和webpack构建vue项目](https://github.com/kouok/webpackHelloVue)

### 快速安装启动

1. 下载到本地

    `$ git clone https://github.com/kouok/webpackHello.git`

2. 安装依赖包

    `$ cnpm install`

3. 开启服务器和自动刷新（热启动）

    `$ cnpm start`

4. 如果需要生成dist目录，请执行以下命令

    `$ cnpm build`

5. 大功告成！

    现在你可以在src中做任何修改，比如在index.html中新增代码，在css、less中增删改查都可以不用刷新的在浏览器中看到效果了。

## 使用node.js+webpack 4从零开始构建一个项目

基础的webpack项目已经成功可以通过热更新实现模板页+css解析+less解析+JS打包+node模块+图标字体

webpack的webpack.config.js需要到webpack官网复制粘贴，然后根据配置要求，再粘贴对应的代码过来。

然后通过npm  init 创建 package.json

注意：每个项目都应该有个readme.md，这样当你将包发布到npm或github上时，则会自动生成一个描述页面。

所以在开始导入vue前先将基本框架准备好：

1. 首先在webpack.config.js中配置好所需要的模块，比如要导入webpack、html-webpack-plugin模块和下载各种loader:style-loader,css-loader,less-loader,less

2. 在package.json中安装以上模块并添加`--save-dev`写入各种依赖

3. 如果项目中需要使用css图片和字体图标，想让webpack也跟着一起打包，需要引入 `url-loader` 和 `file-loader`并且通过 `cnpm install url-loader file-loader --save-dev`写入到package.json中，然后在配置中，像配置css那样，匹配所有的图片+字体图标。比如：
    ```
    { test: /\.(png|jpg|gif|ttf|eot|woff|svg)$/, use:[{
          loader: 'url-loader',
          options:{
            limit:8192
          }
      }]
    ```
    注意：在index.html模板页使用并没有显示图片，路径依然不对，除非写成`../src/asset/图片名称` ,因为该loader处理的是放css的图片，如果要在HTML中也以平常的img src导入图片，需要下载`html-withimg-loader` 或者将图片放到src的外层目录`static`

4. 通过`cnpm install` 安装依赖包，再通过`npm start`构建项目并开启服务器在浏览器中打开项目

注意：虽然你已经全局安装了webpack，但是因为启用了热更新，该更新需要不断的通过webpack自动构建，所以还需要在当前项目中局部安装一次webpack并且写入到package.json中。

当然我们还可以push到github上，记得忽略node_mudule文件夹

## 注意事项

1. 线上不应该包含node_modules，dist文件夹，开发工具生成的目录和npm的日志文件，所以在提交前，应该要忽略它们，方法如下：

    在根目录下新建一个`.gitignore`的文件名,如果要忽略文件夹，则在该文件内添加文件夹的名字，如果是文件则写后缀，如果是所有的后缀，则可以写*.后缀名等。注意：需要将该文件也要提交。

    以下为一份忽略名单：

    ```
    # 忽略node_modules和dist文件夹
    node_modules
    dist

    # Editor directories and files
    .idea
    .vscode
    *.suo
    *.ntvs*
    *.njsproj
    *.sln
    *.sw*

    # Log files
    npm-debug.log*
    ```


2. 如果误提交了本地文件夹到线上，想要删除线上的文件夹或文件，可以通过以下指令进行删除，且切断本地与远程的关联，相当于是加入了.gitignore
    删除文件：`git rm -r --cached 文件路径/文件名.txt`
    删除文件夹：`git rm -r --cached 文件夹名`

3. 因为使用了热启动，所以构建时并不会在项目文件夹中生成dist目录，该目录一直在内存中被读取。那么如何生成dist目录呢？可参考如下方法。

    + 安装webpack-merge `npm install --save-dev webpack-merge`
    + 将原本的webpack.config.js拆分为3个配置文件：

        ```
        webpack-demo
        |- package.json
        - |- webpack.config.js
        + |- webpack.common.js
        + |- webpack.dev.js
        + |- webpack.prod.js
        ```
        原始的webpack.config.js和三个配置文件见：Backup中的同名文件

    + 修改package.json文件的script部分：

        ```
        "scripts": {
        - "start": "webpack-dev-server --open",
        + "start": "webpack-dev-server --open --config webpack.dev.js",
        - "build": "webpack"
        + "build": "webpack --config webpack.prod.js"
        },
        ```

        原始的package.json和新的package.json见Backup文件夹中的同名文件

    + 如果页面太多，会导致生成的dist目录混乱，这时，可以使用 `npm install clean-webpack-plugin --save-dev` 自动清理dist目录，具体用法：[https://webpack.docschina.org/guides/output-management/](https://webpack.docschina.org/guides/output-management/)

    + 更多请查看：[生产环境构建](https://webpack.docschina.org/guides/production/)

4. 注意：如果构建时报错，错误信息类似于'这看起来不是npm的问题'时，十有八九是因为依赖包有问题，可以将node_modules文件夹删除再重新通过`cnpm install`安装然后构建