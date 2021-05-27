angular.module("meanAirplane").factory("AirplaneDataFactory", AirplaneDataFactory);
function AirplaneDataFactory($http) {
    return {
        getAllAirplanes: getAllAirplanes,
        getOneAirplane: getOneAirplane
    };
    function getAllAirplanes() {
        return $http.get("/api/airplanes").then(complete).catch(failed);
    }
    function getOneAirplane(id) {
        return $http.get("/api/airplanes/" + id).then(complete).catch(failed);
    }
    function complete(response) {
        console.log(response.data);
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}