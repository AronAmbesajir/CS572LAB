angular.module("meanAirplane", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angular-app/airplane-list/airplanes.html",
        controller : "AirplanesController",
        controllerAs: "vm"
    })
    .when("/airplane/:id", {
        templateUrl: "angular-app/airplane-display/airplane.html",
        controller : "AirplaneController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    })
}