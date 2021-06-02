angular.module("meanAirplane").controller("RegisterController", RegisterController);

function RegisterController(AirplaneDataFactory,$location) {
    var vm = this;
    vm.register = function() {
        var user = { username: vm.username, password: vm.password };
        if (!vm.username || !vm.password) {
            vm.err = "Please add a username and password.";
        }
        else {
            if (vm.password !== vm.passwordRepeat) {
                vm.err = "Please make sure the passwords match.";
            } else {
                vm.err =false;
                console.log("username and pass passed!!");
                console.log(user);
                AirplaneDataFactory.postUser(user).then(function (response) {
                    console.log("User saved");
                    $location.path("/"); // back to home
                }).catch(function (error) {
                    console.log(error);
                });
                
            }
        }
    }
};