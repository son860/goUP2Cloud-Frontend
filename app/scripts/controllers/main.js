'use strict';
angular.module('appApp').controller('AppCtrl', function($scope,  $location, $rootScope, $auth, storage) {

  storage.bind($scope,'auth');
  $scope.showError = function(err) {
    err = err.msg || err.message || err
    //alert(err);
    //$mdToast.show($mdToast.simple().textContent(err));
  }
  $scope.showSuccess = function(success) {
    success = success.msg || success.message || success
    $mdToast.show($mdToast.simple().textContent(success));
  }

  $rootScope.$on('auth:validation-success', function(ev, user) {  	
    $scope.auth = JSON.parse(localStorage.getItem('userData'));
    $location.path('/companies');
  });

  $rootScope.$on('auth:login-success', function(ev, user) {    
    $scope.auth = JSON.parse(localStorage.getItem('userData'));
    $location.path('/companies');
  });

  $scope.logout = function(){
    $auth.signOut().then(function(resp) {
      $scope.auth = false;
      $location.path('/');
    })
    .catch(function(resp) {
              // handle error response
    });  
  }
});