var angular = require("angular");
var ngRouter = require("angular-route");

var CharacterSelectionCtrl = require("./controllers/CharacterSelectionCtrl");
var FightCtrl = require("./controllers/FightCtrl");

var CharacterApi = require("./services/CharacterApi");
var Fighting = require("./services/Fighting");
var ApiConstants = require("./services/ApiConstants");
var Paging = require("./services/Paging");

var characterBox = require("./directives/characterBox");
var router = require("./common/router");

angular.module("dueDateCalculator", ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/list/:offset', router.list)
            .when('/fight/:redCornerId/:blueCornerId', router.fight)
            .otherwise(router.list);
    })
    .run(function ($route, $rootScope, $location) {
        makeLocationRefreshOptional($route, $rootScope, $location);
    })
    .controller("CharacterSelectionCtrl", CharacterSelectionCtrl)
    .controller("FightCtrl", FightCtrl)
    .factory("CharacterApi",CharacterApi)
    .factory("Fighting", Fighting)
    .factory("ApiConstants", ApiConstants)
    .factory("Paging", Paging)
    .directive("characterBox", characterBox);


function makeLocationRefreshOptional($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}