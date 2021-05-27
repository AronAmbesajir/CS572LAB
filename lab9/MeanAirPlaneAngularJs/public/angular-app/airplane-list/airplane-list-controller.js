angular.module("meanAirplane").controller("AirplanesController", AirplanesController);

function AirplanesController(AirplaneDataFactory) {
    var vm = this;
    vm.isNew= true;
    vm.title = "Mean Airplane App";
    AirplaneDataFactory.getAllAirplanes().then(function (response) {
        vm.airplanes = response;
    });


    vm.addAirplane = function () {
        const newAirplane = {
            modelNum: vm.newAirplaneModel,
            manufacture: vm.newAirplaneManufacture,
            capacity: vm.newAirplaneCapacity,

        };
        if (vm.airplaneForm.$valid | vm.isNew) {
            AirplaneDataFactory.postAirplane(newAirplane).then(function (response) {
                console.log("Airplane saved");
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = false;
        }
    };



}
