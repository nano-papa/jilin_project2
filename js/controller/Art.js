/**
 * Created by jerry on 2017/4/1.
 */
'use strict';
angular.module('myApp.controllersArt', [])
//数字展厅
    .controller('Art', ['$scope', "$http", '$rootScope', '$stateParams', function ($scope, $http, $rootScope, $stateParams) {
        $rootScope.showIndex = true;
        $rootScope.showIndex = true;
        $scope.showData=false;
        $scope.remove = true;
        $scope.removekey=true;
        //筛选条件
        $scope.isSelected = false;
        $scope.isClassify = false;
        $scope.isUnit = false;
        $scope.isActive = true;
        $scope.hasmore = false;
        $scope.isUnitshow = false;
        $scope.iPage = 1;
        // $scope.isClassify = true;
        // $scope.isArea = false;
        // laypage({
        //     cont: $('.PagePlugs'),
        //     pages: 5, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
        //     curr: 1,
        //     skin: '#723f3f',
        //     groups: 5, //连续显示分页数
        //     jump: function (obj) { //触发分页后的回调
        //         // $scope.conditions.currentPage = obj.curr;
        //         // console.log($scope.pages);
        //         // $scope.getDataList();
        //     }
        // });
        // laydate({
        //     elem: '#date',
        //     format: 'YYYY-MM-DD', // 分隔符可以任意定义，该例子表示只显示年月
        //     isclear: true //是否显示清空
        // });
    }])
    // .controller('Activity.Details',['$scope','$rootScope',function($scope,$rootScope){
    //     $rootScope.showIndex = true;
    // }])
;