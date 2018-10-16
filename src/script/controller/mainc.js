app.controller('mainC', ["$rootScope", "$scope", "$timeout", "$location", "$anchorScroll", "$http"
    , function ($rootScope, $scope, $timeout, $location, $anchorScroll, $http) {
        /*------设置选项开关-----*/

        $scope.Exitsystem = function () {
            localStorage.removeItem('sessionId');
            window.location.href = 'http://' + window.location.host + '/gcsscrm/#/page1?a=0'
        }
        $scope.IsShowSetup = function (event) {
            if ($(event.target).attr('data') == 0) {
                $rootScope.Setup = true
                $(event.target).attr('data', 1)
            } else {
                $(event.target).attr('data', 0)
                $rootScope.Setup = false
            }
        }
        $('.page1-Maindiv1-msg').mouseover(function () {
            $('.page1-Maindiv1-telephonebook-Explain').css('display', 'inline-block')
        })
        $('.page1-Maindiv1-msg').mouseout(function () {
            $('.page1-Maindiv1-telephonebook-Explain').css('display', 'none')
        })
        $('.page1-Maindiv1-telephonebook').mouseover(function () {
            $('.page1-Maindiv1-group-Explain').css('display', 'inline-block')
        })
        $('.page1-Maindiv1-telephonebook').mouseout(function () {
            $('.page1-Maindiv1-group-Explain').css('display', 'none')
        })

        $('.page1-Maindiv1-group').mouseover(function () {
            $('.page1-Maindiv1-Setup-Explain').css('display', 'inline-block')
        })
        $('.page1-Maindiv1-group').mouseout(function () {
            $('.page1-Maindiv1-Setup-Explain').css('display', 'none')
        })
        $scope.ChatShow = function () {
            $('.page1-Maindiv1-msg').css('background', ' url("./images/msg.png") center no-repeat')
            $('.page1-Maindiv1-telephonebook').css('background', ' url("./images/telephone-book.png") center no-repeat')
            $rootScope.ChataddressbookswitchingBook = false
            $rootScope.ChataddressbookswitchingChat = true
        }
        $scope.PhoeBookShow = function () {

            $('.personaldata-data-con-myself-1-input').attr('disabled', 'disabled').css('border', '1px solid transparent')
            $('.personaldata-data-con-myself-3-select').css('display', 'none')
            $('.personaldata-data-con-myself-3-span').css('display', 'inline-block')
            $('.personaldata-data-con-myself-5-textarea-whiteMeContent').attr("disabled", 'disabled').css('border', '1px solid  transparent')
            $('.edit-personaldata').html('修改资料').attr('data', 0)
            $('.personaldata').css('display', 'none')


            $('.page1-Maindiv1-telephonebook').css('background', ' url("./images/telephoneBookCheck.png") center no-repeat')
            $('.page1-Maindiv1-msg').css('background', ' url("./images/MsgCheck.png") center no-repeat')
            $rootScope.ChataddressbookswitchingBook = true
            $rootScope.ChataddressbookswitchingChat = false
            var Shortcutphrase = new FormData()
            Shortcutphrase.append('accountId', $rootScope.myaccountId)
            $http({
                method: 'POST',
                url: $rootScope.link + "/socialaccount/getSocialaccount",
                data: Shortcutphrase,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    for (var e = 0; e < response.data.socialaccountList.length; e++) {
                        if (response.data.socialaccountList[e].profilePhoto == '') {
                            response.data.socialaccountList[e].profilePhoto = './images/Destroy.png'
                        } else {
                            response.data.socialaccountList[e].profilePhoto = $rootScope.imgSrc + response.data.socialaccountList[e].profilePhoto
                        }

                    }
                    $rootScope.MaillistInitData = response.data.socialaccountList
                    if ($rootScope.MaillistInitData.length > 0) {
                        $rootScope.MaillistInitId = $rootScope.MaillistInitData[0].id
                        $rootScope.MaillistInitCId = $rootScope.MaillistInitData[0].cid
                        $rootScope.MaillistInitaccountId = $rootScope.MaillistInitData[0].accountId

                        var arrAl = []
                        arrAl.push($rootScope.MaillistInitId)
                        var oo = new FormData()
                        oo.append('ids', JSON.stringify(arrAl))
                        oo.append('accountId', $rootScope.myaccountId)
                        $http({
                            method: 'POST',
                            url: $rootScope.link + "/socialaccount/getChatroomAndContact",
                            data: oo,
                            headers: {'Content-Type': undefined},
                            transformRequest: angular.identity
                        }).success(function (response) {
                            $(".Maillist-myfriends-li-bottom-line li").eq(0).css('background-color', 'rgba(68, 186, 246, 0.05)').siblings().css('background-color', 'rgb(255, 255, 255)')
                            $rootScope.searchReturnList = [
                                [{name: '群'}, []], [{name: 'A'}, []], [{name: 'B'}, []], [{name: 'C'}, []], [{name: 'D'}, []], [{name: 'E'}, []], [{name: 'F'}, []], [{name: 'G'}, []], [{name: 'H'}, []], [{name: 'I'}, []], [{name: 'J'}, []], [{name: 'K'}, []], [{name: 'L'}, []], [{name: 'M'}, []], [{name: 'N'}, []], [{name: 'O'}, []], [{name: 'P'}, []], [{name: 'Q'}, []], [{name: 'R'}, []], [{name: 'S'}, []], [{name: 'T'}, []], [{name: 'U'}, []], [{name: 'V'}, []], [{name: 'W'}, []], [{name: 'X'}, []], [{name: 'Y'}, []], [{name: 'Z'}, []], [{name: '#'}, []]
                            ]
                            for (var i = 0; i < response.data.contactList.length; i++) {
                                if (response.data.contactList[i].profilePhoto == '' || response.data.contactList[i].profilePhoto == null || response.data.contactList[i].profilePhoto == undefined) {
                                    response.data.contactList[i].profilePhoto = './images/Destroy.png'
                                } else {
                                    response.data.contactList[i].profilePhoto = $rootScope.imgSrc + response.data.contactList[i].profilePhoto
                                }
                                for (var i1 = 0; i1 < $rootScope.searchReturnList.length; i1++) {
                                    if (response.data.contactList[i].fristWord == $rootScope.searchReturnList[i1][0].name) {
                                        $rootScope.searchReturnList[i1][1].push(response.data.contactList[i])
                                    }
                                }
                            }

                        });
                    }
                } else {
                }
            });
            $http({
                method: 'POST',
                url: $rootScope.link + "/groups/getGroups",
                data: $scope.MyFrienddata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                $rootScope.PhoneBookInformationGrouping = response.data.groupList
                setTimeout(function () {
                    $('#single1').multiselect({multiple: false, selectedHtmlValue: '请选择', setWidth: '148px'});
                }, 0)
            });
        }
    }]);