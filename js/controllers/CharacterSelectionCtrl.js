

var CharacterSelectionCtrl = function($scope, CharacterApi) {


    $scope.redCorner = {};
    $scope.setRedCorner = function(data) {
        $scope.redCorner = $scope.characters[$scope.characters.indexOf(data)];
    };

    $scope.blueCorner = {};
    $scope.setBlueCorner = function(data) {
        $scope.blueCorner = $scope.characters[$scope.characters.indexOf(data)];
    };

    $scope.currentPage = 1;
    $scope.numPerPage = 4;

    $scope.filteredCharacters = [];
    $scope.characters = [];




    $scope.loadCharacters = function() {
        CharacterApi.getAll()
            .success(function(data, status, headers, config) {
                $scope.characters = data.data.results.map(function(character) {
                    return {
                        description: character.name,
                        id: character.id,
                        thumbnailPath: character.thumbnail ? character.thumbnail.path : null
                    }
                });

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

    $scope.getImgUrl = function(url) {
       return url + '/portrait_xlarge.jpg'
    }


};

module.exports = CharacterSelectionCtrl;