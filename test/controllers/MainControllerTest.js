
var angular = require("angular");
var angularMocks = require("angular-mocks");
var MainController = require("../../js/controllers/MainController");
var app = require("../../js/app")

describe('MainController', function() {
    beforeEach(angular.mock.module('dueDateCalculator'));

    var $controller;

    beforeEach(inject(function(_$controller_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.testData', function() {
        it('should have the value of "Test data"', function() {
            var $scope = {};
            var controller = $controller(MainController, { $scope: $scope });
            $scope.testData = 'Test data';
            expect($scope.testData).toEqual('Test data');
        });
    });
});