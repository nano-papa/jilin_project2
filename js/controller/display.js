/**
 * Created by jerry on 2017/3/23.
 */
'use strict';
angular.module('myApp.controllersdisplay', [])
//展览列表父控制器
.controller('Displaylist', ['$scope', '$rootScope', '$stateParams', function ($scope, $rootScope, $stateParams) {
    $rootScope.showIndex = true;
    $scope.tabpage = 1;
    $scope.tabChange = function (tabpage) {
        $scope.tabpage = tabpage;
    }
}])
//省内展览
 .controller('Displaylist.Pinner', ['$scope', '$http', '$rootScope', '$stateParams','$sce',function ($scope, $http, $rootScope, $stateParams,$sce) {
        $rootScope.showIndex = true;
        $scope.showData=false;
        $scope.remove = true;
        $scope.curr = 1;
        $scope.tabsubpage=1;
        // $scope.pages = 5;
        $scope.keyword = '';
        $scope.area = '';
        $scope.isA = false;
        $scope.isK = false;
        $scope.conditions = {
            currentPage: $scope.curr,
            spreType: $scope.tabsubpage,
            cityId: $scope.area,
            keys: $scope.keyword
        }
        $scope.arr = [];
        $scope.isClassify = true;
        $scope.isArea = false;
        $scope.isSelected = false;
        $scope.isunit = false;
        $scope.sce=$sce.trustAsHtml;
        $scope.getConditions = function () {
            $http({
                method: 'GET',
                url: '../spreadtrum/getPCSpreadtrum.do',
                // url:'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.conditionData = response.data.cityList;
                })
        };
        $scope.getDataList = function () {
            $http({
                method: 'GET',
                url: '../spreadtrum/getPCSpreadtrum.do',
                // url:'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    if (response.data.newSpreList) {
                        $scope.showData=false;
                        $scope.nDatalist = response.data.newSpreList;
                        if(response.data.newSpreList.length==0){
                            $scope.showData=true;
                        }
                    } else if(response.data.pastSpreList) {
                        $scope.showData=false;
                        $scope.nDatalist = response.data.pastSpreList;
                        if(response.data.pastSpreList.length==0){
                            $scope.showData=true;
                        }
                    }
                    // console.log((response.data.newSpreList.length&&response.data.pastSpreList.length)==0);
                    console.log($scope.showData);
                    response.page.totalPage = $scope.pages;
                })
        }
        // $scope.getDataList()
        //点击更多
        $scope.SlideDown = function (e) {
            angular.element(e.target).prev().toggleClass("slidedown");
            var height = angular.element(e.target).prev().css("height");
            angular.element(e.target).prev().prev().css("height", height);
        }
        $scope.getConditions();
        //切换正在展览和往期回顾
        $scope.changeListTab = function (tabpage) {
            console.log(tabpage);
            $scope.conditions.currentPage = 1;
            $scope.tabsubpage = tabpage;
            $scope.conditions.spreType = tabpage;
            $scope.laypage();
        }
        //检测是否存在筛选条件
        $scope.checkCondition = function () {
            $scope.isSelected = ($scope.arr.length == 0) ? false : true;
        }
        //显示筛选条件
        $scope.getClassify = function (e) {
            $scope.index = angular.element(e.target).attr('data-index');
            $scope.isArea = true;
        }
        $scope.getArea = function (e) {
            $scope.arr.push(1);
            $scope.area = angular.element(e.target).html();

            $scope.isArea = false;
            $scope.isA = true;
            $scope.isClassify = false;
            $scope.conditions.currentPage = 1;
            $scope.conditions.cityId = angular.element(e.target).attr('data-id');
            $scope.checkCondition();
            $scope.laypage();
        }
        $scope.removeArea = function () {
            $scope.arr.pop();
            $scope.conditions.cityId = '';
            $scope.isArea = false;
            $scope.isClassify = true;
            $scope.isA = false;
            $scope.conditions.currentPage = 1;
            $scope.checkCondition();
            $scope.laypage();
        }
        //显示关键字
        $scope.showKeyword = function () {
            $scope.value = $('#search_box').val().trim();
            console.log($scope.value);
            if ($scope.value && $scope.value != $scope.conditions.keys) {
                console.log($scope.arr);
                if ($scope.isK) {
                    $scope.conditions.keys = $scope.value;
                    $scope.conditions.currentPage = 1;
                    $scope.laypage();
                    $scope.checkCondition();
                } else {
                    $scope.isK = true;
                    $scope.conditions.keys = $scope.value;
                    $scope.conditions.currentPage = 1;
                    $scope.laypage();
                    $scope.arr.push(1);
                    $scope.checkCondition();
                }

            } else {
                return;
            }
        }
        //隐藏关键字
        $scope.hideKeyword = function () {
            $scope.isK = false;
            $scope.conditions.keys = '';
            $scope.conditions.currentPage = 1;
            $scope.arr.pop();
            $scope.laypage();
            $scope.checkCondition();
        }
        $scope.laypage = function () {
            $http({
                method: 'GET',
                url: '../spreadtrum/getPCSpreadtrum.do',
                // url:'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    $scope.pages=response.page.totalPage;
                    laypage({
                        cont: $('.PagePlugs'),
                        pages: $scope.pages, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                        curr: 1,
                        skin: '#723f3f',
                        groups: 5, //连续显示分页数
                        jump: function (obj) { //触发分页后的回调
                            $scope.conditions.currentPage = obj.curr;
                            $scope.getDataList();
                        }
                    });
                })
        }
        $scope.laypage();
        if ($stateParams.museum) {
            $scope.remove = false;
            $scope.arr.push(1);
            $scope.area = $stateParams.museum;
            $scope.isArea = false;
            $scope.isA = true;
            $scope.isClassify = false;
            $scope.conditions.currentPage = 1;
            $scope.conditions.musExhibition = $stateParams.id;
            $scope.checkCondition();
            $scope.laypage();
        }
    }])
 //展览详情页
.controller('Display.Details', ['$scope', '$http', '$stateParams', '$rootScope', '$sce',function ($scope, $http, $stateParams, $rootScope,$sce) {
        $rootScope.showIndex = true;
        $scope.sce=$sce.trustAsHtml;
        if ($stateParams.type == 'inner') {
            $scope.url='../spreadtrum/getOneSpreadtrum.do';
            // $scope.url='data/display-details.json';
        }
        $http({
            method: 'GET',
            url: $scope.url,
            params: {id: $stateParams.id}
        })
            .success(function (response) {
                $scope.detailsData = response.data;
            })
    }]);