var views = require('co-views');

module.exports =function (dir, opts){
    return function *(next){
        this.render=function *(view, locals){
            var render=views(dir, opts);
            this.body=yield render(view, locals);
        };
        yield next;
    }
}