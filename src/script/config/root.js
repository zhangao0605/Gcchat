/**
 * Created by digvita on 2017/7/12.
 */
app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when('/page1', {templateUrl: 'view/page1.html', controller: 'page1C'})
        .otherwise({redirectTo: '/page1'});
}]);