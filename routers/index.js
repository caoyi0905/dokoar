var render=require('../views.js');

exports.get = function *(){
    this.body = yield render('index',{
        title:'Index'
    });
}

exports.post = function *() {
    this.body = yield render('index',{
        title:'Index'
    });
}