var koa = require('koa');
var logger=require('koa-logger');
var gzip = require('koa-gzip');
var bodyparser = require('koa-bodyparser');
var router = require('koa-frouter');
var route = require('koa-route');
var path = require('path')
var staticCache = require('koa-static-cache');
var render = require('./views.js');
var session = require('koa-session');
var flash = require('koa-flash');
var websockify = require('koa-websocket');
var app = websockify(koa());
var cmd=require('./models/cmder.js')
app.use(staticCache(path.join(__dirname, 'publics'), {
    maxAge: 365 * 24 * 60 * 60
}))

app.keys=['user'];
app.use(logger());
app.use(bodyparser());
app.use(session(app));
app.use(flash());
app.use(gzip());
app.use(render(__dirname + '/views', {
    map: { html: 'swig' }
}));
app.use(function *(next) {
    var url = this.url;
    if (url != "/login" && !this.session.user) {
        this.redirect("/login");
    }
    yield next;
});
app.use(router(app, {
    root    : './routers',
    wildcard: '_'
}));


app.ws.use(logger());
app.ws.use(bodyparser());
app.ws.use(route.get('/exec', function* (next) {
    var query=this.request.query;
    this.websocket.mq="";

    // `this` is the regular koa context created from the `ws` onConnection `socket.upgradeReq` object.
    // the websocket is added to the context on `this.websocket`.
    this.websocket.send('Hello World\r\n');
    this.websocket.on('message', function(message) {
        // do something with the message from client
        this.mq+=message;
        this.send(message)
        if(message.indexOf('\r')!=-1){
            this.send('\n');
            this.mq=this.mq.replace(new RegExp('\r',"gm"),'');
            var ls =cmd.asyncRun(this,this.mq,function(that,err,data){
                if(err){
                    console.log("ERR",err)
                    that.send(err+'');
                }else{
                    data=data+''
                    data=data.replace(new RegExp('\n',"gm"),'\r\n');
                    that.send(data);
                }
                that.mq="";
            });
        }

    });
    // yielding `next` will pass the context (this) on to the next ws middleware

    yield next;
}));
app.listen(3000);