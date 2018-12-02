var module_a=require('./a');
var module_b=require('./b');

module_a.fun(5);

module_b.fun();

console.log("我是common.js");

// module.exports={
    //假设不需要导出本模块到其他模块使用，则可以不写exports命令
// }