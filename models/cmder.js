var cp = require('child_process');

exports.run=function* (cmdStr){
    var args=cmdStr.split(" ");
    var command=args[0];
    args.splice(0,1);
    var res=cp.spawnSync(command, args, { encoding : 'utf8' });
    return res;
};

exports.asyncRun=function (that,cmdStr,callback){
    var args=cmdStr.split(" ");
    var command=args[0];
    args.splice(0,1);
    var ls=cp.spawn(command, args, { encoding : 'utf8' });
    ls.stdout.on('data', (data) => {
        callback(that,"",data);
    });
    ls.stderr.on('data', (data) => {
        callback(that,data,"");
    });
};
