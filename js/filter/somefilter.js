/**
 * Created by jerry on 2017/3/20.
 */
'use strict';
angular.module('myApp.filters', [])
    .filter('unique', function () {
        return function (collection, keyname) {
            var output = [],
                keys = [];
            angular.forEach(collection, function (item) {
                var key = item[keyname];
                if (keys.indexOf(key) === -1) {
                    keys.push(key);
                    output.push(item);
                }
            });
            return output;
        };
    })
    .filter('filterQQface', function () {
        //查看结果
        return function (str) {
            if (str) {
                str = str.replace(/\</g, '&lt;');
                str = str.replace(/\>/g, '&gt;');
                str = str.replace(/\n/g, '<br/>');
                str = str.replace(/\[em_([0-9]*)\]/g, '<img src="img/arclist/$1.gif" border="0" />');
            }
            return str;
        }
    })
    .filter('filterhtml', function () {
        return function (str) {
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&amp;/g, "");
            s = s.replace(/&lt;/g, "");
            s = s.replace(/&gt;/g, "");
            s = s.replace(/&nbsp;/g, "");
            s = s .replace(/<br>/g,'')
            return s;
        }
    })
    .filter('filterhtmln', function () {
        return function (str) {
            var s = "";
            if (str.length == 0) return "";
            s = str.replace(/&amp;/g, "");
            s = s.replace(/&lt;/g, "");
            s = s.replace(/&gt;/g, "");
            s = s.replace(/&nbsp;/g, " ");
            s = s .replace(/<br>/g,'')
            return s;
        }
    })
;