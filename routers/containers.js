var render=require('../views.js');
var container=require('../models/setcontainer.js');

exports.get = function *(){
    this.body = yield render('containers',{
        title   :   'Containers',
    });
}

exports.post = function *() {
    this.body = yield container.all();
}