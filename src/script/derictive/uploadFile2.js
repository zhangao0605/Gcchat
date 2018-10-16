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
