(function(){
    angular.module('myApp',[]).
    controller('ccontainerCtrl',ccontainerCtrl);
    ccontainerCtrl.$inject=['$scope','$http'];
    function ccontainerCtrl($scope,$http) {
        $scope.ContainerName = "";
        $scope.Cmd = "";
        $scope.Volumes = [];
        $scope.HostPath = "";
        $scope.ContainerPath = "";
        $scope.Ports = [];
        $scope.HostPort = "";
        $scope.ContainerPort = "";
        $scope.Protocol = "TCP";
        $scope.Dns = [];
        $scope.ContainerDns = "";
        $scope.request = {
            name:"",
            HostConfig: {
                "RestartPolicy": {
                    "Name": "no"
                },
                "Links": [],
                Binds: [],
                "Privileged": false,
                PublishAllPorts: false,
                PortBindings: {},
                Dns:[],
            },
            "Tty": true,
            ExposedPorts: {},
        };

        $scope.pushDns=function (){
            $scope.Dns.unshift($scope.ContainerDns);
            $scope.ContainerDns='';
        }

        $scope.deleteDns=function (dns){
            var idx = $scope.Dns.indexOf(dns);
            $scope.Dns.splice(idx, 1);
        }

        $scope.transformDns=function (){
            $scope.request.HostConfig.Dns = [];
            if($scope.ContainerDns.length > 0) {
                $scope.request.HostConfig.Dns.push($scope.ContainerDns);
            }
            for(i = 0; i < $scope.Dns.length; i++) {
                $scope.request.HostConfig.Dns.push($scope.Dns[i]);
            }
        }

        $scope.pushVolume=function (){
            $scope.Volumes.unshift({'HostPath':$scope.HostPath,'ContainerPath':$scope.ContainerPath});
            $scope.HostPath='';
            $scope.ContainerPath='';
        }

        $scope.deleteVolume=function (v){
            var idx = $scope.Volumes.indexOf(v);
            $scope.Volumes.splice(idx, 1);
        }

        $scope.transformVolumes=function() {
            if($scope.HostPath.length>0) {
                $scope.request.HostConfig.Binds.push($scope.HostPath + ":" + $scope.ContainerPath);
            }
            for(var i = 0; i < $scope.Volumes.length; i++) {
                $scope.request.HostConfig.Binds.push($scope.Volumes[i].HostPath + ":" + $scope.Volumes[i].ContainerPath);
            }
        }

        $scope.pushPort=function () {
            var port = {'Protocol': $scope.Protocol, 'ContainerPort': $scope.ContainerPort, 'HostIP': $scope.HostIP, 'HostPort': $scope.HostPort};
            $scope.Ports.unshift(port);
            $scope.HostPort = "";
            $scope.HostIP = "";
            $scope.Protocol = "TCP";
            $scope.ContainerPort = "";
        }

        $scope.deletePort=function (port) {
            var index = $scope.Ports.indexOf(port);
            $scope.Ports.splice(index, 1);
        }

        $scope.transformPorts=function (){
            if($scope.ContainerPort.length > 0) {
                var port = $scope;
                var key = port.ContainerPort + '/' + port.Protocol.toLowerCase();
                $scope.request.ExposedPorts[key] = {};
                $scope.request.HostConfig.PortBindings[key] = [{ HostIp: port.HostIp, HostPort: port.HostPort }];
            }
            for(var i = 0; i < $scope.Ports.length; i++) {
                var port = $scope.Ports[i];
                var key = port.ContainerPort + '/' + port.Protocol.toLowerCase();
                $scope.request.ExposedPorts[key] = {};
                $scope.request.HostConfig.PortBindings[key] = [{ HostIp: port.HostIp, HostPort: port.HostPort }];
            }
        }

        $scope.create=function (){
            $("#error-div").hide();

            if($scope.Cmd.length>0){
                $scope.request.Cmd=$scope.Cmd.split(' ');
                if($scope.request.Cmd.find("/bin/bash")!=-1){
                    $scope.request.Cmd.push("/bin/bash");
                }
            }
            $scope.transformDns();
            $scope.transformVolumes();
            $scope.transformPorts();
            $scope.request.name=$scope.ContainerName;

            $http
                .post('/createcontainer', {opts:$scope.request})
                .success(function(data, status, headers, config) {
                    console.log(JSON.stringify(data));
                    if(data.statusCode !=200) {
                        $scope.error_reason='Reason: '+data.reason;
                        $scope.error_statusCode='StatusCode: '+data.statusCode;
                        $scope.error_json='Json: '+data.json;
                        $("#error-div").show();
                        return;
                    }
                    window.location.href='/container/'+data.Id;
                })
                .error(function(data, status, headers, config) {
                    //TODO
                });
        }
    }
})();
