'use strict';
angular.module('appApp').controller('HomeCtrl', function($scope,  $location, $auth) {
	  
	  $scope.accountCreate = function() {
	  
	        $auth.submitRegistration($scope.createAccountForm)
	          .then(function(resp) {
	            toastr['success']('Account created. Check your email box for confirm your account');
	            $scope.loginForm = $scope.createAccountForm;
	            $scope.register = false;
	          })
	          .catch(function(resp) {	          	
	            $scope.error = resp;
	          });
	      };


	  $scope.login = function(provider) {
	      if (provider == 'email'){
	          $auth.submitLogin($scope.loginForm)
	              .then(function(resp) {
	              	debugger;
	              	  $scope.auth = JSON.parse(localStorage.getItem('userData'));

	                  $location.path('/companies');

	              })
	              .catch(function(resp) {
	                $scope.error = resp;
	              });
	          } else {
	                $auth.authenticate(provider)
	                    .then(function(resp) {	                    
	                    	console.log(resp);

	                    })
	                    .catch(function(resp) {
	                      $scope.error = resp;
	                  });        
	          }
	      
	  }; 
  

});