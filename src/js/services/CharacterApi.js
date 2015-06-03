
var ApiConstants = require("./ApiConstants");

var services = {};

var CharacterApi = function($http, ApiConstants) {
    services = {
        $http: $http,
        ApiConstants: ApiConstants
    };

    return {
        getAll: getAllCharacters,
        getById: getCharacterById,
        shouldLoadNextPage: shouldLoadNextPage,
        getNextPageOffset: getNextPageOffset,
        shouldLoadPrevPage: shouldLoadPrevPage,
        getPrevPageOffset: getPrevPageOffset
    };
};

function getAllCharacters(offset) {
    return services.$http.get(`${services.ApiConstants.baseUrl +
                services.ApiConstants.charactersPath}?offset=${offset}&apikey=${services.ApiConstants.key}`);
}

function getCharacterById(id) {
    return services.$http.get(`${services.ApiConstants.baseUrl +
                services.ApiConstants.charactersPath}/${id}?apikey=${services.ApiConstants.key}`);
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

module.exports = CharacterApi;