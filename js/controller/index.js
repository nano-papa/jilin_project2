/**
 * Created by jerry on 2017/3/20.
 */
angular.module('myApp.controllersindex', [])
    .controller('ParentControl', ['$scope','$rootScope','ipCookie','$window',function ($scope,$rootScope,ipCookie,$window) {
        $rootScope.showIndex = true;
        $rootScope.userinfor=ipCookie('userinfor');
        $scope.logout=function(e){
            e.preventDefault();
            $http({
                method:'GET',
                url:'../front/loginOut.do'
            })
                .success(function(){
                    console.log('登出成功！');
                    $window.location.reload();
                    ipCookie('userinfor','');
                    $rootScope.userinfor='';
                })
        }
        $scope.goback=function(){
            $window.open('../toLogin.do');
        }
        // $scope.gocollection=function(){
        //     $scope.keys=angular.element('#search').val();
        //     if($scope.keys){
        //         $state.go('collection',{keywords:$scope.keys})
        //     }
        //     else{
        //         layer.msg('请输入搜索关键字！');
        //         return
        //     }
        // }
    }])
    .controller('index_parentControl', ['$scope', '$rootScope','$http',function ($scope,$rootScope,$http) {
        $rootScope.showIndex = true;
        $scope.onetab=0;
        $scope.changeTabone=function(tab){
            $scope.onetab=tab;
        };
        $scope.twotab=0;
        $scope.changeTabtwo=function(tab){
            $scope.twotab=tab;
        };
        $http({
            method:'GET',
            url:'../homePage/getHomePage.do',
            // url:'data/index.json'
        })
            .success(function(response){
                $scope.data=response.data;
                $rootScope.mobile_url=response.data.mbRootpath;
            });
        $scope.slider = function () {
            $('.slider').unslider({
                autoplay: true,
                delay: 3000,
                arrows: {
                    prev: '<a class="unslider-arrow prev"></a>',
                    next: '<a class="unslider-arrow next"></a>',
                },
                animation: 'fade'
            });
        }
    }])

;