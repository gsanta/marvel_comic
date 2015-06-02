

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

    $scope.offsetOnServer = 20;
    $scope.numPerPageOnServer = 20;

    $scope.filteredCharacters = [];
    $scope.characters = [];




    $scope.loadCharacters = function(offset) {
        CharacterApi.getAll(offset)
            .success(function(data, status, headers, config) {
                var mappedResult = data.data.results.map(function(character) {
                    return {
                        name: character.name,
                        description: character.description,
                        id: character.id,
                        thumbnailPath: character.thumbnail ? character.thumbnail.path : null
                    }
                });

                [].splice.apply($scope.characters, [data.data.offset, mappedResult.length].concat(mappedResult));

                $scope.offsetOnServer = $scope.characters.length;
                //if($scope.currentPage * $scope.numPerPage > $scope.characters.length) {
                //    $scope.filterCharacters();
                //    $scope.$apply();
                //}

                $scope.filterCharacters();
            }).error(function(data, status, headers, config) {
                    console.log(data)
                    console.log("error")
            });
    };

    $scope.loadCharacters(0);

    $scope.filterCharacters = function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        if($scope.currentPage * $scope.numPerPage > $scope.offsetOnServer) {
            $scope.loadCharacters($scope.offsetOnServer);
        }

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