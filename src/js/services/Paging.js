
var Paging = function() {
    return {
        mergeServerPage: mergeServerPage,
        getClientPageBoundaries: getClientPageBoundaries
    }
};

function mergeServerPage(characterPage, characters) {
    var mappedResult = characterPage.data.results.map(character => convertCharacterData(character));
    [].splice.apply(characters, [characterPage.data.offset, characterPage.data.limit].concat(mappedResult));
}

function getClientPageBoundaries(currentPage, numPerPage) {
    return {
        lowerInnerBound: ((this.currentPage - 1) * this.numPerPage),
        upperOuterBound: ((this.currentPage - 1) * this.numPerPage) + this.numPerPage
    }
}

function convertCharacterData(character) {
    return {
        name: character.name,
        description: character.description,
        id: character.id,
        thumbnailPath: character.thumbnail ? character.thumbnail.path : null
    }
}

module.exports = Paging;