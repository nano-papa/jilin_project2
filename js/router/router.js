/**
 * Created by jerry on 2017/3/14.
 */

'use strict';
angular.module("myApp.router", ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider) {
        //重定向首页
        $urlRouterProvider.otherwise('/home');
        //一级栏目
        //首页
        $stateProvider
            .state("home", {
                url: '/home',
                templateUrl: 'views/index_v1.0.html',
                controller: "index_parentControl"
            })
            //登录
            .state('login', {
                url: '/loginPage',
                templateUrl: "views/login.html",
                controller: 'login'
            })
            //注册
            .state('Register',{
                url:'/Register',
                templateUrl:'views/register.html',
                controller:'Register'
            })
            // //策展列表
            // .state('ablum',{
            //         url:'/ablum',
            //         templateUrl:'template/album.html',
            //         controller:'Album'
            //     }
            // )
            // //策展详情
            // .state('ablumdetails',{
            //     url:'/ablumdetails',
            //     templateUrl:'template/ablum_details.html',
            //     controller:'AlbumDetails',
            // })
            //博物
            .state('museum', {
                url: '/museum',
                templateUrl: 'views/museum.html',
                controller: 'Museum'
            })
            .state('museum.museumMap', {
                url: '/museumMap',
                templateUrl: 'views/museumMap.html',
                controller: 'MuseumMap'
            })
            .state('museum.details', {
                url: '/museumDetails/:id',
                templateUrl: 'views/museumDetails.html',
                controller: 'MuseumDetails'
            })

            //数字博物馆
            .state('digitization', {
                url: '/digitization/:museum/:id',
                templateUrl: 'views/digitization.html',
                controller: 'Digization'
            })
            //藏品
            .state('collection', {
                url: '/collection/:museum/:type/:keywords/:id',
                views: {
                    '': {
                        templateUrl: 'views/collection.html',
                        controller: "Collection"
                    }
                }
            })
            .state('collectiondetails', {
                url: '/collectiondetails/:type/:id',
                views: {
                    '': {
                        templateUrl: 'views/collectionDetails.html',
                        controller: "CollectionDetails"
                    }
                }
            })
            .state('collectinodetailsvideo',{
                url:'/collectinodetailsvideo/:type/:id',
                views: {
                    '': {
                        templateUrl: 'views/collectionDetailsVideo.html',
                        controller: "CollectionDetailsVideo"
                    }
                }
            })
            //文创列表
            .state('Art', {
                url: '/Art:museum/:id',
                templateUrl: 'views/Art.html',
                controller:'Art'
            })
            .state('display', {
                url: '/display/:museum/:id',
                templateUrl: 'views/display.html',
                controller: 'Displaylist'
            })
            .state('displaydetails', {
                url: '/displayDetails/:type/:id',
                templateUrl: 'views/display_details.html',
                controller: 'Display.Details'
            })
            //活动
            .state('activity', {
                url: '/activity/:type/:id',
                templateUrl: 'views/activity.html',
                controller: 'Activity'
            })
            //活动详情页
            .state('activitydetails', {
                url: '/activitydetails/:id',
                templateUrl: 'views/activity_details.html',
                controller: 'Activity.Details'
            })
            //历史吉林
            .state('history',{
                url:"/history",
                templateUrl:"views/history.html",
                controller:'History'
            })
            //历史吉林列表页
            .state('historylist',{
                url:"/historylist/:type/:class",
                templateUrl:"views/history_list.html",
                controller:'Historylist'
            })
            //历史吉林详情页
            .state('historyDetails',{
                url:'/historydetails/:id',
                templateUrl:'views/history_details.html',
                controller:"Historydetials"
            })
        ;
    });
