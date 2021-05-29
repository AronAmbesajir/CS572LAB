angular.module("meanJob").controller("JobsController", JobsController);

function JobsController(JobDataFactory) {
    let vm = this;
    vm.isNew= true;
    vm.title = "Mean Job App";
    JobDataFactory.getAllJobs().then(function (response) {
        vm.jobs = response;
    });


    vm.addJob = function () {
       
        const newJob = {
            title: vm.newJobTitle,
            description: vm.newJobDescription,
            salary: vm.newJobSalary,
            experience:vm.newJobExperience,
            skill:vm.newJobSkill,
            postDate:vm.newJobDate
        };
        if (vm.jobForm.$valid | vm.isNew) {
            JobDataFactory.postJob(newJob).then(function (response) {

                console.log("Job saved" );
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            vm.isNew = false;
        }
    };



}
