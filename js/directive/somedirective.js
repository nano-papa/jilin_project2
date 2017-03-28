/**
 * Created by jerry on 2017/3/20.
 */
'use strict';
angular.module('myApp.directives', [])
    .directive('repeatDone', function() {
        return {
            link: function(scope, element, attrs) {
                console.log(scope.$last);
                if (scope.$last) {
                    // 这个判断意味着最后一个 OK
                    scope.$eval(attrs.repeatDone)    // 执行绑定的表达式
                }
            }
        }
    })
;