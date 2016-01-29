var container=require('../models/setcontainer.js');

exports.get = function *(){
    yield this.render('containers',{
        title   :   'Containers',
        user    :   this.session.user
    });
}

exports.post = function *() {
    this.body = yield container.all();
}