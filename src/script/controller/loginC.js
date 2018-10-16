app.controller('loginC', ["$rootScope", "$scope", "$http", "$timeout", function ($rootScope, $scope, $http, $timeout) {
    $http.get($rootScope.link + '/checkSession').success(function (data) {
        if (data.code == 200) {
            if (data.data == true) {
                window.location.href = 'http://' + window.location.host + '/wgcs/#/page34'
            } else {
            }
        }
    })
    $('.side-bar1').hide()
    $('.task-box').hide()
    $('.view-box').css('height', '60%')
    $rootScope.mainShow = false;
    /*用户名正则判断*/
    var getlocalAll = JSON.parse(localStorage.getItem("remember-me"));
    // console.log(getlocalAll)
    if (getlocalAll == null || getlocalAll.name == undefined || getlocalAll.pas == undefined || getlocalAll.name == null || getlocalAll.pas == null) {
        $('.remember-me-icon').removeClass('onhaha');
        $scope.indexs = 0;
        $scope.nameLogin = '';
        $scope.pasLogin = '';
    } else {

        $('.remember-me-icon').addClass('onhaha')
        $scope.nameLogin = getlocalAll.name
        $scope.pasLogin = getlocalAll.pas
        $scope.indexs = 1
    }
    $('.remember-me-icon').click(function () {
        $scope.indexs++;
        if ($scope.indexs % 2 == 0) {
            $('.remember-me-icon').removeClass('onhaha')
        } else {
            $('.remember-me-icon').addClass('onhaha')
        }
    })
    var uPattern = /^[a-zA-Z0-9_]{4,16}$/;
    $('.Verification-user').blur(function () {
        if (uPattern.test($scope.nameLogin) == true) {
            $('.login-tishi').hide()
        } else {
            console.log(11, $scope.nameLogin)
            $('.login-tishi').show().html('用户名由4到16位(字母,数字,下划线,减号)组成')
        }
    })
    // var uPattern1 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    var uPattern1 = /^[0-9a-zA-Z]{6,16}$/
    $('.Verification-password').blur(function () {
        if (uPattern1.test($scope.pasLogin) == true) {
            $('.login-tishi').hide()
        } else {
            console.log(11, $scope.nameLogin)
            $('.login-tishi').show().html('密码由6到16位(字母,数字)组成')
        }
    })
    $scope.sendMsg = function () {
        var a = sessionStorage.getItem("za-session");
        if (uPattern1.test($scope.pasLogin) == false || uPattern.test($scope.nameLogin) == false) {
            $('.login-tishi').show().html('用户名或密码不正确')
        } else {
            var sendObj = new FormData();
            sendObj.append('username', $scope.nameLogin);
            sendObj.append('password', $scope.pasLogin);
            $http({
                method: 'POST',
                url: $rootScope.link + '/login',
                data: sendObj,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                //上传成功的操作
                if (response.code == 200) {

                    if ($('.remember-me-icon').hasClass('onhaha')) {
                        var localAll = JSON.stringify({'name': $scope.nameLogin, 'pas': $scope.pasLogin});
                        localStorage.setItem("remember-me", localAll);
                    } else {
                        localStorage.removeItem('remember-me');
                    }
                    localStorage.setItem("sessionId", response.data);
                    window.location.href = 'http://' + window.location.host + '/wgcs/#/page34'
                } else {
                    $('.login-tishi').show().html(response.msg)
                }
            });
            /*发送验证成功后执行*/
        }
    }
}])
