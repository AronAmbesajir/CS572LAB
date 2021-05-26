angular.module("meanAirpalne").controller("AirpalneController", AirpalneController);
function AirpalneController(AirpalneDataFactory, $routeParams) {
    const vm = this;
    const id = $routeParams.id;
    AirpalneDataFactory.getOneAirpalne(id).then(function (response) {
        vm.airpalne = response;
    });
}