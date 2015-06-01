var angular = require("angular");
var CharacterSelectionCtrl = require("./controllers/CharacterSelectionCtrl");
var angularBootstrap = require("angular-bootstrap");
var ngRouter = require("angular-route");
typeof angularBootstrap;
typeof ngRouter;

angular.module("dueDateCalculator", ['ui.bootstrap', 'ngRoute']);

angular.module("dueDateCalculator")
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/character_selection.html',
                controller: 'CharacterSelectionCtrl'
            })
    })
    .controller("CharacterSelectionCtrl", CharacterSelectionCtrl);