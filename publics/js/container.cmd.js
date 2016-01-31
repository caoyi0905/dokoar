(function(){
    angular.module('myApp',[]).
    controller('cmdCtrl', ExecController);
    ExecController.$inject = ['$http', ];
    function ExecController($http) {
        var vm = this;
        vm.id = 1;
        vm.addr = "";
        vm.command = "bash";
        vm.connect = connect;
        vm.disconnect = disconnect;
        var term;
        var websocket;
        connect();
        function connect() {
            console.log("sad")
            var termWidth = Math.round($(window).width() / 7.5);
            var termHeight = 30;

            var url = window.location.href;
            var urlparts = url.split("/");
            var scheme = urlparts[0];
            var wsScheme = "ws";

            if (scheme === "https:") {
                wsScheme = "wss";
            }

            vm.addr = wsScheme + "://" + window.location.hostname + ":" + window.location.port + "/exec?id=" + vm.id + "&h=" + termHeight + "&w=" + termWidth;

            if (term != null) {
                term.destroy();
            }
            websocket = new WebSocket(vm.addr);

            websocket.onopen = function(evt) {
                term = new Terminal({
                    cols: termWidth,
                    rows: termHeight,
                    screenKeys: true,
                    useStyle: true,
                    cursorBlink: true,
                });
                term.on('data', function(data) {
                    websocket.send(data);
                });
                term.on('title', function(title) {
                    document.title = title;
                });
                term.open(document.getElementById('container-terminal'));
                websocket.onmessage = function(evt) {
                    term.write(evt.data);
                }
                websocket.onclose = function(evt) {
                    term.write("Session terminated");
                    term.destroy();
                }
                websocket.onerror = function(evt) {
                    if (typeof console.log == "function") {
                        //console.log(evt)
                    }
                }
            }

        }

        function disconnect() {
            if (websocket != null) {
                websocket.close();
            }

            if (term != null) {
                term.destroy();
            }
        }
    }
})();