/**
 * Created by jerry on 2017/3/9.
 */
'use strict';
// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ipCookie',
    'ngSanitize',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllersindex',
    'myApp.controllersmuseum',
    'myApp.controllersdisplay',
    'myApp.controllersdigitization',
    'myApp.controllerscollection',
    'myApp.controllerslogin',
    'myApp.controllersregister',
    'myApp.controllersactivity',
    'myApp.controllersArt',
    'myApp.controllershistory',
    'myApp.router'
])
    .run(['$rootScope','$http',function($rootScope,$http){
        $http({
            method:"GET",
            url:'../turnimghome/getmuseumList.do',
        })
            .success(function(response){
                $rootScope.imgUrlarr=response.data;
            })
    }])
;