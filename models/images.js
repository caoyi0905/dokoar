var cmd = require('./cmder.js');

exports.stat=function* (){
    var msg = yield cmd.run('docker images');
    msg=msg.stdout.split("\n");

    if(msg.length==0){
        return "";
    }

    var stat=[];
    var titles=['REPOSITORY','TAG','IMAGE ID','CREATED','VIRTUAL SIZE'];
    var titleStr=msg[0]+'';
    var titlesPos=[];
    for(var i=0;i<titles.length;i++){
        titlesPos.push(titleStr.indexOf(titles[i]));
    }

    for(var i=1;i<msg.length;i++){//跳过首行标题
        if(msg[i].length==0){
            break;
        }
        stat.push({
            'REPOSITORY'    :   msg[i].slice(titlesPos[0],titlesPos[1]).trim(),
            'TAG'           :   msg[i].slice(titlesPos[1],titlesPos[2]).trim(),
            'IMAGEID'       :   msg[i].slice(titlesPos[2],titlesPos[3]).trim(),
            'CREATED'       :   msg[i].slice(titlesPos[3],titlesPos[4]).trim(),
            'VIRTUALSIZE'   :   msg[i].slice(titlesPos[4]).trim(),
        });
    }
    return stat;
};
