var cmd = require('./cmder.js');
var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var others = require('./others.js');

exports.stat=async function () {
    let containers=await docker.listContainers({ all: true });
    for(var i=0;i<containers.length;i++){
        containers[i].Id=containers[i].Id.slice(0,12);
        containers[i].Created=others.getLocalTime(containers[i].Created);//BUG
        containers[i].state={
            'stop'     :   (containers[i].Status.indexOf("Exited")!=-1),
            'paused'   :   (containers[i].Status.indexOf("Paused")!=-1),
        }
    }
    return containers;
};
