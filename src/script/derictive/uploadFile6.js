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
