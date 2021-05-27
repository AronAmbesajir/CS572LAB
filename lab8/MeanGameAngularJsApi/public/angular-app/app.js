angular.module("meanGames", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angular-app/game-list/games.html",
        controller : "GamesController",
        controllerAs: "vm"
    })
    .when("/game/:id", {
        templateUrl: "angular-app/game-display/game.html",
        controller : "GameController",
        controllerAs: "vm"
    })
}