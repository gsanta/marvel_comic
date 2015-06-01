

var FightCtrl = function($scope, $routeParams, CharacterApi) {

    $scope.redCorner = {};
    $scope.blueCorner = {};

    $scope.loadCharacters = function() {
        CharacterApi.getById($routeParams.redCornerId)
            .success(function(data, status, headers, config) {
                $scope.redCorner = data.data.results[0];
            }).error(function(data, status, headers, config) {
                console.log(data)
                console.log("error")
            });

        CharacterApi.getById($routeParams.blueCornerId)
            .success(function(data, status, headers, config) {
                $scope.blueCorner = data.data.results[0];
            }).error(function(data, status, headers, config) {
                console.log(data)
                console.log("error")
            });
    };

    $scope.loadCharacters();
};

module.exports = FightCtrl;