var api=require('../models/setimage.js');

async function success(){
    return '1';
}

exports.post =function *() {
    var opt=this.request.body.opt;
    var name=this.request.body.name;
    try{
        if(opt=="remove"){
            yield api.removeImage(name);
            this.redirect('images');
        }else if(opt=="create"){
            if(name.indexOf(":")==-1){
                name=name+':latest';
            }
            yield api.createImage(name);
            this.body=yield success();
        }
    }
    catch(e){
        this.redirect('images');
    }
}