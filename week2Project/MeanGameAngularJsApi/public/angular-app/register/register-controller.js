angular.module("meanGames").controller("RegisterController", RegisterController);

function RegisterController(UserDataFactory,$location) {
    let vm = this;
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
                console.log("reached!!");
                console.log(user);
                UserDataFactory.postUser(user).then(function (response) {
                    console.log("User saved"); 
                    $location.path("/"); // back to home
                }).catch(function (error) {
                    console.log(error);
                });
                
            }
        }
    }
};

