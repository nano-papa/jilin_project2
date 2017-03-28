/**
 * Created by jerry on 2017/3/24.
 */
'use strict';
angular.module('myApp.controllerslogin', [])
//登录
    .controller('login', ['$scope', '$rootScope', '$http', '$state','locals','ipCookie','$window', function ($scope, $rootScope, $http, $state,locals,ipCookie,$window) {
        $rootScope.showIndex = false;
        var height = $(window).height();
        $('.login').css('height', height);
        $scope.error=ipCookie('error');
        if(ipCookie('userinfor')){
            layer.msg('请先退出当前登录');
            $state.go('home');
        }
        // console.log( $scope.error);
        $scope.showForm = function () {
            $http({
                method: "POST",
                url: "../frontLogin.do",
                data:{
                    phone:$scope.username,
                    password:$scope.userpwd,
                    verificationCode:$scope.verificationcode
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var s in obj) {
                        str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                    }
                    return str.join("&");
                }
            }).success(function (response) {
                console.log(response);
                $scope.error=response.data.errorTimes;
                ipCookie('error',response.data.errorTimes);
                $scope.tip=response.data.tipMessage;
                $scope.errormsg=true;
                if(response.data.sessionAdminName){
                    var expires={expires:7}
                    ipCookie('userinfor',response.data,expires);
                    $rootScope.userinfor=response.data;
                    $state.go('home');
                }
            })

        }
        $scope.changeimg=function(e){
            angular.element(e.target).attr('src','../getImgCode.do?'+Math.random());
        }
    }])