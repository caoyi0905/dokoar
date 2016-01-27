(function(){
    angular.module('myApp').
    controller('containerCtrl',containerCtrl);
    containerCtrl.$inject=['$scope','ContainerService'];
    function containerCtrl($scope,ContainerService) {
        $scope.send = function (opt, Id) {
            if (opt == 'destroy') {
                $('#myModal').modal('hide');
                ContainerService.operateData(opt, Id)
                    .then(function (data) {
                        location.reload(true);
                    });
            } else {
                ContainerService.operateData(opt, Id)
                    .then(function (data) {
                        location.reload(true);
                    });
            }
        }

        $scope.removeMsg = function (Id) {
            $scope.msgTitle = 'Remove Image : ' + Id;
            $scope.curContainerId = Id;
        }

        $scope.console = function (Id) {
            //TODO
        }
    }
})();
