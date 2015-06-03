var angular = require("angular");

var CharacterSelectionCtrl = require("./controllers/CharacterSelectionCtrl");
var FightCtrl = require("./controllers/FightCtrl");

var CharacterApi = require("./services/CharacterApi");
var Fighter = require("./services/Fighter");
var ApiConstants = require("./services/ApiConstants");

var characterBox = require("./directives/characterBox");

var angularBootstrap = require("angular-bootstrap");
var ngRouter = require("angular-route");

angular.module("dueDateCalculator", ['ui.bootstrap', 'ngRoute']);

angular.module("dueDateCalculator")
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/list/:offset', {
                templateUrl: 'dist/templates/character_selection.html',
                controller: 'CharacterSelectionCtrl',
                controllerAs: 'characters',
                resolve: {
                    charactersData: function($route, CharacterApi) {
                        return CharacterApi.getAll($route.current.params.offset);
                    }
                }
            })
            .when('/fight/:redCornerId/:blueCornerId', {
                templateUrl: 'dist/templates/fight.html',
                controller: 'FightCtrl',
                controllerAs: 'fight',
                resolve: {
                    redCorner: function($route, CharacterApi) {
                        return CharacterApi.getById($route.current.params.redCornerId);
                    },
                    blueCorner: function($route, CharacterApi) {
                        return CharacterApi.getById($route.current.params.blueCornerId);
                    }
                }
            })
            .otherwise({
                templateUrl: 'dist/templates/character_selection.html',
                controller: 'CharacterSelectionCtrl',
                resolve: {
                    charactersData: function($route, CharacterApi) {
                        return CharacterApi.getAll(0);
                    }
                }
            });
    })
    .run(function ($route, $rootScope, $location) {
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
    })
    .controller("CharacterSelectionCtrl", CharacterSelectionCtrl)
    .controller("FightCtrl", FightCtrl)
    .factory("CharacterApi",CharacterApi)
    .factory("Fighter", Fighter)
    .factory("ApiConstants", ApiConstants)
    .directive("characterBox", characterBox);