var render=require('../views.js');
var api=require('../models/setimages.js');

async function success(){
    return '1';
}

exports.post =function *() {
    var opt=this.request.body.opt;
    var name=this.request.body.name;
    if(opt=="remove"){
        yield api.removeImage(name);
        this.body=yield success();
    }else if(opt=="create"){
        yield api.createImage(name);
        this.body=yield success();
    }
}