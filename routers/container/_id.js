var container=require('../../models/setcontainer.js');
var others=require('../../models/others.js');

exports.get = function *(id){
    try{
        let containerinfo=yield container.getContainerInfo(id);
        containerinfo=others.formatContainerInfo(containerinfo);
        yield this.render('containerinfo',{
            title   :   'Container Info',
            dk      :   containerinfo,
            user    :   this.session.user
        });
    }
    catch (error){
        yield this.render('containerinfo',{
            title   :   'Container Info Error',
            error   :   error,
            user    :   this.session.user
        });
    }

}