var angular = require("angular");

var CharacterSelectionCtrl = require("./controllers/CharacterSelectionCtrl");
var FightCtrl = require("./controllers/FightCtrl");

var CharacterApi = require("./services/CharacterApi");
var Fighter = require("./services/Fighter");

var characterBox = require("./directives/characterBox");

var angularBootstrap = require("angular-bootstrap");
var ngRouter = require("angular-route");

angular.module("dueDateCalculator", ['ui.bootstrap', 'ngRoute']);

angular.module("dueDateCalculator")
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/character_selection.html',
                controller: 'CharacterSelectionCtrl'
            })
            .when('/fight/:redCornerId/:blueCornerId', {
                templateUrl: 'templates/fight.html',
                controller: 'FightCtrl',
                resolve: {
                    redCorner: function($route, CharacterApi){
                        return CharacterApi.getById($route.current.params.redCornerId);
                    },
                    blueCorner: function($route, CharacterApi){
                        return CharacterApi.getById($route.current.params.blueCornerId);
                    }
                }
            });
    })
    .controller("CharacterSelectionCtrl", CharacterSelectionCtrl)
    .controller("FightCtrl", FightCtrl)
    .factory("CharacterApi",CharacterApi)
    .factory("Fighter", Fighter)
    .directive("characterBox", characterBox);