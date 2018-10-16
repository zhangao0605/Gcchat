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
