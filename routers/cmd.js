var cmder=require('../models/cmder.js');
var render=require('../views.js');

exports.get = function *(){
    this.body = yield render('cmder',{
        title:'Cmder'
    });
}

exports.post = function *() {
    //var Res=yield cmder.run(this.request.body.cmd);
    //this.body = Res.stderr ||　Res.stdout;
}