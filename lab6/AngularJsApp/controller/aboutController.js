// angular.module("myControllerApp").controller("aboutController", aboutController);
// function aboutController() {
// var vm= this;
// vm.about= "This is my bio";
// }

angular.module("myProperApp").controller("AboutController", AboutController);

function AboutController(){
    var vm = this;
    vm.bio = "This is my bio";
}