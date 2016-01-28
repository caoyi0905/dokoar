var render=require('../views.js');
var container=require('../models/createcontainer.js');

exports.get = function *(){
    this.body = yield render('createcontainer',{
        title   :   'Create Container',
    });
}

exports.post = function *() {
    let opts=this.request.body.opts;
    if(!opts){
        //NULL
    }
    else{
        try{
            let containerId=yield container.createContainer(opts);
            this.body=yield {
                Id:containerId
            };
        }
        catch (err){
            this.body=yield {
                err:err
            };
        }
    }
}