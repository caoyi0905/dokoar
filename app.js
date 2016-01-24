var _ = require('koa-route');
var koa = require('koa');
var app = koa();
var gzip = require('koa-gzip');
var logger=require('koa-logger');
var gzip = require('koa-gzip');
var bodyparser = require('koa-bodyparser');
var router = require('koa-frouter');
var path = require('path')
var staticCache = require('koa-static-cache')

app.use(staticCache(path.join(__dirname, 'publics'), {
    maxAge: 365 * 24 * 60 * 60
}))

app.use(logger());
app.use(bodyparser());
app.use(gzip());
app.use(router(app, {
    root: './routers'
}));

app.listen(3000);