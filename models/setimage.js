var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var others = require('./others.js');

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

exports.all=async function () {
    let Images = await docker.listImages({ all: false });
    for(var i=0;i<Images.length;i++){
        Images[i].Id=Images[i].Id.slice(0,12);
        var pos=Images[i].RepoTags[0].indexOf(':');
        Images[i].Repository=Images[i].RepoTags[0].slice(0,pos);
        Images[i].Tag=Images[i].RepoTags[0].slice(pos+1);
        Images[i].Created=others.getLocalTime(Images[i].Created);
        Images[i].VirtualSize=others.getVirtualSize(Images[i].VirtualSize);
    }
    return Images;
};