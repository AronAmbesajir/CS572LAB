angular.module("meanJob").factory("JobDataFactory", JobDataFactory);
function JobDataFactory($http) {
    return {
        getAllJobs: getAllJobs,
        getOneJob: getOneJob,
        postJob:postJob,
        deleteOneJob:deleteOneJob,
        updateJob:updateJob
    };
    function getAllJobs() {
        return $http.get("/api/jobs").then(complete).catch(failed);
    }
    function getOneJob(id) {
        return $http.get("/api/jobs/" + id).then(complete).catch(failed);
    }
    function postJob(job) {
        console.log(job);
        return $http.post("/api/jobs",job).then(complete).catch(failed);
    }
    function updateJob(id,job) {
        return $http.put("/api/jobs/" + id,job).then(complete).catch(failed);
    }
    function deleteOneJob(id) {
        return $http.delete("/api/jobs/" + id).then(complete).catch(failed);
    }

    function complete(response) {
        console.log(response.data);
        return response.data;
    }
    function failed(error) {
        return error.status.statusText;
    }
}