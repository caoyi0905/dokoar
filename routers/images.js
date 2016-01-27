var render=require('../views.js');
var image=require('../models/setimage.js');

exports.get = function *(){
    this.body = yield render('images',{
        title   :   'Images'
    });
}

exports.post = function *() {
    this.body = yield image.all();
}