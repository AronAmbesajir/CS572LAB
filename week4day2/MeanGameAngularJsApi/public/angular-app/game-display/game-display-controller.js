angular.module("meanGames").controller("GameController", GameController);

function _getStarRating(stars) {
    return new Array(stars); }

function GameController(GameDataFactory, $routeParams) {
    const vm = this;
    const id = $routeParams.id;
    GameDataFactory.getOneGame(id).then(function (response) {
        vm.game = response;
        vm.rating= _getStarRating(response.rate);
    });
    
    vm.deleteGame=function(){
        GameDataFactory.deleteOneGame(id).then(function (response) {
            vm.deleteGame = response;
        });  
    }
}