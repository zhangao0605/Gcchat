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
