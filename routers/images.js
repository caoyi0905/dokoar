var image=require('../models/setimage.js');

exports.get = function *(){
    yield this.render('images',{
        title   :   'Images',
        user    :   this.session.user
    });
}

exports.post = function *() {
    this.body = yield image.all();
}