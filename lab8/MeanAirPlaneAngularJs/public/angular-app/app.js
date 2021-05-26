angular.module("meanAirpalne", ["ngRoute"]).config(config);

function config($routeProvider) {
   // $locationProvier.hashPrefix("");
    $routeProvider.when("/", {
        templateURL: "angular-app/airplane-list/airplanes.html",
        controller: " AirplaneController",
        controllerAs: "vm"
    }).when("/airplane/:id", {
        templateUrl: "angular-app/airplane-display/airplane.html",
        controller: "AirplaneController",
        controllerAs: "vm"
    });

    ;
}