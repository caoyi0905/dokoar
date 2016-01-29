exports.get = function *(){
    if(this.session.user!=null){
        this.redirect('index');
    }
    yield this.render('login',{
        title   :   'login'
    });
}

exports.post = function *() {
    let data=this.request.body;
    if(data.username!=='admin'||data.password!=='dokoar'){
        yield this.render('login',{
            error   :   'Wrong username or password',
            title   :   'login'
        });
    }
    else{
        this.session.user=data.username;
        yield this.render('index',{
            title   :   'Index',
            user    :   this.session.user
        });
    }
}