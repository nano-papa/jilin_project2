/**
 * Created by jerry on 2017/4/1.
 */
'use strict';
angular.module('myApp.controllersArt', [])
//数字展厅
    .controller('Art', ['$scope', "$http", '$rootScope', function ($scope, $http, $rootScope) {
        $rootScope.showIndex = true;
        $scope.currentPage = 1;
        console.log(123);
        $scope.getDataList = function () {
            $http({
                method: "GET",
                url: '../wenChuang/getPCMipWenchuang.do?currentPage=' + $scope.currentPage
            })
                .success(function (response) {
                    $scope.data = response.data;
                    $scope.pages = response.page.totalPage;
                })
        };
        $http({
            method: "GET",
            url: '../wenChuang/getPCMipWenchuang.do?currentPage=' + $scope.currentPage
        })
            .success(function (response) {
                $scope.pages = response.page.totalPage;
                laypage({
                    cont: $('.PagePlugs'),
                    pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                    curr: $scope.currentPage,
                    skin: '#723f3f',
                    groups: 3, //连续显示分页数
                    jump: function (obj) { //触发分页后的回调
                        $scope.currentPage = obj.curr;
                        $scope.getDataList();
                    }
                });
            })
    }])
    .controller('ArtDetails', ['$scope', '$rootScope','$http','$stateParams',function ($scope, $rootScope,$http,$stateParams) {
        $rootScope.showIndex = true;
        console.log(123);
        $http({
            method: "GET",
            url: '../wenChuang/getOneMipWenchuang.do?id='+$stateParams.id
        })
            .success(function (response) {
                $scope.data = response.data;
            })
    }])
;