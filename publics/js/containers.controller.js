(function(){
    angular.module('myApp').
    controller('containerCtrl',containerCtrl);
    containerCtrl.$inject=['$scope','filterFilter','ContainerService'];
    function containerCtrl($scope,filterFilter,ContainerService) {
        $scope.containers = [];
        $scope.filterContainers = [];

        var updateData = function () {
            ContainerService.list()
                .then(function (data) {
                    $scope.filterContainers=$scope.containers = data;
                    $('td').each(function(){
                        $(this).attr('href','/container/'+$(this).text());
                    })
                });
        }

        updateData();

        $scope.reverse = true;
        $scope.column = 'Id';
        $scope.setSort = function (column) {
            $scope.column = column;
            $scope.reverse = !$scope.reverse;
        }
        $scope.filterStr = '';
        $scope.setFilter = function (value) {
            $scope.filterContainers =
                filterFilter($scope.containers, $scope.filterStr);
        }

        $scope.send = function (opt, Id) {
            if (opt == 'destroy') {
                $('#myModal').modal('hide');
                ContainerService.operateData(opt, Id)
                    .then(function (data) {
                        updateData();
                    });
            } else {
                ContainerService.operateData(opt, Id)
                    .then(function (data) {
                        updateData();
                    });
            }
        }

        $scope.removeMsg = function (Id) {
            $scope.msgTitle = 'Destroy Container: ' + Id;
            $scope.curContainerId = Id;
        }

        $scope.console = function (Id) {
            //TODO
        }
    }
})();
