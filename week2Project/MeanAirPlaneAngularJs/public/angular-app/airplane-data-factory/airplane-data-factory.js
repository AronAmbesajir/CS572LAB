angular.module("meanAirplane").factory("AirplaneDataFactory", AirplaneDataFactory);
function AirplaneDataFactory($http) {
    return {
        getAllAirplanes: getAllAirplanes,
        getOneAirplane: getOneAirplane,
        postAirplane:postAirplane,
        deleteOneAirplane:deleteOneAirplane,
        postUser:postUser,
        searchAirplane:searchAirplane
    };
    function getAllAirplanes() {
        return $http.get("/api/airplanes").then(complete).catch(failed);
    }
    function getOneAirplane(id) {
        return $http.get("/api/airplanes/" + id).then(complete).catch(failed);
    }
    function postAirplane(airplane) {
        return $http.post("/api/airplanes",airplane).then(complete).catch(failed);
    }
    function deleteOneAirplane(id) {
        return $http.delete("/api/airplanes/" + id).then(complete).catch(failed);
    }

    function postUser(user) {
        console.log("data factor ",user)
        return $http.post("/api/users/register", user).then(complete).catch(failed);
    }

    function searchAirplane(model) {
        console.log("factor ", model);
        return $http.get("/api/airplanesModel/" + model).then(complete).catch(failed);
    }
    function complete(response) {
        console.log(response.data);
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}