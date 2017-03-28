/**
 * Created by jerry on 2017/3/24.
 */
'use strict';
angular.module('myApp.controllersregister', [])
//注册
    .controller('Register',['$scope','$rootScope','$http','$interval','$state','ipCookie',function($scope,$rootScope,$http,$interval,$state,ipCookie){
        $rootScope.showIndex = true;
        $scope.status='获取验证码';
        $scope.send=true;
        $scope.first=true;
        $scope.secend=false;
        $scope.countdown=function () {
            if(!$scope.phone){
                layer.alert("请输入手机号",{icon:2});
                return;
            }else if(!$scope.piccode){
                layer.alert("请输入图形验证码",{icon:2});
                return;
            }
            else{
                $scope.count=59;
                $scope.send=false;
                $scope.status=$scope.count+'s可重发';
                var interval=$interval(function(){
                    $scope.status=($scope.count-1)+'s可重发';
                    $scope.count--;
                    if($scope.count<0){
                        $scope.count=59;
                        $scope.status='获取验证码';
                        $scope.send=true;
                        $interval.cancel(interval);
                    }
                },1000)
                $http({
                    method:"GET",
                    url:'../sendSecretCode.do',
                    params:{phone:$scope.phone,verificationCode:$scope.piccode}
                })
                    .success(function(response){
                        console.log(response.success)
                    })
            }

        }
        $scope.openmsg=function(){
            layer.open({
                type: 1
                ,title: false //不显示标题栏
                ,closeBtn: false
                ,area:  ['700px', '500px']
                ,shade: 0.8
                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                ,resize: false
                ,btn: ['已阅读']
                ,btnAlign: 'c'
                ,moveType: 1 //拖拽模式，0或者1
                ,content:
                    '<div style="font-size:12px;background:#fff;color:#333;padding:20px;overflow-y: scroll;line-height:1.5 ">'+
                    '<p>尊敬的客户，欢迎您注册成为本网站用户。在注册前请您仔细阅读如下服务条款：</p>'+
                    '<p>本服务协议双方为本网站与本网站客户，本服务协议具有合同效力。您确认本服务协议后，本服务协议即在您和本网站之间产生法律效力。请您务必在注册之前认真阅读全部服务协议内容，如有任何疑问，可向本网站咨询。无论您事实上是否在注册之前认真阅读了本服务协议，只要您点击协议正本下方的"注册"按钮并按照本网站注册程序成功注册为用户，您的行为仍然表示您同意并签署了本服务协议。协议细则</p>'+
                    '1、本网站服务条款的确认和接纳本网站各项服务的所有权和运作权归本网站拥有。'+

                    '2、用户必须：'+
                    '(1)自行配备上网的所需设备，包括个人电脑、调制解调器或其他必备上网装置。'+
                    '(2)自行负担个人上网所支付的与此服务有关的电话费用、网络费用。'+

                    '3、用户在本网站平台上不得发布下列违法信息：'+
                    '(1)反对宪法所确定的基本原则的；'+
                    '(2)危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；'+
                    '(3)损害国家荣誉和利益的；'+
                    '(4)煽动民族仇恨、民族歧视，破坏民族团结的；'+
                    '(5)破坏国家宗教政策，宣扬邪教和封建迷信的；'+
                    '(6)散布谣言，扰乱社会秩序，破坏社会稳定的；'+
                    '(7)散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；'+
                    '(8)侮辱或者诽谤他人，侵害他人合法权益的；'+
                    '(9)含有法律、行政法规禁止的其他内容的。'+

                    '4、有关个人资料用户同意：'+
                    '(1)提供及时、详尽及准确的个人资料。'+
                    '(2)同意接收来自本网站的信息。'+
                    '(3)不断更新注册资料，符合及时、详尽准确的要求。所有原始键入的资料将引用为注册资料。'+

                    '5、手机注册'+
                    '用户在注册时应当选择常用手机号码，并且同意接受并阅读本网站发往用户的各类验证码短信。如用户未及查看短信或因用户接收及阅读程序本身的问题使验证码短信及其他相关信息无法正常接收或阅读的，只要本网站成功发送了相关信息，应当视为用户已经接收到内容。短信在发信服务器上所记录的发出时间视为送达时间。'+

                    '6、服务条款的修改'+
                    '本网站有权在必要时修改服务条款，本网站服务条款一旦发生变动，将会在重要页面上提示修改内容。如果不同意所改动的内容，用户可以主动取消获得的本网站信息服务。如果用户继续享用本网站信息服务，则视为接受服务条款的变动。本网站保留随时修改或中断服务而不需通知用户的权利。本网站行使修改或中断服务的权利，不需对用户或第三方负责。'+

                    '7、用户的帐号、密码和安全性'+
                    '用户一旦注册成功成为用户，将得到一个密码和帐号。如果用户不保管好自己的帐号和密码安全，将负全部责任。另外，每个用户都要对其帐户中的所有活动和事件负全责。可随时根据指示改变密码，也可以结束旧的帐户重开一个新帐户。用户同意若发现任何非法使用用户帐号或安全漏洞的情况，请立即通知本网站。'+

                    '8、拒绝提供担保'+
                    '用户明确同意信息服务的使用由用户个人承担风险。本网站不担保服务不会受中断，对服务的及时性，安全性，出错发生都不作担保，但会在能力范围内，避免出错。'+

                    '9、有限责任'+
                    '本网站对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害来自：不正当使用本网站服务，或用户传送的信息不符合规定等。这些行为都有可能导致本网站形象受损，所以本网站事先提出这种损害的可能性，同时会尽量避免这种损害的发生。'+

                    '10、信息的储存及限制'+
                    '本网站有判定用户的行为是否符合本网站服务条款的要求和精神的权利，如果用户违背本网站服务条款的规定，本网站有权中断其服务的帐号。'+

                    '11、用户管理'+
                    '用户必须遵循：'+
                    '(1)使用信息服务不作非法用途。'+
                    '(2)不干扰或混乱网络服务。'+
                    '(3)遵守所有使用服务的网络协议、规定、程序和惯例。用户的行为准则是以因特网法规，政策、程序和惯例为根据的。'+

                    '12、保障'+
                    '用户同意保障和维护本网站全体成员的利益，负责支付由用户使用超出服务范围引起的律师费用，违反服务条款的损害补偿费用，其它人使用用户的电脑、帐号和其它知识产权的追索费。'+

                    '13、结束服务'+
                    '用户或本网站可随时根据实际情况中断一项或多项服务。本网站不需对任何个人或第三方负责而随时中断服务。用户若反对任何服务条款的建议或对后来的条款修改有异议，或对本网站服务不满，用户可以行使如下权利：'+
                    '(1) 不再使用本网站信息服务。'+
                    '(2) 通知本网站停止对该用户的服务。'+

                    '结束用户服务后，用户使用本网站服务的权利马上中止。从那时起，用户没有权利，本网站也没有义务传送任何未处理的信息或未完成的服务给用户或第三方。'+

                    '14、通告'+
                    '所有发给用户的通告都可通过重要页面的公告或电子邮件或常规的信件传送。服务条款的修改、服务变更、或其它重要事件的通告都会以此形式进行。'+

                    '15、信息内容的所有权'+
                    '本网站定义的信息内容包括：文字、软件、声音、相片、录象、图表以及本网站为用户提供的其它信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。所以，用户只能在本网站和广告商授权下才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。'+

                    '16、法律'+
                    '本网站信息服务条款要与中华人民共和国的法律解释一致。用户和本网站一致同意服从本网站所在地有管辖权的法院管辖。'+
                    '</div>'
                ,success: function(layero){

                }
            });
        }
        $scope.submitFun=function(){
            // $scope.first=false;
            // $scope.secend=true;
            $scope.formData={
                phone:$scope.phone,
                password:$scope.password,
                verificationCode:$scope.piccode,
                nickName:$scope.nikename,
                secretCode:$scope.secretCode
            }
            $http({
                method:"POST",
                url:'../front/register.do',
                data:$scope.formData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest:function (obj) {
                    var str = [];
                    for (var s in obj) {
                        str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]));
                    }
                    return str.join("&");
                }
            }).success(function(response){
                if(response.success==1){
                    ipCookie('error','');
                    $scope.first=false;
                    $scope.secend=false;
                    $scope.count2=5;
                    $scope.status2=$scope.count2+'s自动跳转到登录页';
                    var interval2=$interval(function(){
                        $scope.status2=($scope.count2-1)+'s自动跳转到登录页';
                        $scope.count2--;
                        if($scope.count2<0){
                            $scope.count2=5;
                            $scope.send=true;
                            $interval.cancel(interval2);
                            $state.go('login');
                        }
                    },1000)
                }
                else{
                    layer.alert(""+response.data.tipMessage,{icon:2});
                }
            })
        }
        $scope.changeimg=function(){
            angular.element('#imgcode').attr('src','../getImgCode.do?'+Math.random());
        }
    }]);