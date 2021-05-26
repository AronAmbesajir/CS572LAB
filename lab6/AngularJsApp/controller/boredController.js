angular.module("myProperApp").controller("BoredController", BoredController);

function BoredController($http,){  
    var vm = this; 
    $http.get("https://www.boredapi.com/api/activity")
        .then(function(response){
            vm.bored= response.data;
        })

}