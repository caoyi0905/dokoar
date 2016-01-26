var containers=require('./containers.js');
var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

exports.removeImage=async function (Name)  {
    try {
        let image = docker.getImage(Name);
        let stat  = await image.remove();
        console.log(stat)
    } finally {
        console.log('removeImage: done');
    }
}

exports.createImage=async function (Name)  {
    try {
        console.log(Name)
        let stat = await docker.createImage('',{'fromImage':Name})
    } finally {
        console.log('createImage: done');
    }
}