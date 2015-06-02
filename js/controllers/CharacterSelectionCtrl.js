
function convertCharacterData(character) {
    return {
        name: character.name,
        description: character.description,
        id: character.id,
        thumbnailPath: character.thumbnail ? character.thumbnail.path : null
    }
}

var CharacterSelectionCtrl = function(charactersData, $scope, $location, $routeParams, CharacterApi) {

    $scope.redCorner = {};
    $scope.setRedCorner = function(data) {
        $scope.redCorner = $scope.characters[$scope.characters.indexOf(data)];
    };

    $scope.blueCorner = {};
    $scope.setBlueCorner = function(data) {
        $scope.blueCorner = $scope.characters[$scope.characters.indexOf(data)];
    };

    $scope.numPerPage = 4;

    $scope.serverOffsetBottom = 0;
    $scope.serverOffsetTop = 0;
    $scope.numPerPageOnServer = 20;

    $scope.filteredCharacters = [];
    $scope.characters = new Array(1000);


    $scope.loadCharacters = function(offset) {
        return CharacterApi.getAll(offset)
            .success((data, status, headers, config) => {
                $scope.handleServerPageLoaded(data);
                return data;
            })
            .error((data, status, headers, config) => console.log("error"));
    };

    $scope.initController = function() {
        $scope.currentPage = Math.floor(parseInt($routeParams.offset,10) / $scope.numPerPage) + 1;
        $scope.serverOffsetBottom = $scope.currentPage * $scope.numPerPage;
        $scope.serverOffsetTop = $scope.currentPage * $scope.numPerPage;

        $scope.handlePageChanged();
    };

    $scope.filterCharacters = function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;

        $scope.filteredCharacters = $scope.characters.slice(begin, end);
    };

    $scope.handleServerPageLoaded = function(charactersData) {
        var mappedResult = charactersData.data.results.map(character => convertCharacterData(character));
        [].splice.apply($scope.characters, [charactersData.data.offset, charactersData.data.limit].concat(mappedResult));

        $scope.filterCharacters();
    };

    $scope.handlePageChanged = function() {
        $scope.filterCharacters();

        if(CharacterApi.shouldLoadNextPage($scope.currentPage, $scope.numPerPage, $scope.serverOffsetTop)) {
            $scope.serverOffsetTop = CharacterApi.getNextPageOffset($scope.serverOffsetTop, $scope.numPerPageOnServer);
            $scope.loadCharacters($scope.serverOffsetTop)
                .success((data) => {
                    $scope.serverOffsetTop = data.data.offset + data.data.limit;
                });
        }

        if(CharacterApi.shouldLoadPrevPage($scope.currentPage, $scope.numPerPage, $scope.serverOffsetBottom)) {
            $scope.serverOffsetBottom = CharacterApi.getPrevPageOffset($scope.serverOffsetBottom, $scope.numPerPageOnServer);
            $scope.loadCharacters($scope.serverOffsetBottom)
                .success((data) => {
                    $scope.serverOffsetBottom = data.data.offset;
                });
        }

        $location.path('/list/' + ($scope.currentPage - 1) * $scope.numPerPage, false);
    };
    //
    //
    //$scope.$watch("currentPage", function() {
    //    $scope.filterCharacters();
    //    $scope.handlePageChanged();
    //});

    $scope.increasePageNum = function() {
        $scope.currentPage += 1;
        $scope.filterCharacters();
        $scope.handlePageChanged();
    };

    $scope.decreasePageNum = function() {
        if($scope.currentPage > 1) {
            $scope.currentPage -= 1;
            $scope.filterCharacters();
            $scope.handlePageChanged();
        }
    };

    $scope.getImgUrl = function(url) {
       return url + '/portrait_xlarge.jpg'
    };

    $scope.initController();
};

module.exports = CharacterSelectionCtrl;