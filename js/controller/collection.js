/**
 * Created by jerry on 2017/3/23.
 */
'use strict';
angular.module('myApp.controllerscollection', [])
//藏品主控制器
    .controller('Collection', ['$scope', '$stateParams', '$rootScope', function ($scope, $stateParams, $rootScope) {
        $rootScope.showIndex = true;
        $scope.tabisShow = true;
        $scope.id = 1;
        // $state.go('collection.relic',{id:$scope.id});
        $scope.isSelectedRelic = true;
        $scope.isSelectedSpecimen = false;
        $scope.tab = '文物藏品';
        $scope.showbtn = true;
        $scope.tabChange = function (e) {
            angular.element(e.target).addClass('active').siblings('button').removeClass('active')
            console.log(angular.element(e.target).html());
            if (angular.element(e.target).html() == '文物藏品') {
                $scope.isSelectedRelic = true;
                $scope.isSelectedSpecimen = false;
                $scope.tab = '文物藏品';
            } else {
                $scope.isSelectedRelic = false;
                $scope.isSelectedSpecimen = true;
                $scope.tab = '标本化石';
            }
        }
    }])
    //文物藏品列表页
    .controller('CollectionRelic', ['$scope', '$http', '$stateParams', '$rootScope', '$window', 'Getcookie',function ($scope, $http, $stateParams, $rootScope, $window,Getcookie) {
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
        $scope.selectedcondition = {year: '', unit: '', classify: '', sort: 1, keyword: '', iPage: 1};
        $scope.selected = {year: '', unit: '', classify: '', keyword: ''};
        $scope.arr = [];
        //检测是否存在筛选条件
        $scope.checkCondition = function () {
            $scope.isSelected = ($scope.arr.length == 0) ? false : true;
        }
        if ($stateParams.museum) {
            $scope.remove = false;
            $scope.isUnit = false;
            $scope.isArea = true;
            $scope.selectedcondition.unit = $stateParams.id;
            $scope.selected.unit = $stateParams.museum;
            $scope.isUnitshow = true;
            $scope.isUnit = false;
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            $scope.checkCondition();
        }
        if($stateParams.keywords){
            $scope.remove = false;
            $scope.isUnit = false;
            $scope.isArea = false;
            $scope.removekey=false;
            $scope.selectedcondition.keyword = $stateParams.keywords;
            $scope.selected.keywords = $stateParams.keywords;
            $scope.isUnitshow = false;
            $scope.isUnit = false;
            $scope.isKey=true;
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            $scope.checkCondition();

        }
        var oUl = document.getElementById('ul1');
        var aLi = oUl.getElementsByTagName('li');
        var iLen = aLi.length;
        var b = true;
        //初始化数据处理
        getList();
        function getList() {
            if($scope.iPage <= 5){
                // $http.get("../front/OCCollection/info.do?yearType="
                    $http.get("data/collection_data1.json?yearType="
                    + $scope.selectedcondition.year +
                    '&collectionUnit=' + $scope.selectedcondition.unit +
                    '&collectionsCategory=' + $scope.selectedcondition.classify +
                    '&order=' + $scope.selectedcondition.sort +
                    '&key=' + $scope.selectedcondition.keyword +
                    '&currentPage=' + $scope.selectedcondition.iPage)
                    .success(function (response) {
                        var data = response.data.mociList;
                        $scope.hasMore=(response.page.allRow>($scope.selectedcondition.iPage*20));
                        $scope.showData=(response.page.allRow<=0?true:false);
                        // if ($scope.iPage > 6) {
                        //     //后续没有数据了
                        //     return;
                        // }
                        for (var i = 0; i < data.length; i++) {
                            //获取高度最短的li
                            var _index = getShort();
                            var oDiv = document.createElement('div');
                            var oImg = document.createElement('img');
                            var ou = document.createElement('u');
                            var oi = document.createElement('i');
                            $(oi).attr({
                                "data-ccid":data[i].mipOpenCulturalrelicInfo.id
                            }).css({
                                cursor:'pointer'
                            })
                            oi.onclick=function(){
                                var id=$(this).attr('data-ccid');
                                var that=this;
                                var a=$(this).hasClass('active');
                                console.log(Getcookie('userinfor'));
                                if(Getcookie('userinfor')){
                                    if(!a){
                                        $.ajax({
                                            type:'GET',
                                            url:"../front/OCCollection/doCollect.do?collectionType=0&id="+id,
                                            dataType:"text",
                                            success:function(json){
                                                var datas=eval("("+json+")");
                                                $(that).addClass('active')
                                                layer.msg('收藏成功');
                                            }
                                        })
                                    }
                                    else{
                                        $.ajax({
                                            type:'GET',
                                            url:"../front/OCCollection/notCollect.do?collectionType=0&id="+id,
                                            dataType:"text",
                                            success:function(json){
                                                var datas=eval("("+json+")");
                                                $(that).removeClass('active')
                                                layer.msg('取消成功');
                                            }
                                        })
                                    }
                                }
                                else{
                                    layer.msg('请先登录');
                                }
                            };
                            (data[i].isCollected) ?
                                ($(oi).addClass('active')) : ($(oi).removeClass('active'));//判断有无收藏
                            (data[i].mipOpenCulturalrelicInfo.threeDimensionalCollection) ?
                                ($(ou).addClass("is3d")) : ($(ou).removeClass("is3d"))//判断是否3d

                            var ospan = document.createElement('span');
                            var oa = document.createElement('a');
                            $(oa).attr({
                                'href': "#/collectiondetails/Relic/" + data[i].mipOpenCulturalrelicInfo.id,
                                'target': "_blank"
                            });
                            oImg.src =data[i].picture.thumb2;
                            oImg.style.width = '278px';
                            oImg.style.height = data[i].picture.thumb2Height*(278/data[i].picture.thumb2Width) + 'px';
                            oa.appendChild(oImg);
                            var oP = document.createElement('p');
                            ospan.innerHTML = data[i].mipOpenCulturalrelicInfo.name;
                            oDiv.appendChild(oa);
                            oDiv.appendChild(oP);
                            oP.appendChild(ospan);
                            oDiv.appendChild(ou);
                            oDiv.appendChild(oi);
                            aLi[_index].appendChild(oDiv);
                        }
                        b = true;
                    });

            }else{
                return
            }
        }
        $window.onscroll = function () {

            var _index = getShort();
            var oLi = aLi[_index];

            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (getTop(oLi) + oLi.offsetHeight < document.documentElement.clientHeight + scrollTop) {

                if (b) {
                    b = false;
                    $scope.iPage++;
                    $scope.selectedcondition.iPage = $scope.iPage;
                    if($scope.hasMore){
                        getList();
                    }
                }

            }

        }
        function getShort() {
            var index = 0;
            var ih = aLi[index].offsetHeight;
            for (var i = 1; i < iLen; i++) {
                if (aLi[i].offsetHeight < ih) {
                    index = i;
                    ih = aLi[i].offsetHeight;
                }
            }
            return index;
        }

        function getTop(obj) {
            var iTop = 0;
            while (obj) {
                iTop += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return iTop;
        }

        //选择条件除了地区和收藏单位数据
        $scope.getDataList = function () {
            // $http.get("../front/OCCollection/info.do?yearType="
                $http.get("data/collection_data1.json?yearType="
                + $scope.selectedcondition.year +
                '&collectionUnit=' + $scope.selectedcondition.unit +
                '&collectionsCategory=' + $scope.selectedcondition.classify +
                '&order=' + $scope.selectedcondition.sort +
                '&key=' + $scope.selectedcondition.keyword +
                '&currentPage=' + $scope.selectedcondition.iPage)
                .success(function (response) {
                    $scope.data = response.data;
                    // $scope.showMorecondition();
                });
        }
        $scope.getDataList();

        //显示筛选条件
        $scope.getConditions = function (condition, val, e) {
            $scope[condition] = !$scope[condition];
            $scope.selectedcondition[val] = angular.element(e.target).attr('data-id');
            console.log(angular.element(e.target).attr('data-id'));
            $scope.selected[val] = angular.element(e.target).html();
            $scope.selectedcondition.iPage = 1;
            // }
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //隐藏筛选条件
        $scope.removeCondition = function (iscondition, val) {
            $scope[iscondition] = !$scope[iscondition];
            $scope.selectedcondition[val] = '';
            $scope.selected[val] = '';
            $scope.selectedcondition.iPage = 1;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //显示关键字
        $scope.showKeyword = function (condition, val, e) {
            $scope.value = $("#collection-search").val();
            if ($scope.value && $scope.value != $scope.selectedcondition.keyword) {
                console.log($scope.arr);
                if ($scope.isKey) {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
                    $scope.selected.keyword = $scope.value;
                    $scope.selectedcondition.iPage = 1;
                    $scope.iPage = 1;
                    $('#ul1 li').html(" ");
                    getList();
                    $scope.checkCondition();
                } else {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
                    $scope.selected.keyword = $scope.value;
                    $scope.selectedcondition.iPage = 1;
                    $scope.iPage = 1;
                    $scope.arr.push(1);
                    $('#ul1 li').html(" ");
                    getList();
                    $scope.checkCondition();
                }

            } else {
                return;
            }
        }
        //隐藏关键字
        $scope.hideKeyword = function (iscondition, val) {
            $scope[iscondition] = !$scope[iscondition];
            $scope.selectedcondition.keyword = '';
            $scope.selected.keyword = '';
            $scope.selectedcondition.iPage = 1;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();

        }
        //地区和收藏单位
        //获取地区
        $scope.getArea = function (e) {
            $scope.id = angular.element(e.target).attr('data-id');
            if ($scope.isUnitshow == true) {
                $scope.arr.pop();
            }
            $scope.isUnit = true;
            $scope.isUnitshow = false;
            $scope.checkCondition();
        }
        //获取收藏单位
        $scope.getUnit = function (e) {
            $scope.selectedcondition.unit = angular.element(e.target).attr('data-id2');
            $scope.selected.unit = angular.element(e.target).html();
            $scope.isUnitshow = true;
            $scope.isUnit = false;
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //移除收藏单位
        $scope.removeUnit = function () {
            $scope.selectedcondition.unit = '';
            $scope.selected.unit = '';
            $scope.isUnit = false;
            $scope.isUnitshow = false;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //点击更多
        $scope.SlideDown = function (e) {
            angular.element(e.target).prev().toggleClass("slidedown");
            var height = angular.element(e.target).prev().css("height");
            angular.element(e.target).prev().prev().css("height", height);
        }
        //切换最新和最热
        $scope.changeBtn = function (e) {
            $scope.isActive = !$scope.isActive;
            $scope.selectedcondition.iPage = 1;
            $scope.selectedcondition.sort = angular.element(e.target).attr('data-status');
            $scope.selected.sort = angular.element(e.target).html();
            ;
            $('#ul1 li').html(" ");
            $scope.iPage = 1;
            getList();
        }

    }])
    //文物标本列表
    .controller('CollectionSpecimen', ['$scope', '$http', '$stateParams', '$rootScope', '$window','Getcookie', function ($scope, $http, $stateParams, $rootScope, $window,Getcookie) {
        $rootScope.showIndex = true;
        $scope.showData=false;
        $scope.remove = true;
        //筛选条件
        $scope.isSelected = false;
        $scope.isClassify = false;
        $scope.isUnit = false;
        $scope.isActive = true;
        $scope.hasmore = false;
        $scope.isUnitshow = false;
        $scope.iPage = 1;
        $scope.selectedcondition = {year: '', unit: '', classify: '', sort: 1, keyword: '', iPage: 1};
        $scope.selected = {year: '', unit: '', classify: '', sort: '最新', keyword: '', iPage: 1};
        $scope.arr = [];
        //检测是否存在筛选条件
        $scope.checkCondition = function () {
            $scope.isSelected = ($scope.arr.length == 0) ? false : true;
        }
        if ($stateParams.museum) {
            $scope.remove = false;
            $scope.isUnit = false;
            $scope.isArea = true;
            $scope.selectedcondition.unit = $stateParams.id;
            $scope.selected.unit = $stateParams.museum;
            $scope.isUnitshow = true;
            $scope.isUnit = false;
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            $scope.checkCondition();

        }
        var oUl = document.getElementById('ul2');
        var aLi = oUl.getElementsByTagName('li');
        var iLen = aLi.length;
        var b = true;

        //初始化数据处理
        getList();
        function getList() {
            if($scope.iPage<=5){
                // $http.get("../front/OCFossil/info.do?yearType="
                    $http.get("data/collection_data2.json?yearType="
                    + $scope.selectedcondition.year +
                    '&collectionUnit=' + $scope.selectedcondition.unit +
                    '&collectionsCategory=' + $scope.selectedcondition.classify +
                    '&order=' + $scope.selectedcondition.sort +
                    '&key=' + $scope.selectedcondition.keyword +
                    '&currentPage=' + $scope.selectedcondition.iPage)
                    .success(function (response) {
                        var data = response.data.mociList;
                        $scope.hasMore=(response.page.allRow>($scope.selectedcondition.iPage*20));
                        $scope.showData=(response.page.allRow<=0?true:false);
                        for (var i = 0; i < data.length; i++) {
                            //获取高度最短的li
                            var _index = getShort();
                            var oDiv = document.createElement('div');
                            var oImg = document.createElement('img');
                            var ou = document.createElement('u');
                            var oi = document.createElement('i');
                            $(oi).attr({
                                "data-ccid":data[i].mipOpenFossilInfo.id
                            }).css({
                                cursor:'pointer'
                            })
                            oi.onclick=function(){
                                var id=$(this).attr('data-ccid');
                                var that=this;
                                var a=$(this).hasClass('active');
                                if(Getcookie('userinfor')){
                                    if(!a){
                                        $.ajax({
                                            type:'GET',
                                            url:"../front/OCCollection/doCollect.do?collectionType=1&id="+id,
                                            dataType:"text",
                                            success:function(json){
                                                var datas=eval("("+json+")");
                                                $(that).addClass('active')
                                                layer.msg('收藏成功');
                                            }
                                        })
                                    }
                                    else{
                                        $.ajax({
                                            type:'GET',
                                            url:"../front/OCCollection/notCollect.do?collectionType=1&id="+id,
                                            dataType:"text",
                                            success:function(json){
                                                var datas=eval("("+json+")");
                                                $(that).removeClass('active')
                                                layer.msg('取消成功');
                                            }
                                        })
                                    }
                                }
                                else{
                                    layer.msg('请先登录');
                                }
                            };
                            (data[i].isCollected) ?
                                ($(oi).addClass('active')) : ($(oi).removeClass('active'));
                            (data[i].mipOpenFossilInfo.threeDimensionalCollection) ?
                                ($(ou).addClass("is3d")) : ($(ou).removeClass("is3d"))
                            var ospan = document.createElement('span');
                            var oa = document.createElement('a');
                            $(oa).attr({
                                'href': "#/collectiondetails/Specimen/" + data[i].mipOpenFossilInfo.id,
                                'target': "_blank"
                            });
                            oImg.src = data[i].picture.thumb2;
                            oImg.style.width = '278px';
                            oImg.style.height = data[i].picture.thumb2Height*(278/data[i].picture.thumb2Width) + 'px';
                            oa.appendChild(oImg);
                            var oP = document.createElement('p');
                            ospan.innerHTML = data[i].mipOpenFossilInfo.name;
                            oDiv.appendChild(oa);
                            oDiv.appendChild(oP);
                            oP.appendChild(ospan);
                            oDiv.appendChild(ou);
                            oDiv.appendChild(oi);
                            aLi[_index].appendChild(oDiv);
                        }
                        b = true;
                    });

            }else {
                return
            }

        }

        $window.onscroll = function () {

            var _index = getShort();
            var oLi = aLi[_index];

            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            if (getTop(oLi) + oLi.offsetHeight < document.documentElement.clientHeight + scrollTop) {

                if (b) {
                    b = false;
                    $scope.iPage++;
                    $scope.selectedcondition.iPage = $scope.iPage;
                    if($scope.hasMore){
                        getList();
                    }
                }

            }

        }

        function getShort() {
            var index = 0;
            var ih = aLi[index].offsetHeight;
            for (var i = 1; i < iLen; i++) {
                if (aLi[i].offsetHeight < ih) {
                    index = i;
                    ih = aLi[i].offsetHeight;
                }
            }
            return index;
        }

        function getTop(obj) {
            var iTop = 0;
            while (obj) {
                iTop += obj.offsetTop;
                obj = obj.offsetParent;
            }
            return iTop;
        }

        //选择条件除了地区和收藏单位数据
        $scope.getDataList = function () {
            // $http.get("../front/OCFossil/info.do?yearType="
                $http.get("data/collection_data2.json?yearType="
                + $scope.selectedcondition.year +
                '&collectionUnit=' + $scope.selectedcondition.unit +
                '&collectionsCategory=' + $scope.selectedcondition.classify +
                '&order=' + $scope.selectedcondition.sort +
                '&key=' + $scope.selectedcondition.keyword +
                '&currentPage=' + $scope.selectedcondition.iPage)
                .success(function (response) {
                    $scope.data = response.data;
                    // $scope.showMorecondition();
                });
        }
        $scope.getDataList();

        //显示筛选条件
        $scope.getConditions = function (condition, val, e) {
            $scope[condition] = !$scope[condition];
            $scope.selectedcondition[val] = angular.element(e.target).attr('data-id');
            $scope.selected[val] = angular.element(e.target).html();
            $scope.selectedcondition.iPage = 1;
            // }
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //隐藏筛选条件
        $scope.removeCondition = function (iscondition, val) {
            $scope[iscondition] = !$scope[iscondition];
            $scope.selectedcondition[val] = '';
            $scope.selected[val] = '';
            $scope.selectedcondition.iPage = 1;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //显示关键字
        $scope.showKeywords = function (condition, val, e) {
            $scope.value = $("#collection-search1").val();
            console.log($scope.value);
            if ($scope.value && $scope.value != $scope.selectedcondition.keyword) {
                if ($scope.isKey) {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
                    $scope.selected.keyword=$scope.value;
                    $scope.selectedcondition.iPage = 1;
                    $scope.iPage = 1;
                    $('#ul2 li').html(" ");
                    getList();
                    $scope.checkCondition();
                } else {
                    $scope[condition] = true;
                    $scope.selectedcondition.keyword = $scope.value;
                    $scope.selected.keyword = $scope.value;
                    $scope.selectedcondition.iPage = 1;
                    $scope.iPage = 1;
                    $scope.arr.push(1);
                    $('#ul2 li').html(" ");
                    getList();
                    $scope.checkCondition();
                }

            } else {
                return;
            }
        }
        //隐藏关键字
        $scope.hideKeyword = function (iscondition, val) {
            $scope[iscondition] = !$scope[iscondition];
            $scope.selectedcondition.keyword = '';
            $scope.selectedcondition.iPage = 1;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul1 li').html(" ");
            getList();
            $scope.checkCondition();

        }
        //地区和收藏单位
        //获取地区
        $scope.getArea = function (e) {
            $scope.id = angular.element(e.target).attr('data-id');
            // $scope.selectedcondition.area=angular.element(e.target).html();
            // $scope.isArea=true;
            if ($scope.isUnitshow == true) {
                $scope.arr.pop();
            }
            $scope.isUnit = true;
            $scope.isUnitshow = false;
            $scope.checkCondition();
            // $scope.getDataList();
        }
        //获取收藏单位
        $scope.getUnit = function (e) {
            $scope.selectedcondition.unit = angular.element(e.target).attr('data-id2');
            $scope.selected.unit = angular.element(e.target).html();
            $scope.isUnitshow = true;
            $scope.isUnit = false;
            $scope.arr.push(1);
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //移除收藏单位
        $scope.removeUnit = function () {
            $scope.selectedcondition.unit = '';
            $scope.isUnit = false;
            $scope.isUnitshow = false;
            $scope.arr.pop();
            $scope.iPage = 1;
            $('#ul2 li').html(" ");
            getList();
            $scope.checkCondition();
        }
        //点击更多
        $scope.SlideDown = function (e) {
            angular.element(e.target).prev().toggleClass("slidedown");
            var height = angular.element(e.target).prev().css("height");
            angular.element(e.target).prev().prev().css("height", height);
        }
        //切换最新和最热
        $scope.changeBtn = function (e) {
            $scope.isActive = !$scope.isActive;
            $scope.selectedcondition.iPage = 1;
            $scope.selectedcondition.sort = angular.element(e.target).attr('data-status');
            $scope.selected.sort = angular.element(e.target).html();
            ;
            $('#ul2 li').html(" ");
            $scope.iPage = 1;
            getList();
        }

    }])
    //藏品详情页
    .controller('CollectionDetails', ['$scope', '$http', '$stateParams', '$window', '$rootScope', '$state', 'ipCookie','$sce','$interval',function ($scope, $http, $stateParams, $window, $rootScope, $state,ipCookie,$sce,$interval) {
        $rootScope.showIndex = true;
        $scope.$parent.showbtn = false;
        $scope.num = 0;
        $scope.num1 = 0;
        $scope.hasmoreleft = false;
        $scope.hasmoreright = true;
        $scope.hasmoreleft1 = false;
        $scope.hasmoreright1 = true;
        $scope.num2 = 0;
        $scope.pplay=false;
        $scope.sce=$sce.trustAsResourceUrl;
        $scope.open3D=function(url){
            $window.open(url);
        };
        $scope.playAudio=function(){
            $scope.pplay=!$scope.pplay;
            if($scope.pplay){
                document.getElementById('paudio').play();
            }else{
                document.getElementById('paudio').pause();
            }
        };
        $scope.addCollection = function (e) {
            if(ipCookie('userinfor')){
                var a = angular.element(e.target).hasClass('active');
                if (a) {
                    angular.element(e.target).removeClass('active');
                    $http.get("../front/OCCollection/notCollect.do?collectionType="
                        + ($stateParams.type == 'Relic' ? 0 : 1) +
                        '&id=' + $stateParams.id)
                        .success(function (response) {
                            layer.msg('取消成功');
                        });
                    $window.location.reload();
                } else {
                    angular.element(e.target).addClass('active');
                    $http.get("../front/OCCollection/doCollect.do?collectionType="
                        + ($stateParams.type == 'Relic' ? 0 : 1) +
                        '&id=' + $stateParams.id)
                        .success(function (response) {
                            layer.msg('收藏成功');
                        });
                    $window.location.reload();
                }
            }
            else{
                layer.msg('请先登录');
            }
        }
        $scope.getDetail = function () {
            $stateParams.type == 'Relic' ? $scope.url= "../front/OCCollection/detail.do?id=":$scope.url='../front/OCFossil/detail.do?id='
            console.log($scope.url);
            // $http.get($scope.url
                $http.get("data/collection_details.json?id="
                + $stateParams.id)
                .success(function (response) {
                    $scope.data = response.data.mocid||response.data.mofid;
                    $scope.correlation = response.data.relations
                        .slice(0, 5);
                    $scope.corother = response.data.otherMofiList.slice(0, 5);
                    ;
                    $scope.addPage = function (title) {
                        if (title === 'relations') {
                            if ($scope.num == 5) {
                                $scope.hasmoreleft = true;
                                $scope.hasmoreright = false;
                            }
                            if ($scope.num < 10) {
                                $scope.num += 5;
                                $scope.correlation = response.data[title]
                                    .slice($scope.num, $scope.num + 5);
                                return
                            }
                        } else {
                            if ($scope.num1 == 5) {
                                $scope.hasmoreleft1 = true;
                                $scope.hasmoreright1 = false;
                            }
                            if ($scope.num1 < 10) {
                                $scope.num1 += 5;
                                $scope.corother = response.data.otherMofiList
                                    .slice($scope.num1, $scope.num1 + 5);
                                return
                            }
                        }
                    }
                    $scope.reducePage = function (title) {
                        if (title === 'relations') {
                            if ($scope.num == 5) {
                                $scope.hasmoreleft = false;
                                $scope.hasmoreright = true;
                            }
                            if ($scope.num > 0) {
                                $scope.num -= 5;
                                $scope.correlation = response.data[title]
                                    .slice($scope.num, $scope.num + 5);
                            }
                            else {
                                return;
                            }
                        } else {
                            if ($scope.num1 == 5) {
                                $scope.hasmoreleft1 = false;
                                $scope.hasmoreright1 = true;
                            }
                            if ($scope.num1 > 0) {
                                $scope.num1 -= 5;
                                $scope.corother = response.data.otherMofiList
                                    .slice($scope.num1, $scope.num1 + 5);
                            }
                            else {
                                return;
                            }
                        }

                    }
                    $scope.videoid=$stateParams.id;
                    $scope.videotype=$stateParams.type;
                });
        }
        $scope.getDetail();
    }])
    //藏品视频
    .controller('CollectionDetailsVideo', ['$scope', '$http', '$stateParams', '$window', '$rootScope', '$sce',function ($scope, $http, $stateParams, $window, $rootScope,$sce) {
        $rootScope.showIndex = false;
        $scope.id=$stateParams.id;
        $scope.video = function () {
            $stateParams.type == 'Relic' ? $scope.url= "../front/OCCollection/detail.do?id=":$scope.url='../front/OCFossil/detail.do?id='
            // $http.get($scope.url
                $http.get("data/collection_details.json?id="
                + $stateParams.id)
                .success(function (response) {
                    $scope.sce=$sce.trustAsResourceUrl;
                    $scope.data = response.data.mocid||response.data.mofid;
                    var myPlayer = videojs('my-player');
                    videojs("my-player").ready(function () {
                        $('#my-player').css('width', $(document).width());
                        $('#my-player').css('height', $(document).height());
                    });

                });
        }
        $scope.video();
    }])