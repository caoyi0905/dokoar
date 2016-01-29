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
            console.log(JSON.stringify(containerId))
            this.body=yield {
                statusCode  :   200,
                Id          :   containerId
            };
        }
        catch (e){
            console.log("ERR",JSON.stringify(e))
            this.body=e
        }
    }
}