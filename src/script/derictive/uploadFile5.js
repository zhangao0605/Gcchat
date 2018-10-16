app.directive('uploadFile5',["$rootScope",  function ($rootScope) {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                scope.upFile2 = this.files[0];

            });
        }
    }
}]);
