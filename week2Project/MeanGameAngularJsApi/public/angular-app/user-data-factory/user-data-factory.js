angular.module("meanGames").factory("UserDataFactory", UserDataFactory);
function UserDataFactory($http) {
    return {
        postUser:postUser,
        logInUser:logInUser,
    };
   

    function postUser(user) {
        console.log("data factor ",user)
        return $http.post("/api/users/register", user).then(complete).catch(failed);
    }

    function logInUser(user) {
        console.log("data factor ",user)
        return $http.post("/api/users/login", user).then(complete).catch(failed);
    }

    function complete(response) {
        console.log(response.data);
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }

    
}