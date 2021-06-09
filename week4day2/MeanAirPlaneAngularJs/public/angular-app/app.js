angular.module("meanAirplane", ["ngRoute","angular-jwt"]).config(config).run(run);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "angular-app/welcome/welcome.html",
        access: { restricted: false }
    }).when("/airplanes", {
        templateUrl: "angular-app/airplane-list/airplanes.html",
        controller: "AirplanesController",
        controllerAs: "vm",
        access: { restricted: false }
    }).when("/airplane/:id", {
            templateUrl: "angular-app/airplane-display/airplane.html",
            controller: "AirplaneController",
            controllerAs: "vm",
            access: { restricted: false }
        }).when("/register", {
            templateUrl: "angular-app/register/register.html",
            controller: "RegisterController",
            controllerAs: "vm",
            access: { restricted: false }
        }).when("/profile", {
            templateUrl: "angular-app/profile/profile.html",
            controllerAs: "vm",
            access: { restricted: true }
        }).otherwise({
            redirectTo: "/"
        })
}

function run($rootScope, $location, $window, AuthFactory) {
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token &&
            !AuthFactory.auth.isLoggedIn) {
            event.preventDefault(); // Do not go to that path 
            $location.path("/"); // Instead go to the root
        }
    });
}