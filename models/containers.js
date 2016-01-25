var cmd = require('./cmder.js');
var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var others = require('./others.js');

async function getContainerId(name) {
    let containers = await docker.listContainers({ all: true });
    let container = containers.find(function(container) {
        return container.Names.includes('/' + name);
    });
    return container && container.Id;
}

exports.stat=async function () {
    let containers=await docker.listContainers({ all: true });
    for(var i=0;i<containers.length;i++){
        containers[i].Id=containers[i].Id.slice(0,12);
        containers[i].Created=others.getLocalTime(containers[i].Created);//BUG
        if(containers[i].Status.indexOf("Paused")!=-1) containers[i].pause=true;
        else containers[i].pause=false;
    }
    return containers;
};
