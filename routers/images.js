var render=require('../views.js');
var images=require('../models/images.js');

exports.get = function *(){
    var stat = yield images.stat();
    this.body = yield render('images',{
        title   :   'Images',
        stat    :   stat
    });
}

exports.post = function *() {
    this.body = yield render('images',{
        title:'Images'
    });
}