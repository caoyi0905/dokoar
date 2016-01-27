var render=require('../../views.js');
var container=require('../../models/setcontainer.js');
var others=require('../../models/others.js');

exports.get = function *(id){
    try{
        let containerinfo=yield container.getContainerInfo(id);
        containerinfo=others.formatContainerInfo(containerinfo);
        this.body = yield render('containerinfo',{
            title   :   'Container Info',
            dk      :   containerinfo
        });
    }
    catch (error){
        console.log(error);
        this.body = yield render('containerinfo',{
            title   :   'Container Info Error',
            error   :   JSON.stringify(error)
        });
    }

}