var containers=require('../../../models/setcontainer.js');
var others=require('../../../models/others.js');

exports.get = function *(id){
    try{
        let container=yield containers.getContainerInfo(id);
        let logName=container.LogPath;
        let containerLogs=yield others.getLogs(logName);
        yield this.render('logs',{
            title       :   'Container Logs',
            Name        :   container.Name.slice(1),//remove pre '/'
            logs        :   containerLogs,
            user        :   this.session.user
        });
    }
    catch (error){
        console.log(error);
        yield this.render('logs',{
            title   :   'Container Logs Error',
            error   :   error,
            user    :   this.session.user
        });
    }

}