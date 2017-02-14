/**
 * Directive to display ng-messages and bootstrap semantic class in form-control 
 *
 * Usage example:
 *  For messages: <my-bootstrap-show-errors name="inputName"></my-bootstrap-show-errors>
 *  For semantic form-control: <div class="form-control" my-bootstrap-show-errors='inputName'> ... </div>
 */
angular.module('appApp')
  .directive('myBootstrapShowErrors', ['$compile', function ($compile) {
    'use strict';

    return {
      restrict:'E',      
      template: function(elem, attr){
        var attrName = elem.parents('form')[0].name + '.' + elem.prev()[0].name;
        var html = '<div ng-messages="' +attrName+ '.$error" ng-show="(submitted || '+attrName+'.$touched) && '+attrName+'.$invalid" class="help-block"><div ng-messages-include="views/messages.html"></div></div>';
        return html;
      }
    };
  }])
  .directive('myBootstrapShowErrors', ['$compile', function ($compile) {
    'use strict';

    return {
          restrict: 'A',
          replace: false, 
          terminal: true, //this setting is important, see explanation below
          priority: 1000, //this setting is important, see explanation below
          
          link: function(scope, element, attrs) {
            
            
            var name = attrs.myBootstrapShowErrors;
            var ngClassValue = "{'has-error': (submitted || form." + name + ".$touched) && form." + name + ".$invalid, 'has-success': (submitted || form." + name + ".$touched) && !form." + name + ".$invalid }";
            element.removeAttr('my-bootstrap-show-errors')
            element.attr("ng-class", ngClassValue);        
            $compile(element)(scope);
            
          }
        };
    
  }]);


