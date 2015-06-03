
var Router = {
    list: {
        templateUrl: 'dist/templates/character_selection.html',
        controller: 'CharacterSelectionCtrl',
        controllerAs: 'characters',
        resolve: {
            charactersData: function($route, CharacterApi) {
                return CharacterApi.getAll($route.current.params.offset);
            }
        }
    },

    fight: {
        templateUrl: 'dist/templates/fight.html',
        controller: 'FightCtrl',
        controllerAs: 'fight',
        resolve: {
            redCorner: function($route, CharacterApi) {
                return CharacterApi.getById($route.current.params.redCornerId);
            },
            blueCorner: function($route, CharacterApi) {
                return CharacterApi.getById($route.current.params.blueCornerId);
            }
        }
    }
};

module.exports = Router;
