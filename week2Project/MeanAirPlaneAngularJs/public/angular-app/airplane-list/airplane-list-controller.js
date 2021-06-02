angular.module("meanAirplane").controller("AirplanesController", AirplanesController);

function AirplanesController(AirplaneDataFactory,AuthFactory) {
    var vm = this;
    vm.isNew= true;
    vm.title = "Mean Airplane App";
    AirplaneDataFactory.getAllAirplanes().then(function (response) {
        vm.airplanes = response;
    });

    vm.isLoggedIn = function () {
        if (AuthFactory.auth.isLoggedIn) { return true; }
        else { return false; }
    }

    vm.searchAirplane=function(){
        console.log(vm.airplaneModel);
        AirplaneDataFactory.searchAirplane(vm.airplaneModel).then(function (response) {
            vm.modelNums= response;
            vm.airplaneModel="";
        });
    }

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
