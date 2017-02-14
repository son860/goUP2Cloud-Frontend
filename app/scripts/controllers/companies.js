'use strict';
angular.module('appApp').controller('CompanyInsertCtrl', function($scope,  $location, $mdDialog, $auth, Company) {
	this.cancel = $mdDialog.cancel;
	  function success(data) {
	    $mdDialog.hide(data);
	  }
	  
	  this.addItem = function () {
	    $scope.form.$setSubmitted();
	    
	    if($scope.form.$valid) {
	      Company.save($scope.data, success);
	    }
	  };
});

angular.module('appApp').controller('CompaniesCtrl', function($scope,  $location, $mdDialog, $auth, Company) {
	$scope.selected = [];
	$scope.query = {
		order: 'name'
	};

	$scope.addItem = function (event) {
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: 'CompanyInsertCtrl',
			controllerAs: 'ctrl',
			focusOnOpen: false,
			targetEvent: event,
			templateUrl: 'views/companies/insert-dialog.html',
		}).then($scope.pushData);
	};

	$scope.pushData = function(data){
		$scope.data.push(data);
	}

	function success(result) {
		$scope.data = result;
	}

	$scope.getData = function () {

		$scope.promise = Company.query(function(result){
			success(result);
		}).$promise	

	};
	$scope.getData();

});	