# 从零开始通过node.js和webpack构建移动端项目（基于webpack+node.js的移动端或PC端模板项目）

本Demo分为两部分：

第一部分为基础部分，也就是搭建除vue以外的项目，该项目支持：热启动、自动刷新、`npm install` `npm start` 支持在项目中使用 css、less、css背景图、导入图标字体。

第二部分开始则为vue部分，请移步到该链接下载查看：[从零开始通过node.js和webpack构建vue项目](https://github.com/kouok/webpackHelloVue)

## 可以基于已经构建好的基础的webpack项目再添加vue的配置

基础的webpack项目已经成功可以通过热更新实现模板页+css解析+less解析+JS打包+node模块

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