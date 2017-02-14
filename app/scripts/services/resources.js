angular.module('appApp').factory('Company', function($resource) {
  return $resource(apiURL + '/companies/:id'); 
});