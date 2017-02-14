angular.module('appApp')
.directive('mdbSelect', function($timeout){
   return {
       restrict: 'A',
       link: function($scope, $elem, attrs){
        $scope.$watch('$last',function(newValue,oldValue){                        
          
          if (newValue){                                 
            
            $timeout(function() {$($elem.parent()).material_select();}, 0);
          }
        });


       }
   }
});