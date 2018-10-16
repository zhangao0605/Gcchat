app.directive('uploadFile', function () {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                scope.upFile = this.files[0];
            });
        }
    }
});
