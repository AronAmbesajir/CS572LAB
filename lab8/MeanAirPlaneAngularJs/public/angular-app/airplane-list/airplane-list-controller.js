angular.module("meanAirplane").controller("AirplanesController", AirplanesController); 

function AirplanesController(AirplaneDataFactory) {
    const vm= this;
    vm.title= "Mean Airplanes App"; 
    AirplaneDataFactory.getAllAirplanes().then(function(response) {
    vm.airplanes= response; });
    }