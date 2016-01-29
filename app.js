var koa = require('koa');
var app = koa();
var gzip = require('koa-gzip');
var logger=require('koa-logger');
var gzip = require('koa-gzip');
var bodyparser = require('koa-bodyparser');
var router = require('koa-frouter');
var path = require('path')
var staticCache = require('koa-static-cache');
var render = require('koa-views');
var session = require('koa-session');
var flash = require('koa-flash');
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
app.listen(3000);