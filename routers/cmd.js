var cmder=require('../models/cmder.js');

exports.get = function *(){
    yield this.render('cmder',{
        title   :   'Cmder',
        user    :   this.session.user
    });
}

exports.post = function *() {
    var Res=yield cmder.run(this.request.body.cmd);
    this.body = Res.stderr ||　Res.stdout;
}