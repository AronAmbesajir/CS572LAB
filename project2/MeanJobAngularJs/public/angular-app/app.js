angular.module("meanJob", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "angular-app/job-list/jobs.html",
        controller : "JobsController",
        controllerAs: "vm"
    })
    .when("/job/:id", {
        templateUrl: "angular-app/job-display/job.html",
        controller : "JobController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    })
}