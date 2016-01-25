var render=require('../views.js');
var images=require('../models/images.js');

exports.get = function *(){
    this.body = yield render('images',{
        title   :   'Images'
    });
}

exports.post = function *() {
    this.body = yield images.stat();
}