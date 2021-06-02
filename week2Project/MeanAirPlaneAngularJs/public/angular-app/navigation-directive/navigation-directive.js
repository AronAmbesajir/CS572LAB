angular.module("meanAirplane").directive("airplaneNavigation", AirplanesNavigation);
function AirplanesNavigation() { 
return {
restrict: "E",
templateUrl: "angular-app/navigation-directive/navigation-directive.html",

}; }