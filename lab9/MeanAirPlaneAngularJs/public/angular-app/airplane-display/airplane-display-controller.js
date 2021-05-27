angular.module("meanAirplane").controller("AirplaneController", AirplaneController);

function AirplaneController(AirplaneDataFactory, $routeParams) {
    console.log("reached")
    var vm = this;
    var id = $routeParams.id;
    AirplaneDataFactory.getOneAirplane(id).then(function (response) {
        vm.airplane = response;
    });

    vm.deleteAirplane=function(){
        console.log("reached delete");
        AirplaneDataFactory.deleteOneAirplane(id).then(function (response) {
            vm.deleteAirplane = response;
        });  
    }

}