

var FightCtrl = function(redCorner, blueCorner, $scope, $routeParams, CharacterApi) {

    $scope.redCorner = redCorner.data.data.results[0];
    $scope.blueCorner = blueCorner.data.data.results[0];
};

module.exports = FightCtrl;