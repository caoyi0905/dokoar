(function(){
    angular
        .module('myApp',[])
        .factory('ContainerService', ContainerService)

    ContainerService.$inject = ['$http'];
    function ContainerService($http) {
        return {
            list: function () {
                var promise = $http.post('/containers', {})
                    .then(function (response) {
                        return response.data;
                    });
                return promise;
            },
            operateData: function (opt, Id) {
                var promise = $http.post('/setcontainer/', {opt: opt, Id: Id})
                    .then(function (response) {
                        return response.data;
                    });
                return promise;
            }
        }
    }
})();