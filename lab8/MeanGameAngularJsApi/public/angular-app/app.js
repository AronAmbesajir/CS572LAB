angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider, $locationProvier) {
    $locationProvier.hashPrefix("");
    $routeProvider.when("/", {
        templateURL: "angular-app/game-list/games.html",
        controller: " GamesController",
        controllerAs: "vm"
    }).when("/game/:id", {
        templateUrl: "angular-app/game-display/game.html",
        controller: "GameController",
        controllerAs: "vm"
    });

    ;
}