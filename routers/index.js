
exports.get = function *(){
    yield this.render('index',{
        title   :   'Index',
        user    :   this.session.user
    });
}

exports.post = function *() {
    yield this.render('index',{
        title   :   'Index',
        user    :   this.session.user
    });
}