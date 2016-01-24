var cmd = require('./cmder.js');

exports.stat=function* (){
    var msg = yield cmd.run('docker ps -a');
    msg=msg.stdout.split("\n");

    if(msg.length==0){
        return "";
    }

    var stat=[];
    var titles=['CONTAINER ID','IMAGE','COMMAND','CREATED','STATUS','PORTS','NAMES'];
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
            'CONTAINERID'   :   msg[i].slice(titlesPos[0],titlesPos[1]).trim(),
            'IMAGE'         :   msg[i].slice(titlesPos[1],titlesPos[2]).trim(),
            'COMMAND'       :   msg[i].slice(titlesPos[2],titlesPos[3]).trim(),
            'CREATED'       :   msg[i].slice(titlesPos[3],titlesPos[4]).trim(),
            'STATUS'        :   msg[i].slice(titlesPos[4],titlesPos[5]).trim(),
            'PORTS'         :   msg[i].slice(titlesPos[5],titlesPos[6]).trim(),
            'NAMES'         :   msg[i].slice(titlesPos[6]).trim(),
        });
    }
    return stat;
};
