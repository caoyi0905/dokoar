var render=require('../views.js');
var containers=require('../models/containers.js');

exports.get = function *(){
    var stat = yield containers.stat();
    this.body = yield render('containers',{
        title   :   'Containers',
        stat    :   stat
    });
}

exports.post = function *() {
    this.body = yield render('containers',{
        title:'Containers'
    });
}