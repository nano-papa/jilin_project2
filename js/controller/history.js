/**
 * Created by jerry on 2017/4/2.
 */
angular.module('myApp.controllershistory', [])
    .controller('History', ['$scope','$rootScope','ipCookie','$window','$http',function ($scope,$rootScope,ipCookie,$window,$http) {
        $rootScope.showIndex = true;
        $http({
            method:"GET",
            url:'../articleJiLin/getPCMipJiLinArticle.do'
        })
            .success(function(response){
                $scope.data=response.data;
                $scope.hot10=response.data.hotlList.filter(function(item,index){
                    return index>0
                })
            })
    }])
    .controller('Historylist', ['$scope','$rootScope','ipCookie','$window','$http','$stateParams',function ($scope,$rootScope,ipCookie,$window,$http,$stateParams) {
        $rootScope.showIndex = true;
        $scope.type=$stateParams.type;
        $scope.currentPage=1;
        $scope.getDataList=function(){
            $http({
                method:"GET",
                url:'../articleJiLin/getMoreMipJiLinArticles.do?type='+$stateParams.class+'&currentPage='+$scope.currentPage
            })
                .success(function(response){
                    $scope.data=response.data;
                    $scope.wenhua=response.data.c1.list.filter(function(item,index){
                        return index>0
                    });
                    $scope.lishi=response.data.c2.list.filter(function(item,index){
                        return index>0
                    });
                    $scope.lvyou=response.data.c3.list.filter(function(item,index){
                        return index>0
                    });
                });
        }
        $http({
            method:"GET",
            url:'../articleJiLin/getMoreMipJiLinArticles.do?type='+$stateParams.class+'&currentPage=1'
        })
            .success(function(response){
                $scope.pagecount=response.page.totalPage;
                laypage({
                    cont: $('.PagePlugs'),
                    pages: $scope.pagecount, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                    curr: $scope.currentPage,
                    skin: '#723f3f',
                    groups:5 , //连续显示分页数
                    jump: function (obj) { //触发分页后的回调
                        $scope.currentPage = obj.curr;
                        $scope.getDataList();
                    }
            });
        });
    }])
    .controller('Historydetials', ['$scope','$rootScope','ipCookie','$window','$http','$stateParams',function ($scope,$rootScope,ipCookie,$window,$http,$stateParams) {
        $rootScope.showIndex = true;
        $http({
            method:"GET",
            url:'../articleJiLin/getOneMipJiLinArticle.do',
            params:{
                id:$stateParams.id
            }
        })
            .success(function(response){
                $scope.data=response.data;
                $scope.hot10=response.data.hotlList.filter(function(item,index){
                    return index>0
                })
            })
    }]);