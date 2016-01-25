var render=require('../views.js');
var containers=require('../models/containers.js');
var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

async function stopContainer(Id) {
    try {
        let container = docker.getContainer(Id);
        let output = await container.inspect();
        if (!output.State.Running) return;
        await container.stop();
    } finally {
        console.log('stopContainer: done');
    }
}

async function startContainer(Id) {
    try {
        let container = docker.getContainer(Id);
        let output = await container.inspect();
        if (output.State.Running) return;
        await container.start();
    } finally {
        console.log('startContainer: done');
    }
}

async function restartContainer(Id) {
    try {
        let container = docker.getContainer(Id);
        await container.restart();
    } finally {
        console.log('restartContainer: done');
    }
}

async function removeContainer(Id) {
    try {
        let container = docker.getContainer(Id);
        await container.remove();
    } finally {
        console.log('removeContainer: done');
    }
}

async function pauseContainer(Id) {
    try {
        let container = docker.getContainer(Id);
        let output = await container.inspect();
        if (output.State.Paused) return;
        await container.pause();
    } finally {
        console.log('pauseContainer: done');
    }
}

async function unpauseContainer(Id) {
    try {
        let container = docker.getContainer(Id);
        let output = await container.inspect();
        if (!output.State.Paused) return;
        await container.unpause();
    } finally {
        console.log('unpauseContainer: done');
    }
}

async function getContainerId(Id_name) {
    let containers = await docker.listContainers({ all: true });
    let container = containers.find(function(container) {
        return container.Names.includes('/' + Id_name);
    });
    return container && container.Id;
}

async function success(){
    return '1';
}

exports.post =function *() {
    var opt=this.request.body.opt;
    var Id=this.request.body.Id;
    if(opt=="pause"){
        yield pauseContainer(Id);
        this.body=yield success();
    }else if(opt=="unpause"){
        yield unpauseContainer(Id);
        this.body=yield success();
    }else if(opt=="destroy"){
        yield removeContainer(Id);
        this.body=yield success();
    }else if(opt=="start"){
        yield startContainer(Id);
        this.body=yield success();
    }else if(opt=="stop"){
        yield stopContainer(Id);
        this.body=yield success();
    }else if(opt=="restart"){
        yield restartContainer(Id);
        this.body=yield success();
    }

}