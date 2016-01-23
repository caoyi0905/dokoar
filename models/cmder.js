var cp = require('child_process');

exports.run=function* (cmdStr){
    var args=cmdStr.split(" ");
    var command=args[0];
    args.splice(0,1);
    var res=cp.spawnSync(command, args, { encoding : 'utf8' });
    return res;
};
