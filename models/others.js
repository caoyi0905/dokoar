

exports.getLocalTime=function (nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString();
}

exports.getVirtualSize=function (num) {
    num/=1000000;
    return num.toFixed(2)+'MB';
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


    Info.HostConfig.Memory=Info.HostConfig.Memory/1024/1024+' MB';

    console.log(Info)
    return Info;
}