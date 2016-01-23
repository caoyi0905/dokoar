var path = require('path');

module.exports = {
    port: process.env.PORT || 3000,
    staticCacheConf: path.join(__dirname, '../publices'),
    renderConf: path.join(__dirname, '../theme/config'),
    routerConf: 'routes',
    routerCacheConf: {
        '/': {
            expire: 10 * 1000,
            condition: function() {
                return !this.session || !this.session.user;
            }
        }
    }
};