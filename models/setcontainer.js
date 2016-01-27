var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var cmd = require('./cmder.js');
var others = require('./others.js');

exports.stopContainer=async function (Id) {
    try {
        let container = docker.getContainer(Id);
        let output = await container.inspect();
        if (!output.State.Running) return;
        await container.stop();
    } finally {
        console.log('stopContainer: done');
    }
}

exports.startContainer=async function (Id) {
    try {
        let container = docker.getContainer(Id);
        let output = await container.inspect();
        if (output.State.Running) return;
        await container.start();
    } finally {
        console.log('startContainer: done');
    }
}

exports.restartContainer=async function (Id) {
    try {
        let container = docker.getContainer(Id);
        await container.restart();
    } finally {
        console.log('restartContainer: done');
    }
}

exports.removeContainer=async function (Id)  {
    try {
        let container = docker.getContainer(Id);
        await container.remove();
    } finally {
        console.log('removeContainer: done');
    }
}

exports.pauseContainer=async function (Id) {
    try {
        let container = docker.getContainer(Id);
        let output = await container.inspect();
        if (output.State.Paused) return;
        await container.pause();
    } finally {
        console.log('pauseContainer: done');
    }
}

exports.unpauseContainer=async function (Id) {
    try {
        let container = docker.getContainer(Id);
        let output = await container.inspect();
        if (!output.State.Paused) return;
        await container.unpause();
    } finally {
        console.log('unpauseContainer: done');
    }
}

exports.getContainerInfo=async function (Id){
    try {
        let container = docker.getContainer(Id);
        let output = await container.inspect();
        return output;
    }
    catch(e) {
        throw e;
    }
    finally {
        console.log('getContainer: done');
    }
}

exports.all=async function () {
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
