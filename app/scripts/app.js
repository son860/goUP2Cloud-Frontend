'use strict';
var apiURL = 'http://127.0.0.1:3000';

//! moment.js locale configuration
//! locale : Portuguese (Brazil) [pt-br]
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira
!function(a,b){"object"==typeof exports&&"undefined"!=typeof module&&"function"==typeof require?b(require("../moment")):"function"==typeof define&&define.amd?define(["../moment"],b):b(a.moment)}(this,function(a){"use strict";var b=a.defineLocale("pt-br",{months:"Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split("_"),monthsShort:"Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split("_"),weekdays:"Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),weekdaysShort:"Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),weekdaysMin:"Dom_2ª_3ª_4ª_5ª_6ª_Sáb".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD/MM/YYYY",LL:"D [de] MMMM [de] YYYY",LLL:"D [de] MMMM [de] YYYY [às] HH:mm",LLLL:"dddd, D [de] MMMM [de] YYYY [às] HH:mm"},calendar:{sameDay:"[Hoje às] LT",nextDay:"[Amanhã às] LT",nextWeek:"dddd [às] LT",lastDay:"[Ontem às] LT",lastWeek:function(){return 0===this.day()||6===this.day()?"[Último] dddd [às] LT":"[Última] dddd [às] LT"},sameElse:"L"},relativeTime:{future:"em %s",past:"%s atrás",s:"poucos segundos",m:"um minuto",mm:"%d minutos",h:"uma hora",hh:"%d horas",d:"um dia",dd:"%d dias",M:"um mês",MM:"%d meses",y:"um ano",yy:"%d anos"},ordinalParse:/\d{1,2}º/,ordinal:"%dº"});return b});

    // request permission on page load
    document.addEventListener('DOMContentLoaded', function () {
      if (Notification.permission !== "granted")
        Notification.requestPermission();
    });

    function pusherInitializer(key){
      var pusher = new Pusher('e71b7010d773909affaf', {
        encrypted: true
      });

      var channel = pusher.subscribe('new_service');
      channel.bind(key, function(data) {

        if (Notification.permission !== "granted")
          Notification.requestPermission();
        else {
          var notification = new Notification(data.title, {
            icon: 'images/logo.png',
            body: data.message,
          });

          notification.onclick = function () {

          };

        }

      });

    }



/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
 angular.module('appApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngMessages',
  'angularMoment',
  'gettext',
  'ngFileUpload',
  'ng-token-auth',
  'ngMaterial',
  'ngMdIcons',
  'md.data.table',
  'ngCpfCnpj',
  'angularLocalStorage'
  ])

 .run(function (gettextCatalog) {
  gettextCatalog.setCurrentLanguage(navigator.language || navigator.userLanguage);    
})
 .config(function($authProvider) {
  $authProvider.configure({
    apiUrl: 'http://127.0.0.1:3000',
    storage: 'localStorage',
    //omniauthWindowType: 'newWindow',
    handleLoginResponse: function(response) {
      if (response.success)
        toastr['success']('Welcome!');        
    },
    handleAccountUpdateResponse: function(response) {
    }    
  });
})
 // Palete color
 .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  //.primaryPalette('light-blue')  
          //.accentPalette('amber') 
          //.warnPalette('blue')                 
          //.backgroundPalette('grey')
          //.dark();
        })
 .config(function($httpProvider) {
  $httpProvider.interceptors.push('ErrorInterceptor');
});  






