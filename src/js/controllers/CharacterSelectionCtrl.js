
var services = {};

var CharacterSelectionCtrl = function($location, $routeParams, CharacterApi, Paging) {
    services = {
        $location: $location,
        $routeParams: $routeParams,
        CharacterApi: CharacterApi,
        Paging: Paging
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
    this.redCorner = this.characters[this.characters.indexOf(data)] !== -1 ?
        this.characters[this.characters.indexOf(data)] : {};
};

CharacterSelectionCtrl.prototype.setBlueCorner = function(data) {
    this.blueCorner = this.characters[this.characters.indexOf(data)] !== -1 ?
        this.characters[this.characters.indexOf(data)] : {};
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
    this.serverOffsetTop = this.serverOffsetBottom = this.currentPage * this.numPerPage;

    this.loadCharacters(this.serverOffsetBottom);
    this.handlePageChanged();
};

CharacterSelectionCtrl.prototype.filterCharacters = function() {
    var boundaries = services.Paging.getClientPageBoundaries(this.currentPage, this.numPerPage);

    this.filteredCharacters = this.characters.slice(boundaries.lowerInnerBound, boundaries.upperOuterBound);
};

CharacterSelectionCtrl.prototype.handleServerPageLoaded = function(charactersData) {
    services.Paging.mergeServerPage(charactersData, this.characters);

    this.filterCharacters();
};

CharacterSelectionCtrl.prototype.handlePageChanged = function() {
    this.filterCharacters();

    this.loadNextPageIfNecessary();
    this.loadPrevPageIfNecessary();

    services.$location.path('/list/' + (this.currentPage - 1) * this.numPerPage, false);
};

CharacterSelectionCtrl.prototype.loadNextPageIfNecessary = function() {
    if(services.CharacterApi.shouldLoadNextPage(this.currentPage, this.numPerPage, this.serverOffsetTop)) {
        this.serverOffsetTop = services.CharacterApi.getNextPageOffset(this.serverOffsetTop, this.numPerPageOnServer);
        this.loadCharacters(this.serverOffsetTop)
            .success((data) => {
                this.serverOffsetTop = data.data.offset + data.data.limit;
            });
    }
};

CharacterSelectionCtrl.prototype.loadPrevPageIfNecessary = function() {
    if(services.CharacterApi.shouldLoadPrevPage(this.currentPage, this.numPerPage, this.serverOffsetBottom)) {
        this.serverOffsetBottom = services.CharacterApi.getPrevPageOffset(this.serverOffsetBottom, this.numPerPageOnServer);
        this.loadCharacters(this.serverOffsetBottom)
            .success((data) => {
                this.serverOffsetBottom = data.data.offset;
            });
    }
};

CharacterSelectionCtrl.prototype.increasePageNum = function() {
    this.currentPage += 1;
    this.handlePageChanged();
};

CharacterSelectionCtrl.prototype.decreasePageNum = function() {
    if(this.currentPage > 1) {
        this.currentPage -= 1;
        this.handlePageChanged();
    }
};

CharacterSelectionCtrl.prototype.getImgUrl = function(url) {
    return url + '/portrait_xlarge.jpg'
};

module.exports = CharacterSelectionCtrl;