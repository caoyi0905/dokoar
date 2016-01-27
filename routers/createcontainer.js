var render=require('../views.js');
var container=require('../models/createcontainer.js');

exports.get = function *(){
    this.body = yield render('createcontainer',{
        title   :   'Create Container',
    });
}

exports.post = function *() {
    let opts=this.body.opts;
    if(!opts){
        //NULL
    }
    else{
        let containerId=container.createContainer(opts);
        this.body=render('containers');
    }
}