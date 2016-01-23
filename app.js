var _ = require('koa-route');
var koa = require('koa');
var app = koa();
var gzip = require('koa-gzip');
var logger=require('koa-logger');
var gzip = require('koa-gzip');
var views=require('co-views');
var bodyparser = require('koa-bodyparser');
var cmder=require('./models/cmder.js');
var router = require('koa-router')();
var render=views('views',{
  map:{html:'swig'}
});


app.use(logger());
app.use(bodyparser());
app.use(gzip());


router
    .get('/cmd', function *(next) {
        this.body = yield render('cmder');
    });

router
    .post('/cmd', function *(next) {
        var Res=yield cmder.run(this.request.body.cmd);
        if(Res.stderr){
            this.body = Res.stderr;
        }
        else{
            this.body = Res.stdout;
        }
    });

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);