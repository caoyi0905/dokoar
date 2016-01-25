var render=require('../views.js');
var containers=require('../models/containers.js');

exports.get = function *(){
    this.body = yield render('containers',{
        title   :   'Containers',
    });
}

exports.post = function *() {
    this.body = yield containers.stat();
}