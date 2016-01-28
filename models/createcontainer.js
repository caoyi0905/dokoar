var cmd = require('./cmder.js');
var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var others = require('./others.js');
var container=require('./setcontainer.js');

exports.createContainer=async function (opts) {
    let containerId;
    try {
        containerId=await docker.createContainer(opts);
        return containerId.$subject.id;
    }
    catch (e){
        throw e;
    }
    finally{
        await container.restartContainer(containerId.$subject.id);
        console.log("Create Container Done...");
    }
};
