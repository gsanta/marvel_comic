var angular = require("angular");
var MainController = require("./controllers/MainController");
var angularBootstrap = require("angular-bootstrap");
typeof angularBootstrap;

angular.module("dueDateCalculator", ['ui.bootstrap']);

angular.module("dueDateCalculator")
    .controller("mainController", MainController);