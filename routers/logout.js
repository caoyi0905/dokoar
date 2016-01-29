
exports.get = function *(){
    this.session.user=null;
    this.redirect('login');
}