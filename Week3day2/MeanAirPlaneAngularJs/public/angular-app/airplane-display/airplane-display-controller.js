angular.module("meanAirplane").controller("AirplaneController", AirplaneController);

function AirplaneController(AirplaneDataFactory, $routeParams,AuthFactory) {
    console.log("reached")
    var vm = this;
    var id = $routeParams.id;
    AirplaneDataFactory.getOneAirplane(id).then(function (response) {
        vm.airplane = response;
    });

    vm.isLoggedIn = function () {
        if (AuthFactory.auth.isLoggedIn) { return true; }
        else { return false; }
    }

    vm.deleteAirplane=function(){
        console.log("reached delete");
        AirplaneDataFactory.deleteOneAirplane(id).then(function (response) {
            vm.deleteAirplane = response;
        });  
    }

}