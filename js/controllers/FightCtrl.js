
var Fighter = require("../services/Fighter");

var FightCtrl = function(redCorner, blueCorner, $scope, $interval, Fighter) {

    $scope.redCorner = redCorner.data.data.results[0];
    $scope.blueCorner = blueCorner.data.data.results[0];

    $scope.leftHighlight = false;
    $scope.rightHighlight = false;

    $scope.fight = function() {
        $scope.rightHighlight = !$scope.rightHighlight;

        var interval = $interval(function() {
            $scope.rightHighlight = !$scope.rightHighlight;
            $scope.leftHighlight = !$scope.leftHighlight;
        }, 200);

        Fighter.fight().then(function(isWinnerTheLeft) {
            $interval.cancel(interval);
            $scope.rightHighlight = $scope.leftHighlight = false;
            isWinnerTheLeft ? $scope.leftHighlight = true : $scope.rightHighlight = true;
        });
    }
};

module.exports = FightCtrl;