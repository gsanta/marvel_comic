

var FightCtrl = function(redCorner, blueCorner, $scope, $routeParams, CharacterApi) {

    $scope.redCorner = redCorner.data.data.results[0];
    $scope.blueCorner = blueCorner.data.data.results[0];

    //$scope.loadCharacters = function() {
    //    CharacterApi.getById($routeParams.redCornerId)
    //        .success(function(data, status, headers, config) {
    //            $scope.redCorner = data.data.results[0];
    //        }).error(function(data, status, headers, config) {
    //            console.log(data)
    //            console.log("error")
    //        });
    //
    //    CharacterApi.getById($routeParams.blueCornerId)
    //        .success(function(data, status, headers, config) {
    //            $scope.blueCorner = data.data.results[0];
    //        }).error(function(data, status, headers, config) {
    //            console.log(data)
    //            console.log("error")
    //        });
    //};

    //$scope.loadCharacters();
};

module.exports = FightCtrl;