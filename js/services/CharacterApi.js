

var CharacterApi = function($http) {

    function getAllCharacters(offset) {
        return $http.get('http://gateway.marvel.com/v1/public/characters?offset=' + offset + '&apikey=1eb21a7f360cea33e97b2113fe8a483f');
    }

    function getCharacterById(id) {
        return $http.get('http://gateway.marvel.com/v1/public/characters/' + id + '?apikey=1eb21a7f360cea33e97b2113fe8a483f');
    }

    function shouldLoadNextPage(currentPage, numPerPage, serverOffsetTop) {
        if((currentPage + 1) * numPerPage -1 > serverOffsetTop)
            return true;

        return false;
    }

    function getNextPageOffset(serverOffsetTop, numPerPageServer) {
        return Math.floor(serverOffsetTop / numPerPageServer) * numPerPageServer;
    }

    function shouldLoadPrevPage(currentPage, numPerPage, serverOffsetBottom) {
        if(currentPage === 1)
            return false;

        if((currentPage - 1) * numPerPage - numPerPage < serverOffsetBottom)
            return true
    }

    function getPrevPageOffset(serverOffsetBottom, numPerPageServer) {
        return (Math.ceil(serverOffsetBottom / numPerPageServer) - 1) * numPerPageServer;
    }

    return {
        getAll: getAllCharacters,
        getById: getCharacterById,
        shouldLoadNextPage: shouldLoadNextPage,
        getNextPageOffset: getNextPageOffset,
        shouldLoadPrevPage: shouldLoadPrevPage,
        getPrevPageOffset: getPrevPageOffset
    }
};

module.exports = CharacterApi;