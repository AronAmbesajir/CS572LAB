angular.module("meanGames").controller("GamesController", GamesController);


function GamesController(GameDataFactory, AuthFactory) {
    var vm = this;
    vm.title = "Mean Games App";
    vm.isSubmitted = false;
    GameDataFactory.getAllGames().then(function (response) {
        // console.log(response); });
        vm.games = response;
    });

    vm.isLoggedIn = function () {
        if (AuthFactory.auth.isLoggedIn) { return true; }
        else { return false; }
    }

    vm.searchGame = function () {
        console.log(vm.gameTitle);
        GameDataFactory.searchGame(vm.gameTitle).then(function (response) {
            vm.titles = response;
            vm.gameTitle="";
        });
    }

    vm.addGame = function () {
        const newGame = {
            title: vm.newGameTitle,
            price: vm.newGamePrice,
            rate: vm.newGameRating,
            year: vm.newGameYear,
            rating: vm.newGameRating,
            minPlayers: vm.newGameMinPlayers,
            maxPlayers: vm.newGameMaxPlayers,
            minAge: vm.newGameMinAge,
            designers: vm.newGameDesigner,
        };
        if (vm.gameForm.$valid) {
            GameDataFactory.postGame(newGame).then(function (response) {
                console.log("Game saved");
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };
}