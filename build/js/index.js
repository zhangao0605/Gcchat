var app = angular.module('myApp', ['ngRoute']);
app.run(["$rootScope", "$location", "$http", "$timeout", "$compile", function ($rootScope, $location, $http, $timeout, $compile) {
    $rootScope.localUserName=$location.search().username
    $rootScope.myaccountId=$location.search().userId
    $rootScope.link = 'http://'+window.location.host+'/gcschat';
    $rootScope.link1 = 'http://'+window.location.host+'/gcschat';
    $rootScope.imgSrc = '';
    $rootScope.DownFile='./快捷回复模板.xls';
    $rootScope.DownFileOut="../gcschat/script/downfile";

    //
    // $rootScope.link1 = 'http://192.168.1.106:8080/gcschat';
    // $rootScope.imgSrc = ''
    // $rootScope.link = 'http://192.168.1.106:8080/gcschat';
    // $rootScope.localUserName = 'jerry'
    // $rootScope.myaccountId = 7
    // $rootScope.DownFile = $rootScope.link1 + '/script/downfiletest';
    // $rootScope.DownFile = './快捷回复模板.xls';
    // $rootScope.DownFileOut = "../gcschat/script/downfile";

    var emjoyAllGet = [
        '[微笑]', '[撇嘴]', '[色]', '[发呆]', '[得意]', '[流泪]', '[害羞]', '[闭嘴]', '[睡]', '[大哭]',
        '[尴尬]', '[发怒]', '[调皮]', '[呲牙]', '[惊讶]', '[难过]', '[酷]', '[冷汗]', '[抓狂]', '[吐]',
        '[偷笑]', '[愉快]', '[白眼]', '[傲慢]', '[饥饿]', '[困]', '[惊恐]', '[流汗]', '[憨笑]', '[悠闲]',
        '[奋斗]', '[咒骂]', '[疑问]', '[嘘]', '[晕]', '[疯了]', '[衰]', '[骷髅]', '[敲打]', '[再见]', '[擦汗]',
        '[抠鼻]', '[鼓掌]', '[糗大了]', '[坏笑]', '[左哼哼]', '[右哼哼]', '[哈欠]', '[鄙视]', '[委屈]', '[快哭了]', '[阴险]',
        '[亲亲]', '[吓]', '[可怜]', '[菜刀]', '[啤酒]', '[咖啡]', '[饭]', '[猪头]', '[玫瑰]', '[凋谢]', '[嘴唇]',
        '[爱心]', '[心碎]', '[蛋糕]', '[闪电]', '[炸弹]', '[刀]', '[足球]', '[瓢虫]', '[便便]', '[拥抱]',
        '[强]', '[弱]', '[握手]', '[胜利]', '[抱拳]', '[勾引]', '[拳头]', '[差劲]', '[爱你]', '[NO]',
        '[OK]', '[跳跳]', '[发抖]', '[怄火]', '[磕头]', '[激动]', '[献吻]'
    ]

    /*--------------------新消息右下角提示框----------------*/
    function DesktopNotifications(a, b, c, d) {
        var Notification = window.Notification || window.mozNotification || window.webkitNotification;
        if (c == undefined) {
            c = './images/Destroy.png'
        } else {

        }
        if (b.length >= 30) {
            b = b.slice(0, 30 + '...')

        } else {
        }

        if (!(Notification)) {
            alert('浏览器不支持桌面提醒')
        }
        // 获得权限
        //检查是否允许Notification
        else if (Notification.permission === 'granted') {
            var n = new Notification(a, {
                body: b,
                icon: c,
                data: d
            });
            n.onclick = function (event) {
                window.focus()
                event.preventDefault();
                var thisdata = ''
                var thisdataIsHave = false
                for (var k = 0; k < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; k++) {
                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][k].cid == this.data) {
                        thisdata = $rootScope.Chatwithfriends[$rootScope.lplplpl][k]
                        thisdataIsHave = true
                        break;
                    } else {
                    }
                }
                if (thisdataIsHave == true) {
                    $rootScope.NotificationsChat(thisdata.cid, thisdata.nickName || thisdata.noteName, thisdata.profilePhoto, thisdata.id, thisdata.socialaccountId, thisdata.type, thisdata.topNumber)
                } else {

                }
            }
            setTimeout(function () {
                n.close();
            }, 3000);
        } else if (Notification.permission !== 'denied') {
            //回调模式
            Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                    var n = new Notification(a, {
                        body: b,
                        icon: c,
                        data: d
                    });
                    n.onclick = function (event) {
                        window.focus()
                        event.preventDefault();
                        var thisdata = ''
                        var thisdataIsHave = false
                        for (var k = 0; k < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; k++) {
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][k].cid == this.data) {
                                thisdata = $rootScope.Chatwithfriends[$rootScope.lplplpl][k]
                                thisdataIsHave = true
                                break;
                            } else {
                            }
                        }
                        if (thisdataIsHave == true) {
                            $rootScope.NotificationsChat(thisdata.cid, thisdata.nickName || thisdata.noteName, thisdata.profilePhoto, thisdata.id, thisdata.socialaccountId, thisdata.type, thisdata.topNumber)
                        } else {

                        }
                    }
                    setTimeout(function () {
                        n.close();
                    }, 3000);
                }
            })
        }

    }

    /*--------------------新消息title提示框----------------*/
    var title_first = 0;

    function titleNotifications() {
        // $rootScope.titleNotiHave = false;
        var titleInit = '云客服系统'
        var aa = setInterval(function () {
            var title = document.title;
            if ($rootScope.titleNotiHave == true) {
                if (/新/.test(title) == false) {
                    document.title = '[新消息]';
                } else {
                    document.title = '云客服系统';
                }
            } else {
                document.title = titleInit;
            }
        }, 500);

        window.onfocus = function () {

            clearInterval(aa)
            $rootScope.titleNotiHave = false;
            document.title = titleInit;
        };
        window.onblur = function () {

            clearInterval(aa)
            $rootScope.titleNotiHave = false;
            document.title = titleInit;
        };

// for IE
        document.onfocusin = function () {
            $rootScope.titleNotiHave = false;
        };
        document.onfocusout = function () {
            $rootScope.titleNotiHave = true;
        };
    }

    /*-----------------------关闭当前页面取消请求消息---------------------*/
    window.addEventListener("beforeunload", function (e) {

        var aa = new FormData()
        aa.append('accountname', $rootScope.localUserName)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/message/colseGcMessageInfo",
            data: aa,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {

        })
        var confirmationMessage = '确定离开此页吗？本页不需要刷新或后退';
        (e || window.event).returnValue = confirmationMessage;     // Gecko and Trident

        return confirmationMessage;                                // Gecko and WebKit

    });

    /*----------------------模拟本人图片-----------------------*/
    $rootScope.Myhead = 'images/test.jpg'
    $rootScope.chatHead = ''
    /*---------消息库---------*/
    $rootScope.friendStorage = {}
    /*---------头像库---------*/
    $rootScope.friendHeader = {}
    /*---------所有好友所有资料库---------*/
    $rootScope.friendAndGroupStorage = []
    /*-----------微信账号昵称库---------------*/
    $rootScope.WeChatowner = {}
    /*-----------微信账号socialNumber库(微信号)---------------*/
    $rootScope.WeChatownersocialNumber = {}
    /*-----------微信账号头像库---------------*/
    $rootScope.WeChatownerHeader = {}
    /*-----------微信最近聊天群群成员昵称库---------------*/
    $rootScope.WeChatoMembersNickname = {}
    /*-----------微信最近聊天群群成员头像库---------------*/
    $rootScope.Groupmemberheadlibrary = {};
    /*--------------避免网络请求延迟-------------*/
    $rootScope.Wasterecovery = {};

    /*--------------聊天界面搜索历史  记录-------------*/
    $rootScope.Searchhistory_Chatting = [];
    /*--------------通信录界面搜索历史  记录-------------*/
    $rootScope.Searchhistory_Maillist = [];
    /*---------------获取聊天群群成员昵称--------------*/
    var getOldGroupMbs = new FormData()
    getOldGroupMbs.append('accountId', $rootScope.myaccountId)
    $http({
        method: 'POST',
        url: $rootScope.link + "/chatroommember/getAllChatroommemberByUserId",
        data: getOldGroupMbs,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            for (var mebs = 0; mebs < response.data.chatroommemberList.length; mebs++) {
                $rootScope.WeChatoMembersNickname[response.data.chatroommemberList[mebs].chatroomMemberWxid] = response.data.chatroommemberList[mebs].memberName
                $rootScope.Groupmemberheadlibrary[response.data.chatroommemberList[mebs].chatroomMemberWxid] = $rootScope.imgSrc + response.data.chatroommemberList[mebs].profilePhoto
            }
        }
        else {
        }
    })
    /*---------------初始化左侧好友列表--------------*/
    $rootScope.firendList = new FormData()
    $rootScope.firendList.append('accountId', $rootScope.myaccountId)
    /*------------最近聊天人库-------------*/
    $rootScope.Chatwithfriends = new Array()
    $rootScope.Chatwithfriends[-1] = []
    $http({
        method: 'POST',
        url: $rootScope.link + "/latelyChatroom/getRecentContactAndChatroom",
        data: $rootScope.firendList,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            for (var i2 = 0; i2 < response.data.list.length; i2++) {
                if (response.data.list[i2].profilePhoto == '') {
                    response.data.list[i2].profilePhoto = './images/Destroy.png'
                }
            }

            for (var i = 0; i < response.data.list.length; i++) {
                response.data.list[i].Deviceonline = 1
                if (response.data.list[i].profilePhoto == './images/Destroy.png') {
                } else {
                    response.data.list[i].profilePhoto = $rootScope.imgSrc + response.data.list[i].profilePhoto
                }
                response.data.list[i].noReadMessage = i
                $rootScope.Chatwithfriends[-1].push(response.data.list[i])
                if (response.data.list[i].lastChatrecord == [] || response.data.list[i].lastChatrecord == undefined) {
                    response.data.list[i].newMessage = ''
                }
                else if (response.data.list[i].lastChatrecord.length == 1) {
                    var newMsg = ''
                    if (response.data.list[i].type == 1 && response.data.list[i].lastChatrecord[0].msgStatus == 10) {


                        if (response.data.list[i].lastChatrecord[0].msgType == 495) {
                            var ArrHaveGroup_con = response.data.list[i].lastChatrecord[0].chatMessage.content
                            var ArrHaveGroup_Id = response.data.list[i].lastChatrecord[0].chatMessage.chatroommemberwxid
                            newMsg = ArrHaveGroup_con
                        } else {
                            newMsg = response.data.list[i].lastChatrecord[0].chatMessage
                            var ArrHaveGroup = newMsg.split(':<br>')
                            newMsg = ArrHaveGroup[1]
                        }

                    } else {
                        if (response.data.list[i].lastChatrecord[0].msgType == 3) {
                            newMsg = '[图片]'
                        } else if (response.data.list[i].lastChatrecord[0].msgType == 495) {
                            newMsg = '[图文链接]'
                        } else if (response.data.list[i].lastChatrecord[0].msgType == 1) {
                            newMsg = response.data.list[i].lastChatrecord[0].chatMessage
                        } else if (response.data.list[i].lastChatrecord[0].msgType == 496) {
                            newMsg = '[文件]'
                        }


                    }
                    response.data.list[i].newMessage = newMsg
                }
                else {
                    for (var aj = 0; aj < response.data.list[i].lastChatrecord.length; aj++) {
                        var newMsg = ''
                        // var msgIntoStrog
                        if (response.data.list[i].type == 1 && response.data.list[i].lastChatrecord[aj].msgStatus == 10) {


                            if (response.data.list[i].lastChatrecord[0].msgType == 495) {
                                var ArrHaveGroup_con = response.data.list[i].lastChatrecord[0].chatMessage.content
                                var ArrHaveGroup_Id = response.data.list[i].lastChatrecord[0].chatMessage.chatroommemberwxid
                                newMsg = ArrHaveGroup_con
                            } else {
                                newMsg = response.data.list[i].lastChatrecord[0].chatMessage
                                var ArrHaveGroup = newMsg.split(':<br>')
                                newMsg = ArrHaveGroup[1]
                            }
                            response.data.list[i].newMessage = newMsg
                        } else {
                            if (response.data.list[i].lastChatrecord[aj].msgType == 3) {
                                newMsg = '[图片]'
                            } else if (response.data.list[i].lastChatrecord[aj].msgType == 495) {
                                newMsg = '[图文链接]'
                            } else if (response.data.list[i].lastChatrecord[aj].msgType == 1) {
                                newMsg = response.data.list[i].lastChatrecord[aj].chatMessage
                            }else if (response.data.list[i].lastChatrecord[aj].msgType == 496) {
                                newMsg = '[文件]'
                            }
                            response.data.list[i].newMessage = newMsg
                        }

                    }
                }
            }
            $rootScope.frienfList = response.data.list
            if (response.data.sumtop >= 1) {
                $rootScope.TotopNum = response.data.sumtop - 1
            } else {
                $rootScope.TotopNum = 0
            }

        } else {
        }
    });
    $rootScope.AutomaticReturnSwitch = false;
    /*---------------自动回复开启关闭----------------*/

    $rootScope.Initializationofsocialnumbers = ''
    /*----------------初始化获取在线好友，群信息-----------------*/
    setTimeout(function () {
        $('#single').multiselect({multiple: false, selectedHtmlValue: '请选择', setWidth: '148px'});
    }, 1500)
    var getAllFriendInfo = new FormData()
    getAllFriendInfo.append('accountId', $rootScope.myaccountId)
    $http({
        method: 'POST',
        url: $rootScope.link + "/socialaccount/getSocialaccount",
        data: getAllFriendInfo,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        $rootScope.$watch(function () {
            $rootScope.Initializationofsocialnumbers = response.data.socialaccountList;
        })
        if (response.code == 200) {
            var dataLengtf = []
            for (var i = 0; i < response.data.socialaccountList.length; i++) {
                dataLengtf.push(response.data.socialaccountList[i].id)
            }
            var getAllFriendInfo1 = new FormData()
            getAllFriendInfo1.append('ids', JSON.stringify(dataLengtf))
            getAllFriendInfo1.append('accountId', $rootScope.myaccountId)
            $http({
                method: 'POST',
                url: $rootScope.link + "/socialaccount/getChatroomAndContact",
                data: getAllFriendInfo1,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    for (var i = 0; i < response.data.contactList.length; i++) {
                        if(response.data.contactList[i].profilePhoto==''){
                            response.data.contactList[i].profilePhoto ='./images/Destroy.png'
                        }else {
                            response.data.contactList[i].profilePhoto = $rootScope.imgSrc + response.data.contactList[i].profilePhoto
                        }
                        $rootScope.friendAndGroupStorage.push(response.data.contactList[i])
                    }
                    for (var i1 = 0; i1 < response.data.contactList.length; i1++) {
                        var mk = response.data.contactList[i1].cid
                        $rootScope.friendHeader[mk] = response.data.contactList[i1].profilePhoto
                    }
                }
            })
        } else {
        }
    })
    /*---------------------查询设备在线状态------------------------*/

    /*-----对应离线设备socialaccountId数组----*/
    $rootScope.Judgingthesendingmessage = new Array()
    /*-----对应在线设备socialaccountId数组----*/
    $rootScope.Judgingthesendingmessage1 = new Array()
    $rootScope.Judgingthesendingmessage2 = new Array()
    $rootScope.Judgingthesendingmessage3 = new Array()
    setTimeout(function Queryequipment() {
        var aa = new FormData();
        aa.append('accountId', $rootScope.myaccountId)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/device/devicesStatus",
            data: aa,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $rootScope.Judgingthesendingmessage = new Array()
                $rootScope.Judgingthesendingmessage2 = new Array()
                $rootScope.QueryequipmentAll = [];
                var isHave = 0;
                for (var i = 0; i < response.data.length; i++) {

                    if (response.data[i].deviceStatus == 0) {
                        $rootScope.QueryequipmentAll.push($rootScope.WeChatowner[response.data[i].socialaccountId])
                        $rootScope.Judgingthesendingmessage.push(response.data[i].socialaccountId)

                        isHave++
                    } else {
                        $rootScope.Judgingthesendingmessage2.push(response.data[i].socialaccountId)

                    }
                }
                if ($rootScope.Judgingthesendingmessage3 == $rootScope.Judgingthesendingmessage2) {

                } else {
                    for (var i1 = 0; i1 < $rootScope.Judgingthesendingmessage2.length; i1++) {
                        for (var i2 = 0; i2 < $rootScope.Chatwithfriends[$rootScope.Judgingthesendingmessage2[i1]].length; i2++) {
                            $rootScope.Chatwithfriends[$rootScope.Judgingthesendingmessage2[i1]][i2].Deviceonline = 1
                        }
                        for (var i3 = 0; i3 < $rootScope.Chatwithfriends[-1].length; i3++) {
                            if ($rootScope.Chatwithfriends[-1][i3].socialaccountId == $rootScope.Judgingthesendingmessage2[i1]) {
                                $rootScope.Chatwithfriends[-1][i3].Deviceonline = 1
                            }
                        }
                    }
                }
                if ($rootScope.Judgingthesendingmessage1 == $rootScope.Judgingthesendingmessage) {

                } else {
                    for (var i1 = 0; i1 < $rootScope.Judgingthesendingmessage.length; i1++) {
                        for (var i2 = 0; i2 < $rootScope.Chatwithfriends[$rootScope.Judgingthesendingmessage[i1]].length; i2++) {
                            $rootScope.Chatwithfriends[$rootScope.Judgingthesendingmessage[i1]][i2].Deviceonline = 0
                        }
                        for (var i3 = 0; i3 < $rootScope.Chatwithfriends[-1].length; i3++) {
                            if ($rootScope.Chatwithfriends[-1][i3].socialaccountId == $rootScope.Judgingthesendingmessage[i1]) {
                                $rootScope.Chatwithfriends[-1][i3].Deviceonline = 0
                            }
                        }
                    }
                }
                $rootScope.Judgingthesendingmessage1 = $rootScope.Judgingthesendingmessage
                $rootScope.Judgingthesendingmessage3 = $rootScope.Judgingthesendingmessage2
                if (isHave == 0) {
                    $('.querystate').css('display', 'none')

                } else {
                    $('.querystate').css('display', 'block')


                }
                setTimeout(function () {
                    Queryequipment()
                }, 10000)
            } else {
                setTimeout(function () {
                    Queryequipment()
                }, 10000)
            }
        })
    }, 5000)

    $rootScope.panduankuli = false;

    /*----------------------------聊天界面时间提示--------------------------*/


    /*----------------------查看新消息状态----------------------*/
    var Numberofrequests = 0;
    var troundjas = false;
    $rootScope.chengjie = ''
    var noHaveFriendCid = ''
    var ArrHaveGroup = [];
    var noHaveFriendsocialaccountId = ''
    var IsShowChatTime = false;
    var IsShowChatTime_Times = '';
    var IsShowChatTime_html
    var first_Important = setTimeout(function watchState() {
        $http.get($rootScope.link1 + '/message/getGcMessage?accountname=' + $rootScope.localUserName + '').success(function (data) {
            if (data.code == 200) {
                if (data.msg == 1) {
                    var userName = new FormData()
                    userName.append('accountname', $rootScope.localUserName)
                    $http({
                        method: 'POST',
                        url: $rootScope.link1 + "/message/getGcMessageInfo",
                        data: userName,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        noHaveFriendCid = ''
                        noHaveFriendsocialaccountId = ''
                        if (response.code == 200) {
                            for (var i = 0; i < response.data.length; i++) {
                                // console.log('$$$$$$$$$$$$$$$$$$$$$$   ' + i + '   $$$$$$$$$$$$$$$$$$$$$$')
                                if (response.data[i].socialaccountId != 0) {
                                    var whetherornottohave = false;
                                    noHaveFriendCid = response.data[i].cid
                                    noHaveFriendsocialaccountId = response.data[i].socialaccountId
                                    var Myownhead = $rootScope.WeChatownerHeader[noHaveFriendsocialaccountId]
                                    var noHaveFriendgroup = response.data[i].group
                                    var noHaveFriendmsgType = response.data[i].msgType
                                    var noHaveFriendmsgId = response.data[i].msgId
                                    var noHaveFriendMsg = response.data[i].msgContent
                                    var noHaveFriendsendType = response.data[i].sendType
                                    var noHaveFriendchatroomMemberWxid = response.data[i].chatroomMemberWxid
                                    var noHaveFriendsocialNumber = response.data[i].socialNumber
                                    var noHaveFriendfromUserName = response.data[i].fromUserName
                                    var noHaveFriendfromFileTitle = ''
                                    var noHaveFriendfromFileSize = ''
                                    var noHaveFriendfromFileId = ''
                                    if (response.data[i].msgType == 496) {
                                        noHaveFriendfromFileTitle = response.data[i].msgContent.title
                                        noHaveFriendfromFileSize = response.data[i].msgContent.filesize
                                        noHaveFriendfromFileId = response.data[i].msgId

                                    } else {
                                        noHaveFriendfromFileTitle = ''
                                        noHaveFriendfromFileSize = ''
                                        noHaveFriendfromFileId = ''
                                    }
                                    // console.log('$$$$$$$$$$$$$$$$$$$$$$   ' + Myownhead + '   $$$$$$$$$$$$$$$$$$$$$$')
                                    if (response.data[i].isShowDate == '') {
                                        IsShowChatTime = false
                                        IsShowChatTime_Times = ''
                                    } else {
                                        IsShowChatTime = true
                                        IsShowChatTime_Times = response.data[i].isShowDate.slice(10, 16)
                                        IsShowChatTime_html = '<li class="Read"><div class="chatTime_LongTime"><span class="chatTime_LongTime_span">' + IsShowChatTime_Times + '</span></div> </li>'
                                    }
                                    var NewMessageMints = ''
                                    if (noHaveFriendmsgType == 1) {
                                        var isTsd = false;
                                        var domainname = ['.com', '.net', '.org', '.com.cn', '.net.cn', '.org.cn', '.gov', 'www.', 'http', 'https'];
                                        for (var iq = 0; iq < domainname.length; iq++) {
                                            if (noHaveFriendMsg.indexOf('' + domainname[iq] + '') > 0) {
                                                isTsd = true
                                                break;
                                            }
                                        }
                                        if (isTsd == false) {
                                        } else {
                                            var reg = /((https?|ftp):\/\/)?([-A-Za-z0-9+&@#/%?=~_|!:,.;]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*\w)/ig;
                                            noHaveFriendMsg = noHaveFriendMsg.replace(reg, function (a, b, c) {
                                                return '<a class="open-other-url"  target="_blank"  href="' + a + '">' + a + '</a>';
                                            });
                                        }
                                    } else {

                                    }
                                    if (noHaveFriendmsgType == 495 || noHaveFriendmsgType == 496) {

                                    } else {
                                        var arr88 = noHaveFriendMsg.match(/\[[^\]]+\]/g);
                                        if (arr88 == null || arr88 == 0 || arr88 == undefined) {

                                        }
                                        else {
                                            var tt1 = []
                                            var tt2 = []
                                            for (var i1 = 0; i1 < arr88.length; i1++) {
                                                for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                                                    if (arr88[i1] == emjoyAllGet[i2]) {
                                                        tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                                                        tt2.push(emjoyAllGet[i2])
                                                    }
                                                }
                                            }
                                            for (var i7 = 0; i7 < tt1.length; i7++) {
                                                noHaveFriendMsg = noHaveFriendMsg.replace(tt2[i7], tt1[i7])
                                            }

                                        }
                                        NewMessageMints = noHaveFriendMsg.replace(/<br>/g, "")
                                    }
                                    /*-------------------图文链接赋值----------------*/
                                    if (noHaveFriendmsgType == 495) {
                                        $rootScope.img_text_title = noHaveFriendMsg.title
                                        $rootScope.img_text_content = noHaveFriendMsg.content
                                        $rootScope.img_text_url = noHaveFriendMsg.url
                                        $rootScope.img_text_icon = './images/link.png'
                                    }
                                    /*----------------群消息赋予表情---------------*/

                                    if (noHaveFriendgroup == 1) {
                                        if (noHaveFriendmsgType == 495 || noHaveFriendmsgType == 496) {
                                        } else {
                                            ArrHaveGroup = noHaveFriendMsg.split(':<br>')
                                            // if (noHaveFriendmsgType == 1) {
                                            //     var re = /(http:\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*)/g;
                                            //     ArrHaveGroup[1] = ArrHaveGroup[1].replace(re, function (a, b, c) {
                                            //         return '<a class="open-other-url"  target="_blank"  href="http://' + c + '">' + a + '</a>';
                                            //     });
                                            // } else {
                                            // }
                                            var mml = ArrHaveGroup[1]
                                            if (mml == undefined) {
                                                ArrHaveGroup[1] = ''
                                            } else {
                                                var arr88 = mml.match(/\[[^\]]+\]/g);
                                                if (arr88 == null || arr88 == 0 || arr88 == undefined) {
                                                    mml = ArrHaveGroup[1].replace(/<br>/g, "")
                                                } else {
                                                    var tt1 = []
                                                    var tt2 = []
                                                    for (var i1 = 0; i1 < arr88.length; i1++) {
                                                        for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                                                            if (arr88[i1] == emjoyAllGet[i2]) {
                                                                tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                                                                tt2.push(emjoyAllGet[i2])
                                                            }
                                                        }
                                                    }
                                                    for (var i8 = 0; i8 < tt1.length; i8++) {
                                                        mml = mml.replace(tt2[i8], tt1[i8])
                                                    }
                                                    ArrHaveGroup[1] = mml.replace(/<br>/g, "")
                                                }
                                            }
                                        }


                                    }
                                    else {
                                    }
                                    /*=================================================开始处理消息===================================================*/
                                    /*-------------好友消息------------*/
                                    if (noHaveFriendchatroomMemberWxid == '') {
                                        whetherornottohave = true;
                                        var llp = false
                                        for (var k = 0; k < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; k++) {
                                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][k].cid == noHaveFriendCid) {
                                                llp = true;
                                                break;
                                            } else {
                                                llp = false
                                            }
                                        }
                                        if (llp == true) {
                                            whetherornottohave = true;
                                        } else {
                                            whetherornottohave = false;
                                            if ($rootScope.friendStorage[noHaveFriendCid] == undefined) {
                                                whetherornottohave = false;
                                            } else {
                                                whetherornottohave = true;
                                            }
                                        }
                                    }
                                    /*-------------群消息------------*/
                                    else {
                                        for (var k = 0; k < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; k++) {
                                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][k].cid == noHaveFriendCid) {

                                                llp = true;
                                                break;
                                            } else {
                                                llp = false
                                            }
                                        }
                                        if (llp == true) {
                                            whetherornottohave = true;
                                            if (noHaveFriendmsgType == 1) {
                                                if ($rootScope.Groupmemberheadlibrary.hasOwnProperty(noHaveFriendchatroomMemberWxid)) {
                                                    whetherornottohave = true;
                                                } else {
                                                    whetherornottohave = false;
                                                }
                                            } else {

                                            }
                                        } else {
                                            whetherornottohave = false;
                                        }
                                    }


                                    if (whetherornottohave == true) {
                                        /*--------------当前新消息所属已经存在-------------*/
                                        var ThisGroupHeader = ''
                                        var ThisGroupMsg = ''
                                        var bothingRead
                                        // console.log('存在')
                                        /*-----------当前新信息为群消息----------*/
                                        if (noHaveFriendgroup == 1) {
                                            // console.log('群消息用户库存在')
                                            /*-----------查询群头像----------*/
                                            ThisGroupHeader = $rootScope.Groupmemberheadlibrary[noHaveFriendchatroomMemberWxid]

                                            var groupMberName = $rootScope.WeChatoMembersNickname[noHaveFriendchatroomMemberWxid]
                                            if (groupMberName == '' || groupMberName == undefined || groupMberName == null) {
                                                groupMberName = noHaveFriendchatroomMemberWxid
                                            }
                                            ThisGroupMsg = ArrHaveGroup[1]
                                            if (noHaveFriendmsgType == 1) {
                                                newMsgImg = ArrHaveGroup[1]
                                            } else if (noHaveFriendmsgType == 3) {
                                                newMsgImg = $rootScope.imgSrc + ArrHaveGroup[1]
                                            }
                                            if (ThisGroupHeader == '' || ThisGroupHeader == undefined) {
                                                ThisGroupHeader = './images/Destroy.png'
                                            }
                                            var msgAlert = ''
                                            var newMsgInku = ''
                                            if (noHaveFriendsendType == 0) {
                                                if (noHaveFriendmsgType == 1) {
                                                    msgAlert = ArrHaveGroup[1]
                                                    newMsgInku += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '<div class="nesHead">\n' +
                                                        '<img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="news">\n' +
                                                        '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        '                            ' + ArrHaveGroup[1] + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    msgAlert = '[图片]'
                                                    newMsgInku += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="news bigPicture" data="' + noHaveFriendmsgId + '" data1=' + noHaveFriendsocialNumber + '>\n' +
                                                        '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        "                           <img class=\"up-Img-Add\" src=" + $rootScope.imgSrc + ArrHaveGroup[1] + " alt=\"\">\n" +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 495) {
                                                    msgAlert = '[图文链接]'
                                                    newMsgInku += '                        <li class="Unread"  dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                        '                            <div class="news news-link">\n' +
                                                        '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                } else if (noHaveFriendmsgType == 496) {
                                                    msgAlert = '[文件]'
                                                    newMsgInku += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="news">\n' +
                                                        '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendfromFileTitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendfromFileSize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isme="true" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }
                                            }
                                            else {
                                                if (noHaveFriendmsgType == 1) {

                                                    msgAlert = ArrHaveGroup[1]
                                                    newMsgInku += '<li class="Unread"  dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + groupMberName + '\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                            ' + ArrHaveGroup[1] + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    msgAlert = '[图片]'
                                                    newMsgInku += '<li class="Unread"  dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + groupMberName + '\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers bigPicture"  data="' + noHaveFriendmsgId + '" data1=' + noHaveFriendsocialNumber + '>\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        "                           <img class=\"up-Img-Add\" src=" + $rootScope.imgSrc + ArrHaveGroup[1] + " alt=\"\">\n" +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 495) {
                                                    msgAlert = '[图文链接]'
                                                    newMsgInku += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + groupMberName + '\n' +
                                                        '                        </div>\n' +
                                                        '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                        '                            <div class="answers news-link">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                } else if (noHaveFriendmsgType == 496) {
                                                    msgAlert = '[文件]'
                                                    newMsgInku += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + groupMberName + '\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="answers">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendfromFileTitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendfromFileSize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isme="false" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }
                                            }

                                            var lastInku = $rootScope.friendStorage[noHaveFriendCid]
                                            $rootScope.friendStorage[noHaveFriendCid] = ''
                                            if (IsShowChatTime == true) {
                                                $rootScope.friendStorage[noHaveFriendCid] = lastInku + IsShowChatTime_html + newMsgInku
                                            } else {
                                                $rootScope.friendStorage[noHaveFriendCid] = lastInku + newMsgInku
                                            }

                                            var kuLoading = $rootScope.friendStorage[noHaveFriendCid].replace('undefined', '')
                                            $rootScope.friendStorage[noHaveFriendCid] = kuLoading
                                            bothingRead = ($rootScope.friendStorage[noHaveFriendCid].split('Unread')).length - 1;
                                            if (bothingRead >= 99) {
                                                bothingRead = '99+'
                                            } else {
                                            }
                                            /*-----------如果聊天窗口为当前来消息对应窗口----------*/
                                            if (noHaveFriendsocialaccountId == $rootScope.lplplpl || $rootScope.lplplpl == -1) {
                                                var msgIncore = ''
                                                // console.log('当前聊天窗口为新消息好友对应微信号下')
                                                for (var i1 = 0; i1 < $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].length; i1++) {
                                                    if ($rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].cid == noHaveFriendCid) {
                                                        $rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].lastChatTime = $rootScope.getNowFormatDate()
                                                    } else {
                                                    }
                                                }
                                                for (var i2 = 0; i2 < $rootScope.Chatwithfriends[-1].length; i2++) {
                                                    if ($rootScope.Chatwithfriends[-1][i2].cid == noHaveFriendCid) {
                                                        $rootScope.Chatwithfriends[-1][i2].lastChatTime = $rootScope.getNowFormatDate()
                                                    } else {
                                                    }
                                                }
                                                if ($('.page1-Maindiv3').attr('data') == noHaveFriendCid) {
                                                    // console.log('为当前聊天窗口')

                                                    if (IsShowChatTime == true) {
                                                        $('.newsList').append(IsShowChatTime_html)
                                                    } else {
                                                    }
                                                    if (noHaveFriendsendType == 0) {
                                                        if (noHaveFriendmsgType == 1) {
                                                            msgIncore = ArrHaveGroup[1]
                                                            $('.newsList').append('     <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                                '<div class="nesHead">\n' +
                                                                '<img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                                '                        </div>\n' +
                                                                '                        <div class="news">\n' +
                                                                '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                                '                            ' + ArrHaveGroup[1] + '\n' +
                                                                '                        </div>\n' +
                                                                '                    </li>')
                                                        } else if (noHaveFriendmsgType == 3) {
                                                            msgAlert = '[图片]'
                                                            msgIncore = '[图片]'
                                                            $('.newsList').append('     <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                                '                        <div class="nesHead">\n' +
                                                                '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                                '                        </div>\n' +
                                                                '                        <div class="news bigPicture"  data="' + noHaveFriendmsgId + '" data1=' + noHaveFriendsocialNumber + '>\n' +
                                                                '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                                "                           <img class=\"up-Img-Add\" src=" + $rootScope.imgSrc + ArrHaveGroup[1] + " alt=\"\">\n" +
                                                                '                        </div>\n' +
                                                                '                    </li>')
                                                        } else if (noHaveFriendmsgType == 495) {
                                                            msgAlert = '[图文链接]'
                                                            msgIncore = '[图文链接]'
                                                            $('.newsList').append('     <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                                '                        <div class="nesHead">\n' +
                                                                '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                                '                        </div>\n' +
                                                                '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                                '                            <div class="news news-link">\n' +
                                                                '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                                '                                <div class="defult-Link-Add">\n' +
                                                                '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                                '                                    <dl>\n' +
                                                                '                                        <dd>\n' +
                                                                '                                            <span class="up-file-con">\n' +
                                                                '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                                '                                        </dd>\n' +
                                                                '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                                '\n' +
                                                                '                                    </dl>\n' +
                                                                '                                </div>\n' +
                                                                '                            </div>\n' +
                                                                '                            </a>\n' +
                                                                '                        </li>')
                                                        } else if (noHaveFriendmsgType == 496) {
                                                            msgAlert = '[文件]'
                                                            msgIncore = '[文件]'
                                                            $('.newsList').append('                      <li class="Unread"  dataid='+noHaveFriendmsgId+'>\n' +
                                                                '                        <div class="nesHead">\n' +
                                                                '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                                '                        </div>\n' +
                                                                '                            <div class="news">\n' +
                                                                '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                                '                                <div class="up-file-Add">\n' +
                                                                '                                    <dl>\n' +
                                                                '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                                '                                        <dd>\n' +
                                                                '                                            <span class="defult-File-name">\n' +
                                                                '' + noHaveFriendfromFileTitle + '\n' +
                                                                '                                            </span>\n' +
                                                                '                                            <br>\n' +
                                                                '                                            <span class="defult-File-size">\n' +
                                                                '' + noHaveFriendfromFileSize + 'M\n' +
                                                                '                                            </span>\n' +

                                                                '                                        </dd>\n' +
                                                                '                                <div class="up-file-Down" isme="true" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + 'file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                                '                            </div>\n' +
                                                                '                                    </dl>\n' +
                                                                '                                </div>\n' +

                                                                '                            </div>\n' +
                                                                '                        </li>')
                                                        }
                                                    }
                                                    else {
                                                        if (noHaveFriendmsgType == 1) {
                                                            msgIncore = ArrHaveGroup[1]
                                                            $('.newsList').append('     <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                                '                        <div class="answerHead">\n' +
                                                                '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                                '                        </div>\n' +
                                                                '                        <div class="group_meber_name">\n' +
                                                                '                            ' + groupMberName + '\n' +
                                                                '                        </div>\n' +
                                                                '                        <div class="answers">\n' +
                                                                '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                                '                            ' + ArrHaveGroup[1] + '\n' +
                                                                '                        </div>\n' +
                                                                '                    </li>')
                                                        } else if (noHaveFriendmsgType == 3) {
                                                            msgIncore = '[图片]'
                                                            $('.newsList').append('     <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                                '                        <div class="answerHead bigPicture">\n' +
                                                                '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                                '                        </div>\n' +
                                                                '                        <div class="group_meber_name">\n' +
                                                                '                            ' + groupMberName + '\n' +
                                                                '                        </div>\n' +
                                                                '                        <div class="answers bigPicture"  data="' + noHaveFriendmsgId + '" data1=' + noHaveFriendsocialNumber + '>\n' +
                                                                '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                                "                           <img class=\"up-Img-Add\" src=" + $rootScope.imgSrc + ArrHaveGroup[1] + " alt=\"\">\n" +
                                                                '                        </div>\n' +
                                                                '                    </li>')
                                                        } else if (noHaveFriendmsgType == 495) {
                                                            msgAlert = '[图文链接]'
                                                            msgIncore = '[图文链接]'
                                                            $('.newsList').append('    <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                                '                        <div class="answerHead">\n' +
                                                                '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                                '                        </div>\n' +
                                                                '                        <div class="group_meber_name">\n' +
                                                                '                            ' + groupMberName + '\n' +
                                                                '                        </div>\n' +
                                                                '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                                '                            <div class="answers news-link">\n' +
                                                                '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                                '                                <div class="defult-Link-Add">\n' +
                                                                '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                                '                                    <dl>\n' +
                                                                '                                        <dd>\n' +
                                                                '                                            <span class="up-file-con">\n' +
                                                                '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                                '                                        </dd>\n' +
                                                                '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                                '\n' +
                                                                '                                    </dl>\n' +
                                                                '                                </div>\n' +
                                                                '                            </div>\n' +
                                                                '                            </a>\n' +
                                                                '                        </li>')
                                                        } else if (noHaveFriendmsgType == 496) {
                                                            msgAlert = '[文件]'
                                                            msgIncore = '[文件]'
                                                            $('.newsList').append('                     <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                                '                        <div class="answerHead">\n' +
                                                                '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                                '                        </div>\n' +
                                                                '                        <div class="group_meber_name">\n' +
                                                                '                            ' + groupMberName + '\n' +
                                                                '                        </div>\n' +
                                                                '                            <div class="answers">\n' +
                                                                '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                                '                                <div class="up-file-Add">\n' +
                                                                '                                    <dl>\n' +
                                                                '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                                '                                        <dd>\n' +
                                                                '                                            <span class="defult-File-name">\n' +
                                                                '' + noHaveFriendfromFileTitle + '\n' +
                                                                '                                            </span>\n' +
                                                                '                                            <br>\n' +
                                                                '                                            <span class="defult-File-size">\n' +
                                                                '' + noHaveFriendfromFileSize + ' M\n' +
                                                                '                                            </span>\n' +

                                                                '                                        </dd>\n' +
                                                                '                                <div class="up-file-Down" isme="false" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                                '                            </div>\n' +
                                                                '                                    </dl>\n' +
                                                                '                                </div>\n' +

                                                                '                            </div>\n' +
                                                                '                        </li>')
                                                        }
                                                    }


                                                    // titleNotifications()
                                                    /*----------------------滚动条位置继续下一操作--------------------*/
                                                    if ($rootScope.RightContscrollHeight - $rootScope.RightContoffsetHeight == $rootScope.RightContscrollTop) {
                                                        var DivscrollHeight = $('.RightCont')[0].scrollHeight
                                                        $('.RightCont').animate({scrollTop: DivscrollHeight}, 500)
                                                    } else {
                                                        $('.Newmessagereminding').css('display', 'block')
                                                    }
                                                    var firstIndex1 = 0;
                                                    var firstTop1 = 0;
                                                    var firstThis1 = '';
                                                    var firstIsTop = false
                                                    for (var iy = 0; iy < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; iy++) {
                                                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iy].cid == noHaveFriendCid) {
                                                            firstIndex1 = iy;
                                                            firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][iy]
                                                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iy].topNumber == 1) {
                                                                firstIsTop = true
                                                            }
                                                        }
                                                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iy].topNumber == 1) {
                                                            firstTop1++;
                                                        }
                                                    }
                                                    firstThis1.newMessage = msgIncore
                                                    if (firstIsTop == true) {
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis1)
                                                    } else {
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, firstThis1)
                                                    }

                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl].length > 50) {
                                                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl].slice(0, 50)
                                                    } else {
                                                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                                                    }
                                                    setTimeout(function () {

                                                        DesktopNotifications(noHaveFriendfromUserName, msgIncore, ThisGroupHeader, noHaveFriendCid)
                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                                                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                                                        if (ArrLength > 50) {
                                                            ArrLength = 50
                                                        } else {

                                                        }
                                                        for (var i = 0; i < ArrLength; i++) {
                                                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                                                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                                                            }
                                                            var bothingRead = 0
                                                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                                                if ($rootScope.friendStorage[VNcid].indexOf('Unread') != -1) {
                                                                    bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                                                    if (bothingRead > 99) {
                                                                        bothingRead = '99+'
                                                                    }
                                                                } else {
                                                                    bothingRead = 0
                                                                }

                                                                if (bothingRead > 0) {
                                                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                                                } else {
                                                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                                                }

                                                            } else {
                                                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                                            }
                                                        }
                                                    }, 0)

                                                    var pp = $rootScope.friendStorage[noHaveFriendCid].replace(/Unread/g, 'Read')
                                                    $rootScope.friendStorage[noHaveFriendCid] = pp;
                                                }
                                                /*-----------聊天窗口并非当前来消息对应窗口----------*/
                                                else {
                                                    var msgIncore = ''
                                                    if (noHaveFriendsendType == 0) {
                                                        if (noHaveFriendmsgType == 1) {
                                                            msgIncore = ArrHaveGroup[1]
                                                        } else if (noHaveFriendmsgType == 3) {
                                                            msgAlert = '[图片]'
                                                            msgIncore = '[图片]'

                                                        } else if (noHaveFriendmsgType == 495) {
                                                            msgAlert = '[图文链接]'
                                                            msgIncore = '[图文链接]'

                                                        } else if (noHaveFriendmsgType == 496) {
                                                            msgAlert = '[文件]'
                                                            msgIncore = '[文件]'

                                                        }
                                                    }
                                                    else {
                                                        if (noHaveFriendmsgType == 1) {
                                                            msgIncore = ArrHaveGroup[1]

                                                        } else if (noHaveFriendmsgType == 3) {
                                                            msgIncore = '[图片]'

                                                        } else if (noHaveFriendmsgType == 495) {
                                                            msgAlert = '[图文链接]'
                                                            msgIncore = '[图文链接]'
                                                        } else if (noHaveFriendmsgType == 496) {
                                                            msgAlert = '[文件]'
                                                            msgIncore = '[文件]'

                                                        }
                                                    }


                                                    // titleNotifications()
                                                    var firstIndex1 = 0;
                                                    var firstTop1 = 0;
                                                    var firstThis1 = '';
                                                    var firstIsTop = false
                                                    for (var ir = 0; ir < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; ir++) {
                                                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][ir].cid == noHaveFriendCid) {
                                                            firstIndex1 = ir;
                                                            firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][ir]
                                                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][ir].topNumber == 1) {
                                                                firstIsTop = true
                                                            }
                                                        }
                                                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][ir].topNumber == 1) {
                                                            firstTop1++;
                                                        }
                                                    }
                                                    firstThis1.newMessage = msgIncore
                                                    if (firstIsTop == true) {
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis1)
                                                    } else {
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, firstThis1)
                                                    }

                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl].length > 50) {
                                                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl].slice(0, 50)
                                                    } else {
                                                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                                                    }


                                                    setTimeout(function () {
                                                        DesktopNotifications(noHaveFriendfromUserName, msgIncore, ThisGroupHeader, noHaveFriendCid)
                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                                                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                                                        if (ArrLength > 50) {
                                                            ArrLength = 50
                                                        } else {

                                                        }
                                                        for (var i = 0; i < ArrLength; i++) {
                                                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                                                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                                                            }
                                                            var bothingRead = 0
                                                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                                                if ($rootScope.friendStorage[VNcid] == '' || $rootScope.friendStorage[VNcid] == undefined) {

                                                                } else {

                                                                    if ($rootScope.friendStorage[VNcid].indexOf('Unread') != -1) {
                                                                        bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                                                        if (bothingRead > 99) {
                                                                            bothingRead = '99+'
                                                                        } else {
                                                                            bothingRead
                                                                        }

                                                                    } else {
                                                                        bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                                                    }
                                                                }


                                                                if (bothingRead > 0) {
                                                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                                                } else {
                                                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                                                }

                                                            } else {
                                                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                                            }
                                                        }
                                                    }, 100)
                                                }


                                            }
                                            else {
                                                // console.log('当前聊天窗口非新消息群组对应微信号下')
                                                var isHave = false;
                                                var isNOHaveThis = '';
                                                var isHaveThis = '';
                                                var isTop = 0;

                                                DesktopNotifications(noHaveFriendfromUserName, msgAlert, ThisGroupHeader, noHaveFriendCid)
                                                // titleNotifications()
                                                for (var i1 = 0; i1 < $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].length; i1++) {
                                                    if ($rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].cid == noHaveFriendCid) {
                                                        isHaveThis = $rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1]
                                                        isHave = true;
                                                        break;
                                                    } else {
                                                        isHave = false;
                                                    }
                                                }
                                                if (isHave == true) {
                                                } else {
                                                    for (var i1 = 0; i1 < $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].length; i1++) {
                                                        if ($rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].topNumber == 1) {
                                                            isTop++;
                                                        } else {
                                                            break;
                                                        }
                                                    }
                                                    for (var i1 = 0; i1 < $rootScope.friendAndGroupStorage.length; i1++) {
                                                        if ($rootScope.friendAndGroupStorage[i1].cid == noHaveFriendCid) {
                                                            isNOHaveThis = $rootScope.friendAndGroupStorage[i1]
                                                            break;
                                                        } else {
                                                        }
                                                    }
                                                    isNOHaveThis.newMessage = ThisGroupMsg
                                                    isNOHaveThis.lastChatTime = $rootScope.getNowFormatDate()
                                                    if (isNOHaveThis.topNumber == 1) {
                                                        $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].splice(0, 0, isNOHaveThis)
                                                    } else {
                                                        $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].splice(isTop, 1)
                                                        $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].splice(isTop, 0, isNOHaveThis)

                                                    }

                                                }


                                            }
                                        }
                                        /*---------------当前消息为好友消息并非群消息----------------*/
                                        else {
                                            // console.log('好友消息用户库存在,头像库存在好友头像')
                                            ThisGroupHeader = $rootScope.friendHeader[noHaveFriendCid]
                                            ThisGroupMsg = NewMessageMints
                                            var msgAlert = ''
                                            var newMsgInku = ''
                                            if (noHaveFriendsendType == 0) {
                                                if (noHaveFriendmsgType == 1) {
                                                    msgAlert = ThisGroupMsg
                                                    newMsgInku = '                       <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="news">\n' +
                                                        '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        '                            ' + ThisGroupMsg + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    msgAlert = '[图片]'
                                                    newMsgInku = '                       <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="news bigPicture"  data="' + noHaveFriendmsgId + '" data1=' + noHaveFriendsocialNumber + '>\n' +
                                                        '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        "                           <img class=\"up-Img-Add\" src=" + ThisGroupMsg + " alt=\"\">\n" +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 495) {
                                                    msgAlert = '[图文链接]'
                                                    newMsgInku += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                        '                            <div class="news news-link">\n' +
                                                        '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                } else if (noHaveFriendmsgType == 496) {
                                                    msgAlert = '[文件]'
                                                    newMsgInku += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="news">\n' +
                                                        '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendfromFileTitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendfromFileSize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isme="true" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }

                                            }
                                            else {

                                                if (noHaveFriendmsgType == 1) {
                                                    msgAlert = ThisGroupMsg
                                                    newMsgInku = '                       <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                            ' + ThisGroupMsg + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    msgAlert = '[图片]'
                                                    newMsgInku = '                       <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers bigPicture"  data="' + noHaveFriendmsgId + '"data1=' + noHaveFriendsocialNumber + '>\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        "                           <img class=\"up-Img-Add\" src=" + ThisGroupMsg + " alt=\"\">\n" +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 495) {
                                                    msgAlert = '[图文链接]'
                                                    newMsgInku += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                        '                            <div class="answers news-link">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                }
                                                else if (noHaveFriendmsgType == 496) {
                                                    msgAlert = '[文件]'
                                                    newMsgInku += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="answers">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendfromFileTitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendfromFileSize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isme="false" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + 'file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }

                                            }
                                            if (IsShowChatTime == true) {
                                                $rootScope.friendStorage[noHaveFriendCid] += IsShowChatTime_html
                                            } else {
                                            }
                                            if ($rootScope.friendStorage[noHaveFriendCid] == undefined) {
                                                $rootScope.friendStorage[noHaveFriendCid] += newMsgInku;
                                            } else {
                                                $rootScope.friendStorage[noHaveFriendCid] += newMsgInku;
                                            }

                                            bothingRead = ($rootScope.friendStorage[noHaveFriendCid].split('Unread')).length - 1;
                                            if (bothingRead >= 99) {
                                                bothingRead = '99+'
                                            } else {
                                            }
                                            if ($('.page1-Maindiv3').attr('data') == noHaveFriendCid) {
                                                for (var i1 = 0; i1 < $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].length; i1++) {
                                                    if ($rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].cid == noHaveFriendCid) {
                                                        $rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].newMessage = msgAlert
                                                        $rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].lastChatTime = $rootScope.getNowFormatDate()
                                                        break
                                                    } else {
                                                    }
                                                }
                                                for (var i2 = 0; i2 < $rootScope.Chatwithfriends[-1].length; i2++) {
                                                    if ($rootScope.Chatwithfriends[-1][i2].cid == noHaveFriendCid) {
                                                        $rootScope.Chatwithfriends[-1][i2].newMessage = msgAlert
                                                        $rootScope.Chatwithfriends[-1][i2].lastChatTime = $rootScope.getNowFormatDate()
                                                        break
                                                    } else {
                                                    }
                                                }
                                                DesktopNotifications(noHaveFriendfromUserName, msgAlert, ThisGroupHeader, noHaveFriendCid)
                                                // titleNotifications()
                                                // console.log('新消息所属好友正在聊天中')
                                                var isTop = $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + noHaveFriendCid + '"]').attr('data1');
                                                if (IsShowChatTime == true) {
                                                    $('.newsList').append(IsShowChatTime_html)
                                                } else {
                                                }
                                                if (noHaveFriendsendType == 0) {
                                                    if (noHaveFriendmsgType == 1) {
                                                        $('.newsList').append('<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="news">\n' +
                                                            '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            '                            ' + ThisGroupMsg + '\n' +
                                                            '                        </div>\n' +
                                                            '                    </li>')
                                                    } else if (noHaveFriendmsgType == 3) {
                                                        msgAlert = '[图片]'
                                                        $('.newsList').append('                      <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="news bigPicture"  data="' + noHaveFriendmsgId + '" data1=' + noHaveFriendsocialNumber + '>\n' +
                                                            '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            "                           <img class=\"up-Img-Add\" src=" + ThisGroupMsg + " alt=\"\">\n" +
                                                            '                        </div>\n' +
                                                            '                    </li>')
                                                    } else if (noHaveFriendmsgType == 495) {
                                                        msgAlert = '[图文链接]'
                                                        $('.newsList').append('                     <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                            '                            <div class="news news-link">\n' +
                                                            '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            '                                <div class="defult-Link-Add">\n' +
                                                            '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="up-file-con">\n' +
                                                            '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                            '                                        </dd>\n' +
                                                            '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                            '\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +
                                                            '                            </div>\n' +
                                                            '                            </a>\n' +
                                                            '                        </li>')
                                                    } else if (noHaveFriendmsgType == 496) {
                                                        msgAlert = '[文件]'
                                                        $('.newsList').append('                      <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                            <div class="news">\n' +
                                                            '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            '                                <div class="up-file-Add">\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="defult-File-name">\n' +
                                                            '' + noHaveFriendfromFileTitle + '\n' +
                                                            '                                            </span>\n' +
                                                            '                                            <br>\n' +
                                                            '                                            <span class="defult-File-size">\n' +
                                                            '' + noHaveFriendfromFileSize + 'M\n' +
                                                            '                                            </span>\n' +

                                                            '                                        </dd>\n' +
                                                            '                                <div class="up-file-Down" isme="true" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                            '                            </div>\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +

                                                            '                            </div>\n' +
                                                            '                        </li>')
                                                    }

                                                }
                                                else {

                                                    if (noHaveFriendmsgType == 1) {
                                                        $('.newsList').append('     <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="answers">\n' +
                                                            '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            '                            ' + ThisGroupMsg + '\n' +
                                                            '                        </div>\n' +
                                                            '                    </li>')
                                                    } else if (noHaveFriendmsgType == 3) {
                                                        msgAlert = '[图片]'
                                                        $('.newsList').append('       <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="answers bigPicture"  data="' + noHaveFriendmsgId + '"data1=' + noHaveFriendsocialNumber + '>\n' +
                                                            '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            "                           <img class=\"up-Img-Add\" src=" + ThisGroupMsg + " alt=\"\">\n" +
                                                            '                        </div>\n' +
                                                            '                    </li>')
                                                    }
                                                    else if (noHaveFriendmsgType == 495) {
                                                        msgAlert = '[图文链接]'
                                                        $('.newsList').append('   <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                            '                            <div class="answers news-link">\n' +
                                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            '                                <div class="defult-Link-Add">\n' +
                                                            '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="up-file-con">\n' +
                                                            '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                            '                                        </dd>\n' +
                                                            '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                            '\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +
                                                            '                            </div>\n' +
                                                            '                            </a>\n' +
                                                            '                        </li>')
                                                    } else if (noHaveFriendmsgType == 496) {
                                                        msgAlert = '[文件]'
                                                        $('.newsList').append('                 <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                            <div class="answers">\n' +
                                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            '                                <div class="up-file-Add">\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="defult-File-name">\n' +
                                                            '' + noHaveFriendfromFileTitle + '\n' +
                                                            '                                            </span>\n' +
                                                            '                                            <br>\n' +
                                                            '                                            <span class="defult-File-size">\n' +
                                                            '' + noHaveFriendfromFileSize + 'M\n' +
                                                            '                                            </span>\n' +

                                                            '                                        </dd>\n' +
                                                            '                                <div class="up-file-Down" isme="false" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                            '                            </div>\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +

                                                            '                            </div>\n' +
                                                            '                        </li>')
                                                    }
                                                }
                                                if ($rootScope.RightContscrollHeight - $rootScope.RightContoffsetHeight == $rootScope.RightContscrollTop) {
                                                    var DivscrollHeight = $('.RightCont')[0].scrollHeight
                                                    $('.RightCont').animate({scrollTop: DivscrollHeight}, 500)
                                                }
                                                else {
                                                    $('.Newmessagereminding').css('display', 'block')
                                                }
                                                var firstIndex1 = 0;
                                                var firstTop1 = 0;
                                                var firstThis1 = '';
                                                var firstIsTop = false
                                                for (var iw = 0; iw < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; iw++) {
                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iw].cid == noHaveFriendCid) {
                                                        firstIndex1 = iw;
                                                        firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][iw]
                                                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iw].topNumber == 1) {
                                                            firstIsTop = true
                                                        }
                                                    }
                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iw].topNumber == 1) {
                                                        firstTop1++;
                                                    }
                                                }
                                                if (firstIsTop == true) {
                                                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis1)
                                                } else {
                                                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, firstThis1)
                                                }

                                                if ($rootScope.Chatwithfriends[$rootScope.lplplpl].length > 50) {
                                                    $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl].slice(0, 50)
                                                } else {
                                                    $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                                                }
                                                setTimeout(function () {
                                                    if (noHaveFriendmsgType == 1) {
                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + noHaveFriendCid + '"]').html(NewMessageMints)
                                                    } else if (noHaveFriendmsgType == 3) {
                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + noHaveFriendCid + '"]').html('[图片]')
                                                    } else if (noHaveFriendmsgType == 495) {
                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + noHaveFriendCid + '"]').html('[图文链接]')
                                                    }
                                                    var pp = $rootScope.friendStorage[noHaveFriendCid].replace(/Unread/g, 'Read')
                                                    $rootScope.friendStorage[noHaveFriendCid] = pp;
                                                }, 200)

                                            }
                                            /*--------------聊天好友非当前好友-------------*/
                                            else {
                                                for (var i1 = 0; i1 < $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].length; i1++) {
                                                    if ($rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].cid == noHaveFriendCid) {
                                                        $rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].newMessage = msgAlert
                                                        $rootScope.Chatwithfriends[noHaveFriendsocialaccountId][i1].lastChatTime = $rootScope.getNowFormatDate()
                                                    } else {
                                                    }
                                                }
                                                for (var i2 = 0; i2 < $rootScope.Chatwithfriends[-1].length; i2++) {
                                                    if ($rootScope.Chatwithfriends[-1][i2].cid == noHaveFriendCid) {
                                                        $rootScope.Chatwithfriends[-1][i2].newMessage = msgAlert
                                                        $rootScope.Chatwithfriends[-1][i2].lastChatTime = $rootScope.getNowFormatDate()
                                                    } else {
                                                    }
                                                }
                                                // console.log('新消息所属在当前窗口非正在聊天中')
                                                var firstIndex1 = 0;
                                                var firstTop1 = 0;
                                                var firstThis1 = '';
                                                var firstIsTop = false
                                                for (var iq = 0; iq < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; iq++) {
                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iq].cid == noHaveFriendCid) {
                                                        firstIndex1 = iq;
                                                        firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][iq]
                                                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iq].topNumber == 1) {
                                                            firstIsTop = true
                                                        }
                                                    }
                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iq].topNumber == 1) {
                                                        firstTop1++;
                                                    }
                                                }
                                                if (firstThis1 == '' || firstThis1 == null || firstThis1 == undefined) {

                                                } else {
                                                    DesktopNotifications(noHaveFriendfromUserName, msgAlert, ThisGroupHeader, noHaveFriendCid)
                                                    // titleNotifications()
                                                    if (firstIsTop == true) {
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis1)
                                                    } else {
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, firstThis1)
                                                    }

                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl].length > 50) {
                                                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl].slice(0, 50)
                                                    } else {
                                                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                                                    }
                                                    setTimeout(function () {
                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                                                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                                                        if (ArrLength > 50) {
                                                            ArrLength = 50
                                                        } else {

                                                        }
                                                        for (var i = 0; i < ArrLength; i++) {
                                                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                                                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                                                            }
                                                            var bothingRead = 0
                                                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                                                if ($rootScope.friendStorage[VNcid] == '' || $rootScope.friendStorage[VNcid] == undefined || $rootScope.friendStorage[VNcid] == NaN || $rootScope.friendStorage[VNcid] == null) {

                                                                } else {


                                                                    if ($rootScope.friendStorage[VNcid].indexOf('Unread') != -1) {
                                                                        bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                                                        if (bothingRead > 99) {
                                                                            bothingRead = '99+'
                                                                        }
                                                                    } else {
                                                                        bothingRead = 0
                                                                    }
                                                                }
                                                                if (bothingRead > 0) {
                                                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                                                } else {
                                                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                                                }

                                                            } else {
                                                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                                            }
                                                        }
                                                    }, 0)
                                                }


                                            }
                                        }
                                        /*--------------当前新信息库里未存在-------------*/
                                    }
                                    /*==============================没有去创建============================*/
                                    else {
                                        // console.log('当前新信息库里未存在需要去创建',)
                                        var koaue = false
                                        var koaue1 = false
                                        var ThisHsaFriends = ''
                                        var ThisHsaFriends1 = ''
                                        var ThisGroupHeader1 = ''
                                        var ThisGroupHeaderGetRequert = ''
                                        var ThisGroupMsg1 = ''
                                        var newGroupFriend = ''
                                        /*==============================当前新消息为群消息============================*/
                                        if (noHaveFriendgroup == 1) {
                                            $rootScope.panduankuli = false;
                                            // console.log('创建消息库，新消息内容为群消息')
                                            var elc = ''
                                            var guie = false;
                                            for (var l = 0; l < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; l++) {
                                                if ($rootScope.Chatwithfriends[$rootScope.lplplpl][l].cid == noHaveFriendCid) {
                                                    elc = $rootScope.Chatwithfriends[$rootScope.lplplpl][l]
                                                    guie = true;
                                                    break;
                                                } else {
                                                    guie = false;
                                                }
                                            }
                                            /*-------------------查询当前群资料--------------------*/
                                            if (guie == true) {
                                                var Headofagroup = './images/Destroy.png'
                                                // console.log('当前的列表下面已经有了 2222222222222223')
                                                if (noHaveFriendmsgType == 1) {
                                                    newMsgImg = ArrHaveGroup[1]
                                                } else if (noHaveFriendmsgType == 3) {
                                                    newMsgImg = $rootScope.imgSrc + ArrHaveGroup[1]
                                                }
                                                var msgAlert = ''
                                                var strNewMsgInku = ''
                                                if (noHaveFriendsendType == 0) {
                                                    if (noHaveFriendmsgType == 1) {
                                                        msgAlert = ArrHaveGroup[1]
                                                        strNewMsgInku = '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '<div class="nesHead">\n' +
                                                            '<img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="news">\n' +
                                                            '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            '                            ' + ArrHaveGroup[1] + '\n' +
                                                            '                        </div>\n' +
                                                            '                    </li>'
                                                    } else if (noHaveFriendmsgType == 3) {
                                                        msgAlert = '[图片]'
                                                        strNewMsgInku = '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="news bigPicture" data="' + noHaveFriendmsgId + '"data1=' + noHaveFriendsocialNumber + ' >\n' +
                                                            '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            "                           <img class=\"up-Img-Add\" src=" + $rootScope.imgSrc + ArrHaveGroup[1] + " alt=\"\">\n" +
                                                            '                        </div>\n' +
                                                            '                    </li>'
                                                    } else if (noHaveFriendmsgType == 495) {
                                                        msgAlert = '[图文链接]'
                                                        strNewMsgInku += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                            '                            <div class="news news-link">\n' +
                                                            '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            '                                <div class="defult-Link-Add">\n' +
                                                            '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="up-file-con">\n' +
                                                            '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                            '                                        </dd>\n' +
                                                            '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                            '\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +
                                                            '                            </div>\n' +
                                                            '                            </a>\n' +
                                                            '                        </li>'
                                                    } else if (noHaveFriendmsgType == 496) {
                                                        msgAlert = '[文件]'
                                                        strNewMsgInku += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                            <div class="news">\n' +
                                                            '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            '                                <div class="up-file-Add">\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="defult-File-name">\n' +
                                                            '' + noHaveFriendfromFileTitle + '\n' +
                                                            '                                            </span>\n' +
                                                            '                                            <br>\n' +
                                                            '                                            <span class="defult-File-size">\n' +
                                                            '' + noHaveFriendfromFileSize + ' M\n' +
                                                            '                                            </span>\n' +

                                                            '                                        </dd>\n' +
                                                            '                                <div class="up-file-Down" isme="true" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                            '                            </div>\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +

                                                            '                            </div>\n' +
                                                            '                        </li>'
                                                    }
                                                }
                                                else {
                                                    if (noHaveFriendmsgType == 1) {
                                                        msgAlert = ArrHaveGroup[1]
                                                        strNewMsgInku = '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="group_meber_name">\n' +
                                                            '                            ' + noHaveFriendchatroomMemberWxid + '\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="answers">\n' +
                                                            '                            <img class="jiao" src="images/whitejiao.png " alt="">\n' +
                                                            '                            ' + ArrHaveGroup[1] + '\n' +
                                                            '                        </div>\n' +
                                                            '                    </li>'
                                                    } else if (noHaveFriendmsgType == 3) {
                                                        msgAlert = '[图片]'
                                                        strNewMsgInku = '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="group_meber_name">\n' +
                                                            '                            ' + noHaveFriendchatroomMemberWxid + '\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="answers bigPicture"  data="' + noHaveFriendmsgId + '"data1=' + noHaveFriendsocialNumber + '>\n' +
                                                            '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            "                           <img class=\"up-Img-Add\" src=" + $rootScope.imgSrc + ArrHaveGroup[1] + " alt=\"\">\n" +
                                                            '                        </div>\n' +
                                                            '                    </li>'
                                                    } else if (noHaveFriendmsgType == 495) {
                                                        msgAlert = '[图文链接]'
                                                        strNewMsgInku += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="group_meber_name">\n' +
                                                            '                            ' + noHaveFriendchatroomMemberWxid + '\n' +
                                                            '                        </div>\n' +
                                                            '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                            '                            <div class="answers news-link">\n' +
                                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            '                                <div class="defult-Link-Add">\n' +
                                                            '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="up-file-con">\n' +
                                                            '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                            '                                        </dd>\n' +
                                                            '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                            '\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +
                                                            '                            </div>\n' +
                                                            '                            </a>\n' +
                                                            '                        </li>'
                                                    } else if (noHaveFriendmsgType == 496) {
                                                        msgAlert = '[文件]'
                                                        strNewMsgInku += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="group_meber_name">\n' +
                                                            '                            ' + noHaveFriendchatroomMemberWxid + '\n' +
                                                            '                        </div>\n' +
                                                            '                            <div class="answers">\n' +
                                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            '                                <div class="up-file-Add">\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="defult-File-name">\n' +
                                                            '' + noHaveFriendfromFileTitle + '\n' +
                                                            '                                            </span>\n' +
                                                            '                                            <br>\n' +
                                                            '                                            <span class="defult-File-size">\n' +
                                                            '' + noHaveFriendfromFileSize + 'M\n' +
                                                            '                                            </span>\n' +

                                                            '                                        </dd>\n' +
                                                            '                                <div class="up-file-Down" isme="false" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                            '                            </div>\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +

                                                            '                            </div>\n' +
                                                            '                        </li>'
                                                    }
                                                }
                                                $rootScope.Groupmemberheadlibrary[noHaveFriendchatroomMemberWxid] = './images/Destroy.png'


                                                if (IsShowChatTime == true) {
                                                    $rootScope.friendStorage[noHaveFriendCid] += IsShowChatTime_html
                                                } else {

                                                }
                                                $rootScope.friendStorage[noHaveFriendCid] += strNewMsgInku
                                                var shounUMS = 1
                                                shounUMS = ($rootScope.friendStorage[noHaveFriendCid].split('Unread')).length - 1;
                                                if (shounUMS == 0) {
                                                    shounUMS = 1
                                                } else {

                                                }
                                                if (shounUMS >= 99) {
                                                    shounUMS = '99+'
                                                } else {
                                                }
                                                var firstIndex1 = 0;
                                                var firstTop1 = 0;
                                                var firstThis1 = '';
                                                var firstIsTop = false
                                                for (var iu = 0; iu < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; iu++) {
                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iu].cid == noHaveFriendCid) {
                                                        firstIndex1 = iu;
                                                        firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][iu]
                                                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iu].topNumber == 1) {
                                                            firstIsTop = true
                                                        }
                                                    }
                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][iu].topNumber == 1) {
                                                        firstTop1++;
                                                    }
                                                }
                                                firstThis1.lastChatTime = $rootScope.getNowFormatDate()
                                                firstThis1.newMessage = msgAlert
                                                if (firstIsTop == true) {
                                                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0,)
                                                } else {
                                                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                                                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, firstThis1)
                                                }

                                                if ($rootScope.Chatwithfriends[$rootScope.lplplpl].length > 50) {
                                                    $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl].slice(0, 50)
                                                } else {
                                                    $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                                                }
                                                var searchHeader = new FormData()
                                                searchHeader.append('chatroommemberwxid', ArrHaveGroup[0])
                                                searchHeader.append('socialaccountId', noHaveFriendsocialaccountId)
                                                searchHeader.append('temp', noHaveFriendCid)
                                                $http({
                                                    method: 'POST',
                                                    url: $rootScope.link1 + "/message/getChatroommemberInfoByWxid",
                                                    data: searchHeader,
                                                    headers: {'Content-Type': undefined},
                                                    transformRequest: angular.identity
                                                }).success(function (response) {
                                                    if (response.code == 200) {

                                                        var Headofagroup = $rootScope.imgSrc + response.data.chatroommember.profilePhoto
                                                        $rootScope.Groupmemberheadlibrary[response.data.chatroommember.chatroomMemberWxid] = $rootScope.imgSrc + response.data.chatroommember.profilePhoto
                                                        $rootScope.WeChatoMembersNickname[response.data.chatroommember.chatroomMemberWxid] = response.data.chatroommember.memberName
                                                        var kk = $rootScope.friendStorage[response.data.temp].replace('./images/Destroy.png', Headofagroup)
                                                        var kk1 = kk.replace(response.data.chatroommember.chatroomMemberWxid, response.data.chatroommember.memberName)
                                                        $rootScope.friendStorage[response.data.temp] = kk1
                                                        DesktopNotifications(noHaveFriendfromUserName, msgAlert, Headofagroup, noHaveFriendCid)
                                                        // titleNotifications()
                                                    }
                                                })
                                            }
                                            else {
                                                var msgAlert = ''
                                                var groupConData = false;
                                                // console.log('当前的列表下面尚未拥有 22222222222222222')
                                                // console.log(noHaveFriendsendType,noHaveFriendmsgType)
                                                // debugger
                                                if (noHaveFriendmsgType == 1) {
                                                    newMsgImg = ArrHaveGroup[1]
                                                } else if (noHaveFriendmsgType == 3) {
                                                    newMsgImg = $rootScope.imgSrc + ArrHaveGroup[1]
                                                }
                                                // console.log(newMsgImg)
                                                var Headofagroup = './images/Destroy.png'
                                                if (noHaveFriendsendType == 0) {
                                                    if (noHaveFriendmsgType == 1) {
                                                        var str = ''
                                                        msgAlert = newMsgImg
                                                        str += '                       <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="news">\n' +
                                                            '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            '                            ' + newMsgImg + '\n' +
                                                            '                        </div>\n' +
                                                            '                    </li>'
                                                    } else if (noHaveFriendmsgType == 3) {
                                                        msgAlert = '[图片]'
                                                        var str = ''
                                                        str += '                       <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="news bigPicture"  data="' + noHaveFriendmsgId + '"data1=' + noHaveFriendsocialNumber + '>\n' +
                                                            '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            "                           <img class=\"up-Img-Add\" src=" + newMsgImg + " alt=\"\">\n" +
                                                            '                        </div>\n' +
                                                            '                    </li>'
                                                    } else if (noHaveFriendmsgType == 495) {
                                                        msgAlert = '[图文链接]'
                                                        str += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                            '                            <div class="news news-link">\n' +
                                                            '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            '                                <div class="defult-Link-Add">\n' +
                                                            '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="up-file-con">\n' +
                                                            '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                            '                                        </dd>\n' +
                                                            '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                            '\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +
                                                            '                            </div>\n' +
                                                            '                            </a>\n' +
                                                            '                        </li>'
                                                    } else if (noHaveFriendmsgType == 496) {
                                                        msgAlert = '[文件]'
                                                        str += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="nesHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                            <div class="news">\n' +
                                                            '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                            '                                <div class="up-file-Add">\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="defult-File-name">\n' +
                                                            '' + noHaveFriendfromFileTitle + '\n' +
                                                            '                                            </span>\n' +
                                                            '                                            <br>\n' +
                                                            '                                            <span class="defult-File-size">\n' +
                                                            '' + noHaveFriendfromFileSize + 'M\n' +
                                                            '                                            </span>\n' +

                                                            '                                        </dd>\n' +
                                                            '                                <div class="up-file-Down" isme="true" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                            '                            </div>\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +

                                                            '                            </div>\n' +
                                                            '                        </li>'
                                                    }
                                                }
                                                else {

                                                    if (noHaveFriendmsgType == 1) {
                                                        var str = ''
                                                        msgAlert = newMsgImg
                                                        str += '                       <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="group_meber_name">\n' +
                                                            '                            ' + noHaveFriendchatroomMemberWxid + '\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="answers">\n' +
                                                            '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            '                            ' + newMsgImg + '\n' +
                                                            '                        </div>\n' +
                                                            '                    </li>'
                                                    }
                                                    else if (noHaveFriendmsgType == 3) {
                                                        var str = ''
                                                        msgAlert = '[图片]'
                                                        str += '                       <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="group_meber_name">\n' +
                                                            '                            ' + noHaveFriendchatroomMemberWxid + '\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="answers bigPicture"  data="' + noHaveFriendmsgId + '"data1=' + noHaveFriendsocialNumber + '>\n' +
                                                            '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            "                           <img class=\"up-Img-Add\" src=" + newMsgImg + " alt=\"\">\n" +
                                                            '                        </div>\n' +
                                                            '                    </li>'
                                                    }
                                                    else if (noHaveFriendmsgType == 495) {
                                                        msgAlert = '[图文链接]'
                                                        str += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="group_meber_name">\n' +
                                                            '                            ' + noHaveFriendchatroomMemberWxid + '\n' +
                                                            '                        </div>\n' +
                                                            '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                            '                            <div class="answers news-link">\n' +
                                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            '                                <div class="defult-Link-Add">\n' +
                                                            '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="up-file-con">\n' +
                                                            '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                            '                                        </dd>\n' +
                                                            '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                            '\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +
                                                            '                            </div>\n' +
                                                            '                            </a>\n' +
                                                            '                        </li>'
                                                    } else if (noHaveFriendmsgType == 496) {
                                                        msgAlert = '[文件]'
                                                        str += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                            '                        <div class="answerHead">\n' +
                                                            '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                            '                        </div>\n' +
                                                            '                        <div class="group_meber_name">\n' +
                                                            '                            ' + noHaveFriendchatroomMemberWxid + '\n' +
                                                            '                        </div>\n' +
                                                            '                            <div class="answers">\n' +
                                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                            '                                <div class="up-file-Add">\n' +
                                                            '                                    <dl>\n' +
                                                            '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                            '                                        <dd>\n' +
                                                            '                                            <span class="defult-File-name">\n' +
                                                            '' + noHaveFriendfromFileTitle + '\n' +
                                                            '                                            </span>\n' +
                                                            '                                            <br>\n' +
                                                            '                                            <span class="defult-File-size">\n' +
                                                            '' + noHaveFriendfromFileSize + 'M\n' +
                                                            '                                            </span>\n' +

                                                            '                                        </dd>\n' +
                                                            '                                <div class="up-file-Down" isme="false" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                            '                            </div>\n' +
                                                            '                                    </dl>\n' +
                                                            '                                </div>\n' +

                                                            '                            </div>\n' +
                                                            '                        </li>'
                                                    }
                                                }


                                                if (IsShowChatTime == true) {
                                                    $rootScope.friendStorage[noHaveFriendCid] += IsShowChatTime_html
                                                } else {

                                                }
                                                $rootScope.friendStorage[noHaveFriendCid] += str
                                                $rootScope.Groupmemberheadlibrary[noHaveFriendchatroomMemberWxid] = './images/Destroy.png'
                                                /*-------------------查询当前好友资料--------------------*/
                                                var searchHeader = new FormData()
                                                searchHeader.append('chatroommemberwxid', ArrHaveGroup[0])
                                                searchHeader.append('socialaccountId', noHaveFriendsocialaccountId)
                                                searchHeader.append('temp', noHaveFriendCid)
                                                $http({
                                                    method: 'POST',
                                                    url: $rootScope.link1 + "/message/getChatroommemberInfoByWxid",
                                                    data: searchHeader,
                                                    headers: {'Content-Type': undefined},
                                                    transformRequest: angular.identity
                                                }).success(function (response) {
                                                    if (response.code == 200) {
                                                        groupConData = true
                                                        if (response.data.chatroommember.profilePhoto == '') {

                                                        } else {
                                                            var Headofagroup1 = response.data.chatroommember.profilePhoto
                                                            /*-----------------------群成员头像入库-----------------------*/
                                                            if ($rootScope.friendStorage[response.data.temp] == '' || $rootScope.friendStorage[response.data.temp] == null || $rootScope.friendStorage[response.data.temp] == undefined) {
                                                                var kk = $rootScope.friendStorage[response.data.temp] = Headofagroup1

                                                            } else {
                                                                var kk = $rootScope.friendStorage[response.data.temp].replace('./images/Destroy.png', Headofagroup1)
                                                            }

                                                        }
                                                        var chatroomMemberWxid_i = response.data.chatroommember.chatroomMemberWxid
                                                        $rootScope.friendStorage[response.data.temp] = kk
                                                        $rootScope.Groupmemberheadlibrary[chatroomMemberWxid_i] = $rootScope.imgSrc + response.data.chatroommember.profilePhoto
                                                        $rootScope.WeChatoMembersNickname[response.data.chatroommember.chatroomMemberWxid] = response.data.chatroommember.memberName
                                                    }
                                                })

                                                /*-------------------查询群资料--------------------*/
                                                if ($rootScope.Wasterecovery.hasOwnProperty(noHaveFriendCid)) {
                                                    $rootScope.Wasterecovery[noHaveFriendCid] = true;
                                                } else {
                                                    $rootScope.Wasterecovery[noHaveFriendCid] = false;
                                                }
                                                if ($rootScope.Wasterecovery[noHaveFriendCid] == false) {
                                                    var sendFlie = new FormData()
                                                    sendFlie.append('Cid', noHaveFriendCid)
                                                    sendFlie.append('accountId', $rootScope.myaccountId)
                                                    sendFlie.append('temp', noHaveFriendmsgType)
                                                    $http({
                                                        method: 'POST',
                                                        url: $rootScope.link + "/latelychat/getContactByNumber",
                                                        data: sendFlie,
                                                        headers: {'Content-Type': undefined},
                                                        transformRequest: angular.identity
                                                    }).success(function (response) {
                                                        if (response.code == 200) {
                                                            var msgType = Number(response.data.tempData)
                                                            var newMsgImg = ''
                                                            if (msgType == 1) {
                                                                newMsgImg = ArrHaveGroup[1]
                                                            } else if (msgType == 3) {
                                                                newMsgImg = '[图片]'
                                                            } else if (msgType == 495) {
                                                                newMsgImg = '[图文链接]'
                                                            }
                                                            if (response.data.contactList[0].profilePhoto == '') {
                                                                var elc1 = './images/Destroy.png'
                                                            } else {
                                                                var elc1 = $rootScope.imgSrc + response.data.contactList[0].profilePhoto
                                                            }
                                                            var myCid = response.data.contactList[0].cid
                                                            var elc2 = response.data.contactList[0]
                                                            elc2.profilePhoto = elc1
                                                            elc2.lastChatTime = $rootScope.getNowFormatDate()
                                                            elc = elc2
                                                            /*-------------------------消息进入消息库------------------------*/
                                                            /*----------------------当前新消息群组再当前聊天微信号下已经创建----------------------*/
                                                            var newMsgImg = ''
                                                            var msgAlert = ''
                                                            if (msgType == 1) {
                                                                newMsgImg = ArrHaveGroup[1]
                                                                msgAlert = ArrHaveGroup[1]
                                                            } else if (msgType == 3) {
                                                                msgAlert = '[图片]'
                                                                if (ArrHaveGroup[1] == '') {
                                                                    newMsgImg = './images/Destroy.png'
                                                                } else {
                                                                    newMsgImg = $rootScope.imgSrc + ArrHaveGroup[1]
                                                                }

                                                            } else if (msgType == 495) {
                                                                msgAlert = '[图文链接]'
                                                            } else if (msgType == 496) {
                                                                msgAlert = '[文件]'
                                                            }
                                                            var firstIndex1 = 0;
                                                            var firstTop1 = 0;
                                                            var firstThis1 = '';
                                                            var firstIsTop = false
                                                            var koijk = false
                                                            for (var ij = 0; ij < $rootScope.Chatwithfriends[-1].length; ij++) {
                                                                if ($rootScope.Chatwithfriends[-1][ij].cid == myCid) {
                                                                    $rootScope.Chatwithfriends[-1][ij].newMessage = msgAlert
                                                                    koijk = true
                                                                }
                                                                if ($rootScope.Chatwithfriends[-1][ij].topNumber == 1) {
                                                                    firstTop1++;
                                                                }
                                                            }
                                                            if (koijk == true) {

                                                            } else {
                                                                elc.newMessage = msgAlert
                                                                if (elc.topNumber == 1) {
                                                                    $rootScope.Chatwithfriends[-1].splice(0, 0, elc)
                                                                } else {
                                                                    $rootScope.Chatwithfriends[-1].splice(firstTop1, 0, elc)
                                                                }
                                                            }

                                                            var firstIndex2 = 0;
                                                            var firstTop2 = 0;
                                                            var firstThis2 = '';
                                                            var firstIsTop2 = false
                                                            var koijk1 = false
                                                            for (var iv = 0; iv < $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].length; iv++) {
                                                                if ($rootScope.Chatwithfriends[noHaveFriendsocialaccountId][iv].cid == myCid) {
                                                                    koijk1 = true
                                                                }
                                                                if ($rootScope.Chatwithfriends[noHaveFriendsocialaccountId][iv].topNumber == 1) {
                                                                    firstTop2++;
                                                                }
                                                            }

                                                            if (koijk1 == true) {

                                                            } else {
                                                                elc.newMessage = msgAlert
                                                                if (elc.topNumber == 1) {
                                                                    $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].splice(0, 0, elc)
                                                                } else {
                                                                    $rootScope.Chatwithfriends[noHaveFriendsocialaccountId].splice(firstTop2, 0, elc)
                                                                }
                                                            }
                                                            $rootScope.frienfList = ''
                                                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl].length > 50) {
                                                                $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl].slice(0, 50)
                                                            } else {
                                                                $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                                                            }
                                                            if (groupConData == true) {

                                                                DesktopNotifications(noHaveFriendfromUserName, msgAlert, elc1, noHaveFriendCid)
                                                                // titleNotifications()
                                                            }
                                                            setTimeout(function () {
                                                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                                                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                                                                var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                                                                if (ArrLength > 50) {
                                                                    ArrLength = 50
                                                                } else {

                                                                }
                                                                // console.log('asdasd')
                                                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + myCid + '"]').next().css('display', 'inline-block').html(1)
                                                                for (var i = 0; i < ArrLength; i++) {
                                                                    var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                                                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                                                                    }
                                                                    // var bothingRead = 0
                                                                    // if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                                                    //     if ($rootScope.friendStorage[VNcid] == '' || $rootScope.friendStorage[VNcid] == undefined || $rootScope.friendStorage[VNcid] == null) {
                                                                    //
                                                                    //     } else {
                                                                    //         if ($rootScope.friendStorage[VNcid].indexOf('Unread') != -1) {
                                                                    //             console.log($rootScope.Chatwithfriends[$rootScope.lplplpl][i])
                                                                    //             bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                                                    //             if (bothingRead > 99) {
                                                                    //                 bothingRead = '99+'
                                                                    //             }else {
                                                                    //                 bothingRead = 1
                                                                    //             }
                                                                    //         } else {
                                                                    //             bothingRead = 0
                                                                    //         }
                                                                    //     }
                                                                    //     if (bothingRead > 0) {
                                                                    //         $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                                                    //     } else {
                                                                    //         $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                                                    //     }
                                                                    //
                                                                    // } else {
                                                                    //     $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                                                    // }

                                                                }
                                                            }, 100)
                                                            /*----------------------当前新消息群组再其他聊天窗口----------------------*/
                                                        }
                                                        else {
                                                            // console.log('当前无数据')
                                                        }
                                                    })
                                                } else {
                                                }


                                            }
                                        }
                                        /*==============================新消息内容为好友消息============================*/
                                        else {
                                            var newMsgImg = ''
                                            var msgAlert = ''
                                            // console.log('创建好友信息,333333333333333333333333333')
                                            if (noHaveFriendmsgType == 1) {
                                                newMsgImg = NewMessageMints
                                            } else if (noHaveFriendmsgType == 3) {
                                                newMsgImg = '[图片]'
                                            }
                                            var Headofagroup = './images/Destroy.png'
                                            if (noHaveFriendsendType == 0) {
                                                if (noHaveFriendmsgType == 1) {
                                                    var str = ''
                                                    msgAlert = noHaveFriendMsg

                                                    str += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '<div class="nesHead">\n' +
                                                        '<img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="news">\n' +
                                                        '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        '                            ' + newMsgImg + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    var str = ''
                                                    msgAlert = '[图片]'
                                                    str += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="news bigPicture"  data="' + noHaveFriendmsgId + '"data1=' + noHaveFriendsocialNumber + '>\n' +
                                                        '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        "                           <img class=\"up-Img-Add\" src=" + newMsgImg + " alt=\"\">\n" +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 495) {
                                                    msgAlert = '[图文链接]'
                                                    str += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                        '                            <div class="news news-link">\n' +
                                                        '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                } else if (noHaveFriendmsgType == 496) {
                                                    msgAlert = '[文件]'
                                                    str += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="nesHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Myownhead + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="news">\n' +
                                                        '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendfromFileTitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendfromFileSize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isme="true" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }
                                            }
                                            else {
                                                if (noHaveFriendmsgType == 1) {
                                                    var str = ''
                                                    msgAlert = noHaveFriendMsg
                                                    str += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                            ' + newMsgImg + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    var str = ''
                                                    msgAlert = '[图片]'
                                                    str += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers bigPicture"  data="' + noHaveFriendmsgId + '"data1=' + noHaveFriendsocialNumber + '>\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        "                           <img class=\"up-Img-Add\" src=" + newMsgImg + " alt=\"\">\n" +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 495) {
                                                    msgAlert = '[图文链接]'
                                                    str += '<li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <a href=' + $rootScope.img_text_url + ' target="_blank">\n' +
                                                        '                            <div class="answers news-link">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + $rootScope.img_text_title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + $rootScope.img_text_content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src=' + $rootScope.img_text_icon + '></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                } else if (noHaveFriendmsgType == 496) {
                                                    msgAlert = '[文件]'
                                                    str += '                        <li class="Unread" dataid='+noHaveFriendmsgId+'>\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + Headofagroup + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="answers">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendfromFileTitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendfromFileSize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isme="false" file_id=' + noHaveFriendfromFileId + ' file_number=' + noHaveFriendsocialNumber + ' file_title='+noHaveFriendfromFileTitle+'>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }
                                            }


                                            if (IsShowChatTime == true) {
                                                $rootScope.friendStorage[noHaveFriendCid] += IsShowChatTime_html
                                            } else {
                                            }
                                            $rootScope.friendStorage[noHaveFriendCid] += str;
                                            var sendFlie = new FormData()
                                            sendFlie.append('Cid', noHaveFriendCid)
                                            sendFlie.append('accountId', $rootScope.myaccountId)
                                            $http({
                                                method: 'POST',
                                                url: $rootScope.link + "/latelychat/getContactByNumber",
                                                data: sendFlie,
                                                headers: {'Content-Type': undefined},
                                                transformRequest: angular.identity
                                            }).success(function (response) {
                                                if (response.code == 200) {
                                                    var Headofagroup1 = $rootScope.imgSrc + response.data.contactList[0].profilePhoto
                                                    /*-----------------------群成员头像入库-----------------------*/
                                                    var kk = $rootScope.friendStorage[response.data.contactList[0].cid].replace('./images/Destroy.png', Headofagroup1)
                                                    $rootScope.friendStorage[response.data.contactList[0].cid] = kk
                                                    var elc1 = $rootScope.imgSrc + response.data.contactList[0].profilePhoto
                                                    var elc2 = response.data.contactList[0]
                                                    elc2.profilePhoto = elc1
                                                    elc2.newMessage = msgAlert
                                                    elc2.lastChatTime = $rootScope.getNowFormatDate()
                                                    elc = elc2

                                                    // titleNotifications()

                                                    if (elc.topNumber == 1) {
                                                        elc.newMessage = msgAlert
                                                        if ($rootScope.lplplpl == -1) {
                                                            $rootScope.Chatwithfriends[-1].splice(0, 0, elc)
                                                            $rootScope.Chatwithfriends[elc.socialaccountId].splice(0, 0, elc)
                                                        } else {
                                                            var gg = false
                                                            for (var l = 0; l < $rootScope.Chatwithfriends[-1].length; l++) {
                                                                if ($rootScope.Chatwithfriends[-1][l].cid == noHaveFriendCid) {
                                                                    $rootScope.Chatwithfriends[-1][l].newMessage = msgAlert
                                                                    gg = true;
                                                                    break;
                                                                } else {
                                                                    gg = false
                                                                }
                                                            }
                                                            if (gg == true) {

                                                                if ($rootScope.WeChatownersocialNumber[$rootScope.lplplpl] == noHaveFriendsocialNumber) {

                                                                } else {
                                                                    $rootScope.Chatwithfriends[elc.socialaccountId].splice(0, 0, elc)
                                                                }
                                                            } else {
                                                                if ($rootScope.WeChatownersocialNumber[$rootScope.lplplpl] == noHaveFriendsocialNumber) {

                                                                } else {
                                                                    $rootScope.Chatwithfriends[elc.socialaccountId].splice(0, 0, elc)
                                                                }
                                                                $rootScope.Chatwithfriends[-1].splice(0, 0, elc)
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        elc.newMessage = msgAlert
                                                        var values = 0;
                                                        var values1 = 0;
                                                        for (var m = 0; m < $rootScope.Chatwithfriends[elc.socialaccountId].length; m++) {
                                                            if ($rootScope.Chatwithfriends[elc.socialaccountId][m].topNumber == 1) {
                                                                values++
                                                            }
                                                        }
                                                        for (var m = 0; m < $rootScope.Chatwithfriends[-1].length; m++) {
                                                            if ($rootScope.Chatwithfriends[-1][m].topNumber == 1) {
                                                                values1++
                                                            }
                                                        }
                                                        if ($rootScope.lplplpl == -1) {
                                                            $rootScope.Chatwithfriends[-1].splice(values1, 0, elc)
                                                            $rootScope.Chatwithfriends[elc.socialaccountId].splice(values1, 0, elc)
                                                        } else {
                                                            var gg = false
                                                            for (var l = 0; l < $rootScope.Chatwithfriends[-1].length; l++) {
                                                                if ($rootScope.Chatwithfriends[-1][l].cid == noHaveFriendCid) {
                                                                    $rootScope.Chatwithfriends[-1][l].newMessage = msgAlert
                                                                    gg = true;
                                                                    break;
                                                                } else {
                                                                    gg = false
                                                                }
                                                            }
                                                            if (gg == true) {
                                                                if ($rootScope.WeChatownersocialNumber[$rootScope.lplplpl] == noHaveFriendsocialNumber) {

                                                                } else {
                                                                    $rootScope.Chatwithfriends[elc.socialaccountId].splice(values, 0, elc)
                                                                }

                                                            } else {
                                                                if ($rootScope.WeChatownersocialNumber[$rootScope.lplplpl] == noHaveFriendsocialNumber) {

                                                                } else {
                                                                    $rootScope.Chatwithfriends[elc.socialaccountId].splice(values, 0, elc)
                                                                }
                                                                $rootScope.Chatwithfriends[-1].splice(values1, 0, elc)
                                                            }
                                                        }

                                                    }
                                                    if ($rootScope.WeChatownersocialNumber[$rootScope.lplplpl] == noHaveFriendsocialNumber) {

                                                    } else {
                                                        if (elc.topNumber == 1) {
                                                            $rootScope.Chatwithfriends[$rootScope.lplplpl].slice(0, 0, elc)
                                                        } else {
                                                            $rootScope.Chatwithfriends[$rootScope.lplplpl].slice($rootScope.TotopNum, 0, elc)

                                                        }
                                                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl].length > 50) {
                                                            $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl].slice(0, 50)
                                                        } else {
                                                            $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                                                        }

                                                        setTimeout(function () {

                                                            DesktopNotifications(noHaveFriendfromUserName, msgAlert, Headofagroup1, noHaveFriendCid)
                                                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + elc.cid + '"]').next().css('display', 'inline-block').html(1)
                                                            //     $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + elc.cid + '"]').next().css('display', 'inline-block').html(1)
                                                            //     if (noHaveFriendmsgType == 1) {
                                                            //         newMsgImg = NewMessageMints
                                                            //         $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + elc.cid + '"]').html(newMsgImg)
                                                            //     } else if (noHaveFriendmsgType == 3) {
                                                            //         newMsgImg = '[图片]'
                                                            //         $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + elc.cid + '"]').html(newMsgImg)
                                                            //     } else if (noHaveFriendmsgType == 495) {
                                                            //         $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + noHaveFriendCid + '"]').html('[图文链接]')
                                                            //     }
                                                            //
                                                        }, 200)

                                                    }

                                                } else {
                                                    // console.log('无当前好友信息')
                                                }
                                            })
                                        }
                                    }
                                } else {
                                }
                            }
                            setTimeout(function () {
                                watchState()
                            }, 2000)

                        } else if (response.code == 1000) {
                            clearTimeout(first_Important)
                            $('.gray-help').css('display', 'block')
                            $('.gray-help-say').css('display', 'block')
                            $('.gray-help-say-con-text').html('您已在其他页面发起聊天，当前聊天失效')
                            $('.sure-nohave-phone').html('重连')
                        }
                    });

                } else {
                    setTimeout(function () {
                        watchState()
                    }, 2000)
                }
            } else {
                clearTimeout(first_Important)
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('登录超时，请再次登录')
                $('.sure-nohave-phone').html('重连')
            }
        });
    }, 5000)
    $rootScope.Setup = false;
    /*-------------------标签变色-------------------*/
    $rootScope.ChangeColor = function (e, q, w) {
        if (q.length == 1 && w == '') {
            colorIs = "tageNo"
        } else {
            var colorIs = ''
            if (e % 3 == 0) {
                colorIs = 'blueTag'
            } else if (e % 2 == 0) {
                colorIs = 'purpleTag'
            } else {
                colorIs = 'purseTag'
            }
        }

        return colorIs
    }
    $rootScope.AllcustomerList = function (e) {
        var a = ''
        if (e == 1) {
            a = 'send-msg'

        } else {
            a = 'add-people'
        }
        return a
    }
    $rootScope.NmeSlice = function (e) {
        var Page4Nmame1 = ''
        if (e.length >= 8) {
            Page4Nmame1 = e.slice(0, 6) + '...'
        } else {
            Page4Nmame1 = e
        }
        return Page4Nmame1
    }
    $rootScope.NmeSlice1 = function (e) {
        var Page4Nmame1 = ''
        if (e.length >= 15) {
            Page4Nmame1 = e.slice(0, 15) + '......'
        } else {
            Page4Nmame1 = e
        }
        return Page4Nmame1
    }
    /*---------文字聊天颜色标注--------*/
    $rootScope.chatrecord2 = function (e) {
        var Page4Nmame1 = ''
        if (e == 1 || e == 10) {
            Page4Nmame1 = 'Page4Nmame1-blue'
        } else {
            Page4Nmame1 = 'Page4Nmame1-green'
        }
        return Page4Nmame1
    }
    $rootScope.IstopInit = function (e) {
        var a = '';
        if (e == 1) {
            a = 'IstopInitAddColor'
        } else {

        }
        return a
    }
    /*---------性别解析--------*/
    $rootScope.sex = function (e) {
        var a = ''
        if (e == 1) {
            a = '男'
        } else if (e == 2) {
            a = '女'
        } else {
            a = '未知'
        }
        return a
    }
    /*---------群成员为0查看按钮不显示--------*/
    $rootScope.groupListIsShow = function (e) {
        var a = ''
        if (e <= 0) {
            a = 'groupListIsShow'
        } else {
        }
        return a
    }
    /*---------消息记录显示名称辨别我还是好友--------*/
    $rootScope.Characterdiscrimination = function (e, q) {

        var a = ''
        if (e == 0) {
            a = '我'
        } else if (e == 1) {
            a = q
        } else if (e == 3) {
            a = '我'
        } else if (e == 10) {
            a = q
        }
        return a
    }
    /*----------------文字聊天记录去除<br>-----------------*/
    $rootScope.Getridofthechange = function (e, q) {
        var groupmsg = []
        var groupmsg1 = ''
        var a = e
        var a1
        var a2
        if (q == 3) {
            a1 = a.replace(/<br>/g, "")
            a2 = a1.replace(/&nbsp;/g, " ")
        } else if (q == 10) {
            groupmsg = a.split(':<br>')
            a1 = groupmsg[1].replace(/<br>/g, "")
            a2 = a1.replace(/&nbsp;/g, " ")
        } else {
            a1 = a.replace(/<br>/g, "")
            a2 = a1.replace(/&nbsp;/g, " ")
        }
        return a2
    }
    /*----------------文字聊天记录去除<&nbsp>-----------------*/
    $rootScope.GetridoftheNbsp = function (e) {
        var a = e
        var a1 = a.replace(/&nbsp;/g, " ")
        return a1
    }
    $rootScope.getUser = function (e) {
        var a = ''
        a = $rootScope.WeChatowner[e]
        return a
    }
    $rootScope.getLastTime = function (e) {
        var a = ''
        if (e == '' || e == undefined || e == null) {
            a = ''
        } else {
            a = e.slice(10, 16)

            if (a.charAt(a.length - 1) == ':') {
                var a1 = a.substring(0, 4);
                var a2 = a.substring(3, a.length - 1);

                a = a1 + '0' + a2
            }
        }
        return a
    }
    $rootScope.break_title_con = function (e) {
        var a = ''
        if (e.length >= 25) {
            a = e.slice(0, 25) + '...'
        } else {
            a = e
        }
        return a
    }
    $rootScope.Time_Slice = function (e) {

        var a = ''

        a = e.substring(0, 10)

        return a
    }
    /*------------------获取当前时间----------------*/
    $rootScope.getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }
    $rootScope.isOnLine = function (e) {
        var a = ''
        if (e == 0) {
            a = 'Account-number-logo-no'
        } else {
            a = ''
        }
        return a
    }
    // $rootScope.chatRecordImg = function (e, q, w, r) {
    //     var a = ''
    //     if (e == 0) {
    //         a = $rootScope.WeChatownerHeader[r]
    //     } else if (e == 1) {
    //         a =$rootScope.ChatPhoto
    //     } else if (e == 3) {
    //         a = $rootScope.WeChatownerHeader[r]
    //     } else if (e == 10) {
    //         a = q
    //     }
    //     return a
    // }
}]);

/**
 * Created by digvita on 2017/7/12.
 */
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when('/page1', {templateUrl: 'view/page1.html', controller: 'page1C'})
        .otherwise({redirectTo: '/page1'});
}]);
app.filter('orderObjectBy', ["$rootScope", function ($rootScope) {

    return function (input) {
        var output = [];
        var output1 = [];
        angular.forEach(input, function (value, key) {
            if (value.topNumber == 1) {
                output.push(value);
            }
            if (value.topNumber == 0) {
                output1.push(value);
            }
        });
        output1.unshift.apply(output1, output);
        return output1;
        console.log(output1)
    }
}]);

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
app.controller('page1C', ["$rootScope", "$scope", "$http", "$timeout", "$compile", function ($rootScope, $scope, $http, $timeout, $compile) {
    $rootScope.repeatNums = 0
    $rootScope.Identificationforthefirsttime = false;
    /*-------聊天界面-------*/
    $rootScope.ChataddressbookswitchingChat = true
    /*-------通讯录界面-------*/
    $rootScope.ChataddressbookswitchingBook = false
    $scope.addTag = false;
    /*----客户信息模块开关---*/
    $scope.Customerinformation = true;
    /*----群组相关资料开关---*/
    $scope.myself1 = true;
    /*----好友相关资料开关---*/
    $scope.myself = false;
    /*----快捷回复开关---*/
    $scope.quickReply = false
    $scope.allCustomerList = false
    $scope.searchCon = false;
    /*-------快捷短语开关--------*/
    $scope.quickReplyPhrase = true;
    /*-------图片库开关--------*/
    $scope.quickReplylibrary = false;
    /*-------客户记录开关------*/
    $scope.customerRecord = false;
    /*-------客户记录文字聊天记录------*/
    $scope.chatRecord = true
    /*-----------搜索聊天记录---------*/
    $scope.SearchkeywordsHistory = false
    /*-------------资料部分默认-------------*/
    $scope.page1Maindiv4Init = true
    $('.whiteMeContent').html('').attr("disabled", true).css('background', '#fff');
    $scope.imgNew = ''
    $('.chat-bottom-write').html('')
    $scope.ChatModule = false;
    $scope.MsgTimes = 0
    /*----------------表情初始化----------------------*/
    $("#btn1").click(function () {
        $('.emoji_container').html('').css({'border': 'none', 'background-color': 'transparent', 'box-shadow': 'none'})
        $("#editor1").emoji({
            button: "#btn1",
            showTab: false,
            animation: 'none',
            icons: [{
                name: "QQ表情",
                path: "images/qq/",
                maxNum: 91,
                // excludeNums: [41, 45, 54],
                file: ".gif",
            }]
        });
    });
    /*-----------------快捷短语树状图初始化---------------*/
    $(function () {
        $(".tree").treemenu({delay: 300}).openActive();
    });
    var emjoyAllGet = [
        '[微笑]', '[撇嘴]', '[色]', '[发呆]', '[得意]', '[流泪]', '[害羞]', '[闭嘴]', '[睡]', '[大哭]',
        '[尴尬]', '[发怒]', '[调皮]', '[呲牙]', '[惊讶]', '[难过]', '[酷]', '[冷汗]', '[抓狂]', '[吐]',
        '[偷笑]', '[愉快]', '[白眼]', '[傲慢]', '[饥饿]', '[困]', '[惊恐]', '[流汗]', '[憨笑]', '[悠闲]',
        '[奋斗]', '[咒骂]', '[疑问]', '[嘘]', '[晕]', '[疯了]', '[衰]', '[骷髅]', '[敲打]', '[再见]', '[擦汗]',
        '[抠鼻]', '[鼓掌]', '[糗大了]', '[坏笑]', '[左哼哼]', '[右哼哼]', '[哈欠]', '[鄙视]', '[委屈]', '[快哭了]', '[阴险]',
        '[亲亲]', '[吓]', '[可怜]', '[菜刀]', '[啤酒]', '[咖啡]', '[饭]', '[猪头]', '[玫瑰]', '[凋谢]', '[嘴唇]',
        '[爱心]', '[心碎]', '[蛋糕]', '[闪电]', '[炸弹]', '[刀]', '[足球]', '[瓢虫]', '[便便]', '[拥抱]',
        '[强]', '[弱]', '[握手]', '[胜利]', '[抱拳]', '[勾引]', '[拳头]', '[差劲]', '[爱你]', '[NO]',
        '[OK]', '[跳跳]', '[发抖]', '[怄火]', '[磕头]', '[激动]', '[献吻]'
    ]
    /*--------------------清除复制粘贴格式-------------------*/
    $(".chat-bottom-write").on("paste", function (e) {
        textInit(e)
    });

    function textInit(e) {
        e.preventDefault();
        var text;
        var clp = (e.originalEvent || e).clipboardData;
        if (clp === undefined || clp === null) {
            text = window.clipboardData.getData("text") || "";
            if (text !== "") {
                if (window.getSelection) {
                    var newNode = document.createElement("span");
                    newNode.innerHTML = text;
                    window.getSelection().getRangeAt(0).insertNode(newNode);
                } else {
                    document.selection.createRange().pasteHTML(text);
                }
            }
        } else {
            text = clp.getData('text/plain') || "";
            if (text !== "") {
                document.execCommand('insertText', false, text);
            }
        }
    }

    $(function () {
        setTimeout(function () {

            var config = {

                '.chosen-select': {},

                '.chosen-select-deselect': {allow_single_deselect: true},

                '.chosen-select-no-single': {disable_search_threshold: 10},

                '.chosen-select-no-results': {no_results_text: '无匹配结果'},

                '.chosen-select-width': {width: "95%"}

            }
            for (var selector in config) {

                $(selector).chosen(config[selector]);

            }
        }, 500)
    })


    /*------------------获取所有社交号下聊天记录--------------------*/
    var ioioi = [];
    var kokoko = new FormData()
    kokoko.append('accountId', $rootScope.myaccountId)
    $http({
        method: 'POST',
        url: $rootScope.link + "/socialaccount/getShowSocialaccount",
        data: kokoko,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            for (var i = 0; i < response.data.socialaccountList.length; i++) {
                $rootScope.Chatwithfriends[response.data.socialaccountList[i].id] = []
                $rootScope.WeChatowner[response.data.socialaccountList[i].id] = response.data.socialaccountList[i].nickName
                $rootScope.WeChatownersocialNumber [response.data.socialaccountList[i].id] = response.data.socialaccountList[i].socialNumber
                $rootScope.WeChatownerHeader[response.data.socialaccountList[i].id] = $rootScope.imgSrc + response.data.socialaccountList[i].profilePhoto
                ioioi.push(response.data.socialaccountList[i].id)
                $scope['IsP' + response.data.socialaccountList[i].id] = false

            }
            $scope['Isp' + -1] = true
        }
    });
    /*---------获取所有社交号下所有最近聊天好友，群组--------*/
    var kokoko1 = new FormData()
    kokoko1.append('accountId', $rootScope.myaccountId)
    $http({
        method: 'POST',
        url: $rootScope.link + "/latelychat/getRecentContactAndChatroom2",
        data: kokoko1,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            for (var i = 0; i < ioioi.length; i++) {

                if (response.data[ioioi[i]] == undefined || response.data[ioioi[i]].length == undefined) {
                    response.data[ioioi[i]] = []
                }

                else {

                    for (var e = 0; e < response.data[ioioi[i]].length; e++) {
                        response.data[ioioi[i]][e].Deviceonline = 1
                        if (response.data[ioioi[i]][e].profilePhoto == '') {
                            response.data[ioioi[i]][e].profilePhoto = './images/Destroy.png'
                        } else {
                            response.data[ioioi[i]][e].profilePhoto = $rootScope.imgSrc + response.data[ioioi[i]][e].profilePhoto
                        }
                        response.data[ioioi[i]][e].noReadMessage = e
                        if (response.data[ioioi[i]][e].lastChatrecord == [] || response.data[ioioi[i]][e].lastChatrecord == undefined) {
                            $rootScope.friendStorage[response.data[ioioi[i]][e].cid] = ''
                            response.data[ioioi[i]][e].newMessage = ''
                        }
                        else if (response.data[ioioi[i]][e].lastChatrecord.length == 1) {
                            var profilePhoto = response.data[ioioi[i]][e].profilePhoto
                            var ThisGroupHeader = ''
                            var newMsgInku = ''
                            var newMsg = ''
                            var newmemberId = ''
                            var mml = ''
                            var noHaveFriendmsgFiletitle = ''
                            var noHaveFriendmsgFilesize = ''
                            var noHaveFriendmsgFilepath = ''
                            if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 3) {
                                response.data[ioioi[i]][e].newMessage = '[图片]'
                            } else if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 495) {
                                response.data[ioioi[i]][e].newMessage = '[图文链接]'
                            } else if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 496) {
                                response.data[ioioi[i]][e].newMessage = '[文件]'
                            }
                            if (response.data[ioioi[i]][e].type == 1) {

                                if (response.data[ioioi[i]][e].lastChatrecord[0].msgStatus == 10) {
                                    if (response.data[ioioi[i]][e].lastChatrecord[0].profilephoto == '' || response.data[ioioi[i]][e].lastChatrecord[0].profilephoto == undefined) {
                                        ThisGroupHeader = './images/Destroy.png'
                                    } else {
                                        ThisGroupHeader = $rootScope.imgSrc + response.data[ioioi[i]][e].lastChatrecord[0].profilephoto
                                    }

                                    if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 495) {
                                        var ArrHaveGroup_con = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage.content
                                        var ArrHaveGroup_Id = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage.chatroommemberwxid
                                        newMsg = ArrHaveGroup_con
                                        newmemberId = $rootScope.WeChatoMembersNickname[ArrHaveGroup_Id]
                                        if (newmemberId == undefined) {
                                            newmemberId = ArrHaveGroup_Id
                                        }
                                    } else if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 496) {
                                        noHaveFriendmsgFiletitle = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage.title
                                        noHaveFriendmsgFilesize = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage.filesize
                                        noHaveFriendmsgFilepath = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage.filepath
                                    } else if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 3) {
                                    } else if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 1) {
                                        var ArrHaveGroup = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage.split(':<br>')
                                        newMsg = ArrHaveGroup[1]
                                        response.data[ioioi[i]][e].newMessage = newMsg
                                        newmemberId = $rootScope.WeChatoMembersNickname[ArrHaveGroup[0]]
                                        if (newmemberId == undefined) {
                                            newmemberId = ArrHaveGroup[0]
                                        }
                                    }

                                } else {
                                    if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 1) {
                                        if(response.data[ioioi[i]][e].lastChatrecord[0].msgStatus == 1){
                                            if (response.data[ioioi[i]][e].lastChatrecord[0].profilephoto == '' || response.data[ioioi[i]][e].lastChatrecord[0].profilephoto == undefined) {
                                                ThisGroupHeader = './images/Destroy.png'
                                            } else {
                                                ThisGroupHeader = $rootScope.imgSrc + response.data[ioioi[i]][e].lastChatrecord[0].profilephoto
                                            }
                                        }
                                        ThisGroupHeader = $rootScope.WeChatownerHeader[response.data[ioioi[i]][e].socialaccountId]
                                        newMsg = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage
                                        response.data[ioioi[i]][e].newMessage = newMsg
                                    }

                                }

                            }
                            else {
                                if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 496) {
                                    noHaveFriendmsgFiletitle = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage.title
                                    noHaveFriendmsgFilesize = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage.filesize
                                    noHaveFriendmsgFilepath = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage.filepath
                                }
                                if (response.data[ioioi[i]][e].lastChatrecord[0].msgStatus == 1||response.data[ioioi[i]][e].lastChatrecord[0].msgStatus == 10) {
                                    ThisGroupHeader = profilePhoto
                                    if (ThisGroupHeader == '' || ThisGroupHeader == undefined) {
                                        ThisGroupHeader = './images/Destroy.png'
                                    }
                                } else {
                                    ThisGroupHeader = $rootScope.WeChatownerHeader[response.data[ioioi[i]][e].socialaccountId]
                                }
                                if (response.data[ioioi[i]][e].lastChatrecord[0].msgType == 1) {
                                    newMsg = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage
                                    response.data[ioioi[i]][e].newMessage = newMsg
                                }
                                newMsg = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage
                                // newMsgFirst =newMsg

                            }

                            var noHaveFriendsendType = response.data[ioioi[i]][e].lastChatrecord[0].msgStatus
                            var noHaveFriendmsgType = response.data[ioioi[i]][e].lastChatrecord[0].msgType
                            var noHaveFriendmsgId = response.data[ioioi[i]][e].lastChatrecord[0].msgid
                            var newcontactNickname = response.data[ioioi[i]][e].lastChatrecord[0].contactNickname

                            if (noHaveFriendsendType == 0 || noHaveFriendsendType == 3) {
                                if (noHaveFriendmsgType == 1) {
                                    newMsgInku += '<li class="Read" dataId="'+ noHaveFriendmsgId +'"  isNew="false">\n' +
                                        '<div class="nesHead">\n' +
                                        '<img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                        '                        </div>\n' +
                                        '                        <div class="news">\n' +
                                        '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                        '                            ' + newMsg + '\n' +
                                        '                        </div>\n' +
                                        '                    </li>'
                                } else if (noHaveFriendmsgType == 3) {
                                    newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                        '                        <div class="nesHead">\n' +
                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                        '                        </div>\n' +
                                        '                        <div class="news bigPicture" data="" data1="">\n' +
                                        '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                        "                           <img class=\"up-Img-Add\" src=" + newMsg + " alt=\"\">\n" +
                                        '                        </div>\n' +
                                        '                    </li>'
                                }
                                else if (noHaveFriendmsgType == 495) {
                                    var img_link = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage
                                    newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                        '                            <div class="nesHead">\n' +
                                        '                                <img src=' + ThisGroupHeader + ' alt="">\n' +
                                        '                            </div>\n' +
                                        '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                        '                            <div class="news news-link">\n' +
                                        '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                        '                                <div class="defult-Link-Add">\n' +
                                        '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                        '                                    <dl>\n' +
                                        '                                        <dd>\n' +
                                        '                                            <span class="up-file-con">\n' +
                                        '                                        ' + img_link.content + '    </span>\n' +
                                        '                                        </dd>\n' +
                                        '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                        '\n' +
                                        '                                    </dl>\n' +
                                        '                                </div>\n' +
                                        '                            </div>\n' +
                                        '                            </a>\n' +
                                        '                        </li>'
                                } else if (noHaveFriendmsgType == 496) {
                                    newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                        '                        <div class="nesHead">\n' +
                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                        '                        </div>\n' +
                                        '                            <div class="news">\n' +
                                        '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                        '                                <div class="up-file-Add">\n' +
                                        '                                    <dl>\n' +
                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                        '                                        <dd>\n' +
                                        '                                            <span class="defult-File-name">\n' +
                                        '' + noHaveFriendmsgFiletitle + '\n' +
                                        '                                            </span>\n' +
                                        '                                            <br>\n' +
                                        '                                            <span class="defult-File-size">\n' +
                                        '' + noHaveFriendmsgFilesize + 'M\n' +
                                        '                                            </span>\n' +

                                        '                                        </dd>\n' +
                                        '                                <div class="up-file-Down" isNew="false"  isme="true"  file_id=' + noHaveFriendmsgId + ' file_title=' + noHaveFriendmsgFiletitle + '  file_path=' + noHaveFriendmsgFilepath + '>下载\n' +
                                        '                            </div>\n' +
                                        '                                    </dl>\n' +
                                        '                                </div>\n' +

                                        '                            </div>\n' +
                                        '                        </li>'
                                }
                            }
                            else {
                                if (noHaveFriendsendType == 10) {
                                    if (noHaveFriendmsgType == 1) {
                                        newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                            '                        <div class="answerHead">\n' +
                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                            '                        </div>\n' +
                                            '                        <div class="group_meber_name">\n' +
                                            '                            ' + newmemberId + '\n' +
                                            '                        </div>\n' +
                                            '                        <div class="answers">\n' +
                                            '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                            '                            ' + newMsg + '\n' +
                                            '                        </div>\n' +
                                            '                    </li>'
                                    } else if (noHaveFriendmsgType == 3) {
                                        newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                            '                        <div class="answerHead">\n' +
                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                            '                        </div>\n' +
                                            '                        <div class="group_meber_name">\n' +
                                            '                            ' + newmemberId + '\n' +
                                            '                        </div>\n' +
                                            '                        <div class="answers bigPicture" data="" data1="">\n' +
                                            '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                            "                           <img class=\"up-Img-Add\" src=" + newMsg + " alt=\"\">\n" +
                                            '                        </div>\n' +
                                            '                    </li>'
                                    } else if (noHaveFriendmsgType == 495) {
                                        var img_link = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage
                                        newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                            '                            <div class="answerHead">\n' +
                                            '                                <img  class="FromUserHeader" src=' + ThisGroupHeader + ' alt="">\n' +
                                            '                            </div>\n' +
                                            '                        <div class="group_meber_name">\n' +
                                            '                            ' + newmemberId + '\n' +
                                            '                        </div>\n' +
                                            '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                            '                            <div class="answers news-link">\n' +
                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                            '                                <div class="defult-Link-Add">\n' +
                                            '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                            '                                    <dl>\n' +
                                            '                                        <dd>\n' +
                                            '                                            <span class="up-file-con">\n' +
                                            '                                        ' + img_link.content + '    </span>\n' +
                                            '                                        </dd>\n' +
                                            '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                            '\n' +
                                            '                                    </dl>\n' +
                                            '                                </div>\n' +
                                            '                            </div>\n' +
                                            '                            </a>\n' +
                                            '                        </li>'
                                    } else if (noHaveFriendmsgType == 496) {
                                        newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                            '                        <div class="answerHead">\n' +
                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                            '                        </div>\n' +
                                            '                            <div class="answers">\n' +
                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                            '                                <div class="up-file-Add">\n' +
                                            '                                    <dl>\n' +
                                            '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                            '                                        <dd>\n' +
                                            '                                            <span class="defult-File-name">\n' +
                                            '' + noHaveFriendmsgFiletitle + '\n' +
                                            '                                            </span>\n' +
                                            '                                            <br>\n' +
                                            '                                            <span class="defult-File-size">\n' +
                                            '' + noHaveFriendmsgFilesize + 'M\n' +
                                            '                                            </span>\n' +

                                            '                                        </dd>\n' +
                                            '                                <div class="up-file-Down" isNew="false" isme="false" file_id=' + noHaveFriendmsgId + '  file_title=' + noHaveFriendmsgFiletitle + ' file_path=' + noHaveFriendmsgFilepath + ' >下载\n' +
                                            '                            </div>\n' +
                                            '                                    </dl>\n' +
                                            '                                </div>\n' +

                                            '                            </div>\n' +
                                            '                        </li>'
                                    }
                                }
                                else {
                                    if (noHaveFriendmsgType == 1) {
                                        newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                            '                        <div class="answerHead">\n' +
                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                            '                        </div>\n' +
                                            '                        <div class="answers">\n' +
                                            '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                            '                            ' + newMsg + '\n' +
                                            '                        </div>\n' +
                                            '                    </li>'
                                    } else if (noHaveFriendmsgType == 3) {
                                        newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                            '                        <div class="answerHead">\n' +
                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                            '                        </div>\n' +
                                            '                        <div class="answers bigPicture" data="" data1="">\n' +
                                            '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                            "                           <img class=\"up-Img-Add\" src=" + newMsg + " alt=\"\">\n" +
                                            '                        </div>\n' +
                                            '                    </li>'
                                    } else if (noHaveFriendmsgType == 495) {
                                        var img_link = response.data[ioioi[i]][e].lastChatrecord[0].chatMessage
                                        newMsgInku += '                        <li class="answerHead" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                            '                            <div class="FromUserHeader">\n' +
                                            '                                <img src=' + ThisGroupHeader + ' alt="">\n' +
                                            '                            </div>\n' +
                                            '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                            '                            <div class="answers news-link">\n' +
                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                            '                                <div class="defult-Link-Add">\n' +
                                            '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                            '                                    <dl>\n' +
                                            '                                        <dd>\n' +
                                            '                                            <span class="up-file-con">\n' +
                                            '                                        ' + img_link.content + '    </span>\n' +
                                            '                                        </dd>\n' +
                                            '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                            '\n' +
                                            '                                    </dl>\n' +
                                            '                                </div>\n' +
                                            '                            </div>\n' +
                                            '                            </a>\n' +
                                            '                        </li>'
                                    } else if (noHaveFriendmsgType == 496) {
                                        newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                            '                        <div class="answerHead">\n' +
                                            '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                            '                        </div>\n' +
                                            '                            <div class="answers">\n' +
                                            '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                            '                                <div class="up-file-Add">\n' +
                                            '                                    <dl>\n' +
                                            '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                            '                                        <dd>\n' +
                                            '                                            <span class="defult-File-name">\n' +
                                            '' + noHaveFriendmsgFiletitle + '\n' +
                                            '                                            </span>\n' +
                                            '                                            <br>\n' +
                                            '                                            <span class="defult-File-size">\n' +
                                            '' + noHaveFriendmsgFilesize + 'M\n' +
                                            '                                            </span>\n' +

                                            '                                        </dd>\n' +
                                            '                                <div class="up-file-Down" isNew="false" isme="false" file_id=' + noHaveFriendmsgId + '  file_title=' + noHaveFriendmsgFiletitle + '  file_path=' + noHaveFriendmsgFilepath + ' >下载\n' +
                                            '                            </div>\n' +
                                            '                                    </dl>\n' +
                                            '                                </div>\n' +

                                            '                            </div>\n' +
                                            '                        </li>'
                                    }
                                }

                            }
                            $rootScope.friendStorage[response.data[ioioi[i]][e].cid] += newMsgInku
                        }
                        else {
                            var isTrue = false
                            var ThisGroupHeader = ''
                            var newmemberId = ''
                            var dataLength = response.data[ioioi[i]][e].lastChatrecord.length
                            var noHaveFriendmsgFiletitle = ''
                            var noHaveFriendmsgFilesize = ''
                            var noHaveFriendmsgFilepath = ''

                            if (dataLength > 20) {
                                var dataLength1 = dataLength - 20
                                isTrue = true
                            } else {
                                isTrue = false
                            }

                            for (var aj = 0; aj < response.data[ioioi[i]][e].lastChatrecord.length; aj++) {
                                var profilePhoto = response.data[ioioi[i]][e].profilePhoto
                                var newMsg = ''
                                var mml = ''
                                if (response.data[ioioi[i]][e].lastChatrecord[aj].msgType == 3) {
                                    response.data[ioioi[i]][e].newMessage = '[图片]'
                                } else if (response.data[ioioi[i]][e].lastChatrecord[aj].msgType == 495) {
                                    response.data[ioioi[i]][e].newMessage = '[图文链接]'
                                } else if (response.data[ioioi[i]][e].lastChatrecord[aj].msgType == 496) {
                                    response.data[ioioi[i]][e].newMessage = '[文件]'
                                }
                                if (response.data[ioioi[i]][e].type == 1) {
                                    if (response.data[ioioi[i]][e].lastChatrecord[aj].msgStatus == 10) {
                                        if (response.data[ioioi[i]][e].lastChatrecord[aj].profilephoto == '' || response.data[ioioi[i]][e].lastChatrecord[aj].profilephoto == undefined) {
                                            ThisGroupHeader = './images/Destroy.png'
                                        } else {
                                            ThisGroupHeader = $rootScope.imgSrc + response.data[ioioi[i]][e].lastChatrecord[aj].profilephoto
                                        }
                                        if (response.data[ioioi[i]][e].lastChatrecord[aj].msgType == 495) {
                                            var ArrHaveGroup_con = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage.content
                                            var ArrHaveGroup_Id = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage.chatroommemberwxid
                                            newMsg = ArrHaveGroup_con
                                            newmemberId = $rootScope.WeChatoMembersNickname[ArrHaveGroup_Id]
                                            if (newmemberId == undefined) {
                                                newmemberId = ArrHaveGroup_Id
                                            }
                                        } else if (response.data[ioioi[i]][e].lastChatrecord[aj].msgType == 496) {
                                            noHaveFriendmsgFiletitle = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage.title
                                            noHaveFriendmsgFilesize = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage.filesize
                                            noHaveFriendmsgFilepath = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage.filepath
                                        } else if (response.data[ioioi[i]][e].lastChatrecord[aj].msgType == 1) {
                                            var ArrHaveGroup = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage.split(':<br>')
                                            newMsg = ArrHaveGroup[1]
                                            response.data[ioioi[i]][e].newMessage = newMsg
                                            newmemberId = $rootScope.WeChatoMembersNickname[ArrHaveGroup[0]]
                                            if (newmemberId == undefined) {
                                                newmemberId = ArrHaveGroup[0]
                                            }
                                        } else {

                                        }
                                    } else {
                                        if (response.data[ioioi[i]][e].lastChatrecord[aj].msgType == 1) {

                                            if (response.data[ioioi[i]][e].lastChatrecord[aj].msgStatus == 10) {
                                                if (response.data[ioioi[i]][e].lastChatrecord[aj].profilephoto == '' || response.data[ioioi[i]][e].lastChatrecord[aj].profilephoto == undefined) {
                                                    ThisGroupHeader = './images/Destroy.png'
                                                } else {
                                                    ThisGroupHeader = $rootScope.imgSrc + response.data[ioioi[i]][e].lastChatrecord[aj].profilephoto
                                                }
                                            }


                                            ThisGroupHeader = $rootScope.WeChatownerHeader[response.data[ioioi[i]][e].socialaccountId]
                                            newMsg = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                            response.data[ioioi[i]][e].newMessage = newMsg
                                        }
                                    }
                                } else {
                                    if (response.data[ioioi[i]][e].lastChatrecord[aj].msgType == 496) {
                                        noHaveFriendmsgFiletitle = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage.title
                                        noHaveFriendmsgFilesize = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage.filesize
                                        noHaveFriendmsgFilepath = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage.filepath
                                    }
                                    if (response.data[ioioi[i]][e].lastChatrecord[aj].msgStatus == 1||response.data[ioioi[i]][e].lastChatrecord[aj].msgStatus==10) {
                                        ThisGroupHeader = profilePhoto
                                        if (ThisGroupHeader == '' || ThisGroupHeader == undefined) {
                                            ThisGroupHeader = './images/Destroy.png'
                                        }
                                    } else {
                                        ThisGroupHeader = $rootScope.WeChatownerHeader[response.data[ioioi[i]][e].socialaccountId]
                                    }
                                    if (response.data[ioioi[i]][e].lastChatrecord[aj].msgType == 1) {
                                        // ThisGroupHeader = $rootScope.WeChatownerHeader[response.data[ioioi[i]][e].socialaccountId]
                                        newMsg = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                        response.data[ioioi[i]][e].newMessage = newMsg
                                    }
                                    newMsg = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                }
                                var newMsgInku = ''
                                var noHaveFriendsendType = response.data[ioioi[i]][e].lastChatrecord[aj].msgStatus
                                var noHaveFriendmsgType = response.data[ioioi[i]][e].lastChatrecord[aj].msgType
                                var noHaveFriendmsgId = response.data[ioioi[i]][e].lastChatrecord[aj].msgid

                                if (isTrue == false) {
                                    if (noHaveFriendsendType == 0 || noHaveFriendsendType == 3) {
                                        if (noHaveFriendmsgType == 1) {
                                            newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                '<div class="nesHead">\n' +
                                                '<img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                '                        </div>\n' +
                                                '                        <div class="news">\n' +
                                                '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                '                            ' + newMsg + '\n' +
                                                '                        </div>\n' +
                                                '                    </li>'
                                        } else if (noHaveFriendmsgType == 3) {
                                            newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                '                        <div class="nesHead">\n' +
                                                '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                '                        </div>\n' +
                                                '                        <div class="news bigPicture" data="" data1="">\n' +
                                                '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                "                           <img class=\"up-Img-Add\" src=" + newMsg + ">\n" +
                                                '                        </div>\n' +
                                                '                    </li>'
                                        } else if (noHaveFriendmsgType == 495) {
                                            var img_link = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                            newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                '                            <div class="nesHead">\n' +
                                                '                                <img class="FromUserHeader"  alt="" src="' + ThisGroupHeader + '">\n' +
                                                '                            </div>\n' +
                                                '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                                '                            <div class="news news-link">\n' +
                                                '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                '                                <div class="defult-Link-Add">\n' +
                                                '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                                '                                    <dl>\n' +
                                                '                                        <dd>\n' +
                                                '                                            <span class="up-file-con">\n' +
                                                '                                        ' + img_link.content + '    </span>\n' +
                                                '                                        </dd>\n' +
                                                '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                                '\n' +
                                                '                                    </dl>\n' +
                                                '                                </div>\n' +
                                                '                            </div>\n' +
                                                '                            </a>\n' +
                                                '                        </li>'
                                        } else if (noHaveFriendmsgType == 496) {
                                            newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                '                        <div class="nesHead">\n' +
                                                '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                '                        </div>\n' +
                                                '                            <div class="news">\n' +
                                                '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                '                                <div class="up-file-Add">\n' +
                                                '                                    <dl>\n' +
                                                '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                '                                        <dd>\n' +
                                                '                                            <span class="defult-File-name">\n' +
                                                '' + noHaveFriendmsgFiletitle + '\n' +
                                                '                                            </span>\n' +
                                                '                                            <br>\n' +
                                                '                                            <span class="defult-File-size">\n' +
                                                '' + noHaveFriendmsgFilesize + 'M\n' +
                                                '                                            </span>\n' +

                                                '                                        </dd>\n' +
                                                '                                <div class="up-file-Down" isNew="false" isme="true" file_id=' + noHaveFriendmsgId + '  file_title=' + noHaveFriendmsgFiletitle + ' file_path=' + noHaveFriendmsgFilepath + ' >下载\n' +
                                                '                            </div>\n' +
                                                '                                    </dl>\n' +
                                                '                                </div>\n' +

                                                '                            </div>\n' +
                                                '                        </li>'
                                        }
                                    }
                                    else {
                                        if (noHaveFriendsendType == 10) {
                                            if (noHaveFriendmsgType == 1) {
                                                newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="answerHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="group_meber_name">\n' +
                                                    '                            ' + newmemberId + '\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="answers">\n' +
                                                    '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                    '                            ' + newMsg + '\n' +
                                                    '                        </div>\n' +
                                                    '                    </li>'
                                            } else if (noHaveFriendmsgType == 3) {
                                                newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="answerHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="group_meber_name">\n' +
                                                    '                            ' + newmemberId + '\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="answers bigPicture" data="" data1="">\n' +
                                                    '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                    "                           <img class=\"up-Img-Add\" src=" + newMsg + ">\n" +
                                                    '                        </div>\n' +
                                                    '                    </li>'
                                            }
                                            else if (noHaveFriendmsgType == 495) {
                                                var img_link = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                                newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                            <div class="answerHead">\n' +
                                                    '                                <img class="FromUserHeader" alt="" src="' + ThisGroupHeader + '">\n' +
                                                    '                            </div>\n' +
                                                    '                        <div class="group_meber_name">\n' +
                                                    '                            ' + newmemberId + '\n' +
                                                    '                        </div>\n' +
                                                    '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                                    '                            <div class="answers news-link">\n' +
                                                    '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                    '                                <div class="defult-Link-Add">\n' +
                                                    '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                                    '                                    <dl>\n' +
                                                    '                                        <dd>\n' +
                                                    '                                            <span class="up-file-con">\n' +
                                                    '                                        ' + img_link.content + '    </span>\n' +
                                                    '                                        </dd>\n' +
                                                    '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                                    '\n' +
                                                    '                                    </dl>\n' +
                                                    '                                </div>\n' +
                                                    '                            </div>\n' +
                                                    '                            </a>\n' +
                                                    '                        </li>'
                                            } else if (noHaveFriendmsgType == 496) {

                                                newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="answerHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                            <div class="answers">\n' +
                                                    '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                    '                                <div class="up-file-Add">\n' +
                                                    '                                    <dl>\n' +
                                                    '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                    '                                        <dd>\n' +
                                                    '                                            <span class="defult-File-name">\n' +
                                                    '' + noHaveFriendmsgFiletitle + '\n' +
                                                    '                                            </span>\n' +
                                                    '                                            <br>\n' +
                                                    '                                            <span class="defult-File-size">\n' +
                                                    '' + noHaveFriendmsgFilesize + 'M\n' +
                                                    '                                            </span>\n' +

                                                    '                                        </dd>\n' +
                                                    '                                <div class="up-file-Down" isNew="false" isme="false" file_id=' + noHaveFriendmsgId + ' file_path=' + noHaveFriendmsgFilepath + '   file_title=' + noHaveFriendmsgFiletitle + '>下载\n' +
                                                    '                            </div>\n' +
                                                    '                                    </dl>\n' +
                                                    '                                </div>\n' +

                                                    '                            </div>\n' +
                                                    '                        </li>'
                                            }
                                        } else {
                                            if (noHaveFriendmsgType == 1) {
                                                newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="answerHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="answers">\n' +
                                                    '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                    '                            ' + newMsg + '\n' +
                                                    '                        </div>\n' +
                                                    '                    </li>'
                                            } else if (noHaveFriendmsgType == 3) {
                                                newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="answerHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="answers bigPicture" data="" data1="">\n' +
                                                    '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                    '                         <img class="up-Img-Add" src=' + newMsg + '  >\n' +
                                                    '                        </div>\n' +
                                                    '                    </li>'
                                            }
                                            else if (noHaveFriendmsgType == 495) {
                                                var img_link = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                                newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                            <div class="answerHead">\n' +
                                                    '                                <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="">\n' +
                                                    '                            </div>\n' +
                                                    '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                                    '                            <div class="answers news-link">\n' +
                                                    '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                    '                                <div class="defult-Link-Add">\n' +
                                                    '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                                    '                                    <dl>\n' +
                                                    '                                        <dd>\n' +
                                                    '                                            <span class="up-file-con">\n' +
                                                    '                                        ' + img_link.content + '    </span>\n' +
                                                    '                                        </dd>\n' +
                                                    '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                                    '\n' +
                                                    '                                    </dl>\n' +
                                                    '                                </div>\n' +
                                                    '                            </div>\n' +
                                                    '                            </a>\n' +
                                                    '                        </li>'
                                            } else if (noHaveFriendmsgType == 496) {

                                                newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="answerHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                            <div class="answers">\n' +
                                                    '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                    '                                <div class="up-file-Add">\n' +
                                                    '                                    <dl>\n' +
                                                    '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                    '                                        <dd>\n' +
                                                    '                                            <span class="defult-File-name">\n' +
                                                    '' + noHaveFriendmsgFiletitle + '\n' +
                                                    '                                            </span>\n' +
                                                    '                                            <br>\n' +
                                                    '                                            <span class="defult-File-size">\n' +
                                                    '' + noHaveFriendmsgFilesize + 'M\n' +
                                                    '                                            </span>\n' +

                                                    '                                        </dd>\n' +
                                                    '                                <div class="up-file-Down" isNew="false" isme="false" file_id=' + noHaveFriendmsgId + '   file_title=' + noHaveFriendmsgFiletitle + ' file_path=' + noHaveFriendmsgFilepath + ' >下载\n' +
                                                    '                            </div>\n' +
                                                    '                                    </dl>\n' +
                                                    '                                </div>\n' +

                                                    '                            </div>\n' +
                                                    '                        </li>'
                                            }
                                        }

                                    }
                                }
                                else {
                                    if (aj >= dataLength1) {
                                        if (noHaveFriendsendType == 0 || noHaveFriendsendType == 3) {
                                            if (noHaveFriendmsgType == 1) {
                                                newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '<div class="nesHead">\n' +
                                                    '<img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="news">\n' +
                                                    '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                    '                            ' + newMsg + '\n' +
                                                    '                        </div>\n' +
                                                    '                    </li>'
                                            } else if (noHaveFriendmsgType == 3) {
                                                newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="nesHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="news bigPicture" data="" data1="">\n' +
                                                    '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                    '                          <img class="up-Img-Add" src= ' + newMsg + '>\n ' +
                                                    '                        </div>\n' +
                                                    '                    </li>'
                                            }
                                            else if (noHaveFriendmsgType == 495) {
                                                var img_link = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                                newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                            <div class="nesHead">\n' +
                                                    '                                <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="">\n' +
                                                    '                            </div>\n' +
                                                    '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                                    '                            <div class="news news-link">\n' +
                                                    '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                    '                                <div class="defult-Link-Add">\n' +
                                                    '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                                    '                                    <dl>\n' +
                                                    '                                        <dd>\n' +
                                                    '                                            <span class="up-file-con">\n' +
                                                    '                                        ' + img_link.content + '    </span>\n' +
                                                    '                                        </dd>\n' +
                                                    '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                                    '\n' +
                                                    '                                    </dl>\n' +
                                                    '                                </div>\n' +
                                                    '                            </div>\n' +
                                                    '                            </a>\n' +
                                                    '                        </li>'
                                            } else if (noHaveFriendmsgType == 496) {
                                                newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="nesHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                            <div class="news">\n' +
                                                    '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                    '                                <div class="up-file-Add">\n' +
                                                    '                                    <dl>\n' +
                                                    '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                    '                                        <dd>\n' +
                                                    '                                            <span class="defult-File-name">\n' +
                                                    '' + noHaveFriendmsgFiletitle + '\n' +
                                                    '                                            </span>\n' +
                                                    '                                            <br>\n' +
                                                    '                                            <span class="defult-File-size">\n' +
                                                    '' + noHaveFriendmsgFilesize + 'M\n' +
                                                    '                                            </span>\n' +

                                                    '                                        </dd>\n' +
                                                    '                                <div class="up-file-Down" isNew="false" isme="true" file_id=' + noHaveFriendmsgId + ' file_path=' + noHaveFriendmsgFilepath + '   file_title=' + noHaveFriendmsgFiletitle + '>下载\n' +
                                                    '                            </div>\n' +
                                                    '                                    </dl>\n' +
                                                    '                                </div>\n' +

                                                    '                            </div>\n' +
                                                    '                        </li>'
                                            }
                                        }
                                        else {
                                            if (noHaveFriendsendType == 10) {
                                                if (noHaveFriendmsgType == 1) {
                                                    newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader"  alt=""src="' + ThisGroupHeader + '"  >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + newmemberId + '\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                            ' + newMsg + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" alt="" src="' + ThisGroupHeader + '" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + newmemberId + '\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers bigPicture" data="" data1="">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                         <img class=\"up-Img-Add\" src= ' + newMsg + '>\n ' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                }
                                                else if (noHaveFriendmsgType == 495) {
                                                    var img_link = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                                    newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                            <div class="answerHead">\n' +
                                                        '                                <img class="FromUserHeader" alt="" src="' + ThisGroupHeader + '">\n' +
                                                        '                            </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + newmemberId + '\n' +
                                                        '                        </div>\n' +
                                                        '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                                        '                            <div class="answers news-link">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + img_link.content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                } else if (noHaveFriendmsgType == 496) {
                                                    newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="answers">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendmsgFiletitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendmsgFilesize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isNew="false" isme="false" file_id=' + noHaveFriendmsgId + '   file_path=' + noHaveFriendmsgFilepath + '   file_title=' + noHaveFriendmsgFiletitle + '>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }
                                            } else {
                                                if (noHaveFriendmsgType == 1) {
                                                    newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                            ' + newMsg + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers bigPicture" data="" data1="">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                         <img class=\"up-Img-Add\" src= ' + newMsg + '>\n ' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                }
                                                else if (noHaveFriendmsgType == 495) {
                                                    var img_link = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                                    newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                            <div class="answerHead">\n' +
                                                        '                                <img class="FromUserHeader"  src="' + ThisGroupHeader + '" alt="">\n' +
                                                        '                            </div>\n' +
                                                        '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                                        '                            <div class="answers news-link">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + img_link.content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                } else if (noHaveFriendmsgType == 496) {
                                                    newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="answers">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendmsgFiletitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendmsgFilesize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isNew="false" isme="false" file_id=' + noHaveFriendmsgId + '   file_title=' + noHaveFriendmsgFiletitle + ' file_path=' + noHaveFriendmsgFilepath + '>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }
                                            }

                                        }
                                    }
                                    else {
                                        if (noHaveFriendsendType == 0 || noHaveFriendsendType == 3) {
                                            if (noHaveFriendmsgType == 1) {
                                                newMsgInku += '<li class="Read initNone" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '<div class="nesHead">\n' +
                                                    '<img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="news">\n' +
                                                    '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                    '                            ' + newMsg + '\n' +
                                                    '                        </div>\n' +
                                                    '                    </li>'
                                            } else if (noHaveFriendmsgType == 3) {
                                                newMsgInku += '<li class="Read initNone" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="nesHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                        <div class="news bigPicture" data="" data1="">\n' +
                                                    '                            <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                    '                         <img class=\"up-Img-Add\" src=' + newMsg + '>\n ' +
                                                    '                        </div>\n' +
                                                    '                    </li>'
                                            }
                                            else if (noHaveFriendmsgType == 495) {
                                                var img_link = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                                newMsgInku += '                        <li class="Read initNone" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                            <div class="nesHead">\n' +
                                                    '                                <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="">\n' +
                                                    '                            </div>\n' +
                                                    '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                                    '                            <div class="news news-link">\n' +
                                                    '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                    '                                <div class="defult-Link-Add">\n' +
                                                    '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                                    '                                    <dl>\n' +
                                                    '                                        <dd>\n' +
                                                    '                                            <span class="up-file-con">\n' +
                                                    '                                        ' + img_link.content + '    </span>\n' +
                                                    '                                        </dd>\n' +
                                                    '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                                    '\n' +
                                                    '                                    </dl>\n' +
                                                    '                                </div>\n' +
                                                    '                            </div>\n' +
                                                    '                            </a>\n' +
                                                    '                        </li>'
                                            } else if (noHaveFriendmsgType == 496) {

                                                newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                    '                        <div class="nesHead">\n' +
                                                    '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                    '                        </div>\n' +
                                                    '                            <div class="news">\n' +
                                                    '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                                                    '                                <div class="up-file-Add">\n' +
                                                    '                                    <dl>\n' +
                                                    '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                    '                                        <dd>\n' +
                                                    '                                            <span class="defult-File-name">\n' +
                                                    '' + noHaveFriendmsgFiletitle + '\n' +
                                                    '                                            </span>\n' +
                                                    '                                            <br>\n' +
                                                    '                                            <span class="defult-File-size">\n' +
                                                    '' + noHaveFriendmsgFilesize + 'M\n' +
                                                    '                                            </span>\n' +

                                                    '                                        </dd>\n' +
                                                    '                                <div class="up-file-Down" isNew="false" isme="true" file_id=' + noHaveFriendmsgId + '  file_title=' + noHaveFriendmsgFiletitle + '  file_path=' + noHaveFriendmsgFilepath + '>下载1\n' +
                                                    '                            </div>\n' +
                                                    '                                    </dl>\n' +
                                                    '                                </div>\n' +

                                                    '                            </div>\n' +
                                                    '                        </li>'
                                            }
                                        }
                                        else {
                                            if (noHaveFriendsendType == 10) {
                                                if (noHaveFriendmsgType == 1) {
                                                    newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" alt="" src="' + ThisGroupHeader + '"  >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + newmemberId + '\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                            ' + newMsg + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    newMsgInku += '<li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader"  alt="" src="' + ThisGroupHeader + '" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + newmemberId + '\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers bigPicture" data="" data1="">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                          <img class=\"up-Img-Add\" src= ' + newMsg + ' >\n ' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                }
                                                else if (noHaveFriendmsgType == 495) {
                                                    var img_link = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                                    newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                            <div class="answerHead">\n' +
                                                        '                                <img class="FromUserHeader"  alt=""  src="' + ThisGroupHeader + '">\n' +
                                                        '                            </div>\n' +
                                                        '                        <div class="group_meber_name">\n' +
                                                        '                            ' + newmemberId + '\n' +
                                                        '                        </div>\n' +
                                                        '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                                        '                            <div class="answers news-link">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + img_link.content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                } else if (noHaveFriendmsgType == 496) {

                                                    newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="answers">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendmsgFiletitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendmsgFilesize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isNew="false" isme="false" file_id=' + noHaveFriendmsgId + 'file_title=' + noHaveFriendmsgFiletitle + ' file_path=' + noHaveFriendmsgFilepath + '>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }
                                            } else {
                                                if (noHaveFriendmsgType == 1) {
                                                    newMsgInku += '<li class="Read initNone" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                            ' + newMsg + '\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                } else if (noHaveFriendmsgType == 3) {
                                                    newMsgInku += '<li class="Read initNone" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                        <div class="answers bigPicture" data="" data1="">\n' +
                                                        '                            <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                          <img class=\"up-Img-Add\" src= ' + newMsg + '>\n' +
                                                        '                        </div>\n' +
                                                        '                    </li>'
                                                }
                                                else if (noHaveFriendmsgType == 495) {
                                                    var img_link = response.data[ioioi[i]][e].lastChatrecord[aj].chatMessage
                                                    newMsgInku += '                        <li class="Read initNone" dataId="' + noHaveFriendmsgId + '"  isNew="false">\n' +
                                                        '                            <div class="answerHead">\n' +
                                                        '                                <img class="FromUserHeader"  alt="" src="' + ThisGroupHeader + '">\n' +
                                                        '                            </div>\n' +
                                                        '                            <a href=' + img_link.url + ' target="_blank">\n' +
                                                        '                            <div class="answers news-link">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="defult-Link-Add">\n' +
                                                        '                                    <span class="defult-Link-title">' + img_link.title + '</span>\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="up-file-con">\n' +
                                                        '                                        ' + img_link.content + '    </span>\n' +
                                                        '                                        </dd>\n' +
                                                        '                                        <dt><img class="up-file-icon" src="./images/link.png"></dt>\n' +
                                                        '\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +
                                                        '                            </div>\n' +
                                                        '                            </a>\n' +
                                                        '                        </li>'
                                                } else if (noHaveFriendmsgType == 496) {

                                                    newMsgInku += '                        <li class="Read" dataId="' + noHaveFriendmsgId + '" isNew="false">\n' +
                                                        '                        <div class="answerHead">\n' +
                                                        '                            <img class="FromUserHeader" src="' + ThisGroupHeader + '" alt="" >\n' +
                                                        '                        </div>\n' +
                                                        '                            <div class="answers">\n' +
                                                        '                                <img class="jiao" src="images/whitejiao.png" alt="">\n' +
                                                        '                                <div class="up-file-Add">\n' +
                                                        '                                    <dl>\n' +
                                                        '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                                                        '                                        <dd>\n' +
                                                        '                                            <span class="defult-File-name">\n' +
                                                        '' + noHaveFriendmsgFiletitle + '\n' +
                                                        '                                            </span>\n' +
                                                        '                                            <br>\n' +
                                                        '                                            <span class="defult-File-size">\n' +
                                                        '' + noHaveFriendmsgFilesize + 'M\n' +
                                                        '                                            </span>\n' +

                                                        '                                        </dd>\n' +
                                                        '                                <div class="up-file-Down" isNew="false" isme="false" file_id=' + noHaveFriendmsgId + ' file_title=' + noHaveFriendmsgFiletitle + ' file_path=' + noHaveFriendmsgFilepath + '>下载\n' +
                                                        '                            </div>\n' +
                                                        '                                    </dl>\n' +
                                                        '                                </div>\n' +

                                                        '                            </div>\n' +
                                                        '                        </li>'
                                                }
                                            }
                                        }
                                    }
                                }
                                $rootScope.friendStorage[response.data[ioioi[i]][e].cid] += newMsgInku
                            }

                        }
                    }
                }
                $rootScope.Chatwithfriends[ioioi[i]] = response.data[ioioi[i]]
            }
        }
    });
    $scope.Initializationandpostoperationrecords = true
    $scope.iNtadsa = true


    /*---------------聊天界面进行微信号切换--------------*/
    $rootScope.lplplpl = -1
    var forme1 = '请选择'
    var wodegv = true
    var bGoH = ''
    $('.page1-Maindiv2').on('click', '.newSelect', function () {
        $('.page1-Maindiv3').attr('data', '')
        $('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
        wodegv = false
        $rootScope.watchThis = $('.page1-Maindiv2 .newSelectTitle span').html()
        forme1 = $rootScope.watchThis
        var a = $('.page1-Maindiv2 .select1')
        for (var i = 0; i < a.length; i++) {
            if ($('.select1').eq(i).html() == $rootScope.watchThis) {
                bGoH = $('.select1').eq(i).attr('data-value')
                $rootScope.lplplpl = bGoH;
            }
        }
        if (bGoH == -1) {
            $scope.Initializationandpostoperationrecords = true
            $scope.page1Maindiv4Init = true
            $scope.ChatModule = false;
            $('.chat-bottom-write').html('')
            $('.page1-Maindiv3').css('background', 'url("../images/chatBg.png") center no-repeat')
            if ($scope['Isp' + -1] == false) {
                $rootScope.firendList = new FormData()
                $rootScope.firendList.append('accountId', $rootScope.myaccountId)
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/latelyChatroom/getRecentContactAndChatroom",
                    data: $rootScope.firendList,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    $rootScope.TotopNum = response.data.sumtop - 1
                });
                $scope.$apply(function () {
                    $rootScope.frienfList = $rootScope.Chatwithfriends[-1]
                    $('.page1-Maindiv2-myfriends-search-con-ul1 li').removeClass('click-background-color')
                })
                $scope['Isp' + -1] = true
            } else {
                $rootScope.Identificationforthefirsttime = true
                $rootScope.lpkn = new FormData()
                $rootScope.lpkn.append('accountId', $rootScope.myaccountId)
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/latelyChatroom/getRecentContactAndChatroom",
                    data: $rootScope.lpkn,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    /*-------------渲染当前微信号下好友列表-------------*/

                    $rootScope.TotopNum = response.data.sumtop - 1
                    $('.newAdds').remove()
                    $rootScope.frienfList = []
                    $rootScope.frienfList = $rootScope.Chatwithfriends[bGoH]
                    setTimeout(function () {
                        for (var i = 0; i < $rootScope.Chatwithfriends[bGoH].length; i++) {
                            var VNcid = $rootScope.Chatwithfriends[bGoH][i].cid
                            var VNNew = $rootScope.Chatwithfriends[bGoH][i].newMessage
                            /*-------------查看当前微信号下对应好友是否有新消息-------------*/
                            /*----有新消息将新消息显示---*/
                            if ($rootScope.Chatwithfriends[bGoH][i].newMessage != '' && $rootScope.Chatwithfriends[bGoH][i].newMessage != undefined) {
                                var mml = $rootScope.Chatwithfriends[bGoH][i].newMessage

                                if (mml == undefined || mml == '') {
                                    $('.page1-Maindiv2 .wechatList .moveFriendList').find('span[data^="' + VNcid + '"]').html('')
                                } else {
                                    var arr88 = mml.match(/\[[^\]]+\]/g);
                                    if (arr88 == null || arr88 == 0 || arr88 == undefined) {
                                        $rootScope.Chatwithfriends[bGoH][i].newMessage = $rootScope.Chatwithfriends[bGoH][i].newMessage.replace(/<br>/g, "")
                                    } else {
                                        var tt1 = []
                                        var tt2 = []
                                        for (var i1 = 0; i1 < arr88.length; i1++) {
                                            for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                                                if (arr88[i1] == emjoyAllGet[i2]) {
                                                    tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                                                    tt2.push(emjoyAllGet[i2])
                                                }
                                            }
                                        }
                                        for (var i8 = 0; i8 < tt1.length; i8++) {
                                            mml = mml.replace(tt2[i8], tt1[i8])
                                        }
                                        $rootScope.Chatwithfriends[bGoH][i].newMessage = mml.replace(/<br>/g, "")
                                    }
                                    $('.page1-Maindiv2 .wechatList .moveFriendList').find('span[data^="' + VNcid + '"]').html($rootScope.Chatwithfriends[bGoH][i].newMessage)
                                }

                            } else {
                                $('.page1-Maindiv2 .wechatList .moveFriendList').find('span[data^="' + VNcid + '"]').html('')
                            }
                            /*----有新消息将新消息条数显示---*/
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }
                        $('.page1-Maindiv2-myfriends-search-con-ul1 li').removeClass('click-background-color')
                    }, 150)
                });


            }
        } else {
            $scope.Initializationandpostoperationrecords = false
            $scope.page1Maindiv4Init = true
            $scope.ChatModule = false;
            $('.chat-bottom-write').html('')
            $('.page1-Maindiv3').css('background', 'url("../images/chatBg.png") center no-repeat')
            if ($scope['IsP' + bGoH] == false) {
                $rootScope.frienfList = []
                $scope['IsP' + bGoH] = true
                var oo = new FormData()
                oo.append('accountId', $rootScope.myaccountId)
                oo.append('id', bGoH)
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/latelychat/getRecentContactAndChatroomByTwoId",
                    data: oo,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    $rootScope.TotopNum = response.data.sumtop - 1
                    $rootScope.frienfList = $rootScope.Chatwithfriends[bGoH]
                    setTimeout(function () {
                        for (var t = 0; t < $rootScope.Chatwithfriends[bGoH].length; t++) {
                            var VNcid = $rootScope.Chatwithfriends[bGoH][t].cid
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }
                            }
                            else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                            if ($rootScope.Chatwithfriends[bGoH][t].newMessage != '' || $rootScope.Chatwithfriends[bGoH][t].newMessage != undefined) {
                                var mml = $rootScope.Chatwithfriends[bGoH][t].newMessage

                                if (mml == undefined || mml == '') {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[bGoH][t].cid + '"]').html('')
                                } else {
                                    var arr88 = mml.match(/\[[^\]]+\]/g);
                                    if (arr88 == null || arr88 == 0 || arr88 == undefined) {
                                        $rootScope.Chatwithfriends[bGoH][t].newMessage = $rootScope.Chatwithfriends[bGoH][t].newMessage.replace(/<br>/g, "")
                                    } else {
                                        var tt1 = []
                                        var tt2 = []
                                        for (var i1 = 0; i1 < arr88.length; i1++) {
                                            for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                                                if (arr88[i1] == emjoyAllGet[i2]) {
                                                    tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                                                    tt2.push(emjoyAllGet[i2])
                                                }
                                            }
                                        }
                                        for (var i8 = 0; i8 < tt1.length; i8++) {
                                            mml = mml.replace(tt2[i8], tt1[i8])
                                        }
                                        $rootScope.Chatwithfriends[bGoH][t].newMessage = mml.replace(/<br>/g, "")
                                    }
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[bGoH][t].cid + '"]').html($rootScope.Chatwithfriends[bGoH][t].newMessage)
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[bGoH][t].cid + '"]').html('')
                            }
                        }
                        $('.page1-Maindiv2-myfriends-search-con-ul1 li').removeClass('click-background-color')
                    }, 150)
                });
            } else {
                $rootScope.frienfList = [];
                var oo = new FormData()
                oo.append('accountId', $rootScope.myaccountId)
                oo.append('id', bGoH)
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/latelychat/getRecentContactAndChatroomByTwoId",
                    data: oo,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    $rootScope.TotopNum = response.data.sumtop - 1
                });
                $scope.$apply(function () {
                    $rootScope.frienfList = $rootScope.Chatwithfriends[bGoH]
                })
                setTimeout(function () {
                    for (var i = 0; i < $rootScope.Chatwithfriends[bGoH].length; i++) {
                        var VNcid = $rootScope.Chatwithfriends[bGoH][i].cid
                        if ($rootScope.Chatwithfriends[bGoH][i].newMessage != '' || $rootScope.Chatwithfriends[bGoH][i].newMessage != undefined) {
                            var mml = $rootScope.Chatwithfriends[bGoH][i].newMessage

                            if (mml == undefined || mml == '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[bGoH][i].cid + '"]').html('')
                            } else {
                                var arr88 = mml.match(/\[[^\]]+\]/g);
                                if (arr88 == null || arr88 == 0 || arr88 == undefined) {
                                    $rootScope.Chatwithfriends[bGoH][i].newMessage = $rootScope.Chatwithfriends[bGoH][i].newMessage.replace(/<br>/g, "")
                                } else {
                                    var tt1 = []
                                    var tt2 = []
                                    for (var i1 = 0; i1 < arr88.length; i1++) {
                                        for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                                            if (arr88[i1] == emjoyAllGet[i2]) {
                                                tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                                                tt2.push(emjoyAllGet[i2])
                                            }
                                        }
                                    }
                                    for (var i8 = 0; i8 < tt1.length; i8++) {
                                        mml = mml.replace(tt2[i8], tt1[i8])
                                    }
                                    $rootScope.Chatwithfriends[bGoH][i].newMessage = mml.replace(/<br>/g, "")
                                }
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[bGoH][i].cid + '"]').html($rootScope.Chatwithfriends[bGoH][i].newMessage)
                            }

                        } else {
                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[bGoH][i].cid + '"]').html('')
                        }

                        if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                            var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                            if (bothingRead > 0) {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }

                        } else {
                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                        }
                    }
                    $('.page1-Maindiv2-myfriends-search-con-ul1 li').removeClass('click-background-color')
                }, 150)
            }
        }
    })
    $scope.serach_Keyword = ''
    /*----------------搜索当前社交下的最近聊天好友----------------*/
    $('.page1-Maindiv2-myfriends-search-input').bind('input propertychange', function () {

        $('.page1-Maindiv2-myfriends-search-con_history').css('display', 'none')
        $('.tel_history_list').css('display', 'none')
        var searchCon = $(this).val()
        if ($scope.Initializationandpostoperationrecords == true) {
            var oo = new FormData()
            oo.append('accountId', $rootScope.myaccountId)
            oo.append('message', searchCon)
            $http({
                method: 'POST',
                url: $rootScope.link + "/latelychat/getRecentContactAndChatroomById",
                data: oo,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200 && response.data.contactList.length > 0) {
                    for (var i = 0; i < response.data.contactList.length; i++) {
                        if(response.data.contactList[i].profilePhoto==''){
                            response.data.contactList[i].profilePhoto = './images/Destroy.png'
                        }else {
                            response.data.contactList[i].profilePhoto = $rootScope.imgSrc + response.data.contactList[i].profilePhoto

                        }

                    }
                    $scope.chatListSEarch = response.data.contactList
                    $('.page1-Maindiv2-listInit').css('display', 'block')
                    $scope.serach_Keyword = searchCon
                } else {
                    $('.page1-Maindiv2-listInit').css('display', 'none')
                }
            });
        } else {
            var oo = new FormData()
            oo.append('accountId', $rootScope.myaccountId)
            oo.append('message', searchCon)
            oo.append('id', $rootScope.lplplpl)
            $http({
                method: 'POST',
                url: $rootScope.link + "/latelychat/getRecentContactAndChatroomByIdAndName",
                data: oo,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200 && response.data.contactList.length > 0) {
                    $scope.chatListSEarch = response.data.contactList
                    $('.page1-Maindiv2-listInit').css('display', 'block')
                } else {
                    $('.page1-Maindiv2-listInit').css('display', 'none')
                }
                $scope.serach_Keyword = ''
            });
        }

    })
    $('.page1-Maindiv3,.page1-Maindiv1,.page1-Maindiv4,.wechatList,.newSelect').click(function () {
        $('.page1-Maindiv2-listInit').css('display', 'none')
        $('.page1-Maindiv2-myfriends-search-con_history').css('display', 'none')
        $('.tel_history_list').css('display', 'none')
        $('.page1-Maindiv2-myfriends-search-input').val('')
    })
    /*-----------------获取标签库信息----------------*/
    $http({
        method: 'POST',
        url: $rootScope.link + "/tag/getTwoTags",
        data: '',
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $rootScope.Taglibrary = response.data;
        }
    });
    /*----------标签展示打标签切换---------*/
    $scope.addTagIsshow = function (e) {
        if (e == 1) {
            if ($('.page1-div3-content-title-edit-tag2').attr('data') == 0) {
                $('.page1-div3-content-title-edit-tag2').attr('data', 1)
                $('.page1-div3-content-title-edit-tag2').html('完成')
                $('.page1-div3-content-title-edit-tag2').css({'display': 'inline-block', 'right': '0px'})

                $('.page1-div3-content-title-edit-tag').css('display', 'none')
                $('.add_tag_input_add').css('display', 'block')
                $('.tags-box').css({'position': 'relative', 'z-index': -10})
                $('.page1-div3-content-tags').css('height', '134px')
            }
            else {

                if ($('.add_tag_input_add').val() == '') {
                    $('.page1-div3-content-title-edit-tag2').attr('data', 0)
                    $('.page1-div3-content-title-edit-tag2').html('自定义')
                    $('.page1-div3-content-title-edit-tag2').css({'display': 'inline-block', 'right': '30px'})
                    $('.page1-div3-content-title-edit-tag').css('display', 'inline-block')
                    $('.tags-box').css({'position': 'relative', 'z-index': 0})
                    $('.page1-div3-content-tags').css('height', '114px')
                    $('.add_tag_input_add').css('display', 'none')
                } else {
                    $('.page1-div3-content-title-edit-tag2').attr('data', 0)
                    $('.page1-div3-content-title-edit-tag2').html('自定义')
                    $('.page1-div3-content-title-edit-tag2').css({'display': 'inline-block', 'right': '30px'})
                    $('.page1-div3-content-title-edit-tag').css('display', 'inline-block')
                    $('.tags-box').css({'position': 'relative', 'z-index': 0})
                    $('.page1-div3-content-tags').css('height', '114px')
                    $('.add_tag_input_add').css('display', 'none')
                    var addTag = $('.add_tag_input_add').val()
                    var addTagArr = []
                    var addTagArr1 = []
                    addTagArr.push(addTag.split('，'))

                    if (addTagArr[0].length == 0) {
                    }
                    else {
                        for (var k = 0; k < addTagArr[0].length; k++) {
                            if (addTagArr[0][k] == '') {

                            } else {
                                addTagArr1.push(addTagArr[0][k])
                            }
                        }
                        var hayui = $('.search-field')
                        if ($scope.chatGroupOrFriend == 1) {
                            var id = $(".page1-div3-content-name-Group-First").attr('data')
                            var socialaccountId = $(".page1-div3-content-name-Group-First").attr('data1')
                            var delTag = new FormData()
                            delTag.append('id', id)
                            delTag.append('socialaccountid', socialaccountId)
                            delTag.append('tags', addTagArr1)
                            $http({
                                method: 'POST',
                                url: $rootScope.link + "/contact/addChatroomTags",
                                data: delTag,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                if (response.code == 200) {
                                    $('.add_tag_input_add').val('')
                                    var oo = new FormData()
                                    oo.append('socialaccountId', socialaccountId)
                                    oo.append('chatroomId', id)
                                    $http({
                                        method: 'POST',
                                        url: $rootScope.link + "/contact/getChatroomById",
                                        data: oo,
                                        headers: {'Content-Type': undefined},
                                        transformRequest: angular.identity
                                    }).success(function (response) {
                                        var tages1 = response.data.tags;
                                        $scope.FriendTags = tages1.split(',')
                                    });
                                }
                            });
                        }
                        else {
                            var delTag = new FormData()
                            delTag.append('id', $rootScope.Id)
                            delTag.append('socialaccountid', $rootScope.socialaccountId)
                            delTag.append('tags', addTagArr1)
                            $http({
                                method: 'POST',
                                url: $rootScope.link + "/contact/addContactTags",
                                data: delTag,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                if (response.code == 200) {
                                    $('.add_tag_input_add').val('')
                                    var oo = new FormData()
                                    oo.append('socialaccountId', $rootScope.socialaccountId)
                                    oo.append('contactId', $rootScope.Id)
                                    $http({
                                        method: 'POST',
                                        url: $rootScope.link + "/contact/getContactById",
                                        data: oo,
                                        headers: {'Content-Type': undefined},
                                        transformRequest: angular.identity
                                    }).success(function (response) {
                                        var tages1 = response.data.tags;
                                        $scope.FriendTags = tages1.split(',')
                                    });
                                }
                            });
                        }
                    }
                }

            }
        }
        else {
            if ($('.page1-div3-content-title-edit-tag').attr('data') == 0) {
                $('.page1-div3-content-title-edit-tag').attr('data', 1)
                $('.page1-div3-content-title-edit-tag').html('完成')
                $('.page1-div3-content-title-edit-tag2').css('display', 'none')
                $('.tags-box').css({'position': 'relative', 'z-index': -10})
                $('.side-by-side').css('display', 'inline-block')
                $('.page1-div3-content-tags').css('height', '134px')
            }
            else {
                $('.page1-div3-content-title-edit-tag').html('选择')
                $('.page1-div3-content-tags').css('height', '114px')
                $('.page1-div3-content-title-edit-tag2').css('display', 'inline-block')
                $('.tags-box').css({'position': 'relative', 'z-index': 0})
                $('.side-by-side').css('display', 'none')
                $('.page1-div3-content-title-edit-tag').attr('data', 0)
                var addTags = []
                var pp = $('.search-choice')
                for (var i = 0; i < pp.length; i++) {
                    addTags.push(pp.eq(i)[0].innerText)
                }
                if (addTags.length == 0) {
                } else {
                    var hayui = $('.search-field')
                    if ($scope.chatGroupOrFriend == 1) {
                        var id = $(".page1-div3-content-name-Group-First").attr('data')
                        var socialaccountId = $(".page1-div3-content-name-Group-First").attr('data1')
                        var delTag = new FormData()
                        delTag.append('id', id)
                        delTag.append('socialaccountid', socialaccountId)
                        delTag.append('tags', addTags)
                        $http({
                            method: 'POST',
                            url: $rootScope.link + "/contact/addChatroomTags",
                            data: delTag,
                            headers: {'Content-Type': undefined},
                            transformRequest: angular.identity
                        }).success(function (response) {
                            if (response.code == 200) {
                                var oo = new FormData()
                                oo.append('socialaccountId', socialaccountId)
                                oo.append('chatroomId', id)
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + "/contact/getChatroomById",
                                    data: oo,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    var tages1 = response.data.tags;
                                    $scope.FriendTags = tages1.split(',')
                                });
                            }
                        });
                    } else {
                        var delTag = new FormData()
                        delTag.append('id', $rootScope.Id)
                        delTag.append('socialaccountid', $rootScope.socialaccountId)
                        delTag.append('tags', addTags)
                        $http({
                            method: 'POST',
                            url: $rootScope.link + "/contact/addContactTags",
                            data: delTag,
                            headers: {'Content-Type': undefined},
                            transformRequest: angular.identity
                        }).success(function (response) {
                            if (response.code == 200) {
                                var oo = new FormData()
                                oo.append('socialaccountId', $rootScope.socialaccountId)
                                oo.append('contactId', $rootScope.Id)
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + "/contact/getContactById",
                                    data: oo,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    var tages1 = response.data.tags;
                                    $scope.FriendTags = tages1.split(',')
                                });
                            }
                        });
                    }
                }
            }
        }

    }
    var sdasda = false
    /*----------资料部分table切换---------*/
    $scope.page1TableSwitch = function (e) {
        if (e == 1) {
            /*-----需要判断是否为群组还是好友----*/
            $scope.Customerinformation = true;
            $scope.allCustomerList = false;
            $scope.quickReply = false;
            $scope.Graphiclink = false;
            $scope.customerRecord = false;
            if ($scope.type == 1) {
                $scope.myself1 = true;
                $scope.myself = false;
            } else {
                $scope.myself1 = false;
                $scope.myself = true;
            }
            $('.page1-div3-title-span1').css({
                'color': 'rgb(68, 186, 246)',
                'border-bottom': '2px solid rgb(68, 186, 246)'
            })
            $('.page1-div3-title-span2').css({'color': '#444444', 'border': 'none'})
            $('.page1-div3-title-span3').css({'color': '#444444', 'border': 'none'})
        }
        else if (e == 2) {
            $scope.Graphiclink = false;
            $scope.Customerinformation = false;
            $scope.allCustomerList = false;
            $scope.quickReply = true;
            $scope.customerRecord = false;
            $scope.quickReplyPhrase = true;
            $scope.quickReplylibrary = false
            $('.quick-reply-table-div1').css('border-bottom', '2px solid #44baf6');
            $('.quick-reply-table-div2').css('border-bottom', '2px solid #FFFFFF');
            $('.quick-reply-table-div3').css('border-bottom', '2px solid #FFFFFF');
            $('.page1-div3-title-span2').css({
                'color': 'rgb(68, 186, 246)',
                'border-bottom': '2px solid rgb(68, 186, 246)'
            })
            $('.page1-div3-title-span1').css({'color': '#444444', 'border': 'none'})
            $('.page1-div3-title-span3').css({'color': '#444444', 'border': 'none'})
            /*-------------获取所有快捷短语分组-----------*/
            $http({
                method: 'POST',
                url: $rootScope.link + "/script/getTwoScript",
                data: '',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $scope.AllShortcutphrase = response.data;
                    if (sdasda == false) {
                        sdasda = true
                        $scope.$watch('$viewContentLoaded', function () {
                            $(".tree").treemenu({delay: 0}).openActive();
                        });
                    }
                    $scope.$watch('$viewContentLoaded', function () {
                        $(".tree").treemenu({delay: 0}).openActive();
                        $(".tree").treemenu({delay: 0}).openActive();
                    });
                } else {
                }

            });
        }
        else if (e == 3) {
            $scope.Graphiclink = false;
            $('.customer-record-table-div').css('display', 'flex');
            $('.customer-record-time').css('display', 'block');
            $('.chat-record-search').val('')
            $scope.SearchkeywordsHistory = false
            $scope.Customerinformation = false;
            $scope.allCustomerList = false;
            $scope.quickReply = false;
            $scope.customerRecord = true;
            $scope.chatRecord = true;
            $scope.chatRecordImg = false;
            $('.customer-record-table-div1').css('border-bottom', '2px solid #44baf6');
            $('.customer-record-table-div2').css('border-bottom', '2px solid #FFFFFF');
            $('.page1-div3-title-span3').css({
                'color': 'rgb(68, 186, 246)',
                'border-bottom': '2px solid rgb(68, 186, 246)'
            })
            $('.page1-div3-title-span2').css({'color': '#444444', 'border': 'none'})
            $('.page1-div3-title-span1').css({'color': '#444444', 'border': 'none'})

            if ($rootScope.type == 1) {
                var Textrecord = new FormData()
                Textrecord.append('chatroomId', $rootScope.Id)
                Textrecord.append('socialaccountid', $rootScope.socialaccountId)
                $http({
                    method: 'POST',
                    url: $rootScope.link1 + "/chatrecord/getChatroomChatrecordPage",
                    data: Textrecord,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    if (response.code == 200) {
                        $scope.Chatrecordpagenumber = response.data.pageindex
                        $scope.AllChatrecordpagenumber = response.data.pagesumcount
                        for (var i = 0; i < response.data.chatList.length; i++) {
                            if (response.data.chatList[i].msgStatus == 3) {
                                response.data.chatList[i].contactNickname = '我'
                                response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                            } else if (response.data.chatList[i].msgStatus == 10 && response.data.chatList[i].profilephoto == '') {
                                response.data.chatList[i].profilephoto = './images/Destroy.png'
                            }
                        }
                        $scope.Textrecord = response.data.chatList
                        $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                        if ($scope.Textrecord.length == 0) {
                            $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                        } else {
                            $('.chat-record').css('background', 'none')
                        }
                    } else {
                    }
                });
            } else {
                var Textrecord = new FormData()
                Textrecord.append('contactid', $rootScope.Id)
                Textrecord.append('socialaccountid', $rootScope.socialaccountId)
                $http({
                    method: 'POST',
                    url: $rootScope.link1 + "/chatrecord/getchatrecordpage",
                    data: Textrecord,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    if (response.code == 200) {
                        $scope.Chatrecordpagenumber = response.data.pageindex
                        $scope.AllChatrecordpagenumber = response.data.pagesumcount
                        for (var i = 0; i < response.data.chatList.length; i++) {
                            if (response.data.chatList[i].msgStatus == 0) {
                                response.data.chatList[i].contactNickname = '我'
                                response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                            } else if (response.data.chatList[i].msgStatus == 1) {

                                response.data.chatList[i].profilephoto = $rootScope.ChatPhoto
                            }
                        }
                        $scope.Textrecord = response.data.chatList

                        if (response.data.thedate == undefined || response.data.thedate == null || response.data.thedate == '') {

                        } else {
                            $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                        }

                        if ($scope.Textrecord.length == 0) {
                            $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                        } else {
                            $('.chat-record').css('background', 'none')
                        }
                    } else {
                    }
                });
            }


        }
    }

    /*---------------选择快捷短语发送----------------*/
    $(document).on('click', '.quick-reply-treemenu-to-msg', function () {
        $('#editor1').html($(this).find('.quick-reply-treemenu-list-con').html())
    })

    $scope.Graphiclink = false;
    /*-----------------快捷回复table切换------------------*/
    $scope.quickRelyTable = function (e) {
        if (e == 1) {
            $scope.quickReplyPhrase = true;
            $scope.quickReplylibrary = false;
            $scope.Graphiclink = false;
            $('.quick-reply-table-div1').css('border-bottom', '2px solid #44baf6');
            $('.quick-reply-table-div2').css('border-bottom', '2px solid #FFFFFF');
            $('.quick-reply-table-div3').css('border-bottom', '2px solid #FFFFFF');
            $http({
                method: 'POST',
                url: $rootScope.link + "/script/getTwoScript",
                data: '',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $scope.AllShortcutphrase = response.data;
                    // $scope.$watch('$viewContentLoaded', function () {
                    //     $(".tree").treemenu({delay: 0}).openActive();
                    // });

                } else {
                }
            });
        }
        else if (e == 2) {
            $scope.quickReplyPhrase = false;
            $scope.quickReplylibrary = true;
            $scope.Graphiclink = false;
            $('.quick-reply-table-div2').css('border-bottom', '2px solid #44baf6');
            $('.quick-reply-table-div1').css('border-bottom', '2px solid #FFFFFF');
            $('.quick-reply-table-div3').css('border-bottom', '2px solid #FFFFFF');
            /*-------------获取图片库所有信息----------*/
            var Picturelibrary = new FormData()
            $http({
                method: 'POST',
                url: $rootScope.link + "/picture/getAllPicture",
                data: Picturelibrary,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {

                    $scope.Picturelibrary = response.data.pictureList;
                } else {
                }
            });

        }
        else {
            /*--------------获取图文链接库---------------*/
            $rootScope.AllGraphiclink = ''
            $http({
                method: 'POST',
                url: $rootScope.link + "/imgandlink/queryAllImgAndLink",
                data: '',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $rootScope.AllGraphiclink = response.data.imgAndLinkList
                } else {
                    $rootScope.AllGraphiclink = ''
                }
            })
            $scope.quickReplyPhrase = false;
            $scope.quickReplylibrary = false;
            $scope.Graphiclink = true;
            $('.quick-reply-table-div2').css('border-bottom', '2px solid #FFFFFF');
            $('.quick-reply-table-div1').css('border-bottom', '2px solid #FFFFFF');
            $('.quick-reply-table-div3').css('border-bottom', '2px solid #44baf6');

        }
    }
    /*-----------------客户记录table切换------------------*/
    $scope.customerRecord1 = function (e) {
        if (e == 1) {
            $scope.chatRecord = true;
            $scope.chatRecordImg = false;
            $('.customer-record-table-div1').css('border-bottom', '2px solid #44baf6');
            $('.customer-record-table-div2').css('border-bottom', '2px solid #FFFFFF');
            $('.customer-record-time').css('display', 'block')
        } else {
            $('.customer-record-time1').css('display', 'none')
            if ($rootScope.type == 1) {
                $scope.chatRecord = false;
                $scope.chatRecordImg = true;
                $('.customer-record-table-div2').css('border-bottom', '2px solid #44baf6');
                $('.customer-record-table-div1').css('border-bottom', '2px solid #FFFFFF');
                var Imagerecord = new FormData()
                Imagerecord.append('chatroomid', $rootScope.Id)
                Imagerecord.append('socialaccountid', $rootScope.socialaccountId)
                $http({
                    method: 'POST',
                    url: $rootScope.link1 + "/chatrecord/getchatrecordChatroomImg",
                    data: Imagerecord,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    if (response.code == 200) {

                        $scope.Imgrecord = response.data.chatList
                        if ($scope.Imgrecord.length == 0) {
                            $('.chat-record-img').css('background', 'url("../images/noImg.png") center no-repeat')
                        } else {
                            $('.chat-record-img').css('background', 'none')
                        }
                    } else {
                    }
                });
            } else {
                $scope.chatRecord = false;
                $scope.chatRecordImg = true;
                $('.customer-record-table-div2').css('border-bottom', '2px solid #44baf6');
                $('.customer-record-table-div1').css('border-bottom', '2px solid #FFFFFF');
                var Imagerecord = new FormData()
                Imagerecord.append('contactid', $rootScope.Id)
                Imagerecord.append('socialaccountid', $rootScope.socialaccountId)
                $http({
                    method: 'POST',
                    url: $rootScope.link1 + "/chatrecord/getchatrecordImg",
                    data: Imagerecord,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    if (response.code == 200) {

                        $scope.Imgrecord = response.data.chatList
                        if ($scope.Imgrecord.length == 0) {
                            $('.chat-record-img').css('background', 'url("../images/noImg.png") center no-repeat')
                        } else {
                            $('.chat-record-img').css('background', 'none')
                        }
                    } else {
                    }
                });
            }

        }
    }
    /*----------编辑资料描述---------*/
    $scope.editWhitMe = function () {
        $('.whiteMeContent').attr("disabled", false).css('border', 'solid 1px #75aaff');
        $('.whiteMeContent').focus()
    }
    $('.whiteMeContent').blur(function () {
        if ($scope.chatGroupOrFriend == 1) {
            $('.whiteMeContent').attr("disabled", true).css({'background': '#fff', 'border': '1px solid #EFEFEF'});
            var id = $(".page1-div3-content-name-Group-First").attr('data')
            var newName = $(".page1-div3-content-name-Group-First").html()
            var groupid = $('.four-select').val()
            var description = $('.whiteMeContent').val()
            var Remarks = new FormData()
            Remarks.append('id', id)
            Remarks.append('groupid', groupid)
            Remarks.append('mynickname', newName)
            Remarks.append('chatroomDescription', description)
            $http({
                method: 'POST',
                url: $rootScope.link1 + "/contact/modifyChatroomById",
                data: Remarks,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                } else {
                }
            });
        } else {
            $('.whiteMeContent').attr("disabled", true).css({'background': '#fff', 'border': '1px solid #EFEFEF'});
            var id = $(".page1-div3-content-name").attr('data')
            var newName = $(".page1-div3-content-name").html()
            var phone = $(".page1-div3-content-name1").val()
            var groupid = $('.page1-div3-content-myself-select').val()
            var description = $('.whiteMeContent').val()
            var Remarks = new FormData()
            Remarks.append('id', id)
            Remarks.append('notename', newName)
            Remarks.append('phone', phone)
            Remarks.append('groupid', groupid)
            Remarks.append('description', description)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/modifyContactById",
                data: Remarks,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                } else {
                }
            });
        }

    })
    /*---------------修改群组分组---------------*/
    $('.four-select').change(function () {
        var id = $(".page1-div3-content-name-Group-First").attr('data')
        var newName = $(".page1-div3-content-name-Group-First").html()
        var groupid = $('.four-select').val()
        var description = $('.whiteMeContent').val()
        var Remarks = new FormData()
        Remarks.append('id', id)
        Remarks.append('groupid', groupid)
        Remarks.append('mynickname', newName)
        Remarks.append('chatroomDescription', description)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/contact/modifyChatroomById",
            data: Remarks,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {

            } else {
            }
        });
    })


    /*----------修改好友备注名称---------*/
    $scope.editName = function () {
        $(".page1-div3-content-name").attr("contenteditable", true).css('border', 'solid 1px #75aaff');
        $(".page1-div3-content-name").focus()
    }
    $(".page1-div3-content-name").blur(function () {
        $(".page1-div3-content-name").attr("contenteditable", false).css('border', ' 1px solid transparent')
        var id = $(".page1-div3-content-name").attr('data')
        var newName = $(".page1-div3-content-name").html()
        var phone = $(".page1-div3-content-name1").val()
        var groupid = $('.page1-div3-content-myself-select').val()
        var description = $('.whiteMeContent').val()
        var Remarks = new FormData()
        Remarks.append('id', id)
        Remarks.append('notename', newName)
        Remarks.append('phone', phone)
        Remarks.append('groupid', groupid)
        Remarks.append('description', description)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/modifyContactById",
            data: Remarks,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
            } else {
            }
        });
    })
    /*----------修改群组备注名称---------*/
    $scope.editName4 = function () {
        $(".page1-div3-content-name-Group-First").attr("contenteditable", true).css('border', 'solid 1px #75aaff');
        $(".page1-div3-content-name-Group-First").focus()
    }
    $(".page1-div3-content-name-Group-First").blur(function () {
        $(".page1-div3-content-name-Group-First").attr("contenteditable", false).css('border', ' 1px solid transparent')
        var id = $(".page1-div3-content-name-Group-First").attr('data')
        var newName = $(".page1-div3-content-name-Group-First").html()
        var groupid = $('.four-select').val()
        var description = $('.whiteMeContent').val()
        var Remarks = new FormData()
        Remarks.append('id', id)
        Remarks.append('mynickname', newName)
        Remarks.append('groupid', groupid)
        Remarks.append('chatroomDescription', description)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/modifyChatroomById",
            data: Remarks,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
            } else {
            }
        });
    })
    /*----------修改手机号---------*/
    $scope.editPhone = function () {
        $(".page1-div3-content-name1").attr("readonly", false).css('border', 'solid 1px #75aaff')
        $(".page1-div3-content-name1").focus()
    }
    $(".page1-div3-content-name1").keyup(function () {
        this.value = this.value.replace(/[^0-9-]+/, '');
    })
    $(".page1-div3-content-name1").blur(function () {
        $(this).attr("readonly", true).css('border', '1px solid transparent')
        var id = $(this).attr('data')
        var newPhone = $(this).val()
        var newName = $(".page1-div3-content-name").html()
        var groupid = $('.page1-div3-content-myself-select').val()
        var description = $('.whiteMeContent').val()
        var Remarks = new FormData()
        Remarks.append('id', id)
        Remarks.append('phone', newPhone)
        Remarks.append('notename', newName)
        Remarks.append('groupid', groupid)
        Remarks.append('description', description)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/modifyContactById",
            data: Remarks,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {

        });
    })
    /*-----------返回群组页面---------*/
    $scope.backGroupPage = function () {
        $scope.allCustomerList = false;
        $scope.Customerinformation = true;
        $scope.myself1 = true;
        $scope.myself = false;
        $('.all-customer-search-logo-input').val('')
        $('.all-customer-list-ul-li .add-people').css('cursor', 'pointer')
    }
    /*------点击查看所有群组所有成员------*/
    $scope.showcusstomList = function () {
        $scope.allCustomerList = true;
        $scope.Customerinformation = false;
        $scope.myself1 = false;
        $scope.myself = false;
        var a = new FormData()
        a.append('chatroomId', $rootScope.Id)
        a.append('id', $rootScope.socialaccountId)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/getChatroommenber",
            data: a,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            for (var i = 0; i < response.data.chatroommemberList.length; i++) {
                if (response.data.chatroommemberList[i].profilePhoto == '') {
                    response.data.chatroommemberList[i].profilePhoto = './images/Destroy.png';
                } else {
                    response.data.chatroommemberList[i].profilePhoto = $rootScope.imgSrc + response.data.chatroommemberList[i].profilePhoto
                }

            }
            $scope.Listofallgroupmembers = response.data.chatroommemberList
        });

    }
    /*-------------------------------切换微信号搜索部分---------------------------------------*/
    $('.page1-Maindiv2-myfriends-search-input').focus(function () {
        $('.newSelect').css({
            'width': '102px',
            'transition': 'width 1s',
            '-moz-transition': 'width 1s',
            '-webkit-transition': 'width 1s',
            '-o-transition': 'width 1s'
        })
        $('.page1-Maindiv2-myfriends-search').css({
            'width': '132px',
            'transition': 'width 1s',
            '-moz-transition': 'width 1s',
            '-webkit-transition': 'width 1s',
            '-o-transition': 'width 1s'
        })
        $(this).css({
            'width': '90px',
            'transition': 'width 1s',
            '-moz-transition': 'width 1s',
            '-webkit-transition': 'width 1s',
            '-o-transition': 'width 1s'
        })
        $('.clearCon').css('display', 'inline-block')

        if ($(this).attr('data_two') == '1') {
            if ($rootScope.Searchhistory_Chatting.length > 0) {
                $('.page1-Maindiv2-myfriends-search-con_history').css('display', 'block')
            } else {
                $('.page1-Maindiv2-myfriends-search-con_history').css('display', 'none')
            }
        } else {
            if ($rootScope.Searchhistory_Maillist.length > 0) {
                $('.tel_history_list').css('display', 'block')
            } else {
                $('.tel_history_list').css('display', 'none')
            }
        }


    })
    $('.page1-Maindiv2-myfriends-search-input').blur(function (e) {
        $('.newSelect').css({
            'width': '148px',
            'transition': 'width 1s',
            '-moz-transition': 'width 1s',
            '-webkit-transition': 'width 1s',
            '-o-transition': 'width 1s'
        })
        $('.page1-Maindiv2-myfriends-search').css({
            'width': '80px',
            'transition': 'width 1s',
            '-moz-transition': 'width 1s',
            '-webkit-transition': 'width 1s',
            '-o-transition': 'width 1s'
        })
        $(this).css({
            'width': '30px',
            'transition': 'width 1s',
            '-moz-transition': 'width 1s',
            '-webkit-transition': 'width 1s',
            '-o-transition': 'width 1s'
        })
        $('.clearCon').css('display', 'none')

        $('.page1-Maindiv2-myfriends-search-input').val('')


    })
    /*---------------------选择单条聊天界面搜索记录---------------*/
    $scope.ChoosethisChatrecord = function (e) {
        $('.page1-Maindiv2-myfriends-search-input').focus().val(e)
        var oo = new FormData()
        oo.append('accountId', $rootScope.myaccountId)
        oo.append('message', e)
        $http({
            method: 'POST',
            url: $rootScope.link + "/latelychat/getRecentContactAndChatroomById",
            data: oo,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {

            $('.page1-Maindiv2-myfriends-search-con_history').css('display', 'none')
            if (response.code == 200 && response.data.contactList.length > 0) {
                $scope.chatListSEarch = response.data.contactList
                $('.page1-Maindiv2-listInit').css('display', 'block')
            } else {
                $('.page1-Maindiv2-listInit').css('display', 'none')
            }
        });

    }
    /*---------------------选择单条通讯录界面搜索记录---------------*/
    $scope.ChoosethisChatrecord1 = function (e) {
        $('.page1-Maindiv2-myfriends-search-input').focus().val(e)
        var oo = new FormData()
        oo.append('accountId', $rootScope.myaccountId)
        oo.append('message', e)
        $http({
            method: 'POST',
            url: $rootScope.link + "/socialaccount/getContactByName",
            data: oo,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {

            $('.tel_history_list').css('display', 'none')
            if (response.code == 200 && response.data.contactList.length > 0) {
                $scope.DDorTop = response.data.contactList
                $('.Phone-book-dropdown-Search-Show').css('display', 'block')
            } else {
                $('.Phone-book-dropdown-Search-Show').css('display', 'none')
            }
        });

    }
    /*---------------------删除单条聊天界面搜索记录---------------*/
    $scope.delete_history = function (e, $event, w) {
        $event.stopPropagation()
        if (w == 1) {
            $rootScope.Searchhistory_Chatting.splice(e, 1)
        } else {
            $rootScope.Searchhistory_Maillist.splice(e, 1)
        }

    }
    /*---------------------历史消息的展现与隐藏-----------------*/
    var newlen = $('.newsList li').length;
    var lis = $('.newsList li:last').index();
    var maxlen = newlen - 5;
    if (maxlen % 10 > 5) {
        $('.ChatRecord').show();
        $('.newsList li:lt(' + maxlen + ')').hide();
    }


    /*-----------------鼠标点击确认发送消息----------------*/
    $scope.sengChatMsg = function () {
        var whatSay = $('.chat-bottom-write').html()
        if (whatSay == '') {
        } else {
            var newMsgHandle = whatSay.replace(/<div(([\s\S])*?)<\/div>/g, '')
            var str = ''
            /*原始的*/
            // var reg = /((https?|ftp):\/\/)?([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*\w)/ig;
            /*唱的*/
            // var reg =/(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
            /*改找的*/
            // var
            // if(whatSay.indexOf()){
            //
            // }
            var isTsd = false;
            var domainname = ['.com', '.net', '.org', '.com.cn', '.net.cn', '.org.cn', '.gov', 'www.', 'http', 'https'];
            for (var i = 0; i < domainname.length; i++) {
                if (whatSay.indexOf('' + domainname[i] + '') > 0) {
                    isTsd = true
                    break;
                }
            }
            if (isTsd == false) {
            } else {
                var reg = /((https?|ftp):\/\/)?([-A-Za-z0-9+&@#/%?=~_|!:,.;]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*\w)/ig;
                var whatSay = whatSay.replace(reg, function (a, b, c) {
                    return '<a class="open-other-url"  target="_blank"  href="' + a + '">' + a + '</a>';
                });
            }

            var reger = /<img.*?(?:>|\/>)/g;
            var srcReg = /\/([^\/]*?\.gif)/i;
            var arr1 = whatSay.match(reger)
            if (arr1 == null) {
            } else {
                var tt = []
                for (var i = 0; i < arr1.length; i++) {
                    var src = arr1[i].match(srcReg);
                    // var src = srcReg.exec(arr1[i])
                    if (src[1]) {
                        tt.push(src[1].substring(0, src[1].indexOf('.')))
                    }
                    for (var tt1 = [], i1 = 0; i1 < tt.length; i1++) {
                        for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                            if (tt[i1] == i2) {
                                tt1.push(emjoyAllGet[i2 - 1])
                            }
                        }
                    }
                }
                var result = whatSay.match(/<img.*?(?:>|\/>)/g);
                for (var i = 0; i < result.length; i++) {
                    whatSay = whatSay.replace(result[i], tt1[i])
                }
            }
            var oooo = whatSay.replace(/<\/div>/g, "");
            var oooo1 = oooo.replace(/<br>/g, "");
            var oooo2 = oooo1.replace(/<div>/g, "<br>");
            var timestamp = Date.parse(new Date())
            var timestamps = timestamp + $scope.MsgTimes
            var Update_time = $rootScope.getNowFormatDate()
            var keydownsend = new FormData()
            keydownsend.append('clienttype', 'web')
            keydownsend.append('accountname', $rootScope.localUserName)
            keydownsend.append('cid', $rootScope.chatId)
            keydownsend.append('msgid', timestamps)
            keydownsend.append('msgtype', 1)
            keydownsend.append('msgcontent', oooo2)
            keydownsend.append('file', '')
            if ($rootScope.type == 1) {
                keydownsend.append('group', 1)
            } else {
                keydownsend.append('group', 0)
            }
            keydownsend.append('filePath', '')
            str += "                    <li dataid=" + timestamps + ">\n" +
                "                        <div class=\"nesHead\">\n" +
                "                            <img src=" + $rootScope.chatHead + " alt=\"\">\n" +
                "                        </div>\n" +
                "                        <div class=\"news\">\n" +
                "                            <img class=\"jiao\" src=\"images/bluejiao.png\" alt=\"\">\n" +
                "                           " + $('.chat-bottom-write').html() + "\n" +
                "                        </div>\n" +
                "                    </li>"


            $http({
                method: 'POST',
                url: $rootScope.link1 + '/message/sendGcMessageInfo',
                data: keydownsend,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $('.newsList').append(str)
                    var DivscrollHeight = $('.RightCont')[0].scrollHeight
                    $('.RightCont').animate({scrollTop: DivscrollHeight}, 500);
                    $('.chat-bottom-write').html('')
                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $scope.chatId + '"]').html(newMsgHandle)
                    for (var t = 0; t < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; t++) {
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][t].cid == $rootScope.chatId) {
                            $rootScope.Chatwithfriends[$rootScope.lplplpl][t].newMessage = whatSay
                            $rootScope.Chatwithfriends[$rootScope.lplplpl][t].lastChatTime = Update_time
                        }
                    }
                    for (var r = 0; r < $rootScope.Chatwithfriends[$rootScope.socialaccountId].length; r++) {
                        if ($rootScope.Chatwithfriends[$rootScope.socialaccountId][r].cid == $rootScope.chatId) {
                            $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].newMessage = whatSay
                            $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].lastChatTime = Update_time

                        }
                    }
                    for (var r = 0; r < $rootScope.Chatwithfriends[-1].length; r++) {
                        if ($rootScope.Chatwithfriends[-1][r].cid == $rootScope.chatId) {
                            $rootScope.Chatwithfriends[-1][r].newMessage = whatSay
                            $rootScope.Chatwithfriends[-1][r].lastChatTime = Update_time
                        }
                    }
                    var msg = $('.newsList').html()
                    if ($rootScope.friendStorage.hasOwnProperty($scope.chatId)) {
                        $rootScope.friendStorage[$scope.chatId] += str;
                    } else {
                        $rootScope.friendStorage[$scope.chatId] = str;
                    }
                    $('.chat-bottom-write').html($rootScope.friendStorage)
                    /*-------------------选择好友后使其置顶--------------------*/
                    if ($rootScope.Topjudge == 1) {
                        var thisI = 0
                        for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                                thisI = i
                                var a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                            }
                        }
                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisI, 1)
                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, a)
                        $scope.$watch(function () {
                            $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                        })
                        setTimeout(function () {
                            $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                            var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                            if (ArrLength > 50) {
                                ArrLength = 50
                            } else {

                            }
                            for (var i = 0; i < ArrLength; i++) {
                                var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                                if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                                }
                                if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                    var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                    if (bothingRead > 0) {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                    } else {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                    }

                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }
                            }
                        }, 0)
                    }
                    else {
                        var thisTopNum = 0;
                        var thisTopI = 0;

                        for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                                thisTopNum++
                            }
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                                var a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                                thisTopI = i
                            }
                        }
                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisTopI, 1)
                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisTopNum, 0, a)
                        $scope.$watch(function () {
                            $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                        })
                        setTimeout(function () {
                            $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                            var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                            if (ArrLength > 50) {
                                ArrLength = 50
                            } else {

                            }
                            for (var i = 0; i < ArrLength; i++) {
                                var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                                if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                                }
                                if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                    var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                    if (bothingRead > 0) {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                    } else {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                    }

                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }
                            }
                        }, 0)
                    }
                }
                else if (response.code == 1000) {
                    $('.gray-help').css('display', 'block')
                    $('.gray-help-say').css('display', 'block')
                    $('.gray-help-say-con-text').html('暂不支持收发消息，请开启营销系统')
                } else if (response.code == 1001) {
                    $('.gray-help').css('display', 'block')
                    $('.gray-help-say').css('display', 'block')
                    $('.gray-help-say-con-text').html('图片大小暂时支持<=10M')
                } else if (response.code == 1002) {
                    $('.gray-help').css('display', 'block')
                    $('.gray-help-say').css('display', 'block')
                    $('.gray-help-say-con-text').html('文件大小暂时支持<=25M')
                }
            });

        }
    }
    /*-----------------图片上传--------------------*/
    $('.image-upfile').on('change', function () {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            var imgURL = objUrl
        }
        var timestamp = Date.parse(new Date())
        var Update_time = $rootScope.getNowFormatDate()
        var upfilesend = new FormData()
        var Update_times = timestamp + $scope.MsgTimes
        upfilesend.append('clienttype', 'web')
        upfilesend.append('accountname', $rootScope.localUserName)
        upfilesend.append('cid', $rootScope.chatId)
        upfilesend.append('msgid', Update_times)
        upfilesend.append('msgtype', 3)
        upfilesend.append('msgcontent', '')
        if ($rootScope.type == 1) {
            upfilesend.append('group', 1)
        } else {
            upfilesend.append('group', 0)
        }
        upfilesend.append('file', this.files[0])
        upfilesend.append('filePath', '')
        $http({
            method: 'POST',
            url: $rootScope.link1 + '/message/sendGcMessageInfo',
            data: upfilesend,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                var str = ''
                str += "                    <li dataid=" + Update_times + ">\n" +
                    "                        <div class=\"nesHead\">\n" +
                    "                            <img src=" + $rootScope.chatHead + " alt=\"\">\n" +
                    "                        </div>\n" +
                    "                        <div class=\"news bigPicture1\" data-imgSrc=" + objUrl + ">\n" +
                    "                            <img class=\"jiao \" src=\"images/bluejiao.png\" alt=\"\">\n" +
                    "                           <img class=\"up-Img-Add \" src=" + imgURL + " alt=\"\">\n" +
                    "                        </div>\n" +
                    "                    </li>"
                $('.newsList').append(str)
                $rootScope.friendStorage[$scope.chatId] += str;

                for (var t = 0; t < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; t++) {
                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][t].cid == $scope.chatId) {
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][t].newMessage = '[图片]'
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][t].lastChatTime = Update_time
                    }
                }
                for (var r = 0; r < $rootScope.Chatwithfriends[$rootScope.socialaccountId].length; r++) {
                    if ($rootScope.Chatwithfriends[$rootScope.socialaccountId][r].cid == $rootScope.chatId) {
                        $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].newMessage = '[图片]'
                        $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].lastChatTime = Update_time
                    }
                }
                for (var r = 0; r < $rootScope.Chatwithfriends[-1].length; r++) {
                    if ($rootScope.Chatwithfriends[-1][r].cid == $rootScope.chatId) {
                        $rootScope.Chatwithfriends[-1][r].newMessage = '[图片]'
                        $rootScope.Chatwithfriends[-1][r].lastChatTime = Update_time
                    }
                }
                var DivscrollHeight = $('.RightCont')[0].scrollHeight
                $('.RightCont').animate({scrollTop: DivscrollHeight}, 500);

                $('.image-upfile').val('')

                if ($rootScope.Topjudge == 1) {
                    var thisI = 0
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {

                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                            thisI = i
                            var a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                        }
                    }
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisI, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, a)
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }
                    }, 0)
                }
                else {
                    var thisTopNum = 0;
                    var thisTopI = 1;
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                            thisTopNum++
                        }
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                            var a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                            thisTopI = i
                        }
                    }
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisTopI, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisTopNum, 0, a)
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }
                    }, 0)
                }
            } else if (response.code == 1000) {
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('暂不支持收发消息，请开启营销系统')
            } else if (response.code == 1001) {
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('图片大小暂时支持<=10M')
            } else if (response.code == 1002) {
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('文件大小暂时支持<=25M')
            }
        });

        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }

    })
    /*-----------------文件上传--------------------*/
    $('.image-upfile1').on('change', function () {
        var objUrl = this.files[0];
        var FileTitle = objUrl.name

        var fileSize = this.files[0].size / 1024
        var fileSize1 = fileSize.toFixed(1)
        var fileSize2 = ''
        if (fileSize1.length >= 5) {
            fileSize2 = (fileSize1 / 1024).toFixed(1) + 'MB'
        } else {
            fileSize2 = fileSize1 + 'KB'
        }
        // var arr88 = mml.match(/\[[^\]]+\]/g)
        var timestamp = Date.parse(new Date())
        var Update_time = $rootScope.getNowFormatDate()
        var upfilesend = new FormData()
        var Update_times = timestamp + $scope.MsgTimes
        upfilesend.append('clienttype', 'web')
        upfilesend.append('accountname', $rootScope.localUserName)
        upfilesend.append('cid', $rootScope.chatId)
        upfilesend.append('msgid', Update_times)
        upfilesend.append('msgtype', 496)
        upfilesend.append('msgcontent', '')
        if ($rootScope.type == 1) {
            upfilesend.append('group', 1)
        } else {
            upfilesend.append('group', 0)
        }
        upfilesend.append('file', objUrl)
        upfilesend.append('filePath', '')
        $http({
            method: 'POST',
            url: $rootScope.link1 + '/message/sendGcMessageInfo',
            data: upfilesend,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                var str = ''
                str += "                    <li  dataid=" + Update_times + ">\n" +
                    "                        <div class=\"nesHead\">\n" +
                    "                            <img src=" + $rootScope.chatHead + " alt=\"\">\n" +
                    "                        </div>\n" +
                    '                            <div class="news">\n' +
                    '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                    '                                <div class="up-file-Add">\n' +
                    '                                    <dl>\n' +
                    '                                        <dt><img src="images/defult-File.png"></dt>\n' +
                    '                                        <dd>\n' +
                    '                                            <span class="defult-File-name">\n' +
                    '' + objUrl.name + '\n' +
                    '                                            </span>\n' +
                    '                                            <br>\n' +
                    '                                            <span class="defult-File-size">\n' +
                    '' + fileSize2 + '\n' +
                    '                                            </span>\n' +

                    '                                        </dd>\n' +
                    '                                <div class="up-file-Down" isnew="true" isme="true" file_id=' + Update_times + '  file_title=' + FileTitle + '  file_path="">下载\n' +
                    '                            </div>\n' +
                    '                                    </dl>\n' +
                    '                                </div>\n' +

                    '                            </div>\n' +
                    '                   </li>'
                $('.newsList').append(str)
                $rootScope.friendStorage[$scope.chatId] += str;

                for (var t = 0; t < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; t++) {
                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][t].cid == $scope.chatId) {
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][t].newMessage = '[文件]'
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][t].lastChatTime = Update_time
                    }
                }
                for (var r = 0; r < $rootScope.Chatwithfriends[$rootScope.socialaccountId].length; r++) {
                    if ($rootScope.Chatwithfriends[$rootScope.socialaccountId][r].cid == $rootScope.chatId) {
                        $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].newMessage = '[文件]'
                        $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].lastChatTime = Update_time
                    }
                }
                for (var r = 0; r < $rootScope.Chatwithfriends[-1].length; r++) {
                    if ($rootScope.Chatwithfriends[-1][r].cid == $rootScope.chatId) {
                        $rootScope.Chatwithfriends[-1][r].newMessage = '[文件]'
                        $rootScope.Chatwithfriends[-1][r].lastChatTime = Update_time
                    }
                }
                var DivscrollHeight = $('.RightCont')[0].scrollHeight
                $('.RightCont').animate({scrollTop: DivscrollHeight}, 500)
                $('.image-upfile1').val('')
                if ($rootScope.Topjudge == 1) {
                    var thisI = 0
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {

                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                            thisI = i
                            var a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]

                        }
                    }
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisI, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, a)
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }
                    }, 0)
                }
                else {

                    var thisTopNum = 0;
                    var thisTopI = 1;
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                            thisTopNum++
                        }
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                            thisTopI = i
                            var a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]

                        }
                    }
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisTopI, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisTopNum, 0, a)

                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }
                    }, 0)
                }
            } else if (response.code == 1000) {
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('暂不支持收发消息，请开启营销系统')
            } else if (response.code == 1001) {
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('图片大小暂时支持<=10M')
            } else if (response.code == 1002) {
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('文件大小暂时支持<=25M')
            }
        });


    })

    /*----------------------选择图片库图片发送------------------------*/
    $scope.Picturelibraryuploadingpictures = function (e) {
        var imgSrc_get = e
        var timestamp = Date.parse(new Date())
        var Update_time = $rootScope.getNowFormatDate()
        var upfilesend = new FormData()
        var timestamps = timestamp + $scope.MsgTimes
        upfilesend.append('clienttype', 'web')
        upfilesend.append('accountname', $rootScope.localUserName)
        upfilesend.append('cid', $rootScope.chatId)
        upfilesend.append('msgid', timestamps)
        upfilesend.append('msgtype', 3)
        upfilesend.append('msgcontent', '')
        if ($rootScope.type == 1) {
            upfilesend.append('group', 1)
        } else {
            upfilesend.append('group', 0)
        }
        upfilesend.append('file', '')
        upfilesend.append('filePath', e)
        $http({
            method: 'POST',
            url: $rootScope.link1 + '/message/sendGcMessageInfo',
            data: upfilesend,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                var str = ''
                str += "                    <li dataid=" + timestamps + ">\n" +
                    "                        <div class=\"nesHead\">\n" +
                    "                            <img src=" + $rootScope.chatHead + " alt=\"\">\n" +
                    "                        </div>\n" +
                    "                        <div class=\"news\ bigPicture1\" data-imgSrc=" + imgSrc_get + ">\n" +
                    "                            <img class=\"jiao\" src=\"images/bluejiao.png\" alt=\"\">\n" +
                    "                           <img class=\"up-Img-Add\" src=" + e + " alt=\"\">\n" +
                    "                        </div>\n" +
                    "                    </li>"
                $('.newsList').append(str)
                for (var t = 0; t < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; t++) {
                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][t].cid == $scope.chatId) {
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][t].newMessage = '[图片]'
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][t].lastChatTime = Update_time
                    }
                }
                for (var r = 0; r < $rootScope.Chatwithfriends[$rootScope.socialaccountId].length; r++) {
                    if ($rootScope.Chatwithfriends[$rootScope.socialaccountId][r].cid == $rootScope.chatId) {
                        $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].newMessage = '[图片]'
                        $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].lastChatTime = Update_time
                    }
                }
                for (var r = 0; r < $rootScope.Chatwithfriends[-1].length; r++) {
                    if ($rootScope.Chatwithfriends[-1][r].cid == $rootScope.chatId) {
                        $rootScope.Chatwithfriends[-1][r].newMessage = '[图片]'
                        $rootScope.Chatwithfriends[-1][r].lastChatTime = Update_time
                    }
                }
                var DivscrollHeight = $('.RightCont')[0].scrollHeight
                $('.RightCont').animate({scrollTop: DivscrollHeight}, 500);
                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $scope.chatId + '"]').html('[图片]')
                var msg = $('.newsList').html()
                var isTrue = false
                if ($rootScope.friendStorage.hasOwnProperty($scope.chatId)) {
                    $rootScope.friendStorage[$scope.chatId] += str;
                } else {
                    $rootScope.friendStorage[$scope.chatId] = str;
                }

                if ($rootScope.Topjudge == 1) {
                    var thisI = 0
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {

                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                            var a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                            thisI = i
                        }
                    }
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisI, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, a)
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }
                    }, 0)
                }
                else {
                    var thisTopNum = 0;
                    var thisTopI = 1;
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                            thisTopNum++
                        }
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                            var a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                            thisTopI = i
                        }
                    }
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisTopI, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisTopNum, 0, a)
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }
                    }, 0)
                }
            } else if (response.code == 1000) {
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('暂不支持收发消息，请开启营销系统')
            } else if (response.code == 1001) {
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('图片大小暂时支持<=10M')
            } else if (response.code == 1002) {
                $('.gray-help').css('display', 'block')
                $('.gray-help-say').css('display', 'block')
                $('.gray-help-say-con-text').html('文件大小暂时支持<=25M')
            }
        });
    }
    /*----------------------选择图文链接库图文链接发送------------------------*/
    $scope.defultLinkSend = function (e, r, t, y, u) {
        var timestamp = Date.parse(new Date())
        var Update_time = $rootScope.getNowFormatDate()
        var upfilesend = new FormData()
        var link_title = r
        var link_con = t
        var link_con1 = './images/link.png'
        var link_icon = y
        var link_url = u
        if (link_url.indexOf('http') == -1 && link_url.indexOf('https') == -1) {
            link_url = 'http://' + link_url
        } else {

        }
        var timestamps = timestamp + $scope.MsgTimes
        upfilesend.append('clienttype', 'web')
        upfilesend.append('accountname', $rootScope.localUserName)
        upfilesend.append('cid', $rootScope.chatId)
        upfilesend.append('msgid', timestamps)
        upfilesend.append('msgtype', 495)
        upfilesend.append('imgandlinkid', e)
        if ($rootScope.type == 1) {
            upfilesend.append('group', 1)
        } else {
            upfilesend.append('group', 0)
        }
        $http({
            method: 'POST',
            url: $rootScope.link1 + '/message/sendGcMessageImgAndLink',
            data: upfilesend,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                var str = ''
                str += '                        <li dataid=' + timestamps + '>\n' +
                    '                            <div class="nesHead">\n' +
                    '                                <img src=' + $rootScope.chatHead + ' alt="">\n' +
                    '                            </div>\n' +
                    '                            <a href=' + link_url + ' target="_blank">\n' +
                    '                            <div class="news news-link">\n' +
                    '                                <img class="jiao" src="images/bluejiao.png" alt="">\n' +
                    '                                <div class="defult-Link-Add">\n' +
                    '                                    <span class="defult-Link-title">' + link_title + '</span>\n' +
                    '                                    <dl>\n' +
                    '                                        <dd>\n' +
                    '                                            <span class="up-file-con">\n' +
                    '                                        ' + link_con + '    </span>\n' +
                    '                                        </dd>\n' +
                    '                                        <dt><img class="up-file-icon" src=' + link_icon + '></dt>\n' +
                    '\n' +
                    '                                    </dl>\n' +
                    '                                </div>\n' +
                    '                            </div>\n' +
                    '                            </a>\n' +
                    '                        </li>'
                $('.newsList').append(str)
                for (var t = 0; t < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; t++) {
                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][t].cid == $scope.chatId) {
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][t].newMessage = '[图文链接]'
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][t].lastChatTime = Update_time
                    }
                }
                for (var r = 0; r < $rootScope.Chatwithfriends[$rootScope.socialaccountId].length; r++) {
                    if ($rootScope.Chatwithfriends[$rootScope.socialaccountId][r].cid == $rootScope.chatId) {
                        $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].newMessage = '[图文链接]'
                        $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].lastChatTime = Update_time
                    }
                }
                for (var r = 0; r < $rootScope.Chatwithfriends[-1].length; r++) {
                    if ($rootScope.Chatwithfriends[-1][r].cid == $rootScope.chatId) {
                        $rootScope.Chatwithfriends[-1][r].newMessage = '[图文链接]'
                        $rootScope.Chatwithfriends[-1][r].lastChatTime = Update_time
                    }
                }
                var DivscrollHeight = $('.RightCont')[0].scrollHeight
                $('.RightCont').animate({scrollTop: DivscrollHeight}, 500);
                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $scope.chatId + '"]').html('[图文链接]')
                var msg = $('.newsList').html()
                var isTrue = false
                if ($rootScope.friendStorage.hasOwnProperty($scope.chatId)) {
                    $rootScope.friendStorage[$scope.chatId] += str;
                } else {
                    $rootScope.friendStorage[$scope.chatId] = str;
                }

                if ($rootScope.Topjudge == 1) {
                    var a = ''
                    var aa1 = 0
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {

                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                            a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                            aa1 = i

                        }

                    }
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(aa1, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, a)
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }
                    }, 0)
                }
                else {
                    var a = ''
                    var aa1 = 0
                    var aa2 = 0
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                            a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                            aa2 = i
                        }
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                            aa1++
                        }
                    }
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(aa2, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(aa1, 0, a)
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }
                    }, 0)
                }
            } else {
            }
        });
    }

    /*-----------------回车发送消息----------------------*/
    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    $(".chat-bottom-write").keydown(function ($event) {
        var keycode = window.event ? $event.keyCode : $event.which;
        var evt = $event || window.event;
        var inputTxt = $(this);
        var Update_time = $rootScope.getNowFormatDate()
        // 回车-->发送消息
        if (keycode == 13 && !(evt.ctrlKey)) {
            var whatSay = $(this).html()
            if (whatSay == '') {
            } else {
                var newMsgHandle = whatSay.replace(/<div(([\s\S])*?)<\/div>/g, '')
                var str = ''

                var timestamp = Date.parse(new Date())
                var timestamps = timestamp + $scope.MsgTimes
                var isTsd = false;
                var domainname = ['.com', '.net', '.org', '.com.cn', '.net.cn', '.org.cn', '.gov', 'www.', 'http', 'https'];
                for (var i = 0; i < domainname.length; i++) {
                    if (whatSay.indexOf('' + domainname[i] + '') > 0) {
                        isTsd = true
                        break;
                    }
                }
                if (isTsd == false) {
                } else {
                    var reg = /((https?|ftp):\/\/)?([-A-Za-z0-9+&@#/%?=~_|!:,.;]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*\w)/ig;
                    var whatSay = whatSay.replace(reg, function (a, b, c) {
                        return '<a class="open-other-url"  target="_blank"  href="' + a + '">' + a + '</a>';
                    });
                }
                str += "                    <li dataid=" + timestamps + ">\n" +
                    "                        <div class=\"nesHead\">\n" +
                    "                            <img src=" + $rootScope.chatHead + " alt=\"\">\n" +
                    "                        </div>\n" +
                    "                        <div class=\"news\">\n" +
                    "                            <img class=\"jiao\" src=\"images/bluejiao.png\" alt=\"\">\n" +
                    "                           " + whatSay + "\n" +
                    "                        </div>\n" +
                    "                    </li>"


                var reger = /<img.*?(?:>|\/>)/g;
                var srcReg = /\/([^\/]*?\.gif)/i;
                var arr1 = whatSay.match(reger)
                if (arr1 == null) {
                } else {
                    var tt = []
                    for (var i = 0; i < arr1.length; i++) {
                        var src = arr1[i].match(srcReg);
                        // var src = srcReg.exec(arr1[i])
                        if (src[1]) {
                            tt.push(src[1].substring(0, src[1].indexOf('.')))
                        }
                        for (var tt1 = [], i1 = 0; i1 < tt.length; i1++) {
                            for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                                if (tt[i1] == i2) {
                                    tt1.push(emjoyAllGet[i2 - 1])
                                }
                            }
                        }
                    }
                    var result = whatSay.match(/<img.*?(?:>|\/>)/g);
                    for (var i = 0; i < result.length; i++) {
                        whatSay = whatSay.replace(result[i], tt1[i])
                    }
                }
                var oooo = whatSay.replace(/<\/div>/g, "");
                var oooo1 = oooo.replace(/<br>/g, "");
                var oooo2 = oooo1.replace(/<div>/g, "<br>");

                var keydownsend = new FormData()
                keydownsend.append('clienttype', 'web')
                keydownsend.append('accountname', $rootScope.localUserName)
                keydownsend.append('cid', $rootScope.chatId)
                keydownsend.append('msgid', timestamps)
                keydownsend.append('msgtype', 1)
                keydownsend.append('msgcontent', oooo2)
                if ($rootScope.type == 1) {
                    keydownsend.append('group', 1)
                } else {
                    keydownsend.append('group', 0)
                }
                keydownsend.append('file', '')
                keydownsend.append('filePath', '')
                $http({
                    method: 'POST',
                    url: $rootScope.link1 + '/message/sendGcMessageInfo',
                    data: keydownsend,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    if (response.code == 200) {
                        $('.newsList').append(str)
                        for (var t = 0; t < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; t++) {
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][t].cid == $scope.chatId) {
                                $rootScope.Chatwithfriends[$rootScope.lplplpl][t].newMessage = whatSay
                                $rootScope.Chatwithfriends[$rootScope.lplplpl][t].lastChatTime = Update_time
                            }
                        }
                        for (var r = 0; r < $rootScope.Chatwithfriends[$rootScope.socialaccountId].length; r++) {
                            if ($rootScope.Chatwithfriends[$rootScope.socialaccountId][r].cid == $rootScope.chatId) {
                                $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].newMessage = whatSay
                                $rootScope.Chatwithfriends[$rootScope.socialaccountId][r].lastChatTime = Update_time
                            }
                        }
                        for (var r = 0; r < $rootScope.Chatwithfriends[-1].length; r++) {
                            if ($rootScope.Chatwithfriends[-1][r].cid == $rootScope.chatId) {
                                $rootScope.Chatwithfriends[-1][r].newMessage = whatSay
                                $rootScope.Chatwithfriends[-1][r].lastChatTime = Update_time
                            }
                        }
                        var DivscrollHeight = $('.RightCont')[0].scrollHeight
                        $('.RightCont').animate({scrollTop: DivscrollHeight}, 500);
                        $('.chat-bottom-write').html('')

                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $scope.chatId + '"]').html(newMsgHandle)
                        var msg = $('.newsList').html()
                        if ($rootScope.friendStorage.hasOwnProperty($scope.chatId)) {
                            $rootScope.friendStorage[$scope.chatId] += str;
                        } else {
                            $rootScope.friendStorage[$scope.chatId] = str;
                        }
                        if ($rootScope.Topjudge == 1) {
                            var thisI = 0
                            for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {

                                if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                                    var a = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                                    thisI = i
                                }
                            }

                            $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(thisI, 1)
                            $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, a)
                            $scope.$watch(function () {
                                $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                            })
                            setTimeout(function () {
                                $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                                var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                                if (ArrLength > 50) {
                                    ArrLength = 50
                                } else {

                                }

                                for (var i = 0; i < ArrLength; i++) {
                                    var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                                    } else {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                                    }
                                    if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                        var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                        if (bothingRead > 0) {
                                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                        } else {
                                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                        }

                                    } else {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                    }
                                }
                            }, 0)
                        }
                        else {
                            var topa = 0;
                            var topNum = 1;
                            var thisMe = ''
                            for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                                if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                                    topa++
                                }
                                if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.chatId) {
                                    thisMe = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                                    topNum = i
                                }
                            }
                            $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(topNum, 1)
                            $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(topa, 0, thisMe)
                            $scope.$watch(function () {
                                $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                            })
                            setTimeout(function () {
                                $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + $rootScope.chatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                                var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                                if (ArrLength > 50) {
                                    ArrLength = 50
                                } else {

                                }
                                for (var i = 0; i < ArrLength; i++) {
                                    var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                                    if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                                    } else {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html('')
                                    }
                                    if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                        var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                        if (bothingRead > 0) {
                                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                        } else {
                                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                        }

                                    } else {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                    }
                                }
                            }, 0)
                        }

                        $event.preventDefault();
                        return false;
                    } else if (response.code == 1000) {
                        $('.gray-help').css('display', 'block')
                        $('.gray-help-say').css('display', 'block')
                        $('.gray-help-say-con-text').html('暂不支持收发消息，请开启营销系统')
                    } else if (response.code == 1001) {
                        $('.gray-help').css('display', 'block')
                        $('.gray-help-say').css('display', 'block')
                        $('.gray-help-say-con-text').html('图片大小暂时支持<=10M')
                    } else if (response.code == 1002) {
                        $('.gray-help').css('display', 'block')
                        $('.gray-help-say').css('display', 'block')
                        $('.gray-help-say-con-text').html('文件大小暂时支持<=25M')
                    }

                });

            }

        }
        // ctrl+回车-->换行
        if (evt.ctrlKey && keycode == 13) {
            inputTxt.html(inputTxt.html() + '<div><br></div>');
            placeCaretAtEnd(inputTxt.get(0));
            return false;
        }
    });


    /*------------置顶取消置顶好友--------------*/
    $scope.chatFriendToTop = function (e, q, w, r) {
        var aa = new FormData()
        if (q == -1) {
            aa.append('id', $rootScope.Id)
        } else {
            aa.append('id', q)
        }
        if (e == -1) {
            aa.append('topnumber', $rootScope.Topjudge)
        } else {
            aa.append('topnumber', e)
        }
        if (w == -1) {
            aa.append('type', $rootScope.type)
        } else {
            aa.append('type', w)
        }
        var TopjudgeIs = ''
        var TopchatId = ''
        // aa.append('topnumber', $rootScope.Topjudge)
        // aa.append('type', $rootScope.type)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/latelychat/updateContactAndChatroomByTop",
            data: aa,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                var firstIndex = 0;
                var firstTop = 0;
                var firstThis = '';
                var firstIndex1 = 0;
                var firstTop1 = 0;
                var firstThis1 = '';
                var firstIndex2 = 0;
                var firstTop2 = 0;
                var firstThis2 = '';
                var firstIshave = false;
                var firstIshave1 = false;
                var ThisSolId = ''
                if (e == -1) {
                    TopjudgeIs = $rootScope.Topjudge
                } else {
                    TopjudgeIs = e
                }
                if (r == -1) {
                    TopchatId = $rootScope.chatId
                } else {
                    TopchatId = r
                }
                /*-----------当前的为非置顶---------*/
                if (TopjudgeIs == 0) {
                    if (TopchatId === $rootScope.chatId) {
                        $('.chat-top-totop').css('background', 'url("./images/Canceltop.png") center no-repeat')
                        $('.chat-top-totop').attr('data', 1)
                        $rootScope.Topjudge = 1
                    } else {

                    }

                    for (var i = 0; i < $rootScope.Chatwithfriends[-1].length; i++) {
                        if ($rootScope.Chatwithfriends[-1][i].cid == TopchatId) {
                            firstIndex = i;
                            firstThis = $rootScope.Chatwithfriends[-1][i]
                            firstIshave = true
                        }
                        if ($rootScope.Chatwithfriends[-1][i].topNumber == 1) {
                            firstTop++
                        }
                    }
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == TopchatId) {
                            firstIndex1 = i;
                            firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                            ThisSolId = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].socialaccountId
                            firstIshave1 = true
                        }
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                            firstTop1++;
                        }
                    }
                    for (var i = 0; i < $rootScope.Chatwithfriends[ThisSolId].length; i++) {
                        if ($rootScope.Chatwithfriends[ThisSolId][i].cid == TopchatId) {
                            firstIndex2 = i;
                            firstThis2 = $rootScope.Chatwithfriends[ThisSolId][i]
                        }
                        if ($rootScope.Chatwithfriends[ThisSolId][i].topNumber == 1) {
                            firstTop2++;
                        }
                    }
                    if (firstIshave == true) {
                        if ($rootScope.lplplpl == -1) {
                            if (firstIshave1 == false) {
                                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                                $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                                $rootScope.Chatwithfriends[-1][0].topNumber = 1
                            } else {
                                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                                $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                                $rootScope.Chatwithfriends[-1][0].topNumber = 1
                                $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                                $rootScope.Chatwithfriends[ThisSolId].splice(0, 0, firstThis2)
                                $rootScope.Chatwithfriends[ThisSolId][0].topNumber = 1
                            }
                        } else {
                            $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                            $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                            $rootScope.Chatwithfriends[-1][0].topNumber = 1
                            $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                            $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis1)
                            $rootScope.Chatwithfriends[$rootScope.lplplpl][0].topNumber = 1
                        }
                    } else {
                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 1)
                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis1)
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][0].topNumber = 1
                    }
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })

                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + TopchatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }

                    }, 150)
                    $rootScope.TotopNum = $rootScope.TotopNum + 1


                }
                else {
                    if (TopchatId === $rootScope.chatId) {
                        $('.chat-top-totop').css('background', 'url("./images/toTop.png") center no-repeat')
                        $('.chat-top-totop').attr('data', 0)
                        $rootScope.Topjudge = 0
                    } else {

                    }

                    for (var i = 0; i < $rootScope.Chatwithfriends[-1].length; i++) {
                        if ($rootScope.Chatwithfriends[-1][i].cid == TopchatId) {
                            firstIndex = i;
                            firstThis = $rootScope.Chatwithfriends[-1][i]
                            $rootScope.Chatwithfriends[-1][i].topNumber = 0
                            firstIshave = true
                        }
                        if ($rootScope.Chatwithfriends[-1][i].topNumber == 1) {
                            firstTop++
                        }
                    }
                    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == TopchatId) {
                            $rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber = 0
                            firstIndex1 = i;
                            firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                            ThisSolId = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].socialaccountId
                            firstIshave1 = true
                        }
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                            firstTop1++;
                        }
                    }
                    for (var i = 0; i < $rootScope.Chatwithfriends[ThisSolId].length; i++) {
                        if ($rootScope.Chatwithfriends[ThisSolId][i].cid == TopchatId) {
                            firstIndex2 = i;
                            firstThis2 = $rootScope.Chatwithfriends[ThisSolId][i]
                        }
                        if ($rootScope.Chatwithfriends[ThisSolId][i].topNumber == 1) {
                            firstTop2++;
                        }
                    }
                    /*---------------当前窗口结构变化---------------*/

                    /*--------------判断所有里面是否拥有-------------*/
                    if (firstIshave == true) {
                        if ($rootScope.lplplpl == -1) {
                            if (firstIshave1 == false) {
                                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                                $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                                $rootScope.Chatwithfriends[-1][firstTop].topNumber = 0
                            } else {
                                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                                $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                                $rootScope.Chatwithfriends[-1][firstTop].topNumber = 0
                                $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                                $rootScope.Chatwithfriends[ThisSolId].splice(firstTop2, 0, firstThis2)
                                $rootScope.Chatwithfriends[ThisSolId][firstTop2].topNumber = 0

                            }

                        } else {
                            $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                            $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                            $rootScope.Chatwithfriends[-1][firstTop].topNumber = 0
                            $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                            $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, firstThis1)
                            $rootScope.Chatwithfriends[$rootScope.lplplpl][firstTop1].topNumber = 0
                        }

                    } else {
                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex1, 1)
                        $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, firstThis1)
                        $rootScope.Chatwithfriends[$rootScope.lplplpl][firstTop1].topNumber = 0
                    }
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    $rootScope.TotopNum = $rootScope.TotopNum - 1


                    setTimeout(function () {
                        $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + TopchatId + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                        if (ArrLength > 50) {
                            ArrLength = 50
                        } else {

                        }
                        for (var i = 0; i < ArrLength; i++) {
                            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                            }
                            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                if (bothingRead > 0) {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }

                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }
                        }

                    }, 50)
                }
            }
        })
    }


    /*----------------------选择好友进行聊天-----------------------*/
    $rootScope.groupmemberHeader = ''
    var Preventmultipleclicks = ''
    $scope.gotoChat = function NotificationsChat(cid, name, photo, id, socId, type, topNumber, $event, issearch, isIndex) {

        if ($($event.target).attr('data1_nickname') == 'search_list') {
            if ($rootScope.Searchhistory_Chatting.length >= 5) {
                $rootScope.Searchhistory_Chatting = $rootScope.Searchhistory_Chatting.slice(0, 4)
                if ($scope.serach_Keyword == '' || $scope.serach_Keyword == undefined) {

                } else {
                    var isTrue = true
                    for (var i = 0; i < $rootScope.Searchhistory_Chatting.length; i++) {
                        if (i == $scope.serach_Keyword) {
                            isTrue = false
                            break;
                        }
                    }
                    if (isTrue == true) {
                        $rootScope.Searchhistory_Chatting.unshift($scope.serach_Keyword)
                    } else {

                    }

                }

            } else if ($rootScope.Searchhistory_Chatting.length == 0) {
                $rootScope.Searchhistory_Chatting.push($scope.serach_Keyword)
            } else {
                var isTrue = true
                for (var i = 0; i < $rootScope.Searchhistory_Chatting.length; i++) {
                    if ($rootScope.Searchhistory_Chatting[i] == $scope.serach_Keyword) {
                        isTrue = false
                        break;
                    }
                }
                if (isTrue == true) {
                    $rootScope.Searchhistory_Chatting.unshift($scope.serach_Keyword)
                } else {

                }
            }
        }
        else {

        }
        $('.personaldata-data-con-myself-1-input').attr('disabled', 'disabled').css('border', '1px solid transparent')
        $('.personaldata-data-con-myself-3-select').css('display', 'none')
        $('.personaldata-data-con-myself-3-span').css('display', 'inline-block')
        $('.personaldata-data-con-myself-5-textarea-whiteMeContent').attr("disabled", 'disabled').css('border', '1px solid  transparent')
        $('.edit-personaldata').html('修改资料').attr('data', 0)
        $('.personaldata').css('display', 'none')
        $('.chat-bottom-write').html('')
        var panduanOnlinn = false
        $('.all-customer-search-logo-input').val('')
        for (var i = 0; i < $rootScope.Judgingthesendingmessage.length; i++) {
            if (socId == $rootScope.Judgingthesendingmessage[i]) {
                panduanOnlinn = true
                break;
            } else {
            }
        }
        $('.Newmessagereminding').css('display', 'none')
        $rootScope.unreadMessages = 0
        if (panduanOnlinn == true) {
            $('.Chat-layer').css('display', 'block')
            $('.Chat-layer-say').css('display', 'block')
        }
        else {
            $('.Chat-layer').css('display', 'none')
            $('.Chat-layer-say').css('display', 'none')
        }
        $('.page1-div3-title-span1').css({
            'color': 'rgb(68, 186, 246)',
            'border-bottom': '2px solid rgb(68, 186, 246)'
        })
        $('.page1-div3-title-span2').css({'color': '#444444', 'border': 'none'})
        $('.page1-div3-title-span3').css({'color': '#444444', 'border': 'none'})

        if ($($event.target).attr('distinguish') == 0) {
            $($event.target).addClass('click-background-color').siblings().removeClass('click-background-color')
        } else {
            $($event.target).parent().addClass('click-background-color').siblings().removeClass('click-background-color')
        }
        $('.page1-Maindiv2-listInit').css('display', 'none')

        if (topNumber == 1) {
            $('.chat-top-totop').css('background', 'url("./images/Canceltop.png") center no-repeat')
            $('.chat-top-totop').attr('data', 1)
        }
        else {
            $('.chat-top-totop').css('background', 'url("./images/toTop.png") center no-repeat')
            $('.chat-top-totop').attr('data', 0)
        }

        $scope.page1Maindiv4Init = false
        /*-------展示群组相关资料-----*/
        $scope.Customerinformation = true
        $scope.quickReply = false
        $scope.customerRecord = false
        $scope.page1Maindiv4Init = false
        /*-------展示群组相关资料-----*/
        $scope.Customerinformation = true
        $scope.quickReply = false
        $scope.customerRecord = false
        /*---------------判断是群组还是个人------------------*/
        if (type == 1) {
            $scope.chatGroupOrFriend = 1
            $scope.myself1 = true
            $scope.allCustomerList = false
            $scope.myself = false
            $scope.groupdata = new FormData()
            $scope.groupdata.append('socialaccountId', socId)
            $scope.groupdata.append('chatroomId', id)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/getChatroomById",
                data: $scope.groupdata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                var tages1 = response.data.tags;
                $scope.FriendTags = tages1.split(',')
                $scope.Mygroupdata = response.data
                $scope.GroupId = response.data.groupId
                $('.whiteMeContent').val(response.data.chatroomDescription)
                /*-----------------获取标签库信息----------------*/
                $('.chzn-results li').css('display', 'block')
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/groups/getGroups",
                    data: $scope.MyFrienddata,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    $scope.InformationGrouping = response.data.groupList
                    setTimeout(function () {
                        if ($scope.GroupId == 0) {
                            $(".four-select").val(0)
                        } else {
                            $(".four-select").val($scope.GroupId )
                        }
                    }, 10)
                });
            });
        }
        /*-------展示好友相关资料-----*/
        else {
            $scope.chatGroupOrFriend = 0
            $scope.allCustomerList = false
            $scope.myself = true
            $scope.myself1 = false
            $scope.MyFrienddata = new FormData()
            $scope.MyFrienddata.append('socialaccountId', socId)
            $scope.MyFrienddata.append('contactId', id)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/getContactById",
                data: $scope.MyFrienddata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                $scope.MyFrienddata1 = response.data
                $('.change-name').html($rootScope.GetridoftheNbsp(response.data.noteName))
                $rootScope.NameRecord = response.data.noteName
                $('.change-phone').val(response.data.phone)
                $('.whiteMeContent').val(response.data.description)
                var tages1 = response.data.tags;
                $scope.FriendTags = tages1.split(',')
                $scope.GroupId = response.data.groupId
                /*-----------------获取标签库信息----------------*/
                $('.chzn-results li').css('display', 'block')
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/groups/getGroups",
                    data: $scope.MyFrienddata,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    $scope.InformationGrouping = response.data.groupList
                    setTimeout(function () {
                        if ($scope.GroupId == 0) {
                            $(".page1-div3-content-myself-select").val(0)
                        } else {
                            $(".page1-div3-content-myself-select").val($scope.GroupId )
                        }
                    }, 10)
                });
            });
        }
        $scope.chatName = name
        $rootScope.chatId = cid;
        $rootScope.chatHead = $rootScope.WeChatownerHeader[socId]
        $rootScope.Id = id;
        $rootScope.socialaccountId = socId;
        $rootScope.type = type;
        $rootScope.Topjudge = topNumber
        $rootScope.ChatPhoto = photo

        if (issearch == 0) {
            var GetThisData = $scope.chatListSEarch[isIndex]
            var firstIndex = 0;
            var firstTop = 0;
            var firstThis = '';
            var firstIndex1 = 0;
            var firstTop1 = 0;
            var firstThis1 = '';
            var firstIndex2 = 0;
            var firstTop2 = 0;
            var firstThis2 = '';
            var firstIshave = false;
            var firstIshave1 = false;
            var ThisSolId = ''
            // var ThisSolTopNumber = 0
            // var ThisSolTopNumber1 = 0
            for (var i = 0; i < $rootScope.Chatwithfriends[-1].length; i++) {
                if ($rootScope.Chatwithfriends[-1][i].cid == cid) {
                    firstIndex = i;
                    firstThis = $rootScope.Chatwithfriends[-1][i]
                    firstIshave = true

                }
                if ($rootScope.Chatwithfriends[-1][i].topNumber == 1) {
                    firstTop++
                }
            }
            for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
                if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == cid) {
                    firstIndex1 = i;
                    firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                    ThisSolId = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].socialaccountId
                    firstIshave1 = true
                    firstThis2 = $rootScope.Chatwithfriends[-1][i]
                }
                if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                    firstTop1++;
                }
            }
            if (firstIshave == false && firstIshave1 == false) {
                if (topNumber == 1) {
                    $rootScope.Chatwithfriends[-1].splice(0, 0, GetThisData)
                    $rootScope.Chatwithfriends[socId].splice(0, 0, GetThisData)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, GetThisData)
                    $rootScope.Chatwithfriends[socId].splice(firstTop1, 0, GetThisData)
                }
            } else if (firstIshave == true && firstIshave1 == true) {
                if (topNumber == 1) {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(0, 0, GetThisData)
                    $rootScope.Chatwithfriends[socId].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[socId].splice(0, 0, GetThisData)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, GetThisData)
                    $rootScope.Chatwithfriends[socId].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[socId].splice(firstTop1, 0, GetThisData)
                }


            } else if (firstIshave == true && firstIshave1 == false && $rootScope.lplplpl != -1) {
                if (topNumber == 1) {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, GetThisData)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, GetThisData)
                }

            } else if (firstIshave == true && firstIshave1 == false && $rootScope.lplplpl == -1) {
                if (topNumber == 1) {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                    $rootScope.Chatwithfriends[socId].splice(0, 0, GetThisData)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                    $rootScope.Chatwithfriends[socId].splice(firstTop1, 0, GetThisData)
                }

            } else if (firstIshave == false && firstIshave1 == true && $rootScope.lplplpl == -1) {
                if (topNumber == 1) {
                    $rootScope.Chatwithfriends[-1].splice(0, 0, GetThisData)
                    $rootScope.Chatwithfriends[socId].splice(0, 0, GetThisData)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, GetThisData)
                    $rootScope.Chatwithfriends[socId].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[socId].splice(firstTop2, 0, GetThisData)
                }

            } else if (firstIshave == false && firstIshave1 == true && $rootScope.lplplpl != -1) {
                if (topNumber == 1) {
                    $rootScope.Chatwithfriends[-1].splice(0, 0, GetThisData)
                    $rootScope.Chatwithfriends[socId].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[socId].splice(0, 0, GetThisData)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, GetThisData)
                    $rootScope.Chatwithfriends[socId].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[socId].splice(firstTop2, 0, GetThisData)
                }

            }
            // console.log(cid)
            // console.log($rootScope.Chatwithfriends[$rootScope.lplplpl])
            $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
            setTimeout(function () {
                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + cid + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')

            }, 100)

        }
        $scope.page1Maindiv4Init = false
        $('.page1-Maindiv3').attr('data', cid).css('background', 'none')
        $('.newsList').html('')
        $('.chat-top-title').html(name)
        $scope.ChatModule = true;
        $('.forPhone-content').find('span[class^="blue"]').html($rootScope.WeChatowner[$rootScope.socialaccountId])
        var mml = $rootScope.friendStorage[$rootScope.chatId]
        if (mml == undefined || mml == null) {

        } else {
            var arr88 = mml.match(/\[[^\]]+\]/g);
            if (arr88 == null || arr88 == 0 || arr88 == undefined) {
                var mm2 = mml.replace(/<br>/g, "")
                mml = mm2.replace(/undefined/g, "")
            } else {
                var tt1 = []
                var tt2 = []
                for (var i1 = 0; i1 < arr88.length; i1++) {
                    for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                        if (arr88[i1] == emjoyAllGet[i2]) {
                            tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                            tt2.push(emjoyAllGet[i2])
                        }
                    }
                }
                for (var i8 = 0; i8 < tt1.length; i8++) {
                    mml = mml.replace(tt2[i8], tt1[i8])
                }
                var mm2 = mml.replace(/<br>/g, "")
                mml = mm2.replace(/undefined/g, "")
            }
        }
        $('.newsList').html(mml)
        setTimeout(function () {
            if ($rootScope.friendStorage[cid] == '' || $rootScope.friendStorage[cid] == undefined) {
                $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
            } else {
                if ($rootScope.friendStorage[cid].indexOf("initNone") >= 0) {
                    $('.ChatRecord').html('-------------------- 查看更多消息 --------------------').css('cursor', 'pointer')
                } else {
                    $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
                }
            }
            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + cid + '"]').next().css('display', 'none')
            if ($rootScope.friendStorage[cid] == '' || $rootScope.friendStorage[cid] == undefined) {
            } else {
                var pp = $rootScope.friendStorage[cid].replace(/Unread/g, 'Read')
                $rootScope.friendStorage[cid] = pp;
            }
            var DivscrollHeight = $('.RightCont')[0].scrollHeight
            $('.RightCont').animate({scrollTop: DivscrollHeight}, 400)
        }, 50)
    }

    /*----------------------加载历史聊天记录--------------------*/
    $scope.LoadHistoryRecord = function ($event) {
        if ($($event.target).html() == '更多消息请查看聊天记录') {

        } else {
            $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
            $('.newsList li').removeClass('initNone')
            $('.RightCont').scrollTop($('.RightCont')[0].scrollHeight - $rootScope.RightContscrollHeight);
            var pp = $rootScope.friendStorage[$rootScope.chatId].replace(/initNone/g, '')
            $rootScope.friendStorage[$rootScope.chatId] = pp;
        }
    }
    $rootScope.RightContscrollHeight = 0
    $rootScope.RightContscrollTop = 0
    $rootScope.RightContoffsetHeight = 0

    /*--------------------------查看正在聊天窗口的新消息---------------------------*/
    $scope.LookNewMsg = function () {
        var DivscrollHeight = $('.RightCont')[0].scrollHeight
        $('.RightCont').animate({scrollTop: DivscrollHeight}, 500)
        $('.Newmessagereminding').css('display', 'none')
    }
    $scope.NotLookNewMsg = function () {
        $('.Newmessagereminding').css('display', 'none')
    }
    /*----------------------监听滚动条事件----------------------*/
    $(document).ready(function () {
        // c.scrollTop = c.scrollHeight - c.offsetHeight;
        $('.RightCont').scroll(function () {
            $rootScope.RightContscrollHeight = $(this)[0].scrollHeight
            $rootScope.RightContoffsetHeight = $(this)[0].offsetHeight
            $rootScope.RightContscrollTop = $(this)[0].scrollTop
            if ($rootScope.RightContscrollHeight - $rootScope.RightContoffsetHeight == $rootScope.RightContscrollTop) {
                $rootScope.unreadMessages = 0
                $('.Newmessagereminding').css('display', 'none')
            }
        });
    })
/*----------------------初始化未存在后添加的好友选择聊天------------------------*/
var Preventmultipleclicks1 = '';
/*------------------------关闭当前聊天窗口---------------------------*/
$scope.CloseChatModule = function () {
    $rootScope.unreadMessages = 0
    $('.Newmessagereminding').css('display', 'none')
    $('.Chat-layer').css('display', 'none')
    $('.Chat-layer-say').css('display', 'none')
    $scope.page1Maindiv4Init = true
    $scope.ChatModule = false;
    $('.chat-bottom-write').html('')
    $('.page1-Maindiv3').css('background', 'url("./images/chatBg.png") center no-repeat')

    $('.personaldata-data-con-myself-1-input').attr('disabled', 'disabled').css('border', '1px solid transparent')
    $('.personaldata-data-con-myself-3-select').css('display', 'none')
    $('.personaldata-data-con-myself-3-span').css('display', 'inline-block')
    $('.personaldata-data-con-myself-5-textarea-whiteMeContent').attr("disabled", 'disabled').css('border', '1px solid  transparent')
    $('.edit-personaldata').html('修改资料').attr('data', 0)
    $('.personaldata').css('display', 'none')
}
/*---------------点击更改快捷短语分组箭头状态-------------*/
$(document).on('click', '.toggler', function () {
    var state = $(this).parent().attr("class");
    if (state == 'ng-scope tree-closed') {
        $(this).find('.tree-icon').css({
            'background': 'url("./images/closesay.png")center no-repeat',
            "transition": "0.15s"
        })
    } else {
        $(this).find('.tree-icon').css({
            'background': 'url("./images/opensay.png")center no-repeat',
            "transition": "0.15s"
        })

    }

})
/*----------------快捷回复图片删除显示隐藏----------------*/
$(document).on('mouseenter', '.picture-library-img', function () {
    $(this).find('.picture-library-img-del-bag').css('display', 'block')
    // $(this).find('.send-picture-library').css('display', 'block')
})
$(document).on('mouseleave ', '.picture-library-img', function () {
    $(this).find('.picture-library-img-del-bag').css('display', 'none')
    // $(this).find('.send-picture-library').css('display', 'none')
})
/*----------------快捷回复图片删除----------------*/
$scope.delPicturelibraryImg = function (e, $event) {
    $event.stopPropagation();
    var delImg = new FormData()
    delImg.append('id', e)
    $http({
        method: 'POST',
        url: $rootScope.link + "/picture/delPicture",
        data: delImg,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            var Picturelibrary = new FormData()
            $http({
                method: 'POST',
                url: $rootScope.link + "/picture/getAllPicture",
                data: Picturelibrary,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $scope.Picturelibrary = response.data.pictureList;
                } else {
                }
            });
        } else {
        }
    });
}
$timeout(function () {
    for (var i = 0; i < $rootScope.Chatwithfriends[-1].length; i++) {
        var VNcid = $rootScope.Chatwithfriends[-1][i].cid
        var VNNew = $rootScope.Chatwithfriends[-1][i].newMessage
        if ($rootScope.Chatwithfriends[-1][i].newMessage != '') {
            var mml = $rootScope.Chatwithfriends[-1][i].newMessage
            if (mml == undefined || mml == null || mml == '') {

            } else {
                var arr88 = mml.match(/\[[^\]]+\]/g);
                if (arr88 == null || arr88 == 0 || arr88 == undefined) {
                    $rootScope.Chatwithfriends[-1][i].newMessage = $rootScope.Chatwithfriends[-1][i].newMessage.replace(/<br>/g, "")
                } else {
                    var tt1 = []
                    var tt2 = []
                    for (var i1 = 0; i1 < arr88.length; i1++) {
                        for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                            if (arr88[i1] == emjoyAllGet[i2]) {
                                tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                                tt2.push(emjoyAllGet[i2])
                            }
                        }
                    }
                    for (var i8 = 0; i8 < tt1.length; i8++) {
                        mml = mml.replace(tt2[i8], tt1[i8])
                    }
                    $rootScope.Chatwithfriends[-1][i].newMessage = mml.replace(/<br>/g, "")
                }
            }

            $('.page1-Maindiv2 .wechatList .moveFriendList').find('span[data^="' + VNcid + '"]').html($rootScope.Chatwithfriends[-1][i].newMessage)
        } else {
            $('.page1-Maindiv2 .wechatList .moveFriendList').find('span[data^="' + VNcid + '"]').html('')
        }
    }
}, 800)
/*----------------快捷回复图片名字编辑----------------*/
$(document).on('click', '.picture-library-img-name', function () {
    $(this).attr('contenteditable', true).css('border', '1px solid #d8d8d8')
})
$(document).on('blur', '.picture-library-img-name', function () {
    $(this).attr('contenteditable', false).css('border', '1px solid transparent')
})
/*------------------快捷短语上传-------------------*/
$scope.upquickReplyPhrase = function () {
    // SetupClick(4)
}
/*------------------快捷短语下载-------------------*/
$scope.downquickReplyPhrase = function () {
    $http.get($rootScope.link + '/script/downfile').success(function (data) {
        if (data.code == 200) {

        }
    })
}
/*-----------------图片库图片上传-----------------*/
$scope.upquickReplylibrary = function () {

}
/*-------------对相关好友群组进行分组--------------*/
$('.page1-div3-content-myself-select').change(function () {
    var groupid = $(this).val();
    var id = $(".page1-div3-content-name1").attr('data')
    var newName = $(".page1-div3-content-name").html()
    var phone = $(".page1-div3-content-name1").val()
    var description = $('.whiteMeContent').val()
    var Remarks = new FormData()
    Remarks.append('id', id)
    Remarks.append('groupid', groupid)
    Remarks.append('notename', newName)
    Remarks.append('phone', phone)
    Remarks.append('description', description)
    $http({
        method: 'POST',
        url: $rootScope.link1 + "/contact/modifyContactById",
        data: Remarks,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {

        } else {
        }
    });
})
/*---------------聊天记录得到首页数据---------------*/
$scope.Getthehomepage = function () {
    if ($rootScope.type == 1) {
        var page = new FormData()
        page.append('chatroomId', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('pagesize', 15)
        page.append('pageindex', 1)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getChatroomChatrecordPage",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.Chatrecordpagenumber = response.data.pageindex
                $scope.AllChatrecordpagenumber = response.data.pagesumcount

                for (var i = 0; i < response.data.chatList.length; i++) {
                    if (response.data.chatList[i].msgStatus == 3) {
                        response.data.chatList[i].contactNickname = '我'
                        response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                    } else if (response.data.chatList[i].msgStatus == 10 && response.data.chatList[i].profilephoto == '') {
                        response.data.chatList[i].profilephoto = './images/Destroy.png'
                    }
                }
                $scope.Textrecord = response.data.chatList
                $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                if ($scope.Textrecord.length == 0) {
                    $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                } else {
                    $('.chat-record').css('background', 'none')
                }
            } else {
            }
        });
    } else {
        var page = new FormData()
        page.append('contactid', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('pagesize', 15)
        page.append('pageindex', 1)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getchatrecordpage",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.Chatrecordpagenumber = response.data.pageindex
                $scope.AllChatrecordpagenumber = response.data.pagesumcount
                for (var i = 0; i < response.data.chatList.length; i++) {
                    if (response.data.chatList[i].msgStatus == 0) {
                        response.data.chatList[i].contactNickname = '我'
                        response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                    } else if (response.data.chatList[i].msgStatus == 1) {

                        response.data.chatList[i].profilephoto = $rootScope.ChatPhoto
                    }
                }
                $scope.Textrecord = response.data.chatList
                $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                if ($scope.Textrecord.length == 0) {
                    $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                } else {
                    $('.chat-record').css('background', 'none')
                }
            } else {
            }
        });
    }

}
/*---------------聊天记录得到上一页数据---------------*/
$scope.Getthelastpage = function () {
    if ($scope.Chatrecordpagenumber == 1) {
        $scope.Chatrecordpagenumber = 1
    } else {
        $scope.Chatrecordpagenumber = $scope.Chatrecordpagenumber - 1
    }
    if ($rootScope.type == 1) {
        var page = new FormData()
        page.append('chatroomId', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('pagesize', 15)
        page.append('pageindex', $scope.Chatrecordpagenumber)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getChatroomChatrecordPage",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.Chatrecordpagenumber = response.data.pageindex
                $scope.AllChatrecordpagenumber = response.data.pagesumcount
                for (var i = 0; i < response.data.chatList.length; i++) {
                    if (response.data.chatList[i].msgStatus == 3) {
                        response.data.chatList[i].contactNickname = '我'
                        response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                    } else if (response.data.chatList[i].msgStatus == 10 && response.data.chatList[i].profilephoto == '') {
                        response.data.chatList[i].profilephoto = './images/Destroy.png'
                    }
                }
                $scope.Textrecord = response.data.chatList
                $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                if ($scope.Textrecord.length == 0) {
                    $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                } else {
                    $('.chat-record').css('background', 'none')
                }
            } else {
            }
        });
    } else {
        var page = new FormData()
        page.append('contactid', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('pagesize', 15)
        page.append('pageindex', $scope.Chatrecordpagenumber)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getchatrecordpage",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.Chatrecordpagenumber = response.data.pageindex
                $scope.AllChatrecordpagenumber = response.data.pagesumcount
                for (var i = 0; i < response.data.chatList.length; i++) {
                    if (response.data.chatList[i].msgStatus == 0) {
                        response.data.chatList[i].contactNickname = '我'
                        response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                    } else if (response.data.chatList[i].msgStatus == 1) {

                        response.data.chatList[i].profilephoto = $rootScope.ChatPhoto
                    }
                }
                $scope.Textrecord = response.data.chatList
                $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                if ($scope.Textrecord.length == 0) {
                    $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                } else {
                    $('.chat-record').css('background', 'none')
                }
            } else {
            }
        });
    }
}
/*---------------聊天记录得到下一页数据---------------*/
$scope.Getthenextpage = function () {
    if ($scope.Chatrecordpagenumber == $scope.AllChatrecordpagenumber) {
        $scope.Chatrecordpagenumber = $scope.AllChatrecordpagenumber
    } else {
        $scope.Chatrecordpagenumber = $scope.Chatrecordpagenumber + 1
    }
    if ($rootScope.type == 1) {
        var page = new FormData()
        page.append('chatroomId', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('pagesize', 15)
        page.append('pageindex', $scope.Chatrecordpagenumber)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getChatroomChatrecordPage",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.Chatrecordpagenumber = response.data.pageindex
                $scope.AllChatrecordpagenumber = response.data.pagesumcount
                for (var i = 0; i < response.data.chatList.length; i++) {
                    if (response.data.chatList[i].msgStatus == 3) {
                        response.data.chatList[i].contactNickname = '我'
                        response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                    } else if (response.data.chatList[i].msgStatus == 10 && response.data.chatList[i].profilephoto == '') {
                        response.data.chatList[i].profilephoto = './images/Destroy.png'
                    }
                }
                $scope.Textrecord = response.data.chatList
                $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                if ($scope.Textrecord.length == 0) {
                    $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                } else {
                    $('.chat-record').css('background', 'none')
                }
            } else {
            }
        });
    } else {
        var page = new FormData()
        page.append('contactid', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('pagesize', 15)
        page.append('pageindex', $scope.Chatrecordpagenumber)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getchatrecordpage",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.Chatrecordpagenumber = response.data.pageindex
                $scope.AllChatrecordpagenumber = response.data.pagesumcount
                for (var i = 0; i < response.data.chatList.length; i++) {
                    if (response.data.chatList[i].msgStatus == 0) {
                        response.data.chatList[i].contactNickname = '我'
                        response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                    } else if (response.data.chatList[i].msgStatus == 1) {

                        response.data.chatList[i].profilephoto = $rootScope.ChatPhoto
                    }
                }
                $scope.Textrecord = response.data.chatList
                $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                if ($scope.Textrecord.length == 0) {
                    $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                } else {
                    $('.chat-record').css('background', 'none')
                }
            } else {
            }
        });
    }

}
/*---------------聊天记录得到尾页数据---------------*/
$scope.Getthebackpage = function () {
    if ($rootScope.type == 1) {
        var page = new FormData()
        page.append('chatroomId', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('pagesize', 15)
        page.append('pageindex', $scope.AllChatrecordpagenumber)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getChatroomChatrecordPage",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.Chatrecordpagenumber = response.data.pageindex
                $scope.AllChatrecordpagenumber = response.data.pagesumcount


                for (var i = 0; i < response.data.chatList.length; i++) {
                    if (response.data.chatList[i].msgStatus == 3) {
                        response.data.chatList[i].contactNickname = '我'
                        response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                    } else if (response.data.chatList[i].msgStatus == 10 && response.data.chatList[i].profilephoto == '') {
                        response.data.chatList[i].profilephoto = './images/Destroy.png'
                    }
                }
                $scope.Textrecord = response.data.chatList
                $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                if ($scope.Textrecord.length == 0) {
                    $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                } else {
                    $('.chat-record').css('background', 'none')
                }
            } else {
            }
        });
    } else {
        var page = new FormData()
        page.append('contactid', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('pagesize', 15)
        page.append('pageindex', $scope.AllChatrecordpagenumber)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getchatrecordpage",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.Chatrecordpagenumber = response.data.pageindex
                $scope.AllChatrecordpagenumber = response.data.pagesumcount
                for (var i = 0; i < response.data.chatList.length; i++) {
                    if (response.data.chatList[i].msgStatus == 0) {
                        response.data.chatList[i].contactNickname = '我'
                        response.data.chatList[i].profilephoto = $rootScope.WeChatownerHeader[response.data.chatList[i].socialaccountId]
                    } else if (response.data.chatList[i].msgStatus == 1) {

                        response.data.chatList[i].profilephoto = $rootScope.ChatPhoto
                    }
                }
                $scope.Textrecord = response.data.chatList
                $scope.TextrecordTime = response.data.thedate.slice(0, 10)
                if ($scope.Textrecord.length == 0) {
                    $('.chat-record').css('background', 'url("../images/noChat.png") center no-repeat')
                } else {
                    $('.chat-record').css('background', 'none')
                }
            } else {
            }
        });
    }

}
/*----------------关键字搜索聊天记录---------------*/
$scope.searchTextfocus = function (event) {
    if ($rootScope.type == 1) {
        var searchcon = $(event.target).prev().val()
        var page = new FormData()
        page.append('chatroomtid', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('keyword', searchcon)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getChatrecordChatroom",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.chatRecord = false;
                $('.customer-record-table-div').css('display', 'none');
                $('.customer-record-time').css('display', 'none');
                $scope.SearchkeywordsHistory = true;
                if (response.msg == 'success') {
                    $scope.returnCon = response.data.chatList
                    if (response.data.thedate.length > 10) {
                        $scope.returnConTime = response.data.thedate.slice(0, 10)
                    } else {
                        $scope.returnConTime = ''
                    }
                    $scope.returnConNum = response.data.chatListcount
                } else {
                    $scope.returnCon = []
                    $scope.returnConNum = 0
                    $scope.returnConTime = ''
                }

            } else {
            }
        });
    } else {
        var searchcon = $(event.target).prev().val()
        var page = new FormData()
        page.append('contactid', $rootScope.Id)
        page.append('socialaccountid', $rootScope.socialaccountId)
        page.append('keyword', searchcon)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/chatrecord/getChatrecord",
            data: page,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $scope.chatRecord = false;
                $('.customer-record-table-div').css('display', 'none');
                $('.customer-record-time').css('display', 'none');
                $scope.SearchkeywordsHistory = true;
                if (response.msg == 'success') {
                    $scope.returnCon = response.data.chatList
                    if (response.data.thedate.length > 10) {
                        $scope.returnConTime = response.data.thedate.slice(0, 10)
                    } else {
                        $scope.returnConTime = ''
                    }
                    $scope.returnConNum = response.data.chatListcount
                } else {
                    $scope.returnCon = []
                    $scope.returnConNum = 0
                    $scope.returnConTime = ''
                }

            } else {
            }
        });
    }

}
/*---------------聊天记录搜索结果返回---------------*/
$scope.hidesHistory = function () {
    $scope.chatRecord = true;
    $('.customer-record-table-div').css('display', 'flex');
    $('.customer-record-time').css('display', 'block');
    $scope.SearchkeywordsHistory = false;
    $('.chat-record-search').val('')
}
/*-----------------删除好友对应标签-----------------*/
$scope.delOneTag = function (e) {
    if (e == '' || e == undefined || e == null) {

    } else {
        if ($scope.chatGroupOrFriend == 1) {
            var id = $(".page1-div3-content-name-Group-First").attr('data')
            var socialaccountId = $(".page1-div3-content-name-Group-First").attr('data1')
            var delTag = new FormData()
            delTag.append('id', id)
            delTag.append('socialaccountid', socialaccountId)
            delTag.append('tags', e)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/delChatroomTags",
                data: delTag,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    var oo = new FormData()
                    oo.append('socialaccountId', socialaccountId)
                    oo.append('chatroomId', id)
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/contact/getChatroomById",
                        data: oo,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        var tages1 = response.data.tags;
                        $scope.FriendTags = tages1.split(',')
                    });
                }
            });
        } else {

            var delTag = new FormData()
            delTag.append('id', $rootScope.Id)
            delTag.append('socialaccountid', $rootScope.socialaccountId)
            delTag.append('tags', e)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/delContactTags",
                data: delTag,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    var oo = new FormData()
                    oo.append('socialaccountId', $rootScope.socialaccountId)
                    oo.append('contactId', $rootScope.Id)
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/contact/getContactById",
                        data: oo,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        var tages1 = response.data.tags;
                        $scope.FriendTags = tages1.split(',')
                    });
                }
            });
        }

    }

}
/*----------------------------------accountId  本地账号-------------------------------------------*/
/*-------个人资料部分开关-------*/
$scope.Addressbook = false
$scope.TbsearchCon = false
/*-------通讯录部分搜索-------*/
$scope.TbsearchCon = false
/*--------分组搜索结果--------*/
$scope.dropdownSearchShow = false
/*-----------群资料----------*/
$scope.Addressbookdata = false
/*-----------好友资料----------*/
$scope.Addressbookfriends = false
/*----------------------------通讯录部分----------------------------*/

/*---------------相关微信号搜索--------------*/
$('.page1-Maindiv2-myfriends-search-input1').bind('input propertychange', function () {
    var searchCon = $(this).val()
    var oo = new FormData()
    oo.append('accountId', $rootScope.myaccountId)
    oo.append('message', searchCon)
    $http({
        method: 'POST',
        url: $rootScope.link + "/socialaccount/getSocialaccountByName",
        data: oo,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200 && response.data.socialaccountList.length > 0) {
            for (var i = 0; i < response.data.socialaccountList.length; i++) {

                response.data.socialaccountList[i].profilePhoto = $rootScope.imgSrc + response.data.socialaccountList[i].profilePhoto
            }
            $scope.tponeListSEarch = response.data.socialaccountList
            $('.pho-bo-list-search1').css('display', 'block')
        } else {
            $('.pho-bo-list-search1').css('display', 'none')
        }
    });
})
// $scope.loseBlur = function (event) {
//     $scope.TbsearchCon = false
//     $(event.target).val('')
// }
//
// function unique5(array) {
//     var r = [];
//     for (var i = 0, l = array.length; i < l; i++) {
//         for (var j = i + 1; j < l; j++)
//             if (array[i] === array[j]) j = ++i;
//         r.push(array[i]);
//     }
//     return r;
// }

/*---------------选择相关微信号展示好友--------------*/
$scope.getphoneBookList = function (e, q, w, event) {
    $('.page1-Maindiv7-forPhone .klk').html(w)
    var arrAl = []
    arrAl.push(e)
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
        $scope.Addressbook = false
        $rootScope.MaillistInitId = e
        $rootScope.MaillistInitCId = q
        $('.page1-Maindiv7').css('background', 'url("./images/phonegroup.png") center no-repeat')
        $rootScope.searchReturnList = [
            [{name: '群'}, []], [{name: 'A'}, []], [{name: 'B'}, []], [{name: 'C'}, []], [{name: 'D'}, []], [{name: 'E'}, []], [{name: 'F'}, []], [{name: 'G'}, []], [{name: 'H'}, []], [{name: 'I'}, []], [{name: 'J'}, []], [{name: 'K'}, []], [{name: 'L'}, []], [{name: 'M'}, []], [{name: 'N'}, []], [{name: 'O'}, []], [{name: 'P'}, []], [{name: 'Q'}, []], [{name: 'R'}, []], [{name: 'S'}, []], [{name: 'T'}, []], [{name: 'U'}, []], [{name: 'V'}, []], [{name: 'W'}, []], [{name: 'X'}, []], [{name: 'Y'}, []], [{name: 'Z'}, []], [{name: '#'}, []]
        ]
        for (var i = 0; i < response.data.contactList.length; i++) {
            for (var i1 = 0; i1 < $rootScope.searchReturnList.length; i1++) {
                if (response.data.contactList[i].fristWord == $rootScope.searchReturnList[i1][0].name) {
                    if (response.data.contactList[i].profilePhoto == '' || response.data.contactList[i].profilePhoto == null || response.data.contactList[i].profilePhoto == undefined) {
                        response.data.contactList[i].profilePhoto = './images/Destroy.png'
                    } else {
                        response.data.contactList[i].profilePhoto = $rootScope.imgSrc + response.data.contactList[i].profilePhoto
                    }

                    $rootScope.searchReturnList[i1][1].push(response.data.contactList[i])
                }
            }
        }
        var a = $('.moveFriendList-phone');
        for (var i = 0; i < a.length; i++) {
            if ($('.moveFriendList-phone').eq(i).attr('data') == e) {
                a.eq(i).css('background-color', 'rgba(68, 186, 246, 0.05)').siblings().css('background-color', '#FFFFFF')
            }
        }
    });
}
$scope.searchListOneTo = '微信'
/*-----------------通讯录选择分组查询对应好友或群组------------------*/
var forme = '请选择'
$('.page1-Maindiv6').on('click', '.newSelect', function () {
    $scope.searchListOneTo = '分组'
    if ($('.page1-Maindiv6-myfriends-chose-wechat .newSelectTitle').find('span').html() != forme) {
        $rootScope.watchThis = $('.page1-Maindiv6-myfriends-chose-wechat .newSelectTitle').find('span').html()
        var a = $('.select1')
        var b = ''
        for (var i = 0; i < a.length; i++) {
            if ($('.select1').eq(i).html() == $rootScope.watchThis) {
                b = $('.select1').eq(i).attr('data-value')
            }
        }
        if (b == -1) {
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
                $rootScope.searchReturnList = [
                    [{name: '群'}, []], [{name: 'A'}, []], [{name: 'B'}, []], [{name: 'C'}, []], [{name: 'D'}, []], [{name: 'E'}, []], [{name: 'F'}, []], [{name: 'G'}, []], [{name: 'H'}, []], [{name: 'I'}, []], [{name: 'J'}, []], [{name: 'K'}, []], [{name: 'L'}, []], [{name: 'M'}, []], [{name: 'N'}, []], [{name: 'O'}, []], [{name: 'P'}, []], [{name: 'Q'}, []], [{name: 'R'}, []], [{name: 'S'}, []], [{name: 'T'}, []], [{name: 'U'}, []], [{name: 'V'}, []], [{name: 'W'}, []], [{name: 'X'}, []], [{name: 'Y'}, []], [{name: 'Z'}, []], [{name: '#'}, []]
                ]
                for (var i = 0; i < response.data.contactList.length; i++) {
                    for (var i1 = 0; i1 < $rootScope.searchReturnList.length; i1++) {
                        if (response.data.contactList[i].fristWord == $rootScope.searchReturnList[i1][0].name) {
                            if (response.data.contactList[i].profilePhoto == '' || response.data.contactList[i].profilePhoto == null || response.data.contactList[i].profilePhoto == undefined) {
                                response.data.contactList[i].profilePhoto = './images/Destroy.png'
                            } else {
                                response.data.contactList[i].profilePhoto = $rootScope.imgSrc + response.data.contactList[i].profilePhoto
                            }
                            $rootScope.searchReturnList[i1][1].push(response.data.contactList[i])
                        }
                    }
                }
                var a = $('.moveFriendList-phone');
                for (var i = 0; i < a.length; i++) {
                    if ($('.moveFriendList-phone').eq(i).attr('data') == $rootScope.MaillistInitId) {
                        a.eq(i).css('background-color', 'rgba(68, 186, 246, 0.05)').siblings().css('background-color', '#FFFFFF')
                    }
                }
            });
        } else {
            var oo = new FormData()
            oo.append('groupId', b)
            oo.append('id', $rootScope.MaillistInitaccountId)
            $http({
                method: 'POST',
                url: $rootScope.link + "/socialaccount/getChatroomAndContactById",
                data: oo,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                $scope.DDorTop = [];
                if (response.data.contactList.length == 0 || response.data.contactList == []) {
                    $('.Phone-book-dropdown-Search-Show').css('display', 'none')
                } else {
                    for (var i = 0; i < response.data.contactList.length; i++) {
                        if (response.data.contactList[i].profilePhoto == '' || response.data.contactList[i].profilePhoto == null || response.data.contactList[i].profilePhoto == undefined) {
                            response.data.contactList[i].profilePhoto = './images/Destroy.png'
                        } else {
                            response.data.contactList[i].profilePhoto = $rootScope.imgSrc + response.data.contactList[i].profilePhoto
                        }
                    }
                    $('.Phone-book-dropdown-Search-Show').css('display', 'block')
                    $scope.DDorTop = response.data.contactList
                }

            });
        }
    } else {
        $('.Phone-book-dropdown-Search-Show').css('display', 'none')
        $scope.DDorTop = [];
    }
})
/*-----------------选择模糊搜索后的好友查看资料----------------*/
$('.csi2-list-1').on('click', 'li', function () {
    if ($(this).attr('data1_nickname') == 'tel_search_list') {
        if ($rootScope.Searchhistory_Maillist.length >= 5) {
            $rootScope.Searchhistory_Maillist = $rootScope.Searchhistory_Maillist.slice(0, 4)
            if ($scope.serach_Keyword == '' || $scope.serach_Keyword == undefined) {

            } else {
                var isTrue = true
                for (var i = 0; i < $rootScope.Searchhistory_Maillist.length; i++) {
                    if (i == $scope.serach_Keyword) {
                        isTrue = false
                        break;
                    }
                }
                if (isTrue == true) {
                    $rootScope.Searchhistory_Maillist.unshift($scope.serach_Keyword)
                } else {

                }

            }

        } else if ($rootScope.Searchhistory_Maillist.length == 0) {
            $rootScope.Searchhistory_Maillist.push($scope.serach_Keyword)
        } else {
            var isTrue = true
            for (var i = 0; i < $rootScope.Searchhistory_Maillist.length; i++) {
                // console.log(i)
                // console.log($rootScope.Searchhistory_Maillist[i])
                if ($rootScope.Searchhistory_Maillist[i] == $scope.serach_Keyword) {
                    isTrue = false
                    break;
                }
            }
            if (isTrue == true) {
                $rootScope.Searchhistory_Maillist.unshift($scope.serach_Keyword)
            } else {

            }
        }
    } else {

    }
    $('.Phone-book-dropdown-Search-Show').css('display', 'none');
    $('.page1-Maindiv7').css('background', 'none')
    $rootScope.telephoneFirstWrold = $(this).attr('data1')
    if ($(this).attr('data1') == '群') {
        $scope.Identifygroupsandfriends = 1
        $scope.Addressbookfriends = false
        $scope.Addressbookdata = true
    } else {
        $scope.Identifygroupsandfriends = 0
        $scope.Addressbookfriends = true
        $scope.Addressbookdata = false
    }
    $scope.Addressbook = true
    $rootScope.impPhoId = $(this).attr('data2');
    $rootScope.impPhoCid = $(this).attr('data18');
    $rootScope.impPhosocialaccountId = $(this).attr('data3');
    $rootScope.impPhonickName = $(this).attr('data4');
    $rootScope.impPhocontactNumber = $(this).attr('data5');
    $rootScope.impPhonoteName = $(this).attr('data6');
    $('.imponoteName').html($rootScope.impPhonoteName)
    $rootScope.impPhoprofilePhoto = $(this).attr('data7')
    $rootScope.impPhophone = $(this).attr('data8')
    $rootScope.impPhoTalias = $(this).attr('data20')
    $('.imponotePhoneNumber').val($(this).attr('data8'))
    var tagss = []
    if ($(this).attr('data9').indexOf(',') > 0) {
        tagss = $(this).attr('data9').split(',')
    } else {
        if ($(this).attr('data9').length > 0) {
            tagss.push($(this).attr('data9'))
        } else {
            tagss = []
        }
    }
    $rootScope.impPhotags = tagss;
    $rootScope.impPhosex = $(this).attr('data10')
    $rootScope.impPhoprovince = $(this).attr('data11')
    $rootScope.impPhocity = $(this).attr('data12')
    $rootScope.impPhodescription = $(this).attr('data13')
    $rootScope.impPhochatroomAnnouncement = $(this).attr('data14')
    $rootScope.impPhomyNickName = $(this).attr('data15')
    $rootScope.impPhomemberCount = $(this).attr('data16')
    $rootScope.impPhogroupId = $(this).attr('data17')
    $rootScope.impPhoTopNumber = $(this).attr('data19')
    $('.page1-Maindiv7-whiteMeContent').val($rootScope.impPhodescription)
    /*获取所有分组*/
    $http({
        method: 'POST',
        url: $rootScope.link + "/groups/getGroups",
        data: $scope.MyFrienddata,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        $scope.impPhoAllGroups = response.data.groupList
        var pp = 0;
        for (var i = 0; i < $scope.impPhoAllGroups.length; i++) {
            if ($scope.impPhoAllGroups[i].id == $rootScope.impPhogroupId) {
                pp = i
            }
        }
        setTimeout(function () {
            $('.second-select').find("option[value=" + $rootScope.impPhogroupId + "]").attr("selected", true)
        }, 50)
    });
})
$('.select-first-1,.page1-Maindiv6-con,.page1-Maindiv,.page1-Maindiv7,.page1-Maindiv5,.page1-Maindiv6-title,page1-Maindiv1').click(function () {
    $('.Phone-book-dropdown-Search-Show').css('display', 'none')
    // $('.tel_history_list').css('display', 'none')
})
/*-----------------字母检索定位----------------*/
$scope.Alphabetretrieval = function (e) {
    var a = 0
    var b = 0;
    for (var i = 0; i < e; i++) {
        a += $rootScope.searchReturnList[i][1].length

    }
    b = e * 20 + a * 50
    $(".Alphabeticalnavigation-list").scrollTop(b);
}
$rootScope.telephoneFirstWrold = ''
/*-----------------通讯录好友列表点击展开好友资料------------------*/
$scope.getPhoneData = function (fristWord, id, socialaccountId, nickName, contactNumber, noteName, profilePhoto, phone, tags, sex, province, city, description, chatroomAnnouncement, myNickName, memberCount, groupId, topNumber, alias) {
    $('.klk1').html($rootScope.WeChatowner[socialaccountId])
    $rootScope.telephoneFirstWrold = fristWord
    $('.page1-Maindiv7').css('background', 'none')
    if (fristWord == '群') {
        $scope.Identifygroupsandfriends = 1;
        $scope.Addressbookfriends = false
        $scope.Addressbookdata = true
        var lkl = new FormData()
        lkl.append('socialaccountId', socialaccountId)
        lkl.append('chatroomId', id)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/getChatroomById",
            data: lkl,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            $rootScope.impPhoId = response.data.id;
            $rootScope.impPhoCid = response.data.cid
            $rootScope.impPhosocialaccountId = response.data.socialaccountId;
            $rootScope.impPhonickName = response.data.chatroomName;
            $rootScope.impPhomyNickName = response.data.myNickName;
            $rootScope.impPhogroupId = response.data.groupId;
            $rootScope.impPhomemberCount = response.data.memberCount;
            $rootScope.impPhochatroomAnnouncement = response.data.chatroomAnnouncement;
            $rootScope.impPhoprofilePhoto = $rootScope.imgSrc + response.data.chatroomProfilePhoto;
            if (response.data.chatroomProfilePhoto == '') {
                $rootScope.impPhoprofilePhoto = './images/Destroy.png'
            } else {
                $rootScope.impPhoprofilePhoto = $rootScope.imgSrc + response.data.chatroomProfilePhoto
            }
            $rootScope.impPhodescription = response.data.chatroomDescription;
            $rootScope.impPhotags = response.data.tags;
            $rootScope.impPhoTopNumber = response.data.topNumber;
            /*--------获取所有分组-------*/
            $http({
                method: 'POST',
                url: $rootScope.link + "/groups/getGroups",
                data: $scope.MyFrienddata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                $scope.impPhoAllGroups = []
                $scope.impPhoAllGroups = response.data.groupList
                setTimeout(function () {
                    if ($rootScope.impPhogroupId == "0") {
                        $(".sree-select option").removeAttr("selected");
                        $(".sree-select option[value=0]").attr("selected", true)
                    } else {
                        $(".sree-select option").removeAttr("selected");
                        $(".sree-select option[value=" + $rootScope.impPhogroupId + "]").attr("selected", true)
                    }
                }, 50)
            });
            $('.imponoteName').html($rootScope.impPhonoteName)
            $('.imponotePhoneNumber').val($rootScope.impPhophone)
            $('.page1-Maindiv7-whiteMeContent').val($rootScope.impPhodescription)
            var tagss = []
            if ($rootScope.impPhotags.indexOf(',') > 0) {
                tagss = $rootScope.impPhotags.split(',')
            } else {
                if ($rootScope.impPhotags.length > 0) {
                    tagss.push($rootScope.impPhotags)
                } else {
                    tagss = []
                }
            }
            $rootScope.impPhotags1 = tagss
        });
    } else {
        $scope.Identifygroupsandfriends = 0;
        $scope.Addressbookfriends = true
        $scope.Addressbookdata = false
        var lkl1 = new FormData()
        lkl1.append('socialaccountId', socialaccountId)
        lkl1.append('contactId', id)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/getContactById",
            data: lkl1,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            $rootScope.impPhoId = response.data.id;
            $rootScope.impPhoCid = response.data.cid;
            $rootScope.impPhosocialaccountId = response.data.socialaccountId;
            $rootScope.impPhonoteName = response.data.noteName;
            $rootScope.impPhocontactNumber = response.data.contactNumber;
            $rootScope.impPhonickName = response.data.nickName;

            if (response.data.profilePhoto == '') {
                $rootScope.impPhoprofilePhoto = './images/Destroy.png'
            } else {
                $rootScope.impPhoprofilePhoto = $rootScope.imgSrc + response.data.profilePhoto
            }
            $rootScope.impPhophone = response.data.phone;
            $rootScope.impPhotags = response.data.tags
            $rootScope.impPhosex = response.data.sex;
            $rootScope.impPhoprovince = response.data.province;
            $rootScope.impPhocity = response.data.city;
            $rootScope.impPhodescription = response.data.description;
            $rootScope.impPhogroupId = response.data.groupId;
            $rootScope.impPhoTopNumber = response.data.topNumber;
            $rootScope.impPhoTalias = response.data.alias;
            /*--------获取所有分组-------*/
            $http({
                method: 'POST',
                url: $rootScope.link + "/groups/getGroups",
                data: $scope.MyFrienddata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                $scope.impPhoAllGroups = response.data.groupList
                if ($rootScope.impPhogroupId == "0") {
                    $(".second-select option").removeAttr("selected");
                    $(".second-select option[value=0]").attr("selected", true)
                } else {
                    $(".second-select option").removeAttr("selected");
                    $(".second-select option[value=" + $rootScope.impPhogroupId + "]").attr("selected", true)
                }
                setTimeout(function () {
                    $('.second-select').find("option[value=" + $rootScope.impPhogroupId + "]").attr("selected", true)
                }, 10)
            });
            $('.imponoteName').html($rootScope.impPhonoteName)

            $('.imponotePhoneNumber').val($rootScope.impPhophone)
            $('.page1-Maindiv7-whiteMeContent').val($rootScope.impPhodescription)
            var tagss = []
            if ($rootScope.impPhotags.indexOf(',') > 0) {
                tagss = $rootScope.impPhotags.split(',')
            } else {
                if ($rootScope.impPhotags.length > 0) {
                    tagss.push($rootScope.impPhotags)
                } else {
                    tagss = []
                }
            }
            $rootScope.impPhotags1 = tagss

        });
    }
    $scope.Addressbook = true

}

/*---------------------微信号下好友搜索---------------------*/
$('.select-first-1-1').bind('input propertychange', function () {
    var a = $(this).val()
    var Remarks = new FormData()
    Remarks.append('message', a)
    Remarks.append('accountId', $rootScope.MaillistInitaccountId)
    $http({
        method: 'POST',
        url: $rootScope.link + "/socialaccount/getContactByName",
        data: Remarks,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $scope.searchListOneTo = '搜索'
            for (var m = 0; m < response.data.contactList.length; m++) {


                if (response.data.contactList[m].profilePhoto == '' || response.data.contactList[m].profilePhoto == null || response.data.contactList[m].profilePhoto == undefined) {
                    response.data.contactList[m].profilePhoto = './images/Destroy.png'
                } else {
                    response.data.contactList[m].profilePhoto = $rootScope.imgSrc + response.data.contactList[m].profilePhoto
                }
            }
            $scope.DDorTop = response.data.contactList
            $('.Phone-book-dropdown-Search-Show').css('display', 'block')
        } else {
        }
    });
})

/*---------------------群组下群成员搜索---------------------*/
$('.all-customer-search-logo-input').bind('input propertychange', function () {
    var keyWorld = $(this).val()
    if (keyWorld == '' || keyWorld == null || keyWorld == undefined) {

        var a = new FormData()
        a.append('chatroomId', $rootScope.Id)
        a.append('id', $rootScope.socialaccountId)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/getChatroommenber",
            data: a,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            for (var i = 0; i < response.data.chatroommemberList.length; i++) {
                response.data.chatroommemberList[i].profilePhoto = $rootScope.imgSrc + response.data.chatroommemberList[i].profilePhoto
            }
            $scope.Listofallgroupmembers = response.data.chatroommemberList
        });
    } else {
        var Remarks = new FormData()
        Remarks.append('chatroomId', $rootScope.Id)
        Remarks.append('message', keyWorld)
        Remarks.append('id', $rootScope.socialaccountId)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/getChatroommemberByName",
            data: Remarks,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                for (var i = 0; i < response.data.chatroommemberList.length; i++) {
                    if (response.data.chatroommemberList[i].profilePhoto == '') {
                        response.data.chatroommemberList[i].profilePhoto = './images/Destroy.png'

                    } else {
                        response.data.chatroommemberList[i].profilePhoto = $rootScope.imgSrc + response.data.chatroommemberList[i].profilePhoto
                    }

                }
                $scope.Listofallgroupmembers = response.data.chatroommemberList
            } else {
                $scope.Listofallgroupmembers = []
            }
        });
    }

})
/*----------好友，群组编辑资料描述---------*/
$scope.editWhitMe1 = function () {
    $('.page1-Maindiv7-whiteMeContent').attr("disabled", false).css('border', 'solid 1px #75aaff');
    $('.page1-Maindiv7-whiteMeContent').focus()
}
$('.page1-Maindiv7-whiteMeContent').blur(function () {
    $('.page1-Maindiv7-whiteMeContent').attr("disabled", true).css('border', 'transparent');
    if ($scope.Identifygroupsandfriends == 1) {
        var id = $rootScope.impPhoId
        var newName = $(".sree-impPhomyNickName").html()
        var groupid = $('.sree-select').val()
        var description = $('.page1-Maindiv7-whiteMeContent').val()
        var Remarks = new FormData()
        Remarks.append('id', id)
        Remarks.append('groupid', groupid)
        Remarks.append('mynickname', newName)
        Remarks.append('chatroomDescription', description)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/contact/modifyChatroomById",
            data: Remarks,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {

            } else {
            }
        });
    } else {
        $('.page1-Maindiv7-whiteMeContent').attr("disabled", true).css({
            'background': '#fff',
            'border': '1px solid #EFEFEF'
        });
        var id = $rootScope.impPhoId
        var newName = $(".imponoteName").html()
        var phone = $(".imponotePhoneNumber").val()
        var groupid = $('.second-select').val()
        var description = $('.page1-Maindiv7-whiteMeContent').val()
        var Remarks = new FormData()
        Remarks.append('id', id)
        Remarks.append('notename', newName)
        Remarks.append('phone', phone)
        Remarks.append('groupid', groupid)
        Remarks.append('description', description)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/modifyContactById",
            data: Remarks,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
            } else {
            }
        });
    }

})
/*----------通讯录好友备注名称修改---------*/
$scope.editName1 = function () {
    $(".imponoteName").attr("contenteditable", true).css('border', 'solid 1px #75aaff');
    $(".imponoteName").focus()
}
$(".imponoteName").blur(function () {
    $(".imponoteName").attr("contenteditable", false).css('border', ' 1px solid transparent')
    var id = $rootScope.impPhoId
    var newName = $(".imponoteName").html()
    var phone = $(".imponotePhoneNumber").val()
    var groupid = $('.second-select').val()
    var description = $('.page1-Maindiv7-whiteMeContent').val()
    var Remarks = new FormData()
    Remarks.append('id', id)
    Remarks.append('notename', newName)
    Remarks.append('phone', phone)
    Remarks.append('groupid', groupid)
    Remarks.append('description', description)
    $http({
        method: 'POST',
        url: $rootScope.link + "/contact/modifyContactById",
        data: Remarks,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
        } else {
        }
    });
})
/*----------通讯录好友修改手机号---------*/
$scope.editPhone1 = function () {
    $(".imponotePhoneNumber").attr("readonly", false).css('border', 'solid 1px #75aaff')
    $(".imponotePhoneNumber").focus()
}
$(".imponotePhoneNumber").keyup(function () {
    this.value = this.value.replace(/[^0-9-]+/, '');
})
$(".imponotePhoneNumber").blur(function () {
    $(this).attr("readonly", true).css('border', '1px solid transparent')
    var id = $rootScope.impPhoId
    var newName = $(".imponoteName").html()
    var phone = $(".imponotePhoneNumber").val()
    var groupid = $('.second-select').val()
    var description = $('.page1-Maindiv7-whiteMeContent').val()
    var Remarks = new FormData()
    Remarks.append('id', id)
    Remarks.append('phone', phone)
    Remarks.append('notename', newName)
    Remarks.append('groupid', groupid)
    Remarks.append('description', description)
    $http({
        method: 'POST',
        url: $rootScope.link + "/contact/modifyContactById",
        data: Remarks,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {

    });
})
/*----------------通讯录修改好友分组资料-----------------*/
$('.second-select').change(function () {
    var id = $rootScope.impPhoId
    var newName = $(".imponoteName").html()
    var phone = $(".imponotePhoneNumber").val()
    var groupid = $('.second-select').val()
    var description = $('.page1-Maindiv7-whiteMeContent').val()
    var Remarks = new FormData()
    Remarks.append('id', id)
    Remarks.append('groupid', groupid)
    Remarks.append('notename', newName)
    Remarks.append('phone', phone)
    Remarks.append('description', description)
    $http({
        method: 'POST',
        url: $rootScope.link1 + "/contact/modifyContactById",
        data: Remarks,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {

        } else {
        }
    });
})
/*----------------通讯录修改群组分组资料-----------------*/
$('.sree-select').change(function () {
    var id = $rootScope.impPhoId
    var newName = $(".sree-impPhomyNickName").html()
    var groupid = $('.sree-select').val()
    var description = $('.page1-Maindiv7-whiteMeContent').val()
    var Remarks = new FormData()
    Remarks.append('id', id)
    Remarks.append('groupid', groupid)
    Remarks.append('mynickname', newName)
    Remarks.append('chatroomDescription', description)
    $http({
        method: 'POST',
        url: $rootScope.link1 + "/contact/modifyChatroomById",
        data: Remarks,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {

        } else {
        }
    });
})
/*----------------通讯录修改群组群名片资料-----------------*/
$scope.editName3 = function () {
    $(".sree-impPhomyNickName").attr("contenteditable", true).css('border', 'solid 1px #75aaff');
    $(".sree-impPhomyNickName").focus()
}
$(".sree-impPhomyNickName").blur(function () {
    $(".sree-impPhomyNickName").attr("contenteditable", false).css('border', ' 1px solid transparent')
    var id = $rootScope.impPhoId
    var newName = $(".sree-impPhomyNickName").html()
    var groupid = $('.sree-select').val()
    var description = $('.page1-Maindiv7-whiteMeContent').val()
    var Remarks = new FormData()
    Remarks.append('id', id)
    Remarks.append('groupid', groupid)
    Remarks.append('mynickname', newName)
    Remarks.append('chatroomDescription', description)
    $http({
        method: 'POST',
        url: $rootScope.link1 + "/contact/modifyChatroomById",
        data: Remarks,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {

        } else {
        }
    });
})

/*----------------选择搜索出来的微信进行通讯录展示----------------*/
$scope.tablePhoneFriendList = function (id, cid) {
    $scope.Addressbook = false
    $('.page1-Maindiv7').css('background', 'url("../images/phonegroup.png") center no-repeat')
    $('.Maillist-myfriends-li-bottom-line').find("li[data=" + id + "]").css('background-color', 'rgba(68, 186, 246, 0.05)').siblings().css('background-color', '#FFFFFF')
    $('.pho-bo-list-search1').css('display', 'none')
    var arrAl = []
    arrAl.push(id)
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
        $rootScope.MaillistInitId = id
        $rootScope.MaillistInitcId = cid
        $rootScope.searchReturnList = [
            [{name: '群'}, []], [{name: 'A'}, []], [{name: 'B'}, []], [{name: 'C'}, []], [{name: 'D'}, []], [{name: 'E'}, []], [{name: 'F'}, []], [{name: 'G'}, []], [{name: 'H'}, []], [{name: 'I'}, []], [{name: 'J'}, []], [{name: 'K'}, []], [{name: 'L'}, []], [{name: 'M'}, []], [{name: 'N'}, []], [{name: 'O'}, []], [{name: 'P'}, []], [{name: 'Q'}, []], [{name: 'R'}, []], [{name: 'S'}, []], [{name: 'T'}, []], [{name: 'U'}, []], [{name: 'V'}, []], [{name: 'W'}, []], [{name: 'X'}, []], [{name: 'Y'}, []], [{name: 'Z'}, []], [{name: '#'}, []]
        ]
        for (var i = 0; i < response.data.contactList.length; i++) {
            for (var i1 = 0; i1 < $rootScope.searchReturnList.length; i1++) {
                if (response.data.contactList[i].fristWord == $rootScope.searchReturnList[i1][0].name) {
                    if (response.data.contactList[i].profilePhoto == '' || response.data.contactList[i].profilePhoto == null || response.data.contactList[i].profilePhoto == undefined) {
                        response.data.contactList[i].profilePhoto = './images/Destroy.png'
                    } else {
                        response.data.contactList[i].profilePhoto = $rootScope.imgSrc + response.data.contactList[i].profilePhoto
                    }
                    $rootScope.searchReturnList[i1][1].push(response.data.contactList[i])
                }
            }
        }
    });
}
$('.page1-Maindiv6,.page1-Maindiv1,.page1-Maindiv7,.wechatList-title,.Maillist-myfriends').click(function () {
    $('.pho-bo-list-search1').css('display', 'none')
    $('.page1-Maindiv2-myfriends-search-input1').val('')
})
    $('.page1-Maindiv1,.page1-Maindiv7,.page1-Maindiv5,.newSelectTitle,.page1-Maindiv6-con').click(function () {
        $('.tel_history_list').css('display', 'none')
    })
/*-----------------通讯录删除好友、群组对应标签-----------------*/
$scope.delOneTag1 = function (e) {
    if (e == '' || e == undefined || e == null) {

    } else {
        if ($scope.Identifygroupsandfriends == 1) {
            var delTag = new FormData()
            delTag.append('id', $rootScope.impPhoId)
            delTag.append('socialaccountid', $rootScope.impPhosocialaccountId)
            delTag.append('tags', e)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/delChatroomTags",
                data: delTag,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    var oo = new FormData()
                    oo.append('socialaccountId', $rootScope.impPhosocialaccountId)
                    oo.append('chatroomId', $rootScope.impPhoId)
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/contact/getChatroomById",
                        data: oo,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        var tages1 = response.data.tags;
                        $rootScope.impPhotags1 = tages1.split(',')
                    });
                }
            });
        } else {

            var delTag = new FormData()
            delTag.append('id', $rootScope.impPhoId)
            delTag.append('socialaccountid', $rootScope.impPhosocialaccountId)
            delTag.append('tags', e)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/delContactTags",
                data: delTag,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    var oo = new FormData()
                    oo.append('socialaccountId', $rootScope.impPhosocialaccountId)
                    oo.append('contactId', $rootScope.impPhoId)
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/contact/getContactById",
                        data: oo,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        var tages1 = response.data.tags;
                        $rootScope.impPhotags1 = tages1.split(',')
                    });
                }
            });
        }

    }

}

/*----------通讯录部分打标签---------*/
$scope.addTagIsshow1 = function (e) {
    if (e == 1) {

        if ($('.page1-div3-content-title-edit-tag3').attr('data') == 0) {
            $('.page1-div3-content-title-edit-tag3').attr('data', 1)
            $('.page1-div3-content-title-edit-tag3').html('完成')
            $('.page1-div3-content-title-edit-tag3').css({'display': 'inline-block', 'right': '0px'})

            $('.page1-div3-content-title-edit-tag1').css('display', 'none')
            $('.add_tag_input_add1').css('display', 'block')
            $('.tags-box').css('display', 'none')
            $('.page1-div3-content-tags').css('height', '134px')
        }
        else {
            if ($('.add_tag_input_add1').val() == '') {
                $('.page1-div3-content-title-edit-tag3').attr('data', 0)
                $('.page1-div3-content-title-edit-tag3').html('自定义')
                $('.page1-div3-content-title-edit-tag3').css({'display': 'inline-block', 'right': '30px'})
                $('.page1-div3-content-title-edit-tag1').css('display', 'inline-block')
                $('.tags-box').css('display', 'block')
                $('.page1-div3-content-tags').css('height', '114px')
                $('.add_tag_input_add1').css('display', 'none')
                var addTag = $('.add_tag_input_add1').val()
            } else {
                $('.page1-div3-content-title-edit-tag3').attr('data', 0)
                $('.page1-div3-content-title-edit-tag3').html('自定义')
                $('.page1-div3-content-title-edit-tag3').css({'display': 'inline-block', 'right': '30px'})
                $('.page1-div3-content-title-edit-tag1').css('display', 'inline-block')
                $('.tags-box').css('display', 'block')
                $('.page1-div3-content-tags').css('height', '114px')
                $('.add_tag_input_add1').css('display', 'none')
                var addTag = $('.add_tag_input_add1').val()
                var addTagArr = []
                var addTagArr1 = []
                addTagArr.push(addTag.split('，'))

                if (addTagArr[0].length == 0) {
                }
                else {
                    for (var k = 0; k < addTagArr[0].length; k++) {
                        if (addTagArr[0][k] == '') {

                        } else {
                            addTagArr1.push(addTagArr[0][k])
                        }
                    }
                    var hayui = $('.search-field')
                    if ($rootScope.telephoneFirstWrold == '群') {
                        var delTag = new FormData()
                        delTag.append('id', $rootScope.impPhoId)
                        delTag.append('socialaccountid', $rootScope.impPhosocialaccountId)
                        delTag.append('tags', addTagArr1)
                        $http({
                            method: 'POST',
                            url: $rootScope.link + "/contact/addChatroomTags",
                            data: delTag,
                            headers: {'Content-Type': undefined},
                            transformRequest: angular.identity
                        }).success(function (response) {
                            if (response.code == 200) {
                                $('.add_tag_input_add1').val('')
                                var oo = new FormData()
                                oo.append('socialaccountId', $rootScope.impPhosocialaccountId)
                                oo.append('chatroomId', $rootScope.impPhoId)
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + "/contact/getChatroomById",
                                    data: oo,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    var tages1 = response.data.tags;
                                    $scope.impPhotags1 = tages1.split(',')
                                });
                            }
                        });
                    }
                    else {
                        var delTag = new FormData()
                        delTag.append('id', $rootScope.impPhoId)
                        delTag.append('socialaccountid', $rootScope.impPhosocialaccountId)
                        delTag.append('tags', addTagArr1)
                        $http({
                            method: 'POST',
                            url: $rootScope.link + "/contact/addContactTags",
                            data: delTag,
                            headers: {'Content-Type': undefined},
                            transformRequest: angular.identity
                        }).success(function (response) {
                            if (response.code == 200) {
                                $('.add_tag_input_add1').val('')
                                var oo = new FormData()
                                oo.append('socialaccountId', $rootScope.impPhosocialaccountId)
                                oo.append('contactId', $rootScope.impPhoId)
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + "/contact/getContactById",
                                    data: oo,
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    var tages1 = response.data.tags;
                                    $rootScope.impPhotags1 = tages1.split(',')
                                });
                            }
                        });
                    }
                }
            }
        }

    }
    else {
        if ($('.page1-div3-content-title-edit-tag1').attr('data') == 0) {
            $('.page1-div3-content-title-edit-tag1').attr('data', 1)
            $('.page1-div3-content-title-edit-tag1').html('完成')
            $('.page1-div3-content-title-edit-tag3').css('display', 'none')
            $('.tags-box').css('display', 'none')
            $('.page1-div3-content-tags').css('height', '134px')
            $('.side-by-side').css('display', 'inline-block')
        }
        else {
            $('.page1-div3-content-title-edit-tag1').html('选择')
            $('.page1-div3-content-tags').css('height', '114px')
            $('.page1-div3-content-title-edit-tag3').css('display', 'inline-block')
            $('.tags-box').css('display', 'block')
            $('.side-by-side').css('display', 'none')
            $('.page1-div3-content-title-edit-tag1').attr('data', 0)
            var addTags = []
            var pp = $('.search-choice')
            for (var i = 0; i < pp.length; i++) {
                addTags.push(pp.eq(i)[0].innerText)
            }
            if (addTags.length == 0) {
            } else {
                var hayui = $('.search-field')
                if ($rootScope.telephoneFirstWrold == '群') {
                    var delTag = new FormData()
                    delTag.append('id', $rootScope.impPhoId)
                    delTag.append('socialaccountid', $rootScope.impPhosocialaccountId)
                    delTag.append('tags', addTags)
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/contact/addChatroomTags",
                        data: delTag,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        if (response.code == 200) {
                            var oo = new FormData()
                            oo.append('socialaccountId', $rootScope.impPhosocialaccountId)
                            oo.append('chatroomId', $rootScope.impPhoId)
                            $http({
                                method: 'POST',
                                url: $rootScope.link + "/contact/getChatroomById",
                                data: oo,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                var tages1 = response.data.tags;
                                $rootScope.impPhotags1 = tages1.split(',')
                            });
                        }
                    });
                } else {
                    var delTag = new FormData()
                    delTag.append('id', $rootScope.impPhoId)
                    delTag.append('socialaccountid', $rootScope.impPhosocialaccountId)
                    delTag.append('tags', addTags)
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/contact/addContactTags",
                        data: delTag,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        if (response.code == 200) {
                            var oo = new FormData()
                            oo.append('socialaccountId', $rootScope.impPhosocialaccountId)
                            oo.append('contactId', $rootScope.impPhoId)
                            $http({
                                method: 'POST',
                                url: $rootScope.link + "/contact/getContactById",
                                data: oo,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                var tages1 = response.data.tags;
                                $rootScope.impPhotags1 = tages1.split(',')
                            });
                        }
                    });
                }
            }
        }
    }
}
/*---------点击通讯录中的发消息---------*/
$scope.chatWithChose = function () {

    // impPhoCid
    var IsHaveThis = false
    $('.page1-Maindiv2-listInit').css('display', 'none')
    $rootScope.ChataddressbookswitchingBook = false
    $rootScope.ChataddressbookswitchingChat = true
    $scope.Addressbook = false;
    $('.page1-Maindiv7').css('background', 'url("../images/phonegroup.png") center no-repeat')
    $('.page1-Maindiv1-msg').css('background', ' url("./images/msg.png") center no-repeat')
    $('.page1-Maindiv1-msg').next().css('background', ' url("./images/telephone-book.png") center no-repeat')
    bGoH = -1
    $rootScope.frienfList = []
    $('.page1-Maindiv2 .newSelectTitle span').html('请选择')
    $rootScope.watchThis = $('.page1-Maindiv2 .newSelectTitle span').html()
    $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]

    var firstIndex = 0;
    var firstTop = 0;
    var firstThis = '';
    var firstIndex1 = 0;
    var firstTop1 = 0;
    var firstThis1 = '';
    var firstIndex2 = 0;
    var firstTop2 = 0;
    var firstThis2 = '';
    var firstIshave = false;
    var firstIshave1 = false;
    var ThisSolId = ''
    var ThisSolTopNumber = 0
    var ThisSolTopNumber1 = 0
    for (var i = 0; i < $rootScope.Chatwithfriends[-1].length; i++) {
        if ($rootScope.Chatwithfriends[-1][i].cid == $rootScope.impPhoCid) {
            firstIndex = i;
            firstThis = $rootScope.Chatwithfriends[-1][i]
            firstIshave = true

        }
        if ($rootScope.Chatwithfriends[-1][i].topNumber == 1) {
            firstTop++
        }
    }
    for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == $rootScope.impPhoCid) {
            firstIndex1 = i;
            firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
            ThisSolId = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].socialaccountId
            firstIshave1 = true
            ThisSolTopNumber = $rootScope.Chatwithfriends[-1][i].topNumber
        }
        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
            firstTop1++;
        }
    }
    if (ThisSolId == '') {
        var sendFlie = new FormData()
        sendFlie.append('Cid', $rootScope.impPhoCid)
        sendFlie.append('accountId', $rootScope.myaccountId)
        $http({
            method: 'POST',
            url: $rootScope.link + "/latelychat/getContactByNumber",
            data: sendFlie,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (data) {
            var elc = ''

            if (data.data.contactList.length > 1) {
                if (data.data.contactList[1].profilePhoto == '') {
                    data.data.contactList[1].profilePhoto = './images/Destroy.png'
                } else {
                    data.data.contactList[1].profilePhoto = $rootScope.imgSrc + data.data.contactList[1].profilePhoto
                }

                ThisSolId = data.data.contactList[1].socialaccountId
                elc = data.data.contactList[1]
            } else {
                if (data.data.contactList[0].profilePhoto == '') {
                    data.data.contactList[0].profilePhoto = './images/Destroy.png'
                } else {
                    data.data.contactList[0].profilePhoto = $rootScope.imgSrc + data.data.contactList[0].profilePhoto
                }

                ThisSolId = data.data.contactList[0].socialaccountId
                elc = data.data.contactList[0]
            }
            for (var i = 0; i < $rootScope.Chatwithfriends[ThisSolId].length; i++) {
                if ($rootScope.Chatwithfriends[ThisSolId][i].cid == $rootScope.impPhoCid) {
                    firstIndex2 = i;
                    firstThis2 = $rootScope.Chatwithfriends[ThisSolId][i]
                }
                if ($rootScope.Chatwithfriends[ThisSolId][i].topNumber == 1) {
                    firstTop2++;
                }
            }
            $rootScope.Chatwithfriends[ThisSolId].splice(firstTop2, 0, elc)
            $rootScope.Chatwithfriends[-1].splice(firstTop, 0, elc)
        })
    }
    else {
        for (var i = 0; i < $rootScope.Chatwithfriends[ThisSolId].length; i++) {
            if ($rootScope.Chatwithfriends[ThisSolId][i].cid == $rootScope.impPhoCid) {
                firstIndex2 = i;
                firstThis2 = $rootScope.Chatwithfriends[ThisSolId][i]
                ThisSolTopNumber1 = $rootScope.Chatwithfriends[ThisSolId][i].topNumber
            }
            if ($rootScope.Chatwithfriends[ThisSolId][i].topNumber == 1) {
                firstTop2++;
            }
        }
        if (firstIshave == true && firstIshave1 == true) {
            if (ThisSolTopNumber == 1) {
                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                $rootScope.Chatwithfriends[ThisSolId].splice(0, 0, firstThis2)
            } else {
                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                $rootScope.Chatwithfriends[ThisSolId].splice(firstTop2, 0, firstThis2)
            }


        } else if (firstIshave == true && firstIshave1 == false && $rootScope.lplplpl != -1) {
            if (ThisSolTopNumber == 1) {
                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis)
            } else {
                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, firstThis)
            }

        } else if (firstIshave == true && firstIshave1 == false && $rootScope.lplplpl == -1) {
            if (ThisSolTopNumber == 1) {
                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                $rootScope.Chatwithfriends[ThisSolId].splice(0, 0, firstThis)
            } else {
                $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                $rootScope.Chatwithfriends[ThisSolId].splice(firstTop1, 0, firstThis)
            }

        } else if (firstIshave == false && firstIshave1 == true && $rootScope.lplplpl == -1) {
            if (ThisSolTopNumber1 == 1) {
                $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis2)
                $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                $rootScope.Chatwithfriends[ThisSolId].splice(0, 0, firstThis2)
            } else {
                $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis2)
                $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                $rootScope.Chatwithfriends[ThisSolId].splice(firstTop2, 0, firstThis2)
            }

        } else if (firstIshave == false && firstIshave1 == true && $rootScope.lplplpl != -1) {
            if (ThisSolTopNumber1 == 1) {
                $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis2)
                $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex2, 1)
                $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis2)
            } else {
                $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis2)
                $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex2, 1)
                $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop2, 0, firstThis2)
            }

        }
    }
    $scope.$watch(function () {
        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
    })
    setTimeout(function () {
        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.impPhoCid + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
        $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
        var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
        if (ArrLength > 50) {
            ArrLength = 50
        } else {

        }
        for (var i = 0; i < ArrLength; i++) {
            var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
            }
            if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                if (bothingRead > 0) {
                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                } else {
                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                }

            } else {
                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
            }
        }

        $('.page1-Maindiv2-listInit').css('display', 'none')
        $scope.page1Maindiv4Init = false
        /*-------展示群组相关资料-----*/
        $scope.Customerinformation = true
        $scope.quickReply = false
        $scope.customerRecord = false
        $scope.page1Maindiv4Init = false
        if ($rootScope.telephoneFirstWrold == '群') {
            $scope.chatGroupOrFriend = 1
            $scope.myself1 = true
            $scope.allCustomerList = false
            $scope.myself = false
            $scope.groupdata = new FormData()
            $scope.groupdata.append('socialaccountId', $rootScope.impPhosocialaccountId)
            $scope.groupdata.append('chatroomId', $rootScope.impPhoId)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/getChatroomById",
                data: $scope.groupdata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                var tages1 = response.data.tags;
                $scope.FriendTags = tages1.split(',')
                $scope.Mygroupdata = response.data
                $scope.GroupId = response.data.groupId
                $('.whiteMeContent').val(response.data.chatroomDescription)
                /*-----------------获取标签库信息----------------*/
                $('.chzn-results li').css('display', 'block')
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/groups/getGroups",
                    data: $scope.MyFrienddata,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    $scope.InformationGrouping = response.data.groupList
                    setTimeout(function () {
                        $('.four-select').find("option[value=" + $scope.GroupId + "]").attr("selected", true);

                    }, 10)
                });
            });
        }
        /*-------展示好友相关资料-----*/
        else {
            $scope.chatGroupOrFriend = 0
            $scope.allCustomerList = false
            $scope.myself = true
            $scope.myself1 = false
            $scope.MyFrienddata = new FormData()
            $scope.MyFrienddata.append('socialaccountId', $rootScope.impPhosocialaccountId)
            $scope.MyFrienddata.append('contactId', $rootScope.impPhoId)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/getContactById",
                data: $scope.MyFrienddata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                $scope.MyFrienddata1 = response.data
                $('.change-name').html($rootScope.GetridoftheNbsp(response.data.noteName))
                $rootScope.NameRecord = response.data.noteName
                $('.change-phone').val(response.data.phone)
                $('.whiteMeContent').val(response.data.description)
                var tages1 = response.data.tags;
                $scope.FriendTags = tages1.split(',')
                $scope.GroupId = response.data.groupId
                /*-----------------获取标签库信息----------------*/
                $('.chzn-results li').css('display', 'block')
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/groups/getGroups",
                    data: $scope.MyFrienddata,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    $scope.InformationGrouping = response.data.groupList
                    setTimeout(function () {
                        $('.first-select').find("option[value=" + $scope.GroupId + "]").attr("selected", true)
                    }, 10)
                });
            });
        }

        $scope.chatName = $rootScope.impPhonickName
        $rootScope.chatId = $rootScope.impPhoCid;
        $rootScope.chatHead = $rootScope.WeChatownerHeader[$rootScope.impPhosocialaccountId]
        $rootScope.Id = $rootScope.impPhoId;
        $rootScope.socialaccountId = $rootScope.impPhosocialaccountId;
        if ($rootScope.telephoneFirstWrold == '群') {
            $rootScope.type = 1;
        } else {
            $rootScope.type = 0;
        }
        $rootScope.Topjudge = $rootScope.impPhoTopNumber
        if ($rootScope.Topjudge == 1) {
            $('.chat-top-totop').css('background', 'url("./images/Canceltop.png") center no-repeat')
            $('.chat-top-totop').attr('data', 1)
        } else {
            $('.chat-top-totop').css('background', 'url("./images/toTop.png") center no-repeat')
            $('.chat-top-totop').attr('data', 0)
        }
        $scope.page1Maindiv4Init = false
        var panduanOnlinn = false
        for (var i = 0; i < $rootScope.Judgingthesendingmessage.length; i++) {
            if ($rootScope.socialaccountId == $rootScope.Judgingthesendingmessage[i]) {
                panduanOnlinn = true
                break;
            } else {
            }
        }
        if (panduanOnlinn == true) {
            $('.Chat-layer').css('display', 'block')
            $('.Chat-layer-say').css('display', 'block')
        } else {
            $('.Chat-layer').css('display', 'none')
            $('.Chat-layer-say').css('display', 'none')
        }
        $('.page1-Maindiv3').css('background', 'none')
        $('.newsList').html('')
        $('.chat-top-title').html($rootScope.impPhonickName)
        $scope.ChatModule = true;
        $('.forPhone-content').find('span[class^="blue"]').html($rootScope.WeChatowner[$rootScope.socialaccountId])
        if ($rootScope.friendStorage.hasOwnProperty($rootScope.chatId)) {
            var mml = $rootScope.friendStorage[$rootScope.chatId]

            var arr88 = mml.match(/\[[^\]]+\]/g);
            if (arr88 == null || arr88 == 0 || arr88 == undefined) {
                var mm2 = mml.replace(/<br>/g, "")
                mml = mm2.replace(/undefined/g, "")
            } else {
                var tt1 = []
                var tt2 = []
                for (var i1 = 0; i1 < arr88.length; i1++) {
                    for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                        if (arr88[i1] == emjoyAllGet[i2]) {
                            tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                            tt2.push(emjoyAllGet[i2])
                        }
                    }
                }
                for (var i8 = 0; i8 < tt1.length; i8++) {
                    mml = mml.replace(tt2[i8], tt1[i8])
                }
                var mm2 = mml.replace(/<br>/g, "")
                mml = mm2.replace(/undefined/g, "")
            }
            $('.newsList').html(mml)
        } else {
            $('.newsList').html('')
        }
        setTimeout(function () {
            if ($rootScope.Topjudge == 1) {
                $('.wechatList').animate({scrollTop: 0}, 100)
            } else {
                $('.wechatList').animate({scrollTop: ($('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.chatId + '"]').parent().attr('data-index') * 74 + 9)}, 100)
            }
            $('.Newmessagereminding').css('display', 'none')
            if ($rootScope.friendStorage[$rootScope.chatId] == undefined || $rootScope.friendStorage[$rootScope.chatId] == null) {
                $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
            } else {
                if ($rootScope.friendStorage[$rootScope.chatId].indexOf("initNone") >= 0) {
                    $('.ChatRecord').html('-------------------- 查看更多消息 --------------------').css('cursor', 'pointer')
                } else {
                    $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
                }
            }
            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.chatId + '"]').next().css('display', 'none')
            if ($rootScope.friendStorage[$rootScope.chatId] == '' || $rootScope.friendStorage[$rootScope.chatId] == undefined) {
            } else {
                var pp = $rootScope.friendStorage[$rootScope.chatId].replace(/Unread/g, 'Read')
                $rootScope.friendStorage[$rootScope.chatId] = pp;
            }
            var DivscrollHeight = $('.RightCont')[0].scrollHeight
            $('.RightCont').animate({scrollTop: DivscrollHeight}, 500)
        }, 50)
    }, 150)
}


/*------------------------------------设置相关-----------------------------------*/
/*-------------开启关闭自动回复-----------*/
$scope.AutomaticSwich = function (event) {
    if ($(event.target).attr('data') == 1) {
        var autoReply = new FormData()
        autoReply.append('accountname', $rootScope.localUserName)
        autoReply.append('autoReply', true)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/message/autoReply",
            data: autoReply,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $(event.target).css({'background': 'url("./images/open-1.png") center no-repeat'})
                $(event.target).attr('data', 2)
            }
        })

    } else {
        var autoReply = new FormData()
        autoReply.append('accountname', $rootScope.localUserName)
        autoReply.append('autoReply', false)
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/message/autoReply",
            data: autoReply,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $(event.target).css({'background': 'url("./images/off-1.png") center no-repeat'})
                $(event.target).attr('data', 1)
            }
        })

    }
}
layui.use(['table'], function () {
    var laypage = layui.laypage, layer = layui.layer
    var table = layui.table;
    var nowpage;
    var nowlimit;
    var pp = table.render({
        elem: '#test'
        , url: $rootScope.link + '/autoreply/getAllAutoreply'
        , method: 'post' //如果无需自定义HTTP类型，可不加该参数
        , limits: [10, 20, 30, 50]
        , cols: [[{field: 'LAY_TABLE_INDEX', data: 'id', title: '序号'}
            , {field: 'keyword', title: '关键词'}
            , {field: 'matchType', title: '匹配类型'}
            , {field: 'type', title: '回复内容'}
            , {field: 'id', title: '操作', toolbar: '#barDemo'}
        ]]
        , skin: 'nob ' //表格风格
        , even: true
        , page: true //是否显示分页
        , limit: 10 //每页默认显示的数量
        , height: 500
        , done: function (res, page, count) {
            var aa = page
            if (res.data.length == 1) {
                if (nowpage >= 2) {
                    page = nowpage - 1
                } else {
                    page = nowpage
                }
            } else {
            }
            nowpage = page
            var i = 0;
            var r = 0

            $("[data-field='LAY_TABLE_INDEX']").children().each(function () {
                i++
                if (i == 1) {

                } else {
                    $(this).text((Number($(this).text()) + 1 + (aa - 1) * 10))
                    $(this).attr('data', res.data[i - 2].id)
                }
            })
            $("[data-field='matchType']").children().each(function () {
                if ($(this).text() == 1) {
                    $(this).text("模糊")
                } else if ($(this).text() == 0) {
                    $(this).text("完全")
                }
            })
            $("[data-field='type']").children().each(function () {
                if ($(this).text() == 0) {
                    $(this).text("文本")
                } else if ($(this).text() == 1) {
                    $(this).text("图片")
                } else if ($(this).text() == 2) {
                    $(this).text("文本+图片")
                }
            })
            $("[data-field='id']").children().each(function () {
                r++
                if (r == 1) {

                } else {
                    var t = 0;
                    $(this).children().each(function () {
                        t++;
                        $(this).attr('data', res.data[r - 2].id)
                        if (t == 1) {
                            $(this).addClass('editThis')
                        } else {
                            $(this).addClass('delThis')
                        }

                    })
                }

            })

        }

    });

    /*------------------确认删除--------------------*/
    $scope.suredelThisdata = function () {
        $('.sure-del').css('display', 'none')
        var delThis = new FormData()
        delThis.append('id', $rootScope.AutoreplyById)
        $http({
            method: 'POST',
            url: $rootScope.link + "/autoreply/deleteAutoreplyById",
            data: delThis,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                pp.reload({});
            }
        })
    }
    /*----------------确认编辑、添加关键词发送请求--------------*/
    $scope.SureAddmodifiedkeywords = function () {
        if (editreplyBy == true) {
            var keyWorld = $('.Addmodifiedkeywords-body-first-inpuit-imporant').val()
            var ReplyWorld = $('.Addmodifiedkeywords-body-three-text').val()
            var a = $("input[name='isY']:checked").val()
            if (keyWorld == undefined || keyWorld == null) {
                keyWorld = ''
            }
            if (ReplyWorld == undefined || ReplyWorld == null) {
                ReplyWorld = ''
            }
            var editThis = new FormData()
            editThis.append('content', ReplyWorld)
            editThis.append('id', $rootScope.AutoreplyById)
            editThis.append('keyword', keyWorld)
            editThis.append('matchtype', a)
            if ($rootScope.pic1 == '') {
                editThis.append('whether', 1)
                editThis.append('file', '')
            } else {
                editThis.append('whether', 0)
                editThis.append('file', $rootScope.pic1)
            }
            $http({
                method: 'POST',
                url: $rootScope.link + "/autoreply/modifyAutoreplyById",
                data: editThis,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    pp.reload({});
                }
                $('.Addmodifiedkeywords-body-first-inpuit-imporant').val('')
                $('.Addmodifiedkeywords-body-three-text').val('')
                $('.Addmodifiedkeywords-body-three-upImg-text').html('上传图片')
                $('.Addmodifiedkeywords').css('display', 'none')
                $('.last-Img').attr('src', '')
                $rootScope.pic1 = ''
                $rootScope.AutoreplyById = ''
            })
        } else if (addreplyBy == true) {
            var keyWorld = $('.Addmodifiedkeywords-body-first-inpuit-imporant').val()
            var ReplyWorld = $('.Addmodifiedkeywords-body-three-text').val()
            var a = $("input[name='isY']:checked").val()
            if (keyWorld == undefined || keyWorld == null) {
                keyWorld = ''
            }
            if (ReplyWorld == undefined || ReplyWorld == null) {
                ReplyWorld = ''
            }
            var addtThis = new FormData()
            addtThis.append('content', ReplyWorld)
            addtThis.append('keyword', keyWorld)
            addtThis.append('matchtype', a)
            if ($rootScope.pic1 == '') {
                addtThis.append('file', '')
            } else {
                addtThis.append('file', $rootScope.pic1)
            }
            $http({
                method: 'POST',
                url: $rootScope.link + "/autoreply/adduploadimg",
                data: addtThis,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    pp.reload({});
                }
                $('.Addmodifiedkeywords-body-first-inpuit-imporant').val('')
                $('.Addmodifiedkeywords-body-three-text').val('')
                $('.Addmodifiedkeywords-body-three-upImg-text').html('上传图片')
                $('.Addmodifiedkeywords').css('display', 'none')
                $('.last-Img').attr('src', '')
                $rootScope.pic1 = ''
                $rootScope.AutoreplyById = ''
            })
        }
    }
});
$rootScope.pic1 = ''
$rootScope.AutoreplyById = ''
var jiluImgPath
var editreplyBy = false
var addreplyBy = false
$('.Addmodifiedkeywords').css('display', 'none')
/*--------------------点击编辑------------------*/
$(document).on('click', '.editThis', function () {
    editreplyBy = true
    $('.Addmodifiedkeywords').css('display', 'block')
    $('.Addmodifiedkeywords-body-three-upImg-text').html('修改图片')
    $rootScope.AutoreplyById = $(this).attr('data')
    var delThis = new FormData()
    delThis.append('id', $rootScope.AutoreplyById)
    $http({
        method: 'POST',
        url: $rootScope.link + "/autoreply/getAutoreplyById",
        data: delThis,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            jiluImgPath = response.data.autoreplyPath
            $('.Addmodifiedkeywords-body-first-inpuit-imporant').val(response.data.keyword)
            $('.Addmodifiedkeywords-body-three-text').val(response.data.content)
            $('.last-Img').attr('src', response.data.autoreplyPath)
            if (response.data.matchType == 0) {
                $('.wanquan').prop('checked', "checked")
                $('.mohu').prop('checked', false)
            } else {
                $('.mohu').prop('checked', "checked")
                $('.wanquan').prop('checked', false)
            }
            if (response.data.type == 0) {
                $('.Addmodifiedkeywords-body-three-upImg-text').html('上传图片')
            }
        }
    })
})
/*--------------------点击删除------------------*/
$(document).on('click', '.delThis', function () {
    $('.sure-del').css('display', 'block')
    $rootScope.AutoreplyById = $(this).attr('data')
})
/*------------------取消删除关闭按提示--------------------*/
$scope.closesuredel = function () {
    $('.sure-del').css('display', 'none')
}
/*----------------置空内容输入框--------------*/
$('.Addmodifiedkeywords-body-three-text').html('')

/*----------------编辑、添加关键词回复打开--------------*/
$scope.AddmodifiedkeywordsShow = function () {
    addreplyBy = true
    $('.Addmodifiedkeywords-body-three-upImg-text').html('上传图片')
    $('.Addmodifiedkeywords').css('display', 'block')
}
/*----------------取消编辑、添加关键词回复关闭--------------*/
$scope.closeAddmodifiedkeywords = function () {
    editreplyBy = false
    addreplyBy = false
    $('.Addmodifiedkeywords').css('display', 'none')
    $('.Addmodifiedkeywords-body-first-inpuit-imporant').val('')
    $('.Addmodifiedkeywords-body-three-text').val('')
    $('.Addmodifiedkeywords-body-three-upImg-text').html('上传图片')
    $('.last-Img').attr('src', '')
    $rootScope.pic1 = ''
    $rootScope.AutoreplyById = ''
}

/*------------获取所有标签组及其子标签------------*/
function GetAllTags() {
    $http({
        method: 'POST',
        url: $rootScope.link + "/tag/getTwoTagss",
        data: '',
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $rootScope.SetUpTagGroup = response.data;
        }
    });
}

GetAllTags()
''
/*------------编辑标签组------------*/
$scope.editSetUpTags = function (e, event) {
    $('.writeNewTag').css('display', 'none')
    $('.writeNewTag-title-write').val('')
    $(event.target).parent().parent().parent().parent().siblings().find('button[class^="SettingInterface-body-second-body-edit"]').attr('data', 0).html('编辑').parent().prev().prev().find('input').attr('readonly', 'readonly').blur().css({
        'border': '1px solid transparent',
        'background-color': 'transparent'
    });
    var newname = $(event.target).parent().prev().prev().find('input').val()
    if ($(event.target).attr('data') == 0) {
        $(event.target).html('保存')
        $(event.target).parent().prev().prev().find('input').removeAttr('readonly').focus().css({
            'border': '1px solid #d6d3d3',
            'background-color': '#ffffff'
        });
        $(event.target).attr('data', '1')
    } else {
        var newname1 = $(event.target).parent().prev().prev().find('input').val()
        var aa = new FormData()
        aa.append('description', '')
        aa.append('id', e)
        aa.append('tagname', newname1)
        $http({
            method: 'POST',
            url: $rootScope.link + "/tag/modifyTagsById",
            data: aa,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $(event.target).html('编辑')
                $(event.target).parent().prev().prev().find('input').attr('readonly', 'readonly').blur().css({
                    'border': '1px solid transparent',
                    'background-color': 'transparent'
                });
                $(event.target).attr('data', 0)
                GetAllTags()
            }
        });
    }
}
/*------------编辑单标签------------*/
$scope.editSetUpTagsChild = function (e, event) {
    $('.writeNewTag').css('display', 'none')
    $('.writeNewTag-title-write').val('')
    $(event.target).parent().parent().parent().parent().siblings().find('button[class^="SettingInterface-body-second-body-edit-child"]').attr('data', 0).html('编辑').parent().prev().prev().find('input').removeAttr('readonly', 'readonly').blur().css({
        'border': '1px solid transparent',
        'background-color': 'transparent'
    });
    $(event.target).parent().parent().parent().siblings().find('button[class^="SettingInterface-body-second-body-edit-child"]').attr('data', 0).html('编辑').parent().prev().prev().find('input').attr('readonly', 'readonly').blur().css({
        'border': '1px solid transparent',
        'background-color': 'transparent'
    });
    var newname = $(event.target).parent().prev().prev().find('input').val()
    if ($(event.target).attr('data') == 0) {
        $(event.target).html('保存')
        $(event.target).parent().prev().prev().find('input').removeAttr('readonly').focus().css({
            'border': '1px solid #d6d3d3',
            'background-color': '#ffffff'
        });
        $(event.target).attr('data', '1')
    } else {
        var newname1 = $(event.target).parent().prev().prev().find('input').val()
        var aa = new FormData()
        aa.append('description', '')
        aa.append('id', e)
        aa.append('tagname', newname1)
        $http({
            method: 'POST',
            url: $rootScope.link + "/tag/modifyTagById",
            data: aa,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $(event.target).html('编辑')
                $(event.target).parent().prev().prev().find('input').attr('readonly', 'readonly').blur().css({
                    'border': '1px solid transparent',
                    'background-color': 'transparent'
                });
                $(event.target).attr('data', 0)
                GetAllTags()
            }
        });
    }
}
/*---------------打开输入新标签提示框---------------*/
var AddTagsGroupId
$scope.editSetUpAddTags = function (e) {
    AddTagsGroupId = e
    $('.writeNewTag').css('display', 'block')
    $('.writeNewTag-title-write').val('')
}
/*------------关闭输入新标签----------*/
$scope.closewriteNewTag = function () {
    $('.writeNewTag-title-write-error').css('display', 'none')
    $('.writeNewTag').css('display', 'none')
    $('.writeNewTag-title-write').val('')
}
/*---------------打开输入新标签组提示框---------------*/
$scope.openAddGroup = function () {
    $('.writeNewTag1-title-write').val('')
    $('.writeNewTag1').css('display', 'block')
}
/*------------关闭输入新标签组提示框----------*/
$scope.closewriteNewTagGroup = function () {
    $('.writeNewTag-title-write-error1').css('display', 'none')
    $('.writeNewTag1').css('display', 'none')
    $('.writeNewTag1-title-write').val('')
}
/*------------确认新增新标签----------*/
$scope.sureNewTag = function () {
    $('.writeNewTag1').css('display', 'none')
    $('.writeNewTag1-title-write').val('')
    var aa = $('.writeNewTag-title-write').val()
    var bb = new FormData()
    bb.append('id', AddTagsGroupId)
    bb.append('tagname', aa)
    $http({
        method: 'POST',
        url: $rootScope.link + "/tag/addTag",
        data: bb,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $('.writeNewTag').css('display', 'none')
            $('.writeNewTag-title-write').val('')
            GetAllTags()
            $('.writeNewTag-title-write-error').css('display', 'none')
        } else {
            $('.writeNewTag-title-write-error').css('display', 'block')
        }
    });
}
/*------------确认新增新标签组----------*/
$scope.surewriteNewTagGroup = function () {
    $('.writeNewTag').css('display', 'none')
    $('.writeNewTag-title-write').val('')
    var aa = $('.writeNewTag1-title-write').val()
    var bb = new FormData()
    bb.append('id', AddTagsGroupId)
    bb.append('tagname', aa)
    $http({
        method: 'POST',
        url: $rootScope.link + "/tag/addTags",
        data: bb,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $('.writeNewTag1').css('display', 'none')
            $('.writeNewTag1-title-write').val('')
            $('.writeNewTag-title-write-error1').css('display', 'none')
            GetAllTags()
        } else {
            $('.writeNewTag-title-write-error1').css('display', 'block')
        }
    });
}
/*--------------删除标签标签组--------------*/
$scope.deltSetUpTags = function (e) {
    $('.writeNewTag').css('display', 'none')
    $('.writeNewTag-title-write').val('')
    var bb = new FormData()
    bb.append('id', e)
    $http({
        method: 'POST',
        url: $rootScope.link + "/tag/deleteTag",
        data: bb,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            GetAllTags()
        } else {
        }
    });
}

/*-----------获取所有分组---------*/
function Getallthegroups() {
    $http({
        method: 'POST',
        url: $rootScope.link + "/groups/getGroups",
        data: '',
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $rootScope.SetUpallthegroups = response.data.groupList;
        }
    });
}

Getallthegroups()
var lastname1

/*-------------修改分组名称----------*/
$scope.editAllGroupName = function (e, event) {
    $(event.target).parent().parent().siblings().find('button[class^="SettingInterface-body-three-body-con-btn-edit"]').attr('disabled', 'disabled').css
    ({'color': 'grey',})

    $(event.target).parent().parent().siblings().find('button[class^="SettingInterface-body-three-body-con-btn-del"]').attr('disabled', 'disabled').css
    ({'color': 'grey',})
    $(event.target).next().attr('disabled', 'disabled').css({'color': 'grey',})
    if ($(event.target).attr('data') == 0) {
        lastname1 = $(event.target).parent().prev().prev().find('input').val()
        $(event.target).html('保存')
        $(event.target).attr('data', 1)
        $(event.target).parent().prev().prev().find('input').removeAttr('readonly').focus().css({
            'border': '1px solid #d6d3d3',
            'background-color': '#ffffff'
        });
    } else {
        var newname1 = $(event.target).parent().prev().prev().find('input').val()
        if (newname1 === lastname1) {
            $(event.target).html('编辑')
            $(event.target).attr('data', 0)
            $(event.target).parent().prev().prev().find('input').attr('readonly', 'readonly').blur().css({
                'border': '1px solid transparent',
                'background-color': 'transparent'

            });
            $(event.target).parent().prev().prev().prev().find('span[class^="three-body-tishi"]').css('display', 'none')
            $(event.target).parent().parent().siblings().find('button[class^="SettingInterface-body-three-body-con-btn-edit"]').removeAttr('disabled').css
            ({'color': '#44baf6',})
            $(event.target).parent().parent().siblings().find('button[class^="SettingInterface-body-three-body-con-btn-del"]').removeAttr('disabled').css
            ({'color': '#44baf6',})
            $(event.target).next().removeAttr('disabled').css({'color': '#44baf6',})
        } else {
            var aa = new FormData()
            aa.append('description', '')
            aa.append('id', e)
            aa.append('name', newname1)
            $http({
                method: 'POST',
                url: $rootScope.link + "/groups/modifyGroupById",
                data: aa,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $(event.target).parent().parent().siblings().find('button[class^="SettingInterface-body-three-body-con-btn-edit"]').removeAttr('disabled').css
                    ({'color': '#44baf6',})
                    $(event.target).parent().parent().siblings().find('button[class^="SettingInterface-body-three-body-con-btn-del"]').removeAttr('disabled').css
                    ({'color': '#44baf6',})
                    $(event.target).next().removeAttr('disabled').css({'color': '#44baf6',})
                    $(event.target).html('编辑')
                    $(event.target).attr('data', 0)
                    $(event.target).parent().prev().prev().find('input').attr('readonly', 'readonly').blur().css({
                        'border': '1px solid transparent',
                        'background-color': 'transparent'
                    });
                    $(event.target).parent().prev().prev().prev().find('span[class^="three-body-tishi"]').css('display', 'none')
                    Getallthegroups()

                } else {
                    $(event.target).parent().prev().prev().prev().find('span[class^="three-body-tishi"]').css('display', 'inline-block')
                    $(event.target).parent().prev().prev().find('input').val(lastname1)
                }
            })
        }
    }
}
/*------------打开新增分组界面----------*/
$scope.openAddGroup1 = function () {
    $('.writeNewTag2-title-write').val('')
    $('.writeNewTag2').css('display', 'block')
    $('.writeNewTag2-title-write-error1').css('display', 'none').html('新分组已存在！')
}
/*------------关闭新增分组界面----------*/
$scope.closewriteNewAddGroup = function () {
    $('.writeNewTag2-title-write').val('')
    $('.writeNewTag2').css('display', 'none')
    $('.writeNewTag2-title-write-error1').css('display', 'none').html('新分组已存在！')
}
/*------------确认新增分组发出请求----------*/
$scope.surewriteNewAddGroup = function () {
    var newname1 = $('.writeNewTag2-title-write').val()
    if (newname1 == '') {
        $('.writeNewTag2-title-write-error1').css('display', 'block').html('分组名不能为空!')
    } else {
        $('.writeNewTag2-title-write-error1').css('display', 'none').html('新分组已存在！')
        var aa = new FormData()
        aa.append('description', '')
        aa.append('name', newname1)
        $http({
            method: 'POST',
            url: $rootScope.link + "/groups/addGroup",
            data: aa,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {

                $('.writeNewTag2-title-write-error1').css('display', 'none').html('新分组已存在！')
                $('.writeNewTag2-title-write').val('')
                $('.writeNewTag2').css('display', 'none')
                Getallthegroups()
            } else {
                $('.writeNewTag2-title-write-error1').css('display', 'block').html('新分组已存在！')
            }
        })
    }
}
/*------------点击删除的单个分组-----------*/
var OneGroupId
$scope.DelAllGroupName = function (e) {
    OneGroupId = e
    $('.sure-del-1').css('display', 'block')
}
$scope.closePage3suredel = function () {
    $('.sure-del-1').css('display', 'none')

}
$scope.surePage3delThisdata = function () {
    var aa = new FormData()
    aa.append('id', OneGroupId)
    $http({
        method: 'POST',
        url: $rootScope.link + "/groups/deleteGroupById",
        data: aa,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $('.sure-del-1').css('display', 'none')
            Getallthegroups()
        }
    })
}

/*----------获取所有快捷短语设置----------*/
function GetShortcutphrasegroups() {
    $http({
        method: 'POST',
        url: $rootScope.link + "/script/getTwoScripts",
        data: '',
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $scope.AllShortcutphrasegroups = response.data;
            if (response.data == [] || response.data.length == 0) {
                $scope.oneShortcutphrasegroups = []
                $scope.page4FastChoseId = []
            } else {
                $scope.oneShortcutphrasegroups = response.data[0].scripts;
                $scope.page4FastChoseId = response.data[0].title.id
            }
            setTimeout(function () {
                $('.SettingInterface-body-Four-title ul').eq(0).find('input').css('color', '#44baf6')
            }, 500)

        }
    });
}

GetShortcutphrasegroups()
$scope.splitSayName = function (e) {
    var a = ''
    if (e.length > 6) {
        a = e.slice(0, 6) + '...'
    } else {
        a = e
    }
    return a
}
$scope.splitSayName1 = function (e) {
    var a = ''
    if (e.length > 9) {
        a = e.slice(0, 9) + '...'
    } else {
        a = e
    }
    return a
}
/*-------------选择相关快捷短语组得到快捷短语-----------*/
$scope.SwitchingShortcutphrase = function (e, event) {
    $scope.page4FastChoseId = e
    var aa = new FormData()
    aa.append('id', e)
    $http({
        method: 'POST',
        url: $rootScope.link + "/script/getScriptByParentId",
        data: aa,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $scope.oneShortcutphrasegroups = response.data.scriptList
            $(event.target).css('color', '#44baf6').parent().parent().siblings().find('input').css('color', '#404040')
        }
    });
}
/*------------编辑快捷短语组------------*/
var fastSayCon
$scope.editbodyFourTitle = function (e, event) {
    $('.writeNewTag3').css('display', 'none');
    $(event.target).parent().parent().siblings().find('button[class^="edit-body-Four-Title"]').attr('disabled', 'disabled').css({'color': 'grey',})
    $(event.target).parent().parent().siblings().find('button[class^="del-tbody-Four-Title"]').attr('disabled', 'disabled').css({'color': 'grey',})
    $(event.target).next().attr('disabled', 'disabled').css({'color': 'grey',})
    $(event.target).next().next().css('display', 'none')
    if ($(event.target).attr('data') == 0) {
        fastSayCon = $(event.target).prev().val()
        $(event.target).html('保存').prev().removeAttr('readonly').focus().css({
            'border': '1px solid #d6d3d3',
            'background-color': '#ffffff'
        });
        $(event.target).attr('data', 1)
    } else {
        var bb = $(event.target).prev().val()
        if (fastSayCon === bb) {
            $(event.target).html('编辑').prev().attr('readonly', 'readonly').blur().css({
                'border': '1px solid transparent',
                'background-color': 'transparent'
            });
            $(event.target).attr('data', 0)
            $(event.target).parent().parent().siblings().find('button[class^="edit-body-Four-Title"]').removeAttr('disabled').css({'color': '#44baf6'})
            $(event.target).parent().parent().siblings().find('button[class^="del-tbody-Four-Title"]').removeAttr('disabled').css({'color': '#44baf6'})
            $(event.target).next().removeAttr('disabled').css({'color': '#44baf6'})
            $(event.target).next().next().css('display', 'none')
        } else {
            var aa = new FormData()
            aa.append('id', e)
            aa.append('title', bb)
            $http({
                method: 'POST',
                url: $rootScope.link + "/script/modifyScriptsById",
                data: aa,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $(event.target).attr('data', 0)
                    $(event.target).html('编辑').prev().attr('readonly', 'readonly').blur().css({
                        'border': '1px solid transparent',
                        'background-color': 'transparent'
                    });
                    $(event.target).parent().parent().siblings().find('button[class^="edit-body-Four-Title"]').removeAttr('disabled').css({'color': '#44baf6'})
                    $(event.target).parent().parent().siblings().find('button[class^="del-tbody-Four-Title"]').removeAttr('disabled').css({'color': '#44baf6'})
                    $(event.target).next().removeAttr('disabled').css({'color': '#44baf6'})
                    $(event.target).next().next().css('display', 'none')
                    GetShortcutphrasegroups()
                } else {
                    $(event.target).next().next().css('display', 'block')
                    $(event.target).prev().val(fastSayCon)
                }
            });
        }

    }

}

/*-------------------删除快捷短分组单个分组------------------*/
$scope.deltbodyFourTitle = function (e) {
    $('.writeNewTag3').css('display', 'none');
    var aa = new FormData()
    aa.append('id', e)
    $http({
        method: 'POST',
        url: $rootScope.link + "/script/deleteScriptsById",
        data: aa,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            GetShortcutphrasegroups()
            $('.SettingInterface-body-Four-title ul').eq(0).find('input').css('color', '#44baf6').parent().parent().siblings().find('input').css('color', '#404040')
        }
    })
}
/*-------------------删除快捷短语单个短语------------------*/
$scope.DelAllGroupName1 = function (e) {
    $('.writeNewTag3').css('display', 'none');
    var aa = new FormData()
    aa.append('id', e)
    $http({
        method: 'POST',
        url: $rootScope.link + "/script/deleteScriptsById",
        data: aa,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            var bb = new FormData()
            bb.append('id', $scope.page4FastChoseId)
            $http({
                method: 'POST',
                url: $rootScope.link + "/script/getScriptByParentId",
                data: bb,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $scope.oneShortcutphrasegroups = response.data.scriptList
                }
            });
        }
    })
}
/*-----------------编辑单个短语----------------*/
var fastSayCon1
$scope.editAllGroupName1 = function (e, q, w, event) {
    $('.writeNewTag3').css('display', 'none');
    $(event.target).parent().parent().siblings().find('button[class^="editAllGroupName1-1"]').attr('disabled', 'disabled').css({'color': 'grey',})
    $(event.target).parent().parent().siblings().find('button[class^="SettingInterface-body-three-body-con-btn-del"]').attr('disabled', 'disabled').css({'color': 'grey',})
    $(event.target).next().attr('disabled', 'disabled').css({'color': 'grey',})
    $(event.target).parent().prev().prev().prev().find('span[class^="SettingInterface-body-Four-table-body-error"]').css('display', 'none')
    if ($(event.target).attr('data') == 0) {
        fastSayCon1 = $(event.target).parent().prev().prev().find('input').val()
        $(event.target).html('保存').parent().prev().prev().find('input').removeAttr('readonly').focus().css({
            'border': '1px solid #d6d3d3',
            'background-color': '#ffffff'
        });
        $(event.target).attr('data', 1)
    } else {
        var bb = $(event.target).parent().prev().prev().find('input').val()
        if (fastSayCon1 === bb) {
            $(event.target).html('编辑').parent().prev().prev().find('input').attr('readonly', 'readonly').blur().css({
                'border': '1px solid transparent',
                'background-color': 'transparent'
            });
            $(event.target).attr('data', 0)
            $(event.target).parent().parent().siblings().find('button[class^="editAllGroupName1-1"]').removeAttr('disabled').css({'color': '#44baf6'})
            $(event.target).parent().parent().siblings().find('button[class^="SettingInterface-body-three-body-con-btn-del"]').removeAttr('disabled').css({'color': '#44baf6'})
            $(event.target).next().removeAttr('disabled').css({'color': '#44baf6'})
            $(event.target).parent().prev().prev().prev().find('span[class^="SettingInterface-body-Four-table-body-error"]').css('display', 'none')
        } else {
            var aa = new FormData()
            aa.append('id', e)
            aa.append('content', bb)
            aa.append('parentid', q)
            $http({
                method: 'POST',
                url: $rootScope.link + "/script/modifyScriptById",
                data: aa,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $(event.target).attr('data', 0)
                    $(event.target).html('编辑').parent().prev().prev().find('input').attr('readonly', 'readonly').blur().css({
                        'border': '1px solid transparent',
                        'background-color': 'transparent'
                    });
                    $(event.target).parent().parent().siblings().find('button[class^="editAllGroupName1-1"]').removeAttr('disabled').css({'color': '#44baf6'})
                    $(event.target).parent().parent().siblings().find('button[class^="SettingInterface-body-three-body-con-btn-del"]').removeAttr('disabled').css({'color': '#44baf6'})
                    $(event.target).next().removeAttr('disabled').css({'color': '#44baf6'})
                    $(event.target).parent().prev().prev().prev().find('span[class^="SettingInterface-body-Four-table-body-error"]').css('display', 'none')
                    var bb = new FormData()
                    bb.append('id', $scope.page4FastChoseId)
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/script/getScriptByParentId",
                        data: bb,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        if (response.code == 200) {
                            $scope.oneShortcutphrasegroups = response.data.scriptList
                        }
                    });
                } else {
                    $(event.target).parent().prev().prev().prev().find('span[class^="SettingInterface-body-Four-table-body-error"]').css('display', 'block')
                    $(event.target).parent().prev().prev().find('input').val(fastSayCon1)
                }
            });
        }

    }

}
/*-----------------快捷短语删除短语分组--------------------*/
$scope.deltbodyFourTitle = function (e, q) {
    var bb = new FormData()
    bb.append('id', e)
    bb.append('title', q)
    $http({
        method: 'POST',
        url: $rootScope.link + "/script/deleteScriptsById",
        data: bb,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            GetShortcutphrasegroups()
        }
    })
}
/*------------------添加短语页面打开-----------------*/
$scope.openAddGroup2 = function () {
    $('.writeNewTag3').css('display', 'block');
    $('.writeNewTag3-title-write').val('')
    $('.writeNewTag3-title-write-error1').css('display', 'none').html('新短语已存在！')
}
/*------------------添加短语页面关闭-----------------*/
$scope.closewriteNewAddGroup1 = function () {
    $('.writeNewTag3').css('display', 'none');
    $('.writeNewTag3-title-write').val('')
    $('.writeNewTag3-title-write-error1').css('display', 'none').html('新短语已存在！')
}
/*------------------确认添加短语-----------------*/
$scope.surewriteNewAddGroup1 = function () {
    var aa = $('.writeNewTag3-title-write').val()
    if (aa == '') {
        $('.writeNewTag3-title-write-error1').css('display', 'block').html('短语不能为空')
    } else if ($scope.page4FastChoseId == undefined || $scope.page4FastChoseId == null || $scope.page4FastChoseId == '') {
        $('.writeNewTag3-title-write-error1').css('display', 'block').html('请创建短语分组')
    } else {
        var bb = new FormData()
        bb.append('id', $scope.page4FastChoseId)
        bb.append('content', aa)
        $http({
            method: 'POST',
            url: $rootScope.link + "/script/addScript",
            data: bb,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $('.writeNewTag3').css('display', 'none');
                var cc = new FormData()
                cc.append('id', $scope.page4FastChoseId)
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/script/getScriptByParentId",
                    data: cc,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    if (response.code == 200) {
                        $scope.oneShortcutphrasegroups = response.data.scriptList
                    }
                });
            } else {
                $('.writeNewTag3-title-write-error1').css('display', 'block').html('新短语已存在！')
            }

        })
    }
}


/*------------------添加短语页面打开-----------------*/
$scope.openAddGroup3 = function () {
    $('.writeNewTag4').css('display', 'block');
    $('.writeNewTag4-title-write').val('')
    $('.writeNewTag4-title-write-error1').css('display', 'none').html('新分组已存在！')
}
/*------------------添加短语页面关闭-----------------*/
$scope.closewriteNewAddGroup2 = function () {
    $('.writeNewTag4').css('display', 'none');
    $('.writeNewTag4-title-write').val('')
    $('.writeNewTag4-title-write-error1').css('display', 'none').html('新分组已存在！')
}

/*------------------确认添加新快捷短语分组-----------------*/
$scope.surewriteNewAddGroup2 = function () {
    var aa = $('.writeNewTag4-title-write').val()
    if (aa == '') {
        $('.writeNewTag4-title-write-error1').css('display', 'block').html('分组不能为空')
    } else {
        var bb = new FormData()
        bb.append('title', aa)
        $http({
            method: 'POST',
            url: $rootScope.link + "/script/addScripts",
            data: bb,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $('.writeNewTag4').css('display', 'none');
                $('.writeNewTag4-title-write').val('')
                $('.writeNewTag4-title-write-error1').css('display', 'none').html('新分组已存在！')
                GetShortcutphrasegroups()

            } else {
                $('.writeNewTag4-title-write-error1').css('display', 'block').html('新分组已存在！')
            }

        })
    }
}
/*-------------下载快捷短语模板-------------*/
$scope.Downloadtemplate = function () {
    $http.get($rootScope.link + '/script/downfile').success(function (data) {
        if (data.code == 200) {

        }
    })
}
$scope.openAddGroup4 = function () {
    $scope.upFile1 = ''
    $('.Importphrase-con-second-donwload-input').val('')
    $('.Importphrase').css('display', 'block')
    $('.exselTextGra1').html('文件名')
    $('.exselTextGray1').html('0kb')
    $('.Importphrase-con-second-donwload-null').css('display', 'none').html(' 请上传文件')
}
$scope.closeAddGroup4 = function () {
    $('.Importphrase-con-second-donwload-input').val('')
    $scope.upFile1 = ''
    $('.Importphrase-con-second-donwload-null').css('display', 'none').html(' 请上传文件')
    $('.Importphrase').css('display', 'none')
    $('.exselTextGra1').html('文件名')
    $('.exselTextGray1').html('0kb')
}
$scope.Startimporting = function () {
    if ($scope.upFile1 == '') {
        $('.Importphrase-con-second-donwload-null').css('display', 'block').html(' 请上传文件！')
    } else {
        var aa = new FormData()
        aa.append('file', $scope.upFile1)
        $http({
            method: 'POST',
            url: $rootScope.link + "/script/uploading",
            data: aa,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {

            if (response.code == 200) {
                $('.Importphrase').css('display', 'none')
                $('.Importphrase-con-second-donwload-input').val('')
                $('.Importphrase-con-second-donwload-null').css('display', 'none').html(' 请上传文件！')
                GetShortcutphrasegroups()
            } else {
                $('.Importphrase-con-second-donwload-null').css('display', 'block').html('上传文件出错！')
            }
        })
    }

}
/*-----------------打开设置-------------------*/
$rootScope.SetupClick = function (e) {
    $('.Mongolialayer').css('display', 'block')
    if (e == 1) {
        if ($('.SettingInterface-body-first-off').attr('data') == 1) {
            $('.SettingInterface-body-first-off').css({'background': 'url("./images/off-1.png") center no-repeat'})
        } else {
            $('.SettingInterface-body-first-off').css({'background': 'url("./images/open-1.png") center no-repeat'})
        }
        $('.page1-Maindiv1-group').attr('data', 0)
        $rootScope.Setup = false
        $('.SettingInterface').css('display', 'block');
        $('.SettingInterface-body-first-table').css('display', 'block');
        $('.SettingInterface-body-second-table').css('display', 'none');
        $('.SettingInterface-body-three-table').css('display', 'none');
        $('.SettingInterface-body-Four-table').css('display', 'none');
        $('.SettingInterface-body-Five-table').css('display', 'none')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable1-click.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable2.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable3.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable4.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable5.png") center no-repeat');
    } else if (e == 2) {
        $('.page1-Maindiv1-group').attr('data', 0)
        $('.SettingInterface-body-first-table').css('display', 'none')
        $('.SettingInterface-body-second-table').css('display', 'block')
        $('.SettingInterface-body-three-table').css('display', 'none')
        $('.SettingInterface-body-Four-table').css('display', 'none')
        $('.SettingInterface-body-Five-table').css('display', 'none')
        $rootScope.Setup = false
        $('.SettingInterface').css('display', 'block')
        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable2-click.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable1.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable3.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable5.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable4.png") center no-repeat');
    } else if (e == 3) {
        $('.page1-Maindiv1-group').attr('data', 0)
        $('.SettingInterface-body-first-table').css('display', 'none')
        $('.SettingInterface-body-second-table').css('display', 'none')
        $('.SettingInterface-body-three-table').css('display', 'block')
        $('.SettingInterface-body-Four-table').css('display', 'none')
        $('.SettingInterface-body-Five-table').css('display', 'none')
        $rootScope.Setup = false
        $('.SettingInterface').css('display', 'block')
        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable3-click.png") center no-repeat')

        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable2.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable1.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable4.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable5.png") center no-repeat');
    } else if (e == 4) {
        $('.page1-Maindiv1-group').attr('data', 0)
        $rootScope.Setup = false
        $('.SettingInterface-body-first-table').css('display', 'none')
        $('.SettingInterface-body-second-table').css('display', 'none')
        $('.SettingInterface-body-three-table').css('display', 'none')
        $('.SettingInterface-body-Five-table').css('display', 'none')
        $('.SettingInterface-body-Four-table').css('display', 'block')
        $('.SettingInterface').css('display', 'block')
        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable4-click.png") center no-repeat')

        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable3.png") center no-repeat')

        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable2.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable1.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable5.png") center no-repeat');
    } else {
        $('.page1-Maindiv1-group').attr('data', 0)
        $('.SettingInterface-body-first-table').css('display', 'none')
        $('.SettingInterface-body-second-table').css('display', 'none')
        $('.SettingInterface-body-three-table').css('display', 'none')
        $('.SettingInterface-body-Four-table').css('display', 'none')
        $('.SettingInterface-body-Five-table').css('display', 'block')
        $rootScope.Setup = false
        $('.SettingInterface').css('display', 'block')
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable5-click.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable1.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable3.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable4.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable2.png") center no-repeat');
    }
}
$scope.closeSettingInterface = function () {
    $('.SettingInterface').css('display', 'none');
    $('.Mongolialayer').css('display', 'none')
}
$rootScope.ettingInterfaceswith = function (e) {
    if (e == 1) {
        if ($('.SettingInterface-body-first-off').attr('data') == 1) {
            $('.SettingInterface-body-first-off').css({'background': 'url("./images/off-1.png") center no-repeat'})
        } else {
            $('.SettingInterface-body-first-off').css({'background': 'url("./images/open-1.png") center no-repeat'})
        }
        $('.SettingInterface-body-first-table').css('display', 'block');

        $('.SettingInterface-body-second-table').css('display', 'none');
        $('.SettingInterface-body-three-table').css('display', 'none');
        $('.SettingInterface-body-Four-table').css('display', 'none');
        $('.SettingInterface-body-Five-table').css('display', 'none')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable1-click.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable2.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable3.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable5.png") center no-repeat');

        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable4.png") center no-repeat');
    } else if (e == 2) {
        $('.SettingInterface-body-first-table').css('display', 'none')
        $('.SettingInterface-body-second-table').css('display', 'block')
        $('.SettingInterface-body-three-table').css('display', 'none')
        $('.SettingInterface-body-Four-table').css('display', 'none')
        $('.SettingInterface-body-Five-table').css('display', 'none')
        $('.SettingInterface').css('display', 'block')
        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable2-click.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable1.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable3.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable4.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable5.png") center no-repeat');

        GetAllTags()
    } else if (e == 3) {

        $('.page1-Maindiv1-group').attr('data', 0)
        $('.SettingInterface-body-first-table').css('display', 'none')
        $('.SettingInterface-body-second-table').css('display', 'none')
        $('.SettingInterface-body-three-table').css('display', 'block')
        $('.SettingInterface-body-Five-table').css('display', 'none')
        $('.SettingInterface-body-Four-table').css('display', 'none')
        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable3-click.png") center no-repeat')

        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable2.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable1.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable4.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable5.png") center no-repeat');

        Getallthegroups()
    } else if (e == 4) {

        $('.SettingInterface-body-first-table').css('display', 'none')
        $('.SettingInterface-body-second-table').css('display', 'none')
        $('.SettingInterface-body-three-table').css('display', 'none')
        $('.SettingInterface-body-Five-table').css('display', 'none')
        $('.SettingInterface-body-Four-table').css('display', 'block')
        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable4-click.png") center no-repeat')

        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable3.png") center no-repeat')

        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable2.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable1.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable5.png") center no-repeat');
        GetShortcutphrasegroups()
    } else {
        $('.SettingInterface-body-first-table').css('display', 'none')
        $('.SettingInterface-body-second-table').css('display', 'none')
        $('.SettingInterface-body-three-table').css('display', 'none')
        $('.SettingInterface-body-Four-table').css('display', 'none')
        $('.SettingInterface-body-Five-table').css('display', 'block')
        $('.SettingInterface-body-swith ul li').eq(4).css('color', '#44baf6').find('span').css('background', ' url("../images/setUpTable5-click.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(2).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable3.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(1).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable2.png") center no-repeat')
        $('.SettingInterface-body-swith ul li').eq(0).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable1.png") center no-repeat');
        $('.SettingInterface-body-swith ul li').eq(3).css('color', '#202020').find('span').css('background', ' url("../images/setUpTable4.png") center no-repeat');
    }
}

$('.chat-bottom-con-smile').mouseover(function () {
    $('.chat-bottom-con-smile-Explain').css('display', 'inline-block')
})
$('.chat-bottom-con-smile').mouseout(function () {
    $('.chat-bottom-con-smile-Explain').css('display', 'none')
})
$('.image-upfile').mouseover(function () {
    $('.chat-bottom-con-upimg-Explain').css('display', 'inline-block')
})
$('.image-upfile').mouseout(function () {
    $('.chat-bottom-con-upimg-Explain').css('display', 'none')
})
$('.chat-top-totop').mouseover(function () {
    if ($(this).attr('data') == 1) {
        $('.chat-top-totop-Explain').html('取消置顶')
    } else {
        $('.chat-top-totop-Explain').html('置顶')
    }
    $('.chat-top-totop-Explain').css('display', 'inline-block')
})
$('.chat-top-totop').mouseout(function () {
    $('.chat-top-totop-Explain').css('display', 'none')
})

/*------------------关闭图片预览--------------------*/
$rootScope.close_img_wrp = function () {
    $('.J_Preview').css('display', 'none')
    $('#img_preview').attr('src', '')
}
/*------------------图片放大预览--------------------*/
$(document).on('click', '.bigPicture', function () {
    var imgId = $(this).attr('data')
    var imgsocialNumber = $(this).attr('data1')
    $('.J_Preview').css('display', 'block')
    $('.load-waite-img-big').css('display', 'block')
    $('#img_preview').attr('src', $(this).find('img[class^="up-Img-Add"]').attr('src'))
    var aa = new FormData()
    aa.append('msgId', imgId)
    aa.append('accountName', $rootScope.localUserName)
    aa.append('socialnumber', imgsocialNumber)
    $http({
        method: 'POST',
        url: $rootScope.link + "/message/getImgHDByMsgId",
        data: aa,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $('.load-waite-img-big').css('display', 'none')
            $('#img_preview').attr('src', response.data.imagePath)
        }
    })
})
$scope.Picture_preview = function (e) {
    // var imgId = $(this).attr('data')
    // var imgsocialNumber = $(this).attr('data1')
    $('.J_Preview').css('display', 'block')
    $('.load-waite-img-big').css('display', 'none')
    $('#img_preview').attr('src', e)
}
$(document).on('click', '.bigPicture1', function () {
    var imgId = $(this).attr('data-imgSrc')
    var imgsocialNumber = $(this).attr('data1')
    $('.J_Preview').css('display', 'block')
    $('.load-waite-img-big').css('display', 'none')
    $('#img_preview').attr('src', imgId)
})
/*--------------------修改当前社交号资料查询详细-------------------*/
$scope.asdpnn = function () {
    var aa = new FormData()
    aa.append('id', $rootScope.socialaccountId)
    $http({
        method: 'POST',
        url: $rootScope.link + "/socialaccount/getSocialaccountdetail",
        data: aa,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $rootScope.getSocialaccountdetailimg1 = response.data.profilePhoto
            response.data.profilePhoto = $rootScope.imgSrc + response.data.profilePhoto
            $scope.getSocialaccountdetail = response.data
            $scope.getSocialaccountdetaildeviceId = response.data.deviceId
            $scope.getSocialaccountdetailSex = ''
            $scope.getSocialaccountdetailSex = response.data.sex
            if ($scope.getSocialaccountdetailSex == 1) {
                $('.personaldata-data-con-myself-3-span').html('男')
            } else if ($scope.getSocialaccountdetailSex == 2) {
                $('.personaldata-data-con-myself-3-span').html('女')
            } else {
                $('.personaldata-data-con-myself-3-span').html('未知')
            }
            $('.personaldata').css('display', 'block').focus()
            $('.personaldata-data-con-myself-1-input').val(response.data.nickName)

        }

    })
}
$scope.editPersonaldata = function (event) {
    var myData = $(event.target).attr('data')
    if (myData == 0) {
        $('.personaldata-data-con-myself-1-input').attr('disabled', false).css('border', '1px solid  #B5B5B5')
        $('.personaldata-data-con-myself-3-span').css('display', 'none')
        $('.personaldata-data-con-myself-3-select').css('display', 'inline-block')
        $('.personaldata-data-con-myself-5-textarea-whiteMeContent').attr("disabled", false).css('border', '1px solid  #B5B5B5')
        $('.edit-personaldata').html('完成')
        $(event.target).attr('data', 1)
    } else {
        var data1 = $('.personaldata-data-con-myself-1-input').val()
        var data2 = $('.personaldata-data-con-myself-5-textarea-whiteMeContent').val()
        var data3 = $('.personaldata-data-con-myself-3-select').val()
        var data4 = $('.personaldata-data-con-myself-3-select').find("option:selected").text()
        var aa = new FormData()
        aa.append('id', $rootScope.socialaccountId)
        aa.append('profilephoto', $scope.getSocialaccountdetailimg1)
        aa.append('nickname', data1)
        aa.append('sex', data3)
        aa.append('deviceId', $scope.getSocialaccountdetaildeviceId)
        aa.append('province', $scope.getSocialaccountdetail.province)
        aa.append('city', $scope.getSocialaccountdetail.city)
        aa.append('whatup', data2)
        aa.append('username', $rootScope.localUserName)
        $http({
            method: 'POST',
            url: $rootScope.link + "/socialaccount/modifySocialaccountById",
            data: aa,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $rootScope.WeChatowner[$rootScope.socialaccountId] = data1
                $(event.target).attr('data', 0)
                $('.personaldata-data-con-myself-1-input').attr('disabled', 'disabled').css('border', '1px solid transparent')
                $('.personaldata-data-con-myself-3-select').css('display', 'none')
                $('.personaldata-data-con-myself-3-span').html(data4).css('display', 'inline-block')
                $('.personaldata-data-con-myself-5-textarea-whiteMeContent').attr("disabled", 'disabled').css('border', '1px solid  transparent')
                $('.klk').html(data1)
                $('.newOptions').find('li[data-value^=' + $rootScope.socialaccountId + ']').html(data1)

                $('.edit-personaldata').html('修改资料').attr('data', 0)
                $('.personaldata').css('display', 'none')
            }
        })
    }
}

//     function bblur3() {
//         $('.personaldata-data-con-myself-1-input').attr('disabled', 'disabled').css('border', '1px solid transparent')
//         $('.personaldata-data-con-myself-3-select').css('display', 'none')
//         $('.personaldata-data-con-myself-3-span').css('display', 'inline-block')
//         $('.personaldata-data-con-myself-5-textarea-whiteMeContent').attr("disabled", 'disabled').css('border', '1px solid  transparent')
//         $('.edit-personaldata').html('修改资料').attr('data', 0)
//         $('.personaldata').css('display', 'none')
//     }
// $scope.targetLose=''
//     $scope.bblur = function () {
//         if ($scope.targetLose == 'personaldata_1' || $scope.targetLose == 'personaldata_2' || $scope.targetLose == 'personaldata_3' || $scope.targetLose == 'personaldata_4') {
//
//         } else {
//             $('.personaldata-data-con-myself-1-input').attr('disabled', 'disabled').css('border', '1px solid transparent')
//             $('.personaldata-data-con-myself-3-select').css('display', 'none')
//             $('.personaldata-data-con-myself-3-span').css('display', 'inline-block')
//             $('.personaldata-data-con-myself-5-textarea-whiteMeContent').attr("disabled", 'disabled').css('border', '1px solid  transparent')
//             $('.edit-personaldata').html('修改资料').attr('data', 0)
//             $('.personaldata').css('display', 'none')
//         }
//     }
$scope.personaldataclose = function () {
    $('.personaldata-data-con-myself-1-input').attr('disabled', 'disabled').css('border', '1px solid transparent')
    $('.personaldata-data-con-myself-3-select').css('display', 'none')
    $('.personaldata-data-con-myself-3-span').css('display', 'inline-block')
    $('.personaldata-data-con-myself-5-textarea-whiteMeContent').attr("disabled", 'disabled').css('border', '1px solid  transparent')
    $('.edit-personaldata').html('修改资料').attr('data', 0)
    $('.personaldata').css('display', 'none')
}
/*-------------------------群成员添加或发起对话及其添加好友操作-------------------------*/
$scope.addOrSend = function (e, q, w, event, t) {
    /*----------与当前群成员好友发起会话--------*/
    if (e == 1) {
        var ThisCid = $rootScope.WeChatownersocialNumber[$rootScope.socialaccountId] + ',' + q
        var ThisId = ''
        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
        var firstIndex = 0;
        var firstTop = 0;
        var firstThis = '';
        var firstIndex1 = 0;
        var firstTop1 = 0;
        var firstThis1 = '';
        var firstIndex2 = 0;
        var firstTop2 = 0;
        var firstThis2 = '';
        var firstIshave = false;
        var firstIshave1 = false;
        var ThisSolId = ''
        var ThisSolTopNumber = 0
        var ThisSolTopNumber1 = 0
        for (var i = 0; i < $rootScope.Chatwithfriends[-1].length; i++) {
            if ($rootScope.Chatwithfriends[-1][i].cid == ThisCid) {
                firstIndex = i;
                firstThis = $rootScope.Chatwithfriends[-1][i]
                firstIshave = true
                ThisSolId = $rootScope.Chatwithfriends[-1][i].socialaccountId
            }
            if ($rootScope.Chatwithfriends[-1][i].topNumber == 1) {
                firstTop++
            }
        }
        for (var i = 0; i < $rootScope.Chatwithfriends[$rootScope.lplplpl].length; i++) {
            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid == ThisCid) {
                firstIndex1 = i;
                firstThis1 = $rootScope.Chatwithfriends[$rootScope.lplplpl][i]
                ThisSolId = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].socialaccountId
                firstIshave1 = true
                ThisSolTopNumber = $rootScope.Chatwithfriends[-1][i].topNumber
            }
            if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].topNumber == 1) {
                firstTop1++;
            }
        }
        if (ThisSolId == '') {
            var sendFlie = new FormData()
            sendFlie.append('Cid', ThisCid)
            sendFlie.append('accountId', $rootScope.myaccountId)
            $http({
                method: 'POST',
                url: $rootScope.link + "/latelychat/getContactByNumber",
                data: sendFlie,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (data) {
                if (data.code == 200) {
                    var elc = ''

                    if (data.data.contactList.length > 1) {
                        data.data.contactList[1].profilePhoto = $rootScope.imgSrc + data.data.contactList[1].profilePhoto
                        ThisSolId = data.data.contactList[1].socialaccountId
                        elc = data.data.contactList[1]
                        ThisId = data.data.contactList[1].id
                    } else {
                        data.data.contactList[0].profilePhoto = $rootScope.imgSrc + data.data.contactList[0].profilePhoto
                        ThisSolId = data.data.contactList[0].socialaccountId
                        ThisId = data.data.contactList[0].id
                        elc = data.data.contactList[0]
                    }
                    for (var i = 0; i < $rootScope.Chatwithfriends[ThisSolId].length; i++) {
                        if ($rootScope.Chatwithfriends[ThisSolId][i].cid == ThisCid) {
                            firstIndex2 = i;
                            firstThis2 = $rootScope.Chatwithfriends[ThisSolId][i]
                        }
                        if ($rootScope.Chatwithfriends[ThisSolId][i].topNumber == 1) {
                            firstTop2++;
                        }
                    }
                    $rootScope.Chatwithfriends[ThisSolId].splice(firstTop2, 0, elc)
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, elc)
                    $scope.$watch(function () {
                        $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
                    })
                    $scope.MyFrienddata = new FormData()
                    $scope.MyFrienddata.append('socialaccountId', $rootScope.socialaccountId)
                    $scope.MyFrienddata.append('contactId', ThisId)
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/contact/getContactById",
                        data: $scope.MyFrienddata,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        if (response.code == 200) {
                            $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + ThisCid + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                            var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                            if (ArrLength > 50) {
                                ArrLength = 50
                            } else {

                            }
                            for (var i = 0; i < ArrLength; i++) {
                                var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                                if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                                }
                                if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                                    var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                                    if (bothingRead > 0) {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                                    } else {
                                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                    }

                                } else {
                                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                                }
                            }

                            $('.page1-Maindiv2-listInit').css('display', 'none')
                            $scope.page1Maindiv4Init = false
                            /*-------展示群组相关资料-----*/
                            $scope.Customerinformation = true
                            $scope.quickReply = false
                            $scope.customerRecord = false
                            $scope.page1Maindiv4Init = false
                            /*-------展示群组相关资料-----*/
                            $scope.Customerinformation = true
                            $scope.quickReply = false
                            $scope.customerRecord = false
                            /*-------展示好友相关资料-----*/
                            $scope.chatGroupOrFriend = 0
                            $scope.allCustomerList = false
                            $scope.myself = true
                            $scope.myself1 = false


                            $scope.chatName = response.data.nickName
                            $rootScope.chatId = response.data.cid
                            $rootScope.chatHead = $rootScope.WeChatownerHeader[response.data.socialaccountId]
                            $rootScope.Id = response.data.id;
                            $rootScope.socialaccountId = response.data.socialaccountId;
                            $rootScope.type = 0;
                            $rootScope.Topjudge = response.data.topNumber
                            if ($rootScope.Topjudge == 1) {
                                $('.chat-top-totop').css('background', 'url("./images/Canceltop.png") center no-repeat')
                                $('.chat-top-totop').attr('data', 1)
                            } else {
                                $('.chat-top-totop').css('background', 'url("./images/toTop.png") center no-repeat')
                                $('.chat-top-totop').attr('data', 0)
                            }
                            $scope.MyFrienddata1 = response.data
                            $('.change-name').html($rootScope.GetridoftheNbsp(response.data.noteName))
                            $rootScope.NameRecord = response.data.noteName
                            $('.change-phone').val(response.data.phone)
                            $('.whiteMeContent').val(response.data.description)
                            var tages1 = response.data.tags;
                            $scope.FriendTags = tages1.split(',')
                            $scope.GroupId = response.data.groupId
                            /*-----------------获取标签库信息----------------*/
                            $('.chzn-results li').css('display', 'block')
                            $http({
                                method: 'POST',
                                url: $rootScope.link + "/groups/getGroups",
                                data: $scope.MyFrienddata,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                if (response.code == 200) {
                                    $scope.InformationGrouping = response.data.groupList
                                    setTimeout(function () {
                                        $('.first-select').find("option[value=" + $scope.GroupId + "]").attr("selected", true)
                                    }, 10)
                                } else {

                                }

                            });
                            $scope.page1Maindiv4Init = false
                            var panduanOnlinn = false
                            for (var i = 0; i < $rootScope.Judgingthesendingmessage.length; i++) {
                                if ($rootScope.socialaccountId == $rootScope.Judgingthesendingmessage[i]) {
                                    panduanOnlinn = true
                                    break;
                                } else {
                                }
                            }
                            if (panduanOnlinn == true) {
                                $('.Chat-layer').css('display', 'block')
                                $('.Chat-layer-say').css('display', 'block')
                            } else {
                                $('.Chat-layer').css('display', 'none')
                                $('.Chat-layer-say').css('display', 'none')
                            }
                            $('.page1-Maindiv3').css('background', 'none')
                            $('.newsList').html('')
                            $('.chat-top-title').html($scope.chatName)
                            $scope.ChatModule = true;
                            $('.forPhone-content').find('span[class^="blue"]').html($rootScope.WeChatowner[$rootScope.socialaccountId])
                            if ($rootScope.friendStorage.hasOwnProperty($rootScope.chatId)) {
                                var mml = $rootScope.friendStorage[$rootScope.chatId]
                                var arr88 = mml.match(/\[[^\]]+\]/g);
                                if (arr88 == null || arr88 == 0 || arr88 == undefined) {
                                    var mm2 = mml.replace(/<br>/g, "")
                                    mml = mm2.replace(/undefined/g, "")
                                } else {
                                    var tt1 = []
                                    var tt2 = []
                                    for (var i1 = 0; i1 < arr88.length; i1++) {
                                        for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                                            if (arr88[i1] == emjoyAllGet[i2]) {
                                                tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                                                tt2.push(emjoyAllGet[i2])
                                            }
                                        }
                                    }
                                    for (var i8 = 0; i8 < tt1.length; i8++) {
                                        mml = mml.replace(tt2[i8], tt1[i8])
                                    }
                                    var mm2 = mml.replace(/<br>/g, "")
                                    mml = mm2.replace(/undefined/g, "")
                                }
                                $('.newsList').html(mml)
                            } else {
                                $('.newsList').html('')
                            }

                            setTimeout(function () {
                                if ($rootScope.Topjudge == 1) {
                                    $('.wechatList').animate({scrollTop: 0}, 100)
                                } else {
                                    $('.wechatList').animate({scrollTop: ($('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.chatId + '"]').parent().attr('data-index') * 74 + 9)}, 100)
                                }

                                if ($rootScope.friendStorage[$rootScope.chatId] == undefined || $rootScope.friendStorage[$rootScope.chatId] == null) {
                                    $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
                                } else {
                                    if ($rootScope.friendStorage[$rootScope.chatId].indexOf("initNone") >= 0) {
                                        $('.ChatRecord').html('-------------------- 查看更多消息 --------------------').css('cursor', 'pointer')
                                    } else {
                                        $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
                                    }
                                }
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.chatId + '"]').next().css('display', 'none')
                                if ($rootScope.friendStorage[$rootScope.chatId] == '' || $rootScope.friendStorage[$rootScope.chatId] == undefined) {
                                } else {
                                    var pp = $rootScope.friendStorage[$rootScope.chatId].replace(/Unread/g, 'Read')
                                    $rootScope.friendStorage[$rootScope.chatId] = pp;
                                }
                                var DivscrollHeight = $('.RightCont')[0].scrollHeight
                                $('.RightCont').animate({scrollTop: DivscrollHeight}, 500)

                            }, 50)
                        } else {

                        }

                    });
                } else {

                }

            })
        }
        else {
            for (var i = 0; i < $rootScope.Chatwithfriends[ThisSolId].length; i++) {
                if ($rootScope.Chatwithfriends[ThisSolId][i].cid == ThisCid) {
                    firstIndex2 = i;
                    firstThis2 = $rootScope.Chatwithfriends[ThisSolId][i]
                    ThisSolTopNumber1 = $rootScope.Chatwithfriends[ThisSolId][i].topNumber
                }
                if ($rootScope.Chatwithfriends[ThisSolId][i].topNumber == 1) {
                    firstTop2++;
                }
            }
            if (firstIshave == true && firstIshave1 == true) {
                ThisId = firstThis2.id
                if (ThisSolTopNumber == 1) {

                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                    $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[ThisSolId].splice(0, 0, firstThis2)

                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                    $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[ThisSolId].splice(firstTop2, 0, firstThis2)
                }


            } else if (firstIshave == true && firstIshave1 == false && $rootScope.lplplpl != -1) {
                ThisId = firstThis.id
                if (ThisSolTopNumber == 1) {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop1, 0, firstThis)
                }

            } else if (firstIshave == true && firstIshave1 == false && $rootScope.lplplpl == -1) {
                ThisId = firstThis.id
                if (ThisSolTopNumber == 1) {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis)
                    $rootScope.Chatwithfriends[ThisSolId].splice(0, 0, firstThis)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis)
                    $rootScope.Chatwithfriends[ThisSolId].splice(firstTop1, 0, firstThis)
                }

            } else if (firstIshave == false && firstIshave1 == true && $rootScope.lplplpl == -1) {
                ThisId = firstThis2.id
                if (ThisSolTopNumber1 == 1) {
                    $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis2)
                    $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[ThisSolId].splice(0, 0, firstThis2)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis2)
                    $rootScope.Chatwithfriends[ThisSolId].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[ThisSolId].splice(firstTop2, 0, firstThis2)
                }

            } else if (firstIshave == false && firstIshave1 == true && $rootScope.lplplpl != -1) {
                ThisId = firstThis2.id
                if (ThisSolTopNumber1 == 1) {
                    $rootScope.Chatwithfriends[-1].splice(0, 0, firstThis2)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(0, 0, firstThis2)
                } else {
                    $rootScope.Chatwithfriends[-1].splice(firstTop, 0, firstThis2)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstIndex2, 1)
                    $rootScope.Chatwithfriends[$rootScope.lplplpl].splice(firstTop2, 0, firstThis2)
                }

            }
            $scope.$watch(function () {
                $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
            })
            $scope.MyFrienddata = new FormData()
            $scope.MyFrienddata.append('socialaccountId', $rootScope.socialaccountId)
            $scope.MyFrienddata.append('contactId', ThisId)
            $http({
                method: 'POST',
                url: $rootScope.link + "/contact/getContactById",
                data: $scope.MyFrienddata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $(".page1-Maindiv2-myfriends-search-con-ul1 li").find('span[data^="' + ThisCid + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('.page1-Maindiv2-myfriends-search-con-ul-tagname1').html('')
                    $('.page1-Maindiv2-myfriends-search-con-ul1').find('.new-msg-number').css('display', 'none').html('')
                    var ArrLength = $rootScope.Chatwithfriends[$rootScope.lplplpl].length;
                    if (ArrLength > 50) {
                        ArrLength = 50
                    } else {

                    }
                    for (var i = 0; i < ArrLength; i++) {
                        var VNcid = $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid
                        if ($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage != '') {
                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.Chatwithfriends[$rootScope.lplplpl][i].cid + '"]').html($rootScope.Chatwithfriends[$rootScope.lplplpl][i].newMessage)
                        }
                        if ($rootScope.friendStorage.hasOwnProperty(VNcid)) {
                            var bothingRead = ($rootScope.friendStorage[VNcid].split('Unread')).length - 1;
                            if (bothingRead > 0) {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'inline-block').html(bothingRead)
                            } else {
                                $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                            }

                        } else {
                            $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + VNcid + '"]').next().css('display', 'none').html('')
                        }
                    }

                    $('.page1-Maindiv2-listInit').css('display', 'none')
                    $scope.page1Maindiv4Init = false
                    /*-------展示群组相关资料-----*/
                    $scope.Customerinformation = true
                    $scope.quickReply = false
                    $scope.customerRecord = false
                    $scope.page1Maindiv4Init = false
                    /*-------展示群组相关资料-----*/
                    $scope.Customerinformation = true
                    $scope.quickReply = false
                    $scope.customerRecord = false
                    /*-------展示好友相关资料-----*/
                    $scope.chatGroupOrFriend = 0
                    $scope.allCustomerList = false
                    $scope.myself = true
                    $scope.myself1 = false
                    $scope.chatName = response.data.nickName
                    $rootScope.chatId = response.data.cid
                    $rootScope.chatHead = $rootScope.WeChatownerHeader[response.data.socialaccountId]
                    $rootScope.Id = response.data.id;
                    $rootScope.socialaccountId = response.data.socialaccountId;
                    $rootScope.type = 0;
                    $rootScope.Topjudge = response.data.topNumber
                    $scope.MyFrienddata1 = response.data
                    if ($rootScope.Topjudge == 1) {
                        $('.chat-top-totop').css('background', 'url("./images/Canceltop.png") center no-repeat')
                        $('.chat-top-totop').attr('data', 1)
                    } else {
                        $('.chat-top-totop').css('background', 'url("./images/toTop.png") center no-repeat')
                        $('.chat-top-totop').attr('data', 0)
                    }
                    $('.change-name').html($rootScope.GetridoftheNbsp(response.data.noteName))
                    $rootScope.NameRecord = response.data.noteName
                    $('.change-phone').val(response.data.phone)
                    $('.whiteMeContent').val(response.data.description)
                    var tages1 = response.data.tags;
                    $scope.FriendTags = tages1.split(',')
                    $scope.GroupId = response.data.groupId
                    /*-----------------获取标签库信息----------------*/
                    $('.chzn-results li').css('display', 'block')
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/groups/getGroups",
                        data: $scope.MyFrienddata,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        if (response.code == 200) {
                            $scope.InformationGrouping = response.data.groupList
                            setTimeout(function () {
                                $('.first-select').find("option[value=" + $scope.GroupId + "]").attr("selected", true)
                            }, 10)
                        } else {

                        }

                    });
                    $scope.page1Maindiv4Init = false
                    var panduanOnlinn = false
                    for (var i = 0; i < $rootScope.Judgingthesendingmessage.length; i++) {
                        if ($rootScope.socialaccountId == $rootScope.Judgingthesendingmessage[i]) {
                            panduanOnlinn = true
                            break;
                        } else {
                        }
                    }
                    if (panduanOnlinn == true) {
                        $('.Chat-layer').css('display', 'block')
                        $('.Chat-layer-say').css('display', 'block')
                    } else {
                        $('.Chat-layer').css('display', 'none')
                        $('.Chat-layer-say').css('display', 'none')
                    }
                    $('.page1-Maindiv3').css('background', 'none')
                    $('.newsList').html('')
                    $('.chat-top-title').html($scope.chatName)
                    $scope.ChatModule = true;
                    $('.forPhone-content').find('span[class^="blue"]').html($rootScope.WeChatowner[$rootScope.socialaccountId])
                    if ($rootScope.friendStorage.hasOwnProperty($rootScope.chatId)) {
                        var mml = $rootScope.friendStorage[$rootScope.chatId]
                        var arr88 = mml.match(/\[[^\]]+\]/g);
                        if (arr88 == null || arr88 == 0 || arr88 == undefined) {
                            var mm2 = mml.replace(/<br>/g, "")
                            mml = mm2.replace(/undefined/g, "")
                        } else {
                            var tt1 = []
                            var tt2 = []
                            for (var i1 = 0; i1 < arr88.length; i1++) {
                                for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                                    if (arr88[i1] == emjoyAllGet[i2]) {
                                        tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                                        tt2.push(emjoyAllGet[i2])
                                    }
                                }
                            }
                            for (var i8 = 0; i8 < tt1.length; i8++) {
                                mml = mml.replace(tt2[i8], tt1[i8])
                            }
                            var mm2 = mml.replace(/<br>/g, "")
                            mml = mm2.replace(/undefined/g, "")
                        }
                        $('.newsList').html(mml)
                    } else {
                        $('.newsList').html('')
                    }
                    setTimeout(function () {
                        if ($rootScope.Topjudge == 1) {
                            $('.wechatList').animate({scrollTop: 0}, 100)
                        } else {
                            $('.wechatList').animate({scrollTop: ($('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.chatId + '"]').parent().attr('data-index') * 74 + 9)}, 100)
                        }
                        $('.Newmessagereminding').css('display', 'none')
                        if ($rootScope.friendStorage[$rootScope.chatId] == undefined || $rootScope.friendStorage[$rootScope.chatId] == null) {
                            $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
                        } else {
                            if ($rootScope.friendStorage[$rootScope.chatId].indexOf("initNone") >= 0) {
                                $('.ChatRecord').html('-------------------- 查看更多消息 --------------------').css('cursor', 'pointer')
                            } else {
                                $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
                            }
                        }

                        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.chatId + '"]').next().css('display', 'none')
                        if ($rootScope.friendStorage[$rootScope.chatId] == '' || $rootScope.friendStorage[$rootScope.chatId] == undefined) {
                        } else {
                            var pp = $rootScope.friendStorage[$rootScope.chatId].replace(/Unread/g, 'Read')
                            $rootScope.friendStorage[$rootScope.chatId] = pp;
                        }
                        var DivscrollHeight = $('.RightCont')[0].scrollHeight
                        $('.RightCont').animate({scrollTop: DivscrollHeight}, 500)
                    }, 50)
                } else {

                }

            });
        }
    }
    /*----------添加当前非好友群成员--------*/
    else {
        var aa = new FormData()
        aa.append('greeting', '')
        aa.append('chatroomid', t)
        aa.append('accountname', $rootScope.localUserName)
        aa.append('chatroommemberwxid ', q)
        aa.append('socialaccountid ', $rootScope.socialaccountId)
        $http({
            method: 'POST',
            url: $rootScope.link + "/message/addChatroommemberFriend",
            data: aa,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                $(event.target).css({
                    'cursor': 'not-allowed'
                })
            } else {
            }
        })
    }

}
$rootScope.close_help_say = function ($event) {
    $('.gray-help').css('display', 'none')
    $('.gray-help-say').css('display', 'none')
    $('.gray-help-say-con-text').html('')
    if ($($event.target).html() == '重连') {
        $($event.target).html('确定')
        window.location.reload()

    } else {
        $($event.target).html('确定')
    }
}
/*------------------点击新消息提示框对应好友展开聊天界面-------------------*/
$rootScope.NotificationsChat = function (cid, name, photo, id, socId, type, topNumber) {
    $('.personaldata-data-con-myself-1-input').attr('disabled', 'disabled').css('border', '1px solid transparent')
    $('.personaldata-data-con-myself-3-select').css('display', 'none')
    $('.personaldata-data-con-myself-3-span').css('display', 'inline-block')
    $('.personaldata-data-con-myself-5-textarea-whiteMeContent').attr("disabled", 'disabled').css('border', '1px solid  transparent')
    $('.edit-personaldata').html('修改资料').attr('data', 0)
    $('.personaldata').css('display', 'none')
    $('.chat-bottom-write').html('')
    var panduanOnlinn = false
    $('.all-customer-search-logo-input').val('')
    for (var i = 0; i < $rootScope.Judgingthesendingmessage.length; i++) {
        if (socId == $rootScope.Judgingthesendingmessage[i]) {
            panduanOnlinn = true
            break;
        } else {
        }
    }
    $('.Newmessagereminding').css('display', 'none')
    $rootScope.unreadMessages = 0
    if (panduanOnlinn == true) {
        $('.Chat-layer').css('display', 'block')
        $('.Chat-layer-say').css('display', 'block')
    } else {
        $('.Chat-layer').css('display', 'none')
        $('.Chat-layer-say').css('display', 'none')
    }
    $('.page1-div3-title-span1').css({
        'color': 'rgb(68, 186, 246)',
        'border-bottom': '2px solid rgb(68, 186, 246)'
    })
    $('.page1-div3-title-span2').css({'color': '#444444', 'border': 'none'})
    $('.page1-div3-title-span3').css({'color': '#444444', 'border': 'none'})
    $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + cid + '"]')
    if ($('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + cid + '"]').attr('distinguish') == 0) {
        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + cid + '"]').addClass('click-background-color').siblings().removeClass('click-background-color')
    } else {
        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + cid + '"]').parent().addClass('click-background-color').siblings().removeClass('click-background-color')
    }
    $('.page1-Maindiv2-listInit').css('display', 'none')

    if (topNumber == 1) {
        $('.chat-top-totop').css('background', 'url("./images/Canceltop.png") center no-repeat')
        $('.chat-top-totop').attr('data', 1)
    } else {
        $('.chat-top-totop').css('background', 'url("./images/toTop.png") center no-repeat')
        $('.chat-top-totop').attr('data', 0)
    }
    $scope.page1Maindiv4Init = false
    /*-------展示群组相关资料-----*/
    $scope.Customerinformation = true
    $scope.quickReply = false
    $scope.customerRecord = false
    $scope.page1Maindiv4Init = false
    /*-------展示群组相关资料-----*/
    $scope.Customerinformation = true
    $scope.quickReply = false
    $scope.customerRecord = false
    /*---------------判断是群组还是个人------------------*/
    if (type == 1) {
        $scope.chatGroupOrFriend = 1
        $scope.myself1 = true
        $scope.allCustomerList = false
        $scope.myself = false
        $scope.groupdata = new FormData()
        $scope.groupdata.append('socialaccountId', socId)
        $scope.groupdata.append('chatroomId', id)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/getChatroomById",
            data: $scope.groupdata,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            var tages1 = response.data.tags;
            $scope.FriendTags = tages1.split(',')
            $scope.Mygroupdata = response.data
            $scope.GroupId = response.data.groupId
            $('.whiteMeContent').val(response.data.chatroomDescription)
            /*-----------------获取标签库信息----------------*/
            $('.chzn-results li').css('display', 'block')
            $http({
                method: 'POST',
                url: $rootScope.link + "/groups/getGroups",
                data: $scope.MyFrienddata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                $scope.InformationGrouping = response.data.groupList
                setTimeout(function () {
                    if ($scope.GroupId == 0) {
                        $(".four-select option").removeAttr("selected");
                        $(".four-select option[value=0]").attr("selected", true)
                    } else {
                        $(".four-select option").removeAttr("selected");
                        $(".four-select option[value=" + $scope.GroupId + "]").attr("selected", true)
                    }
                }, 50)
            });
        });
    }
    /*-------展示好友相关资料-----*/
    else {
        $scope.chatGroupOrFriend = 0
        $scope.allCustomerList = false
        $scope.myself = true
        $scope.myself1 = false
        $scope.MyFrienddata = new FormData()
        $scope.MyFrienddata.append('socialaccountId', socId)
        $scope.MyFrienddata.append('contactId', id)
        $http({
            method: 'POST',
            url: $rootScope.link + "/contact/getContactById",
            data: $scope.MyFrienddata,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            $scope.MyFrienddata1 = response.data
            $('.change-name').html($rootScope.GetridoftheNbsp(response.data.noteName))
            $rootScope.NameRecord = response.data.noteName
            $('.change-phone').val(response.data.phone)
            $('.whiteMeContent').val(response.data.description)
            var tages1 = response.data.tags;
            $scope.FriendTags = tages1.split(',')
            $scope.GroupId = response.data.groupId
            var peopleGroip=response.data.groupId
            /*-----------------获取标签库信息----------------*/
            $('.chzn-results li').css('display', 'block')
            $http({
                method: 'POST',
                url: $rootScope.link + "/groups/getGroups",
                data: $scope.MyFrienddata,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                $scope.InformationGrouping = response.data.groupList
                setTimeout(function () {
                    if ($scope.GroupId == 0) {
                        $(".first-select option").removeAttr("selected");
                        $(".first-select option[value=0]").attr("selected", true)
                    } else {
                        $(".first-select option").removeAttr("selected");
                        $(".first-select option[value=" + peopleGroip+ "]").attr("selected", true)

                    }
                }, 50)
            });
        });
    }
    $scope.chatName = name
    $rootScope.chatId = cid;
    $rootScope.chatHead = $rootScope.WeChatownerHeader[socId]
    $rootScope.Id = id;
    $rootScope.socialaccountId = socId;
    $rootScope.type = type;
    $rootScope.Topjudge = topNumber

    $scope.page1Maindiv4Init = false
    $('.page1-Maindiv3').attr('data', cid).css('background', 'none')
    $('.newsList').html('')
    $('.chat-top-title').html(name)
    $scope.ChatModule = true;
    $('.forPhone-content').find('span[class^="blue"]').html($rootScope.WeChatowner[$rootScope.socialaccountId])
    var mml = $rootScope.friendStorage[$rootScope.chatId]
    if (mml == undefined || mml == null) {

    } else {
        var arr88 = mml.match(/\[[^\]]+\]/g);
        if (arr88 == null || arr88 == 0 || arr88 == undefined) {
            var mm2 = mml.replace(/<br>/g, "")
            mml = mm2.replace(/undefined/g, "")
        } else {
            var tt1 = []
            var tt2 = []
            for (var i1 = 0; i1 < arr88.length; i1++) {
                for (var i2 = 0; i2 < emjoyAllGet.length; i2++) {
                    if (arr88[i1] == emjoyAllGet[i2]) {
                        tt1.push('<img class="emoji_icon" src="images/qq/' + (i2 + 1) + '.gif">')
                        tt2.push(emjoyAllGet[i2])
                    }
                }
            }
            for (var i8 = 0; i8 < tt1.length; i8++) {
                mml = mml.replace(tt2[i8], tt1[i8])
            }
            var mm2 = mml.replace(/<br>/g, "")
            mml = mm2.replace(/undefined/g, "")
        }
    }

    $('.newsList').html(mml)
    setTimeout(function () {
        if ($rootScope.friendStorage[cid].indexOf("initNone") >= 0) {
            $('.ChatRecord').html('-------------------- 查看更多消息 --------------------').css('cursor', 'pointer')
        } else {
            $('.ChatRecord').html('---------------- 更多消息请查看聊天记录 ----------------').css('cursor', 'default')
        }

        $('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + cid + '"]').next().css('display', 'none')
        if ($rootScope.friendStorage[cid] == '' || $rootScope.friendStorage[cid] == undefined) {
        } else {
            var pp = $rootScope.friendStorage[cid].replace(/Unread/g, 'Read')
            $rootScope.friendStorage[cid] = pp;
        }
        if ($rootScope.Topjudge == 1) {
            $('.wechatList').animate({scrollTop: 0}, 100)
        } else {
            $('.wechatList').animate({scrollTop: ($('.page1-Maindiv2-myfriends-search-con-ul1').find('span[data^="' + $rootScope.chatId + '"]').parent().attr('data-index') * 74 + 9)}, 0)
        }
        var DivscrollHeight = $('.RightCont')[0].scrollHeight
        $('.RightCont').animate({scrollTop: DivscrollHeight}, 400)
    }, 50)
}
/*--------------关闭图文链接界面---------------*/
$scope.closeGraphiclink = function () {
    $('.Graphic-link-edit-html-footer-yes').attr('data', 0)
    $('.placeholder_color').val('')
    $('.Addmodifiedkeywords-body-three-upImg-input1').val('')
    $('.Graphic-link-edit-html').css('display', 'none')
    $('.Mongolialayer').css('display', 'none')
}
/*--------------打开图文链接界面---------------*/
$scope.openGraphiclink = function () {
    $rootScope.upFile6 = ''
    $('.Graphic-link-edit-html').css('display', 'block')
    $('.Mongolialayer').css('display', 'block')
    $('.Graphic-link-edit-html-footer-yes').attr('data', 0)
}
/*--------------图文链接界面清除当前图片---------------*/
$scope.clean_Graphic_link_photo = function () {
    $('.Addmodifiedkeywords-body-three-upImg-input1').val('')
    $rootScope.AllGraphiclink = ''
    $rootScope.upFile6 = ''
    $('.Graphic-link-edit-html-con-con-div-4-part').css({
        'background': 'url("../images/upload-bg.png")center no-repeat',
        'background-size': '100% 100%'
    })
}
/*--------------图文链接界面确定添加及其确认修改---------------*/
$scope.sureGraphiclink = function () {
    if ($('.Graphic-link-edit-html-footer-yes').attr('data') == 0) {
        var value1 = $('.Graphic-link_input1').val()
        var value2 = $('.Graphic-link_input2').val()
        var value3 = $('.Graphic-link_input3').val()
        if (value1 == '' || value1 == null || value1 == undefined) {
            $('.Graphic-link-tishi').css('display', 'block').html('图文链接标题为必填项请输入标题')
        } else {
            if (value2 == '' || value2 == null || value2 == undefined || value2.length < 5) {
                $('.Graphic-link-tishi').css('display', 'block').html('图文链接描述为必填项请输入正确描述（至少输入五个字符）')
            } else {
                if (value3 == '' || value3 == null || value3 == undefined) {
                    $('.Graphic-link-tishi').css('display', 'block').html('链接为必填项请输入链接')
                } else {
                    if ($rootScope.upFile6 == '' || $rootScope.upFile6 == null || $rootScope.upFile6 == undefined) {
                        $('.Graphic-link-tishi').css('display', 'block').html('图文链接图片为必填项请上传图片')
                    } else {

                        var aa = new FormData()
                        aa.append('title', value1)
                        aa.append('content', value2)
                        aa.append('url', value3)
                        aa.append('file', $rootScope.upFile6)
                        $http({
                            method: 'POST',
                            url: $rootScope.link + "/imgandlink/addImgAndLink",
                            data: aa,
                            headers: {'Content-Type': undefined},
                            transformRequest: angular.identity
                        }).success(function (response) {
                            if (response.code == 200) {
                                $rootScope.upFile6 == ''
                                $('.Graphic-link-tishi').css('display', 'none')
                                $('.Addmodifiedkeywords-body-three-upImg-input1').val('')
                                $('.Graphic-link-edit-html-con-con-div-4-part').css({
                                    'background': 'url("../images/upload-bg.png")center no-repeat',
                                    'background-size': '100% 100%'
                                })
                                $('.placeholder_color').val('')
                                $('.Graphic-link-edit-html').css('display', 'none')
                                $('.Mongolialayer').css('display', 'none')
                                $rootScope.AllGraphiclink = ''
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + "/imgandlink/queryAllImgAndLink",
                                    data: '',
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    if (response.code == 200) {
                                        $rootScope.AllGraphiclink = response.data.imgAndLinkList
                                    } else {
                                        $rootScope.AllGraphiclink = ''

                                    }
                                })
                            } else if (response.code == 1001) {
                                $('.Graphic-link-tishi').css('display', 'block').html('图片大小<=10M')
                            } else if (response.code == 1003) {
                                $('.Graphic-link-tishi').css('display', 'block').html('图片宽高比例应为1:1')
                            } else if (response.code == 1004) {
                                $('.Graphic-link-tishi').css('display', 'block').html('当前链接已存在')
                            }
                        })
                    }
                }
            }
        }
    }
    else {
        var value1 = $('.Graphic-link_input1').val()
        var value2 = $('.Graphic-link_input2').val()
        var value3 = $('.Graphic-link_input3').val()

        if (value1 == '' || value1 == null || value1 == undefined) {
            $('.Graphic-link-tishi').css('display', 'block').html('图文链接标题为必填项请输入标题')
        } else {
            if (value2 == '' || value2 == null || value2 == undefined || value2.length < 5) {
                $('.Graphic-link-tishi').css('display', 'block').html('图文链接描述为必填项请输入正确描述（至少输入五个字符）')
            } else {
                if (value3 == '' || value3 == null || value3 == undefined) {
                    $('.Graphic-link-tishi').css('display', 'block').html('链接为必填项请输入链接')
                } else {
                    if ($rootScope.upFile6 == '' || $rootScope.upFile6 == null || $rootScope.upFile6 == undefined) {
                        $('.Graphic-link-tishi').css('display', 'block').html('图文链接图片为必填项请上传图片')
                    } else {
                        var aa = new FormData()
                        aa.append('id', $scope.Graphic_link_id)
                        aa.append('title', value1)
                        aa.append('content', value2)
                        aa.append('url', value3)
                        if ($rootScope.upFile6 == 'Ishave') {
                            aa.append('file', '')
                        } else {
                            aa.append('file', $rootScope.upFile6)
                        }
                        $http({
                            method: 'POST',
                            url: $rootScope.link + "/imgandlink/updateImgAndLink",
                            data: aa,
                            headers: {'Content-Type': undefined},
                            transformRequest: angular.identity
                        }).success(function (response) {
                            if (response.code == 200) {
                                $('.Graphic-link-edit-html-footer-yes').attr('data', 0)
                                $rootScope.upFile6 = ''
                                $('.Graphic-link-tishi').css('display', 'none')
                                $('.Addmodifiedkeywords-body-three-upImg-input1').val('')
                                $('.Graphic-link-edit-html-con-con-div-4-part').css({
                                    'background': 'url("../images/upload-bg.png")center no-repeat',
                                    'background-size': '100% 100%'
                                })
                                $('.placeholder_color').val('')
                                $('.Graphic-link-edit-html').css('display', 'none')
                                $('.Mongolialayer').css('display', 'none')
                                $rootScope.AllGraphiclink = ''
                                $http({
                                    method: 'POST',
                                    url: $rootScope.link + "/imgandlink/queryAllImgAndLink",
                                    data: '',
                                    headers: {'Content-Type': undefined},
                                    transformRequest: angular.identity
                                }).success(function (response) {
                                    if (response.code == 200) {
                                        $rootScope.AllGraphiclink = response.data.imgAndLinkList
                                    } else {
                                        $rootScope.AllGraphiclink = ''

                                    }
                                })
                            } else if (response.code == 1001) {
                                $('.Graphic-link-tishi').css('display', 'block').html('图片大小<=10M')
                            } else if (response.code == 1003) {
                                $('.Graphic-link-tishi').css('display', 'block').html('图片宽高比例应为1:1')
                            } else if (response.code == 1004) {
                                $('.Graphic-link-tishi').css('display', 'block').html('当前链接已存在')
                            }
                        })
                    }
                }
            }
        }
    }


}
/*-----------------删除单条图文链接-----------------*/
$scope.delGraphiclink = function (e) {
    var aa = new FormData()
    aa.append('id', e)
    $http({
        method: 'POST',
        url: $rootScope.link + "/imgandlink/deleteImgAndLink",
        data: aa,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $rootScope.AllGraphiclink = ''
            $http({
                method: 'POST',
                url: $rootScope.link + "/imgandlink/queryAllImgAndLink",
                data: '',
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    $rootScope.AllGraphiclink = response.data.imgAndLinkList
                } else {
                    $rootScope.AllGraphiclink = ''
                }
            })
        }
    })
}
$scope.Graphic_link_id = ''
/*------------------点击编辑单条图文链接--------------------*/
$scope.editGraphiclink = function (e, r, t, y, u) {
    $scope.Graphic_link_id = e
    $('.Graphic-link-edit-html').css('display', 'block')
    $('.Mongolialayer').css('display', 'block')
    $('.Graphic-link_input1').val(r)
    $('.Graphic-link_input2').val(t)
    $('.Graphic-link_input3').val(u)
    $('.Graphic-link-edit-html-con-con-div-4-part').css({
        'background': 'url(' + y + ')center no-repeat',
        'background-size': '100% 100%'
    })
    $('.Graphic-link-edit-html-footer-yes').attr('data', 1)
    $rootScope.upFile6 = 'Ishave'
}
/*------------------编辑单条图文链接后确认修改--------------------*/


/*------------------删除好友或退出群聊--------------------*/
$scope.Delete_and_exit = function (e) {

    var aa = new FormData()
    aa.append('id', $rootScope.impPhoId)
    aa.append('type', e)
    $http({
        method: 'POST',
        url: $rootScope.link + "/contact/delContactAndChatroom",
        data: aa,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
        if (response.code == 200) {
            $('.page1-Maindiv7').css('background', 'url("../images/phonegroup.png") center no-repeat')
            $scope.Addressbook = false;
            var ThisIndex1 = 0
            var ThisIndex2 = 0
            for (var index_1 = 0; index_1 < $rootScope.searchReturnList.length; index_1++) {
                for (var index_2 = 0; index_2 < $rootScope.searchReturnList[index_1][1].length; index_2++) {
                    if ($rootScope.searchReturnList[index_1][1][index_2].cid == $rootScope.impPhoCid) {
                        ThisIndex1 = index_1
                        ThisIndex2 = index_2
                        break;
                    }
                }
            }
            var Alldata = $rootScope.searchReturnList[ThisIndex1][1].splice(ThisIndex2, 1)
        }
    })
}
/*-------------是否接收群消息开关-----------*/
$scope.AutoGroupMsg = true
$scope.AutomaticSwich_GroupMsg = function (event) {
    var isOpen = false
    var autoReply = new FormData()
    autoReply.append('accountName', $rootScope.localUserName)
    if ($(event.target).attr('data') == 1) {
        autoReply.append('isOpen', false)
        isOpen = false
    } else {
        autoReply.append('isOpen', true)
        isOpen = true
    }
    $http({
        method: 'POST',
        url: $rootScope.link1 + "/message/receiveChatroomMsg",
        data: autoReply,
        headers: {'Content-Type': undefined},
        transformRequest: angular.identity
    }).success(function (response) {
            if (response.code == 200) {
                if (isOpen == false) {
                    $scope.AutoGroupMsg = false
                    $(event.target).css({'background': 'url("./images/off-1.png") center no-repeat'})
                    $(event.target).attr('data', 0)
                    $('.SettingInterface-body-first-table-Explain1_tishi').css('display', 'none')
                } else {
                    $scope.AutoGroupMsg = true
                    $(event.target).css({'background': 'url("./images/open-1.png") center no-repeat'})
                    $(event.target).attr('data', 1)
                    $('.SettingInterface-body-first-table-Explain1_tishi').css('display', 'none')
                }
            } else {
                // SettingInterface-body-first-table-Explain1_tishi
                if (isOpen == false) {
                    $('.SettingInterface-body-first-table-Explain1_tishi').css('display', 'block').html('关闭接收群聊消息失败，请稍后再试')
                    setTimeout(function () {
                        $('.SettingInterface-body-first-table-Explain1_tishi').css('display', 'none')
                    }, 1500)
                } else {
                    $('.SettingInterface-body-first-table-Explain1_tishi').css('display', 'block').html('开启接收群聊消息失败，请稍后再试')
                    setTimeout(function () {
                        $('.SettingInterface-body-first-table-Explain1_tishi').css('display', 'none')
                    }, 1500)
                }
            }
        }
    )

}
/*------------右键删除与置顶--------------*/
// setTimeout(function () {
//     $(document).ready(function(){
//         $(".moveFriendList").contextMenu({
//             width: 110, // width
//             itemHeight: 30, // 菜单项height
//             bgColor: "#FFFFFF", // 背景颜色
//             color: "#000000", // 字体颜色
//             fontSize: 12, // 字体大小
//             hoverBgColor: "#DADADA", // hover背景颜色
//             target: function (ele) { // 当前元素
//                 console.log(ele)
//                 ele.find('span[class^="page1-Maindiv2-myfriends-search-con-ul-tagname1"]').attr('data1')
//                 console.log( ele.find('span[class^="page1-Maindiv2-myfriends-search-con-ul-tagname1"]').attr('data1'))
//             },
//             menu: [{ // 菜单项
//                 text: "置顶",
//                 icon: "img/add.png",
//                 callback: function () {
//                     alert("新增");
//                 }
//             },
//                 {
//                     text: "删除",
//                     icon: "img/del.png",
//                     callback: function () {
//                         alert("删除");
//                     }
//                 }
//             ]
//
//         });
//     });
// },3000)


/*---------------------左侧最近聊天人加载后执行函数----------------------*/
$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
    var IsTop = ''
    var IsId = ''
    var IsType = ''
    var IsCid = ''
    var IssocialaccountId = ''
    var Issids = ''
    $(".moveFriendList").contextMenu({

        width: 110, // width
        itemHeight: 30, // 菜单项height
        bgColor: "#FFFFFF", // 背景颜色
        color: "#000000", // 字体颜色
        fontSize: 12, // 字体大小
        hoverBgColor: "#DADADA", // hover背景颜色
        target: function (ele) { // 当前元素
            $('.ul-context-menu1').remove()
            IsTop = ele.find('span[class^="page1-Maindiv2-myfriends-search-con-ul-tagname1"]').attr('data1')
            Issids = ele.attr('data-id')
            IsId = ele.find('span[class^="page1-Maindiv2-myfriends-search-con-ul-tagname1"]').attr('data2')
            IsType = ele.find('span[class^="page1-Maindiv2-myfriends-search-con-ul-tagname1"]').attr('data3')
            IsCid = ele.find('span[class^="page1-Maindiv2-myfriends-search-con-ul-tagname1"]').attr('data4')
            IssocialaccountId = ele.find('span[class^="page1-Maindiv2-myfriends-search-con-ul-tagname1"]').attr('data5')
            if (IsTop == 1) {
                $('.changeName0').html('取消置顶')

            } else {
                $('.changeName0').html('置顶')
            }
        },
        menu: [{ // 菜单项
            text: '置顶',
            icon: "img/add.png",
            callback: function () {


                $scope.chatFriendToTop(IsTop, IsId, IsType, IsCid)


            }
        },
            {
                text: "删除聊天",
                icon: "img/del.png",
                callback: function () {
                    // $(".moveFriendList")
                    // $(".page1-Maindiv2-myfriends-search-con-ul1").find('li[data-id^=' + Issids + ']').css({'position':'fixed','z-index':-5,'padding':0})

                    $scope.Delete_the_chatting(IssocialaccountId, IsCid, IsTop)


                }
            }
        ]

    });
})
/*----------------当前聊天列表删除该人--------------*/
// IssocialaccountId   IsCid
$scope.Delete_the_chatting = function (e, q, w) {
    var firstIndex = 0;
    var firstIndex2 = 0;
    var firstIshave = false;
    for (var i = 0; i < $rootScope.Chatwithfriends[-1].length; i++) {
        if ($rootScope.Chatwithfriends[-1][i].cid == q) {
            firstIndex = i;
            firstIshave = true
            break
        }
    }
    if (firstIshave == true) {
        $rootScope.Chatwithfriends[-1].splice(firstIndex, 1)
    } else {

    }
    for (var i1 = 0; i1 < $rootScope.Chatwithfriends[e].length; i1++) {
        if ($rootScope.Chatwithfriends[e][i1].cid == q) {
            firstIndex2 = i1;
            break
        }
    }
    $rootScope.Chatwithfriends[e].splice(firstIndex2, 1)

    $rootScope.frienfList = $rootScope.Chatwithfriends[$rootScope.lplplpl]
    if (w === 1) {
        $rootScope.TotopNum = $rootScope.TotopNum - 1
    }
    if (q === $rootScope.chatId) {
        $scope.CloseChatModule()
    }
}


/*----------------当前聊天内容删除撤回--------------*/
// $scope.$watch(function (n) {
//     var IsIdss = ''
//     var IsNewMsg = ''
//     $(".newsList li").contextMenu1({
//         width: 110, // width
//         itemHeight: 30, // 菜单项height
//         bgColor: "#FFFFFF", // 背景颜色
//         color: "#000000", // 字体颜色
//         fontSize: 12, // 字体大小
//         hoverBgColor: "#DADADA", // hover背景颜色
//         target: function (ele) { // 当前元素
//             $('.ul-context-menu').remove()
//             IsIdss = ele.attr('dataid')
//             IsNewMsg = ele.attr('isNew')
//             if (IsNewMsg == true) {
//
//             } else {
//                 $('.ul-context-menu1').find('li[data_index^=0]').css('display', 'none')
//                 // $(".page1-Maindiv2-myfriends-search-con-ul1").find('li[data-id^=' + Issids + ']').css({'position':'fixed','z-index':-5,'padding':0})
//             }
//         },
//         menu: [{ // 菜单项
//             text: '撤回',
//             icon: "img/add.png",
//             callback: function () {
//                 // $scope.chatFriendToTop(IsTop, IsId, IsType, IsCid)
//             }
//         },
//             {
//                 text: "删除",
//                 icon: "img/del.png",
//                 callback: function () {
//                     $('.ul-context-menu1').remove()
//                     $(".newsList").find('li[dataid^=' + IsIdss + ']').remove()
//                     $rootScope.friendStorage[$rootScope.chatId] = $('.newsList').html()
//                     var remobeId = new FormData()
//                     if (IsNewMsg == 'false') {
//                         remobeId.append('id', IsIdss)
//                         remobeId.append('msgId', '')
//                     } else {
//                         remobeId.append('id', '')
//                         remobeId.append('msgId', IsIdss)
//                     }
//                     $http({
//                         method: 'POST',
//                         url: $rootScope.link1 + "/chatrecord/deleteChatrecordByIdOrMsgId",
//                         data: remobeId,
//                         headers: {'Content-Type': undefined},
//                         transformRequest: angular.identity
//                     }).success(function (response) {
//                         if (response.code == 200) {
//
//                         } else {
//                         }
//                     })
//                 }
//             }
//         ]
//
//     });
// })


/*文件下载逻辑*/

// function openWin(url) {
//     $('body').append($('<a href="' + url + '" download=' + DownFileName + ' id="openWin"></a>'))
//         document.getElementById("openWin").click();//点击事件
//         $('#openWin').remove();
// }

var DownFileName = ''
/*-------------------文件下载------------------*/
$(document).on('click', '.up-file-Down', function () {
    if ($(this).attr('isNew') == 'false') {
        var a = $rootScope.WeChatownersocialNumber[$rootScope.socialaccountId]
        if ($(this).attr('file_path') == '') {
            $(this).html('下载中')
            var thisMe = $(this)
            DownFileName = $(this).attr('file_title')
            var data = new FormData()
            data.append('accountName', $rootScope.localUserName)
            data.append('msgId', $(this).attr('file_id'))
            data.append('socialnumber', a)
            if ($(this).attr('isme') == 'false') {
                data.append('flag', 1)
            } else {
                data.append('flag', 0)
            }
            $http({
                method: 'POST',
                url: $rootScope.link1 + "/message/getFileByMsgId",
                data: data,
                headers: {'Content-Type': undefined},
                transformRequest: angular.identity
            }).success(function (response) {
                if (response.code == 200) {
                    if (response.data.imagePath == '') {
                        thisMe.html('点击重试')
                        thisMe.addClass('errorColor')
                    } else {
                        download(response.data.imagePath, DownFileName, "text/plain");
                    }
                }

            })
        } else {
            DownFileName = $(this).attr('file_title')
            var FilPath = $(this).attr('file_path')
            download(FilPath, DownFileName, "text/plain");
        }

    } else {
        var thisMe = $(this)
        DownFileName = $(this).attr('file_title')
        var data = new FormData()
        data.append('accountName', $rootScope.localUserName)
        data.append('msgId', $(this).attr('file_id'))
        data.append('socialnumber', $(this).attr('file_number'))
        if ($(this).attr('isme') == 'false') {
            data.append('flag', 1)
        } else {
            data.append('flag', 0)
        }
        $http({
            method: 'POST',
            url: $rootScope.link1 + "/message/getFileByMsgId",
            data: data,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).success(function (response) {
            if (response.code == 200) {
                if (response.data.imagePath == '') {
                    thisMe.html('点击重试')
                    thisMe.addClass('errorColor')
                } else {
                    download(response.data.tempData, DownFileName, "text/plain");
                    thisMe.html('下载')
                    thisMe.removeClass('errorColor')
                }
            }

        })
    }

})
}
])



app.directive('renderingCompletion',  ["$timeout", function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                    // console.log('dasd')
                });
            }
        }
    }
}]);
app.directive('uploadFile', function () {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                scope.upFile = this.files[0];
            });
        }
    }
});

app.directive('uploadFile1', ["$rootScope", "$http", function ($rootScope, $http) {
    return {
        link: function (scope, elem, http, rootScope) {
            elem.on("change", function () {
                console.log(this.files[0])
                var upImg = new FormData()
                upImg.append('file', this.files[0])
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/picture/addPicture",
                    data: upImg,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    if (response.code == 200) {
                        elem.val('')
                        if (response.code == 200) {
                            var Picturelibrary = new FormData()
                            $http({
                                method: 'POST',
                                url: $rootScope.link + "/picture/getAllPicture",
                                data: Picturelibrary,
                                headers: {'Content-Type': undefined},
                                transformRequest: angular.identity
                            }).success(function (response) {
                                if (response.code == 200) {
                                    scope.Picturelibrary = response.data.pictureList;
                                } else {
                                }
                            });
                        }
                    }

                });
            });
        }
    }
}]);

app.directive('uploadFile2', ["$rootScope", "$http", function ($rootScope, $http) {
    return {
        link: function (scope, elem, http, rootScope) {
            elem.on("change", function () {
                var upFile = new FormData()
                upFile.append('file', this.files[0])
                this.value=''
                $http({
                    method: 'POST',
                    url: $rootScope.link + "/script/uploading",
                    data: upFile,
                    headers: {'Content-Type': undefined},
                    transformRequest: angular.identity
                }).success(function (response) {
                    var Shortcutphrase = new FormData()
                    $http({
                        method: 'POST',
                        url: $rootScope.link + "/script/getTwoScript",
                        data: Shortcutphrase,
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    }).success(function (response) {
                        if (response.code == 200) {
                            scope.AllShortcutphrase = response.data;
                            scope.$watch('$viewContentLoaded', function () {
                                $(".tree").treemenu({delay: 300}).openActive();
                            });
                        } else {
                        }
                    });
                });
            });
        }
    }
}]);

app.directive('uploadImage3', ["$rootScope", function ($rootScope) {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                // var file = this.files[0];
                // if (!/image\/\w+/.test(file.type)) {
                //     alert("文件必须为图片！");
                //     return false;
                // }
                // console.log(elem.val())
                // var reader = new FileReader();
                // reader.readAsDataURL(file);
                // reader.onload = function (e) {
                //     console.log(this.result)
                //     elem.parent().next().attr('src', this.result)
                //     scope.$apply();
                //
                // };
                // $rootScope.pic1 = file
                var file = this.files[0];
                if (!/image\/\w+/.test(file.type)) {
                    alert("文件必须为图片！");
                    return false;
                }
                $rootScope.pic1 = file
                var objUrl = getObjectURL(this.files[0]);
                if (objUrl) {
                    $('.last-Img').attr('src', objUrl)
                    scope.$apply();
                }

                function getObjectURL(file) {
                    var url = null;
                    if (window.createObjectURL != undefined) { // basic
                        url = window.createObjectURL(file);
                    } else if (window.URL != undefined) { // mozilla(firefox)
                        url = window.URL.createObjectURL(file);
                    } else if (window.webkitURL != undefined) { // webkit or chrome
                        url = window.webkitURL.createObjectURL(file);
                    }
                    return url;
                }
            });
        }
    }
}]);

app.directive('uploadFile4', function () {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                scope.upFile1 = this.files[0];
                if (scope.upFile1.name.length >= 6) {

                    $('.exselTextGra1').html(scope.upFile1.name.slice(0,6) + '...')
                } else {
                    $('.exselTextGra1').html(scope.upFile1.name)
                }
                $('.exselTextGray1').html((scope.upFile1.size / 1024).toFixed(2) + 'kb')
                $('.Importphrase-con-second-donwload-null').css('display', 'none').html(' 请上传文件')
            });
        }
    }
});

app.directive('uploadFile5',["$rootScope",  function ($rootScope) {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                scope.upFile2 = this.files[0];

            });
        }
    }
}]);

app.directive('uploadFile6', ["$rootScope", function ($rootScope) {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                $rootScope.upFile6 = this.files[0];
                function getObjectURL(file) {
                    var url = null;
                    if (window.createObjectURL != undefined) { // basic
                        url = window.createObjectURL(file);
                    } else if (window.URL != undefined) { // mozilla(firefox)
                        url = window.URL.createObjectURL(file);
                    } else if (window.webkitURL != undefined) { // webkit or chrome
                        url = window.webkitURL.createObjectURL(file);
                    }
                    return url;
                }
                var objUrl = getObjectURL(this.files[0]);
                if (objUrl) {
                    $('.Graphic-link-edit-html-con-con-div-4-part').css('background','url('+objUrl+')center no-repeat')
                    scope.$apply();
                }

            });
        }
    }
}]);
