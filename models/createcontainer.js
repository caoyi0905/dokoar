var cmd = require('./cmder.js');
var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var others = require('./others.js');

exports.createContainer=async function (opts) {
    let containerId;
    try {
        containerId=await docker.createContainer(opts);
    }
    finally{
        return containerId;
        console.log("Create Container Done...");
    }
};
