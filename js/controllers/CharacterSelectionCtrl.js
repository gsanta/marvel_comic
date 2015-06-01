

var CharacterSelectionCtrl = function($scope, CharacterApi) {


    $scope.redCorner = {};
    $scope.setRedCorner = function(index, page) {
        $scope.redCorner = $scope.characters[(page - 1) * $scope.numPerPage + index];
    };

    $scope.blueCorner = {};
    $scope.setBlueCorner = function(index, page) {
        $scope.blueCorner = $scope.characters[(page - 1) * $scope.numPerPage + index];
    };

    $scope.currentPage = 1;
    $scope.numPerPage = 4;

    $scope.filteredCharacters = [];
    $scope.characters = [];




    $scope.loadCharacters = function() {
        CharacterApi.getAll()
            .success(function(data, status, headers, config) {
                $scope.characters = $scope.characters.concat(data.data.results);

                if($scope.currentPage * $scope.numPerPage > $scope.characters.length) {
                    $scope.filterCharacters();
                    $scope.$apply();
                }
            }).error(function(data, status, headers, config) {
                    console.log(data)
                    console.log("error")
            });
    };

    $scope.loadCharacters();

    $scope.filterCharacters = function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filteredCharacters = $scope.characters.slice(begin, end);
    };


    $scope.$watch("currentPage", function() {
        $scope.filterCharacters();
    });


};

module.exports = CharacterSelectionCtrl;