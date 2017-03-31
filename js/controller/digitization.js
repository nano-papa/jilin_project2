/**
 * Created by jerry on 2017/3/23.
 */
'use strict';
angular.module('myApp.controllersdigitization', [])
//数字展厅
.controller('Digization', ['$scope', "$http", '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $scope.showData=false;
        $scope.showTab = true;
        $scope.showMore = function (e) {
            angular.element(e.target).addClass('showmore').removeClass('hide')
        };
        $scope.hide = function (e) {
            angular.element(e.target).removeClass('showmore').addClass('hide')
        };
        $scope.tabpage = 1;
        $scope.page = 1;
        $scope.museum = '';
        $scope.conditions = {
            currentPage: $scope.page,
            flag: $scope.tabpage,
            orgId: $scope.museum,
            size: '3'
        };
        $scope.changeTab = function (page) {
            $scope.tabpage = page;
            $scope.conditions.flag = page;
            $scope.laypage();
        };
        // // $http.get("../virtual/getPCVirtual.do?currentPage="+$scope.curr)
        // $http.get("data/v.json?currentPage=" + $scope.curr)
        //     .success(function (response) {
        //
        //     });
        $scope.laypage = function () {
            $http({
                method: "GET",
                url:'../virtual/getPCVirtual.do',
                // url: "data/v.json",
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.pages = response.page.totalPage;
                    $scope.data = response.data;
                    laypage({
                        cont: $('.PagePlugs'),
                        pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                        curr: 1,
                        skin: '#723f3f',
                        groups: 5, //连续显示分页数
                        jump: function (obj) { //触发分页后的回调
                            $scope.conditions.currentPage = obj.curr;
                            console.log($scope.pages);
                            $scope.getDataList();
                        }
                    });
                    $scope.addClick=function(id){
                        $http({
                            method:'GET',
                            url:'../virtual/addOnclick.do',
                            params:{id:id}
                        })
                            .success(function(respsonse){

                            });
                    }
                });
        };
        $scope.laypage();
        $scope.getDataList = function () {
            $http({
                method: "GET",
                url:'../virtual/getPCVirtual.do',
                // url: "data/v.json",
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.data = response.data;
                    if(response.data.length==0){
                        $scope.showData=true;
                    }
                });
        };
        if ($stateParams.museum) {
            $scope.showTab = false;
            $scope.conditions.orgId = $stateParams.id;
            $scope.museum = $stateParams.museum;
            $scope.getDataList();
        }
    }]);