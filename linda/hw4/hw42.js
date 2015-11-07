var macApp = angular.module('machineApp', []);

macApp.controller('machineCtrl', function ($scope, $http) {
  

  $http.get('http://50.116.7.241:3000/api/').success(function(data) {
    $scope.machines = data.api;
    
    for (var i = 0; i < $scope.machines.length; i++) {
      $scope.machines[i].usage = 0;
      $scope.machines[i].min = 100;
      $scope.machines[i].max = 0;
  }
  });


  $scope.getCPUUsage = function(i) {
    setInterval(
        function(){
           $http.get('http://50.116.7.241:3000/api/' + $scope.machines[i].id).success(function(data) {
            console.log("linda dai  test here enter");
            console.log(data);
            $scope.machines[i].usage = data;
            $scope.machines[i].min = Math.min($scope.machines[i].min, data);
            $scope.machines[i].max = Math.max($scope.machines[i].max, data);
   })},
    1000);
  };


 $scope.start = function(){
  
    for(var i = 0; i < $scope.machines.length; i++){
      
        $scope.getCPUUsage(i);
      }
  };
});