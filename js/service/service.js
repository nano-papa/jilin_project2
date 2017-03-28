/**
 * Created by jerry on 2017/3/20.
 */
angular.module('myApp.services', [])
    .service('loginService',function() {
        this.model={};
        this.getmodel=function(model){
            this.model=model;
        }
        return this
    })
    .factory('locals',['$window',function($window){
        return{        //存储单个属性
            set :function(key,value){
                $window.localStorage[key]=value;
            },        //读取单个属性
            get:function(key,defaultValue){
                return  $window.localStorage[key] || defaultValue;
            },        //存储对象，以JSON格式存储
            setObject:function(key,value){
                $window.localStorage[key]=JSON.stringify(value);
            },        //读取对象
            getObject: function (key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }

        }
    }])
    .factory('Getcookie',function(){
        return function getCookie(name){
            /* 获取浏览器所有cookie将其拆分成数组 */
            var arr=document.cookie.split('; ');
            for(var i=0;i<arr.length;i++)    {
                /* 将cookie名称和值拆分进行判断 */
                var arr2=arr[i].split('=');
                if(arr2[0]==name){
                    return arr2[1];
                }
            }
            return '';
        }
    })
;
    // .service('loginService',function() {
    //     this.model={};
    //     this.getmodel=function(model){
    //         this.model=model;
    //     }
    //     return this
    // })