angular.module("meanAirplane").controller("AirplanesController", AirplanesController);

function AirplanesController(AirplaneDataFactory) {
    var vm = this;
    vm.title = "Mean Airplane App";
    AirplaneDataFactory.getAllAirplanes().then(function (response) {
        vm.airplanes = response;
    });
}
