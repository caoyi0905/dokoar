var cmd = require('./cmder.js');
var Docker = require('dockerode-promise');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var others = require('./others.js');

async function getImagesId(name) {
    let Images = await docker.listImages({ all: true });
    let Image = Images.find(function(container) {
        return Image.Names.includes('/' + name);
    });
    return Image && Image.Id;
}

exports.stat=async function () {
    let Images = await docker.listImages({ all: false });
    for(var i=0;i<Images.length;i++){
        Images[i].Id=Images[i].Id.slice(0,12);
        var pos=Images[i].RepoTags[0].indexOf(':');
        Images[i].repository=Images[i].RepoTags[0].slice(0,pos);
        Images[i].tag=Images[i].RepoTags[0].slice(pos+1);
        Images[i].Created=others.getLocalTime(Images[i].Created);
        Images[i].VirtualSize=others.getVirtualSize(Images[i].VirtualSize);
    }
    return Images;
};