
function convertCharacterData(character) {
    return {
        name: character.name,
        description: character.description,
        id: character.id,
        thumbnailPath: character.thumbnail ? character.thumbnail.path : null
    }
}

var CharacterSelectionCtrl = function(characters, $scope, $location, $routeParams, CharacterApi) {

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

    $scope.offsetOnServer = 0;
    $scope.numPerPageOnServer = 20;

    $scope.filteredCharacters = [];
    $scope.characters = [];


    $scope.loadCharacters = function(offset) {
        CharacterApi.getAll(offset)
            .success(function(data, status, headers, config) {
                var mappedResult = data.data.results.map(character => convertCharacterData(character));
                [].splice.apply($scope.characters, [data.data.offset, mappedResult.length].concat(mappedResult));

                $scope.offsetOnServer = $scope.characters.length;

                $scope.filterCharacters();
                $location.path('/list/' + data.data.offset, false)
            }).error((data, status, headers, config) => console.log("error"));
    };

    $scope.init = function() {
        $scope.offsetOnServer = $routeParams.offset;
    };

    $scope.loadCharacters(0);

    $scope.filterCharacters = function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        if($scope.currentPage * $scope.numPerPage > $scope.offsetOnServer + $scope.numPerPageOnServer) {
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