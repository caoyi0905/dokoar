var render=require('../views.js');
var api=require('../models/setcontainer.js');

async function success(){
    return '1';
}

exports.post =function *() {
    var opt=this.request.body.opt;
    var Id=this.request.body.Id;
    if(opt=="pause"){
        yield api.pauseContainer(Id);
        this.body=yield success();
    }else if(opt=="unpause"){
        yield api.unpauseContainer(Id);
        this.body=yield success();
    }else if(opt=="destroy"){
        yield api.removeContainer(Id);
        this.body=yield success();
    }else if(opt=="start"){
        yield api.startContainer(Id);
        this.body=yield success();
    }else if(opt=="stop"){
        yield api.stopContainer(Id);
        this.body=yield success();
    }else if(opt=="restart"){
        yield api.restartContainer(Id);
        this.body=yield success();
    }

}