
function convertCharacterData(character) {
    return {
        name: character.name,
        description: character.description,
        id: character.id,
        thumbnailPath: character.thumbnail ? character.thumbnail.path : null
    }
}

var services = {};

var CharacterSelectionCtrl = function($location, $routeParams, CharacterApi) {
    services = {
        $location: $location,
        $routeParams: $routeParams,
        CharacterApi: CharacterApi
    };

    this.redCorner = {};
    this.blueCorner = {};

    this.numPerPage = 4;
    this.serverOffsetBottom = 0;
    this.serverOffsetTop = 0;
    this.numPerPageOnServer = 20;

    this.filteredCharacters = [];
    this.characters = new Array(1000);

    this.initController();
};

CharacterSelectionCtrl.prototype.setRedCorner = function(data) {
    this.redCorner = this.characters[this.characters.indexOf(data)];
};

CharacterSelectionCtrl.prototype.setBlueCorner = function(data) {
    this.blueCorner = this.characters[this.characters.indexOf(data)];
};

CharacterSelectionCtrl.prototype.loadCharacters = function(offset) {
    return services.CharacterApi.getAll(offset)
        .success((data, status, headers, config) => {
            this.handleServerPageLoaded(data);
            return data;
        })
        .error((data, status, headers, config) => console.log("error"));
};

CharacterSelectionCtrl.prototype.initController = function() {
    this.currentPage = services.$routeParams.offset ?
            Math.floor(parseInt(services.$routeParams.offset,10) / this.numPerPage) + 1 : 1;
    this.serverOffsetBottom = this.currentPage * this.numPerPage;
    this.serverOffsetTop = this.currentPage * this.numPerPage;

    this.handlePageChanged();
};

CharacterSelectionCtrl.prototype.filterCharacters = function() {
    var begin = ((this.currentPage - 1) * this.numPerPage)
        , end = begin + this.numPerPage;

    this.filteredCharacters = this.characters.slice(begin, end);
};

CharacterSelectionCtrl.prototype.handleServerPageLoaded = function(charactersData) {
    var mappedResult = charactersData.data.results.map(character => convertCharacterData(character));
    [].splice.apply(this.characters, [charactersData.data.offset, charactersData.data.limit].concat(mappedResult));

    this.filterCharacters();
};

CharacterSelectionCtrl.prototype.handlePageChanged = function() {
    this.filterCharacters();

    if(services.CharacterApi.shouldLoadNextPage(this.currentPage, this.numPerPage, this.serverOffsetTop)) {
        this.serverOffsetTop = services.CharacterApi.getNextPageOffset(this.serverOffsetTop, this.numPerPageOnServer);
        this.loadCharacters(this.serverOffsetTop)
            .success((data) => {
                this.serverOffsetTop = data.data.offset + data.data.limit;
            });
    }

    if(services.CharacterApi.shouldLoadPrevPage(this.currentPage, this.numPerPage, this.serverOffsetBottom)) {
        this.serverOffsetBottom = services.CharacterApi.getPrevPageOffset(this.serverOffsetBottom, this.numPerPageOnServer);
        this.loadCharacters(this.serverOffsetBottom)
            .success((data) => {
                this.serverOffsetBottom = data.data.offset;
            });
    }

    services.$location.path('/list/' + (this.currentPage - 1) * this.numPerPage, false);
};

CharacterSelectionCtrl.prototype.increasePageNum = function() {
    this.currentPage += 1;
    this.filterCharacters();
    this.handlePageChanged();
};

CharacterSelectionCtrl.prototype.decreasePageNum = function() {
    if(this.currentPage > 1) {
        this.currentPage -= 1;
        this.filterCharacters();
        this.handlePageChanged();
    }
};

CharacterSelectionCtrl.prototype.getImgUrl = function(url) {
    return url + '/portrait_xlarge.jpg'
};

module.exports = CharacterSelectionCtrl;