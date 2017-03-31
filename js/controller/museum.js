/**
 * Created by jerry on 2017/3/22.
 */
'use strict';
angular.module('myApp.controllersmuseum', [])
//博物馆主控制器
    .controller('Museum', ['$scope', '$scope', '$rootScope', '$stateParams', function ($scope, $stateParams, $rootScope) {
        $rootScope.showIndex = true;
    }])
    //博物馆地图
    .controller('MuseumMap', ['$scope', '$http', '$rootScope', '$stateParams', '$window', function ($scope, $http, $rootScope, $stateParams, $window) {
        $rootScope.showIndex = true;
        $scope.cityid = {id: 1};
        $scope.colorRating = [
            '#896e36',
            '#957a41',
            '#9b8350',
            '#9b8659',
            '#9c8a66',
            '#9e9072',
            '#ad9e7d',
            '#bead8a',
            '#d1bf99',
        ];
        $http({
            method: "GET",
            // url: 'data/data_map.json',
            url: '../area/getAreaList.do'
        }).success(function (response) {
            for (var i = 0, len = response.length; i < len; i++) {
                var index = response[i].cityOrder;
                $("#path" + (i + 1)).attr('fill', $scope.colorRating[index - 1])
            }
            $scope.cityData = response;
        });
        angular.element($("path[id^=path]")).hover(function () {
            $scope.color = $(this).attr("fill");
            $(this).css({
                cursor: 'pointer',
                fill: '#ea703a',
                transition: 'all .5s'
            })
        }, function () {
            $(this).css({
                    fill: $scope.color
                }
            )
        });
        $scope.changeCity = function (e) {
            $scope.cityid.id = angular.element(e.target)[0].id.slice(4)
        }
    }])
    //博物馆详情页
    .controller('MuseumDetails', ['$scope', '$rootScope','$http','$stateParams', '$sce',function ($scope, $rootScope,$http,$stateParams,$sce) {
        // $http({
        //     method:"GET",
        //     url:'data/museumslider.json',
        //     // url:'data/museumDetails.json',
        //     params:{orgId:$stateParams.id}
        // })
        //     .success(function(response){
        //         $scope.sliders=response;
        //         console.log($scope.sliders);
        //     });
        $scope.Rating=function(num){
            if(num===1){
                return '一级博物馆';
            }
            else if(num===2){
                return '二级博物馆';
            }
            else if(num===3){
                return '三级博物馆';
            }
            else if(num===4){
                return '未定级博物馆';
            }
        };
        $scope.slider6 = function () {
            $('.museum-details-img').unslider({
                autoplay: true,
                delay: 3000,
                animation: 'fade',
                arrows:false
            });
        };
        $http({
            method:"GET",
            url:'../museuminfo/getMuseum.do',
            // url:'data/museumDetails.json',
            params:{orgId:$stateParams.id}
        })
            .success(function(response){
                $scope.data=response.data;
                $scope.id=$stateParams.id;
                console.log(response.data);
                var map=''+response.data.museumInfo.geography;
                var width=308;
                var height=314;
                var reg1=/(width=\"?\d*\"?)/g;
                var reg2=/(height=\"?\d*\"?)/g;
                var map1=map.replace(reg1,'width='+width);
                var map2=map1.replace(reg2,'height='+height);
                angular.element('#map').attr('src',map2);
            });
        $scope.changeTab = function (e) {
            angular.element(e.target).addClass("active").siblings().removeClass("active");
            var index = angular.element(e.target).index();
            angular.element(".museum-details-service-content li").eq(index).addClass("active").siblings().removeClass("active");
            angular.element(".museum-details-service-content li").eq(index).find("p").removeClass("auto-height");
            $scope.btn = "查看全部";
        };
        $scope.btn = "查看全部";
        $scope.lookAll = function (e) {
            angular.element(e.target).parent().prev().toggleClass("auto-height");
            // angular.element(e.target).parent().prev().css("height",0);
            $scope.btn = ($scope.btn === "查看全部") ? '收起' : "查看全部";
        }
    }]);