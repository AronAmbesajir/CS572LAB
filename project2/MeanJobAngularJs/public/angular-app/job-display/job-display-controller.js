angular.module("meanJob").controller("JobController", JobController);

function JobController(JobDataFactory, $routeParams) {
    console.log("reached")
    let vm = this;
    let id = $routeParams.id;
    vm.locationView=false;
    JobDataFactory.getOneJob(id).then(function (response) {
        vm.job = response;
    });

    vm.editJob=function(){
        
        vm.newJobTitle= vm.job.title,
       vm.newJobSalary=vm.job.salary,
        vm.newJobSExperience= vm.job.experience,
        vm.newJobDescription=vm.job.description,
        vm.newJobpostDate= vm.job.postDate,
    //    vm.newJobLocationx= vm.job.location.state,
    //     vm.newJobLocationy=vm.job.location.city,
        vm.newJobSkill=vm.job.skills[0]
       }

       vm.updateJob=function(){
        const newJob = {
            title: vm.newJobTitle,
            description: vm.newJobDescription,
            salary: vm.newJobSalary,
            experience:vm.newJobExperience,
            skill:vm.newJobSkill,
            postDate:vm.newJobDate
        };
        if (vm.jobForm.$valid) {
            JobDataFactory.updateJob(id,newJob).then(function (response) {

                console.log("Job Updated",newJob );
            }).catch(function (error) {
                console.log(error);
            });
        } 
}

    vm.deleteJob=function(){
        console.log("reached delete");
        JobDataFactory.deleteOneJob(id).then(function (response) {
            vm.deleteJob = response;
        });  
    }

}