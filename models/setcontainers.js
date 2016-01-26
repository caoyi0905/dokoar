var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

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
