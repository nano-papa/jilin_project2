/**
 * Created by jerry on 2017/3/31.
 */
/**
 * Created by jerry on 2017/3/23.
 */
'use strict';
angular.module('myApp.controllersactivity', [])
//数字展厅
    .controller('Activity', ['$scope', "$http", '$rootScope', '$stateParams','$sce', function ($scope, $http, $rootScope, $stateParams,$sce) {
        $rootScope.showIndex = true;
        $scope.showData=false;
        $scope.remove = true;
        $scope.curr = 1;
        $scope.keyword = '';
        $scope.area = 0;
        $scope.activityDate=$("#date").val();
        $scope.activityCategory=0;
        $scope.isA = false;
        $scope.isK = false;
        $scope.isT = false;
        $scope.isM=false;
        $scope.conditions = {
            currentPage: $scope.curr,
            orgId: $scope.area,
            keys: $scope.keyword,
            activityCategory:$scope.activityCategory,
            activityDate:$scope.activityDate
        };
        $scope.arr = [];
        $scope.isClassify = true;
        $scope.isArea = false;
        $scope.isSelected = false;
        $scope.sce=$sce.trustAsHtml;
        $scope.getConditions = function () {
            $http({
                method: 'GET',
                url: '../activity/getPCActivities.do',
                // url:'data/display.json',
            })
                .success(function (response) {
                    console.log(response);
                    $scope.conditionorgList = response.data.orgList;
                    $scope.conditioncategories = response.data.categories;
                })
        };
        $scope.getDataList = function () {
            $http({
                method: 'GET',
                url: '../activity/getPCActivities.do',
                // url:'data/display.json',
                params: $scope.conditions
            })
                .success(function (response) {
                    if (response.data.activities) {
                        $scope.showData=false;
                        $scope.nDatalist = response.data.activities;
                        if(response.data.newSpreList.length==0){
                            $scope.showData=true;
                        }
                    }
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
            $scope.conditions.orgId = angular.element(e.target).attr('data-id');
            $scope.checkCondition();
            $scope.laypage();
        }
        $scope.removeArea = function () {
            $scope.arr.pop();
            $scope.conditions.orgId = 0;
            $scope.isArea = false;
            $scope.isClassify = true;
            $scope.isA = false;
            $scope.conditions.currentPage = 1;
            $scope.checkCondition();
            $scope.laypage();
        }
        //活动种类
        $scope.gettype = function (e) {
            $scope.arr.push(1);
            $scope.activityCategory = angular.element(e.target).html();
            $scope.isArea = false;
            $scope.isT = true;
            $scope.conditions.currentPage = 1;
            $scope.conditions.activityCategory = angular.element(e.target).attr('data-id');
            $scope.checkCondition();
            $scope.laypage();
        }
        $scope.removetype = function () {
            $scope.arr.pop();
            $scope.conditions.activityCategory = 0;
            $scope.isT = false;
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
        $scope.searchTime=function(){
            if($scope.activityDate==''){
                $scope.conditions.activityDate=$("#date").val();
                $scope.activityDate=$("#date").val();
                $scope.arr.push(1);
                $scope.isM = true;
                $scope.checkCondition();
                $scope.laypage();
            }else{
                layer.msg('请选中时间！')
            }
        };
        $scope.removeTime=function(){
            $scope.isM = false;
            $scope.conditions.activityDate="";
            $scope.activityDate='';
            $("#date").val('');
            $scope.arr.pop();
            $scope.checkCondition();
            $scope.laypage();
        }
        $scope.laypage = function () {
            $http({
                method: 'GET',
                url: '../activity/getPCActivities.do',
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
        laydate({
            elem: '#date',
            format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
            isclear: true //是否显示清空
        });
    }])
    .controller('Activity.Details',['$scope', '$http', '$stateParams', '$rootScope', '$sce',function ($scope, $http, $stateParams, $rootScope,$sce){
        $rootScope.showIndex = true;
        $scope.sce=$sce.trustAsHtml;
        $http({
            method: 'GET',
            url:'../activity/getOneActivity.do',
            params: {id: $stateParams.id}
            // params: {id: "60783d21-7b09-4f7c-b911-3e121a12d578"}
        })
            .success(function (response) {
                $scope.detailsData = response.data;
            })
    }])
;