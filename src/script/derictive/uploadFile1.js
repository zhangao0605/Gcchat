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
