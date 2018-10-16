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
