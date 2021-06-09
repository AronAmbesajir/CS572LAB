angular.module("meanAirplane").controller("LoginController", LoginController);

function LoginController($http, $location, $window, AuthFactory,jwtHelper,UserDataFactory) {
    let vm = this;
    vm.isLoggedIn = function () {
        if (AuthFactory.auth.isLoggedIn) {
            return true
        }
        else {
            return false;
        }
    };
     vm.login= function () {
         console.log(vm.username);
         console.log(vm.password);        
         if (vm.username && vm.password) {
            let user = {
                username: vm.username,
                password: vm.password
            };
            console.log("user ", user);
            $http.post("/api/users/login", user).then(function (response) {
                if (response.data.success) {
                    $window.sessionStorage.token = response.data.token; 
                    AuthFactory.auth.isLoggedIn = true;
                    let token= $window.sessionStorage.token;
                    let decodedToken= jwtHelper.decodeToken(token); 
                    vm.loggedInUser= decodedToken.name;
                    vm.username="";
                    vm.password="";
                    console.log("Token value ",vm.loggedInUser);
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
    vm.logout = function () {
        console.log("log out sucessfully!!");
        AuthFactory.auth.isLoggedIn = false;
        delete $window.sessionStorage.token; 
        $location.path("/");
    }

    vm.isActiveTab = function (url) {
        let currentPath = $location.path().split("/")[1]; 
        return (url === currentPath ? "active" : "");
    }

}