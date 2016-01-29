var container=require('../models/createcontainer.js');

exports.get = function *(){
    yield this.render('createcontainer',{
        title   :   'Create Container',
        user    :   this.session.user
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
                statusCode  :   200,
                Id          :   containerId
            };
        }
        catch (e){
            console.log("ERR",JSON.stringify(e))
            this.body=e;
        }
    }
}