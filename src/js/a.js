var num=10;

function fun(a){
    console.log(a+num+"从common.js中传了个变量过来,我是a.js");
}

module.exports={
    fun
}