var render=require('../views.js');
var dockers=require('../models/dockers.js');

exports.get = function *(){
    var stat = yield dockers.stat();
    this.body = yield render('dockers',{
        title   :   'Dockers',
        stat    :   stat
    });
}

exports.post = function *() {
    this.body = yield render('dockers',{
        title:'Dockers'
    });
}