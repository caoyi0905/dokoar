var render=require('../../../views.js');
var containers=require('../../../models/setcontainer.js');
var others=require('../../../models/others.js');

exports.get = function *(id){
    try{
        let container=yield containers.getContainerInfo(id);
        let logName=container.LogPath;
        let containerLogs=yield others.getLogs(logName);
        this.body = yield render('logs',{
            title     :   'Container Logs',
            Name      :   container.Name.slice(1),//remove pre '/'
            logs      :   containerLogs
        });
    }
    catch (error){
        console.log(error);
        this.body = yield render('logs',{
            title   :   'Container Logs Error',
            error   :   error
        });
    }

}