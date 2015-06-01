

var CharacterApi = function($http) {

    function getAllCharacters() {
        return $http.get('http://gateway.marvel.com/v1/public/characters?apikey=1eb21a7f360cea33e97b2113fe8a483f');
    }

    function getCharacterById(id) {
        return $http.get('http://gateway.marvel.com/v1/public/characters/' + id + '?apikey=1eb21a7f360cea33e97b2113fe8a483f');
    }

    return {
        getAll: getAllCharacters,
        getById: getCharacterById
    }
};

module.exports = CharacterApi;