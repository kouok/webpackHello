// import  common from './js/common';
const  common =require('./js/common'); //导入模块不管用的是import还是require都能正常使用
// 将项目中需要的css和less导入到入口文件中：
import style from './css/style.css';
// 导入字体样式
require("./css/iconfont.css");
// 在这里，不管使用ES6的import还是node.js的require都能正常导入模块
require("./less/common.less")

console.log("我是主入口文件");
// 至此，所有的基础部分均已经导入完毕