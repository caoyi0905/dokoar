

exports.getLocalTime=function (nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString();
}

exports.getVirtualSize=function (num) {
    num/=1000000;
    return num.toFixed(2)+'MB';
}

exports.getLogs=function *(filePath){
    let fs= require('co-fs');
    let Content=yield fs.readFile(filePath+'','utf8');
    Content=Content.split('\n');
    for(var i=0;i<Content.length;i++)if(Content[i].length>0){
        Content[i]=JSON.parse(Content[i]);
        Content[i].time=this.getLocalTime(Content[i].time)
    }
    return Content;
}

exports.formatContainerInfo=function (Info){
    Info.Id=Info.Id.slice(0,12);

    Info.Name=Info.Name.slice(1);

    if(Info.Config.Cmd===null){
        Info.Cmd="";
    }else{
        Info.Cmd=Info.Config.Cmd.join(' ');
    }

    Info.startTime=new Date(Info.State.StartedAt).toString();

    Info.State.Paused=(Info.State.Paused==true)?1:0;
    Info.State.Running=(Info.State.Running==true)?1:0;

    if(Info.HostConfig.Memory!=null)
        Info.HostConfig.Memory=Info.HostConfig.Memory/1024/1024+' MB';

    if(Info.NetworkSettings.Ports!=null){
        Info.PortsConfig=[];
        for(var port in Info.NetworkSettings.Ports){
            console.log(Info.NetworkSettings.Ports[port])
            if(Info.NetworkSettings.Ports[port]!=null)
            {

                Info.PortsConfig.push('Exposed: '+Info.NetworkSettings.Ports[port][0].HostIp+
                    ':'+Info.NetworkSettings.Ports[port][0].HostPort+' → '+port);
            }else{
                Info.PortsConfig.push('Internal: '+port);
            }
        }


    }

    console.log(JSON.stringify(Info))
    return Info;
}